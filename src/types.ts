export interface Profile {
  id: string;
  name: string;
  age: number;
  gender: 'female' | 'male' | 'non-binary';
  location: string;
  distanceKm: number;
  bio: string;
  avatar: string;
  videoPoster?: string;
  interests: string[];
  isOnline: boolean;
  verified: boolean;
  languages: string[];
  occupation?: string;
  zodiac?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'partner' | 'system';
  text: string;
  timestamp: string;
  type?: 'text' | 'voice' | 'image' | 'gift' | 'icebreaker';
  mediaUrl?: string;
  giftName?: string;
}

export interface MatchingFilters {
  gender: 'all' | 'female' | 'male';
  minAge: number;
  maxAge: number;
  maxDistanceKm: number;
  interests: string[];
  region: string;
  hasVideoOnly: boolean;
}

export interface UserProfile {
  name: string;
  age: number;
  gender: 'female' | 'male' | 'non-binary';
  bio: string;
  avatar: string;
  interests: string[];
  location: string;
  coins: number;
  likesRemaining: number;
}
