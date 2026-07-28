import React, { useState } from "react";
import { UploadCloud, FileText, Image, Mic, Video, Scale } from "lucide-react";
import { Button } from "../common/Button";

export const UploadBox = ({ onFilesSelected, files = [] }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map((f) => ({
        id: `file_${Date.now()}_${Math.random()}`,
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
        type: f.type || "Court Document",
        fileObj: f
      }));
      onFilesSelected([...files, ...newFiles]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((f) => ({
        id: `file_${Date.now()}_${Math.random()}`,
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
        type: f.type || "Court Document",
        fileObj: f
      }));
      onFilesSelected([...files, ...newFiles]);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative flex flex-col items-center justify-center p-8 sm:p-12 rounded-xl border-2 border-dashed transition-all duration-300 text-center ${
        isDragging
          ? "border-[#A47449] bg-[#A47449]/15 scale-[1.01] glow-brand"
          : "border-[#A47449]/35 hover:border-[#A47449] bg-[#13100E] backdrop-blur-xl"
      }`}
    >
      <input
        type="file"
        multiple
        onChange={handleFileInput}
        id="case-file-input"
        className="hidden"
        accept=".pdf,.docx,.txt,.jpg,.png,.mp3,.mp4,.m4a"
      />

      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#C08B5C] via-[#A47449] to-[#7E5531] flex items-center justify-center mb-4 text-white shadow-xl shadow-black/30">
        <UploadCloud className="w-8 h-8 animate-bounce" />
      </div>

      <h3 className="text-lg font-bold text-white flex items-center gap-2 font-display">
        Upload Case Documents & Evidence
        <Scale className="w-4 h-4 text-[#A47449]" />
      </h3>
      <p className="text-xs text-stone-400 max-w-md mt-1 mb-6 leading-relaxed">
        Upload FIR copies, court orders, agreements, video evidence, audio call logs, or WhatsApp chat exports for review.
      </p>

      <label htmlFor="case-file-input">
        <Button variant="gradient" size="md" icon={UploadCloud} as="span">
          Browse Files from Device
        </Button>
      </label>

      {/* Supported File Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-8 pt-6 border-t border-[#A47449]/20 text-xs text-stone-400">
        <span className="font-mono text-[10px] font-bold text-[#A47449] uppercase tracking-widest">Supported Formats:</span>
        <div className="flex items-center gap-1 bg-[#1C1815] px-2.5 py-1 rounded-lg border border-[#A47449]/20">
          <FileText className="w-3.5 h-3.5 text-[#A47449]" />
          <span>PDF / Court Orders</span>
        </div>
        <div className="flex items-center gap-1 bg-[#1C1815] px-2.5 py-1 rounded-lg border border-[#A47449]/20">
          <Image className="w-3.5 h-3.5 text-emerald-400" />
          <span>Images / FIR</span>
        </div>
        <div className="flex items-center gap-1 bg-[#1C1815] px-2.5 py-1 rounded-lg border border-[#A47449]/20">
          <Mic className="w-3.5 h-3.5 text-[#A47449]" />
          <span>Audio Call Logs</span>
        </div>
        <div className="flex items-center gap-1 bg-[#1C1815] px-2.5 py-1 rounded-lg border border-[#A47449]/20">
          <Video className="w-3.5 h-3.5 text-[#A47449]" />
          <span>Video Footage</span>
        </div>
      </div>
    </div>
  );
};
