import React from "react";
import { motion } from "framer-motion";
import { Bot, SearchCode, ShieldCheck, Zap, TrendingUp, Scale, Cpu, Sparkles } from "lucide-react";

export const AgentNetworkVisualization = () => {
  const agents = [
    { id: "ag_doc", name: "Document Agent", icon: Bot, role: "OCR & Extract", color: "cyan", x: 15, y: 25 },
    { id: "ag_res", name: "Research Agent", icon: SearchCode, role: "Statute Mapping", color: "purple", x: 85, y: 25 },
    { id: "ag_evi", name: "Evidence Agent", icon: ShieldCheck, role: "Section 65B Audit", color: "cyan", x: 15, y: 75 },
    { id: "ag_str", name: "Strategy Agent", icon: Zap, role: "Tactical Defense", color: "gold", x: 85, y: 75 },
    { id: "ag_pred", name: "Prediction Agent", icon: TrendingUp, role: "Win Probability", color: "purple", x: 50, y: 15 },
    { id: "ag_rep", name: "Report Agent", icon: Scale, role: "Notice & Dossier", color: "emerald", x: 50, y: 85 }
  ];

  return (
    <div className="relative w-full h-[400px] sm:h-[460px] rounded-3xl bg-[#1c120b] border border-amber-500/30 p-6 overflow-hidden shadow-2xl glow-purple bg-grid">
      {/* Central AI Mesh Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-20">
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 rounded-full border border-amber-500/40 bg-amber-950/40 backdrop-blur-xl flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.3)]"
        >
          <div className="w-16 h-16 rounded-full border border-yellow-400/40 bg-yellow-950/40 flex items-center justify-center">
            <Cpu className="w-8 h-8 text-amber-400 animate-pulse" />
          </div>
        </motion.div>
        <span className="text-[10px] font-mono font-extrabold text-amber-300 tracking-widest uppercase mt-3 px-2 py-0.5 rounded-full bg-yellow-950 border border-yellow-500/40">
          LEXINTEL CORE MESH
        </span>
      </div>

      {/* SVG Connecting Cables with Animated Data Packets */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {/* Line pairs to central core */}
        <line x1="18%" y1="28%" x2="50%" y2="50%" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="82%" y1="28%" x2="50%" y2="50%" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="18%" y1="72%" x2="50%" y2="50%" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="82%" y1="72%" x2="50%" y2="50%" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="50%" y1="20%" x2="50%" y2="50%" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1.5" />
        <line x1="50%" y1="80%" x2="50%" y2="50%" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1.5" />

        {/* Animated Data Pulses */}
        <circle cx="34%" cy="39%" r="3" fill="#06B6D4" className="animate-ping" />
        <circle cx="66%" cy="39%" r="3" fill="#8B5CF6" className="animate-ping" />
        <circle cx="34%" cy="61%" r="3" fill="#06B6D4" className="animate-ping" />
        <circle cx="66%" cy="61%" r="3" fill="#F59E0B" className="animate-ping" />
      </svg>

      {/* Agent Nodes Grid */}
      {agents.map((ag) => {
        const Icon = ag.icon;
        return (
          <motion.div
            key={ag.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ left: `${ag.x}%`, top: `${ag.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center group cursor-pointer"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-[#2f1d11] border border-amber-500/40 flex items-center justify-center text-amber-300 shadow-xl group-hover:scale-110 group-hover:border-yellow-400 transition-all">
                <Icon className="w-6 h-6" />
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 absolute -top-1 -right-1 border-2 border-[#1c120b] animate-pulse" />
            </div>

            <div className="mt-2 text-center">
              <span className="text-xs font-bold text-slate-100 block group-hover:text-amber-300 transition-colors">
                {ag.name}
              </span>
              <span className="text-[9px] font-mono text-amber-300/80 uppercase font-semibold">
                {ag.role}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
