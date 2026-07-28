import React from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export const AgentTimeline = ({ agents = [], activeIndex = 0 }) => {
  const agentFlow = [
    { name: "Document Agent", role: "OCR & Extract" },
    { name: "Research Agent", role: "Statute Search" },
    { name: "Evidence Agent", role: "Sec 65B Audit" },
    { name: "Prediction Agent", role: "Win Odds Model" },
    { name: "Strategy Agent", role: "Tactical Roadmap" },
    { name: "Report Agent", role: "Dossier Synthesis" }
  ];

  return (
    <div className="w-full py-4 overflow-x-auto scrollbar-none">
      <div className="flex items-center justify-between min-w-[760px] px-4">
        {agentFlow.map((step, index) => {
          const matchingAgent = agents[index];
          const status = matchingAgent?.status || (index < activeIndex ? "Completed" : index === activeIndex ? "Processing" : "Waiting");
          const isDone = status === "Completed";
          const isCurrent = status === "Processing" || status === "Active";

          return (
            <div key={index} className="flex-1 flex flex-col items-center relative group">
              {/* Connector line */}
              {index !== agentFlow.length - 1 && (
                <div
                  className={`absolute top-4 left-1/2 w-full h-0.5 z-0 transition-colors ${
                    isDone ? "bg-[#A47449]" : "bg-[#A47449]/20"
                  }`}
                />
              )}

              {/* Step Node Circle */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center z-10 transition-all font-mono font-bold text-xs ${
                  isDone
                    ? "bg-[#A47449] text-white shadow-lg shadow-[#A47449]/30"
                    : isCurrent
                    ? "bg-[#C08B5C] text-white shadow-lg shadow-[#A47449]/50 ring-4 ring-[#A47449]/25 animate-pulse"
                    : "bg-[#13100E] border border-[#A47449]/30 text-stone-500"
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Step Title & Subtitle */}
              <div className="mt-2 text-center max-w-[100px]">
                <span
                  className={`text-xs font-bold block truncate font-display ${
                    isDone
                      ? "text-white"
                      : isCurrent
                      ? "text-[#A47449]"
                      : "text-stone-500"
                  }`}
                >
                  {step.name}
                </span>
                <span className="text-[9px] font-mono text-[#A47449] font-semibold block truncate">
                  {step.role}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
