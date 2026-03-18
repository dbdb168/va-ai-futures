"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import type { AnalysisResult } from "@/app/api/analyze/route";

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-baseline">
        <span className="text-[13px] font-medium text-text-primary">{label}</span>
        <span className="text-[13px] font-semibold text-text-primary">{score.toFixed(1)}</span>
      </div>
      <div className="h-2 w-full bg-border-gray rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${(score / 5) * 100}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-[11px] text-text-tertiary">{score.toFixed(1)} / 5.0</span>
    </div>
  );
}

function ScenarioCard({
  title,
  relevance,
  color,
  href,
}: {
  title: string;
  relevance: "primary" | "secondary" | "low";
  color: string;
  href: string;
}) {
  const labels = { primary: "Most Likely Path", secondary: "Possible Path", low: "Less Likely" };
  const bgColors = { primary: "bg-[#F0FAF0]", secondary: "bg-[#F5F5F0]", low: "bg-bg-page" };

  return (
    <Link href={href}>
      <div
        className={`rounded-lg border border-border-gray p-5 space-y-2 ${bgColors[relevance]} hover:border-text-secondary transition-colors cursor-pointer`}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-[11px] font-semibold uppercase tracking-[1px] px-2 py-0.5 rounded"
            style={{ backgroundColor: color, color: "#fff" }}
          >
            {labels[relevance]}
          </span>
        </div>
        <p
          className="font-serif text-[18px] font-semibold text-text-primary"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {title}
        </p>
      </div>
    </Link>
  );
}

export default function AssessResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("assess_result");
    if (!raw) {
      router.push("/assess");
      return;
    }
    setResult(JSON.parse(raw));
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen bg-bg-page flex items-center justify-center">
        <p className="text-text-tertiary text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-bg-page">
      <Sidebar />

      <main className="flex-1 overflow-y-auto pb-[72px] md:pb-0">
        <div className="max-w-[700px] mx-auto px-6 py-8 md:px-[48px] md:py-[48px] space-y-0">

          {/* Results Header */}
          <div className="space-y-4 pb-12">
            <h1
              className="font-serif text-[28px] md:text-[36px] font-semibold text-text-primary leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {result.name}, here is your AI futures analysis.
            </h1>
            <p className="text-[12px] font-normal text-text-tertiary uppercase tracking-[0.5px]">
              {result.metaLine}
            </p>
            <p className="text-text-secondary text-[15px] leading-[1.7]">{result.intro}</p>

            <div className="flex flex-wrap gap-3 pt-2">
              {result.context.map((c) => (
                <div
                  key={c.label}
                  className="border border-border-gray rounded px-3 py-1.5 text-[12px]"
                >
                  <span className="text-text-tertiary uppercase tracking-[0.5px] mr-1.5">
                    {c.label}
                  </span>
                  <span className="text-text-primary font-medium">{c.value}</span>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-border-gray" />

          {/* Fluency Profile */}
          <div className="py-12 space-y-6">
            <h2
              className="font-serif text-[28px] font-semibold text-text-primary"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Your Fluency Profile
            </h2>
            <p className="text-text-secondary text-[14px] leading-[1.6]">{result.fluencyDesc}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {result.scores.map((s) => (
                <ScoreBar key={s.label} {...s} />
              ))}
            </div>

            <p className="text-[11px] italic text-text-tertiary">
              Based on the AI Fluency Framework by Dakan, Feller &amp; Anthropic (2025).
            </p>
          </div>

          <hr className="border-border-gray" />

          {/* Scenario Relevance */}
          <div className="py-12 space-y-6">
            <h2
              className="font-serif text-[28px] font-semibold text-text-primary"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Which Scenarios Matter Most for You
            </h2>
            <p className="text-text-secondary text-[14px] leading-[1.7]">{result.scenarioDesc}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.scenarios.map((s) => (
                <ScenarioCard key={s.title} {...s} />
              ))}
            </div>
          </div>

          <hr className="border-border-gray" />

          {/* Three Actions */}
          <div className="py-12 space-y-6">
            <h2
              className="font-serif text-[28px] font-semibold text-text-primary"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Three Actions for Your Business
            </h2>

            {result.actions.map((action) => (
              <div
                key={action.number}
                className="flex gap-5 border-l-2 border-accent-crimson pl-5"
              >
                <span
                  className="font-serif text-[32px] font-semibold text-accent-crimson leading-none shrink-0 mt-1"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {action.number}
                </span>
                <div className="space-y-1.5">
                  <h4
                    className="font-serif text-[18px] font-semibold text-text-primary"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {action.title}
                  </h4>
                  <p className="text-text-secondary text-[14px] leading-relaxed">{action.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-[#F5F5F0] rounded-xl p-6 md:p-10 text-center space-y-4">
            <h3
              className="font-serif text-[24px] font-semibold text-text-primary"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Let&apos;s talk about what this means for your business.
            </h3>
            <p className="text-text-secondary text-[14px] leading-relaxed max-w-[500px] mx-auto">
              You have a read on where you are. Book 30 minutes with David to walk through your
              results and figure out the right next step.
            </p>
            <a
              href="https://calendar.app.google/aiyh2tuUg5znitAg6"
              className="inline-flex items-center justify-center h-12 px-8 bg-success text-white font-semibold text-[15px] rounded-lg hover:bg-success/90 transition-colors"
            >
              Book a Free 30-Minute Call
            </a>
          </div>

          {/* Footer */}
          <div className="pt-8 pb-4 text-center space-y-3">
            <p className="text-text-tertiary text-[12px]">
              A copy of these results has been sent to {result.emailSentTo}.
            </p>
            <div className="flex justify-center gap-6">
              <Link
                href="/"
                className="text-[12px] text-text-tertiary hover:text-text-secondary transition-colors"
              >
                Back to Virginia Futures
              </Link>
              <Link
                href="/assess"
                className="text-[12px] text-text-tertiary hover:text-text-secondary transition-colors"
              >
                Retake Assessment
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
