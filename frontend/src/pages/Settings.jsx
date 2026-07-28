import React, { useState } from "react";
import { Settings as SettingsIcon, Bell, Database, Key, LogOut, CheckCircle2 } from "lucide-react";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { useCase } from "../context/CaseContext";
import { useAuth } from "../context/AuthContext";

export const Settings = () => {
  const { addToast } = useCase();
  const { logout } = useAuth();

  const [apiEndpoint, setApiEndpoint] = useState("https://api.lexintel.ai/v1");
  const [dbStatus, setDbStatus] = useState("Simulated Mock Layer (Ready for PostgreSQL + FastAPI)");
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [hearingAlerts, setHearingAlerts] = useState(true);

  const handleSaveSettings = () => {
    addToast("Platform preferences updated successfully!", "success");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#A47449]/15 text-[#E6CBB3] text-xs font-mono font-bold border border-[#A47449]/35">
          <SettingsIcon className="w-3.5 h-3.5 text-[#A47449]" /> Workspace Configuration
        </div>
        <h1 className="text-3xl font-bold text-white font-serif">Settings & System Preferences</h1>
        <p className="text-xs text-stone-400">Configure theme, backend API target, and alert parameters</p>
      </div>

      {/* Backend API Target */}
      <Card className="p-6 space-y-4 border-[#A47449]/30 bg-[#1C1815]">
        <h3 className="text-sm font-bold text-white border-b border-[#A47449]/20 pb-3 flex items-center gap-2 font-display">
          <Database className="w-4 h-4 text-emerald-400" />
          Backend API Integration (FastAPI & PostgreSQL)
        </h3>

        <p className="text-xs text-stone-400 leading-relaxed">
          The frontend is architected to switch seamlessly from mock data to real FastAPI REST endpoints with zero UI code changes.
        </p>

        <Input
          label="FastAPI Backend Endpoint Target"
          value={apiEndpoint}
          onChange={(e) => setApiEndpoint(e.target.value)}
          placeholder="http://localhost:8000/api/v1"
          icon={Key}
        />

        <div className="p-3 rounded-xl bg-[#13100E] border border-[#A47449]/20 text-xs flex items-center gap-2 text-emerald-400 font-mono font-bold">
          <CheckCircle2 className="w-4 h-4" />
          <span>Status: {dbStatus}</span>
        </div>
      </Card>

      {/* Notification Preferences */}
      <Card className="p-6 space-y-4 border-[#A47449]/30 bg-[#1C1815]">
        <h3 className="text-sm font-bold text-white border-b border-[#A47449]/20 pb-3 flex items-center gap-2 font-display">
          <Bell className="w-4 h-4 text-[#A47449]" />
          Alerts & Notifications
        </h3>

        <div className="space-y-3 text-xs font-mono">
          <label className="flex items-center justify-between p-3 rounded-xl bg-[#13100E] border border-[#A47449]/25 cursor-pointer">
            <span className="text-[#F7F4F0] font-bold">Email Hearing Reminders</span>
            <input
              type="checkbox"
              checked={emailNotifs}
              onChange={(e) => setEmailNotifs(e.target.checked)}
              className="rounded bg-[#1C1815] border-[#A47449]/40 text-[#A47449] focus:ring-[#A47449]"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-[#13100E] border border-[#A47449]/25 cursor-pointer">
            <span className="text-[#F7F4F0] font-bold">High-Risk Case Escalation Alerts</span>
            <input
              type="checkbox"
              checked={hearingAlerts}
              onChange={(e) => setHearingAlerts(e.target.checked)}
              className="rounded bg-[#1C1815] border-[#A47449]/40 text-[#A47449] focus:ring-[#A47449]"
            />
          </label>
        </div>

        <div className="pt-2 flex justify-between items-center">
          <Button variant="danger" size="sm" icon={LogOut} onClick={logout}>
            Sign Out
          </Button>
          <Button variant="gradient" size="md" onClick={handleSaveSettings}>
            Save Preferences
          </Button>
        </div>
      </Card>
    </div>
  );
};
