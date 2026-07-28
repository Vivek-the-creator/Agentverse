import React, { useState } from "react";
import { Copy, Check, Download } from "lucide-react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";

export const NoticeDraftModal = ({ isOpen, onClose, noticeText, caseTitle = "Legal Case" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(noticeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Auto-Generated Court Legal Notice" maxWidth="max-w-3xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#13100E] border border-[#A47449]/25 text-xs">
          <span className="text-stone-400">Target Forum: <strong className="text-[#A47449] font-mono">RERA Tribunal / Court Notice</strong></span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" icon={copied ? Check : Copy} onClick={handleCopy}>
              {copied ? "Copied!" : "Copy Notice"}
            </Button>
            <Button variant="gradient" size="sm" icon={Download}>
              Download PDF Notice
            </Button>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-[#13100E] border border-[#A47449]/30 font-mono text-xs text-[#F7F4F0] leading-relaxed whitespace-pre-wrap max-h-[60vh] overflow-y-auto select-text border-l-4 border-l-[#A47449]">
          {noticeText || "LEGAL NOTICE DRAFT SYNTHESIS IN PROGRESS..."}
        </div>
      </div>
    </Modal>
  );
};
