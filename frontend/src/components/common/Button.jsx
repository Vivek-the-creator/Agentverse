import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export const Button = ({
  children,
  variant = "gradient",
  size = "md",
  loading = false,
  disabled = false,
  icon: Icon = null,
  onClick,
  className = "",
  type = "button",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#A47449]/50 disabled:opacity-50 disabled:cursor-not-allowed select-none relative overflow-hidden font-display";

  const variants = {
    gradient:
      "btn-gradient text-white shadow-lg border border-[#C08B5C]/40",
    purple:
      "bg-[#A47449] hover:bg-[#B98557] text-white shadow-md border border-[#C08B5C]/30",
    cyan:
      "bg-[#7E5531] hover:bg-[#92643A] text-white shadow-md border border-[#A47449]/40",
    gold:
      "bg-gradient-to-r from-[#D49D6A] via-[#A47449] to-[#7E5531] text-white font-bold shadow-lg border border-[#E6CBB3]/40",
    outline:
      "bg-[#1C1815]/90 hover:bg-[#25201C] text-[#F7F4F0] border border-[#A47449]/35 hover:border-[#A47449] shadow-sm",
    cyanOutline:
      "bg-[#1C1815]/90 hover:bg-[#25201C] text-[#E6CBB3] border border-[#A47449]/30 hover:border-[#C08B5C] shadow-sm",
    ghost:
      "bg-transparent hover:bg-[#A47449]/15 text-[#D8C8BB] hover:text-[#F7F4F0] border border-transparent",
    danger:
      "bg-rose-600/90 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/30 border border-rose-500/40"
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-4.5 py-2 text-sm gap-2",
    lg: "px-6 py-2.5 text-base gap-2.5"
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.015 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.985 }}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.gradient} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : Icon ? (
        <Icon className={size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4"} />
      ) : null}
      <span>{children}</span>
    </motion.button>
  );
};
