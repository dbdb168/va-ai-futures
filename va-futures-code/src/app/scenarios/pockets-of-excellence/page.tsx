import type { Metadata } from "next";
import ScenarioPage, { ScenarioData } from "@/components/ScenarioPage";

export const metadata: Metadata = {
  title: "Pockets of Excellence — Virginia AI Futures",
  description:
    "How geographic clustering creates world-class AI fluency centers in Virginia's metros while rural regions lag behind.",
  openGraph: {
    title: "Pockets of Excellence — Deep & Concentrated",
    description:
      "Deep fluency forms in metro clusters while most of the state remains at platform level. Scenario 3 of 4 from the Virginia AI Futures research.",
    images: [
      {
        url: "/images/scenario-pockets-of-excellence.jpg",
        width: 2512,
        height: 720,
        alt: "Nighttime satellite view of Virginia — bright metro clusters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pockets of Excellence — Deep & Concentrated",
    description:
      "Deep fluency forms in metro clusters while most of the state remains at platform level.",
    images: ["/images/scenario-pockets-of-excellence.jpg"],
  },
};

const data: ScenarioData = {
  scenarioNumber: "SCENARIO 3 OF 4",
  badge: "DEEP & CONCENTRATED",
  badgeColor: "#2D6A6A",
  title: "\u201cPockets of Excellence\u201d",
  subtitle: "Deep fluency forms in metro clusters while most of the state remains at platform level.",
  heroImageSrc: "/images/scenario-pockets-of-excellence.jpg",
  heroImageAlt: "Nighttime satellite view of Virginia \u2014 bright metro clusters",

  narrativeRows: [
    {
      paragraphs: [
        "The pattern begins in Arlington. A cluster of management consulting firms, already proximate to federal AI initiatives and venture-backed startups, begins developing AI capabilities that go well beyond platform features. They build analytical tools, automate research pipelines, and encode institutional knowledge into reusable systems. The work is visible to peers. The peers adopt and adapt.",
        "By mid-2027, the Arlington cluster has developed measurably different capabilities. Client deliverables incorporate AI-generated analysis that would take traditional firms twice as long to produce. Pricing power holds. The talent pipeline strengthens\u2014AI-fluent analysts want to work where AI fluency is the norm, not the exception.",
        "The knowledge network effect documented in Chapter 3 operates powerfully within these clusters but fails to propagate beyond them. Richmond develops its own pocket, centered on creative services and fintech. Hampton Roads builds one around defense contracting and logistics. Charlottesville grows a research-adjacent cluster. But the geographic reach of each cluster stops at the metro boundary.",
      ],
      annotations: [
        {
          title: "Proximity Effect",
          body: "Physical and professional proximity to AI practitioners is the strongest predictor of fluency development. Remote work partially extends this but does not replicate it.",
        },
        {
          title: "Arlington Cluster",
          body: "Federal AI initiatives + venture ecosystem + consulting density = ideal conditions for fluency formation.",
        },
      ],
    },
    {
      paragraphs: [
        "Rural and smaller-metro Virginia continues at platform level. Not because the businesses lack capacity, but because they lack the peer networks that normalize building. Without a visible community of practice, there is no peer pressure to develop fluency, no easy way to learn from others\u2019 experiments, and no signal that deeper investment will pay off.",
        "The talent dynamic compounds the gap. AI-fluent workers move toward where the clusters are\u2014not just for compensation, but for the professional environment. The clusters concentrate both the infrastructure for fluency development and the people who carry it. Rural Virginia loses both.",
        "For a Roanoke accounting firm, the calculus is not obvious. QuickBooks AI features work fine. The platform layer is sufficient for current clients. The competitive threat from Arlington is not yet visible. The investment required to build beyond the platform has no obvious short-term return. Rational actors, making local decisions with local information, produce a state-level outcome that no one chose.",
      ],
      annotations: [
        {
          title: "Knowledge Network Boundary",
          body: "Chapter 3 documents how networks drive adoption. In this scenario, those networks remain geographically bounded by metro area.",
        },
        {
          title: "Platform Level Default",
          body: "Without peer networks, even motivated business owners default to vendor-provided AI features.",
        },
      ],
    },
  ],

  pullQuote:
    "The divide is not between businesses that use AI and businesses that don\u2019t. It is between businesses embedded in networks that normalize building and businesses operating outside those networks.",

  stat: "3\u20134",
  statLabel:
    "Number of Virginia metro areas developing measurable AI fluency clusters by 2028, while 90%+ of the state\u2019s geography remains at platform adoption level.",

  economicOutcomeRow: {
    paragraphs: [
      "Virginia develops world-class AI-fluent business clusters in 3\u20134 metros. These clusters attract talent and investment. But the state\u2019s broader economic geography fractures along a new axis: AI fluency density. The clusters pull further ahead. The rest of the state falls further behind\u2014not in absolute terms, but relative to where the economic opportunity is concentrating.",
      "The policy question is not whether to celebrate the clusters. It is whether Virginia can build the mechanisms to extend their reach\u2014intentionally, structurally, before the gap becomes a permanent feature of the state\u2019s economic geography.",
    ],
    annotations: [
      {
        title: "Conditions Required",
        body: "Deep fluency + concentrated reach. Strong metro clusters form but knowledge transfer mechanisms fail to extend beyond them.",
      },
      {
        title: "Key Risk",
        body: "Political pressure to distribute resources equally, diluting cluster advantage without achieving rural penetration.",
      },
    ],
  },

  otherScenarios: [
    {
      badge: "DEEP & DISTRIBUTED",
      title: "\u201cBuild It Yourself\u201d",
      desc: "Broad fluency spreads through peer networks across Virginia\u2019s geography.",
      href: "/scenarios/build-it-yourself",
    },
    {
      badge: "SHALLOW & DISTRIBUTED",
      title: "\u201cSoftware Does It For You\u201d",
      desc: "Platform-delivered AI creates broad but shallow adoption. The inoculation effect.",
      href: "/scenarios/software-does-it",
    },
    {
      badge: "SHALLOW & CONCENTRATED",
      title: "\u201cThe Widening Gap\u201d",
      desc: "A trust shock or recession during the critical window hardens the fluency divide.",
      href: "/scenarios/the-widening-gap",
    },
  ],

  prevNav: { label: "Scenario 2: Software Does It", href: "/scenarios/software-does-it" },
  nextNav: { label: "Scenario 4: The Widening Gap", href: "/scenarios/the-widening-gap" },
};

export default function PocketsOfExcellencePage() {
  return <ScenarioPage data={data} />;
}
