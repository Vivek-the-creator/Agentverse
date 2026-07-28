import React, { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { ReportCard } from "../components/reports/ReportCard";
import { PDFViewer } from "../components/reports/PDFViewer";
import { SearchBar } from "../components/common/SearchBar";
import { GuidanceBanner } from "../components/common/GuidanceBanner";
import { Loader } from "../components/common/Loader";
import { useCase } from "../context/CaseContext";
import { api } from "../services/api";

export const Reports = () => {
  const { addToast } = useCase();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);

  const tagsList = ["All", "Real Estate", "Consumer Protection", "Cyber Crime", "Employment", "Insurance", "PMLA", "Partition"];

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const res = await api.getReports(search, activeTag);
        if (res.success) {
          setReports(res.data);
        }
      } catch (err) {
        console.error("Failed to load reports:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [search, activeTag]);

  const handleDownload = (rep) => {
    addToast(`Downloading PDF Report: ${rep.title}`, "info");
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Guidance Banner */}
      <GuidanceBanner
        text="Generated AI reports will appear here."
        badgeText="Reports Repository"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#A47449]/15 text-[#E6CBB3] text-xs font-mono font-bold border border-[#A47449]/35 mb-1">
            <BookOpen className="w-3.5 h-3.5 text-[#A47449]" /> Intelligence Dossier Vault
          </div>
          <h1 className="text-3xl font-bold text-white font-serif">
            Legal Intelligence Reports
          </h1>
          <p className="text-xs text-stone-400">
            Browse and export 15+ comprehensive AI legal dossiers and statutory audits.
          </p>
        </div>
      </div>

      {/* Search & Tag Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#1C1815] p-4 rounded-xl border border-[#A47449]/30">
        <div className="w-full md:w-80">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search report titles, cases..."
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {tagsList.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all ${
                activeTag === tag
                  ? "bg-[#A47449] text-white shadow-md"
                  : "bg-[#13100E] text-stone-400 border border-[#A47449]/25 hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Grid */}
      {loading ? (
        <Loader text="Fetching Legal Intelligence Dossiers..." />
      ) : reports.length === 0 ? (
        <div className="text-center py-12 bg-[#1C1815] rounded-xl border border-[#A47449]/30">
          <BookOpen className="w-8 h-8 text-[#A47449] mx-auto mb-2" />
          <p className="text-sm font-bold text-white font-display">No Reports Found</p>
          <p className="text-xs text-stone-500 mt-1">Try adjusting your search query or filter tags.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((rep) => (
            <ReportCard
              key={rep.id}
              report={rep}
              onView={(r) => setSelectedReport(r)}
              onDownload={handleDownload}
            />
          ))}
        </div>
      )}

      {/* PDF Viewer Modal */}
      <PDFViewer
        isOpen={!!selectedReport}
        onClose={() => setSelectedReport(null)}
        report={selectedReport}
      />
    </div>
  );
};
