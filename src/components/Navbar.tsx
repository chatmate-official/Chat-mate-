import React from 'react';
import { Video, Download } from 'lucide-react';

interface NavbarProps {
  onInstallApp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onInstallApp }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 text-left group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 p-0.5 shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Video className="w-5 h-5 text-rose-500 fill-rose-500/20" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent font-heading whitespace-nowrap">
              ChatMate
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors whitespace-nowrap">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors whitespace-nowrap">How It Works</a>
          <a href="#safety" className="hover:text-white transition-colors whitespace-nowrap">Safety</a>
          <a href="#faq" className="hover:text-white transition-colors whitespace-nowrap">FAQ</a>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onInstallApp}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>Install App</span>
          </button>
        </div>

      </div>
    </header>
  );
};
