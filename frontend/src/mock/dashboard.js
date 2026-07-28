export const mockDashboardData = {
  kpiCards: [
    {
      id: "kpi_1",
      title: "Total Active Cases",
      value: "142",
      change: "+12.4%",
      isPositive: true,
      period: "vs last month",
      iconName: "FolderKanban",
      color: "indigo"
    },
    {
      id: "kpi_2",
      title: "AI Win Probability Avg",
      value: "89.4%",
      change: "+4.1%",
      isPositive: true,
      period: "predictive model accuracy",
      iconName: "TrendingUp",
      color: "emerald"
    },
    {
      id: "kpi_3",
      title: "Legal Reports Generated",
      value: "1,482",
      change: "+28.5%",
      isPositive: true,
      period: "automated dossiers",
      iconName: "FileText",
      color: "purple"
    },
    {
      id: "kpi_4",
      title: "Risk Exposure Mitigated",
      value: "₹ 142.5 Cr",
      change: "+18.2%",
      isPositive: true,
      period: "financial litigation value",
      iconName: "ShieldCheck",
      color: "blue"
    }
  ],
  quickActions: [
    { id: "qa_1", title: "Upload & Analyze Case", description: "Drag & drop legal briefs, PDFs, chats or audio scans", route: "/upload", icon: "UploadCloud", color: "indigo" },
    { id: "qa_2", title: "Generate Legal Notice", description: "Auto-draft Section 18 / Section 138 / Breach notices", route: "/upload", icon: "FileEdit", color: "purple" },
    { id: "qa_3", title: "View Intelligence Reports", description: "Browse and download 15+ comprehensive dossiers", route: "/reports", icon: "BookOpen", color: "emerald" },
    { id: "qa_4", title: "Live Agent Pipeline", description: "Monitor 8 real-time AI agents execution status", route: "/processing", icon: "Cpu", color: "blue" }
  ],
  systemHealth: {
    status: "All Multi-Agent Clusters Operational",
    activeAgents: 8,
    uptime: "99.98%",
    apiLatency: "48ms",
    ocrThroughput: "120 pages/min"
  }
};
