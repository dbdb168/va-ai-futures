import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen bg-bg-page">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="space-y-10 max-w-[1104px] mx-auto" style={{ padding: "60px 32px" }}>

          {/* Header */}
          <div className="space-y-2">
            <p className="text-[11px] font-medium uppercase text-text-tertiary" style={{ letterSpacing: "0.5px" }}>
              Contact
            </p>
            <h1
              className="text-[48px] font-medium text-text-primary"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "-2px" }}
            >
              Get in Touch
            </h1>
            <p className="text-text-secondary text-[16px]" style={{ lineHeight: 1.5, maxWidth: 600 }}>
              Have a question about this research or interested in working with BuildFirst? Send us a message and David will get back to you.
            </p>
          </div>

          {/* Two Column: Form + Right Info */}
          <div className="flex gap-12">
            {/* Form Card */}
            <div
              className="space-y-5 rounded-lg bg-white"
              style={{ width: 560, padding: 32, border: "1px solid #E0E0E0" }}
            >
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-text-primary">Name</label>
                <input
                  type="text"
                  className="w-full rounded text-[13px] text-text-secondary outline-none"
                  style={{ height: 44, padding: "12px 16px", border: "1px solid #E0E0E0" }}
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-text-primary">Email</label>
                <input
                  type="email"
                  className="w-full rounded text-[13px] text-text-secondary outline-none"
                  style={{ height: 44, padding: "12px 16px", border: "1px solid #E0E0E0" }}
                  placeholder="you@company.com"
                />
              </div>

              {/* Organization */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-text-primary">Organization (optional)</label>
                <input
                  type="text"
                  className="w-full rounded text-[13px] text-text-secondary outline-none"
                  style={{ height: 44, padding: "12px 16px", border: "1px solid #E0E0E0" }}
                  placeholder="Your organization"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-text-primary">Message</label>
                <textarea
                  className="w-full rounded text-[13px] text-text-secondary outline-none resize-none"
                  style={{ height: 120, padding: "12px 16px", border: "1px solid #E0E0E0" }}
                  placeholder="How can we help?"
                />
              </div>

              {/* Submit */}
              <button
                className="rounded text-[14px] font-medium text-white bg-accent-crimson hover:bg-accent-crimson/90 transition-colors"
                style={{ padding: "14px 24px" }}
              >
                Send Message
              </button>
            </div>

            {/* Right Column */}
            <div className="flex-1 space-y-6">
              <p className="text-[13px] font-semibold text-text-primary">About BuildFirst</p>
              <p className="text-text-secondary text-[13px]" style={{ lineHeight: 1.6 }}>
                BuildFirst works with Virginia business leaders to evaluate their AI fluency position and develop strategies for moving from adoption to business-specific advantage.
              </p>
              <div className="w-full h-px bg-border-gray" />
              <p className="text-[11px] font-medium uppercase text-text-tertiary" style={{ letterSpacing: "0.5px" }}>
                Direct Contact
              </p>
              <a href="mailto:david@thisisluminary.co" className="flex items-center gap-2 text-accent-crimson text-[14px]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                david@thisisluminary.co
              </a>
              <a href="https://buildfirst.io" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-secondary text-[14px]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                buildfirst.io
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pb-4">
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
