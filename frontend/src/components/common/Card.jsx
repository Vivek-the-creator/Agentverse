import React from "react";
import { motion } from "framer-motion";

export const Card = ({
  children,
  className = "",
  hover = true,
  variant = "purple", // kept for compatibility with existing callers
  onClick,
  ...props
}) => {
  const borderVariants = {
    purple: "border-[#A47449]/25 hover:border-[#A47449]/60 hover:shadow-[#A47449]/10",
    cyan: "border-[#C08B5C]/30 hover:border-[#C08B5C]/70 hover:shadow-[#A47449]/15",
    gold: "border-[#D49D6A]/35 hover:border-[#D49D6A]/80 hover:shadow-[#A47449]/20",
    plain: "border-stone-800 hover:border-[#A47449]/40"
  };

  return (
    <motion.div
      whileHover={hover ? { y: -3, transition: { duration: 0.2 } } : {}}
      onClick={onClick}
      className={`rounded-xl p-6 transition-all duration-200 bg-[#1C1815]/90 backdrop-blur-xl border shadow-xl shadow-black/40 ${
        borderVariants[variant] || borderVariants.purple
      } ${hover ? "hover:shadow-2xl cursor-pointer" : ""} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
