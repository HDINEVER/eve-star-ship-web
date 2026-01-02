import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Download, Headset, RefreshCw, ChevronRight } from 'lucide-react';

const NavItem = ({ to, icon: Icon, children }: { to: string; icon: any; children: React.ReactNode }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-2 px-4 py-2 font-orbitron text-sm uppercase tracking-widest transition-all duration-300 border-b-2
      ${isActive 
        ? 'border-cyan-400 text-cyan-400 bg-cyan-900/20 shadow-[0_0_15px_rgba(34,211,238,0.4)]' 
        : 'border-transparent text-gray-400 hover:text-white hover:border-white/30'
      }`
    }
  >
    <Icon size={16} />
    {children}
  </NavLink>
);

export const Layout: React.FC = () => {
  const location = useLocation();

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-rajdhani overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-100">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center h-20 bg-black/60 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-2 md:gap-8">
          <NavItem to="/" icon={Home}>Nexus</NavItem>
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2 px-4 py-2 font-orbitron text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-colors cursor-not-allowed opacity-50">
            <Download size={16} /> Download
          </a>
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2 px-4 py-2 font-orbitron text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-colors cursor-not-allowed opacity-50">
            <Headset size={16} /> Comms
          </a>
          <button onClick={handleReload} className="flex items-center gap-2 px-4 py-2 font-orbitron text-sm uppercase tracking-widest text-gray-400 hover:text-red-400 transition-colors">
            <RefreshCw size={16} /> Reset
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-24 min-h-screen flex flex-col">
         {/* Animated Breadcrumb Mockup */}
        <div className="container mx-auto px-6 mb-4 flex items-center text-xs text-gray-500 font-orbitron tracking-widest opacity-60">
            <span>SYSTEM</span>
            <ChevronRight size={12} />
            <span>{location.pathname === '/' ? 'ROOT' : location.pathname.split('/')[1].toUpperCase()}</span>
            {location.pathname.split('/').length > 2 && (
                <>
                    <ChevronRight size={12} />
                    <span>{location.pathname.split('/')[2].toUpperCase()}</span>
                </>
            )}
        </div>

        <Outlet />
      </main>

      {/* Footer Decoration */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black to-transparent z-40 pointer-events-none flex justify-between px-8 items-end pb-2 text-[10px] text-gray-600 font-orbitron">
        <span>CONCORD // SECURE CONNECTION</span>
        <span>VERSION 2.4.1 // YC 125</span>
      </div>
    </div>
  );
};