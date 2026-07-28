import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Gavel, ArrowRight, Scale } from "lucide-react";
import { AgentCard } from "../components/agents/AgentCard";
import { AgentTimeline } from "../components/agents/AgentTimeline";
import { AgentProgress } from "../components/agents/AgentProgress";
import { GuidanceBanner } from "../components/common/GuidanceBanner";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { useCase } from "../context/CaseContext";

export const Processing = () => {
  const {
    agents,
    isProcessing,
    processingProgress,
    activeAgentIndex,
    startAgentProcessing,
    activeCase
  } = useCase();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isProcessing && processingProgress === 0) {
      startAgentProcessing(activeCase);
    }
  }, []);

  const activeAgent = agents[activeAgentIndex] || agents[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Guidance Banner */}
      <GuidanceBanner
        text="Your case is moving through document review, precedent research, evidence audit, and draft preparation."
        badgeText="Review Active"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#A47449]/15 text-[#E6CBB3] text-xs font-mono font-bold border border-[#A47449]/35 mb-1">
            <Scale className="w-3.5 h-3.5 text-[#A47449]" /> Case Review Workflow
          </div>
          <h1 className="text-2xl font-bold text-white font-serif">
            Matter Processing
          </h1>
          <p className="text-xs text-stone-400">
            Active Docket: <span className="font-bold text-[#F7F4F0] font-display">{activeCase?.title || "Sharma vs. Apex Realty Developers"}</span>
          </p>
        </div>

        <div>
          <Button
            variant="gradient"
            size="md"
            icon={ArrowRight}
            disabled={isProcessing}
            onClick={() => navigate("/results")}
          >
            {isProcessing ? "Review in progress..." : "View Analysis Dossier"}
          </Button>
        </div>
      </div>

      {/* Animated Agent Workflow Timeline */}
      <Card className="p-4 bg-[#1C1815] border-[#A47449]/30">
        <AgentTimeline agents={agents} activeIndex={activeAgentIndex} />
      </Card>

      {/* Progress Bar & Console Log Stream */}
      <AgentProgress
        overallProgress={processingProgress}
        activeAgentName={activeAgent?.name}
      />

      {/* Agent Roster Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono font-bold text-[#A47449] uppercase tracking-wider flex items-center gap-2">
          <Gavel className="w-4 h-4 text-[#A47449]" /> Review Desk Status
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map((agent, index) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              isCurrent={index === activeAgentIndex && isProcessing}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
