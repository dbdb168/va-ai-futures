import Sidebar from "./Sidebar";
import Link from "next/link";

export interface ScenarioAnnotation {
  title: string;
  body: string;
}

export interface ScenarioNarrativeRow {
  paragraphs: string[];
  annotations: ScenarioAnnotation[];
}

export interface OtherScenario {
  badge: string;
  badgeColor?: string;
  title: string;
  desc: string;
  href: string;
}

export interface ScenarioData {
  scenarioNumber: string; // e.g. "SCENARIO 1 OF 4"
  badge: string;          // e.g. "DEEP & DISTRIBUTED"
  badgeColor: string;
  title: string;
  subtitle: string;
  heroImageSrc: string;
  heroImageAlt: string;
  narrativeRows: ScenarioNarrativeRow[];    // typically 2 rows above pull quote
  pullQuote: string;
  stat: string;
  statLabel: string;
  economicOutcomeRow: ScenarioNarrativeRow; // the row below the stat
  otherScenarios: OtherScenario[];
  prevNav?: { label: string; href: string };
  nextNav?: { label: string; href: string };
}

const DISCLAIMER =
  "These scenarios are works of structured fiction, not predictions. They are designed to provoke strategic questions for business leaders and policy makers. Elements of each could emerge. No single scenario will materialize as described.";

