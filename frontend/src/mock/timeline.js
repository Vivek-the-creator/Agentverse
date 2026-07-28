export const mockTimelines = [
  {
    caseId: "case_001",
    events: [
      { id: "tm_1", date: "2026-07-25", time: "14:30", title: "AI Multi-Agent Processing Initiated", category: "AI System", description: "Case file uploaded and dispatched across 8 specialized neural agents.", status: "completed" },
      { id: "tm_2", date: "2026-07-25", time: "14:31", title: "Precedent Analysis Complete", category: "Research", description: "Matched Supreme Court judgments on RERA Section 18 delayed interest.", status: "completed" },
      { id: "tm_3", date: "2026-07-25", time: "14:32", title: "Legal Notice Auto-Drafted", category: "Drafting", description: "Court notice generated and attached to case dossier.", status: "completed" },
      { id: "tm_4", date: "2026-01-14", time: "10:00", title: "Tribunal Complaint Formally Registered", category: "Court Action", description: "Registered under Case No. CS/2026/8941 in MahaRERA Tribunal.", status: "completed" },
      { id: "tm_5", date: "2026-08-12", time: "11:30", title: "Upcoming Evidence Hearing", category: "Hearing", description: "Scheduled hearing before Presiding Officer for final cross-examination.", status: "upcoming" }
    ]
  },
  {
    caseId: "case_003",
    events: [
      { id: "tm_10", date: "2026-02-01", time: "09:15", title: "FIR Charge Sheet Submitted", category: "Cyber Cell", description: "Cyber crime cell filed forensic logs under IT Act Section 66.", status: "completed" },
      { id: "tm_11", date: "2026-02-05", time: "16:00", title: "Section 65B Electronic Proof Validated", category: "Forensic", description: "Chain of custody established for cloud memory dumps.", status: "completed" },
      { id: "tm_12", date: "2026-08-25", time: "10:30", title: "Court Framing of Charges Hearing", category: "Court Action", description: "Charges to be formally read to accused syndicate members.", status: "upcoming" }
    ]
  }
];

export const mockRecentActivities = [
  { id: "act_1", user: "Adv. Rajesh Sharma", action: "generated RERA Legal Notice for", target: "Sharma vs. Apex Realty", time: "12 mins ago", icon: "FileText", color: "indigo" },
  { id: "act_2", user: "Dr. Ananya Roy", action: "downloaded Forensic Audit Report for", target: "State vs. Cyber Syndicate", time: "45 mins ago", icon: "Download", color: "emerald" },
  { id: "act_3", user: "LexIntel AI Core", action: "completed 100% processing for", target: "Kulkarni vs. NovaSoft", time: "1 hour ago", icon: "CheckCircle", color: "blue" },
  { id: "act_4", user: "Adv. Sunita Kulkarni", action: "added medical evidence to", target: "Kapur vs. Kapur", time: "3 hours ago", icon: "PlusSquare", color: "purple" },
  { id: "act_5", user: "Rohan Deshmukh", action: "updated win probability model for", target: "Apex Logistics Insurance Claim", time: "5 hours ago", icon: "TrendingUp", color: "amber" }
];
