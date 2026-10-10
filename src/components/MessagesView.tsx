import React from 'react';
import { MessageSquare, Video, Search, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { Profile } from '../types';

interface MessagesViewProps {
  savedProfiles: Profile[];
  onStartChat: (profile: Profile) => void;
  onStartVideoCall: (profile: Profile) => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({
  savedProfiles,
  onStartChat,
  onStartVideoCall,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filtered = savedProfiles.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.interests.some((i) => i.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-heading flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-rose-500" />
            <span>Saved Matches & Chats</span>
          </h1>
          <p className="text-xs text-slate-400">Your recent friends, matched profiles, and saved connections</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search matches..."
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-rose-500"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-white">No Saved Matches Yet</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            When you like profiles or click "Add Friend" during random text or video calls, they will show up here!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex items-center justify-between gap-4 transition-all shadow-md"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                    referrerPolicy="no-referrer"
                  />
                  {p.isOnline && (
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900"></span>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white truncate">{p.name}, {p.age}</h3>
                    {p.verified && <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-400 truncate">{p.location}</p>
                  <p className="text-[11px] text-rose-400 font-medium truncate mt-0.5">
                    {p.interests[0] || 'Friendly chat'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onStartChat(p)}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 transition-colors"
                  title="Text Chat"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onStartVideoCall(p)}
                  className="p-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20 transition-colors"
                  title="Video Call"
                >
                  <Video className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
