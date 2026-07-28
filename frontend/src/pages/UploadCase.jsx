import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, Cpu } from "lucide-react";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { Badge } from "../components/common/Badge";
import { GuidanceBanner } from "../components/common/GuidanceBanner";
import { UploadBox } from "../components/upload/UploadBox";
import { FilePreview } from "../components/upload/FilePreview";
import { UploadGuideCard } from "../components/upload/UploadGuideCard";
import { useCase } from "../context/CaseContext";
import { api } from "../services/api";

export const UploadCase = () => {
  const { startAgentProcessing, addToast } = useCase();
  const navigate = useNavigate();

  const [files, setFiles] = useState([
    { id: "ev_default_1", name: "FIR_Registration_Copy.pdf", size: "2.8 MB", type: "FIR / Police Copy" },
    { id: "ev_default_2", name: "Registered_Agreement_For_Sale.pdf", size: "3.4 MB", type: "Agreement" },
    { id: "ev_default_3", name: "Bank_Wire_Transfer_Receipts.pdf", size: "1.2 MB", type: "Financial Record" }
  ]);

  const [formData, setFormData] = useState({
    title: "Sharma vs. Apex Realty Developers",
    caseType: "Property Dispute",
    jurisdiction: "Maharashtra Real Estate Regulatory Authority (MahaRERA)",
    clientName: "Ramesh Sharma",
    opposingParty: "Apex Realty Private Limited",
    notes: "Claiming RERA Section 18 statutory delay compensation for 24 months delayed possession."
  });

  const [uploading, setUploading] = useState(false);

  const handleRemoveFile = (id) => {
    setFiles(files.filter((f) => f.id !== id));
  };

  const handleAddSampleFile = (sample) => {
    const newFile = {
      id: `sample_${Date.now()}_${Math.random()}`,
      name: sample.name,
      size: sample.size,
      type: sample.type
    };
    setFiles((prev) => [...prev, newFile]);
    addToast(`Added sample file: ${sample.name}`, "info");
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      addToast("Please upload at least one case file or evidence document.", "warning");
      return;
    }

    setUploading(true);
    try {
      const res = await api.uploadCase({ ...formData, files });
      if (res.success) {
        addToast("Case ingested into LexIntel Multi-Agent Pipeline!", "success");
        startAgentProcessing(res.data);
        navigate("/processing");
      }
    } catch (err) {
      addToast("Failed to upload case", "danger");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Guidance Banner */}
      <GuidanceBanner
        text="Upload legal documents to start AI analysis."
        badgeText="Upload Assistant"
      />

      {/* Page Title */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#A47449]/15 text-[#E6CBB3] text-xs font-mono font-bold border border-[#A47449]/35">
          <UploadCloud className="w-3.5 h-3.5 text-[#A47449]" /> Intelligent Case Ingestion Assistant
        </div>
        <h1 className="text-3xl font-bold text-white font-serif">Start Your Legal Analysis</h1>
        <p className="text-xs text-stone-400">
          Upload legal documents, FIR copies, or court orders to initiate autonomous multi-agent evaluation.
        </p>
      </div>

      {/* Interactive Guide Card */}
      <UploadGuideCard onSelectSampleFile={handleAddSampleFile} />

      <form onSubmit={handleAnalyze} className="space-y-6">
        {/* Step 1: Upload Legal Documents */}
        <Card className="p-6 space-y-4 border-[#A47449]/30 bg-[#1C1815]">
          <div className="flex items-center justify-between border-b border-[#A47449]/20 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#A47449]/20 text-[#A47449] font-mono font-bold text-xs flex items-center justify-center border border-[#A47449]/40">
                1
              </span>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                Step 1: Upload Your Legal Documents
              </h3>
            </div>
            <Badge variant="purple" size="xs">Supported: PDF, Images, Audio, Video, FIR</Badge>
          </div>

          <UploadBox onFilesSelected={setFiles} files={files} />
          <FilePreview files={files} onRemove={handleRemoveFile} />
        </Card>

        {/* Step 2: Select Case Type & Form Metadata */}
        <Card className="p-6 space-y-4 border-[#A47449]/30 bg-[#1C1815]">
          <div className="flex items-center gap-2 border-b border-[#A47449]/20 pb-3">
            <span className="w-6 h-6 rounded-full bg-[#A47449]/20 text-[#A47449] font-mono font-bold text-xs flex items-center justify-center border border-[#A47449]/40">
              2
            </span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Step 2: Select Case Category & Jurisdiction
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#D8C8BB] uppercase tracking-wider block mb-1.5 font-display">
                Select Case Type *
              </label>
              <select
                value={formData.caseType}
                onChange={(e) => setFormData({ ...formData, caseType: e.target.value })}
                className="w-full bg-[#13100E] border border-[#A47449]/30 text-white text-sm rounded-xl p-3 focus:border-[#A47449] focus:outline-none font-medium"
              >
                <option value="Criminal Case">Criminal Case (FIR / Bail / IPC / BNS)</option>
                <option value="Civil Dispute">Civil Dispute & Contract</option>
                <option value="Consumer Complaint">Consumer Protection Complaint</option>
                <option value="Property Dispute">Property & RERA Dispute</option>
                <option value="Employment Issue">Employment & Non-Compete</option>
                <option value="Cyber Crime">Cyber Crime & IT Act</option>
              </select>
            </div>

            <Input
              label="Case Title / Caption"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <Input
              label="Target Court / Jurisdiction"
              value={formData.jurisdiction}
              onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
              required
            />

            <Input
              label="Litigant / Complainant Name"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              required
            />

            <Input
              label="Opposing Party / Respondent"
              value={formData.opposingParty}
              onChange={(e) => setFormData({ ...formData, opposingParty: e.target.value })}
              required
            />
          </div>

          <Input
            label="Additional Facts & Evidence Notes"
            type="textarea"
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Brief overview of facts, dates, or monetary claims..."
          />
        </Card>

        {/* Step 3: Start AI Analysis */}
        <Card className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-[#A47449]/40 bg-gradient-to-r from-[#1C1815] to-[#13100E]">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#A47449] text-white font-mono font-bold text-sm flex items-center justify-center shadow-lg">
              3
            </span>
            <div>
              <h3 className="text-base font-bold text-white font-display">Step 3: Start AI Analysis</h3>
              <p className="text-xs text-stone-400">Start legal document review and report preparation</p>
            </div>
          </div>

          <Button
            type="submit"
            variant="gradient"
            size="lg"
            loading={uploading}
            icon={Cpu}
            className="w-full sm:w-auto"
          >
            Analyze Case Now
          </Button>
        </Card>
      </form>
    </div>
  );
};
