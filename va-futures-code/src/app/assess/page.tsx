"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AssessIntakePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    name: "",
    website: "",
    description: "",
    size: "",
    region: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data and navigate to questions
    if (typeof window !== "undefined") {
      sessionStorage.setItem("assess_intake", JSON.stringify(form));
    }
    router.push("/assess/questions");
  };

  const sizeOptions = [
    "Solo / Sole proprietor",
    "2–5 employees",
    "6–15 employees",
    "16–50 employees",
    "51–100 employees",
    "100+ employees",
  ];

  const regionOptions = [
    "Northern Virginia",
    "Richmond Metro",
    "Hampton Roads",
    "Charlottesville / Albemarle",
    "Roanoke / New River Valley",
    "Shenandoah Valley",
    "Southwest Virginia",
    "Southside Virginia",
    "Eastern Shore",
    "Other / Statewide",
  ];

  return (
    <div className="min-h-screen bg-bg-page flex">
      {/* Sidebar Rail */}
      <aside className="w-[72px] shrink-0 bg-bg-sidebar flex flex-col items-center py-6">
        <div className="w-10 h-10 rounded-lg bg-accent-crimson flex items-center justify-center">
          <span
            className="text-text-on-dark font-semibold text-base"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            VF
          </span>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div
          className="w-full max-w-[600px] bg-bg-page rounded-xl p-12 space-y-8"
          style={{ border: "1px solid #E0E0E0" }}
        >
          {/* Header */}
          <div className="space-y-3">
            <h1
              className="font-serif text-[32px] font-semibold text-text-primary leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Where Does Your Business Sit in Virginia&apos;s AI Future?
            </h1>
            <p className="text-text-secondary text-sm leading-relaxed">
              A 10-minute assessment that combines your AI fluency profile with a
              personalized scenario analysis for your business. You will receive
              your results by email.
            </p>

            {/* Privacy note */}
            <div className="bg-[#F5F5F0] rounded-md p-4 space-y-1">
              <p className="text-[12px] font-semibold text-text-primary">
                How we use your information
              </p>
              <p className="text-[12px] text-text-secondary leading-relaxed">
                Your email is used to send you and only you your assessment results.
                Your business information is used to personalise the analysis — your
                AI fluency profile and Virginia scenario data. We do not share, sell, or
                use it for marketing. You can unsubscribe at any time.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-text-primary">
                Email address
              </label>
              <input
                type="email"
                required
                placeholder="you@yourcompany.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full h-10 px-3 border border-border-gray rounded-md text-[14px] text-text-primary bg-white placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-crimson/30"
              />
              <p className="text-[11px] text-text-tertiary">
                Your Results are sent here
              </p>
            </div>

            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-text-primary">
                Your name
              </label>
              <input
                type="text"
                required
                placeholder="First and last name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full h-10 px-3 border border-border-gray rounded-md text-[14px] text-text-primary bg-white placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-crimson/30"
              />
            </div>

            {/* Website */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-text-primary">
                Business website
              </label>
              <input
                type="url"
                placeholder="https://www.yourcompany.com (include https://)"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                className="w-full h-10 px-3 border border-border-gray rounded-md text-[14px] text-text-primary bg-white placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-crimson/30"
              />
              <p className="text-[11px] text-text-tertiary">
                We will research your business to personalise the analysis. If you don&apos;t
                have a website, describe your business below.
              </p>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-text-primary">
                Briefly describe your business
              </label>
              <textarea
                required
                placeholder="What you do, how many people, services or sector in Virginia. The more specific, the better the analysis."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2.5 border border-border-gray rounded-md text-[14px] text-text-primary bg-white placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-crimson/30 resize-none"
              />
            </div>

            {/* Company size */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-text-primary">
                Company size
              </label>
              <select
                required
                value={form.size}
                onChange={(e) => setForm({ ...form, size: e.target.value })}
                className="w-full h-10 px-3 border border-border-gray rounded-md text-[14px] text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent-crimson/30"
              >
                <option value="" disabled>
                  Select a company size
                </option>
                {sizeOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            {/* Virginia region */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-text-primary">
                Virginia region
              </label>
              <select
                required
                value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })}
                className="w-full h-10 px-3 border border-border-gray rounded-md text-[14px] text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent-crimson/30"
              >
                <option value="" disabled>
                  Select your region
                </option>
                {regionOptions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* CTA */}
            <button
              type="submit"
              className="w-full h-12 bg-success text-white font-semibold text-[15px] rounded-lg hover:bg-success/90 transition-colors"
            >
              Continue to Assessment
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
