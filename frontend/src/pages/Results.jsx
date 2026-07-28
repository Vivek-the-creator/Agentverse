import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileCheck, Download, FileText, Gavel, BookOpenCheck } from "lucide-react";
import { CaseSummaryCard } from "../components/results/CaseSummaryCard";
import { RiskScoreGauge } from "../components/results/RiskScoreGauge";
import { ApplicableLawsCard } from "../components/results/ApplicableLawsCard";
import { EvidenceCard } from "../components/results/EvidenceCard";
import { NoticeDraftModal } from "../components/results/NoticeDraftModal";
import { GuidanceBanner } from "../components/common/GuidanceBanner";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { Badge } from "../components/common/Badge";
import { Loader } from "../components/common/Loader";
import { useCase } from "../context/CaseContext";
import { api } from "../services/api";

export const Results = () => {
  const { activeCase, addToast } = useCase();
  const navigate = useNavigate();

  const [caseDetails, setCaseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNoticeModal, setShowNoticeModal] = useState(false);

  useEffect(() => {
    const loadResults = async () => {
      try {
        const targetId = activeCase?.id || "case_001";
        const res = await api.getCaseById(targetId);
        if (res.success) {
          setCaseDetails(res.data);
        }
      } catch (err) {
        console.error("Failed to load results:", err);
      } finally {
        setLoading(false);
      }
    };
    loadResults();
  }, [activeCase]);

  if (loading) {
    return <Loader text="Preparing legal intelligence dossier..." />;
  }

  const similarJudgments = [
    { title: "M/s Newtech Promoters v. State of UP (2021 SC)", court: "Supreme Court of India", relevance: "98% Ratio Similarity", summary: "Affirmed mandatory refund with interest under RERA Section 18 for delay." },
    { title: "Imperia Structures Ltd v. Anil Patni (2020 SC)", court: "Supreme Court of India", relevance: "95% Precedent Match", summary: "Held RERA remedies do not bar Consumer Forum jurisdiction." }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Guidance Banner */}
      <GuidanceBanner
        text="Review legal analysis, precedent notes, risk indicators, and the notice draft."
        badgeText="Dossier Ready"
      />

      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/35 mb-1">
            <FileCheck className="w-3.5 h-3.5" /> Legal intelligence report ready
          </div>
          <h1 className="text-3xl font-bold text-white font-serif">
            Case Analysis & Results
          </h1>
          <p className="text-xs text-stone-400">
            Includes precedent review, risk assessment, strategy notes, and Section 65B evidence verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="cyanOutline"
            size="md"
            icon={FileText}
            onClick={() => setShowNoticeModal(true)}
          >
            Notice Draft
          </Button>
          <Button
            variant="gradient"
            size="md"
            icon={Download}
            onClick={() => addToast("Exporting 18-Page Statutory PDF Dossier...", "info")}
          >
            Export Dossier
          </Button>
        </div>
      </div>

      {/* Section 1: Case Overview */}
      <CaseSummaryCard caseData={caseDetails} />

      {/* Section 2: Prediction & Risk Gauge */}
      <RiskScoreGauge
        riskScore={caseDetails?.riskScore}
        successProbability={caseDetails?.successProbability}
        settlementChance={caseDetails?.settlementChance}
      />

      {/* Section 3 & 4: Applicable Laws & Evidence Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ApplicableLawsCard laws={caseDetails?.applicableLaws} />
        <EvidenceCard evidence={caseDetails?.evidence} />
      </div>

      {/* Section 5: Similar Judgments Found */}
      <Card className="flex flex-col gap-4 border-[#A47449]/30 bg-[#1C1815]">
        <div className="flex items-center justify-between border-b border-[#A47449]/20 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display">
            <BookOpenCheck className="w-4 h-4 text-[#A47449]" />
            Similar Supreme Court Judgments
          </h3>
          <Badge variant="purple" size="xs">Precedent Matched</Badge>
        </div>

        <div className="space-y-3">
          {similarJudgments.map((j, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#13100E] border border-[#A47449]/25 space-y-1 hover:border-[#A47449]/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs font-display">{j.title}</span>
                <span className="text-[10px] font-mono font-bold text-emerald-400">{j.relevance}</span>
              </div>
              <span className="text-[10px] text-[#A47449] font-mono block">{j.court}</span>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">{j.summary}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Section 6: Recommended Strategy Roadmap */}
      <Card className="flex flex-col gap-4 border-[#A47449]/30 bg-[#1C1815]">
        <div className="flex items-center justify-between border-b border-[#A47449]/20 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display">
            <Gavel className="w-4 h-4 text-[#A47449]" />
            Recommended Counsel Strategy Roadmap
          </h3>
          <Badge variant="purple" size="xs">Tactical Counsel Plan</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {caseDetails?.defenseStrategy?.map((strat, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-[#13100E] border border-[#A47449]/25 space-y-1.5 hover:border-[#A47449]/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-[#A47449]/20 text-[#A47449] font-mono font-bold text-[10px] flex items-center justify-center border border-[#A47449]/35">
                  {i + 1}
                </span>
                <span className="text-xs font-bold text-white font-display">Strategic Move #{i + 1}</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed pl-7">{strat}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Notice Modal */}
      <NoticeDraftModal
        isOpen={showNoticeModal}
        onClose={() => setShowNoticeModal(false)}
        noticeText={caseDetails?.generatedNotice}
        caseTitle={caseDetails?.title}
      />
    </div>
  );
};
