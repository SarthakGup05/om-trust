import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, HeartHandshake, X, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', end: true, icon: LayoutDashboard },
    { name: 'Leads', path: '/admin/leads', end: false, icon: Users },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#1F5D42] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#D98B3A] shadow-inner">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-heading font-extrabold text-base tracking-tight leading-tight">
                  Om Charitable Trust
                </h1>
                <span className="text-[11px] font-semibold text-[#F5C284] tracking-wide uppercase">
                  Lead CRM
                </span>
              </div>
            </Link>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 md:hidden"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-white text-[#1F5D42] shadow-sm font-bold'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}

            {/* Link back to public website */}
            <div className="pt-4 border-t border-white/10 mt-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <span>View Public Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </nav>
        </div>

        {/* Footer Admin Profile & Logout */}
        <div className="p-4 border-t border-white/10 bg-[#164430]/60">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="truncate pr-2">
              <p className="text-xs font-semibold text-white truncate">
                {admin?.name || 'Administrator'}
              </p>
              <p className="text-[11px] text-white/60 truncate">
                {admin?.email || 'admin@omtrust.org'}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-red-500/20 hover:text-red-200 text-white/90 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
