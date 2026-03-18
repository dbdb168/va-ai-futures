"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Chart.js
const RegionalUnemploymentChart = dynamic(
  () => import("@/components/DashboardCharts").then((m) => m.RegionalUnemploymentChart),
  { ssr: false, loading: () => <ChartPlaceholder /> }
);
const AugmentationChart = dynamic(
  () => import("@/components/DashboardCharts").then((m) => m.AugmentationChart),
  { ssr: false, loading: () => <ChartPlaceholder /> }
);
const TaskCoverageChart = dynamic(
  () => import("@/components/DashboardCharts").then((m) => m.TaskCoverageChart),
  { ssr: false, loading: () => <ChartPlaceholder /> }
);

function ChartPlaceholder() {
  return <div className="w-full h-full flex items-center justify-center text-text-tertiary text-sm">Loading chart...</div>;
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface ChartData {
  last_updated: string;
  next_update: string;
  regional_unemployment: {
    title: string;
    subtitle: string;
    source?: string;
    labels: string[];
    datasets: { label: string; data: (number | null)[]; color: string }[];
    scenario_reading: string;
  };
  anthropic_augmentation: {
    title: string;
    subtitle: string;
    source?: string;
    labels: string[];
    datasets: { label: string; data: number[]; color: string }[];
    scenario_reading: string;
  };
  anthropic_geographic_gini: {
    title: string;
    subtitle: string;
    labels: string[];
    datasets: { label: string; data: number[]; color: string }[];
    scenario_reading: string;
  };
  anthropic_task_coverage: {
    title: string;
    subtitle: string;
    categories: { label: string; observed: number; theoretical: number }[];
    scenario_reading: string;
  };
  scenario_strength: {
    title: string;
    subtitle: string;
    scenarios: {
      name: string;
      active: number;
      emerging: number;
      total: number;
      color: string;
    }[];
    reading: string;
  };
}

interface Indicator {
  signal: string;
  source: string;
  status: "not-yet" | "emerging" | "active" | "strong";
  evidence: string;
  scenario_logic: string;
  last_updated: string;
}

interface Scenario {
  id: string;
  name: string;
  subtitle: string;
  summary: string;
  indicators: Indicator[];
}

interface IndicatorsData {
  last_updated: string;
  next_update: string;
  scenarios: Scenario[];
}

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  "not-yet": "#E0E0E0",
  emerging: "#D4A020",
  active: "#2D6B3F",
  strong: "#C41E3A",
};
const STATUS_LABELS: Record<string, string> = {
  "not-yet": "Not yet",
  emerging: "Emerging",
  active: "Active",
  strong: "Strong",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-[0.5px] text-white"
      style={{ backgroundColor: STATUS_COLORS[status] || "#E0E0E0", color: status === "not-yet" ? "#666" : "#fff" }}
    >
      {STATUS_LABELS[status] || status}
    </span>
  );
}

// ─── Chart section wrapper ────────────────────────────────────────────────────

function ChartSection({
  title,
  context,
  source,
  children,
}: {
  title: string;
  context: string;
  source: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h3
        className="text-[28px] font-medium text-text-primary"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "-1px" }}
      >
        {title}
      </h3>
      <p className="text-text-secondary text-[14px]" style={{ lineHeight: 1.5 }}>
        {context}
      </p>
      <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #E0E0E0", height: "300px", padding: "16px" }}>
        {children}
      </div>
      <p className="text-text-tertiary text-[11px] font-medium" style={{ letterSpacing: "0.5px" }}>
        {source}
      </p>
    </div>
  );
}

// ─── Gini stat display ────────────────────────────────────────────────────────

