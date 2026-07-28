import React from "react";

export const Badge = ({ children, variant = "purple", size = "sm", className = "" }) => {
  const variants = {
    purple: "bg-[#A47449]/15 text-[#E6CBB3] border-[#A47449]/40",
    cyan: "bg-[#A47449]/20 text-[#F5E6D8] border-[#C08B5C]/50",
    gold: "bg-[#D49D6A]/20 text-[#FFF5EB] border-[#D49D6A]/50",
    emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/35",
    red: "bg-rose-500/15 text-rose-300 border-rose-500/35",
    default: "bg-[#1C1815] text-stone-300 border-stone-700/80"
  };

  const sizes = {
    xs: "px-2 py-0.5 text-[10px]",
    sm: "px-2.5 py-1 text-xs font-semibold",
    md: "px-3.5 py-1.5 text-xs font-bold"
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border uppercase tracking-wider font-mono ${
        variants[variant] || variants.purple
      } ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
};
