"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STEPS = [
  "Researching your business...",
  "Scoring your fluency profile...",
  "Mapping to Virginia scenarios...",
  "Building your recommendations...",
];

export default function AssessProcessingPage() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Cycle through step labels while Claude works
    const interval = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
    }, 5000);

    async function runAnalysis() {
      try {
        const intakeRaw = sessionStorage.getItem("assess_intake");
        const answersRaw = sessionStorage.getItem("assess_answers");
        if (!intakeRaw || !answersRaw) {
          router.push("/assess");
          return;
        }

        const intake = JSON.parse(intakeRaw);
        const answers = JSON.parse(answersRaw);

        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ intake, answers }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Analysis failed");
        }

        const result = await res.json();
        sessionStorage.setItem("assess_result", JSON.stringify(result));
        router.push("/assess/results");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      }
    }

    runAnalysis();
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="min-h-screen bg-bg-page flex">
      {/* Sidebar Rail */}
      <aside className="w-[72px] shrink-0 bg-bg-sidebar flex flex-col items-center py-6">
        <div className="w-10 h-10 rounded-lg bg-accent-crimson flex items-center justify-center">
          <span
            className="text-text-on-dark font-semibold text-xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            VF
          </span>
        </div>
      </aside>

      {/* Centered loading state */}
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-center w-[400px]">
          {error ? (
            <>
              <p className="text-accent-crimson text-[14px]">{error}</p>
              <button
                onClick={() => router.push("/assess")}
                className="text-[13px] text-text-secondary underline"
              >
                Start over
              </button>
            </>
          ) : (
            <>
              {/* Spinner */}
              <div className="relative w-12 h-12">
                <svg className="absolute inset-0 w-12 h-12" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" stroke="#E0E0E0" strokeWidth="3" />
                </svg>
                <svg
                  className="absolute inset-0 w-12 h-12 animate-spin"
                  viewBox="0 0 48 48"
                  fill="none"
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="22"
                    stroke="#C41E3A"
                    strokeWidth="3"
                    strokeDasharray="34 104"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h2
                className="font-serif text-[28px] font-semibold text-text-primary leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Generating your personalized analysis
              </h2>

              <p className="text-text-secondary text-[14px] leading-relaxed">
                {STEPS[stepIndex]}
              </p>

              <p className="text-text-tertiary text-[12px]">
                This takes 15–30 seconds
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
