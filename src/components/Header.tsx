import React from 'react';
import { MessageSquare, Video, Flame, Sparkles, Shield, User, Download, Radio } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  activeTab: 'lobby' | 'text-chat' | 'video-call' | 'discover' | 'messages' | 'safety';
  setActiveTab: (tab: 'lobby' | 'text-chat' | 'video-call' | 'discover' | 'messages' | 'safety') => void;
  onlineCount: number;
  userProfile: UserProfile;
  openProfileModal: () => void;
  onInstallPwa?: () => void;
  showInstallBtn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onlineCount,
  userProfile,
  openProfileModal,
  onInstallPwa,
  showInstallBtn
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setActiveTab('lobby')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 p-0.5 shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Video className="w-5 h-5 text-rose-500 fill-rose-500/20" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent font-heading whitespace-nowrap">
                ChatMate
              </span>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="tabular-nums font-mono">{onlineCount.toLocaleString()}</span>
                <span>Online</span>
              </div>
            </div>
          </button>
        </div>

        {/* Clean Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            onClick={() => setActiveTab('lobby')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'lobby'
                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Radio className="w-4 h-4" />
            Random Match
          </button>

          <button
            onClick={() => setActiveTab('video-call')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'video-call'
                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Video className="w-4 h-4" />
            Video Call
          </button>

          <button
            onClick={() => setActiveTab('text-chat')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'text-chat'
                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Text Chat
          </button>

          <button
            onClick={() => setActiveTab('discover')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'discover'
                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            Discover
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'messages'
                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Saved Chats
          </button>

          <button
            onClick={() => setActiveTab('safety')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'safety'
                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-4 h-4 text-emerald-400" />
            Safety
          </button>
        </nav>

        {/* Action & Profile */}
        <div className="flex items-center gap-2.5 shrink-0">
          {showInstallBtn && onInstallPwa && (
            <button
              onClick={onInstallPwa}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              Install App
            </button>
          )}

          <button
            onClick={openProfileModal}
            className="flex items-center gap-2.5 p-1.5 pl-3 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all text-left"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-200 truncate max-w-[100px]">{userProfile.name}</p>
              <p className="text-[10px] text-amber-400 font-mono">🪙 {userProfile.coins} coins</p>
            </div>
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-8 h-8 rounded-full object-cover border border-rose-500/50 shadow-sm"
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex items-center justify-between gap-1 mt-3 pt-2.5 border-t border-slate-900 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('lobby')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 ${
            activeTab === 'lobby' ? 'bg-rose-500 text-white font-semibold' : 'text-slate-400 bg-slate-900/50'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          Match
        </button>
        <button
          onClick={() => setActiveTab('video-call')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 ${
            activeTab === 'video-call' ? 'bg-rose-500 text-white font-semibold' : 'text-slate-400 bg-slate-900/50'
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          Video
        </button>
        <button
          onClick={() => setActiveTab('text-chat')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 ${
            activeTab === 'text-chat' ? 'bg-rose-500 text-white font-semibold' : 'text-slate-400 bg-slate-900/50'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Text Chat
        </button>
        <button
          onClick={() => setActiveTab('discover')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 ${
            activeTab === 'discover' ? 'bg-rose-500 text-white font-semibold' : 'text-slate-400 bg-slate-900/50'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          Discover
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 ${
            activeTab === 'messages' ? 'bg-rose-500 text-white font-semibold' : 'text-slate-400 bg-slate-900/50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Chats
        </button>
      </div>
    </header>
  );
};
