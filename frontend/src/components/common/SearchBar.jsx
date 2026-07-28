import React from "react";
import { Search, X } from "lucide-react";

export const SearchBar = ({ value, onChange, placeholder = "Search cases, precedents, statutes...", className = "" }) => {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search className="absolute left-3.5 w-4 h-4 text-[#A47449] pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#13100E]/95 border border-[#A47449]/30 text-[#F7F4F0] text-sm rounded-lg pl-10 pr-10 py-2 placeholder:text-stone-500 focus:outline-none focus:border-[#A47449] focus:ring-2 focus:ring-[#A47449]/25 transition-all duration-200"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 p-1 rounded-md text-stone-400 hover:text-[#F7F4F0] hover:bg-[#A47449]/20"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
