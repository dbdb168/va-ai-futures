import ScenarioPage, { ScenarioData } from "@/components/ScenarioPage";

const data: ScenarioData = {
  scenarioNumber: "SCENARIO 1 OF 4",
  badge: "DEEP & DISTRIBUTED",
  badgeColor: "#C41E3A",
  title: "\u201cBuild It Yourself\u201d",
  subtitle: "Broad fluency spreads through peer networks across Virginia\u2019s geography.",
  heroImageSrc: "/images/scenario-build-it-yourself.jpg",
  heroImageAlt: "Virginia mountain landscape \u2014 Shenandoah Valley",

  narrativeRows: [
    {
      paragraphs: [
        "It begins with the insurance agents. Not the ones in Northern Virginia, who adopted AI tools early through proximity to the tech corridor, but the ones in the Shenandoah Valley. A cluster of independent agents in Staunton, connected through a regional association, begins sharing what they have built.",
        "One agent has built a renewal risk tool that pulls client history, claims data, and flood zone maps. Mid-call, the agent surfaces analysis no carrier system provides. Another has automated policy comparison workflows that encode decades of carrier relationship knowledge. A third has created a client communication system that adjusts tone and detail level based on individual preferences learned over years of interaction.",
        "None of these tools came from Applied Epic or any other vendor. They were built by the agents themselves, using AI capabilities that require nothing more than a browser and the willingness to experiment. The vendor platforms provide the data infrastructure. The agents provide the intelligence layer.",
      ],
      annotations: [
        {
          title: "Builder Window",
          body: "Insurance: 36\u201360 months before platforms catch up. Judgment-augmentation tools encode too much context for vendors to replicate generically.",
        },
        {
          title: "Regional Density",
          body: "Central Virginia: 412 insurance firms. Shenandoah Valley: 89. The density shapes the speed of knowledge transfer.",
        },
      ],
    },
    {
      paragraphs: [
        "The knowledge spreads the way all professional knowledge spreads: through trust networks, not broadcast channels. An agent in Harrisonburg sees what the Staunton group built and asks how. The Staunton agents share, not the tools themselves, but the approach: here is how we thought about it, here is what we tried, here is what failed. Within six months, three more regional clusters emerge.",
        "By 2028, the pattern has spread beyond insurance. A dental practice in Short Pump builds a patient recall engine calibrated to individual communication preferences and treatment history. A CPA in Staunton builds a client advisory prep system that pulls data, compares to goals, and identifies variances before every quarterly meeting. A general contractor in Harrisonburg uploads 12 years of project data and builds an estimating tool that accounts for the difference between Valley winter specs and Tidewater requirements.",
        "None of these tools are sophisticated by Silicon Valley standards. They do not require engineering teams or venture capital. They require something the Valley cannot replicate: decades of domain-specific knowledge, encoded into tools by the people who possess it.",
      ],
      annotations: [
        {
          title: "Cross-Industry Spread",
          body: "Healthcare, CPA, Construction, and HVAC all show builder-window timelines of 18\u201360 months. The pattern is sector-agnostic: proprietary knowledge + AI fluency = defensible advantage.",
        },
        {
          title: "Layer 3 Engagement",
          body: "Business-Specific Innovation. AI capabilities compound with domain expertise to produce tools no vendor would ever build.",
        },
      ],
    },
  ],

  pullQuote:
    "The knowledge spreads the way all professional knowledge spreads: through trust networks, not broadcast channels.",

  stat: "30\u201335%",
  statLabel:
    "Estimated share of Virginia\u2019s professional service businesses that reach Layer 3 engagement within five years, driven by curiosity, peer network proximity, or economic necessity.",

  economicOutcomeRow: {
    paragraphs: [
      "By 2029, Virginia\u2019s SMB economy has developed a distributed innovation layer. Not uniform. Not universal. But widespread enough that the state\u2019s economic development narrative has shifted. Where Virginia once competed on proximity to federal procurement and defense contracting, it now competes on something harder to replicate: a professional class that builds with AI rather than merely consuming it.",
      "The strategic question for the remaining 65\u201370% is not whether GenAI will affect their business environment. It is whether they will achieve sufficient understanding of the technology to exercise agency over how it affects them, or whether that determination will be made by competitors, software vendors, and market dynamics operating outside their awareness.",
    ],
    annotations: [
      {
        title: "Conditions Required",
        body: "Deep fluency + distributed reach. Peer networks extend beyond metro areas. Community colleges and chambers become AI fluency hubs. Rural regions participate actively.",
      },
      {
        title: "Key Risk",
        body: "Requires sustained peer-to-peer knowledge transfer. A trust shock or economic downturn during the critical 2026\u20132028 window could freeze this pattern mid-formation.",
      },
    ],
  },

  otherScenarios: [
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
    {
      badge: "SHALLOW & CONCENTRATED",
      title: "\u201cThe Widening Gap\u201d",
      desc: "A trust shock or recession during the critical window hardens the fluency divide.",
      href: "/scenarios/the-widening-gap",
    },
  ],

  prevNav: { label: "Chapter 4: Four Scenarios for Virginia", href: "/ch4" },
  nextNav: { label: "Chapter 5: Implications", href: "/ch5" },
};

export default function BuildItYourselfPage() {
  return <ScenarioPage data={data} />;
}
