import React from "react";
import { Download, Eye, Calendar, HardDrive } from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";

export const ReportCard = ({ report, onView, onDownload }) => {
  return (
    <Card hover variant="purple" className="flex flex-col justify-between h-full group bg-[#1C1815] border-[#A47449]/30">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="purple" size="xs">
            {report.type}
          </Badge>
          <span className="text-[10px] text-stone-400 font-mono flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#A47449]" /> {report.generatedDate}
          </span>
        </div>

        <h4 className="text-sm font-bold text-white group-hover:text-[#A47449] transition-colors line-clamp-2 font-display">
          {report.title}
        </h4>
        <p className="text-xs text-[#A47449] font-semibold mt-1 truncate">
          Case: {report.caseTitle}
        </p>

        <p className="text-xs text-stone-400 mt-2.5 line-clamp-3 leading-relaxed">
          {report.summary}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {report.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-md bg-[#13100E] text-stone-300 border border-[#A47449]/20 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-[#A47449]/20 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 text-[10px] text-stone-400 font-mono">
          <span className="flex items-center gap-1">
            <HardDrive className="w-3 h-3 text-[#A47449]" /> {report.fileSize}
          </span>
          <span>{report.pages} Pages</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Eye}
            onClick={() => onView(report)}
          >
            Preview
          </Button>
          <Button
            variant="gradient"
            size="sm"
            icon={Download}
            onClick={() => onDownload(report)}
          >
            PDF
          </Button>
        </div>
      </div>
    </Card>
  );
};
