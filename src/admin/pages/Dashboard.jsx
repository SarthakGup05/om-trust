import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Clock,
  PhoneCall,
  CalendarCheck,
  CheckCircle2,
  Archive,
  RefreshCw,
  Loader2,
  HandHeart,
  MessageSquare,
  Heart,
  ChevronRight,
  Download,
  CheckCircle,
} from 'lucide-react';
import { apiGetDashboardStats, apiExportLeadsCsv } from '../services/api';

export const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportToast, setExportToast] = useState(null);

  const fetchStats = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await apiGetDashboardStats();
      if (res.success) {
        setStats(res.stats);
        setRecentLeads(res.recentLeads || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to load dashboard statistics.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCsv = async () => {
    setIsExporting(true);
    try {
      await apiExportLeadsCsv();
      setExportToast('Leads exported successfully as CSV!');
      setTimeout(() => setExportToast(null), 4000);
    } catch (err) {
      setError(err.message || 'Failed to export CSV.');
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'contacted':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'follow-up':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'resolved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'closed':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'volunteer':
        return 'bg-[#1F5D42]/10 text-[#1F5D42]';
      case 'contact':
        return 'bg-sky-100 text-sky-800';
      case 'support':
        return 'bg-[#D98B3A]/15 text-[#D98B3A]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1F5D42] tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#24332B]/70 mt-0.5">
            Real-time lead summary and website inquiry updates.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={handleExportCsv}
            disabled={isExporting || isLoading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1F5D42] text-white text-xs font-semibold hover:bg-[#164430] disabled:opacity-50 transition-all shadow-xs cursor-pointer"
            title="Download all leads as a CSV spreadsheet"
          >
            <Download className={`w-3.5 h-3.5 ${isExporting ? 'animate-bounce' : ''}`} />
            <span>{isExporting ? 'Exporting...' : 'Export CSV'}</span>
          </button>

          <button
            onClick={fetchStats}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-[#24332B] hover:bg-gray-50 transition-colors shadow-xs cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#1F5D42]' : ''}`} />
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      {exportToast && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{exportToast}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Primary Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Leads */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total</span>
            <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#24332B]">
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin text-gray-400" /> : stats?.total ?? 0}
          </div>
          <span className="text-[11px] text-gray-500 mt-1">All website leads</span>
        </div>

        {/* New Leads */}
        <div className="bg-white rounded-2xl p-4 border border-blue-200/80 shadow-xs flex flex-col justify-between bg-gradient-to-br from-white to-blue-50/40">
          <div className="flex items-center justify-between text-blue-600 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">New</span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-blue-700">
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin text-blue-400" /> : stats?.new ?? 0}
          </div>
          <span className="text-[11px] text-blue-600/80 mt-1">Needs attention</span>
        </div>

        {/* Contacted */}
        <div className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-amber-600 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Contacted</span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-amber-700">
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin text-amber-400" /> : stats?.contacted ?? 0}
          </div>
          <span className="text-[11px] text-amber-600/80 mt-1">First outreach done</span>
        </div>

        {/* Follow-up */}
        <div className="bg-white rounded-2xl p-4 border border-purple-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-purple-600 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Follow-up</span>
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-purple-700">
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin text-purple-400" /> : stats?.followUp ?? 0}
          </div>
          <span className="text-[11px] text-purple-600/80 mt-1">Scheduled call/chat</span>
        </div>

        {/* Resolved */}
        <div className="bg-white rounded-2xl p-4 border border-emerald-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-600 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Resolved</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-700">
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin text-emerald-400" /> : stats?.resolved ?? 0}
          </div>
          <span className="text-[11px] text-emerald-600/80 mt-1">Goal completed</span>
        </div>

        {/* Closed */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Closed</span>
            <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
              <Archive className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-700">
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin text-gray-400" /> : stats?.closed ?? 0}
          </div>
          <span className="text-[11px] text-gray-500 mt-1">Archived inquiry</span>
        </div>
      </div>

      {/* Secondary Row: Sources Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#1F5D42]/10 text-[#1F5D42] flex items-center justify-center shrink-0">
            <HandHeart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Volunteers
            </span>
            <div className="font-heading font-extrabold text-2xl text-[#1F5D42]">
              {isLoading ? '...' : stats?.volunteer ?? 0}
            </div>
            <p className="text-[11px] text-gray-500">Grassroots volunteers applied</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              General Inquiries
            </span>
            <div className="font-heading font-extrabold text-2xl text-sky-800">
              {isLoading ? '...' : stats?.contact ?? 0}
            </div>
            <p className="text-[11px] text-gray-500">Contact Us desk messages</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#D98B3A]/15 text-[#D98B3A] flex items-center justify-center shrink-0">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Support / Donors
            </span>
            <div className="font-heading font-extrabold text-2xl text-[#D98B3A]">
              {isLoading ? '...' : stats?.support ?? 0}
            </div>
            <p className="text-[11px] text-gray-500">Sponsorship inquiries</p>
          </div>
        </div>
      </div>

      {/* Recent Leads Table Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
          <div>
            <h2 className="font-heading font-bold text-lg text-[#24332B]">
              Recent Form Submissions
            </h2>
            <p className="text-xs text-[#24332B]/60">
              Latest inquiries submitted across the public website.
            </p>
          </div>

          <Link
            to="/admin/leads"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1F5D42] hover:text-[#164430] hover:underline"
          >
            <span>View All Leads</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-gray-500 text-sm flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-[#1F5D42]" />
            <span>Loading recent leads...</span>
          </div>
        ) : recentLeads.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm font-medium text-gray-500">No recent leads yet.</p>
            <p className="text-xs text-gray-400 mt-1">
              When visitors submit forms on your website, they will appear right here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-5 sm:mx-0">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-500">
                  <th className="py-3 px-4 font-bold">Name</th>
                  <th className="py-3 px-4 font-bold">Type</th>
                  <th className="py-3 px-4 font-bold">Phone</th>
                  <th className="py-3 px-4 font-bold">City</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold">Date</th>
                  <th className="py-3 px-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentLeads.map((lead) => (
                  <tr key={lead._id || lead.id} className="hover:bg-gray-50/75 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#24332B]">
                      {lead.name}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold capitalize ${getTypeBadge(lead.type)}`}>
                        {lead.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-gray-600">
                      {lead.phone}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {lead.city || '—'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border capitalize ${getStatusBadge(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <Link
                        to={`/admin/leads/${lead._id || lead.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#F1F6F1] hover:bg-[#1F5D42] text-[#1F5D42] hover:text-white text-xs font-semibold transition-colors"
                      >
                        <span>View</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
