import React from "react";
import { Scale } from "lucide-react";

export const Loader = ({ text = "Preparing your legal workspace...", fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 text-center gap-4">
      <div className="relative flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border-2 border-amber-500/20 border-t-amber-300 border-r-yellow-700 animate-spin" />
        <Scale className="w-6 h-6 text-amber-200 absolute" />
      </div>
      {text && (
        <div className="space-y-1">
          <p className="text-sm font-bold text-amber-100 animate-pulse tracking-wide">{text}</p>
          <p className="text-[10px] text-amber-300 font-mono">LEXINTEL COURT INTELLIGENCE</p>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c120b]/90 backdrop-blur-xl">
        {content}
      </div>
    );
  }

  return content;
};

export const Skeleton = ({ className = "" }) => {
  return <div className={`animate-pulse bg-[#3a2415]/45 rounded-lg border border-amber-500/10 ${className}`} />;
};
