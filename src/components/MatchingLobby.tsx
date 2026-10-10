import React, { useState } from 'react';
import { Video, MessageSquare, Sliders, Globe, Shield, Sparkles, Heart, Zap, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Profile, MatchingFilters } from '../types';

interface MatchingLobbyProps {
  filters: MatchingFilters;
  setFilters: React.Dispatch<React.SetStateAction<MatchingFilters>>;
  onStartMatch: (mode: 'video' | 'text', targetProfile?: Profile) => void;
  onlineCount: number;
  featuredProfiles: Profile[];
  openProfileModal: () => void;
}

export const MatchingLobby: React.FC<MatchingLobbyProps> = ({
  filters,
  setFilters,
  onStartMatch,
  onlineCount,
  featuredProfiles,
  openProfileModal,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchMode, setSearchMode] = useState<'video' | 'text'>('video');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('Anything');

  const topics = ['Anything', 'Casual Talk', 'Tech & Coding', 'Music & Jamming', 'Movies & Anime', 'Deep Debates', 'Flirting & Dating'];

  const handleTriggerSearch = (mode: 'video' | 'text') => {
    setSearchMode(mode);
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      onStartMatch(mode);
    }, 2200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-10">
      
      {/* Hero Banner with Animated Live Radar */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 md:p-10 shadow-2xl">
        
        {/* Glow ambient background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left CTA Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Live Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span>ChatMate Live Match Network</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300 font-mono">{onlineCount.toLocaleString()} Users Online</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-white leading-tight text-wrap">
              Meet New People <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">Instantly</span> on the Web
            </h1>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl">
              100% free web app. Connect via random 1-on-1 video call or anonymous live text chat with verified profiles from around the world.
            </p>

            {/* Interest Tag Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Select Chat Interest Topic:
              </label>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {topics.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTopic(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedTopic === t
                        ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-105'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => handleTriggerSearch('video')}
                disabled={isSearching}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-lg shadow-xl shadow-rose-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
              >
                <Video className="w-6 h-6 fill-white/20 group-hover:rotate-12 transition-transform" />
                <span>Start Video Match</span>
              </button>

              <button
                onClick={() => handleTriggerSearch('text')}
                disabled={isSearching}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-3"
              >
                <MessageSquare className="w-5 h-5 text-rose-400" />
                <span>Random Text Chat</span>
              </button>

              <button
                onClick={() => setShowFilterModal(true)}
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center justify-center"
                title="Match Preferences"
              >
                <Sliders className="w-5 h-5 text-amber-400" />
              </button>
            </div>

            {/* Quick Filters Info */}
            <div className="flex items-center justify-center lg:justify-start gap-3 text-xs text-slate-400 pt-1 font-medium">
              <span>Filter: <strong className="text-slate-200 capitalize">{filters.gender}</strong></span>
              <span aria-hidden="true">·</span>
              <span>Region: <strong className="text-slate-200">{filters.region}</strong></span>
              <span aria-hidden="true">·</span>
              <button onClick={() => setShowFilterModal(true)} className="text-rose-400 hover:underline">
                Change Preferences
              </button>
            </div>
          </div>

          {/* Right Column: Radar Graphic / Searching State */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              
              {/* Outer Radar Rings */}
              <div className={`absolute inset-0 rounded-full border-2 border-rose-500/20 ${isSearching ? 'animate-ping duration-1000' : ''}`}></div>
              <div className="absolute inset-4 rounded-full border border-pink-500/30"></div>
              <div className="absolute inset-12 rounded-full border border-slate-800 bg-slate-900/60 backdrop-blur-sm"></div>

              {/* Sweeping Radar Beam */}
              {isSearching && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500/30 via-transparent to-transparent animate-spin origin-center duration-700 pointer-events-none"></div>
              )}

              {/* Center Trigger Avatar */}
              <div className="relative z-10 text-center space-y-2">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 p-1 shadow-2xl mx-auto flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center p-2">
                    {isSearching ? (
                      <RefreshCw className="w-8 h-8 text-rose-500 animate-spin" />
                    ) : (
                      <Zap className="w-8 h-8 text-amber-400 fill-amber-400/30" />
                    )}
                    <span className="text-[11px] font-bold text-slate-200 mt-1">
                      {isSearching ? 'Finding Match...' : 'Ready'}
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-xs text-slate-400 font-medium">Topic: <span className="text-rose-400 font-semibold">{selectedTopic}</span></p>
                  <p className="text-[11px] text-slate-500 font-mono">Verified Safe Matchmaking</p>
                </div>
              </div>

              {/* Orbiting Avatar Pins */}
              <div className="absolute top-2 left-6 w-10 h-10 rounded-full border-2 border-rose-500 overflow-hidden shadow-md animate-bounce">
                <img src={featuredProfiles[0]?.avatar} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute bottom-4 right-6 w-10 h-10 rounded-full border-2 border-amber-400 overflow-hidden shadow-md">
                <img src={featuredProfiles[1]?.avatar} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute top-1/2 right-1 w-9 h-9 rounded-full border-2 border-pink-500 overflow-hidden shadow-md">
                <img src={featuredProfiles[2]?.avatar} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Featured Active Online Users Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white font-heading">
              Featured Active Members
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Start a direct conversation or click to view profile
            </p>
          </div>
          <span className="text-xs text-rose-400 font-semibold font-mono">
            {featuredProfiles.length} active nearby
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featuredProfiles.map((p) => (
            <div
              key={p.id}
              className="group relative rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 overflow-hidden p-4 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-rose-950/20 flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="relative shrink-0">
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-700 group-hover:border-rose-500/50 transition-colors"
                    referrerPolicy="no-referrer"
                  />
                  {p.isOnline && (
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900" title="Online now"></span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white truncate">{p.name}, {p.age}</h3>
                    {p.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 fill-sky-400/20 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 truncate">{p.location}</p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 font-medium">
                    <span>{p.distanceKm} km away</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-rose-400">{p.zodiac || 'Friendly'}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed italic">
                "{p.bio}"
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {p.interests.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[10px] font-medium text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => onStartMatch('text', p)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-rose-400" />
                  Chat
                </button>
                <button
                  onClick={() => onStartMatch('video', p)}
                  className="w-full py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-rose-600/20"
                >
                  <Video className="w-3.5 h-3.5" />
                  Call
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-rose-500" />
                <h3 className="text-lg font-bold text-white font-heading">Match Preferences</h3>
              </div>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Gender Preference */}
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-2">I want to match with:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['all', 'female', 'male'] as const).map((g) => (
                    <button
                      key={g}
                      onClick={() => setFilters({ ...filters, gender: g })}
                      className={`py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                        filters.gender === g
                          ? 'bg-rose-500 text-white shadow-md'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {g === 'all' ? 'Everyone' : g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age Range */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                  <span>Age Range</span>
                  <span className="text-rose-400 font-mono">{filters.minAge} - {filters.maxAge} years</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="range"
                    min="18"
                    max="40"
                    value={filters.minAge}
                    onChange={(e) => setFilters({ ...filters, minAge: Number(e.target.value) })}
                    className="accent-rose-500 bg-slate-800 h-2 rounded-lg"
                  />
                  <input
                    type="range"
                    min="20"
                    max="60"
                    value={filters.maxAge}
                    onChange={(e) => setFilters({ ...filters, maxAge: Number(e.target.value) })}
                    className="accent-rose-500 bg-slate-800 h-2 rounded-lg"
                  />
                </div>
              </div>

              {/* Region */}
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-2">Matching Region:</label>
                <select
                  value={filters.region}
                  onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:border-rose-500"
                >
                  <option value="Global (Worldwide)">Global (Worldwide)</option>
                  <option value="Asia Pacific">Asia Pacific</option>
                  <option value="India & South Asia">India & South Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="North America">North America</option>
                </select>
              </div>

              {/* Video Only Toggle */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/60 border border-slate-800">
                <div>
                  <p className="text-xs font-bold text-white">Verified Video Members Only</p>
                  <p className="text-[11px] text-slate-400">Match only with users who have active camera</p>
                </div>
                <input
                  type="checkbox"
                  checked={filters.hasVideoOnly}
                  onChange={(e) => setFilters({ ...filters, hasVideoOnly: e.target.checked })}
                  className="w-5 h-5 accent-rose-500 rounded"
                />
              </div>
            </div>

            <button
              onClick={() => setShowFilterModal(false)}
              className="w-full py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold rounded-xl shadow-lg shadow-rose-600/30 hover:opacity-90 transition-opacity text-sm"
            >
              Apply Preferences
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
