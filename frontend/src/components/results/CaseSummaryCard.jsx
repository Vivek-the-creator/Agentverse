import React from "react";
import { Calendar, User, Building, Gavel, Sparkles } from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";

export const CaseSummaryCard = ({ caseData }) => {
  if (!caseData) return null;

  return (
    <Card className="flex flex-col gap-5 border-[#A47449]/30 bg-[#1C1815]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#A47449]/20 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple">{caseData.type}</Badge>
            <span className="text-xs font-mono text-[#A47449]">{caseData.caseNumber}</span>
            <Badge variant="emerald" size="xs">98% Confidence</Badge>
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-serif">
            {caseData.title}
          </h2>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-[10px] text-[#A47449] font-mono uppercase font-bold">Filing Date</span>
          <p className="text-xs font-bold text-[#F7F4F0] flex items-center sm:justify-end gap-1 mt-0.5 font-mono">
            <Calendar className="w-3.5 h-3.5 text-[#A47449]" /> {caseData.filingDate}
          </p>
        </div>
      </div>

      {/* Entities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-3.5 rounded-xl bg-[#13100E] border border-[#A47449]/25 space-y-1">
          <span className="text-[#A47449] uppercase font-mono font-bold text-[10px]">Litigant / Complainant</span>
          <p className="font-bold text-white flex items-center gap-1.5 font-display">
            <User className="w-3.5 h-3.5 text-[#A47449]" /> {caseData.clientName}
          </p>
          <span className="text-[10px] text-stone-400 block font-mono">Counsel: {caseData.lawyerName}</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#13100E] border border-[#A47449]/25 space-y-1">
          <span className="text-[#A47449] uppercase font-mono font-bold text-[10px]">Opposing Party</span>
          <p className="font-bold text-white flex items-center gap-1.5 font-display">
            <Building className="w-3.5 h-3.5 text-[#A47449]" /> {caseData.opposingParty}
          </p>
          <span className="text-[10px] text-stone-400 block font-mono">Respondent Entity</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#13100E] border border-[#A47449]/25 space-y-1">
          <span className="text-[#A47449] uppercase font-mono font-bold text-[10px]">Judicial Forum</span>
          <p className="font-bold text-white flex items-center gap-1.5 truncate font-display">
            <Gavel className="w-3.5 h-3.5 text-[#A47449]" /> {caseData.courtName}
          </p>
          <span className="text-[10px] text-stone-400 block font-mono">Next Hearing: {caseData.nextHearingDate}</span>
        </div>
      </div>

      {/* Summary Brief */}
      <div>
        <h4 className="text-xs font-mono font-bold text-[#A47449] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#A47449]" /> Executive Legal Summary
        </h4>
        <p className="text-xs text-stone-300 leading-relaxed bg-[#13100E] p-4 rounded-xl border border-[#A47449]/20 font-sans">
          {caseData.summary}
        </p>
      </div>
    </Card>
  );
};
