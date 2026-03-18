import ScenarioPage, { ScenarioData } from "@/components/ScenarioPage";

const data: ScenarioData = {
  scenarioNumber: "SCENARIO 2 OF 4",
  badge: "SHALLOW & DISTRIBUTED",
  badgeColor: "#B8860B",
  title: "\u201cSoftware Does It For You\u201d",
  subtitle: "Platform-delivered AI creates broad but shallow adoption. The inoculation effect.",
  heroImageSrc: "/images/scenario-software-does-it.jpg",
  heroImageAlt: "Aerial view of suburban Virginia office corridor",

  narrativeRows: [
    {
      paragraphs: [
        "By 2027, every major SaaS platform serving Virginia\u2019s SMBs has shipped AI features. QuickBooks writes categorization suggestions. Applied Epic drafts renewal letters. Every CRM auto-generates follow-up emails. Every scheduling tool flags high-risk appointments. The AI is everywhere, and it costs nothing extra.",
        "The inoculation effect emerges gradually. A business owner who has been \u201cusing AI\u201d through QuickBooks feels no urgency to explore further. The technology has arrived. The box is checked. The AI fluency score stays at 2.0 while the owner believes they\u2019re at 4.0. The platform has provided the experience of AI without the competency.",
        "By 2028, two classes of Virginia business emerge. The majority operates at Layer 1\u2014platform-delivered convenience. A visible minority, concentrated in metro clusters and high-fluency peer networks, has moved to Layers 2 and 3. The gap between them is not yet visible in revenue data. It is visible in capability.",
      ],
      annotations: [
        {
          title: "The Inoculation Effect",
          body: "When surface-level AI adoption creates a false sense of understanding, reducing motivation to explore deeper capabilities.",
        },
        {
          title: "Layer 1 vs Layer 3",
          body: "Platform Consumption vs Business-Specific Innovation. The gap is not access\u2014it is fluency.",
        },
      ],
    },
    {
      paragraphs: [
        "The knowledge spreads the way all professional knowledge spreads: through trust networks, not broadcast channels. An agent in Harrisonburg sees what the Staunton group built and asks how. The Staunton agents share, not the tools themselves, but the approach: here is how we thought about it, here is what we tried, here is what failed.",
        "By 2028, the pattern has spread beyond insurance. A dental practice in Short Pump builds a patient recall engine. A CPA in Staunton builds a client advisory prep system. But these are the exceptions. Most of the market has accepted the platform layer as sufficient.",
        "The platform revenue model reinforces stasis. SaaS companies profit from broad shallow adoption. Deeper fluency means fewer platform seats, not more. The incentive structure of the software industry actively works against the fluency development of its customers.",
      ],
      annotations: [
        {
          title: "Census BTOS Data",
          body: "Quarterly survey captures adoption breadth but not depth. A business clicking \u2018accept AI suggestion\u2019 counts the same as one building custom tools.",
        },
        {
          title: "Platform Revenue Model",
          body: "SaaS companies profit from broad shallow adoption. Deeper fluency means fewer platform seats, not more.",
        },
      ],
    },
  ],

  pullQuote:
    "The platform does it for you. The same way it does it for your competitor. And the competitor 20 miles away who builds something extraordinary with the same tools remains invisible until they are not.",

  stat: "60%+",
  statLabel:
    "Estimated share of Virginia SMBs \u201cusing AI\u201d by 2028\u2014but virtually all at Layer 1 platform consumption.",

  economicOutcomeRow: {
    paragraphs: [
      "Virginia\u2019s economy grows, but the growth accrues disproportionately to platform companies and the businesses that achieve fluency beyond platform features. The majority of Virginia\u2019s SMBs maintain stable revenue while gradually losing competitive positioning in ways that are not yet measurable.",
      "The fluency gap becomes invisible. Metrics show adoption. The competitive divergence happens beneath the data. By the time it becomes visible in revenue and employment numbers, the window for easy intervention has closed.",
    ],
    annotations: [
      {
        title: "Conditions Required",
        body: "Shallow fluency + distributed reach. Platform-level AI in every SaaS tool. No external shock to disrupt adoption.",
      },
      {
        title: "Key Risk",
        body: "The fluency gap becomes invisible. Metrics show adoption. The competitive divergence happens beneath the data.",
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

  prevNav: { label: "Ch 4: Four Scenarios", href: "/ch4" },
  nextNav: { label: "Scenario 3: Pockets of Excellence", href: "/scenarios/pockets-of-excellence" },
};

export default function SoftwareDoesItPage() {
  return <ScenarioPage data={data} />;
}
