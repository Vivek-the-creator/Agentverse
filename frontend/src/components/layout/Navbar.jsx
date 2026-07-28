import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Scale, ArrowRight, BriefcaseBusiness } from "lucide-react";
import { Button } from "../common/Button";
import { useAuth } from "../../context/AuthContext";

export const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#A47449]/25 bg-[#13100E]/88 backdrop-blur-2xl transition-all shadow-lg shadow-black/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C08B5C] via-[#A47449] to-[#7E5531] flex items-center justify-center shadow-lg shadow-[#A47449]/20 group-hover:scale-105 transition-transform border border-[#E6CBB3]/30">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xl text-white tracking-tight font-serif">LexIntel</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#A47449]/20 text-[#E6CBB3] font-mono font-extrabold border border-[#A47449]/40 uppercase tracking-wider">AI</span>
            </div>
            <span className="text-[9px] text-[#A89C92] tracking-widest uppercase font-mono font-semibold">Legal Intelligence Platform</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#D8C8BB] uppercase tracking-wider font-display">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#practice" className="hover:text-white transition-colors">Practice Areas</a>
          <a href="#workflow" className="hover:text-white transition-colors">Workflow</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <Button
              variant="gradient"
              size="sm"
              icon={BriefcaseBusiness}
              onClick={() => navigate("/dashboard")}
            >
              Case Desk
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
              <Button
                variant="gradient"
                size="sm"
                icon={ArrowRight}
                onClick={() => navigate("/register")}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
