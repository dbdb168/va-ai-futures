import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";
const VA_FUTURES_WEBHOOK_URL = process.env.VA_FUTURES_WEBHOOK_URL || "";

export interface IntakeData {
  email: string;
  name: string;
  website: string;
  description: string;
  size: string;
  region: string;
}

export interface Answers {
  [questionId: number]: number;
}

export interface AnalysisResult {
  name: string;
  metaLine: string;
  intro: string;
  context: { label: string; value: string }[];
  fluencyDesc: string;
  scores: { label: string; score: number; color: string }[];
  scenarioDesc: string;
  scenarios: {
    title: string;
    relevance: "primary" | "secondary" | "low";
    color: string;
    href: string;
  }[];
  actions: { number: string; title: string; body: string }[];
  emailSentTo: string;
  // Raw scores for webhook
  overall_score: number;
  d_scores: { delegation: number; description: number; discernment: number; diligence: number };
  d_levels: { delegation: string; description: string; discernment: string; diligence: string };
  strongest_d: string;
  weakest_d: string;
  current_mode: string;
  trajectory: string;
}

function calcScores(answers: Answers) {
  const avg = (...ids: number[]) =>
    ids.reduce((s, id) => s + (answers[id] || 1), 0) / ids.length;

  const practice = avg(1, 6);
  const delegation = avg(2, 7);
  const description = avg(3, 8);
  const discernment = avg(4, 9);
  const diligence = avg(5, 10);
  const overall = (delegation + description + discernment + diligence) / 4;

  const level = (s: number) => {
    if (s >= 4.5) return "Expert";
    if (s >= 3.5) return "Strong";
    if (s >= 2.5) return "Growing";
    if (s >= 1.5) return "Developing";
    return "Beginning";
  };

  const ds = { delegation, description, discernment, diligence };
  const entries = Object.entries(ds) as [string, number][];
  const strongest = entries.reduce((a, b) => (a[1] >= b[1] ? a : b))[0];
  const weakest = entries.reduce((a, b) => (a[1] <= b[1] ? a : b))[0];

  const modeScore = practice;
  let current_mode: string;
  if (modeScore >= 4) current_mode = "Agency — AI systems operate within defined boundaries with human oversight at strategic checkpoints";
  else if (modeScore >= 3) current_mode = "Augmenting — uses AI to enhance professional judgment across multiple workflows";
  else if (modeScore >= 2) current_mode = "Automating — connecting AI to handle routine tasks";
  else current_mode = "Asking — uses AI for information retrieval but hasn't integrated it into workflows";

  return {
    practice,
    delegation,
    description,
    discernment,
    diligence,
    overall,
    d_levels: {
      delegation: level(delegation),
      description: level(description),
      discernment: level(discernment),
      diligence: level(diligence),
    },
    strongest_d: strongest,
    weakest_d: weakest,
    current_mode,
  };
}

function buildPrompt(intake: IntakeData, scores: ReturnType<typeof calcScores>): string {
  const { delegation, description, discernment, diligence, practice, overall, d_levels, strongest_d, weakest_d, current_mode } = scores;

  return `You are analyzing a Virginia business owner's AI fluency for the Virginia AI Futures project (BuildFirst, David Beath).

BUSINESS INFORMATION:
Name: ${intake.name}
Email: ${intake.email}
Region: ${intake.region}
Company size: ${intake.size}
Website: ${intake.website || "not provided"}
Description: ${intake.description}

${intake.website ? `Research their website and business. Use that context to make the analysis specific to their actual work, clients, and industry.` : ""}

FLUENCY SCORES (1–5 scale):
- Current Practice: ${practice.toFixed(1)}
- Delegation: ${delegation.toFixed(1)} (${d_levels.delegation})
- Description: ${description.toFixed(1)} (${d_levels.description})
- Discernment: ${discernment.toFixed(1)} (${d_levels.discernment})
- Diligence: ${diligence.toFixed(1)} (${d_levels.diligence})
- Overall: ${overall.toFixed(1)}
- Strongest: ${strongest_d}, Weakest: ${weakest_d}
- Current mode: ${current_mode}

VIRGINIA AI FUTURES SCENARIOS (for context):
1. Build It Yourself (Deep & Distributed) — broad fluency through peer networks
2. Software Does It For You (Shallow & Distributed) — platform AI creates false sense of adoption
3. Pockets of Excellence (Deep & Concentrated) — deep fluency in metro clusters, platform-level elsewhere
4. The Widening Gap (Shallow & Concentrated) — trust shock or recession hardens the divide

Current Virginia tracking: between "Software Does It For You" and "Pockets of Excellence" (March 2026).

TASK: Write a personalized scenario analysis. Return ONLY valid JSON (no markdown, no code blocks) in this exact shape:

{
  "metaLine": "Region · industry description · March 2026",
  "intro": "2–3 sentence paragraph: who they are, their fluency position, what it means for them. Specific to their business.",
  "industryContext": "1–2 sentences about their specific industry's AI dynamics in Virginia.",
  "regionContext": "1 sentence about their region's knowledge network conditions.",
  "fluencyDesc": "2–3 sentences interpreting their specific score pattern. Reference their strongest and weakest D. Be specific.",
  "scenarioDesc": "2 sentences: which scenario is most relevant to them and why, given their scores and business type.",
  "primaryScenario": "Pockets of Excellence",
  "secondaryScenario": "Build It Yourself",
  "trajectory": "2–3 sentences on their specific trajectory and what it means for their competitive position.",
  "actions": [
    {
      "title": "Specific action title for their business",
      "body": "2–3 sentences. Specific to their business, scores, and region. Not generic advice."
    },
    {
      "title": "Second action title",
      "body": "2–3 sentences. Reference their weakest dimension specifically."
    },
    {
      "title": "Third action title",
      "body": "2–3 sentences. Connect to a Virginia-specific opportunity or peer network."
    }
  ],
  "current_mode": "${current_mode}"
}

Rules:
- CRITICAL: Never fabricate, infer, or assume specific facts about this business that are not directly stated in the information above or verifiable from their website. If you do not know something specific about them, speak in terms of their industry, region, and scores — not invented details. Do not invent client names, revenue figures, team structures, specific tools they use, or business history. If their website was not provided or you cannot verify details, frame your analysis around what their scores and stated description tell you — nothing more.
- Be specific to their actual business where the information supports it. Otherwise, frame advice in terms of their industry, region, and score pattern.
- primaryScenario must be one of the four scenario names exactly.
- secondaryScenario must be one of the four scenario names exactly (different from primary).
- Actions should reference their scores, their industry, and their region.`;
}

