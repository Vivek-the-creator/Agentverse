import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import { Card } from "../common/Card";
import { BarChart3 } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const AnalyticsChart = ({ analytics }) => {
  const [activeTab, setActiveTab] = useState("trends");

  if (!analytics) return null;

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#F7F4F0", font: { family: "Plus Jakarta Sans", size: 11, weight: "bold" } }
      },
      tooltip: {
        backgroundColor: "#13100E",
        titleColor: "#F7F4F0",
        bodyColor: "#A47449",
        borderColor: "rgba(164, 116, 73, 0.4)",
        borderWidth: 1,
        padding: 12
      }
    },
    scales: {
      x: {
        grid: { color: "rgba(164, 116, 73, 0.12)" },
        ticks: { color: "#A89C92", font: { size: 10, family: "JetBrains Mono" } }
      },
      y: {
        grid: { color: "rgba(164, 116, 73, 0.12)" },
        ticks: { color: "#A89C92", font: { size: 10, family: "JetBrains Mono" } }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: { color: "#F7F4F0", font: { family: "Plus Jakarta Sans", size: 11 }, boxWidth: 12 }
      }
    }
  };

  return (
    <Card className="flex flex-col gap-4 bg-[#1C1815] border-[#A47449]/30">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#A47449]/20 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
            <BarChart3 className="w-4 h-4 text-[#A47449]" />
            Case Analytics
          </h3>
          <p className="text-xs text-stone-400">Case intake trends, outcome indicators, and category distribution</p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-[#13100E] rounded-xl border border-[#A47449]/30">
          <button
            onClick={() => setActiveTab("trends")}
            className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
              activeTab === "trends"
                ? "bg-[#A47449] text-white shadow-md"
                : "text-stone-400 hover:text-white"
            }`}
          >
            Monthly Ingestion
          </button>
          <button
            onClick={() => setActiveTab("status")}
            className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
              activeTab === "status"
                ? "bg-[#A47449] text-white shadow-md"
                : "text-stone-400 hover:text-white"
            }`}
          >
            Case Outcomes
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
              activeTab === "categories"
                ? "bg-[#A47449] text-white shadow-md"
                : "text-stone-400 hover:text-white"
            }`}
          >
            Domain Breakdown
          </button>
        </div>
      </div>

      {/* Chart Body */}
      <div className="h-72 w-full pt-2">
        {activeTab === "trends" && (
          <Line data={analytics.monthlyCaseTrends} options={lineOptions} />
        )}

        {activeTab === "status" && (
          <div className="h-full flex items-center justify-center">
            <Doughnut data={analytics.caseStatusDistribution} options={doughnutOptions} />
          </div>
        )}

        {activeTab === "categories" && (
          <Bar data={analytics.caseCategoryBreakdown} options={lineOptions} />
        )}
      </div>
    </Card>
  );
};
