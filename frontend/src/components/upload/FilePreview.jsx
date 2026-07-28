import React from "react";
import { FileText, Image, Mic, Video, Trash2, CheckCircle2 } from "lucide-react";

export const FilePreview = ({ files = [], onRemove }) => {
  if (files.length === 0) return null;

  const getIcon = (name) => {
    const ext = name.split(".").pop().toLowerCase();
    if (["jpg", "png", "jpeg"].includes(ext)) return <Image className="w-4 h-4 text-emerald-400" />;
    if (["mp3", "m4a", "wav"].includes(ext)) return <Mic className="w-4 h-4 text-[#A47449]" />;
    if (["mp4", "avi", "mov"].includes(ext)) return <Video className="w-4 h-4 text-[#A47449]" />;
    return <FileText className="w-4 h-4 text-[#A47449]" />;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-mono font-bold text-[#A47449] uppercase tracking-wider">
          Attached Evidence Files ({files.length})
        </h4>
        <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono font-bold">
          <CheckCircle2 className="w-3.5 h-3.5" /> Sec 65B Ready
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-3 rounded-xl bg-[#13100E] border border-[#A47449]/25 hover:border-[#A47449]/50 transition-all"
          >
            <div className="flex items-center gap-3 truncate">
              <div className="p-2 rounded-lg bg-[#1C1815] border border-[#A47449]/20 shrink-0">
                {getIcon(file.name)}
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs font-bold text-white truncate font-display">{file.name}</span>
                <span className="text-[10px] text-stone-500 font-mono">{file.size}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onRemove(file.id)}
              className="p-1.5 rounded-lg text-stone-500 hover:text-rose-400 hover:bg-[#1C1815] transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
