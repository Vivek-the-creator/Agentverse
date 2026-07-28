import React from "react";
import { Cpu, Terminal, Sparkles } from "lucide-react";
import { Card } from "../common/Card";
import { ProgressBar } from "../upload/ProgressBar";

export const AgentProgress = ({ overallProgress = 0, activeAgentName = "" }) => {
  return (
    <Card className="flex flex-col gap-4 bg-[#1C1815] border-[#A47449]/30">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#A47449]/20 border border-[#A47449]/35 text-[#A47449]">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display">
              Review Workflow
              <Sparkles className="w-4 h-4 text-[#A47449]" />
            </h3>
            <p className="text-xs text-stone-400">
              Active Focus Node: <span className="font-bold text-[#A47449]">{activeAgentName || "Pipeline Standby"}</span>
            </p>
          </div>
        </div>

        <div className="w-full sm:w-64">
          <ProgressBar progress={overallProgress} label="Overall Completion" color="purple" />
        </div>
      </div>

      {/* Live Stream Console */}
      <div className="rounded-xl bg-[#13100E] border border-[#A47449]/20 p-4 font-mono text-[11px] space-y-1.5 max-h-36 overflow-y-auto shadow-inner">
        <div className="flex items-center gap-2 text-stone-400 pb-1 border-b border-[#A47449]/15">
          <Terminal className="w-3.5 h-3.5 text-[#A47449]" />
          <span className="uppercase text-[9px] tracking-widest font-bold text-[#A47449]">Live Agent Stream Output</span>
        </div>
        <p className="text-emerald-400">[DOCUMENT AGENT] Optical Character Recognition (OCR) extracted 28 pages.</p>
        <p className="text-[#E6CBB3]">[RESEARCH AGENT] Mapped MahaRERA Act Section 18 & Contract Act Section 73.</p>
        <p className="text-[#E6CBB3]">[EVIDENCE AGENT] Validated agreement for sale & wire receipts (100% proof score).</p>
        <p className="text-[#E6CBB3]">[PREDICTION ENGINE] Computed win probability: 88.4% favorable outcome odds.</p>
        <p className="text-emerald-400">[REPORT AGENT] Synthesized 18-page PDF dossier & court demand notice.</p>
      </div>
    </Card>
  );
};
