import React from 'react';
import { Menu, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Header = ({ onOpenSidebar }) => {
  const { admin } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-gray-200/80 px-4 sm:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="p-2 -ml-2 rounded-xl text-gray-600 hover:bg-gray-100 md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Om Charitable Trust Lead CRM
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F6F1] border border-[#1F5D42]/15 text-[#1F5D42] text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D98B3A]" />
          <span>Admin Portal</span>
        </div>

        <div className="w-8 h-8 rounded-full bg-[#1F5D42] text-white flex items-center justify-center text-xs font-bold font-heading shadow-xs">
          {admin?.name ? admin.name.charAt(0).toUpperCase() : 'A'}
        </div>
      </div>
    </header>
  );
};
