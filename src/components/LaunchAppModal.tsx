import React, { useState } from 'react';
import { Download, Check, X, ShieldCheck, Smartphone, FolderCheck } from 'lucide-react';

interface LaunchAppModalProps {
  onClose: () => void;
  customApkUrl: string;
  setCustomApkUrl: (url: string) => void;
}

export const LaunchAppModal: React.FC<LaunchAppModalProps> = ({
  onClose,
  customApkUrl,
  setCustomApkUrl,
}) => {
  const [downloadStarted, setDownloadStarted] = useState(false);

  const handleTriggerDownload = () => {
    setDownloadStarted(true);

    const downloadUrl = customApkUrl || '/ChatMate.apk';
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'ChatMate.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloadStarted(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-6 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 p-0.5 mx-auto shadow-xl shadow-rose-500/30">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Smartphone className="w-8 h-8 text-rose-500" />
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-2xl font-extrabold text-white font-heading">Download ChatMate APK</h3>
          <p className="text-xs text-slate-300">Direct GitHub Repository APK Hosting</p>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3 text-left">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Virus-Free & Verified APK</span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300">
            <p>
              Clicking below downloads <strong className="text-white">ChatMate.apk</strong> directly from your GitHub repository folder (`public/ChatMate.apk`).
            </p>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-emerald-400 flex items-center gap-2">
              <FolderCheck className="w-4 h-4 shrink-0" />
              <span>Hosting Location: `/public/ChatMate.apk`</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={handleTriggerDownload}
            className="w-full py-4 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 text-white font-extrabold rounded-2xl shadow-xl shadow-rose-600/30 text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
          >
            <Download className="w-5 h-5" />
            <span>{downloadStarted ? 'Downloading APK...' : 'Download ChatMate APK'}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-2xl text-xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
