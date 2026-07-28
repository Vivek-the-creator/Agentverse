import React from "react";
import { HelpCircle, FileText, Image, Sparkles, Plus } from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";

export const UploadGuideCard = ({ onSelectSampleFile }) => {
  const sampleFiles = [
    { id: "sample_fir", name: "FIR_Registration_Copy.pdf", size: "2.8 MB", type: "Court Order / FIR", icon: FileText },
    { id: "sample_order", name: "Court_Interim_Order_2025.pdf", size: "1.9 MB", type: "Court Order", icon: FileText },
    { id: "sample_img", name: "Evidence_Property_Inspection.jpg", size: "4.2 MB", type: "Evidence Image", icon: Image }
  ];

  return (
    <Card className="p-6 bg-[#1C1815] border-[#A47449]/30 space-y-6">
      <div className="flex items-center justify-between border-b border-[#A47449]/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#A47449]/20 text-[#A47449] border border-[#A47449]/35">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
              How to Upload Your Case?
              <Sparkles className="w-4 h-4 text-[#A47449]" />
            </h3>
            <p className="text-xs text-stone-400">Follow the 5 simple steps below for automated AI legal processing</p>
          </div>
        </div>
        <Badge variant="purple" size="xs">Step-By-Step Assistant</Badge>
      </div>

      {/* 5 Steps Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-[#13100E] border border-[#A47449]/25 space-y-1.5">
          <span className="w-6 h-6 rounded-full bg-[#A47449]/20 text-[#A47449] font-bold flex items-center justify-center font-mono text-[11px] border border-[#A47449]/35">
            1
          </span>
          <h4 className="font-bold text-[#F7F4F0] font-display">Collect Documents</h4>
          <p className="text-[10px] text-stone-400 leading-snug">
            Gather FIRs, court orders, agreements, images, or chat exports.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#13100E] border border-[#A47449]/25 space-y-1.5">
          <span className="w-6 h-6 rounded-full bg-[#A47449]/20 text-[#A47449] font-bold flex items-center justify-center font-mono text-[11px] border border-[#A47449]/35">
            2
          </span>
          <h4 className="font-bold text-[#F7F4F0] font-display">Click Upload</h4>
          <p className="text-[10px] text-stone-400 leading-snug">
            Use the drag & drop upload box or sample file shortcuts.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#13100E] border border-[#A47449]/25 space-y-1.5">
          <span className="w-6 h-6 rounded-full bg-[#A47449]/20 text-[#A47449] font-bold flex items-center justify-center font-mono text-[11px] border border-[#A47449]/35">
            3
          </span>
          <h4 className="font-bold text-[#F7F4F0] font-display">Select Your Files</h4>
          <p className="text-[10px] text-stone-400 leading-snug">
            Attach multiple files simultaneously for OCR extraction.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#13100E] border border-[#A47449]/25 space-y-1.5">
          <span className="w-6 h-6 rounded-full bg-[#A47449]/20 text-[#A47449] font-bold flex items-center justify-center font-mono text-[11px] border border-[#A47449]/35">
            4
          </span>
          <h4 className="font-bold text-[#F7F4F0] font-display">Choose Case Type</h4>
          <p className="text-[10px] text-stone-400 leading-snug">
            Select Civil, Criminal, RERA, Cyber, or Consumer category.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#13100E] border border-[#A47449]/25 space-y-1.5">
          <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center font-mono text-[11px] border border-emerald-500/35">
            5
          </span>
          <h4 className="font-bold text-[#F7F4F0] font-display">Click Analyze Case</h4>
          <p className="text-[10px] text-stone-400 leading-snug">
            The 8 AI agents will automatically process your docket.
          </p>
        </div>
      </div>

      {/* Visual Sample Files Section */}
      <div className="pt-2">
        <span className="text-xs font-mono font-bold text-[#A47449] uppercase tracking-wider block mb-3">
          Click Sample Files Below to Instantly Add:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {sampleFiles.map((sample) => {
            const Icon = sample.icon;
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => onSelectSampleFile(sample)}
                className="flex items-center justify-between p-3 rounded-xl bg-[#13100E] border border-[#A47449]/25 hover:border-[#A47449] text-left transition-all group"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className="p-2 rounded-lg bg-[#1C1815] text-[#A47449] shrink-0 border border-[#A47449]/20">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="text-xs font-bold text-[#F7F4F0] truncate group-hover:text-[#A47449] transition-colors font-display">
                      {sample.name}
                    </span>
                    <span className="text-[10px] font-mono text-stone-500">{sample.size}</span>
                  </div>
                </div>
                <div className="p-1 rounded-lg bg-[#A47449]/20 text-[#A47449] border border-[#A47449]/35 shrink-0">
                  <Plus className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
