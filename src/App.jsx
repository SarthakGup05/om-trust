import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import FloatingUtilities from './components/FloatingUtilities';

import { AuthProvider } from './admin/context/AuthContext';
import { ProtectedRoute } from './admin/components/ProtectedRoute';
import { Layout } from './admin/components/Layout';
import { Login } from './admin/pages/Login';
import { Dashboard } from './admin/pages/Dashboard';
import { Leads } from './admin/pages/Leads';
import { LeadDetail } from './admin/pages/LeadDetail';

// Public Website Layout Component
function PublicWebsite() {
  return (
    <div className="min-h-screen bg-[#FFF9F0] text-[#24332B] font-body flex flex-col relative">
      {/* Sticky Top Navigation Bar */}
      <Navbar />

      {/* Main One-Page Content */}
      <main className="flex-1">
        <Home />
      </main>

      {/* Structured Footer */}
      <Footer />

      {/* Floating Circular Utility Buttons (Scroll to Top, Call, WhatsApp) */}
      <FloatingUtilities />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<PublicWebsite />} />

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<Login />} />

          {/* Admin CRM Workspace (Protected) */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="leads" element={<Leads />} />
              <Route path="leads/:id" element={<LeadDetail />} />
            </Route>
          </Route>

          {/* Fallback to Public Website for undefined routes */}
          <Route path="*" element={<PublicWebsite />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
