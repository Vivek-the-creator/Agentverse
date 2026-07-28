export const mockAgents = [
  {
    id: "agent_01",
    name: "Document Intelligence Agent",
    iconName: "FileSearch",
    description: "Parses uploaded legal contracts, court filings, WhatsApp chats, audio transcripts, and OCR scans to extract entities, clauses, and key facts.",
    status: "Completed", // "Completed" | "Processing" | "Waiting" | "Failed"
    progress: 100,
    estimatedTime: "Completed (1.2s)",
    outputSummary: "Extracted 28 clauses, 4 financial transactions, 6 key dates, and 3 signatory identities from 4 documents.",
    color: "emerald"
  },
  {
    id: "agent_02",
    name: "Legal Research Agent",
    iconName: "BookOpenCheck",
    description: "Queries state & national statutory databases to pinpoint exact applicable acts, sections, and constitutional provisions.",
    status: "Completed",
    progress: 100,
    estimatedTime: "Completed (2.4s)",
    outputSummary: "Mapped RERA Act 2016 Section 18, Specific Relief Act Section 10, and Contract Act Section 73.",
    color: "indigo"
  },
  {
    id: "agent_03",
    name: "Similar Case Retrieval Agent",
    iconName: "SearchCode",
    description: "Executes vector similarity search across 500,000+ Supreme Court & High Court judgments to retrieve matching judicial precedents.",
    status: "Completed",
    progress: 100,
    estimatedTime: "Completed (3.1s)",
    outputSummary: "Identified 8 binding Supreme Court precedents with 94%+ ratio decidendi similarity.",
    color: "purple"
  },
  {
    id: "agent_04",
    name: "Evidence Analysis & Classifier",
    iconName: "ShieldAlert",
    description: "Evaluates evidentiary weight, admissibility under Evidence Act / Section 65B IT Act, and flags potential gaps or risks.",
    status: "Completed",
    progress: 100,
    estimatedTime: "Completed (1.8s)",
    outputSummary: "Verified agreement for sale and bank wire receipts as 98% conclusive proof.",
    color: "blue"
  },
  {
    id: "agent_05",
    name: "Outcome Predictor Engine",
    iconName: "TrendingUp",
    description: "Simulates judicial scoring model using machine learning to compute Win Probability, Risk Score, and Settlement Odds.",
    status: "Completed",
    progress: 100,
    estimatedTime: "Completed (2.0s)",
    outputSummary: "Computed 88% Success Probability, 24/100 Low Risk Index, and 75% Settlement Chance.",
    color: "emerald"
  },
  {
    id: "agent_06",
    name: "Defense & Counter Strategy Generator",
    iconName: "Zap",
    description: "Formulates tactical defense counter-arguments, cross-examination points, and interim relief prayers.",
    status: "Completed",
    progress: 100,
    estimatedTime: "Completed (2.9s)",
    outputSummary: "Generated 4-step strategic roadmap and RERA Section 18 interest recovery calculation.",
    color: "amber"
  },
  {
    id: "agent_07",
    name: "Legal Notice Drafting Agent",
    iconName: "FileText",
    description: "Auto-drafts formal court-ready legal notices, petitions, or response affidavits formatted for specific judicial forums.",
    status: "Completed",
    progress: 100,
    estimatedTime: "Completed (1.5s)",
    outputSummary: "Drafted 100% compliant RERA Section 18 demand notice ready for instant PDF export.",
    color: "indigo"
  },
  {
    id: "agent_08",
    name: "Executive Report Synthesizer",
    iconName: "Award",
    description: "Bundles all multi-agent findings into a comprehensive executive dossier for senior counsel and litigants.",
    status: "Completed",
    progress: 100,
    estimatedTime: "Completed (1.1s)",
    outputSummary: "Synthesized 18-page PDF dossier ready for immediate download.",
    color: "violet"
  }
];
