import React from "react";
import { Info } from "lucide-react";

export const GuidanceBanner = ({ text, badgeText = "Counsel Note" }) => {
  return (
    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#1C1815] border border-[#A47449]/30 text-xs text-[#F7F4F0] shadow-sm backdrop-blur-md">
      <div className="p-1.5 rounded-lg bg-[#A47449]/20 text-[#A47449] shrink-0 border border-[#A47449]/30">
        <Info className="w-4 h-4" />
      </div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <span className="font-medium text-[#E6CBB3]">{text}</span>
        <span className="text-[10px] font-mono uppercase font-bold text-[#A47449] tracking-wider shrink-0 bg-[#A47449]/10 px-2 py-0.5 rounded border border-[#A47449]/20">
          [{badgeText}]
        </span>
      </div>
    </div>
  );
};
