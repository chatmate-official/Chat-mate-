import React from 'react';
import { Download, Smartphone, X } from 'lucide-react';

interface InstallPwaBannerProps {
  onInstall: () => void;
  onDismiss: () => void;
}

export const InstallPwaBanner: React.FC<InstallPwaBannerProps> = ({ onInstall, onDismiss }) => {
  return (
    <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-slate-950 border-b border-rose-500/30 px-4 py-2.5 flex items-center justify-between text-xs text-slate-200">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-rose-500 text-white flex items-center justify-center font-bold">
          <Smartphone className="w-4 h-4" />
        </div>
        <div>
          <span className="font-bold text-white">ChatMate Web App</span>
          <span className="hidden sm:inline text-slate-300 ml-1.5">— Install directly on your home screen with zero app store download needed!</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onInstall}
          className="px-3 py-1 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-bold transition-colors shrink-0 flex items-center gap-1"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install Now</span>
        </button>
        <button
          onClick={onDismiss}
          className="p-1 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
