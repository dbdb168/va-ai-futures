import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function Ch1Page() {
  return (
    <div className="flex min-h-screen bg-bg-page">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto pb-[72px] md:pb-0">
        {/* Dark Hero Header */}
        <header
          className="flex flex-col items-center justify-center text-center py-10 px-6 md:px-20 md:h-[360px]"
          style={{
            background: "var(--bg-sidebar, #0F0F0F)",
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: "var(--accent-crimson, #C41E3A)",
              letterSpacing: "1px",
            }}
          >
            CHAPTER 1
          </span>
          <h1
            className="text-[36px] md:text-[64px]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              color: "var(--text-on-dark, #FAFAF7)",
              letterSpacing: "-2px",
              lineHeight: 1,
              margin: 0,
            }}
          >
            The General Purpose Technology Thesis
          </h1>
          <p
            className="text-[14px] md:text-[16px]"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              color: "var(--text-tertiary, #999999)",
              lineHeight: 1.5,
              maxWidth: 800,
              margin: 0,
            }}
          >
            Why generative AI requires a different analytical framework than previous technology waves.
          </p>
        </header>

        {/* Content Area */}
        <main
          className="px-6 md:px-8"
          style={{
            background: "var(--bg-page, #FAFAF7)",
            paddingTop: 40,
            paddingBottom: 40,
            maxWidth: 1104,
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 40,
          }}
        >
          {/* CTA Bar */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link
              href="/assess"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--text-on-dark, #FAFAF7)",
                background: "var(--accent-crimson, #C41E3A)",
                border: "none",
                borderRadius: 20,
                padding: "8px 16px",
                textDecoration: "none",
              }}
            >
              Analyze Your Business →
            </Link>
          </div>

          {/* Body + Margin Row */}
          <div className="flex flex-col md:flex-row" style={{ gap: 48, alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 400,
                  color: "var(--text-primary, #0F0F0F)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Every few decades, a technology arrives that does not just improve how businesses operate. It reorganises them. Economists call these General Purpose Technologies. The steam engine, electricity, and the internet each met the criteria defined by Bresnahan and Trajtenberg in 1995: pervasiveness across sectors, continuous improvement over time, and the capacity to spawn complementary innovations. Generative AI has been classified as the latest, but with an adoption velocity that has no historical precedent.
              </p>
            </div>
            <aside
              className="w-full md:w-[380px]"
              style={{
                flexShrink: 0,
                borderLeft: "3px solid var(--accent-crimson, #C41E3A)",
                paddingLeft: 16,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--text-primary, #0F0F0F)",
                  margin: 0,
                }}
              >
                General Purpose Technology — Definition
              </p>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  fontWeight: 400,
                  color: "var(--text-secondary, #666666)",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                &apos;GPT&apos; here means General Purpose Technology: an economic classification for technologies that reshape entire economies. Defined by Bresnahan &amp; Trajtenberg (1995). Examples: the steam engine, electricity, the internet, and now generative AI.
              </p>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  fontWeight: 400,
                  color: "var(--text-secondary, #666666)",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                This is not the same as OpenAI&apos;s &apos;GPT&apos; (Generative Pre-trained Transformer), which refers to a family of large language model architectures. It is also not ChatGPT, which is a consumer chat product. One product among many, not synonymous with generative AI itself.
              </p>
            </aside>
          </div>

          {/* Speed Timeline Callout — NO BORDERS */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
              padding: "24px 0",
            }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                fontWeight: 400,
                color: "var(--text-tertiary, #999999)",
                letterSpacing: "1.5px",
              }}
            >
              THE COMPRESSION OF IMPACT
            </span>
            <div
              className="flex flex-col md:flex-row items-center justify-between gap-6 w-full"
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 56, fontWeight: 500, letterSpacing: "-1px", lineHeight: 1, color: "var(--text-tertiary, #999999)" }}>
                  80 yrs
                </span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 400, color: "var(--text-tertiary, #999999)", letterSpacing: "1.2px" }}>
                  STEAM ENGINE
                </span>
              </div>
              <span className="hidden md:block" style={{ fontFamily: "Inter, sans-serif", fontSize: 20, color: "var(--text-tertiary, #999999)", flexShrink: 0 }}>→</span>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 56, fontWeight: 500, letterSpacing: "-1px", lineHeight: 1, color: "var(--text-tertiary, #999999)" }}>
                  40 yrs
                </span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 400, color: "var(--text-tertiary, #999999)", letterSpacing: "1.2px" }}>
                  ELECTRICITY
                </span>
              </div>
              <span className="hidden md:block" style={{ fontFamily: "Inter, sans-serif", fontSize: 20, color: "var(--text-tertiary, #999999)", flexShrink: 0 }}>→</span>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 56, fontWeight: 500, letterSpacing: "-1px", lineHeight: 1, color: "var(--text-tertiary, #999999)" }}>
                  20 yrs
                </span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 400, color: "var(--text-tertiary, #999999)", letterSpacing: "1.2px" }}>
                  INTERNET
                </span>
              </div>
              <span className="hidden md:block" style={{ fontFamily: "Inter, sans-serif", fontSize: 20, color: "var(--text-tertiary, #999999)", flexShrink: 0 }}>→</span>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 56, fontWeight: 500, letterSpacing: "-1px", lineHeight: 1, color: "var(--accent-crimson, #C41E3A)" }}>
                  24 mo
                </span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 400, color: "var(--text-secondary, #666666)", letterSpacing: "1.2px" }}>
                  GENAI · 39.4% ADOPTION
                </span>
              </div>
            </div>
          </div>

          {/* Harvard Paragraph */}
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 400,
              color: "var(--text-primary, #0F0F0F)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Harvard and NBER research measured 39.4% adoption within 24 months of ChatGPT&apos;s public release, the fastest uptake of any General Purpose Technology in recorded history. The steam engine required 80 years to fully reshape manufacturing. Electricity took 40. The internet, approximately 20. GenAI is compressing that timeline into months, not decades. For two structural reasons.
          </p>

          {/* Structural Drivers */}
          <div className="flex flex-col md:flex-row gap-6">
            <div style={{ flex: 1, border: "1px solid var(--border-gray, #E0E0E0)", padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text-primary, #0F0F0F)", margin: 0 }}>
                The interface is natural language.
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 400, color: "var(--text-secondary, #666666)", lineHeight: 1.5, margin: 0 }}>
                No specialized training is required to begin using the technology. Previous GPTs demanded new skills before they could be applied. GenAI meets people where they already are: in conversation.
              </p>
            </div>
            <div style={{ flex: 1, border: "1px solid var(--border-gray, #E0E0E0)", padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text-primary, #0F0F0F)", margin: 0 }}>
                The infrastructure already exists.
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 400, color: "var(--text-secondary, #666666)", lineHeight: 1.5, margin: 0 }}>
                Previous GPTs required physical deployment: railways for steam, wiring for electricity, cables and servers for the internet. GenAI requires a browser. The delivery mechanism was built by the last GPT.
              </p>
            </div>
          </div>

          {/* Section Divider */}
          <hr style={{ border: "none", borderTop: "1px solid var(--border-gray, #E0E0E0)", margin: 0 }} />

          {/* Electricity Parallel */}
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 28,
              fontWeight: 500,
              color: "var(--text-primary, #0F0F0F)",
              letterSpacing: "-1px",
              margin: 0,
            }}
          >
            The Electricity Parallel and Its Implications
          </h2>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 400,
              color: "var(--text-primary, #0F0F0F)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            When factories first adopted electricity, most replaced their steam engines with electric motors and changed nothing else: same layout, same workflows, same management structure. The result was a modest efficiency gain. It took nearly a generation before manufacturers recognized that electricity enabled an entirely different factory design: smaller motors at each workstation, flexible floor plans, workflows impossible under a single-drive-shaft model. That second wave, the redesign wave, is where the transformative economic value was created. GenAI is currently in the equivalent of the bolt-on-a-motor phase. The redesign phase is beginning.
          </p>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 400,
              color: "var(--text-primary, #0F0F0F)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Virginia&apos;s 780,000 small and mid-size businesses sit at the beginning of this pattern. Most are in the bolt-on phase, encountering AI through their existing software without deliberate engagement. Some are beginning to experiment. A small number are already redesigning how they work around what the technology makes possible. The question this research explores is not whether Virginia businesses will encounter GenAI. They already have. It is whether they will develop the fluency to move from passive exposure to genuine competitive advantage, and what determines the difference between those that do and those that don&apos;t.
          </p>

          {/* Bottom Nav */}
          <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 32, borderTop: "1px solid var(--border-gray, #E0E0E0)" }}>
            <Link
              href="/ch2"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--accent-crimson, #C41E3A)",
                textDecoration: "none",
              }}
            >
              Chapter 2: The Fluency Variable →
            </Link>
          </div>

          {/* Footer */}
          <div
            className="flex flex-col md:flex-row gap-4 md:gap-0"
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 24,
              fontFamily: "Inter, sans-serif",
              fontSize: 12,
              color: "var(--text-tertiary, #999999)",
            }}
          >
            <div style={{ display: "flex", gap: 24 }}>
              <Link href="/privacy" style={{ color: "var(--text-tertiary, #999999)", textDecoration: "none" }}>Privacy</Link>
              <Link href="/legal" style={{ color: "var(--text-tertiary, #999999)", textDecoration: "none" }}>Legal</Link>
              <a href="https://buildfirst.io" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-tertiary, #999999)", textDecoration: "none" }}>buildfirst.io</a>
            </div>
            <span>Virginia AI Futures is a BuildFirst research project</span>
          </div>
        </main>
      </div>
    </div>
  );
}
