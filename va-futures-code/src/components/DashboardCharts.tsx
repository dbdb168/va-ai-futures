"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// ─── Types ────────────────────────────────────────────────────────────────────

interface RegionDataset {
  label: string;
  data: (number | null)[];
  color: string;
}

interface RegionalUnemployment {
  title: string;
  subtitle: string;
  labels: string[];
  datasets: RegionDataset[];
  scenario_reading: string;
}

interface AugmentationDataset {
  label: string;
  data: number[];
  color: string;
}

interface AugmentationData {
  title: string;
  subtitle: string;
  labels: string[];
  datasets: AugmentationDataset[];
  scenario_reading: string;
}

interface TaskCoverageCategory {
  label: string;
  observed: number;
  theoretical: number;
}

interface TaskCoverageData {
  title: string;
  subtitle: string;
  categories: TaskCoverageCategory[];
  scenario_reading: string;
}

// ─── Regional Unemployment Line Chart ─────────────────────────────────────────

export function RegionalUnemploymentChart({ data }: { data: RegionalUnemployment }) {
  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map((ds) => ({
      label: ds.label,
      data: ds.data,
      borderColor: ds.color,
      backgroundColor: ds.color + "20",
      borderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 5,
      tension: 0.3,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 10,
          padding: 16,
          font: { size: 11, family: "Inter, system-ui, sans-serif" },
          color: "#666666",
        },
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (ctx: any) =>
            `${ctx.dataset.label}: ${ctx.parsed.y}%`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: "#F0F0F0" },
        ticks: { font: { size: 11 }, color: "#999999" },
      },
      y: {
        grid: { color: "#F0F0F0" },
        ticks: {
          font: { size: 11 },
          color: "#999999",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callback: (v: any) => `${v}%`,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

// ─── Augmentation vs Automation Bar Chart ─────────────────────────────────────

export function AugmentationChart({ data }: { data: AugmentationData }) {
  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map((ds) => ({
      label: ds.label,
      data: ds.data,
      backgroundColor: ds.color + "CC",
      borderColor: ds.color,
      borderWidth: 1,
      borderRadius: 3,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 10,
          padding: 16,
          font: { size: 11, family: "Inter, system-ui, sans-serif" },
          color: "#666666",
        },
      },
      tooltip: {
        callbacks: {
          label: // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (ctx: any) =>
            `${ctx.dataset.label}: ${ctx.parsed.y}%`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 }, color: "#999999" },
      },
      y: {
        grid: { color: "#F0F0F0" },
        max: 70,
        ticks: {
          font: { size: 11 },
          color: "#999999",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callback: (v: any) => `${v}%`,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

// ─── Task Coverage Horizontal Bar ─────────────────────────────────────────────

export function TaskCoverageChart({ data }: { data: TaskCoverageData }) {
  const chartData = {
    labels: data.categories.map((c) => c.label),
    datasets: [
      {
        label: "Observed usage",
        data: data.categories.map((c) => c.observed),
        backgroundColor: "#2D6B3F" + "CC",
        borderColor: "#2D6B3F",
        borderWidth: 1,
        borderRadius: 3,
      },
      {
        label: "Theoretical capability",
        data: data.categories.map((c) => c.theoretical),
        backgroundColor: "#E0E0E0",
        borderColor: "#C8C0AD",
        borderWidth: 1,
        borderRadius: 3,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 10,
          padding: 16,
          font: { size: 11, family: "Inter, system-ui, sans-serif" },
          color: "#666666",
        },
      },
      tooltip: {
        callbacks: {
          label: // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (ctx: any) =>
            `${ctx.dataset.label}: ${ctx.parsed.x}%`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: "#F0F0F0" },
        max: 100,
        ticks: {
          font: { size: 11 },
          color: "#999999",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callback: (v: any) => `${v}%`,
        },
      },
      y: {
        grid: { display: false },
        ticks: { font: { size: 11 }, color: "#666666" },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
