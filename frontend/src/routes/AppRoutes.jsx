import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Pages
import { LandingPage } from "../pages/LandingPage";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Dashboard } from "../pages/Dashboard";
import { UploadCase } from "../pages/UploadCase";
import { Processing } from "../pages/Processing";
import { Results } from "../pages/Results";
import { Reports } from "../pages/Reports";
import { Profile } from "../pages/Profile";
import { Settings } from "../pages/Settings";
import { NotFound } from "../pages/NotFound";

// Layout
import { Sidebar } from "../components/layout/Sidebar";
import { Header } from "../components/layout/Header";
import { ToastContainer } from "../components/common/Toast";

const ProtectedLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#0B0A09] bg-grid text-[#F7F4F0]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
      <Route path="/upload" element={<ProtectedLayout><UploadCase /></ProtectedLayout>} />
      <Route path="/processing" element={<ProtectedLayout><Processing /></ProtectedLayout>} />
      <Route path="/results" element={<ProtectedLayout><Results /></ProtectedLayout>} />
      <Route path="/reports" element={<ProtectedLayout><Reports /></ProtectedLayout>} />
      <Route path="/profile" element={<ProtectedLayout><Profile /></ProtectedLayout>} />
      <Route path="/settings" element={<ProtectedLayout><Settings /></ProtectedLayout>} />

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
