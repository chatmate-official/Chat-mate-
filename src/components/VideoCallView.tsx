import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Video, VideoOff, SkipForward, UserPlus, ShieldAlert, Heart, Sparkles, Send, Volume2, ArrowLeft, RefreshCw, CheckCircle2, Gift } from 'lucide-react';
import { Profile, ChatMessage } from '../types';

interface VideoCallViewProps {
  partner: Profile;
  onNextMatch: () => void;
  onBackToLobby: () => void;
  onSavePartner: (partner: Profile) => void;
}

export const VideoCallView: React.FC<VideoCallViewProps> = ({
  partner,
  onNextMatch,
  onBackToLobby,
  onSavePartner,
}) => {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'none' | 'glow' | 'warm' | 'cyber'>('glow');
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; left: number }[]>([]);
  const [chatOverlay, setChatOverlay] = useState<ChatMessage[]>([]);
  const [overlayInput, setOverlayInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [hasCamPermission, setHasCamPermission] = useState<boolean | null>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);

  // Initialize camera stream
  useEffect(() => {
    let stream: MediaStream | null = null;

    async function enableCam() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        setHasCamPermission(true);
      } catch (e) {
        console.warn('Camera access not granted or unavailable:', e);
        setHasCamPermission(false);
      }
    }

    enableCam();

    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // Default incoming greeting chat overlay
  useEffect(() => {
    setChatOverlay([
      {
        id: '1',
        sender: 'partner',
        text: `Hey! Video connected! ${partner.name} here 😊`,
        timestamp: 'Now',
      },
    ]);
  }, [partner]);

  const triggerHeartAnimation = () => {
    const newHeart = { id: Date.now(), left: Math.random() * 80 + 10 };
    setFloatingHearts((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 2000);
  };

  const handleSendOverlayMessage = () => {
    if (!overlayInput.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: overlayInput,
      timestamp: 'Now',
    };

    setChatOverlay((prev) => [...prev, userMsg]);
    setOverlayInput('');

    // Simulate quick short response
    setTimeout(() => {
      setChatOverlay((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'partner',
          text: `Haha nice! ${partner.interests[0] || 'Cool'} is awesome!`,
          timestamp: 'Now',
        },
      ]);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4 py-3 h-[calc(100vh-100px)] flex flex-col justify-between space-y-3">
      
      {/* Top Overlay Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 flex items-center justify-between shadow-xl z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToLobby}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src={partner.avatar}
                alt={partner.name}
                className="w-10 h-10 rounded-xl object-cover border border-rose-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white">{partner.name}, {partner.age}</h3>
                {partner.verified && <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />}
              </div>
              <p className="text-[11px] text-slate-400">{partner.location} · Live 1-on-1</p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsSaved(true);
              onSavePartner(partner);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isSaved ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 text-rose-400" />
            <span>{isSaved ? 'Saved' : 'Add Friend'}</span>
          </button>

          <button
            onClick={onNextMatch}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 flex items-center gap-1.5 transition-all"
          >
            <SkipForward className="w-4 h-4" />
            <span>Next Match</span>
          </button>
        </div>
      </div>

      {/* Main Dual Video Canvas Stage */}
      <div className="relative flex-1 rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-between p-4">
        
        {/* Remote Partner Video Stream Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={partner.videoPoster || partner.avatar}
            alt={partner.name}
            className={`w-full h-full object-cover transition-all duration-500 ${
              activeFilter === 'glow'
                ? 'brightness-110 contrast-105 saturate-110'
                : activeFilter === 'cyber'
                ? 'hue-rotate-30 saturate-150'
                : activeFilter === 'warm'
                ? 'sepia-[0.25] brightness-105'
                : ''
            }`}
            referrerPolicy="no-referrer"
          />

          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60 pointer-events-none"></div>
        </div>

        {/* Floating Heart Animations */}
        {floatingHearts.map((h) => (
          <div
            key={h.id}
            style={{ left: `${h.left}%` }}
            className="absolute bottom-20 z-30 text-rose-500 text-2xl animate-bounce pointer-events-none"
          >
            ❤️
          </div>
        ))}

        {/* Top Info Banner on Video */}
        <div className="relative z-10 flex items-start justify-between">
          <div className="bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-800/80 text-xs text-slate-200 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="font-bold">HD Live Call</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="font-mono text-slate-400">00:42</span>
          </div>

          {/* Local User Preview Pip */}
          <div className="w-28 h-36 sm:w-36 sm:h-48 rounded-2xl bg-slate-900 border-2 border-slate-700/80 overflow-hidden shadow-2xl relative z-10">
            {isVideoOff ? (
              <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-2 text-center">
                <VideoOff className="w-6 h-6 text-slate-500 mb-1" />
                <span className="text-[10px] text-slate-400 font-medium">Camera Off</span>
              </div>
            ) : (
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover -scale-x-100 ${
                  activeFilter === 'glow'
                    ? 'contrast-105 brightness-110'
                    : activeFilter === 'cyber'
                    ? 'hue-rotate-30'
                    : activeFilter === 'warm'
                    ? 'sepia-[0.2]'
                    : ''
                }`}
              />
            )}

            {!hasCamPermission && !isVideoOff && (
              <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center p-2 text-center">
                <Video className="w-5 h-5 text-rose-400 mb-1 animate-pulse" />
                <span className="text-[10px] text-slate-300 font-semibold">Simulated Cam</span>
              </div>
            )}

            <div className="absolute bottom-1.5 left-1.5 bg-slate-900/80 px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-200">
              You
            </div>
          </div>
        </div>

        {/* Live Chat Overlay & Controls */}
        <div className="relative z-10 space-y-3">
          
          {/* Chat Messages Overlay */}
          <div className="max-w-md space-y-1.5 max-h-36 overflow-y-auto no-scrollbar">
            {chatOverlay.map((msg) => (
              <div
                key={msg.id}
                className="inline-block bg-slate-900/80 backdrop-blur-md border border-slate-800/80 px-3 py-1.5 rounded-xl text-xs text-slate-200 shadow-md"
              >
                <span className="font-bold text-rose-400 mr-1.5">
                  {msg.sender === 'user' ? 'You' : partner.name}:
                </span>
                <span>{msg.text}</span>
              </div>
            ))}
          </div>

          {/* Filter preset tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
              Face Filter:
            </span>
            {(['none', 'glow', 'warm', 'cyber'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize shrink-0 transition-all ${
                  activeFilter === f
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'bg-slate-900/80 text-slate-300 border border-slate-800'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Video Control Bar */}
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-2.5 flex items-center justify-between gap-2 shadow-2xl">
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMicMuted(!isMicMuted)}
                className={`p-3 rounded-xl transition-colors ${
                  isMicMuted ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
                title={isMicMuted ? 'Unmute Mic' : 'Mute Mic'}
              >
                {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-3 rounded-xl transition-colors ${
                  isVideoOff ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
                title={isVideoOff ? 'Turn Camera On' : 'Turn Camera Off'}
              >
                {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </button>

              <button
                onClick={triggerHeartAnimation}
                className="p-3 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30 transition-colors"
                title="Send Floating Heart"
              >
                <Heart className="w-5 h-5 fill-rose-500/30" />
              </button>
            </div>

            {/* Overlay Input */}
            <div className="flex-1 max-w-sm flex items-center gap-2">
              <input
                type="text"
                value={overlayInput}
                onChange={(e) => setOverlayInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendOverlayMessage()}
                placeholder="Type quick message..."
                className="w-full bg-slate-950/80 border border-slate-800 text-slate-100 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-rose-500"
              />
              <button
                onClick={handleSendOverlayMessage}
                className="p-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onNextMatch}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs shadow-md flex items-center gap-1.5 shrink-0 hover:opacity-90 transition-opacity"
            >
              <SkipForward className="w-4 h-4" />
              <span>Next</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};
