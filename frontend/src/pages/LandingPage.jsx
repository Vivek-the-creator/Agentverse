import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Scale,
  ArrowRight,
  Gavel,
  ShieldCheck,
  TrendingUp,
  FileText,
  Search,
  BookOpen,
  Lock
} from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { Badge } from "../components/common/Badge";

export const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: "Structured Case Intake",
      desc: "Upload pleadings, orders, FIRs, contracts, notices, and evidence in one organized legal workspace."
    },
    {
      icon: TrendingUp,
      title: "Risk & Outcome Briefing",
      desc: "Review probability indicators, exposure summaries, and settlement considerations with supporting context."
    },
    {
      icon: Search,
      title: "Precedent Research",
      desc: "Surface relevant Supreme Court and High Court decisions for faster matter preparation."
    },
    {
      icon: Gavel,
      title: "Drafting Assistance",
      desc: "Prepare demand notices, matter summaries, and court-ready report drafts from the uploaded record."
    },
    {
      icon: ShieldCheck,
      title: "Evidence Review",
      desc: "Organize digital material, highlight admissibility concerns, and prepare proof notes for counsel review."
    },
    {
      icon: Lock,
      title: "Privilege-Aware Workspace",
      desc: "Designed for legal teams that need careful handling of client, matter, and document records."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0A09] text-[#F7F4F0] flex flex-col selection:bg-[#A47449] selection:text-white bg-grid">
      <Navbar />

      <section className="relative pt-16 pb-20 overflow-hidden border-b border-[#A47449]/25">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0B0A09] to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-[1fr_0.9fr] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A47449]/15 border border-[#A47449]/40 text-[#E6CBB3] text-xs font-mono font-bold mb-6 shadow-sm">
              <Scale className="w-4 h-4 text-[#A47449]" />
              LexIntel AI for Legal Case Intelligence
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.1] font-serif">
              A calmer way to prepare, analyze, and brief <span className="text-[#A47449] italic">legal matters.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[#D8C8BB] max-w-2xl leading-relaxed font-sans">
              Bring case documents, evidence, precedent research, risk notes, and final reports into a single professional workspace designed for advocates and litigation teams.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                variant="gradient"
                size="lg"
                icon={ArrowRight}
                onClick={() => navigate("/upload")}
              >
                Upload Case
              </Button>
              <Button
                variant="cyanOutline"
                size="lg"
                icon={BookOpen}
                onClick={() => navigate("/dashboard")}
              >
                Open Case Desk
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative"
          >
            <div className="rounded-2xl border border-[#A47449]/35 bg-[#1C1815]/90 shadow-2xl shadow-black/60 overflow-hidden backdrop-blur-xl">
              <div className="h-12 bg-[#13100E] border-b border-[#A47449]/25 flex items-center px-5 gap-3">
                <Gavel className="w-5 h-5 text-[#A47449]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#E6CBB3] font-bold">Matter Brief</span>
              </div>
              <div className="p-6 space-y-5">
                <div className="bg-gradient-to-br from-[#25201C] to-[#1C1815] rounded-xl p-6 border border-[#A47449]/30 shadow-inner">
                  <div className="flex items-center justify-between border-b border-[#A47449]/25 pb-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-[#A47449] font-mono">High Court Filing</p>
                      <h3 className="text-xl font-bold text-white font-serif mt-0.5">Sharma vs. Apex Realty</h3>
                    </div>
                    <Scale className="w-8 h-8 text-[#A47449]" />
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-5 text-center">
                    {["Evidence", "Precedent", "Drafts"].map((item) => (
                      <div key={item} className="rounded-lg border border-[#A47449]/25 bg-[#13100E]/80 p-3">
                        <p className="text-[10px] uppercase tracking-widest text-[#A89C92] font-mono font-bold">{item}</p>
                        <p className="text-base font-bold text-[#A47449] mt-1 font-display">Ready</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-[#A47449]/25 bg-[#13100E]/80 p-4">
                    <p className="text-[10px] font-mono uppercase text-[#A47449] tracking-widest font-bold">Risk Score</p>
                    <p className="text-2xl font-bold text-white mt-1 font-display">24/100</p>
                  </div>
                  <div className="rounded-xl border border-[#A47449]/25 bg-[#13100E]/80 p-4">
                    <p className="text-[10px] font-mono uppercase text-[#A47449] tracking-widest font-bold">Report Status</p>
                    <p className="text-2xl font-bold text-white mt-1 font-display">Drafted</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-20 border-b border-[#A47449]/20 bg-[#0F0D0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="purple" className="mb-3">Built for litigation teams</Badge>
            <h2 className="text-3xl font-bold text-white font-serif">Everything needed for a prepared legal brief</h2>
            <p className="text-sm text-[#A89C92] mt-2 font-sans">Simple workflows, careful document handling, and professional reporting.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <Card key={i} hover variant="purple" className="flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#A47449]/15 border border-[#A47449]/35 flex items-center justify-center text-[#A47449] mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white font-display">{feat.title}</h3>
                    <p className="text-xs text-stone-400 mt-2 leading-relaxed font-sans">{feat.desc}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
