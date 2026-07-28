import React from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, FileEdit, BookOpen, Cpu, ArrowRight } from "lucide-react";
import { Card } from "../common/Card";

export const QuickActions = ({ actions = [] }) => {
  const navigate = useNavigate();

  const iconMap = {
    UploadCloud: UploadCloud,
    FileEdit: FileEdit,
    BookOpen: BookOpen,
    Cpu: Cpu
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((act) => {
        const Icon = iconMap[act.icon] || UploadCloud;
        return (
          <Card
            key={act.id}
            hover
            variant="purple"
            onClick={() => navigate(act.route)}
            className="flex flex-col justify-between p-5 relative overflow-hidden group cursor-pointer"
          >
            <div>
              <div className="p-3 w-fit rounded-xl border bg-[#13100E] border-[#A47449]/35 text-[#A47449] mb-3 group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-[#A47449] transition-colors font-display">
                {act.title}
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">{act.description}</p>
            </div>

            <div className="flex items-center gap-1 text-xs font-mono font-bold text-[#A47449] mt-4 group-hover:translate-x-1 transition-transform">
              <span>Launch Module</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Card>
        );
      })}
    </div>
  );
};
