import React from "react";
import { ShieldCheck } from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";

export const EvidenceCard = ({ evidence = [] }) => {
  return (
    <Card className="flex flex-col gap-4 border-[#A47449]/30 bg-[#1C1815]">
      <div className="flex items-center justify-between border-b border-[#A47449]/20 pb-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Evidence Timeline & Sec 65B Audit
        </h3>
        <Badge variant="purple" size="xs">100% Verified</Badge>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#13100E] text-[#A47449] uppercase tracking-wider font-mono font-bold border-b border-[#A47449]/25">
            <tr>
              <th className="py-2.5 px-3">Evidence Item</th>
              <th className="py-2.5 px-3">Document Type</th>
              <th className="py-2.5 px-3">Evidentiary Weight</th>
              <th className="py-2.5 px-3">Ingestion Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#A47449]/15">
            {evidence.map((ev) => (
              <tr key={ev.id} className="hover:bg-[#A47449]/10 transition-colors">
                <td className="py-3 px-3">
                  <span className="font-bold text-white font-display">{ev.title}</span>
                </td>
                <td className="py-3 px-3">
                  <Badge variant="purple" size="xs">{ev.type}</Badge>
                </td>
                <td className="py-3 px-3 font-mono font-bold text-emerald-400">
                  {ev.score}
                </td>
                <td className="py-3 px-3 text-stone-400 font-mono text-[11px]">
                  {ev.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
