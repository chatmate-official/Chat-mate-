import React from 'react';
import { Video } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12 px-4 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 to-amber-400 p-0.5">
            <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
              <Video className="w-4 h-4 text-rose-500" />
            </div>
          </div>
          <span className="text-base font-extrabold text-white font-heading">ChatMate</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#safety" className="hover:text-white transition-colors">Safety</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>

        {/* Copyright */}
        <p className="text-slate-500 font-mono">
          © 2026 ChatMate. All rights reserved.
        </p>

      </div>
    </footer>
  );
};
