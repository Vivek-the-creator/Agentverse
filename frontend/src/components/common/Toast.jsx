import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { useCase } from "../../context/CaseContext";

export const ToastContainer = () => {
  const { toasts, removeToast } = useCase();

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-[#A47449] shrink-0" />,
    danger: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-[#A47449] shrink-0" />
  };

  const borderColors = {
    success: "border-emerald-500/35 bg-[#1C1815]/95 text-emerald-200 shadow-emerald-950/20",
    warning: "border-[#A47449]/40 bg-[#1C1815]/95 text-[#E6CBB3] shadow-[#A47449]/10",
    danger: "border-rose-500/35 bg-[#1C1815]/95 text-rose-200 shadow-rose-950/20",
    info: "border-[#A47449]/35 bg-[#1C1815]/95 text-[#F7F4F0] shadow-[#A47449]/10"
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border backdrop-blur-2xl shadow-2xl ${
              borderColors[t.type] || borderColors.info
            }`}
          >
            <div className="flex items-center gap-3">
              {icons[t.type] || icons.info}
              <p className="text-xs font-medium leading-snug">{t.message}</p>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="p-1 rounded-md text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
