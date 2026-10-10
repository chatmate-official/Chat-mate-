import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';

export const TestimonialsAndFaq: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const testimonials = [
    {
      name: 'Priya V.',
      location: 'Chennai, India',
      rating: 5,
      review: 'I love ChatMate! Quick installation and video quality is crystal clear.',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200',
    },
    {
      name: 'Lucas S.',
      location: 'Lisbon, Portugal',
      rating: 5,
      review: 'Met incredible people while travelling in Europe. The topic filters make it so easy to find people who share my hobbies.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    },
    {
      name: 'Ananya S.',
      location: 'Mumbai, India',
      rating: 5,
      review: 'Super fast, zero lag, and very respectful community. The safety features work great!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
  ];

  const faqs = [
    {
      q: 'How do I install ChatMate?',
      a: 'Click the "Install App" button at the top of this page to download and install ChatMate directly onto your device.',
    },
    {
      q: 'Is ChatMate safe and private?',
      a: 'Absolutely. We offer 1-click reporting, instant skip, verified badges, and automatic media blur protection for a safe experience.',
    },
    {
      q: 'Can I filter matches by gender or location?',
      a: 'Yes, you can easily filter your random matches by gender, age range, location region, or interest topic.',
    },
  ];

  return (
    <div className="py-20 bg-slate-900/40 border-t border-slate-900 space-y-20">
      
      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-widest font-mono">
            User Reviews
          </span>
          <h2 className="text-3xl font-extrabold text-white font-heading">
            Loved by Thousands Worldwide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">"{t.review}"</p>
              <div className="flex items-center gap-3 pt-2">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                <div>
                  <p className="text-xs font-bold text-white">{t.name}</p>
                  <p className="text-[11px] text-slate-400">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div id="faq" className="max-w-3xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest font-mono">
            Got Questions?
          </span>
          <h2 className="text-3xl font-extrabold text-white font-heading">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, idx) => (
            <div key={idx} className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left text-sm font-bold text-white flex items-center justify-between gap-4"
              >
                <span>{f.q}</span>
                {openFaq === idx ? <ChevronUp className="w-4 h-4 text-rose-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
