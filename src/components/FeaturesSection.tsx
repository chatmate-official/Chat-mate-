import React from 'react';
import { Video, MessageSquare, Globe, Shield, Smartphone, Sparkles } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Video className="w-6 h-6 text-rose-500" />,
      title: '1-on-1 HD Video Calling',
      description: 'Connect instantly with verified members across the world in crystal clear HD video calls with face filters and instant re-matching.',
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-amber-400" />,
      title: 'Anonymous Text Chat',
      description: 'Prefer text first? Enjoy private 1-on-1 text messaging with voice note support and instant conversation starters.',
    },
    {
      icon: <Globe className="w-6 h-6 text-sky-400" />,
      title: 'Topic & Location Matching',
      description: 'Filter matches by gender, age range, region, or specific interests like Music, Gaming, Travel, or Tech.',
    },
    {
      icon: <Smartphone className="w-6 h-6 text-pink-400" />,
      title: 'Fast Mobile Installation',
      description: 'Lightweight and fast application. Install directly to your phone for instant access anytime.',
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
      title: 'Verified Safe Profiles',
      description: 'AI-assisted explicit content blur filter, instant 1-click skip/block, and confidential safety reporting.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      title: 'Dating & Friend Discovery',
      description: 'Swipe through member cards, discover local friends nearby, or match with global travellers in real time.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-widest font-mono">
            Why Choose ChatMate
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Built for Fast, Fun & Safe Global Connections
          </h2>
          <p className="text-sm text-slate-400">
            Everything you need for spontaneous conversations and new friendships right from your device.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all hover:scale-[1.02] space-y-3 shadow-xl"
            >
              <div className="p-3 rounded-2xl bg-slate-950 w-fit border border-slate-800">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-white font-heading">{f.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
