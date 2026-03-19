import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Virginia AI Futures — AI Readiness for Virginia Businesses",
  description:
    "How will AI reshape 780,000 Virginia small and mid-size businesses? Four plausible futures grounded in economic data and technology diffusion research.",
  openGraph: {
    title: "Virginia AI Futures",
    description:
      "How will AI reshape 780,000 Virginia small and mid-size businesses? Four plausible futures grounded in economic data and scenario planning.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Virginia AI Futures",
    description:
      "How will AI reshape 780,000 Virginia small and mid-size businesses? Four plausible futures grounded in scenario planning.",
  },
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-bg-page">
      <Sidebar />

      <main className="flex-1 overflow-y-auto pb-[72px] md:pb-0">
        {/* Top spacer — pushes content to lower portion */}
        <div className="h-[10vh] md:h-[30vh]" />

        {/* Content container using site specs */}
        <div className="max-w-[1104px] mx-auto px-6 py-10 md:px-8 md:py-10" style={{ }}>

          {/* Two-column layout */}
          <div className="flex flex-col md:flex-row gap-12">
            {/* Body column */}
            <div className="flex-1 space-y-6">
              <p className="text-[12px] font-semibold uppercase text-accent-crimson" style={{ letterSpacing: "2px" }}>
                The Fluency Question
              </p>
              <h1
                className="text-[36px] md:text-[64px] font-semibold text-text-primary"
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
            <div className="w-full md:w-[280px] shrink-0 pt-0 md:pt-[140px]">
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pb-4 pt-10 md:pt-[80px]">
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
