import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
          </div>

          {/* Body */}
          <div className="space-y-4" style={{ maxWidth: 680 }}>
            <p className="text-text-secondary text-[15px]" style={{ lineHeight: 1.7 }}>
              Virginia AI Futures is committed to protecting your privacy. This site does not collect personal data unless you voluntarily submit it through our contact or assessment forms.
            </p>
            <p className="text-text-secondary text-[15px]" style={{ lineHeight: 1.7 }}>
              Assessment responses are processed to generate your personalized analysis and are not shared with third parties.
            </p>
            <p className="text-text-secondary text-[15px]" style={{ lineHeight: 1.7 }}>
              We use no tracking cookies.
            </p>
            <p className="text-text-secondary text-[15px]" style={{ lineHeight: 1.7 }}>
              For questions about data handling, contact{" "}
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
