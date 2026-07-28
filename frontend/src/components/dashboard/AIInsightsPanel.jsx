import React from "react";
import { BookOpenCheck, ShieldAlert, Gavel, CheckCircle2, ArrowRight } from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";

export const AIInsightsPanel = ({ onExploreResults }) => {
  return (
    <Card className="flex flex-col gap-5 bg-[#1C1815] border-[#A47449]/35 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#A47449]/20 pb-3.5">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-[#A47449]/20 text-[#A47449] border border-[#A47449]/35">
            <BookOpenCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5 font-display">
              Counsel Intelligence
            </h3>
            <span className="text-[9px] text-[#A89C92] font-mono">Matter review summary</span>
          </div>
        </div>
        <Badge variant="purple" size="xs">96.8% Trust</Badge>
      </div>

      <div className="p-4 rounded-xl bg-[#13100E] border border-[#A47449]/25 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-[#D8C8BB]">SC Win Probability</span>
          <span className="text-lg font-bold text-emerald-400 font-mono">88.4%</span>
        </div>
        <div className="w-full bg-[#1C1815] h-2 rounded-full overflow-hidden p-0.5 border border-[#A47449]/20">
          <div className="bg-gradient-to-r from-[#A47449] to-emerald-400 h-full rounded-full w-[88%]" />
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
          <div className="p-2 rounded-lg bg-[#1C1815] border border-[#A47449]/20">
            <span className="text-stone-500 block text-[9px] font-mono uppercase font-bold">Risk Index</span>
            <span className="font-bold text-[#A47449]">24/100 (Low)</span>
          </div>
          <div className="p-2 rounded-lg bg-[#1C1815] border border-[#A47449]/20">
            <span className="text-stone-500 block text-[9px] font-mono uppercase font-bold">Settlement Odds</span>
            <span className="font-bold text-[#A47449]">75% Odds</span>
          </div>
        </div>
      </div>

      {/* Recommended Tactical Actions */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-mono font-bold text-[#A47449] uppercase tracking-wider flex items-center gap-1.5">
          <Gavel className="w-3.5 h-3.5 text-[#A47449]" /> Counsel Recommendations
        </h4>

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-xl bg-[#13100E] border border-[#A47449]/25 hover:border-[#A47449]/50 transition-colors space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-bold text-white font-display">Invoke RERA Section 18 Interest</span>
            </div>
            <p className="text-[11px] text-stone-400 leading-snug pl-5 font-sans">
              10.5% statutory delay compensation mandatory under Supreme Court Newtech precedent.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#13100E] border border-[#A47449]/25 hover:border-[#A47449]/50 transition-colors space-y-1">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5 text-[#A47449] shrink-0" />
              <span className="font-bold text-white font-display">File Injunction on Unsold Units</span>
            </div>
            <p className="text-[11px] text-stone-400 leading-snug pl-5 font-sans">
              Restrain promoter from creating third-party title rights prior to final hearing.
            </p>
          </div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-[#13100E] border border-[#A47449]/20 space-y-2 font-mono text-[10px]">
        <span className="text-stone-400 uppercase font-bold tracking-widest text-[9px] block">Review Notes</span>
        <p className="text-[#E6CBB3] truncate">[EVIDENCE] Section 65B electronic proof verified</p>
        <p className="text-[#E6CBB3] truncate">[PRECEDENT] 8 Supreme Court decisions reviewed</p>
      </div>

      <Button
        variant="gradient"
        size="md"
        icon={ArrowRight}
        onClick={onExploreResults}
        className="w-full"
      >
        Inspect Case Dossier
      </Button>
    </Card>
  );
};
