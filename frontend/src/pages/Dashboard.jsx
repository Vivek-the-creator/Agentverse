import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Scale, Plus } from "lucide-react";
import { StatisticsCards } from "../components/dashboard/StatisticsCards";
import { AnalyticsChart } from "../components/dashboard/AnalyticsChart";
import { RecentCases } from "../components/dashboard/RecentCases";
import { ActivityTimeline } from "../components/dashboard/ActivityTimeline";
import { QuickActions } from "../components/dashboard/QuickActions";
import { AIInsightsPanel } from "../components/dashboard/AIInsightsPanel";
import { GuidanceBanner } from "../components/common/GuidanceBanner";
import { EmptyState } from "../components/common/EmptyState";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { Loader } from "../components/common/Loader";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await api.getDashboard();
        if (res.success) {
          setDashboardData(res.data);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  if (loading) {
    return <Loader text="Preparing your case desk..." />;
  }

  const hasCases = dashboardData?.recentCases && dashboardData.recentCases.length > 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Guidance Banner */}
      <GuidanceBanner
        text="Your analyzed cases, risk indicators, and counsel-ready activity appear here."
        badgeText="Case Desk"
      />

      {/* Welcome Banner Card */}
      <Card className="relative overflow-hidden bg-[#1C1815] border-[#A47449]/35 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#A47449]/15 text-[#E6CBB3] text-xs font-mono font-bold border border-[#A47449]/35 mb-2">
              <Scale className="w-3.5 h-3.5 text-[#A47449]" /> Case workspace ready
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif">
              Welcome Back, {user?.name || "Advocate"}
            </h1>
            <p className="text-xs sm:text-sm text-[#D8C8BB] leading-relaxed font-sans">
              Your workspace has prepared <strong className="text-emerald-400 font-mono">14 precedent analysis dossiers</strong> today with matter summaries ready for review.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="gradient"
              size="md"
              icon={Plus}
              onClick={() => navigate("/upload")}
            >
              Start New Analysis
            </Button>
          </div>
        </div>
      </Card>

      {/* KPI Statistic Cards */}
      <StatisticsCards kpis={dashboardData?.kpis} />

      {/* Quick Action Shortcuts */}
      <QuickActions actions={dashboardData?.quickActions} />

      {/* Case desk layout */}
      {hasCases ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Center Column: Case Intelligence & Charts */}
          <div className="lg:col-span-2 space-y-6">
            <AnalyticsChart analytics={dashboardData?.analytics} />
            <RecentCases cases={dashboardData?.recentCases} />
            <ActivityTimeline activities={dashboardData?.recentActivities} />
          </div>

          {/* Right Column: Insights Panel */}
          <div className="space-y-6 lg:sticky lg:top-20">
            <AIInsightsPanel onExploreResults={() => navigate("/results")} />
          </div>
        </div>
      ) : (
        <EmptyState
          title="No Legal Cases Yet"
          description="Upload your first case file and let LexIntel prepare the analysis."
          buttonText="Upload New Case"
          actionRoute="/upload"
        />
      )}
    </div>
  );
};
