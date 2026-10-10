import React from 'react';
import { Download, Video } from 'lucide-react';

export const CtaBanner: React.FC = () => {
  const APK_DOWNLOAD_URL = 'https://huggingface.co/chatmateofficial/chatmateapp/resolve/main/app-release.apk?download=true';

  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      
      <div className="max-w-5xl mx-auto px-4 relative z-10 text-center space-y-6 bg-gradient-to-tr from-rose-950/60 via-slate-900 to-slate-950 border border-slate-800 p-10 md:p-16 rounded-3xl shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 p-0.5 mx-auto shadow-xl shadow-rose-500/30">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Video className="w-8 h-8 text-rose-500 fill-rose-500/20" />
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading">
          Ready to Meet Someone New Today?
        </h2>

        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
          Join thousands of members chatting live on ChatMate right now.
        </p>

        <div>
          <a
            href={APK_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            download="app-release.apk"
            className="px-9 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 hover:from-rose-500 hover:to-pink-500 text-white font-extrabold text-base shadow-2xl shadow-rose-600/40 hover:scale-105 transition-all inline-flex items-center gap-3"
          >
            <Download className="w-5 h-5" />
            <span>Install ChatMate App</span>
          </a>
        </div>
      </div>

    </section>
  );
};
