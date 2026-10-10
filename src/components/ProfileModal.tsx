import React, { useState } from 'react';
import { Sparkles, User, Camera, Heart, Check, X } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileModalProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  userProfile,
  setUserProfile,
  onClose,
}) => {
  const [bio, setBio] = useState(userProfile.bio);
  const [name, setName] = useState(userProfile.name);
  const [age, setAge] = useState(userProfile.age);
  const [gender, setGender] = useState(userProfile.gender);
  const [location, setLocation] = useState(userProfile.location);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const availableInterests = ['Travel', 'Music', 'Coding', 'Fitness', 'Movies', 'Gaming', 'Coffee', 'Cooking', 'Dancing', 'Photography'];

  const toggleInterest = (interest: string) => {
    if (userProfile.interests.includes(interest)) {
      setUserProfile({
        ...userProfile,
        interests: userProfile.interests.filter((i) => i !== interest),
      });
    } else {
      setUserProfile({
        ...userProfile,
        interests: [...userProfile.interests, interest],
      });
    }
  };

  const handleEnhanceBioWithAI = async () => {
    setIsEnhancing(true);

    try {
      const res = await fetch('/api/ai/enhance-bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawBio: bio,
          interests: userProfile.interests,
          vibe: 'Charming, authentic, and fun',
        }),
      });

      const data = await res.json();
      if (data.enhancedBio) {
        setBio(data.enhancedBio);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSave = () => {
    setUserProfile({
      ...userProfile,
      name,
      age,
      gender,
      location,
      bio,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-rose-500" />
            <h3 className="text-lg font-bold text-white font-heading">Edit Profile</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <div className="relative group cursor-pointer">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-rose-500/80 shadow-lg"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 rounded-full bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Click to change photo</p>
        </div>

        <div className="space-y-4">
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-100 text-xs rounded-xl p-3 focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 text-slate-100 text-xs rounded-xl p-3 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-100 text-xs rounded-xl p-3 focus:outline-none focus:border-rose-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-Binary</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-100 text-xs rounded-xl p-3 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-400">Bio</label>
              <button
                type="button"
                onClick={handleEnhanceBioWithAI}
                disabled={isEnhancing}
                className="text-[11px] text-amber-400 font-semibold hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{isEnhancing ? 'Generating...' : 'Auto-Polish Bio'}</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a brief intro about yourself..."
              className="w-full bg-slate-800 border border-slate-700 text-slate-100 text-xs rounded-xl p-3 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-2">Interests:</label>
            <div className="flex flex-wrap gap-2">
              {availableInterests.map((interest) => {
                const isSelected = userProfile.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-rose-500 text-white shadow-md'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {isSelected ? '✓ ' : ''}{interest}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        <button
          onClick={handleSave}
          className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-600/30 text-sm"
        >
          Save Profile
        </button>

      </div>
    </div>
  );
};
