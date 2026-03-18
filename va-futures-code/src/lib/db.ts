import { neon } from "@neondatabase/serverless";

function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

export async function initDb() {
  const sql = getDb();
  if (!sql) return;

  await sql`
    CREATE TABLE IF NOT EXISTS assessments (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      email TEXT NOT NULL,
      name TEXT,
      website TEXT,
      industry TEXT,
      company_size TEXT,
      region TEXT,
      raw_answers JSONB,
      score_practice NUMERIC,
      score_delegation NUMERIC,
      score_description NUMERIC,
      score_discernment NUMERIC,
      score_diligence NUMERIC,
      score_overall NUMERIC,
      level_delegation TEXT,
      level_description TEXT,
      level_discernment TEXT,
      level_diligence TEXT,
      strongest_d TEXT,
      weakest_d TEXT,
      current_mode TEXT,
      primary_scenario TEXT,
      secondary_scenario TEXT,
      claude_intro TEXT,
      claude_fluency_desc TEXT,
      claude_scenario_desc TEXT,
      claude_trajectory TEXT,
      claude_actions JSONB,
      meta_line TEXT
    )
  `;
}

export async function saveAssessment(data: {
  email: string;
  name: string;
  website: string;
  industry: string;
  company_size: string;
  region: string;
  raw_answers: Record<number, number>;
  scores: {
    practice: number;
    delegation: number;
    description: number;
    discernment: number;
    diligence: number;
    overall: number;
  };
  levels: {
    delegation: string;
    description: string;
    discernment: string;
    diligence: string;
  };
  strongest_d: string;
  weakest_d: string;
  current_mode: string;
  primary_scenario: string;
  secondary_scenario: string;
  intro: string;
  fluency_desc: string;
  scenario_desc: string;
  trajectory: string;
  actions: { number: string; title: string; body: string }[];
  meta_line: string;
}) {
  const sql = getDb();
  if (!sql) {
    console.log("[DB] DATABASE_URL not set — skipping database save");
    return;
  }

  try {
    await sql`
      INSERT INTO assessments (
        email, name, website, industry, company_size, region,
        raw_answers,
        score_practice, score_delegation, score_description, score_discernment, score_diligence, score_overall,
        level_delegation, level_description, level_discernment, level_diligence,
        strongest_d, weakest_d, current_mode,
        primary_scenario, secondary_scenario,
        claude_intro, claude_fluency_desc, claude_scenario_desc, claude_trajectory, claude_actions,
        meta_line
      ) VALUES (
        ${data.email}, ${data.name}, ${data.website}, ${data.industry}, ${data.company_size}, ${data.region},
        ${JSON.stringify(data.raw_answers)},
        ${data.scores.practice}, ${data.scores.delegation}, ${data.scores.description}, ${data.scores.discernment}, ${data.scores.diligence}, ${data.scores.overall},
        ${data.levels.delegation}, ${data.levels.description}, ${data.levels.discernment}, ${data.levels.diligence},
        ${data.strongest_d}, ${data.weakest_d}, ${data.current_mode},
        ${data.primary_scenario}, ${data.secondary_scenario},
        ${data.intro}, ${data.fluency_desc}, ${data.scenario_desc}, ${data.trajectory}, ${JSON.stringify(data.actions)},
        ${data.meta_line}
      )
    `;
    console.log("[DB] Assessment saved for", data.email);
  } catch (err) {
    console.error("[DB] Failed to save assessment:", err);
    // Non-blocking — database failure should never break the user flow
  }
}
