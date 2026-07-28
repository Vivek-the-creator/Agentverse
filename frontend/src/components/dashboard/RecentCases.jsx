import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";

export const RecentCases = ({ cases = [] }) => {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return <Badge variant="emerald">Disposed / Won</Badge>;
      case "In Progress":
        return <Badge variant="purple">In Trial</Badge>;
      case "Under Review":
        return <Badge variant="gold">Reviewing</Badge>;
      default:
        return <Badge variant="cyan">{status}</Badge>;
    }
  };

  const getRiskBadge = (score) => {
    if (score < 30) return <span className="text-xs font-mono font-bold text-emerald-400">{score}/100 (Low)</span>;
    if (score < 60) return <span className="text-xs font-mono font-bold text-[#A47449]">{score}/100 (Medium)</span>;
    return <span className="text-xs font-mono font-bold text-rose-400">{score}/100 (High)</span>;
  };

  return (
    <Card className="flex flex-col gap-4 bg-[#1C1815] border-[#A47449]/30">
      <div className="flex items-center justify-between border-b border-[#A47449]/20 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
            Active Docket & Intelligence Ingests
          </h3>
          <p className="text-xs text-stone-400">High-priority litigations under multi-agent synthesis</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          icon={ChevronRight}
          onClick={() => navigate("/results")}
        >
          View Full Docket
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#13100E] text-[#A47449] uppercase tracking-wider font-mono font-bold border-b border-[#A47449]/25">
            <tr>
              <th className="py-3 px-4">Case Details</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Court Forum</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Risk Exposure</th>
              <th className="py-3 px-4 text-center">Win Odds</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#A47449]/15">
            {cases.map((c) => (
              <tr
                key={c.id}
                onClick={() => navigate("/results")}
                className="hover:bg-[#A47449]/10 transition-colors cursor-pointer group"
              >
                <td className="py-3.5 px-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-white group-hover:text-[#A47449] transition-colors font-display">
                      {c.title}
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono">{c.caseNumber}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-[#D8C8BB] font-medium">{c.type}</span>
                </td>
                <td className="py-3.5 px-4 max-w-[180px] truncate text-stone-400">
                  {c.courtName}
                </td>
                <td className="py-3.5 px-4">{getStatusBadge(c.status)}</td>
                <td className="py-3.5 px-4">{getRiskBadge(c.riskScore)}</td>
                <td className="py-3.5 px-4 text-center font-mono font-bold text-emerald-400">
                  {c.successProbability}%
                </td>
                <td className="py-3.5 px-4 text-right">
                  <span className="inline-flex items-center text-xs font-mono font-bold text-[#A47449] group-hover:translate-x-1 transition-transform">
                    Inspect <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