function GiniStat({ data }: { data: ChartData["anthropic_geographic_gini"] }) {
  const latest = data.datasets[0]?.data.slice(-1)[0];
  const prior = data.datasets[0]?.data[0];

  return (
    <div className="space-y-4">
      <h3
        className="text-[28px] font-medium text-text-primary"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "-1px" }}
      >
        Geographic Spread of AI Usage
      </h3>
      <p className="text-text-secondary text-[14px]" style={{ lineHeight: 1.5 }}>
        The Gini coefficient measures geographic concentration. A falling coefficient means AI usage is spreading more evenly across regions &mdash; a key signal for the distributed scenarios.
      </p>
      <div
        className="rounded-lg overflow-hidden flex items-center justify-center"
        style={{ border: "1px solid #E0E0E0", height: "200px", padding: "16px" }}
      >
        <div className="flex items-center gap-8">
          {/* Prior value */}
          <div className="flex flex-col items-center gap-2">
            <span
              className="text-[72px] font-medium text-text-primary leading-none"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "-2px" }}
            >
              {prior ?? "—"}
            </span>
            <span className="text-[11px] font-medium uppercase text-text-tertiary" style={{ letterSpacing: "0.5px" }}>
              {data.labels[0] ?? "Prior"}
            </span>
          </div>
          {/* Arrow */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 16H26M26 16L20 10M26 16L20 22" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {/* Latest value */}
          <div className="flex flex-col items-center gap-2">
            <span
              className="text-[72px] font-medium text-accent-crimson leading-none"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "-2px" }}
            >
              {latest ?? "—"}
            </span>
            <span className="text-[11px] font-medium uppercase text-text-tertiary" style={{ letterSpacing: "0.5px" }}>
              {data.labels[data.labels.length - 1] ?? "Latest"}
            </span>
          </div>
        </div>
      </div>
      <p className="text-text-tertiary text-[11px] font-medium" style={{ letterSpacing: "0.5px" }}>
        Source: Anthropic Economic Index, January 2026 report.
      </p>
    </div>
  );
}

// ─── Scenario icon helper ─────────────────────────────────────────────────────

const SCENARIO_ICONS: Record<string, { emoji: string; color: string }> = {
  "build-it-yourself": { emoji: "🔧", color: "#2D6B3F" },
  "software-does-it": { emoji: "💻", color: "#C41E3A" },
  "pockets-of-excellence": { emoji: "📍", color: "#D4A020" },
  "widening-gap": { emoji: "📉", color: "#666666" },
};

// ─── Scenario signal panel ────────────────────────────────────────────────────

