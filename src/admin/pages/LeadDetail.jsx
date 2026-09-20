import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  Mail,
  Clock,
  Calendar,
  Trash2,
  Save,
  CheckCircle,
  Loader2,
  AlertTriangle,
  HeartHandshake,
  FileText,
} from 'lucide-react';
import {
  apiGetLeadById,
  apiUpdateLead,
  apiDeleteLead,
} from '../services/api';

export const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [relatedLeads, setRelatedLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Status & Notes editable state
  const [selectedStatus, setSelectedStatus] = useState('new');
  const [notes, setNotes] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notification, setNotification] = useState(null);

  // Delete modal confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      setIsLoading(true);
      setError('');
      try {
        const res = await apiGetLeadById(id);
        if (res.success && res.lead) {
          setLead(res.lead);
          setSelectedStatus(res.lead.status);
          setNotes(res.lead.notes || '');
          setRelatedLeads(res.relatedLeads || []);
        }
      } catch (err) {
        setError(err.message || 'Failed to load lead details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleStatusChange = async (newStatus) => {
    if (!id || newStatus === lead?.status) return;

    setIsUpdatingStatus(true);
    try {
      const res = await apiUpdateLead(id, { status: newStatus });
      if (res.success) {
        setLead(res.lead);
        setSelectedStatus(res.lead.status);
        showToast(`Lead status updated to "${newStatus}".`);
      }
    } catch (err) {
      showToast(err.message || 'Failed to update status', 'error');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!id) return;

    setIsSavingNotes(true);
    try {
      const res = await apiUpdateLead(id, { notes });
      if (res.success) {
        setLead(res.lead);
        showToast('Internal CRM notes saved.');
      }
    } catch (err) {
      showToast(err.message || 'Failed to save notes', 'error');
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleDeleteLead = async () => {
    if (!id) return;

    setIsDeleting(true);
    try {
      await apiDeleteLead(id);
      navigate('/admin/leads', { replace: true });
    } catch (err) {
      showToast(err.message || 'Failed to delete lead', 'error');
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const cleanPhoneForWhatsApp = (rawPhone) => {
    const digits = (rawPhone || '').replace(/\D/g, '');
    if (digits.length === 10) return `91${digits}`;
    return digits;
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

  if (isLoading) {
    return (
      <div className="py-24 text-center flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#1F5D42]" />
        <p className="text-sm font-medium text-gray-600">Loading lead details...</p>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-red-200 text-center max-w-lg mx-auto space-y-4 my-12">
        <AlertTriangle className="w-10 h-10 text-red-500 mx-auto" />
        <h2 className="font-heading font-bold text-lg text-gray-800">
          {error || 'Lead not found'}
        </h2>
        <p className="text-xs text-gray-500">
          The lead record you requested may have been deleted or the ID is invalid.
        </p>
        <Link
          to="/admin/leads"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1F5D42] text-white text-xs font-semibold hover:bg-[#164430] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Leads</span>
        </Link>
      </div>
    );
  }

  const cleanedPhone = (lead.phone || '').replace(/\s+/g, '');
  const waNumber = cleanPhoneForWhatsApp(lead.phone);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl shadow-lg border flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-300 ${
            notification.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Top Navigation & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/leads')}
            className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer"
            aria-label="Back to leads"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1F5D42] tracking-tight">
                {lead.name}
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize border ${getStatusBadge(lead.status)}`}>
                {lead.status}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Inquiry Source:{' '}
              <strong className="capitalize text-[#1F5D42] font-semibold">{lead.type}</strong>
            </p>
          </div>
        </div>

        {/* Delete Lead Button */}
        <button
          onClick={() => setShowDeleteModal(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete Lead</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Contact Profile & Message Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Contact Information Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-xs">
            <h2 className="font-heading font-bold text-base text-[#24332B] mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#D98B3A]" />
              <span>Contact Profile</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Full Name
                </span>
                <span className="font-heading font-bold text-sm text-[#24332B]">
                  {lead.name}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Phone Number
                </span>
                <span className="font-mono font-bold text-sm text-[#1F5D42]">
                  {lead.phone}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Email Address
                </span>
                <span className="text-xs text-gray-700 font-medium">
                  {lead.email || 'Not provided'}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  City / Location
                </span>
                <span className="text-xs text-gray-700 font-medium">
                  {lead.city || 'Not provided'}
                </span>
              </div>
            </div>

            {/* Direct Outreach Action Buttons */}
            <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <a
                href={`tel:${cleanedPhone}`}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1F5D42] text-white text-xs font-semibold hover:bg-[#164430] transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Phone</span>
              </a>

              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                  `Namaste ${lead.name}, greetings from Om Charitable Trust regarding your website inquiry.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba5a] transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Chat</span>
              </a>

              {lead.email ? (
                <a
                  href={`mailto:${lead.email}?subject=${encodeURIComponent(
                    'Om Charitable Trust — Regarding Your Inquiry'
                  )}`}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800 text-white text-xs font-semibold hover:bg-black transition-colors shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </a>
              ) : (
                <button
                  disabled
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 text-gray-400 text-xs font-semibold cursor-not-allowed"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>No Email Listed</span>
                </button>
              )}
            </div>
          </div>

          {/* Inquiry Message & Details Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-4">
            <h2 className="font-heading font-bold text-base text-[#24332B] pb-3 border-b border-gray-100 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#1F5D42]" />
              <span>Inquiry Details</span>
            </h2>

            {lead.interest && (
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Area of Interest / Support Category
                </span>
                <div className="p-3 rounded-xl bg-[#FFF9F0] border border-[#1F5D42]/10 text-xs font-semibold text-[#1F5D42]">
                  {lead.interest}
                </div>
              </div>
            )}

            <div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Submitted Message / Remarks
              </span>
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-xs sm:text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                {lead.message || 'No additional message provided.'}
              </div>
            </div>
          </div>

          {/* Internal Notes Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
              <div>
                <h2 className="font-heading font-bold text-base text-[#24332B]">
                  Admin Follow-up Notes
                </h2>
                <p className="text-xs text-gray-500">
                  Private CRM notes for call summaries, volunteer coordination, etc.
                </p>
              </div>

              <button
                onClick={handleSaveNotes}
                disabled={isSavingNotes}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1F5D42] text-white text-xs font-semibold hover:bg-[#164430] disabled:opacity-75 transition-colors cursor-pointer"
              >
                {isSavingNotes ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                <span>Save Notes</span>
              </button>
            </div>

            <textarea
              rows={4}
              placeholder="e.g. Called volunteer on Monday. Available for food distribution drives in Gomti Nagar on weekends..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-[#F8F9FA] border border-gray-200 text-xs sm:text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#1F5D42] focus:bg-white resize-none"
            />
          </div>
        </div>

        {/* Right Column: Status Management & Metadata */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status Changer Card */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs">
            <h2 className="font-heading font-bold text-sm text-[#24332B] mb-3 pb-2 border-b border-gray-100 flex items-center justify-between">
              <span>Lead Status</span>
              {isUpdatingStatus && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#1F5D42]" />}
            </h2>

            <div className="space-y-2">
              {['new', 'contacted', 'follow-up', 'resolved', 'closed'].map((st) => (
                <button
                  key={st}
                  onClick={() => handleStatusChange(st)}
                  disabled={isUpdatingStatus}
                  className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold capitalize border transition-all flex items-center justify-between cursor-pointer ${
                    selectedStatus === st
                      ? `${getStatusBadge(st)} font-bold ring-2 ring-offset-1 ring-[#1F5D42]/30`
                      : 'bg-gray-50/70 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>{st}</span>
                  {selectedStatus === st && <CheckCircle className="w-3.5 h-3.5 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Audit & Timestamps Card */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs space-y-3">
            <h2 className="font-heading font-bold text-sm text-[#24332B] pb-2 border-b border-gray-100">
              Activity Timestamps
            </h2>

            <div className="flex items-start gap-2.5 text-xs text-gray-600">
              <Calendar className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-gray-700 block">Submitted At</span>
                <span>
                  {new Date(lead.createdAt).toLocaleString('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
              <Clock className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-gray-700 block">Last Updated</span>
                <span>
                  {new Date(lead.updatedAt).toLocaleString('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Related Inquiries from Same Contact */}
          {relatedLeads.length > 0 && (
            <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs space-y-3">
              <h2 className="font-heading font-bold text-sm text-[#24332B] pb-2 border-b border-gray-100">
                Other Inquiries by Contact
              </h2>
              <div className="space-y-2">
                {relatedLeads.map((rel) => (
                  <Link
                    key={rel._id || rel.id}
                    to={`/admin/leads/${rel._id || rel.id}`}
                    className="block p-2.5 rounded-xl bg-gray-50 hover:bg-[#F1F6F1] transition-colors text-xs"
                  >
                    <div className="flex items-center justify-between font-semibold">
                      <span className="capitalize text-[#1F5D42]">{rel.type}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] capitalize border ${getStatusBadge(rel.status)}`}>
                        {rel.status}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500 mt-1 block">
                      {new Date(rel.createdAt).toLocaleDateString('en-IN')}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="font-heading font-bold text-lg text-gray-900">
                Delete Lead Confirmation
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Are you sure you want to delete the inquiry for <strong>{lead.name}</strong>? This action cannot be undone.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteLead}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isDeleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <span>Yes, Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
