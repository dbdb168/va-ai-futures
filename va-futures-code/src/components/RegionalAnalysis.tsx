"use client";

import { useState } from "react";

interface RegionData {
  name: string;
  peer: number;
  adopter: number;
  institutional: number;
  recommendation: string;
}

const regions: RegionData[] = [
  {
    name: "Northern Virginia",
    peer: 95,
    adopter: 90,
    institutional: 85,
    recommendation:
      "Fastest fluency diffusion in the state. Focus: help surrounding regions learn from NoVA\u2019s playbook.",
  },
  {
    name: "Richmond Metro",
    peer: 80,
    adopter: 75,
    institutional: 70,
    recommendation:
      "Strong foundation. Focus: connect finance, legal, and healthcare clusters to accelerate cross-industry learning.",
  },
  {
    name: "Hampton Roads",
    peer: 65,
    adopter: 50,
    institutional: 45,
    recommendation:
      "Federal/defense presence creates pockets but limited spillover. Focus: build bridges between military-adjacent firms and civilian SMBs.",
  },
  {
    name: "Charlottesville / Albemarle",
    peer: 55,
    adopter: 65,
    institutional: 60,
    recommendation:
      "University proximity creates spillover above the state average. Focus: formalize knowledge transfer from university to local business community.",
  },
  {
    name: "Shenandoah Valley",
    peer: 40,
    adopter: 30,
    institutional: 35,
    recommendation:
      "Manufacturing and agriculture base with strong regional associations. Focus: leverage trade association networks as AI fluency channels.",
  },
  {
    name: "Roanoke / New River Valley",
    peer: 45,
    adopter: 40,
    institutional: 50,
    recommendation:
      "Virginia Tech proximity helps but diffusion is uneven. Focus: connect engineering talent to local service businesses.",
  },
  {
    name: "Southside Virginia",
    peer: 20,
    adopter: 15,
    institutional: 15,
    recommendation:
      "Thinnest peer networks in the state. Focus: invest in regional chamber AI programming and bring external expertise in.",
  },
  {
    name: "Southwest Virginia",
    peer: 15,
    adopter: 10,
    institutional: 10,
    recommendation:
      "Most isolated knowledge environment. Focus: digital-first peer networks and remote AI coaching to bypass geographic barriers.",
  },
];

function getLevel(value: number): { label: string; color: string } {
  if (value >= 70) return { label: "High", color: "#22C55E" };
  if (value >= 40) return { label: "Medium", color: "#D4A020" };
  return { label: "Low", color: "#C41E3A" };
}

function overallLevel(region: RegionData): string {
  const avg = (region.peer + region.adopter + region.institutional) / 3;
  return getLevel(avg).color;
}

function Gauge({ label, value }: { label: string; value: number }) {
  const { label: levelText, color } = getLevel(value);

  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: "var(--color-text-primary, #1A1A1A)",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: "var(--color-text-tertiary, #999)",
          }}
        >
          {levelText}
        </span>
      </div>
      <div
        style={{
          width: "100%",
          height: 8,
          borderRadius: 9999,
          backgroundColor: "#E0E0E0",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: 8,
            borderRadius: 9999,
            backgroundColor: color,
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}

export default function RegionalAnalysis() {
  const [expanded, setExpanded] = useState<number>(0);

  return (
    <div>
      {regions.map((region, index) => {
        const isExpanded = expanded === index;

        return (
          <div
            key={region.name}
            style={{
              borderBottom:
                index < regions.length - 1 ? "1px solid #E0E0E0" : "none",
            }}
          >
            {/* Region row */}
            <button
              onClick={() => setExpanded(index)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "16px 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: overallLevel(region),
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: isExpanded ? 600 : 500,
                  color: isExpanded
                    ? "var(--color-text-primary, #1A1A1A)"
                    : "var(--color-text-secondary, #555)",
                  transition: "color 0.2s ease",
                }}
              >
                {region.name}
              </span>
            </button>

            {/* Expanded content */}
            {isExpanded && (
              <div style={{ paddingBottom: 20, paddingLeft: 18 }}>
                <div style={{ maxWidth: 480 }}>
                  <Gauge label="Peer Network Density" value={region.peer} />
                  <Gauge
                    label="Early Adopter Proximity"
                    value={region.adopter}
                  />
                  <Gauge
                    label="Institutional Support"
                    value={region.institutional}
                  />
                </div>

                <div
                  style={{
                    marginTop: 16,
                    paddingLeft: 16,
                    borderLeft: "3px solid #C41E3A",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: "var(--color-text-secondary, #555)",
                      margin: 0,
                    }}
                  >
                    {region.recommendation}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 11,
          lineHeight: 1.5,
          color: "#999999",
          marginTop: 24,
        }}
      >
        Sources: Bureau of Labor Statistics (LAUS), U.S. Census Bureau (BTOS), Virginia Employment Commission, BuildFirst field observations, university and chamber of commerce program data. Regional taxonomy follows the UVA Weldon Cooper Center for Public Service.
      </p>
    </div>
  );
}
