import React, { useState } from 'react';
import { Heart, X, Star, Sparkles, MessageSquare, MapPin, CheckCircle2, Shield, Flame } from 'lucide-react';
import { Profile } from '../types';

interface DiscoverDeckProps {
  profiles: Profile[];
  onStartChat: (profile: Profile) => void;
  onSaveProfile: (profile: Profile) => void;
}

export const DiscoverDeck: React.FC<DiscoverDeckProps> = ({
  profiles,
  onStartChat,
  onSaveProfile,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatchModal, setShowMatchModal] = useState<Profile | null>(null);
  const [generatedOpener, setGeneratedOpener] = useState<string>('');
  const [isGeneratingOpener, setIsGeneratingOpener] = useState(false);

  const currentProfile = profiles[currentIndex % profiles.length];

  const handleLike = () => {
    onSaveProfile(currentProfile);
    setShowMatchModal(currentProfile);
  };

  const handlePass = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const generateAIOpener = async () => {
    if (!currentProfile) return;
    setIsGeneratingOpener(true);

    try {
      const res = await fetch('/api/ai/icebreakers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood: 'Charming & Flirty',
          interest: currentProfile.interests[0] || 'General',
        }),
      });
      const data = await res.json();
      setGeneratedOpener(data.icebreakers?.[0] || `Hey ${currentProfile.name}! Love your vibe and interests in ${currentProfile.interests[0]}.`);
    } catch (e) {
      setGeneratedOpener(`Hey ${currentProfile.name}! Love your profile bio and interests in ${currentProfile.interests[0] || 'travel'}!`);
    } finally {
      setIsGeneratingOpener(false);
    }
  };

  if (!currentProfile) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto text-rose-500">
          <Flame className="w-10 h-10 animate-bounce" />
        </div>
        <h2 className="text-2xl font-bold text-white">All Caught Up!</h2>
        <p className="text-sm text-slate-400">You've swiped through available profiles nearby.</p>
        <button
          onClick={() => setCurrentIndex(0)}
          className="px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg"
        >
          Review Profiles Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-heading flex items-center gap-2">
            <Flame className="w-6 h-6 text-amber-400 fill-amber-400" />
            <span>Discover</span>
          </h1>
          <p className="text-xs text-slate-400">Find matches based on common interests & location</p>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          Profile {currentIndex + 1} of {profiles.length}
        </span>
      </div>

      {/* Profile Card */}
      <div className="relative rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl space-y-0">
        
        {/* Photo Stage */}
        <div className="relative h-96 sm:h-[420px] w-full overflow-hidden">
          <img
            src={currentProfile.avatar}
            alt={currentProfile.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-200 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>{currentProfile.location}</span>
              <span className="text-slate-500">({currentProfile.distanceKm} km)</span>
            </div>

            {currentProfile.verified && (
              <div className="bg-sky-500/20 backdrop-blur-md border border-sky-500/40 px-3 py-1.5 rounded-xl text-sky-300 text-xs font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified</span>
              </div>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 space-y-1">
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{currentProfile.name}, {currentProfile.age}</h2>
              {currentProfile.zodiac && (
                <span className="text-xs text-rose-300 font-semibold bg-rose-500/20 px-2 py-0.5 rounded-md border border-rose-500/30">
                  {currentProfile.zodiac}
                </span>
              )}
            </div>
            {currentProfile.occupation && (
              <p className="text-xs text-slate-300 font-medium">{currentProfile.occupation}</p>
            )}
          </div>
        </div>

        {/* Bio Section */}
        <div className="p-5 space-y-4 bg-slate-900">
          
          <p className="text-sm text-slate-200 leading-relaxed italic">
            "{currentProfile.bio}"
          </p>

          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Interests & Hobbies:</span>
            <div className="flex flex-wrap gap-2">
              {currentProfile.interests.map((tag) => (
                <span key={tag} className="text-xs font-semibold text-rose-300 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-xl">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Icebreaker Ideas */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">Icebreaker Starter</span>
              </div>
              <button
                onClick={generateAIOpener}
                disabled={isGeneratingOpener}
                className="text-xs text-amber-400 hover:underline font-semibold"
              >
                {isGeneratingOpener ? 'Loading...' : 'Get Idea ⚡'}
              </button>
            </div>

            {generatedOpener ? (
              <div className="p-2.5 rounded-xl bg-slate-900 text-xs text-slate-200 border border-slate-800 flex items-center justify-between gap-2">
                <p className="italic">"{generatedOpener}"</p>
                <button
                  onClick={() => {
                    onSaveProfile(currentProfile);
                    onStartChat(currentProfile);
                  }}
                  className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg shrink-0 text-[11px]"
                >
                  Send Opener
                </button>
              </div>
            ) : (
              <p className="text-[11px] text-slate-400">Click to get a conversation starter for {currentProfile.name}.</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <button
              onClick={handlePass}
              className="py-3.5 rounded-2xl bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700 hover:border-red-500/30 font-bold transition-all flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              <span>Pass</span>
            </button>

            <button
              onClick={() => {
                onSaveProfile(currentProfile);
                onStartChat(currentProfile);
              }}
              className="py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5 text-rose-400" />
              <span>Chat</span>
            </button>

            <button
              onClick={handleLike}
              className="py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 text-white font-bold shadow-lg shadow-rose-600/30 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5 fill-white/20" />
              <span>Like</span>
            </button>
          </div>

        </div>

      </div>

      {/* Match Modal */}
      {showMatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 p-1 mx-auto shadow-lg shadow-rose-500/30">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-white font-heading">It's a Match! 🎉</h3>
              <p className="text-xs text-slate-300 mt-1">You and {showMatchModal.name} liked each other.</p>
            </div>

            <div className="flex justify-center -space-x-4">
              <img
                src={showMatchModal.avatar}
                alt={showMatchModal.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-slate-900 shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="w-16 h-16 rounded-full bg-rose-500 border-2 border-slate-900 flex items-center justify-center text-white font-bold text-xl shadow-md">
                ❤️
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  const p = showMatchModal;
                  setShowMatchModal(null);
                  onStartChat(p);
                }}
                className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-600/30 text-sm"
              >
                Start Conversation Now
              </button>

              <button
                onClick={() => {
                  setShowMatchModal(null);
                  setCurrentIndex((prev) => prev + 1);
                }}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-2xl text-xs"
              >
                Keep Swiping
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
