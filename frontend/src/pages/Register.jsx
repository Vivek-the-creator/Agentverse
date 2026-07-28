import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Scale, Mail, Lock, User, ArrowRight, Award } from "lucide-react";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { Input } from "../components/common/Input";
import { useAuth } from "../context/AuthContext";
import { useCase } from "../context/CaseContext";

export const Register = () => {
  const { register } = useAuth();
  const { addToast } = useCase();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    barNumber: "",
    role: "Senior Legal Advocate",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await register(formData);
      if (res.success) {
        addToast("Account registered! Welcome to LexIntel Case Desk.", "success");
        navigate("/dashboard");
      }
    } catch (err) {
      addToast("Registration failed", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0A09] text-[#F7F4F0] flex items-center justify-center p-4 relative overflow-hidden bg-grid">
      <div className="w-full max-w-md relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C08B5C] via-[#A47449] to-[#7E5531] flex items-center justify-center shadow-lg shadow-[#A47449]/20 border border-[#E6CBB3]/30">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-2xl text-white tracking-tight font-serif">LexIntel <span className="text-[#A47449]">AI</span></span>
          </Link>
          <h2 className="text-xl font-bold text-white font-serif">Create Advocate Workspace</h2>
          <p className="text-xs text-stone-400">Set up a refined workspace for legal matter preparation</p>
        </div>

        <Card className="p-6 sm:p-8 space-y-4 border-[#A47449]/35 bg-[#1C1815]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name & Title"
              placeholder="Adv. Rajesh Sharma"
              icon={User}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="Work Email Address"
              type="email"
              placeholder="counsel@lexintel.law"
              icon={Mail}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Bar Council Enrollment No."
              placeholder="MAH/4921/2012"
              icon={Award}
              value={formData.barNumber}
              onChange={(e) => setFormData({ ...formData, barNumber: e.target.value })}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••••••"
              icon={Lock}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <Button
              type="submit"
              variant="gradient"
              size="md"
              loading={loading}
              icon={ArrowRight}
              className="w-full mt-2"
            >
              Create Account
            </Button>
          </form>
        </Card>

        <p className="text-center text-xs text-stone-400">
          Already registered?{" "}
          <Link to="/login" className="text-[#A47449] hover:text-[#C08B5C] font-bold">
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
};
