import Sidebar from "@/components/Sidebar";
import RegionalAnalysis from "@/components/RegionalAnalysis";
import Link from "next/link";

export default function Ch3Page() {
  return (
    <div className="flex min-h-screen bg-bg-page">
      <Sidebar />

      <main className="flex-1 overflow-y-auto pb-[72px] md:pb-0">
        {/* Dark Header */}
        <div
          className="flex flex-col items-center justify-center text-center py-10 px-6 md:px-20 md:h-[360px]"
          style={{ backgroundColor: "#0F0F0F" }}
        >
          <p
            className="font-semibold uppercase"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              color: "#C41E3A",
              letterSpacing: 1,
            }}
          >
            CHAPTER 3
          </p>
          <h1
            className="mt-4 text-[36px] md:text-[64px]"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 500,
              color: "#FAFAF7",
            }}
          >
            The Knowledge Network Effect
          </h1>
          <p
            className="mt-4 text-center text-[14px] md:text-[16px]"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#999",
              maxWidth: 800,
            }}
          >
            How peer proximity, professional density, and institutional infrastructure determine the speed and depth of AI fluency diffusion.
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

          <p className="text-text-primary text-[16px] leading-[1.7]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Technology diffusion research consistently identifies the same variables: density of peer networks, proximity to early adopters, and access to institutional support structures. These variables explain why General Purpose Technologies produce uneven economic effects across geographies, and why GenAI fluency in Virginia will follow the same pattern.
          </p>

          {/* Body paragraph */}
          <p className="text-text-primary text-[16px] leading-[1.7]" style={{ maxWidth: 1100 }}>
            An insurance agent in Henrico County, surrounded by 412 peer firms within a 30-minute drive, inhabits a fundamentally different knowledge environment than an agent in Tazewell County, where the nearest peer group of any density is 90 miles away. The difference is not intelligence, ambition, or access to technology. It is access to the <em>informal</em> knowledge networks through which AI fluency actually spreads: conversations at trade lunches, examples shared at chamber meetings, the colleague who demonstrates what they built last weekend.
          </p>

          {/* Pull Quote */}
          <div
            className="py-10 text-center"
            style={{ borderTop: "1px solid #E0E0E0", borderBottom: "1px solid #E0E0E0" }}
          >
            <blockquote
              className="italic mx-auto text-[28px] md:text-[36px]"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                maxWidth: 800,
              }}
            >
              Two forces will determine the distribution of AI fluency across Virginia: the depth of engagement within individual businesses and the reach of knowledge networks across geographies.
            </blockquote>
          </div>

          {/* Section heading */}
          <h2
            className="text-text-primary"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 28,
              fontWeight: 500,
              letterSpacing: -1,
            }}
          >
            Regional Knowledge Infrastructure
          </h2>

          {/* Body */}
          <p className="text-text-primary text-[16px] leading-[1.7]" style={{ maxWidth: 1100 }}>
            Virginia&apos;s economic regions exhibit markedly different conditions for AI fluency diffusion. The eight regions below follow the University of Virginia Weldon Cooper Center for Public Service demographic taxonomy, the standard geographic framework for Virginia policy analysis.
          </p>

          {/* Regional Analysis Interactive Component */}
          <RegionalAnalysis />

          {/* Body */}
          <p className="text-text-primary text-[16px] leading-[1.7]" style={{ maxWidth: 1100 }}>
            This analysis identifies two critical uncertainties that will shape the distribution of AI fluency across Virginia&apos;s SMB economy over the next five years. The first is depth: how far beyond surface-level adoption will businesses progress? The second is reach: will the knowledge networks that enable deeper engagement extend beyond the metro areas where they currently concentrate?
          </p>

          {/* Body */}
          <p className="text-text-primary text-[16px] leading-[1.7]" style={{ maxWidth: 1100 }}>
            Crossing these two variables produces a scenario space. Four plausible futures emerge, each grounded in the economic and geographic dynamics documented above. They overlap, and no single scenario will materialize in pure form. Their value lies not in prediction but in preparation.
          </p>

          {/* Bottom Navigation */}
          <div
            className="flex justify-between items-center"
            style={{ paddingTop: 32, borderTop: "1px solid #E0E0E0" }}
          >
            <Link href="/ch2" className="text-[14px] font-medium text-text-secondary">
              ← Ch 2: The Fluency Variable
            </Link>
            <Link href="/ch4" className="text-[14px] font-medium text-accent-crimson">
              Ch 4: Four Scenarios →
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
