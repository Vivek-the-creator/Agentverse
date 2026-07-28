import React from "react";
import { FolderKanban, TrendingUp, FileText, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Card } from "../common/Card";

export const StatisticsCards = ({ kpis = [] }) => {
  const iconMap = {
    FolderKanban: FolderKanban,
    TrendingUp: TrendingUp,
    FileText: FileText,
    ShieldCheck: ShieldCheck
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        const Icon = iconMap[kpi.iconName] || FolderKanban;
        return (
          <Card key={kpi.id} hover variant="purple" className="relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#A47449]/15 blur-xl group-hover:scale-150 transition-transform opacity-60 pointer-events-none" />

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-[#A47449] uppercase tracking-wider">{kpi.title}</span>
              <div className="p-2 rounded-xl bg-[#13100E] border border-[#A47449]/30 text-[#A47449]">
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline justify-between mt-2">
              <h3 className="text-2xl font-bold text-white tracking-tight font-mono">{kpi.value}</h3>
              <div className="flex items-center text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <span>{kpi.change}</span>
                <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </div>
            </div>

            <p className="text-[11px] text-[#A89C92] mt-2 font-medium">{kpi.period}</p>
          </Card>
        );
      })}
    </div>
  );
};
