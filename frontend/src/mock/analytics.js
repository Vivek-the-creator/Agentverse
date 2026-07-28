export const mockAnalytics = {
  overviewStats: {
    totalCasesAnalyzed: 1482,
    activeLitigations: 142,
    winRatePercentage: 89.4,
    avgResolutionDays: 64,
    documentsProcessed: 18420,
    totalLegalNoticesGenerated: 890,
    riskMitigatedAmount: "₹ 142.5 Cr",
    aiAccuracyScore: "96.8%"
  },
  caseStatusDistribution: {
    labels: ["Completed / Disposed", "In Progress", "Under Review", "Drafting Phase", "Appeals Pending"],
    datasets: [
      {
        label: "Cases Count",
        data: [720, 390, 180, 112, 80],
        backgroundColor: [
          "#10B981", // Emerald / Green
          "#6366F1", // Indigo
          "#F59E0B", // Amber
          "#8B5CF6", // Purple
          "#EF4444"  // Red
        ],
        borderWidth: 0
      }
    ]
  },
  monthlyCaseTrends: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Cases Ingested",
        data: [65, 82, 110, 95, 130, 168, 195, 210, 185, 240, 265, 290],
        borderColor: "#6366F1",
        backgroundColor: "rgba(99, 102, 241, 0.15)",
        fill: true,
        tension: 0.4
      },
      {
        label: "Favorable Outcomes",
        data: [58, 74, 98, 86, 118, 150, 178, 192, 169, 218, 242, 268],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.4
      }
    ]
  },
  caseCategoryBreakdown: {
    labels: [
      "Property & RERA",
      "Consumer Complaints",
      "Cyber Crime & Data",
      "Employment & Labor",
      "Rental & Tenancy",
      "Traffic & MACT",
      "Insurance Claims",
      "Financial Fraud",
      "Domestic & Family",
      "Contract Breach"
    ],
    datasets: [
      {
        label: "Active Cases",
        data: [280, 210, 160, 140, 120, 150, 130, 95, 110, 87],
        backgroundColor: "rgba(99, 102, 241, 0.8)",
        borderRadius: 8
      }
    ]
  },
  riskMatrix: {
    labels: ["Low Risk (<30)", "Medium Risk (30-60)", "High Risk (60-80)", "Critical Risk (>80)"],
    datasets: [
      {
        label: "Percentage of Docket",
        data: [58, 27, 11, 4],
        backgroundColor: ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"]
      }
    ]
  },
  agentPerformance: [
    { name: "Document Intelligence Agent", metric: "Document Processing", val: "18,420 Files", efficiency: "99.4%", avgTime: "1.2s" },
    { name: "Legal Research Agent", metric: "Statute Mapping", val: "42,100 Sections", efficiency: "98.1%", avgTime: "2.4s" },
    { name: "Precedent Retrieval Agent", metric: "Case Law Matches", val: "12,900 Precedents", efficiency: "95.7%", avgTime: "3.1s" },
    { name: "Evidence Classifier & Audit", metric: "Proof Validation", val: "9,450 Evidences", efficiency: "97.2%", avgTime: "1.8s" },
    { name: "Outcome Predictor Engine", metric: "Win Probability Model", val: "1,482 Predictions", efficiency: "94.8%", avgTime: "2.0s" },
    { name: "Defense Strategy Generator", metric: "Argument Taxonomy", val: "3,890 Strategies", efficiency: "96.5%", avgTime: "2.9s" },
    { name: "Legal Notice Draft Agent", metric: "Notices Drafted", val: "890 Notices", efficiency: "99.1%", avgTime: "1.5s" },
    { name: "Executive Synthesizer", metric: "Final Dossiers", val: "1,482 Dossiers", efficiency: "99.8%", avgTime: "1.1s" }
  ]
};
