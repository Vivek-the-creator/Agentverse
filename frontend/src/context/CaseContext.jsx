import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { mockAgents } from "../mock/agents";

const CaseContext = createContext(null);

export const CaseProvider = ({ children }) => {
  const [activeCase, setActiveCase] = useState(null);
  const [agents, setAgents] = useState(mockAgents);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [activeAgentIndex, setActiveAgentIndex] = useState(0);
  const [toasts, setToasts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Load initial notifications only when authenticated
    const fetchNotifs = async () => {
      const token = localStorage.getItem("lexintel_token");
      if (!token) return;
      try {
        const res = await api.getNotifications();
        if (res.success) {
          setNotifications(res.data);
        }
      } catch (err) {
        console.error("Failed to load notifications:", err);
      }
    };
    fetchNotifs();
  }, []);

  const addToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const startAgentProcessing = async (caseData) => {
    setActiveCase(caseData);
    setIsProcessing(true);
    setProcessingProgress(0);
    setActiveAgentIndex(0);

    // Reset agents status to waiting
    const initializedAgents = mockAgents.map((agent, index) => ({
      ...agent,
      status: index === 0 ? "Processing" : "Waiting",
      progress: index === 0 ? 15 : 0
    }));
    setAgents(initializedAgents);

    addToast("Multi-Agent Processing engine initiated.", "info");

    // Simulate multi-agent step execution over 8 seconds total
    const totalSteps = mockAgents.length;
    for (let i = 0; i < totalSteps; i++) {
      setActiveAgentIndex(i);

      // Update current agent to processing
      setAgents((prev) =>
        prev.map((a, idx) => {
          if (idx === i) return { ...a, status: "Processing", progress: 50 };
          if (idx < i) return { ...a, status: "Completed", progress: 100 };
          return { ...a, status: "Waiting", progress: 0 };
        })
      );

      setProcessingProgress(Math.round(((i + 0.5) / totalSteps) * 100));
      await new Promise((res) => setTimeout(res, 900));

      // Mark agent completed
      setAgents((prev) =>
        prev.map((a, idx) => {
          if (idx === i) return { ...a, status: "Completed", progress: 100 };
          return a;
        })
      );
      setProcessingProgress(Math.round(((i + 1) / totalSteps) * 100));
    }

    setIsProcessing(false);
    addToast("Multi-Agent Analysis complete! Case Dossier ready.", "success");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <CaseContext.Provider
      value={{
        activeCase,
        setActiveCase,
        agents,
        isProcessing,
        processingProgress,
        activeAgentIndex,
        startAgentProcessing,
        toasts,
        addToast,
        removeToast,
        notifications,
        setNotifications,
        darkMode,
        toggleDarkMode
      }}
    >
      {children}
    </CaseContext.Provider>
  );
};

export const useCase = () => {
  const context = useContext(CaseContext);
  if (!context) {
    throw new Error("useCase must be used within a CaseProvider");
  }
  return context;
};
