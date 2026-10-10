import React, { useState } from 'react';
import { Shield, Lock, AlertTriangle, EyeOff, CheckCircle2, UserX } from 'lucide-react';

export const SafetyHub: React.FC = () => {
  const [blurExplicit, setBlurExplicit] = useState(true);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportText, setReportText] = useState('');

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText.trim()) return;
    setReportSubmitted(true);
    setReportText('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      
      {/* Title */}
      <div className="space-y-1 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Shield className="w-4 h-4" />
          <span>ChatMate Safe Space</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
          Community Safety & Trust Guidelines
        </h1>
        <p className="text-xs text-slate-400">
          ChatMate is committed to maintaining a respectful, secure, and harassment-free environment for everyone.
        </p>
      </div>

      {/* Safety Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Privacy & Media Protection */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20">
              <EyeOff className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Smart Media Protection</h2>
              <p className="text-xs text-slate-400">AI content moderation filter</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Automatically detect and blur explicit or unverified media content before it appears on your screen during video calls or random chat sessions.
          </p>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div>
              <p className="text-xs font-bold text-white">Blur Sensitive Content</p>
              <p className="text-[11px] text-slate-400">Recommended for all members</p>
            </div>
            <input
              type="checkbox"
              checked={blurExplicit}
              onChange={(e) => setBlurExplicit(e.target.checked)}
              className="w-5 h-5 accent-rose-500 rounded"
            />
          </div>
        </div>

        {/* Verification */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Verified Profiles Only</h2>
              <p className="text-xs text-slate-400">Anti-fake profile detection</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            All users can complete a quick facial camera verification check to receive a blue verification badge and priority matching status.
          </p>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-sky-400">Status: Verified Member</span>
            <span className="text-[11px] text-emerald-400 font-mono">100% Protected</span>
          </div>
        </div>

      </div>

      {/* Community Rules */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-white font-heading">Core Safety Principles</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
            <h3 className="text-xs font-bold text-rose-400">1. Mutual Respect</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No hate speech, offensive language, or harassment. Treat everyone with dignity.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
            <h3 className="text-xs font-bold text-amber-400">2. Protect Privacy</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Never share personal sensitive data (bank info, passwords, private home address).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
            <h3 className="text-xs font-bold text-emerald-400">3. One-Click Reporting</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instantly skip, block, or report any inappropriate user at any moment.
            </p>
          </div>
        </div>
      </div>

      {/* Report Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white font-heading">Submit Safety Report</h2>
        </div>

        {reportSubmitted ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            Thank you! Your safety report has been logged and sent to ChatMate Trust & Safety moderators.
          </div>
        ) : (
          <form onSubmit={handleReport} className="space-y-3">
            <textarea
              rows={3}
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              placeholder="Describe any issue or report a user..."
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-2xl p-3.5 focus:outline-none focus:border-rose-500"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Submit Confidential Report
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
