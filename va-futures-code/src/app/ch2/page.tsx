import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Fluency Variable — Virginia AI Futures",
  description:
    "The difference between AI adoption and AI fluency, and the four dimensions that measure genuine competitive advantage.",
  openGraph: {
    title: "Ch 2: The Fluency Variable",
    description:
      "How the four dimensions of AI fluency determine whether technology adoption becomes competitive advantage.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ch 2: The Fluency Variable",
    description:
      "How the four dimensions of AI fluency determine whether technology adoption becomes competitive advantage.",
  },
};

export default function Ch2Page() {
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
            className="text-[11px] font-semibold uppercase"
            style={{ color: "#C41E3A", letterSpacing: "1px", fontFamily: "Inter, sans-serif" }}
          >
            CHAPTER 2
          </p>
          <h1
            className="mt-4 text-[36px] md:text-[64px] font-medium"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "#FAFAF7",
            }}
          >
            The Fluency Variable
          </h1>
          <p
            className="mt-4 text-[14px] md:text-[16px] max-w-[800px]"
            style={{ color: "#999", fontFamily: "Inter, sans-serif" }}
          >
            How the four dimensions of AI fluency determine whether technology adoption becomes competitive advantage.
          </p>
        </div>

        {/* Content Area */}
        <div className="space-y-10 max-w-[1104px] mx-auto px-6 md:px-8" style={{ paddingTop: 40, paddingBottom: 40 }}>
          {/* CTA Bar */}
          <div className="flex justify-end">
            <Link
              href="/assess"
              className="inline-flex items-center px-4 py-2 rounded-full text-[13px] font-medium text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#C41E3A" }}
            >
              Analyze Your Business →
            </Link>
          </div>

          {/* Pull Quote */}
          <div
            className="text-center mx-auto max-w-[800px]"
            style={{
              borderTop: "1px solid #E0E0E0",
              borderBottom: "1px solid #E0E0E0",
              padding: "40px 0",
            }}
          >
            <blockquote
              className="text-[28px] md:text-[36px] italic text-text-primary"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              &ldquo;The critical variable is not adoption. It is fluency.&rdquo;
            </blockquote>
          </div>

          {/* Body + Margin Row 1 */}
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <p className="text-text-primary text-[16px] leading-[1.7]">
                Adoption tells you that a business uses AI. Fluency tells you whether that business understands AI well enough to identify new opportunities: to reimagine how they work, find efficiencies, drive new growth, and become more competitive. The gap between those two states is where the next decade of competitive differentiation will be determined, and it varies significantly by industry and geography.
              </p>
            </div>
            <div className="w-full md:w-[280px] md:shrink-0">
              <div style={{ paddingLeft: 16, borderLeft: "3px solid #C41E3A" }}>
                <p className="text-[13px] font-semibold text-text-primary">Fluency vs Adoption</p>
                <p className="text-text-secondary text-[13px] leading-[1.6] mt-1">
                  Adoption is binary — you use it or you don&apos;t. Fluency is a spectrum, measured across multiple dimensions.
                </p>
              </div>
            </div>
          </div>

          {/* Body paragraph */}
          <p className="text-text-primary text-[16px] leading-[1.7] max-w-[1100px]">
            The electricity parallel from Chapter 1 reveals a pattern that applies directly. Business engagement with GenAI operates across three distinct layers, each representing a fundamentally different relationship with AI, just as factories moved from bolt-on motors to entirely redesigned workflows.
          </p>

          {/* Three Layers */}
          <div className="space-y-4">
            <div style={{ borderLeft: "4px solid #C41E3A", padding: 24 }}>
              <p className="font-semibold text-text-primary text-[14px]">Layer 1: Passive Exposure</p>
              <p className="text-text-primary text-[14px] leading-[1.7] mt-1">
                Software vendors embed AI capabilities into existing products. The business may not be aware of the change. This is the bolt-on motor: the technology enters the business environment without deliberate engagement.
              </p>
            </div>
            <div style={{ borderLeft: "4px solid #C41E3A", padding: 24 }}>
              <p className="font-semibold text-text-primary text-[14px]">Layer 2: Active Adoption</p>
              <p className="text-text-primary text-[14px] leading-[1.7] mt-1">
                The business deliberately uses AI tools: asking questions, automating tasks, integrating into existing workflows. Useful but generic. This is the factory that uses electric motors but has not yet redesigned its floor plan.
              </p>
            </div>
            <div style={{ borderLeft: "4px solid #C41E3A", padding: 24 }}>
              <p className="font-semibold text-text-primary text-[14px]">Layer 3: Business-Specific Innovation</p>
              <p className="text-text-primary text-[14px] leading-[1.7] mt-1">
                New sources of value creation. AI capabilities compound with domain expertise to produce tools, workflows, and insights that no vendor would ever build — because they require proprietary business knowledge. This is the redesigned factory: fundamentally different, not incrementally better.
              </p>
            </div>
          </div>

          <p className="text-text-primary text-[16px] leading-[1.7] max-w-[1100px]">
            The layers tell you how deep a business has gone. But depth alone doesn&apos;t tell you much. A business at Layer 2 could be asking AI to draft emails and stopping there, or it could be automating entire client workflows. Same layer, entirely different trajectory. What&apos;s missing is two things: what that engagement actually looks like in practice, and whether the business is doing it well enough for it to matter.
          </p>

          {/* Section heading: Modes of Engagement */}
          <h2
            className="text-[28px] font-medium text-text-primary"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "-1px" }}
          >
            Modes of Engagement
          </h2>

          {/* Intro */}
          <p className="text-text-primary text-[16px] leading-[1.7] max-w-[1100px]">
            We see different modes of AI engagement. They are not sequential or hierarchical. A business can enter at any point.
          </p>

          {/* Modes Grid 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div style={{ padding: 24, border: "1px solid #E0E0E0" }}>
              <p className="font-semibold text-text-primary text-[14px]">Asking</p>
              <p className="text-text-primary text-[14px] leading-[1.7] mt-1">
                Using AI to retrieve information, answer questions, draft text. The most common entry point, but not the only one.
              </p>
            </div>
            <div style={{ padding: 24, border: "1px solid #E0E0E0" }}>
              <p className="font-semibold text-text-primary text-[14px]">Automating</p>
              <p className="text-text-primary text-[14px] leading-[1.7] mt-1">
                Connecting AI to existing workflows to handle routine, repeatable tasks without manual intervention. A business could start here without ever asking a single question.
              </p>
            </div>
            <div style={{ padding: 24, border: "1px solid #E0E0E0" }}>
              <p className="font-semibold text-text-primary text-[14px]">Augmenting</p>
              <p className="text-text-primary text-[14px] leading-[1.7] mt-1">
                AI enhances professional judgment by surfacing analysis, patterns, and recommendations that compound with domain expertise. This is where AI becomes a thinking partner, not just a tool.
              </p>
            </div>
            <div style={{ padding: 24, border: "1px solid #E0E0E0" }}>
              <p className="font-semibold text-text-primary text-[14px]">Agency</p>
              <p className="text-text-primary text-[14px] leading-[1.7] mt-1">
                AI systems operate autonomously within defined boundaries: monitoring, deciding, and acting with human oversight at strategic checkpoints. The right choice for specific, well-understood processes.
              </p>
            </div>
          </div>

          {/* Body */}
          <p className="text-text-primary text-[16px] leading-[1.7] max-w-[1100px]">
            A CPA firm might automate invoice categorization while augmenting tax advisory work and never use agency at all. A restaurant might jump directly to automating scheduling without first using AI to ask questions. The modes are not a ladder. They describe the shape of engagement, not a sequence. But knowing what a business does with AI still doesn&apos;t tell you whether they&apos;re doing it well. That requires a different lens.
          </p>

          {/* Section divider */}
          <hr style={{ border: "none", borderTop: "1px solid #E0E0E0" }} />

          {/* Section heading: The Four Ds */}
          <h2
            className="text-[28px] font-medium text-text-primary"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "-1px" }}
          >
            The Four Ds: Measuring Fluency
          </h2>

          {/* Credit */}
          <p className="text-[12px] text-text-tertiary">
            From Anthropic&apos;s AI Fluency Framework (Dakan, Feller &amp; Anthropic, 2025).
          </p>

          {/* Four Ds Grid 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div style={{ padding: 24, border: "1px solid #E0E0E0", borderTop: "3px solid #C41E3A" }}>
              <p className="font-semibold text-text-primary text-[14px]">Delegation</p>
              <p className="text-text-primary text-[14px] leading-[1.7] mt-1">
                Knowing what to hand off to AI and what to keep. Most people get this wrong — either delegating too little (using AI as a search engine) or too much (trusting AI with judgment calls it cannot make).
              </p>
            </div>
            <div style={{ padding: 24, border: "1px solid #E0E0E0" }}>
              <p className="font-semibold text-text-primary text-[14px]">Description</p>
              <p className="text-text-primary text-[14px] leading-[1.7] mt-1">
                Communicating what you need with clarity and precision. Not &apos;prompting.&apos; Clarity of thought. The quality of AI output correlates directly with the quality of the input.
              </p>
            </div>
            <div style={{ padding: 24, border: "1px solid #E0E0E0" }}>
              <p className="font-semibold text-text-primary text-[14px]">Discernment</p>
              <p className="text-text-primary text-[14px] leading-[1.7] mt-1">
                Evaluating AI output: is it good, mediocre, or dangerous? The most underrated fluency skill. Without discernment, every other capability is compromised.
              </p>
            </div>
            <div style={{ padding: 24, border: "1px solid #E0E0E0" }}>
              <p className="font-semibold text-text-primary text-[14px]">Diligence</p>
              <p className="text-text-primary text-[14px] leading-[1.7] mt-1">
                Verifying, checking, governing. The trust layer that makes everything safe to scale. Diligence turns AI from a risk into an asset.
              </p>
            </div>
          </div>

          {/* Small credit */}
          <p className="text-[11px] text-text-tertiary max-w-[1100px]">
            From Anthropic&apos;s AI Fluency Framework. Developed by Rick Dakan (Ringling College) and Joseph Feller (University College Cork) in collaboration with Anthropic, 2025. CC BY-NC-SA 4.0.
          </p>

          {/* Closing */}
          <p className="text-text-primary text-[16px] leading-[1.7] max-w-[1100px]">
            Three lenses, each adding resolution. The layers describe how deep a business has gone, from passive exposure through to genuine innovation. The modes describe the shape of that engagement, what the business is actually doing with AI. And the Four Ds measure the quality, how well they&apos;re doing it. Together, they give us a fluency profile: a way to assess not just whether a business uses AI, but how far, in what ways, and how effectively. That profile describes a single business. The next question is what determines whether fluency spreads beyond it.
          </p>

          {/* Bottom Navigation */}
          <div className="flex justify-between items-center" style={{ borderTop: "1px solid #E0E0E0", paddingTop: 32 }}>
            <Link href="/ch1" className="text-[14px] font-medium hover:underline" style={{ color: "#C41E3A" }}>
              ← Chapter 1: The GPT Thesis
            </Link>
            <Link href="/ch3" className="text-[14px] font-medium hover:underline" style={{ color: "#C41E3A" }}>
              Chapter 3: Knowledge Networks →
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
