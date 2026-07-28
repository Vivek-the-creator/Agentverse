import React from "react";
import { Award } from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";

export const RiskScoreGauge = ({ riskScore = 24, successProbability = 88, settlementChance = 75 }) => {
  const getRiskColor = (score) => {
    if (score < 30) return { text: "text-emerald-400", border: "border-emerald-500/30", label: "Low Risk Exposure" };
    if (score < 60) return { text: "text-[#A47449]", border: "border-[#A47449]/30", label: "Medium Risk Exposure" };
    return { text: "text-rose-400", border: "border-rose-500/30", label: "High Risk Exposure" };
  };

  const risk = getRiskColor(riskScore);

  return (
    <Card className="flex flex-col gap-5 border-[#A47449]/30 bg-[#1C1815]">
      <div className="flex items-center justify-between border-b border-[#A47449]/20 pb-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display">
          <Award className="w-4 h-4 text-emerald-400" />
          Judicial Outcome Indicators
        </h3>
        <Badge variant="purple" size="xs">Risk Model</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        {/* Win Probability */}
        <div className="p-5 rounded-xl bg-[#13100E] border border-[#A47449]/25 flex flex-col items-center justify-center space-y-1">
          <span className="text-[10px] font-mono font-bold text-[#A47449] uppercase tracking-wider">Success Probability</span>
          <span className="text-4xl font-bold text-emerald-400 font-mono tracking-tight">{successProbability}%</span>
          <Badge variant="emerald" size="xs">High Favorable Odds</Badge>
        </div>

        {/* Risk Score */}
        <div className={`p-5 rounded-xl bg-[#13100E] border ${risk.border} flex flex-col items-center justify-center space-y-1`}>
          <span className="text-[10px] font-mono font-bold text-[#A47449] uppercase tracking-wider">Risk Score Index</span>
          <span className={`text-4xl font-bold ${risk.text} font-mono tracking-tight`}>{riskScore}/100</span>
          <span className={`text-[10px] font-mono font-bold ${risk.text}`}>{risk.label}</span>
        </div>

        {/* Settlement Odds */}
        <div className="p-5 rounded-xl bg-[#13100E] border border-[#A47449]/25 flex flex-col items-center justify-center space-y-1">
          <span className="text-[10px] font-mono font-bold text-[#A47449] uppercase tracking-wider">Settlement Odds</span>
          <span className="text-4xl font-bold text-[#A47449] font-mono tracking-tight">{settlementChance}%</span>
          <Badge variant="purple" size="xs">Pre-Trial Compromise</Badge>
        </div>
      </div>
    </Card>
  );
};
