import React from "react";
import { Award, Building, Phone, Mail, MapPin } from "lucide-react";
import { Card } from "../components/common/Card";
import { Badge } from "../components/common/Badge";
import { useAuth } from "../context/AuthContext";

export const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header Profile Card */}
      <Card className="relative overflow-hidden bg-[#1C1815] border-[#A47449]/35 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"}
            alt={user?.name}
            className="w-24 h-24 rounded-xl object-cover border-2 border-[#A47449] shadow-2xl shrink-0"
          />

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-bold text-white font-serif">{user?.name}</h1>
              <Badge variant="purple" size="sm">{user?.role}</Badge>
            </div>

            <p className="text-xs text-[#A47449] font-mono font-bold flex items-center justify-center sm:justify-start gap-1">
              <Award className="w-3.5 h-3.5 text-[#A47449]" /> Bar Roll No: {user?.barNumber || "MAH/4921/2012"}
            </p>

            <p className="text-xs text-stone-300 max-w-xl leading-relaxed">{user?.bio}</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-stone-400 font-mono">
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-[#A47449]" /> {user?.email}</span>
              <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-emerald-400" /> {user?.phone}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#A47449]" /> {user?.location}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <Card className="p-4 border-[#A47449]/25 bg-[#1C1815]">
          <span className="text-[10px] text-[#A47449] font-mono font-bold uppercase tracking-wider">Cases Managed</span>
          <p className="text-2xl font-bold text-white mt-1 font-mono">{user?.casesManaged || 42}</p>
        </Card>
        <Card className="p-4 border-[#A47449]/25 bg-[#1C1815]">
          <span className="text-[10px] text-[#A47449] font-mono font-bold uppercase tracking-wider">Success Rate</span>
          <p className="text-2xl font-bold text-emerald-400 mt-1 font-mono">{user?.successRate || "94.2%"}</p>
        </Card>
        <Card className="p-4 border-[#A47449]/25 bg-[#1C1815]">
          <span className="text-[10px] text-[#A47449] font-mono font-bold uppercase tracking-wider">Precedents Cited</span>
          <p className="text-2xl font-bold text-white mt-1 font-mono">148 Rulings</p>
        </Card>
        <Card className="p-4 border-[#A47449]/25 bg-[#1C1815]">
          <span className="text-[10px] text-[#A47449] font-mono font-bold uppercase tracking-wider">Review Trust</span>
          <p className="text-2xl font-bold text-[#A47449] mt-1 font-mono">96.8%</p>
        </Card>
      </div>

      {/* Details Card */}
      <Card className="p-6 space-y-4 border-[#A47449]/30 bg-[#1C1815]">
        <h3 className="text-sm font-bold text-white border-b border-[#A47449]/20 pb-3 flex items-center gap-2 font-display">
          <Building className="w-4 h-4 text-[#A47449]" />
          Jurisdiction & Practice Specialization
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[#A47449] block uppercase tracking-wider font-mono font-bold text-[10px]">Primary Jurisdiction</span>
            <p className="font-bold text-white mt-1 font-display">{user?.courtJurisdiction || "Supreme Court of India & High Court"}</p>
          </div>
          <div>
            <span className="text-[#A47449] block uppercase tracking-wider font-mono font-bold text-[10px]">Specialization Field</span>
            <p className="font-bold text-white mt-1 font-display">{user?.specialization || "Corporate & Property Litigation"}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
