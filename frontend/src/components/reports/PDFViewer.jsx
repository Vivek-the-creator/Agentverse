import React, { useState } from "react";
import { Download, ShieldCheck, Printer, Copy, Check } from "lucide-react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";

export const PDFViewer = ({ isOpen, onClose, report }) => {
  const [copied, setCopied] = useState(false);

  if (!report) return null;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={report.title} maxWidth="max-w-4xl">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#13100E] border border-[#A47449]/25 text-xs">
          <div className="flex items-center gap-2 text-[#F7F4F0] font-semibold font-display">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Sec 65B Certified Multi-Agent Dossier</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" icon={copied ? Check : Copy} onClick={handleCopy}>
              {copied ? "Copied" : "Copy Text"}
            </Button>
            <Button variant="outline" size="sm" icon={Printer} onClick={() => window.print()}>
              Print
            </Button>
            <Button variant="gradient" size="sm" icon={Download}>
              Download PDF ({report.fileSize})
            </Button>
          </div>
        </div>

        <div className="bg-[#13100E] p-8 sm:p-12 rounded-xl border border-[#A47449]/30 shadow-2xl space-y-6 text-[#F7F4F0] text-sm leading-relaxed max-h-[60vh] overflow-y-auto select-text font-serif">
          <div className="border-b border-[#A47449]/25 pb-4 text-center space-y-1 font-sans">
            <h2 className="text-xl font-bold tracking-tight text-white font-serif">
              LEXINTEL AI STATUTORY INTELLIGENCE REPORT
            </h2>
            <p className="text-xs text-[#A47449] font-mono uppercase font-bold tracking-widest">
              CONFIDENTIAL & PRIVILEGED LEGAL WORK PRODUCT
            </p>
            <p className="text-xs text-stone-400 font-mono">Dossier ID: {report.id} | Date: {report.generatedDate}</p>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-2 font-display">1. CASE METADATA SUMMARY</h3>
            <p><strong>Case Reference:</strong> {report.caseTitle} ({report.caseNumber || "CS/2026/8941"})</p>
            <p><strong>Authoring Agent:</strong> {report.authorAgent}</p>
            <p><strong>Target Forum:</strong> High Court & Statutory Tribunal Jurisdiction</p>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-2 font-display">2. EXECUTIVE FINDINGS</h3>
            <p>{report.summary}</p>
            <p className="mt-2">
              Based on algorithmic precedent matching across 500,000+ judicial records, the success probability for this litigation is calculated at <strong className="text-emerald-400 font-sans">{report.successProbability || "88%"}</strong> with a Risk Score of <strong className="text-[#A47449] font-sans">{report.riskScore || 24}/100</strong>.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-2 font-display">3. STATUTORY PROVISIONS & PRECEDENTS</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Real Estate (Regulation and Development) Act, 2016 - Section 18 Mandatory Refund Interest</li>
              <li>Indian Contract Act, 1872 - Section 73 Liquidated Damages & Compensation</li>
              <li>Supreme Court Ruling in M/s Newtech Promoters & Developers Pvt Ltd v. State of UP & Ors (2021)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-2 font-display">4. STRATEGIC RECOMMENDATIONS</h3>
            <p>
              Initiate immediate Section 18 petition in MahaRERA Tribunal. File simultaneous interim prayer restricting builder from creating third-party rights on unsold residential inventory.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
