import React from 'react';
import { Download, Shield, Globe, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const APK_DOWNLOAD_URL = 'https://huggingface.co/chatmateofficial/chatmateapp/resolve/main/app-release.apk?download=true';

  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 bg-slate-950">
      
      {/* Ambient Background Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Live Online Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-emerald-400 font-bold font-mono">15,420 Users Online</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Live Matchmaking</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-normal font-heading">
            Connect Instantly with People <span className="inline-block bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent pr-2 pb-1">Globally</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg md:text-xl leading-relaxed font-normal max-w-2xl mx-auto">
            Experience 1-on-1 random video calls, instant text chat, and social dating discovery with ChatMate.
          </p>

          {/* Pure HTML Direct Link Button */}
          <div className="flex justify-center pt-2">
            <a
              href={APK_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              download="app-release.apk"
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 hover:from-rose-500 hover:to-pink-500 text-white font-extrabold text-base sm:text-lg shadow-2xl shadow-rose-600/40 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              <Download className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Install App Now</span>
            </a>
          </div>

          {/* Symmetrical Responsive Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 max-w-2xl mx-auto pt-2 text-xs text-slate-300 font-medium">
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-900/80 border border-slate-800/80 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="whitespace-nowrap">Direct Installation</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-900/80 border border-slate-800/80 shadow-sm">
              <Shield className="w-4 h-4 text-sky-400 shrink-0" />
              <span className="whitespace-nowrap">Verified Profiles</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-900/80 border border-slate-800/80 shadow-sm">
              <Globe className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="whitespace-nowrap">Global Matchmaking</span>
            </div>
          </div>

        </div>

        {/* Clean App Preview Container */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900/90 border border-slate-800 p-3 sm:p-4 shadow-2xl space-y-3">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 px-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span className="text-xs font-mono text-slate-400 ml-2">ChatMate Live</span>
            </div>
            <span className="text-xs font-bold text-rose-400 font-mono">Live Preview</span>
          </div>

          {/* Clean Single Video Stream Screen Showcase */}
          <div className="relative h-72 sm:h-96 rounded-2xl bg-slate-950 overflow-hidden border border-slate-800 flex flex-col justify-between p-4">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200"
              alt="ChatMate App Interface"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none"></div>

            {/* Overlay */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs text-white font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                <span>Ananya, 23 (Mumbai)</span>
              </div>

              <div className="w-20 h-28 sm:w-28 sm:h-36 rounded-xl bg-slate-900 border-2 border-slate-700/80 overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400"
                  alt="You"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <span className="font-bold text-rose-400">Ananya:</span>
                <span>"Hey! Love music too! What genre do you like?"</span>
              </div>
              <a
                href={APK_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                download="app-release.apk"
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shrink-0"
              >
                Install App ⚡
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
