import React from "react";
import { Scale, Home, ArrowLeft } from "lucide-react";
import { Button } from "../components/common/Button";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0B0A09] text-[#F7F4F0] flex items-center justify-center p-6 relative overflow-hidden bg-grid">
      <div className="relative z-10 text-center space-y-6 max-w-lg">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#C08B5C] via-[#A47449] to-[#7E5531] flex items-center justify-center mx-auto shadow-xl shadow-black/30 border border-[#E6CBB3]/30">
          <Scale className="w-8 h-8 text-white" />
        </div>

        <div>
          <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C08B5C] via-[#A47449] to-emerald-400 font-mono">
            404
          </h1>
          <h2 className="text-xl font-bold text-white mt-2 font-serif">Case Not Found in Docket</h2>
          <p className="text-xs text-stone-400 mt-2 leading-relaxed">
            The requested page does not exist in the LexIntel workspace.
            It may have been archived or moved to a different jurisdiction.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button variant="gradient" size="md" icon={Home} onClick={() => window.location.href = "/"}>
            Return Home
          </Button>
          <Button variant="outline" size="md" icon={ArrowLeft} onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>

        <p className="text-[10px] text-[#A47449] font-mono uppercase tracking-widest">
          LexIntel AI - Legal Intelligence Platform
        </p>
      </div>
    </div>
  );
};
