import React, { useState, useEffect, useRef } from 'react';
import { Send, SkipForward, UserPlus, ShieldAlert, Sparkles, Mic, Gift, Volume2, ArrowLeft, CheckCircle2, Heart, Smile } from 'lucide-react';
import { Profile, ChatMessage } from '../types';

interface RandomChatViewProps {
  partner: Profile;
  onNextMatch: () => void;
  onBackToLobby: () => void;
  onSavePartner: (partner: Profile) => void;
}

export const RandomChatView: React.FC<RandomChatViewProps> = ({
  partner,
  onNextMatch,
  onBackToLobby,
  onSavePartner,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showIcebreakers, setShowIcebreakers] = useState(false);
  const [icebreakers, setIcebreakers] = useState<string[]>([]);
  const [loadingIcebreakers, setLoadingIcebreakers] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showGifts, setShowGifts] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: 'm1',
        sender: 'system',
        text: `Matched with ${partner.name} from ${partner.location}! Say hi 👋`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: 'm2',
        sender: 'partner',
        text: `Hey! I'm ${partner.name}. Nice to meet you! How's your day going? 😊`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [partner]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const fetchIcebreakers = async () => {
    setLoadingIcebreakers(true);
    setShowIcebreakers(true);

    try {
      const res = await fetch('/api/ai/icebreakers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood: 'Friendly & Flirty',
          interest: partner.interests[0] || 'General',
        }),
      });
      const data = await res.json();
      setIcebreakers(data.icebreakers || []);
    } catch (e) {
      setIcebreakers([
        "If you could teleport anywhere right now, where would we go?",
        "What's your absolute favorite song of all time?",
        "Coffee or tea person?",
      ]);
    } finally {
      setLoadingIcebreakers(false);
    }
  };

  const handleSendMessage = async (textToSend?: string, type: 'text' | 'icebreaker' | 'gift' = 'text') => {
    const finalMsg = textToSend || input;
    if (!finalMsg.trim()) return;

    const userMsgObj: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: finalMsg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type,
    };

    setMessages((prev) => [...prev, userMsgObj]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/chat-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partnerName: partner.name,
          partnerBio: partner.bio,
          partnerInterests: partner.interests,
          messageHistory: messages.filter((m) => m.sender !== 'system'),
          userMessage: finalMsg,
        }),
      });

      const data = await res.json();
      setIsTyping(false);

      const partnerMsgObj: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'partner',
        text: data.reply || "Haha that's so true! Tell me more!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, partnerMsgObj]);
    } catch (err) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'partner',
          text: "That sounds awesome! What else do you enjoy doing in your free time?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  const handlePlayVoiceNote = async (text: string, msgId: string) => {
    if (playingAudioId === msgId) return;
    setPlayingAudioId(msgId);

    try {
      const res = await fetch('/api/ai/speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          voiceName: partner.gender === 'female' ? 'Kore' : 'Zephyr',
        }),
      });

      const data = await res.json();
      if (data.audioBase64) {
        const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
        audio.onended = () => setPlayingAudioId(null);
        audio.play();
      } else {
        setPlayingAudioId(null);
      }
    } catch (e) {
      setPlayingAudioId(null);
    }
  };

  const handleSendGift = (giftName: string) => {
    setShowGifts(false);
    handleSendMessage(`Sent a gift 🎁 ${giftName}!`, 'gift');
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 h-[calc(100vh-100px)] flex flex-col space-y-3">
      
      {/* Top Match Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToLobby}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="relative">
            <img
              src={partner.avatar}
              alt={partner.name}
              className="w-11 h-11 rounded-xl object-cover border border-rose-500/50"
              referrerPolicy="no-referrer"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900"></span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-white">{partner.name}, {partner.age}</h3>
              {partner.verified && (
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
              )}
            </div>
            <p className="text-xs text-slate-400">{partner.location} · {partner.interests.slice(0, 2).join(', ')}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsSaved(true);
              onSavePartner(partner);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isSaved
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 text-rose-400" />
            <span>{isSaved ? 'Saved' : 'Add Friend'}</span>
          </button>

          <button
            onClick={onNextMatch}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold shadow-md shadow-rose-600/20 flex items-center gap-1.5 transition-all"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>Next</span>
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 overflow-y-auto space-y-4 no-scrollbar">
        {messages.map((m) => {
          if (m.sender === 'system') {
            return (
              <div key={m.id} className="text-center py-2">
                <span className="text-[11px] font-medium text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700/60">
                  {m.text}
                </span>
              </div>
            );
          }

          const isUser = m.sender === 'user';

          return (
            <div
              key={m.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div className="flex items-end gap-2 max-w-[82%] sm:max-w-[70%]">
                {!isUser && (
                  <img
                    src={partner.avatar}
                    alt={partner.name}
                    className="w-7 h-7 rounded-lg object-cover shrink-0 border border-slate-700"
                    referrerPolicy="no-referrer"
                  />
                )}

                <div
                  className={`p-3.5 rounded-2xl text-sm leading-relaxed space-y-1 shadow-sm ${
                    isUser
                      ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-100 border border-slate-700/80 rounded-bl-none'
                  }`}
                >
                  <p className="break-words">{m.text}</p>

                  {!isUser && (
                    <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                      <button
                        onClick={() => handlePlayVoiceNote(m.text, m.id)}
                        className="flex items-center gap-1 text-rose-300 hover:text-white transition-colors"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>{playingAudioId === m.id ? 'Playing Voice...' : 'Listen Voice'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <span className="text-[10px] text-slate-500 font-mono px-1">
                {m.timestamp}
              </span>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic py-1">
            <img src={partner.avatar} alt="Partner" className="w-6 h-6 rounded-md object-cover" referrerPolicy="no-referrer" />
            <span>{partner.name} is typing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Icebreakers Drawer */}
      {showIcebreakers && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white">Conversation Starters</span>
            </div>
            <button
              onClick={() => setShowIcebreakers(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Close ✕
            </button>
          </div>

          {loadingIcebreakers ? (
            <p className="text-xs text-slate-400 py-2">Loading ideas...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {icebreakers.map((line, i) => (
                <button
                  key={i}
                  onClick={() => {
                    handleSendMessage(line, 'icebreaker');
                    setShowIcebreakers(false);
                  }}
                  className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 hover:border-rose-500/40 border border-slate-700/80 text-xs text-slate-200 text-left transition-all"
                >
                  "{line}"
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Gifts Drawer */}
      {showGifts && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-around gap-2">
          {[
            { name: 'Red Rose 🌹', price: 'Free' },
            { name: 'Coffee ☕', price: 'Free' },
            { name: 'Sparkles ✨', price: 'Free' },
            { name: 'Heart Ring 💍', price: '5 Coins' },
          ].map((g) => (
            <button
              key={g.name}
              onClick={() => handleSendGift(g.name)}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-center text-xs text-slate-200 font-semibold space-y-1 transition-colors"
            >
              <div>{g.name}</div>
              <div className="text-[10px] text-amber-400 font-mono">{g.price}</div>
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 sm:p-2.5 flex items-center gap-2 shadow-lg">
        <button
          onClick={fetchIcebreakers}
          className="p-2.5 rounded-xl bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/20 transition-colors"
          title="Conversation Ideas"
        >
          <Sparkles className="w-5 h-5" />
        </button>

        <button
          onClick={() => setShowGifts(!showGifts)}
          className="p-2.5 rounded-xl bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 border border-rose-500/20 transition-colors"
          title="Send Gift"
        >
          <Gift className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={`Message ${partner.name}...`}
          className="flex-1 bg-slate-950 border border-slate-800 text-slate-100 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose-500 placeholder:text-slate-500"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!input.trim()}
          className="p-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:opacity-90 disabled:opacity-40 text-white font-bold transition-opacity"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
