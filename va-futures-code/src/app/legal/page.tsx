import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export default function LegalPage() {
  return (
    <div className="flex min-h-screen bg-bg-page">
      <Sidebar />

      <main className="flex-1 overflow-y-auto pb-[72px] md:pb-0">
        <div className="space-y-10 max-w-[960px] mx-auto px-6 py-10 md:px-8 md:py-[60px]">

          {/* Header */}
          <div className="space-y-2">
            <h1
              className="text-[32px] md:text-[48px] font-medium text-text-primary"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "-2px" }}
            >
              Terms of Use
            </h1>
          </div>

          {/* Body */}
          <div className="space-y-4" style={{ maxWidth: 680 }}>
            <p className="text-text-secondary text-[15px]" style={{ lineHeight: 1.7 }}>
              The content on Virginia AI Futures is provided for informational and educational purposes only. The scenarios presented are works of structured fiction designed to provoke strategic thinking — they are not predictions or professional advice.
            </p>
            <p className="text-text-secondary text-[15px]" style={{ lineHeight: 1.7 }}>
              BuildFirst makes no warranties regarding the accuracy or completeness of the information presented.
            </p>
            <p className="text-text-secondary text-[15px]" style={{ lineHeight: 1.7 }}>
              All original content is copyright BuildFirst 2026. The AI Fluency Framework (Four Ds) is used under CC BY-NC-SA 4.0 license from Anthropic.
            </p>
            <p className="text-text-secondary text-[15px]" style={{ lineHeight: 1.7 }}>
              For questions, contact{" "}
              <a href="mailto:david@thisisluminary.co" className="text-accent-crimson">
                david@thisisluminary.co
              </a>
              .
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
