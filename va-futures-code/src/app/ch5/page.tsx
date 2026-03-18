import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function Ch5Page() {
  return (
    <div className="flex min-h-screen bg-bg-page">
      <Sidebar />

      <main className="flex-1 overflow-y-auto pb-[72px] md:pb-0">
        {/* Dark Header */}
        <div
          className="flex flex-col items-center justify-center text-center bg-bg-sidebar py-10 px-6 md:px-20 md:h-[360px]"
        >
          <p
            className="text-[11px] font-semibold uppercase text-accent-crimson"
            style={{ fontFamily: "Inter, sans-serif", letterSpacing: "1px" }}
          >
            CHAPTER 5
          </p>
          <h1
            className="text-[36px] md:text-[64px] font-medium text-text-on-dark mt-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Implications and Qualifiers
          </h1>
          <p
            className="text-text-tertiary text-[14px] md:text-[16px] mt-4 max-w-[800px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Who this analysis applies to, where the uncertainties lie, and what it implies for business strategy.
          </p>
        </div>

        {/* Content Area */}
        <div className="space-y-10 max-w-[1104px] mx-auto px-6 md:px-8" style={{ paddingTop: 40, paddingBottom: 40 }}>

          {/* CTA Bar */}
          <div className="flex justify-end">
            <Link
              href="/assess"
              className="inline-flex items-center px-4 py-2 rounded-full bg-accent-crimson text-[13px] font-medium text-white hover:bg-accent-crimson/90 transition-colors"
            >
              Analyze Your Business →
            </Link>
          </div>

          {/* Body + Margin Row */}
          <div className="flex flex-col md:flex-row gap-12">
            {/* Body Column */}
            <div className="flex-1 space-y-6">
              <p className="text-text-primary text-[16px] leading-[1.7]" style={{ fontFamily: "Inter, sans-serif" }}>
                This analysis does not apply uniformly. A sole proprietor operating a cash-flow-positive service business with a stable client base and no growth ambitions may find that GenAI produces marginal time savings and nothing more. Not every General Purpose Technology demands a strategic response from every business.
              </p>

              <p className="text-text-primary text-[16px] leading-[1.7]" style={{ fontFamily: "Inter, sans-serif" }}>
                The businesses for which the fluency question is strategically material share specific characteristics: their competitive advantage derives from professional judgment, client relationships, or local market knowledge. They compete on expertise rather than price. For these businesses — and they represent a significant share of Virginia&apos;s 780,000 SMBs — the risk is not that GenAI will replace their judgment. It is that a competitor who achieves fluency will amplify theirs first.
              </p>

              <p className="text-text-primary text-[16px] leading-[1.7]" style={{ fontFamily: "Inter, sans-serif" }}>
                The strategic question for the remaining 65–70% is not whether GenAI will affect their business environment. It is whether they will achieve sufficient understanding of the technology to exercise agency over how it affects them, or whether that determination will be made by competitors, software vendors, and market dynamics operating outside their awareness.
              </p>
            </div>

            {/* Right Margin */}
            <div className="w-full md:w-[280px] md:shrink-0">
              <div style={{ paddingLeft: "24px", borderLeft: "3px solid #C41E3A" }} className="space-y-3">
                <div
                  className="text-[48px] md:text-[72px] font-medium text-accent-crimson leading-none"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    letterSpacing: "-2px",
                  }}
                >
                  30–35%
                </div>
                <p className="text-text-secondary text-[13px] leading-[1.6]">
                  Estimated share of Virginia&apos;s professional service businesses that will reach Layer 3 engagement within five years, driven by curiosity, peer network proximity, or economic necessity.
                </p>
              </div>
            </div>
          </div>

          {/* Three Characteristic Cards */}
          <div className="flex flex-col md:flex-row gap-6">
            <div style={{ flex: 1, border: "1px solid #E0E0E0", padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#0F0F0F", margin: 0 }}>
                Professional Judgment
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 400, color: "#666666", lineHeight: 1.5, margin: 0 }}>
                Their competitive advantage comes from what they know and how they apply it, not from scale or price.
              </p>
            </div>
            <div style={{ flex: 1, border: "1px solid #E0E0E0", padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#0F0F0F", margin: 0 }}>
                Client Relationships
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 400, color: "#666666", lineHeight: 1.5, margin: 0 }}>
                Their value is built on trust, context, and long-term understanding that no competitor can replicate overnight.
              </p>
            </div>
            <div style={{ flex: 1, border: "1px solid #E0E0E0", padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#0F0F0F", margin: 0 }}>
                Local Market Knowledge
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 400, color: "#666666", lineHeight: 1.5, margin: 0 }}>
                They compete because they understand their geography, their community, and their customers in ways that national players cannot.
              </p>
            </div>
          </div>

          {/* Conclusion paragraph */}
          <p className="text-text-primary text-[16px] leading-[1.7]" style={{ fontFamily: "Inter, sans-serif" }}>
            For these businesses, the question is not whether GenAI will eventually be embedded in every software platform, every competitor&apos;s workflow, and every client expectation. It will. The question is whether they will understand the technology well enough to direct its application, or whether they will simply receive whatever generic capabilities their vendors choose to provide.
          </p>

          {/* Strategic Callout */}
          <div
            className="w-full bg-bg-sidebar text-center space-y-4 px-6 py-10 md:px-20 md:py-14"
          >
            <h2
              className="text-[28px] md:text-[40px] font-medium text-text-on-dark"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                letterSpacing: "-1px",
              }}
            >
              This is not a technology question.
            </h2>
            <p
              className="text-text-tertiary text-[16px] mx-auto max-w-[800px] leading-[1.6]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              It is a business strategy question, one that every Virginia business owner will answer, whether through deliberate action or through inaction.
            </p>
          </div>

          {/* Assessment CTA */}
          <div
            style={{
              border: "1px solid #E0E0E0",
              padding: 32,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              textAlign: "center",
            }}
          >
            <p className="text-text-primary text-[16px] leading-[1.7] max-w-[700px] text-center" style={{ fontFamily: "Inter, sans-serif", margin: 0 }}>
              Take the assessment and use our research tools to analyse your own business&apos;s fluency, your position on the dimensions in this report, and where the opportunities are.
            </p>
            <Link
              href="/assess"
              className="inline-flex items-center px-6 py-3 rounded bg-accent-crimson text-white text-[14px] font-medium hover:bg-accent-crimson/90 transition-colors"
            >
              Analyse Your Business →
            </Link>
          </div>

          {/* Bottom Navigation */}
          <div className="flex justify-between items-center" style={{ paddingTop: 32 }}>
            <Link href="/ch4" className="text-[14px] font-medium text-text-secondary hover:underline">
              ← Chapter 4: Four Scenarios for Virginia
            </Link>
            <Link href="/dashboard" className="text-[14px] font-medium text-accent-crimson hover:underline">
              Chapter 6: Tracking Virginia&apos;s Progress →
            </Link>
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center pb-4">
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