function NarrativeRow({ row }: { row: ScenarioNarrativeRow }) {
  return (
    <div className="flex flex-col md:flex-row gap-12">
      {/* Left: main narrative */}
      <div className="flex-1 space-y-6">
        {row.paragraphs.map((p, i) => (
          <p key={i} className="text-text-primary text-[16px] leading-[1.7]">
            {p}
          </p>
        ))}
      </div>

      {/* Right: annotations with crimson left border */}
      <div className="w-full md:w-[280px] shrink-0 space-y-6">
        {row.annotations.map((ann, i) => (
          <div
            key={i}
            className="pl-4 space-y-1.5"
            style={{ borderLeft: "3px solid #C41E3A" }}
          >
            <p className="text-[13px] font-semibold text-text-primary">
              {ann.title}
            </p>
            <p className="text-text-secondary text-[13px]" style={{ lineHeight: 1.6 }}>
              {ann.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ScenarioPage({ data }: { data: ScenarioData }) {
  return (
    <div className="flex min-h-screen bg-bg-page">
      <Sidebar />

      <main className="flex-1 overflow-y-auto pb-[72px] md:pb-0">
        <div className="py-10 md:py-[60px] space-y-12 max-w-[1104px] mx-auto px-6 md:px-8">

          {/* Top CTA bar */}
          <div className="flex justify-end">
            <Link
              href="/assess"
              className="inline-flex items-center px-4 py-2 rounded-full bg-accent-crimson text-[13px] font-medium text-white hover:bg-accent-crimson/90 transition-colors"
            >
              Analyze Your Business →
            </Link>
          </div>

          {/* Header block */}
          <div className="space-y-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.5px] text-text-tertiary">
              {data.scenarioNumber}
            </p>
            <div
              className="inline-flex items-center px-3 py-1.5 rounded"
              style={{ backgroundColor: data.badgeColor }}
            >
              <span className="text-[10px] font-bold uppercase tracking-[1px] text-white">
                {data.badge}
              </span>
            </div>
            <h1
              className="text-[36px] md:text-[64px] font-medium text-text-primary leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                letterSpacing: "-2px",
              }}
            >
              {data.title}
            </h1>
            <p className="text-text-secondary text-[16px] md:text-[18px] leading-[1.5] md:max-w-[850px]">
              {data.subtitle}
            </p>
          </div>

          {/* Disclaimer */}
          <div
            className="flex gap-3 items-start px-6 py-4 rounded"
            style={{ border: "1px solid #E0E0E0" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#999999"
              strokeWidth="2"
              className="shrink-0 mt-0.5"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <p className="text-text-secondary text-[13px] leading-[1.5]">
              {DISCLAIMER}
            </p>
          </div>

          {/* Hero image */}
          <div className="w-full h-[200px] md:h-[360px] rounded overflow-hidden bg-[#E0E0E0]">
            {data.heroImageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.heroImageSrc}
                alt={data.heroImageAlt}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-tertiary text-sm">
                {data.heroImageAlt}
              </div>
            )}
          </div>

          <hr className="border-border-gray" />

          {/* Narrative rows (above pull quote) */}
          <div className="space-y-12">
            {data.narrativeRows.map((row, i) => (
              <NarrativeRow key={i} row={row} />
            ))}
          </div>

          {/* Pull quote */}
          <div
            className="py-10"
            style={{
              borderTop: "1px solid #E0E0E0",
              borderBottom: "1px solid #E0E0E0",
            }}
          >
            <blockquote
              className="text-[24px] md:text-[32px] italic font-medium text-text-primary text-center leading-[1.4] max-w-[900px] mx-auto"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {data.pullQuote}
            </blockquote>
          </div>

          {/* Stat callout */}
          <div
            className="flex flex-col items-center gap-3 py-12"
            style={{
              borderBottom: "1px solid #E0E0E0",
            }}
          >
            <div
              className="text-[48px] md:text-[80px] font-medium text-accent-crimson leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                letterSpacing: "-2px",
              }}
            >
              {data.stat}
            </div>
            <p className="text-text-secondary text-[16px] leading-[1.5] text-center max-w-[700px]">
              {data.statLabel}
            </p>
          </div>

          {/* Economic Outcome */}
          <div className="space-y-8">
            <h2
              className="text-[28px] font-medium text-text-primary"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                letterSpacing: "-1px",
              }}
            >
              Economic Outcome
            </h2>
            <NarrativeRow row={data.economicOutcomeRow} />
          </div>

          <hr className="border-border-gray" />

          {/* Explore Other Scenarios */}
          <div className="space-y-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.5px] text-text-tertiary">
              Explore Other Scenarios
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.otherScenarios.map((s) => (
                <Link key={s.href} href={s.href}>
                  <div
                    className="p-6 rounded space-y-2 hover:border-text-secondary transition-colors"
                    style={{ border: "1px solid #E0E0E0" }}
                  >
                    <div
                      className="inline-flex items-center px-2 py-1 rounded"
                      style={{
                        border: "1px solid #999999",
                      }}
                    >
                      <span className="text-[9px] font-semibold uppercase tracking-[1px] text-text-secondary">
                        {s.badge}
                      </span>
                    </div>
                    <p
                      className="text-[22px] font-medium text-text-primary"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {s.title}
                    </p>
                    <p className="text-text-secondary text-[13px] leading-[1.5]">
                      {s.desc}
                    </p>
                    <p className="text-accent-crimson text-[13px] font-medium">
                      Read this scenario →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom navigation */}
          <div
            className="flex justify-between items-center pt-8"
            style={{ borderTop: "1px solid #E0E0E0" }}
          >
            {data.prevNav ? (
              <Link
                href={data.prevNav.href}
                className="text-[14px] font-medium text-accent-crimson hover:underline"
              >
                ← {data.prevNav.label}
              </Link>
            ) : (
              <div />
            )}
            {data.nextNav && (
              <Link
                href={data.nextNav.href}
                className="text-[14px] font-medium text-accent-crimson hover:underline"
              >
                {data.nextNav.label} →
              </Link>
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pb-4">
            <div className="flex gap-6">
              <Link href="/privacy" className="text-[12px] text-text-tertiary hover:text-text-secondary">Privacy</Link>
              <Link href="/legal" className="text-[12px] text-text-tertiary hover:text-text-secondary">Legal</Link>
              <a href="https://buildfirst.io" target="_blank" rel="noopener noreferrer" className="text-[12px] text-text-tertiary hover:text-text-secondary">buildfirst.io</a>
            </div>
            <span className="text-[12px] text-text-tertiary">Virginia AI Futures is a BuildFirst research project</span>
          </div>
        </div>
      </main>
    </div>
  );
}
