import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Scale } from "lucide-react";

export const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-2xl" }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B0A09]/85 backdrop-blur-xl"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25 }}
            className={`relative w-full ${maxWidth} bg-[#1C1815] border border-[#A47449]/35 rounded-xl shadow-2xl shadow-black/60 overflow-hidden z-10 my-8`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#A47449]/25 bg-[#13100E]">
              <h3 className="text-base font-bold text-[#F7F4F0] flex items-center gap-2 font-display">
                <Scale className="w-4 h-4 text-[#A47449]" />
                {title}
              </h3>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-stone-400 hover:text-[#F7F4F0] hover:bg-[#A47449]/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 max-h-[75vh] overflow-y-auto text-[#F7F4F0]">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
