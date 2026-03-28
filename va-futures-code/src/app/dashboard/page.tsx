import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import DashboardClient from "./DashboardClient";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-bg-page">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-[72px] md:pb-0">
        <div className="space-y-10 max-w-[1104px] mx-auto px-6 py-10 md:px-8 md:py-[60px]">

          {/* CTA Bar */}
          <div className="flex justify-end">
            <Link
              href="/assess"
              className="inline-flex items-center px-4 py-2 rounded-full bg-accent-crimson text-[13px] font-medium text-white hover:bg-accent-crimson/90 transition-colors"
            >
              Analyze Your Business →
            </Link>
          </div>

          {/* Header */}
          <div className="space-y-2">
            <p className="text-[11px] font-medium uppercase text-text-tertiary" style={{ letterSpacing: "0.5px" }}>
              The Fluency Question
            </p>
            <h1
              className="text-[32px] md:text-[48px] font-medium text-text-primary"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "-2px" }}
            >
              Where Is Virginia Tracking?
            </h1>
            <p className="text-text-secondary text-[16px]" style={{ lineHeight: 1.5 }}>
              A living dashboard tracking which AI future is materializing for Virginia&apos;s small and mid-size businesses. Updated twice daily from seven data sources including Virginia local news.
            </p>
          </div>

          {/* Assessment Bar */}
          <div className="rounded-xl bg-bg-sidebar" style={{ padding: 32 }}>
            <div className="space-y-6">
              <h2
                className="text-[24px] font-medium text-text-on-dark"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Current Assessment: March 2026
              </h2>
              <p className="text-text-tertiary text-[16px]" style={{ lineHeight: 1.5 }}>
                Virginia is tracking between &ldquo;Software Does It For You&rdquo; and &ldquo;Pockets of Excellence.&rdquo; Broad shallow adoption is measurably happening. Metro pockets of deeper engagement are forming. The distributed fluency scenario remains aspirational.
              </p>
              {/* Scenario Score Cards */}
              <div className="flex flex-col md:flex-row" style={{ gap: 1 }}>
                {[
                  { score: "30%", name: "BUILD IT YOURSELF", type: "Deep & Distributed", highlight: false },
                  { score: "70%", name: "SOFTWARE DOES IT FOR YOU", type: "Shallow & Distributed", highlight: true },
                  { score: "50%", name: "POCKETS OF EXCELLENCE", type: "Deep & Concentrated", highlight: false },
                  { score: "20%", name: "THE WIDENING GAP", type: "Shallow & Concentrated", highlight: false },
                ].map((card) => (
                  <div
                    key={card.name}
                    className="flex-1 flex flex-col items-center gap-2 text-center"
                    style={{ padding: "20px 24px", backgroundColor: card.highlight ? "#C41E3A" : "transparent" }}
                  >
                    <span
                      className="text-[36px] font-medium text-text-on-dark"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "-2px" }}
                    >
                      {card.score}
                    </span>
                    <span className="text-[11px] font-semibold text-text-on-dark uppercase" style={{ letterSpacing: "1px" }}>
                      {card.name}
                    </span>
                    <span className="text-[10px] text-text-tertiary">{card.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* The Data */}
          <div className="space-y-2">
            <h2
              className="text-[32px] font-medium text-text-primary"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "-1px" }}
            >
              The Data
            </h2>
            <p className="text-text-secondary text-[16px]" style={{ lineHeight: 1.5 }}>
              Four metrics that matter. Each tells a different part of the story.
            </p>
          </div>

          {/* Charts + Signals rendered by client component */}
          <DashboardClient />

          {/* Analyze Your Business CTA */}
          <div className="flex flex-col items-center text-center" style={{ padding: "40px 0" }}>
            <div className="space-y-4 flex flex-col items-center">
              <p className="text-[11px] font-medium uppercase text-text-tertiary" style={{ letterSpacing: "0.5px" }}>Now</p>
              <h2
                className="text-[28px] font-medium text-text-primary"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "-1px" }}
              >
                Analyze Your Business
              </h2>
              <p className="text-text-secondary text-[16px]" style={{ lineHeight: 1.5 }}>
                Complete a 10 minute assessment and receive a custom analysis of your company&apos;s AI Future
              </p>
              <Link
                href="/assess"
                className="inline-flex items-center rounded bg-accent-crimson text-[12px] font-medium text-white hover:bg-accent-crimson/90 transition-colors"
                style={{ padding: "12px 24px" }}
              >
                View the Dashboard
              </Link>
            </div>
          </div>

          {/* Data Sources */}
          <div className="space-y-4">
            <div className="w-full h-px bg-border-gray" />
            <p className="text-text-tertiary text-[12px]" style={{ lineHeight: 1.5 }}>
              Data sources: Bureau of Labor Statistics (LAUS), U.S. Census Bureau (BTOS), Anthropic Economic Index (Hugging Face), Eloundou et al. (2023), BuildFirst field observations, industry reporting, Virginia local news (Virginia Business, Cardinal News, Virginia Mercury, WTOP).
            </p>
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
