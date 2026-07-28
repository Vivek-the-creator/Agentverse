import React from "react";
import { motion } from "framer-motion";
import {
  FileSearch,
  BookOpenCheck,
  SearchCode,
  ShieldAlert,
  TrendingUp,
  Zap,
  FileText,
  Award,
  Loader2
} from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { ProgressBar } from "../upload/ProgressBar";

export const AgentCard = ({ agent, isCurrent = false }) => {
  const iconMap = {
    FileSearch: FileSearch,
    BookOpenCheck: BookOpenCheck,
    SearchCode: SearchCode,
    ShieldAlert: ShieldAlert,
    TrendingUp: TrendingUp,
    Zap: Zap,
    FileText: FileText,
    Award: Award
  };

  const Icon = iconMap[agent.iconName] || FileSearch;

  const getStatusBadge = () => {
    switch (agent.status) {
      case "Completed":
        return <Badge variant="emerald">Completed</Badge>;
      case "Processing":
      case "Active":
        return <Badge variant="purple" className="animate-pulse">Active Execution</Badge>;
      default:
        return <Badge variant="default">Queued</Badge>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`relative overflow-hidden transition-all duration-300 ${
          isCurrent
            ? "border-[#A47449] bg-[#1C1815] shadow-2xl ring-2 ring-[#A47449]/30 glow-brand"
            : agent.status === "Completed"
            ? "border-[#A47449]/30 bg-[#1C1815]"
            : "border-stone-800 bg-[#13100E]/60 opacity-75"
        }`}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl border ${
                agent.status === "Completed"
                  ? "bg-emerald-500/15 border-emerald-500/35 text-emerald-400"
                  : agent.status === "Processing" || agent.status === "Active"
                  ? "bg-[#A47449]/20 border-[#A47449]/40 text-[#A47449]"
                  : "bg-[#13100E] border-stone-800 text-stone-500"
              }`}
            >
              {agent.status === "Processing" || agent.status === "Active" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Icon className="w-5 h-5" />
              )}
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-display">{agent.name}</h4>
              <span className="text-[10px] text-[#A47449] font-mono">{agent.estimatedTime}</span>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        <p className="text-xs text-stone-400 mb-4 leading-relaxed">{agent.description}</p>

        {(agent.status === "Processing" || agent.status === "Active") && (
          <ProgressBar progress={agent.progress} label="Executing Agent Logic" color="purple" />
        )}

        {agent.status === "Completed" && agent.outputSummary && (
          <div className="p-3 rounded-xl bg-[#13100E] border border-[#A47449]/20 text-xs text-stone-300 mt-2 font-mono">
            <span className="font-bold text-[#A47449] block mb-0.5 uppercase text-[10px]">Agent Output:</span>
            {agent.outputSummary}
          </div>
        )}
      </Card>
    </motion.div>
  );
};
