import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-bg-page">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        {/* Top spacer — pushes content to lower portion */}
        <div style={{ height: "30vh" }} />

        {/* Content container using site specs */}
        <div className="max-w-[1104px] mx-auto" style={{ padding: "40px 32px" }}>

          {/* Two-column layout */}
          <div className="flex gap-12">
            {/* Body column */}
            <div className="flex-1 space-y-6">
              <p className="text-[12px] font-semibold uppercase text-accent-crimson" style={{ letterSpacing: "2px" }}>
                The Fluency Question
              </p>
              <h1
                className="text-[64px] font-semibold text-text-primary"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: 1.1 }}
              >
                Virginia AI Futures
              </h1>
              <p className="text-text-primary text-[16px]" style={{ lineHeight: 1.7 }}>
                Virginia sits at an inflection point. If the Commonwealth&apos;s businesses grasp the AI opportunity early, Virginia becomes one of the most competitive, adaptive regional economies in the country. If they don&apos;t, a quiet erosion of competitiveness begins, slowly at first, and then all at once.
              </p>
              <p className="text-text-primary text-[16px]" style={{ lineHeight: 1.7 }}>
                This research asks a straightforward question: how is AI going to impact Virginia&apos;s businesses? What are the forces that will shape that impact, and what could the resulting futures look like?
              </p>
              <p className="text-text-primary text-[16px]" style={{ lineHeight: 1.7 }}>
                Using Shell&apos;s scenario planning methodology, we constructed four plausible futures, grounded in economic data and technology diffusion research, exploring how generative AI fluency, not mere adoption, will reshape 780,000 small and mid-size businesses over the next five years.
              </p>
              <p className="text-text-primary text-[16px]" style={{ lineHeight: 1.7 }}>
                These scenarios are not predictions. They are provocations: conversation starters for business owners thinking past next quarter, executives navigating workforce and technology strategy, policymakers shaping the environment those businesses operate in, and anyone curious about what happens when a general purpose technology meets an economy this diverse.
              </p>
              <p className="text-text-primary text-[16px]" style={{ lineHeight: 1.7 }}>
                If these scenarios spark new questions about Virginia&apos;s AI readiness and the economic stakes of getting it right, they&apos;ve done their job.
              </p>
              <Link href="/ch1" className="inline-block text-accent-crimson text-[14px] font-medium pt-2">
                Chapter 1: The General Purpose Technology Thesis →
              </Link>
            </div>

            {/* Callout column */}
            <div className="w-[280px] shrink-0" style={{ paddingTop: 140 }}>
              <div
                className="space-y-3"
                style={{ paddingLeft: 24, borderLeft: "3px solid #C41E3A" }}
              >
                <p className="text-[13px] font-semibold text-text-primary">
                  Shell&apos;s Scenario Planning
                </p>
                <p className="text-text-secondary text-[13px]" style={{ lineHeight: 1.6 }}>
                  Shell&apos;s scenario planning methodology was developed at Royal Dutch Shell in the early 1970s by Pierre Wack and Ted Newland. Rather than forecasting a single future, the method identifies critical uncertainties and constructs multiple plausible futures. The goal is not prediction but preparation: making strategic decisions that perform well across different outcomes.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pb-4" style={{ paddingTop: 80 }}>
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
