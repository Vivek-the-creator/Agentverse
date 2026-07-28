import React from "react";
import { Link } from "react-router-dom";
import { Scale, Shield, Twitter, Linkedin, Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-[#A47449]/25 bg-[#0B0A09] text-stone-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C08B5C] via-[#A47449] to-[#7E5531] flex items-center justify-center shadow-lg shadow-black/30 border border-[#E6CBB3]/30">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-white tracking-tight font-serif">LexIntel</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#A47449]/20 text-[#E6CBB3] font-mono font-extrabold border border-[#A47449]/40">AI</span>
              </div>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              A refined legal intelligence workspace for case intake, statutory analysis, precedent review, risk briefing, and report preparation.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-[#1C1815] hover:bg-[#A47449]/20 text-stone-400 hover:text-[#A47449] border border-[#A47449]/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-[#1C1815] hover:bg-[#A47449]/20 text-stone-400 hover:text-[#A47449] border border-[#A47449]/20 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-[#1C1815] hover:bg-[#A47449]/20 text-stone-400 hover:text-[#A47449] border border-[#A47449]/20 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Col 1 */}
          <div>
            <h4 className="text-xs font-mono font-bold text-[#A47449] uppercase tracking-widest mb-4">Workspace</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/dashboard" className="hover:text-[#A47449] transition-colors">Case Desk</Link></li>
              <li><Link to="/upload" className="hover:text-[#A47449] transition-colors">Case Intake</Link></li>
              <li><Link to="/processing" className="hover:text-[#A47449] transition-colors">Review Workflow</Link></li>
              <li><Link to="/reports" className="hover:text-[#A47449] transition-colors">Reports</Link></li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div>
            <h4 className="text-xs font-mono font-bold text-[#A47449] uppercase tracking-widest mb-4">Solutions</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-[#A47449] transition-colors">Property & RERA</a></li>
              <li><a href="#" className="hover:text-[#A47449] transition-colors">Cyber Ransomware</a></li>
              <li><a href="#" className="hover:text-[#A47449] transition-colors">Consumer Forum</a></li>
              <li><a href="#" className="hover:text-[#A47449] transition-colors">Commercial Arbitration</a></li>
            </ul>
          </div>

          {/* Nav Col 3 */}
          <div>
            <h4 className="text-xs font-mono font-bold text-[#A47449] uppercase tracking-widest mb-4">Security</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-[#A47449] transition-colors">Section 65B IT Act Certified</a></li>
              <li><a href="#" className="hover:text-[#A47449] transition-colors">256-Bit Encrypted Vault</a></li>
              <li><a href="#" className="hover:text-[#A47449] transition-colors">Client Privilege</a></li>
              <li><a href="#" className="hover:text-[#A47449] transition-colors">FastAPI Integration</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#A47449]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p>© 2026 LexIntel AI Platform. All rights reserved.</p>
          <div className="flex items-center gap-2 text-stone-400">
            <Shield className="w-3.5 h-3.5 text-[#A47449]" />
            <span>Privilege-aware legal workspace</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
