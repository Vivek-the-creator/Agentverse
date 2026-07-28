// LexIntel REST API Service Layer
// Replaces the mock static javascript layer with live FastAPI endpoint calls

const API_BASE_URL = "http://localhost:8000/api/v1";

// Helper to attach authorization header if JWT token exists in localStorage
const getHeaders = (isMultipart = false) => {
  const token = localStorage.getItem("lexintel_token");
  const headers = {};
  
  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  return headers;
};

export const api = {
  // Authentication
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail || "Authentication failed.");
    }
    
    return await response.json();
  },

  async register(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: userData.name || "Legal Practitioner",
        email: userData.email,
        password: userData.password || "password123",
        role: userData.role || "Legal Advocate",
        barNumber: userData.barNumber || "BAR/2026/001",
        specialization: userData.specialization || "General Practice",
        courtJurisdiction: "High Court",
        phone: "+91 99000 00000",
        location: "India",
        bio: "Registered LexIntel AI Member."
      })
    });
    
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail || "Registration failed.");
    }
    
    return await response.json();
  },

  async getCurrentUser() {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: getHeaders()
    });
    
    if (!response.ok) {
      throw new Error("Failed to load user credentials.");
    }
    
    return await response.json();
  },

  // Dashboard & Analytics
  async getDashboard() {
    const response = await fetch(`${API_BASE_URL}/dashboard`, {
      method: "GET",
      headers: getHeaders()
    });
    
    if (!response.ok) {
      throw new Error("Failed to load dashboard metrics.");
    }
    
    return await response.json();
  },

  // Cases Management
  async getCases(filters = {}) {
    const params = new URLSearchParams();
    if (filters.type && filters.type !== "All") {
      params.append("type", filters.type);
    }
    if (filters.status && filters.status !== "All") {
      params.append("status", filters.status);
    }
    if (filters.search) {
      params.append("search", filters.search);
    }
    
    const response = await fetch(`${API_BASE_URL}/cases?${params.toString()}`, {
      method: "GET",
      headers: getHeaders()
    });
    
    if (!response.ok) {
      throw new Error("Failed to query cases catalog.");
    }
    
    return await response.json();
  },

  async getCaseById(caseId) {
    const response = await fetch(`${API_BASE_URL}/cases/${caseId}`, {
      method: "GET",
      headers: getHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to load case dossier for ID: ${caseId}`);
    }
    
    return await response.json();
  },

  async uploadCase(formData) {
    const fd = new FormData();
    fd.append("title", formData.title || "Uploaded Brief");
    fd.append("caseType", formData.caseType || "Civil Dispute");
    fd.append("jurisdiction", formData.jurisdiction || "District Court");
    fd.append("clientName", formData.clientName || "Client Party");
    fd.append("opposingParty", formData.opposingParty || "Respondent");
    fd.append("notes", formData.notes || "");
    
    if (formData.files && formData.files.length > 0) {
      formData.files.forEach((file) => {
        if (file.fileObj) {
          fd.append("files", file.fileObj, file.name);
        } else {
          // If it's a sample file without binary stream, mock one
          const dummyBlob = new Blob([`Mock text content for sample file: ${file.name}`], { type: "text/plain" });
          fd.append("files", dummyBlob, file.name);
        }
      });
    }
    
    const response = await fetch(`${API_BASE_URL}/cases/upload`, {
      method: "POST",
      headers: getHeaders(true),
      body: fd
    });
    
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail || "Case file ingestion failed.");
    }
    
    return await response.json();
  },

  async analyzeCase(caseId) {
    const response = await fetch(`${API_BASE_URL}/cases/${caseId}/analyze`, {
      method: "POST",
      headers: getHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to run agent swarm analysis for case: ${caseId}`);
    }
    
    return await response.json();
  },

  async predictOutcome(caseId) {
    const response = await fetch(`${API_BASE_URL}/cases/${caseId}/predict`, {
      method: "POST",
      headers: getHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to run outcome prediction models for case: ${caseId}`);
    }
    
    return await response.json();
  },

  async generateDraft(caseId, draftType = "Legal Notice") {
    const response = await fetch(`${API_BASE_URL}/cases/${caseId}/draft?draftType=${encodeURIComponent(draftType)}`, {
      method: "POST",
      headers: getHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to auto-draft notice for case: ${caseId}`);
    }
    
    return await response.json();
  },

  // Reports Management
  async getReports(search = "", tag = "All") {
    const params = new URLSearchParams();
    if (search) {
      params.append("search", search);
    }
    if (tag && tag !== "All") {
      params.append("tag", tag);
    }
    
    const response = await fetch(`${API_BASE_URL}/reports?${params.toString()}`, {
      method: "GET",
      headers: getHeaders()
    });
    
    if (!response.ok) {
      throw new Error("Failed to query reports collection.");
    }
    
    return await response.json();
  },

  // Notifications
  async getNotifications() {
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      method: "GET",
      headers: getHeaders()
    });
    
    if (!response.ok) {
      throw new Error("Failed to load platform alerts.");
    }
    
    return await response.json();
  }
};
