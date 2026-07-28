import React from "react";
import { useNavigate } from "react-router-dom";
import { FolderSearch, Plus, Sparkles } from "lucide-react";
import { Card } from "./Card";
import { Button } from "./Button";

export const EmptyState = ({
  title = "No Legal Cases Yet",
  description = "Upload your first case file and let LexIntel AI generate instant judicial briefs.",
  buttonText = "Upload New Case",
  actionRoute = "/upload"
}) => {
  const navigate = useNavigate();

  return (
    <Card hover={false} className="p-12 text-center flex flex-col items-center justify-center space-y-4 border-dashed border-[#A47449]/35 bg-[#161311]">
      <div className="relative">
        <div className="w-16 h-16 rounded-xl bg-[#A47449]/15 border border-[#A47449]/35 flex items-center justify-center text-[#E6CBB3] shadow-xl shadow-black/30">
          <FolderSearch className="w-8 h-8 text-[#A47449]" />
        </div>
        <Sparkles className="w-4 h-4 text-[#C08B5C] absolute -top-1 -right-1 animate-pulse" />
      </div>

      <div className="space-y-1 max-w-sm">
        <h3 className="text-lg font-bold text-[#F7F4F0] tracking-tight font-display">{title}</h3>
        <p className="text-xs text-stone-400 leading-relaxed">{description}</p>
      </div>

      <Button
        variant="gradient"
        size="md"
        icon={Plus}
        onClick={() => navigate(actionRoute)}
      >
        {buttonText}
      </Button>
    </Card>
  );
};