function ScenarioPanel({
  scenario,
  expanded,
  onToggle,
}: {
  scenario: Scenario;
  expanded: boolean;
  onToggle: () => void;
}) {
  const icon = SCENARIO_ICONS[scenario.id] || { emoji: "📊", color: "#999" };
  const activeCount = scenario.indicators.filter((i) => i.status === "active" || i.status === "strong").length;
  const emergingCount = scenario.indicators.filter((i) => i.status === "emerging").length;
  const notYetCount = scenario.indicators.filter((i) => i.status === "not-yet").length;

  const statusParts: string[] = [];
  if (activeCount > 0) statusParts.push(`${activeCount} active`);
  if (emergingCount > 0) statusParts.push(`${emergingCount} emerging`);
  if (notYetCount > 0) statusParts.push(`${notYetCount} not yet`);
  const statusSummary = statusParts.join(" · ");

  return (
    <div style={{ border: "1px solid #E0E0E0" }}>
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 text-left"
        style={{ padding: "16px 20px" }}
      >
        {/* Icon circle */}
        <div
          className="flex items-center justify-center rounded-full shrink-0"
          style={{ width: 48, height: 48, backgroundColor: icon.color }}
        >
          <span className="text-[20px]">{icon.emoji}</span>
        </div>
        {/* Name + subtitle */}
        <div className="flex-1 min-w-0">
          <p
            className="text-[18px] font-medium text-text-primary"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {scenario.name}
          </p>
          <p className="text-text-tertiary text-[12px]">{scenario.subtitle}</p>
        </div>
        {/* Status summary */}
        <p className="text-text-tertiary text-[12px] shrink-0">{statusSummary}</p>
        {/* Chevron */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="shrink-0 transition-transform"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="M4 6L8 10L12 6" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Expanded indicators */}
      {expanded && (
        <div style={{ padding: "0 20px 20px 20px" }}>
          <div className="space-y-3">
            {scenario.indicators.map((ind, i) => {
              const dotColor =
                ind.status === "active" || ind.status === "strong"
                  ? "#22C55E"
                  : ind.status === "emerging"
                  ? "#D4A020"
                  : "rgba(51, 51, 51, 0.5)";
              return (
                <div key={i} className="flex items-start gap-3" style={{ paddingLeft: 4 }}>
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: dotColor, marginTop: 6 }}
                  />
                  <div className="space-y-1">
                    <p className="text-[13px] font-medium text-text-primary leading-snug">{ind.signal}</p>
                    <p className="text-text-secondary text-[12px] leading-[1.5]">{ind.evidence}</p>
                    <p className="text-text-tertiary text-[11px]">Source: {ind.source}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function DashboardClient() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [indicators, setIndicators] = useState<IndicatorsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedScenario, setExpandedScenario] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/chart-data.json").then((r) => r.json()),
      fetch("/indicators.json").then((r) => r.json()),
    ])
      .then(([cd, ind]) => {
        setChartData(cd);
        setIndicators(ind);
        setLoading(false);
        // Expand the first scenario by default
        if (ind?.scenarios?.length > 0) {
          setExpandedScenario(ind.scenarios[0].id);
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-accent-crimson border-t-transparent rounded-full animate-spin" />
          <p className="text-text-tertiary text-sm">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error || !chartData || !indicators) {
    return (
      <div className="py-12 text-center">
        <p className="text-text-tertiary text-sm">Unable to load dashboard data. {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">

      {/* Chart 1: Regional Employment Divergence */}
      <ChartSection
        title="Regional Employment Divergence"
        context="Why this matters: If AI fluency spreads broadly, economic benefits distribute and these lines converge. If fluency concentrates in metros, the lines diverge. The persistent 1.5 to 2.5 percentage point gap between Northern Virginia and Southside is the economic signature of uneven capability distribution."
        source="Source: Bureau of Labor Statistics, Local Area Unemployment Statistics."
      >
        <RegionalUnemploymentChart data={chartData.regional_unemployment} />
      </ChartSection>

      {/* Chart 2: Automation vs. Augmentation */}
      <ChartSection
        title="How People Use AI: Automation vs. Augmentation"
        context="Why this matters: Augmentation means people are thinking with AI. Automation means AI is doing tasks for people. The ratio is the clearest measure of whether adoption is becoming fluency or staying shallow."
        source="Source: Anthropic Economic Index (Hugging Face, CC-BY)."
      >
        <AugmentationChart data={chartData.anthropic_augmentation} />
      </ChartSection>

      {/* Chart 3: Geographic Gini */}
      <GiniStat data={chartData.anthropic_geographic_gini} />

      {/* Chart 4: Task Coverage / Fluency Gap */}
      <ChartSection
        title="The Fluency Gap: What AI Could Do vs. What It Does"
        context="Why this matters: The gap between theoretical AI capability and observed real-world usage is the fluency gap. A narrowing gap means people are learning to use AI closer to its potential. A persistent gap means the tools exist but the skills don&apos;t."
        source="Source: Anthropic Economic Index + Eloundou et al. (2023)."
      >
        <TaskCoverageChart data={chartData.anthropic_task_coverage} />
      </ChartSection>

      {/* Scenario Signal Detail */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2
            className="text-[32px] font-medium text-text-primary"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "-1px" }}
          >
            Scenario Signal Detail
          </h2>
          <p className="text-text-secondary text-[16px]" style={{ lineHeight: 1.5 }}>
            Click each scenario to see the specific indicators driving its assessment.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#22C55E" }} />
            <span className="text-text-secondary text-[12px]">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#D4A020" }} />
            <span className="text-text-secondary text-[12px]">Emerging</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "rgba(51, 51, 51, 0.5)" }} />
            <span className="text-text-secondary text-[12px]">Not yet</span>
          </div>
        </div>

        {/* Scenario panels */}
        <div className="flex flex-col" style={{ gap: 1 }}>
          {indicators.scenarios.map((scenario) => (
            <ScenarioPanel
              key={scenario.id}
              scenario={scenario}
              expanded={expandedScenario === scenario.id}
              onToggle={() =>
                setExpandedScenario((prev) => (prev === scenario.id ? null : scenario.id))
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
