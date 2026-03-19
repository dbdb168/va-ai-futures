import type { Metadata } from "next";
import ScenarioPage, { ScenarioData } from "@/components/ScenarioPage";

export const metadata: Metadata = {
  title: "The Widening Gap — Virginia AI Futures",
  description:
    "How external shocks and institutional caution can freeze AI fluency development and permanently harden economic divides.",
  openGraph: {
    title: "The Widening Gap — Shallow & Concentrated",
    description:
      "A trust shock or recession during the critical window hardens the fluency divide. Scenario 4 of 4 from the Virginia AI Futures research.",
    images: [
      {
        url: "/images/scenario-the-widening-gap.jpg",
        width: 2512,
        height: 720,
        alt: "Empty Virginia Main Street — economic displacement",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Widening Gap — Shallow & Concentrated",
    description:
      "A trust shock or recession during the critical window hardens the fluency divide.",
    images: ["/images/scenario-the-widening-gap.jpg"],
  },
};

const data: ScenarioData = {
  scenarioNumber: "SCENARIO 4 OF 4",
  badge: "SHALLOW & CONCENTRATED",
  badgeColor: "#7B4B2A",
  title: "\u201cThe Widening Gap\u201d",
  subtitle: "A trust shock or recession during the critical window hardens the fluency divide.",
  heroImageSrc: "/images/scenario-the-widening-gap.jpg",
  heroImageAlt: "Empty Virginia Main Street \u2014 economic displacement",

  narrativeRows: [
    {
      paragraphs: [
        "It begins with a shock. In late 2026, a high-profile AI failure\u2014a legal AI system that generates fabricated case citations in a Virginia Supreme Court filing\u2014triggers a wave of institutional caution across professional service sectors. Law firms pause AI adoption. Accounting firms pull back from experimental workflows. Healthcare administrators freeze AI procurement pending guidance from state regulators.",
        "The timing is critical. Virginia\u2019s SMBs are in the early stages of AI exploration\u2014curious but uncommitted. The trust shock arrives precisely when business owners are making their foundational decisions about AI: whether to engage deeply, whether to invest in fluency development, whether to build custom tools or wait for the platforms to mature.",
        "A concurrent economic slowdown compounds the effect. Discretionary investment in new capabilities\u2014which is how most SMB owners categorize AI exploration\u2014is the first budget line to cut. The combination of external shock and economic pressure produces a two-year freeze in AI fluency development across Virginia\u2019s small business economy.",
      ],
      annotations: [
        {
          title: "The Trust Shock",
          body: "A single high-profile failure can freeze an entire sector\u2019s exploration. The legal profession\u2019s response to AI hallucination incidents set the template for cascading institutional caution.",
        },
        {
          title: "Critical Window",
          body: "2026\u20132028 is the period when most SMBs will form their baseline relationship with AI. A shock during this window doesn\u2019t delay adoption\u2014it permanently shapes the floor.",
        },
      ],
    },
    {
      paragraphs: [
        "By 2028, the pattern has hardened. The metro clusters\u2014Arlington, Richmond, Virginia Beach\u2014continue developing AI fluency through peer networks that survived the trust shock. These businesses had already built enough capability to evaluate AI failures contextually rather than categorically. They distinguish between the legal AI hallucination incident and their own established workflows.",
        "The remaining 85% settles into a stable equilibrium of platform-level consumption. They use the AI features their software vendors ship. They do not build. They do not experiment. The trust shock has provided the rationalization they needed to stop at Layer 1\u2014not because they decided against AI fluency, but because the external environment gave them permission to defer.",
        "The most corrosive aspect of this scenario is its invisibility. Businesses that have never experienced Layer 3 engagement cannot perceive the gap. The AI features in their SaaS tools are working. Revenue is stable. The competitive erosion is happening in slow motion, in capabilities and positioning and talent pipelines, in ways that will not appear in quarterly numbers for years.",
      ],
      annotations: [
        {
          title: "The Double Barrier",
          body: "Platform inoculation + trust shock. Surface-level AI use creates false sense of understanding. External shock reinforces caution. Together they produce a near-permanent floor.",
        },
        {
          title: "Invisible Divergence",
          body: "The businesses experiencing the gap cannot perceive it. Metrics show growth. Revenue is stable. The competitive erosion happens gradually, visible only in retrospect.",
        },
      ],
    },
  ],

  pullQuote:
    "The gap is not between businesses that adopt AI and businesses that don\u2019t. It is between businesses that understand what they adopted and businesses that merely consumed what their vendors provided.",

  stat: "85%",
  statLabel:
    "Estimated share of Virginia\u2019s SMBs that remain at platform-level AI consumption in this scenario, unable to perceive the competitive gap forming beneath stable revenue numbers.",

  economicOutcomeRow: {
    paragraphs: [
      "Virginia\u2019s economy continues to grow, but the growth masks a structural bifurcation. The 15% of businesses that achieved fluency before or despite the trust shock compound their advantage. They attract the AI-fluent talent that wants to work where the practice is sophisticated. They win the competitive situations where capability, not price, is the differentiator. They build the institutional knowledge that makes their advantage durable.",
      "The remaining businesses do not decline in absolute terms. They grow slower. They lose competitive situations they do not understand. Their best employees leave for environments where AI fluency is developed and rewarded. The gap widens not dramatically but continuously, in the background of a seemingly stable economy.",
    ],
    annotations: [
      {
        title: "Conditions Required",
        body: "Shallow fluency + concentrated reach. A trust shock or recession during the 2026\u20132028 critical window. Metro clusters survive but broader adoption freezes.",
      },
      {
        title: "Key Risk",
        body: "This is the hardest scenario to reverse. Once the trust shock calcifies into institutional caution and the fluency gap becomes invisible to those experiencing it, only external disruption restarts the development process.",
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
      badge: "DEEP & CONCENTRATED",
      title: "\u201cPockets of Excellence\u201d",
      desc: "Deep fluency forms in metro clusters while most of the state remains at platform level.",
      href: "/scenarios/pockets-of-excellence",
    },
  ],

  prevNav: { label: "Scenario 3: Pockets of Excellence", href: "/scenarios/pockets-of-excellence" },
  nextNav: { label: "Chapter 5: Implications", href: "/ch5" },
};

export default function TheWideningGapPage() {
  return <ScenarioPage data={data} />;
}
