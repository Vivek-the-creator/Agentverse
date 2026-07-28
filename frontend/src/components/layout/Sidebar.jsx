import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UploadCloud,
  Cpu,
  FileCheck,
  BookOpen,
  User,
  Settings,
  Scale,
  LogOut,
  Gavel
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: "Case Desk", path: "/dashboard", icon: LayoutDashboard, badge: null },
    { name: "File a Case", path: "/upload", icon: UploadCloud, badge: "New" },
    { name: "Review Workflow", path: "/processing", icon: Cpu, badge: "Live" },
    { name: "Case Intelligence", path: "/results", icon: FileCheck, badge: null },
    { name: "Reports", path: "/reports", icon: BookOpen, badge: "15" },
    { name: "Counsel Profile", path: "/profile", icon: User, badge: null },
    { name: "Settings", path: "/settings", icon: Settings, badge: null }
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 shrink-0 bg-[#13100E] border-r border-[#A47449]/25 flex flex-col justify-between h-screen sticky top-0 z-30 select-none shadow-2xl shadow-black/50">
      <div>
        {/* Brand header */}
        <div className="p-5 border-b border-[#A47449]/20 flex items-center justify-between bg-[#0B0A09]/60">
          <NavLink to="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C08B5C] via-[#A47449] to-[#7E5531] flex items-center justify-center shadow-lg shadow-[#A47449]/20 group-hover:scale-105 transition-transform border border-[#E6CBB3]/30">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white text-base tracking-tight font-serif">LexIntel</span>
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-[#A47449]/20 text-[#E6CBB3] border border-[#A47449]/40 font-mono">AI</span>
              </div>
              <span className="text-[9px] text-[#A89C92] font-mono font-semibold tracking-widest uppercase">Smart Court Desk</span>
            </div>
          </NavLink>
        </div>

        {/* Live Multi-Agent Status */}
        <div className="mx-4 my-4 p-3 rounded-xl bg-[#1C1815] border border-[#A47449]/30 flex items-center gap-3 shadow-inner">
          <div className="relative flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#F7F4F0] flex items-center gap-1 font-display">
              Court Review Desk
              <Gavel className="w-3 h-3 text-[#A47449]" />
            </span>
            <span className="text-[10px] text-emerald-400 font-mono font-semibold">Agents Standby</span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="px-3 space-y-1">
          <p className="px-3 text-[10px] font-bold text-[#A47449] uppercase tracking-widest mb-2 font-mono">Workspace</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                    isActive
                      ? "bg-[#A47449]/20 text-white border border-[#A47449]/50 shadow-md shadow-[#A47449]/10"
                      : "text-[#A89C92] hover:text-white hover:bg-[#A47449]/10"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 transition-transform group-hover:scale-110 text-[#A47449]" />
                  <span className="font-display">{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-[#0B0A09] text-[#E6CBB3] border border-[#A47449]/30">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User profile footer */}
      <div className="p-4 border-t border-[#A47449]/20 bg-[#0B0A09]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"}
              alt={user?.name || "User Avatar"}
              className="w-9 h-9 rounded-full object-cover border border-[#A47449]/50 shadow-sm"
            />
            <div className="flex flex-col truncate max-w-[110px]">
              <span className="text-xs font-bold text-[#F7F4F0] truncate font-display">{user?.name || "Advocate"}</span>
              <span className="text-[10px] text-[#A89C92] font-mono truncate">{user?.role || "Senior Counsel"}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-2 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-[#A47449]/15 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