const SCENARIO_META: Record<string, { color: string; href: string }> = {
  "Build It Yourself": { color: "#C41E3A", href: "/scenarios/build-it-yourself" },
  "Software Does It For You": { color: "#B8860B", href: "/scenarios/software-does-it" },
  "Pockets of Excellence": { color: "#2D6A6A", href: "/scenarios/pockets-of-excellence" },
  "The Widening Gap": { color: "#7B4B2A", href: "/scenarios/the-widening-gap" },
};

const ALL_SCENARIOS = ["Build It Yourself", "Software Does It For You", "Pockets of Excellence", "The Widening Gap"];

async function fireWebhook(payload: Record<string, unknown>) {
  if (!VA_FUTURES_WEBHOOK_URL) return;
  try {
    await fetch(VA_FUTURES_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Non-blocking — webhook failure should never break the user flow
  }
}

export async function POST(req: NextRequest) {
  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  const body = await req.json();
  const { intake, answers }: { intake: IntakeData; answers: Answers } = body;

  const scores = calcScores(answers);
  const prompt = buildPrompt(intake, scores);

  // Call Claude
  const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!claudeRes.ok) {
    const err = await claudeRes.text();
    return NextResponse.json({ error: "Claude API error", detail: err }, { status: 500 });
  }

  const claudeData = await claudeRes.json();
  const text: string = claudeData.content?.[0]?.text || "";

  let analysis: Record<string, unknown>;
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    analysis = JSON.parse(jsonMatch ? jsonMatch[0] : text.trim());
  } catch {
    return NextResponse.json({ error: "Failed to parse Claude response", raw: text }, { status: 500 });
  }

  const primary = (analysis.primaryScenario as string) || "Pockets of Excellence";
  const secondary = (analysis.secondaryScenario as string) || "Build It Yourself";
  const lowScenarios = ALL_SCENARIOS.filter((s) => s !== primary && s !== secondary);

  const scenarios: AnalysisResult["scenarios"] = [
    { title: primary, relevance: "primary", ...SCENARIO_META[primary] },
    { title: secondary, relevance: "secondary", ...SCENARIO_META[secondary] },
    ...lowScenarios.map((s) => ({ title: s, relevance: "low" as const, ...SCENARIO_META[s] })),
  ];

  const rawActions = (analysis.actions as { title: string; body: string }[]) || [];
  const actions = rawActions.map((a, i) => ({
    number: String(i + 1).padStart(2, "0"),
    title: a.title,
    body: a.body,
  }));

  const result: AnalysisResult = {
    name: intake.name.split(" ")[0],
    metaLine: analysis.metaLine as string || `${intake.region} · ${intake.description?.slice(0, 60)} · March 2026`,
    intro: analysis.intro as string || "",
    context: [
      { label: "Business type", value: intake.description?.slice(0, 80) || "" },
      { label: "Region", value: intake.region },
      { label: "Size", value: intake.size },
    ],
    fluencyDesc: analysis.fluencyDesc as string || "",
    scores: [
      { label: "Current Practice", score: scores.practice, color: "#C41E3A" },
      { label: "Delegation", score: scores.delegation, color: "#B8860B" },
      { label: "Description", score: scores.description, color: "#C41E3A" },
      { label: "Discernment", score: scores.discernment, color: "#2D6A6A" },
      { label: "Diligence", score: scores.diligence, color: "#7B68AE" },
    ],
    scenarioDesc: analysis.scenarioDesc as string || "",
    scenarios,
    actions,
    emailSentTo: intake.email,
    overall_score: scores.overall,
    d_scores: {
      delegation: scores.delegation,
      description: scores.description,
      discernment: scores.discernment,
      diligence: scores.diligence,
    },
    d_levels: scores.d_levels,
    strongest_d: scores.strongest_d,
    weakest_d: scores.weakest_d,
    current_mode: scores.current_mode,
    trajectory: analysis.trajectory as string || "",
  };

  // Fire webhook (non-blocking)
  fireWebhook({
    email: intake.email,
    name: intake.name,
    region: intake.region,
    business_url: intake.website,
    industry: intake.description,
    overall_score: result.overall_score,
    spectrum_score: scores.practice,
    d_scores: result.d_scores,
    d_levels: result.d_levels,
    strongest_d: result.strongest_d,
    weakest_d: result.weakest_d,
    current_mode: result.current_mode,
    trajectory: result.trajectory,
    scenario_relevance: scenarios.map((s) => ({ name: s.title, relevance: s.relevance })),
    timestamp: new Date().toISOString(),
    source: "virginia-futures-assessment",
  });

  return NextResponse.json(result);
}
