import React from "react";
import { Clock, FileText, Download, CheckCircle, PlusSquare, TrendingUp } from "lucide-react";
import { Card } from "../common/Card";

export const ActivityTimeline = ({ activities = [] }) => {
  const iconMap = {
    FileText: FileText,
    Download: Download,
    CheckCircle: CheckCircle,
    PlusSquare: PlusSquare,
    TrendingUp: TrendingUp
  };

  return (
    <Card className="flex flex-col gap-4 bg-[#1C1815] border-[#A47449]/30">
      <div className="flex items-center justify-between border-b border-[#A47449]/20 pb-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display">
          <Clock className="w-4 h-4 text-[#A47449]" />
          Recent Case Activity
        </h3>
        <span className="text-[10px] text-[#A47449] uppercase tracking-widest font-mono font-bold">Activity Log</span>
      </div>

      <div className="space-y-4">
        {activities.map((act, index) => {
          const Icon = iconMap[act.icon] || FileText;
          return (
            <div key={act.id} className="relative flex items-start gap-3 group">
              {index !== activities.length - 1 && (
                <span className="absolute left-4 top-8 -bottom-4 w-0.5 bg-[#A47449]/25" />
              )}
              <div className="p-2 rounded-lg border border-[#A47449]/30 bg-[#13100E] text-[#A47449] shrink-0 z-10">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 text-xs">
                <p className="text-stone-300 leading-snug">
                  <span className="font-bold text-white font-display">{act.user}</span>{" "}
                  <span className="text-stone-400">{act.action}</span>{" "}
                  <span className="font-semibold text-[#A47449]">{act.target}</span>
                </p>
                <span className="text-[10px] text-stone-500 mt-1 block font-mono">{act.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
