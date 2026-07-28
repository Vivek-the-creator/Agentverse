import React from "react";

export const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon: Icon = null,
  required = false,
  className = "",
  rows = null,
  ...props
}) => {
  const isTextArea = type === "textarea" || rows;
  const InputComponent = isTextArea ? "textarea" : "input";

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className="text-xs font-semibold text-[#D8C8BB] uppercase tracking-wider flex items-center gap-1 font-display">
          {label}
          {required && <span className="text-[#A47449]">*</span>}
        </label>
      )}
      <div className="relative flex items-center w-full">
        {Icon && (
          <div className="absolute left-3.5 text-stone-400 pointer-events-none">
            <Icon className="w-4 h-4 text-[#A47449]" />
          </div>
        )}
        <InputComponent
          type={type !== "textarea" ? type : undefined}
          rows={rows || 4}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full bg-[#13100E]/90 border ${
            error
              ? "border-rose-500/80 focus:ring-rose-500"
              : "border-[#A47449]/30 focus:border-[#A47449] focus:ring-2 focus:ring-[#A47449]/25"
          } text-[#F7F4F0] text-sm rounded-lg py-2.5 ${
            Icon ? "pl-10" : "pl-4"
          } pr-4 placeholder:text-stone-500 focus:outline-none transition-all duration-200 shadow-inner`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-rose-400 font-medium">{error}</span>}
    </div>
  );
};
