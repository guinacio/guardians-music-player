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

  currentTime: number;
  duration: number;

  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  setProgress: (currentTime: number, duration: number) => void;
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
  currentTime: 0,
  duration: 0,

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setVolume: (volume) => set({ volume }),
  setProgress: (currentTime, duration) => set({ currentTime, duration }),

  loadMixtape: (mixtape) => {
    set({
      currentMixtape: mixtape,
      currentTrack: mixtape.tracks[0] || null,
      isPlaying: false, // Auto-play can be optional
      currentTime: 0,
      duration: 0
    });
  },

  playTrack: (track) => set({ currentTrack: track, isPlaying: true, currentTime: 0, duration: 0 }),

  nextTrack: () => {
    const { currentMixtape, currentTrack } = get();
    if (!currentMixtape || !currentTrack) return;

    const currentIndex = currentMixtape.tracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % currentMixtape.tracks.length;
    set({ currentTrack: currentMixtape.tracks[nextIndex], currentTime: 0, duration: 0 });
  },

  prevTrack: () => {
    const { currentMixtape, currentTrack } = get();
    if (!currentMixtape || !currentTrack) return;

    const currentIndex = currentMixtape.tracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + currentMixtape.tracks.length) % currentMixtape.tracks.length;
    set({ currentTrack: currentMixtape.tracks[prevIndex], currentTime: 0, duration: 0 });
  }
}));
