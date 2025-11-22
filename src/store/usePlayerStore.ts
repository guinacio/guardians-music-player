import { create } from 'zustand';

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  url: string;
}

export interface Mixtape {
  id: string;
  title: string;
  color: string;
  tracks: Track[];
}

interface PlayerState {
  isPlaying: boolean;
  currentMixtape: Mixtape | null;
  currentTrack: Track | null;
  volume: number;
  
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  loadMixtape: (mixtape: Mixtape) => void;
  playTrack: (track: Track) => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  isPlaying: false,
  currentMixtape: null,
  currentTrack: null,
  volume: 0.5,

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setVolume: (volume) => set({ volume }),
  
  loadMixtape: (mixtape) => {
    set({ 
      currentMixtape: mixtape,
      currentTrack: mixtape.tracks[0] || null,
      isPlaying: false // Auto-play can be optional
    });
  },

  playTrack: (track) => set({ currentTrack: track, isPlaying: true }),
  
  nextTrack: () => {
    const { currentMixtape, currentTrack } = get();
    if (!currentMixtape || !currentTrack) return;
    
    const currentIndex = currentMixtape.tracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % currentMixtape.tracks.length;
    set({ currentTrack: currentMixtape.tracks[nextIndex] });
  },
  
  prevTrack: () => {
    const { currentMixtape, currentTrack } = get();
    if (!currentMixtape || !currentTrack) return;
    
    const currentIndex = currentMixtape.tracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + currentMixtape.tracks.length) % currentMixtape.tracks.length;
    set({ currentTrack: currentMixtape.tracks[prevIndex] });
  }
}));
