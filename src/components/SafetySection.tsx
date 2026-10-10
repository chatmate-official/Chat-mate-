import React from 'react';
import { Shield, EyeOff, CheckCircle2, Lock } from 'lucide-react';

export const SafetySection: React.FC = () => {
  return (
    <section id="safety" className="py-20 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">
            Safety First
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Your Privacy & Safety Are Guaranteed
          </h2>
          <p className="text-sm text-slate-400">
            We enforce strict community standards to maintain a pleasant experience for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-500 w-fit">
              <EyeOff className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-heading">Smart Sensitive Media Blur</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Automatic real-time content detection blurs inappropriate media before it reaches your screen. You have full control over what you view.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-400 w-fit">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-heading">Verified Badges & Anti-Bot</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Real human verification ensures you talk to genuine members rather than fake accounts or spam bots.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
