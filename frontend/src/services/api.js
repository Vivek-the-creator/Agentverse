import { mockUsers } from "../mock/users";
import { mockCases } from "../mock/cases";
import { mockReports } from "../mock/reports";
import { mockAnalytics } from "../mock/analytics";
import { mockAgents } from "../mock/agents";
import { mockTimelines, mockRecentActivities } from "../mock/timeline";
import { mockNotifications } from "../mock/notifications";
import { mockDashboardData } from "../mock/dashboard";

// Helper function to simulate realistic backend network latency (500 - 900ms)
const simulateLatency = (ms = 650) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * LexIntel API Service Layer
 * Designed for immediate production replacement with FastAPI / PostgreSQL endpoints.
 */
export const api = {
  // Authentication
  async login(email, password) {
    await simulateLatency(700);
    const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase()) || mockUsers[0];
    return {
      success: true,
      data: {
        user,
        token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(user))}.signature_placeholder`,
        message: "Authentication successful."
      }
    };
  },

  async register(userData) {
    await simulateLatency(800);
    const newUser = {
      id: `usr_${Date.now()}`,
      name: userData.name || "New Advocate",
      email: userData.email,
      role: userData.role || "Legal Advocate",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      barNumber: userData.barNumber || "BAR/2026/001",
      specialization: userData.specialization || "General Practice",
      courtJurisdiction: "District Court",
      casesManaged: 0,
      successRate: "100%",
      status: "Active",
      phone: "+91 99000 00000",
      location: "India",
      joinedDate: new Date().toISOString().split("T")[0],
      bio: "Registered LexIntel AI Legal Platform Member."
    };
    return {
      success: true,
      data: {
        user: newUser,
        token: `token_registered_${Date.now()}`
      }
    };
  },

  async getCurrentUser() {
    await simulateLatency(400);
    return { success: true, data: mockUsers[0] };
  },

  // Dashboard & Analytics
  async getDashboard() {
    await simulateLatency(600);
    return {
      success: true,
      data: {
        kpis: mockDashboardData.kpiCards,
        quickActions: mockDashboardData.quickActions,
        systemHealth: mockDashboardData.systemHealth,
        analytics: mockAnalytics,
        recentCases: mockCases.slice(0, 5),
        recentActivities: mockRecentActivities,
        notifications: mockNotifications.slice(0, 5)
      }
    };
  },

  // Cases Management
  async getCases(filters = {}) {
    await simulateLatency(500);
    let casesList = [...mockCases];
    if (filters.type && filters.type !== "All") {
      casesList = casesList.filter((c) => c.type.toLowerCase() === filters.type.toLowerCase());
    }
    if (filters.status && filters.status !== "All") {
      casesList = casesList.filter((c) => c.status.toLowerCase() === filters.status.toLowerCase());
    }
    if (filters.search) {
      const query = filters.search.toLowerCase();
      casesList = casesList.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.caseNumber.toLowerCase().includes(query) ||
          c.clientName.toLowerCase().includes(query) ||
          c.lawyerName.toLowerCase().includes(query)
      );
    }
    return { success: true, data: casesList };
  },

  async getCaseById(caseId) {
    await simulateLatency(450);
    const foundCase = mockCases.find((c) => c.id === caseId) || mockCases[0];
    const timelineData = mockTimelines.find((t) => t.caseId === foundCase.id) || mockTimelines[0];
    return {
      success: true,
      data: {
        ...foundCase,
        timelineEvents: timelineData.events
      }
    };
  },

  async uploadCase(formData) {
    await simulateLatency(900);
    const newCase = {
      id: `case_${Date.now()}`,
      caseNumber: `CS/2026/${Math.floor(1000 + Math.random() * 9000)}`,
      title: formData.title || "Uploaded Legal Brief Analysis",
      type: formData.caseType || "Property Dispute",
      status: "Processing",
      riskScore: 24,
      riskLevel: "Low",
      successProbability: 88,
      settlementChance: 75,
      courtName: formData.jurisdiction || "High Court of Judicature",
      jurisdiction: formData.jurisdiction || "State High Court",
      filingDate: new Date().toISOString().split("T")[0],
      nextHearingDate: "2026-09-15",
      lawyerName: "Adv. Rajesh Sharma",
      clientName: formData.clientName || "Litigant Party",
      opposingParty: formData.opposingParty || "Opposing Party",
      summary: formData.notes || "Comprehensive legal brief submitted for Multi-Agent AI evaluation.",
      applicableLaws: [
        "Real Estate (Regulation and Development) Act, 2016",
        "Indian Contract Act, 1872 - Section 73",
        "Specific Relief Act, 1963"
      ],
      importantDates: [
        { date: new Date().toISOString().split("T")[0], event: "Legal Brief Ingested by LexIntel Core" }
      ],
      parties: {
        petitioner: { name: formData.clientName || "Petitioner", advocate: "Adv. Rajesh Sharma", role: "Complainant" },
        respondent: { name: formData.opposingParty || "Respondent", advocate: "Opposing Counsel", role: "Defendant" }
      },
      evidence: formData.files || [
        { id: "ev_up_1", title: "Uploaded Brief PDF", type: "PDF Document", score: "Ingested", date: new Date().toISOString().split("T")[0] }
      ],
      generatedNotice: "NOTICE PREPARED & PENDING AGENT SYNTHESIS...",
      defenseStrategy: ["Initial agent processing underway..."],
      tags: ["New Ingestion", "Processing"]
    };

    return {
      success: true,
      data: newCase
    };
  },

  async analyzeCase(caseId) {
    await simulateLatency(650);
    return {
      success: true,
      data: {
        agents: mockAgents,
        currentCase: mockCases[0]
      }
    };
  },

  async predictOutcome(caseId) {
    await simulateLatency(750);
    return {
      success: true,
      data: {
        riskScore: 24,
        riskLevel: "Low",
        successProbability: 88,
        settlementChance: 75,
        confidenceInterval: "95% CI (84% - 92%)",
        keyDrivers: [
          "Precedent binding force in Supreme Court (98% weight)",
          "Irrefutable financial wire receipts (100% evidence score)",
          "Clear statutory mandate under RERA Section 18"
        ]
      }
    };
  },

  async generateDraft(caseId, draftType = "Legal Notice") {
    await simulateLatency(850);
    const targetCase = mockCases.find((c) => c.id === caseId) || mockCases[0];
    return {
      success: true,
      data: {
        draftType,
        noticeText: targetCase.generatedNotice,
        generatedAt: new Date().toISOString()
      }
    };
  },

  // Reports Management
  async getReports(search = "", tag = "All") {
    await simulateLatency(550);
    let list = [...mockReports];
    if (tag && tag !== "All") {
      list = list.filter((r) => r.tags.includes(tag));
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((r) => r.title.toLowerCase().includes(q) || r.caseTitle.toLowerCase().includes(q));
    }
    return { success: true, data: list };
  },

  // Notifications
  async getNotifications() {
    await simulateLatency(400);
    return { success: true, data: mockNotifications };
  }
};
