import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Plus,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  X,
  Scale
} from "lucide-react";
import { Button } from "../common/Button";
import { SearchBar } from "../common/SearchBar";
import { useAuth } from "../../context/AuthContext";
import { useCase } from "../../context/CaseContext";

export const Header = () => {
  const { user } = useAuth();
  const { notifications } = useCase();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 shrink-0 border-b border-[#A47449]/25 bg-[#13100E]/90 backdrop-blur-2xl px-6 flex items-center justify-between sticky top-0 z-20 shadow-md shadow-black/30">
      {/* Search Input */}
      <div className="w-80 md:w-96">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search legal precedents, FIRs, statutes..."
        />
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* Quick Start Upload Button */}
        <Button
          variant="gradient"
          size="sm"
          icon={Plus}
          onClick={() => navigate("/upload")}
        >
          Start Analysis
        </Button>

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl text-stone-400 hover:text-[#F7F4F0] hover:bg-[#1C1815] border border-transparent hover:border-[#A47449]/30 transition-all relative"
          >
            <Bell className="w-4 h-4 text-[#A47449]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#A47449] ring-2 ring-[#13100E]" />
            )}
          </button>

          {/* Notification Drawer */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#1C1815] border border-[#A47449]/35 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
              <div className="p-4 border-b border-[#A47449]/20 flex items-center justify-between bg-[#13100E]">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[#F7F4F0] flex items-center gap-1.5 font-display">
                    <Scale className="w-4 h-4 text-[#A47449]" />
                    Case Notifications
                  </h4>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-[#A47449]/20 text-[#E6CBB3] border border-[#A47449]/40">
                      {unreadCount} New
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-[#F7F4F0]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#A47449]/15">
                {notifications.slice(0, 8).map((n) => (
                  <div
                    key={n.id}
                    className={`p-3.5 flex items-start gap-3 hover:bg-[#A47449]/10 transition-colors ${
                      !n.read ? "bg-[#A47449]/15" : ""
                    }`}
                  >
                    <div className="mt-0.5">
                      {n.type === "success" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : n.type === "warning" ? (
                        <AlertTriangle className="w-4 h-4 text-[#A47449]" />
                      ) : (
                        <ShieldCheck className="w-4 h-4 text-[#A47449]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#F7F4F0] font-display">{n.title}</span>
                        <span className="text-[10px] text-stone-400 font-mono">{n.time}</span>
                      </div>
                      <p className="text-xs text-stone-300 mt-0.5 leading-snug">{n.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-[#A47449]/20 text-center bg-[#13100E]">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate("/dashboard");
                  }}
                  className="text-xs font-mono font-bold text-[#A47449] hover:text-[#C08B5C]"
                >
                  View All Case Activity
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Active Counsel Indicator */}
        <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-[#A47449]/25">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-[#F7F4F0] font-display">{user?.name || "Advocate"}</span>
        </div>
      </div>
    </header>
  );
};
