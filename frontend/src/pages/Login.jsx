import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Scale, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { Input } from "../components/common/Input";
import { useAuth } from "../context/AuthContext";
import { useCase } from "../context/CaseContext";

export const Login = () => {
  const { login } = useAuth();
  const { addToast } = useCase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("rajesh.sharma@lexintel.law");
  const [password, setPassword] = useState("password123");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        addToast(`Welcome back, ${res.data.user.name}!`, "success");
        navigate("/dashboard");
      }
    } catch (err) {
      addToast("Invalid credentials", "danger");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword("password123");
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
          <h2 className="text-xl font-bold text-white font-serif">Sign in to Case Desk</h2>
          <p className="text-xs text-stone-400">Access your legal intelligence workspace</p>
        </div>

        <Card className="p-6 sm:p-8 space-y-5 border-[#A47449]/35 bg-[#1C1815]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Work Email Address"
              type="email"
              placeholder="lawyer@lexintel.law"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••••••"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-xs font-mono">
              <label className="flex items-center gap-2 text-stone-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-[#13100E] border-[#A47449]/40 text-[#A47449] focus:ring-[#A47449]"
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-[#A47449] hover:text-[#C08B5C] font-bold">Forgot password?</a>
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="md"
              loading={loading}
              icon={ArrowRight}
              className="w-full"
            >
              Sign In to Case Desk
            </Button>
          </form>

          {/* Quick Demo Preset Buttons */}
          <div className="pt-4 border-t border-[#A47449]/20 space-y-2">
            <span className="text-[10px] uppercase font-mono font-bold text-[#A47449] tracking-wider block text-center">
              Quick Demo Persona Preset
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickLogin("rajesh.sharma@lexintel.law")}
                className="p-2.5 rounded-xl bg-[#13100E] border border-[#A47449]/25 hover:border-[#A47449] text-left transition-all"
              >
                <span className="font-bold text-white block truncate font-display">Adv. Rajesh Sharma</span>
                <span className="text-[10px] text-[#A47449] font-mono block">Senior Advocate</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("ananya.roy@jurisconsult.com")}
                className="p-2.5 rounded-xl bg-[#13100E] border border-[#A47449]/25 hover:border-[#A47449] text-left transition-all"
              >
                <span className="font-bold text-white block truncate font-display">Dr. Ananya Roy</span>
                <span className="text-[10px] text-[#A47449] font-mono block">Legal Researcher</span>
              </button>
            </div>
          </div>
        </Card>

        <p className="text-center text-xs text-stone-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#A47449] hover:text-[#C08B5C] font-bold">
            Register New Counsel Account
          </Link>
        </p>
      </div>
    </div>
  );
};
