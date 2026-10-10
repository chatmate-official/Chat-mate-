import React from 'react';
import { MousePointer, Sliders, Zap, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onLaunchApp: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onLaunchApp }) => {
  const steps = [
    {
      num: '01',
      icon: <MousePointer className="w-6 h-6 text-rose-500" />,
      title: 'Install ChatMate',
      desc: 'Quick and easy setup. Install directly on phone or PC to get started.',
    },
    {
      num: '02',
      icon: <Sliders className="w-6 h-6 text-amber-400" />,
      title: 'Set Your Preferences',
      desc: 'Pick your preferred gender, age range, location, and conversation topic like Music, Movies, or Travel.',
    },
    {
      num: '03',
      icon: <Zap className="w-6 h-6 text-emerald-400" />,
      title: 'Start 1-on-1 Matching',
      desc: 'Click "Start Video Match" or "Text Chat" to meet someone new in seconds. Skip anytime with 1 click.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-900/50 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
            3 Simple Steps
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            How ChatMate Works
          </h2>
          <p className="text-sm text-slate-400">
            Start meeting people online in less than 10 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  {step.icon}
                </div>
                <span className="text-3xl font-extrabold font-mono text-slate-700">{step.num}</span>
              </div>

              <h3 className="text-xl font-bold text-white font-heading">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={onLaunchApp}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-sm shadow-xl shadow-rose-600/30 hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <span>Install ChatMate</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
