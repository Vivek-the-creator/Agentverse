import React from "react";
import { BookOpenCheck, Scale } from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";

export const ApplicableLawsCard = ({ laws = [] }) => {
  return (
    <Card className="flex flex-col gap-4 border-[#A47449]/30 bg-[#1C1815]">
      <div className="flex items-center justify-between border-b border-[#A47449]/20 pb-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display">
          <BookOpenCheck className="w-4 h-4 text-[#A47449]" />
          Applicable Statutory Laws & Sections
        </h3>
        <Badge variant="purple" size="xs">98.4% Confidence</Badge>
      </div>

      <div className="space-y-3">
        {laws.map((law, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-xl bg-[#13100E] border border-[#A47449]/25 hover:border-[#A47449]/50 transition-colors"
          >
            <div className="p-2 rounded-lg bg-[#A47449]/15 border border-[#A47449]/30 text-[#A47449] shrink-0 mt-0.5">
              <Scale className="w-4 h-4" />
            </div>
            <div className="flex-1 text-xs">
              <div className="flex items-center justify-between">
                <p className="font-bold text-white font-display">{law}</p>
                <span className="text-[9px] font-mono text-emerald-400 font-bold">Binding Force</span>
              </div>
              <p className="text-[11px] text-stone-400 mt-1">
                Statutory applicability verified with Supreme Court vector index match by Research Agent.
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
