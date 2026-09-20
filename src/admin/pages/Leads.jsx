import React, { useEffect, useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Phone,
  MessageSquare,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { apiGetLeads } from '../services/api';

export const Leads = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  const [activeType, setActiveType] = useState(searchParams.get('type') || 'all');
  const [activeStatus, setActiveStatus] = useState(searchParams.get('status') || 'all');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1', 10));

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
  });

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const res = await apiGetLeads({
        page,
        limit: 20,
        search: searchInput.trim(),
        type: activeType,
        status: activeStatus,
      });

      if (res.success) {
        setLeads(res.data);
        setPagination(res.pagination);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch leads.');
    } finally {
      setIsLoading(false);
    }
  }, [page, searchInput, activeType, activeStatus]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Sync state to URL search params
  const updateUrlParams = (newParams) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([k, v]) => {
      if (!v || v === 'all' || (k === 'page' && v === '1')) {
        next.delete(k);
      } else {
        next.set(k, v);
      }
    });
    setSearchParams(next);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    updateUrlParams({ search: searchInput, page: '1' });
  };

  const handleTypeChange = (type) => {
    setActiveType(type);
    setPage(1);
    updateUrlParams({ type, page: '1' });
  };

  const handleStatusChange = (status) => {
    setActiveStatus(status);
    setPage(1);
    updateUrlParams({ status, page: '1' });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPage(newPage);
      updateUrlParams({ page: newPage.toString() });
    }
  };

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

  const cleanPhoneForWhatsApp = (rawPhone) => {
    const digits = (rawPhone || '').replace(/\D/g, '');
    if (digits.length === 10) return `91${digits}`;
    return digits;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1F5D42] tracking-tight">
            Leads Directory
          </h1>
          <p className="text-xs sm:text-sm text-[#24332B]/70 mt-0.5">
            Total {pagination.total} inquiry {pagination.total === 1 ? 'record' : 'records'} logged from the website.
          </p>
        </div>

        <button
          onClick={fetchLeads}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-[#24332B] hover:bg-gray-50 transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#1F5D42]' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-200/80 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by name, phone, email, or city..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-24 py-2.5 rounded-2xl bg-[#F8F9FA] border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5D42] focus:bg-white text-[#24332B]"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 rounded-xl bg-[#1F5D42] text-white text-xs font-semibold hover:bg-[#164430] transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Status Dropdown Filter */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Status:</span>
            </div>
            <select
              value={activeStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#F8F9FA] border border-gray-200 text-xs font-semibold text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#1F5D42] cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="follow-up">Follow-up</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Lead Type Quick Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
          <span className="text-gray-400 text-[11px] uppercase tracking-wider font-bold mr-1">
            Type:
          </span>
          {[
            { id: 'all', label: 'All Sources' },
            { id: 'volunteer', label: 'Volunteers' },
            { id: 'contact', label: 'Contact Us' },
            { id: 'support', label: 'Support / Donors' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleTypeChange(item.id)}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeType === item.id
                  ? 'bg-[#1F5D42] text-white shadow-xs font-bold'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Leads Table */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-20 text-center text-gray-500 text-sm flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#1F5D42]" />
            <span>Loading leads records...</span>
          </div>
        ) : leads.length === 0 ? (
          <div className="py-20 text-center px-4">
            <p className="text-base font-bold text-gray-700">
              {searchInput || activeType !== 'all' || activeStatus !== 'all'
                ? 'No leads found matching your search or filters.'
                : 'No leads yet.'}
            </p>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              {searchInput || activeType !== 'all' || activeStatus !== 'all'
                ? 'Try adjusting your search keywords or clearing active filters.'
                : 'Website inquiries will appear here automatically as soon as users submit forms.'}
            </p>
            {(searchInput || activeType !== 'all' || activeStatus !== 'all') && (
              <button
                onClick={() => {
                  setSearchInput('');
                  setActiveType('all');
                  setActiveStatus('all');
                  setPage(1);
                  setSearchParams(new URLSearchParams());
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-[#F1F6F1] text-[#1F5D42] text-xs font-semibold hover:bg-[#1F5D42] hover:text-white transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-50/75 border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-500">
                  <th className="py-3.5 px-4 font-bold">Name</th>
                  <th className="py-3.5 px-4 font-bold">Type</th>
                  <th className="py-3.5 px-4 font-bold">Phone</th>
                  <th className="py-3.5 px-4 font-bold">City</th>
                  <th className="py-3.5 px-4 font-bold">Interest / Category</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold">Date</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => (
                  <tr key={lead._id || lead.id} className="hover:bg-gray-50/75 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#24332B]">
                      <Link
                        to={`/admin/leads/${lead._id || lead.id}`}
                        className="hover:text-[#1F5D42] hover:underline"
                      >
                        {lead.name}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold capitalize ${getTypeBadge(lead.type)}`}>
                        {lead.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-gray-700 whitespace-nowrap">
                      {lead.phone}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">
                      {lead.city || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-gray-600 max-w-[200px] truncate">
                      {lead.interest || '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border capitalize ${getStatusBadge(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <a
                          href={`https://wa.me/${cleanPhoneForWhatsApp(lead.phone)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Chat on WhatsApp"
                          className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>
                        <a
                          href={`tel:${(lead.phone || '').replace(/\s+/g, '')}`}
                          title="Call Phone"
                          className="p-1.5 rounded-lg text-[#1F5D42] hover:bg-[#F1F6F1] transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                        <Link
                          to={`/admin/leads/${lead._id || lead.id}`}
                          title="View Details"
                          className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {pagination.totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
            <div>
              Showing page <span className="font-bold text-gray-900">{pagination.page}</span> of{' '}
              <span className="font-bold text-gray-900">{pagination.totalPages}</span> ({pagination.total} total leads)
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-3 py-1 font-semibold text-gray-800">
                {pagination.page}
              </span>

              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
