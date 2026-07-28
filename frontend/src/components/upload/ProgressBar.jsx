import React from "react";
import { motion } from "framer-motion";

export const ProgressBar = ({ progress = 0, label = "Processing...", color = "purple" }) => {
  return (
    <div className="w-full space-y-1.5">
      <div className="flex items-center justify-between text-xs font-bold font-mono">
        <span className="text-slate-300">{label}</span>
        <span className="text-amber-400">{progress}%</span>
      </div>
      <div className="w-full h-2.5 bg-[#1c120b] rounded-full overflow-hidden p-0.5 border border-amber-500/30">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-amber-600 via-yellow-500 to-yellow-400 shadow-lg shadow-amber-500/50"
        />
      </div>
    </div>
  );
};
