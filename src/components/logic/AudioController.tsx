import React, { useEffect, useRef } from 'react';
import { usePlayerStore } from '../../store/usePlayerStore';

export const AudioController: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isPlaying, currentTrack, volume, nextTrack, pause, setProgress, seekRequest, seekTo, clearSeekRequest } = usePlayerStore();

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.preload = 'auto';

    const handleEnded = () => {
      pause();
      seekTo(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    };

    const handleError = (e: Event) => {
      console.error("Audio playback error:", e);
      pause();
    };

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setProgress(audioRef.current.currentTime, audioRef.current.duration || 0);
      }
    };

    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        const duration = audioRef.current.duration;
        if (duration && !isNaN(duration) && duration !== Infinity) {
          setProgress(audioRef.current.currentTime, duration);
        }
      }
    };

    const handleLoadedData = () => {
      if (audioRef.current) {
        const duration = audioRef.current.duration;
        if (duration && !isNaN(duration) && duration !== Infinity) {
          setProgress(audioRef.current.currentTime, duration);
        }
      }
    };

    audioRef.current.addEventListener('ended', handleEnded);
    audioRef.current.addEventListener('error', handleError);
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioRef.current.addEventListener('loadeddata', handleLoadedData);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.removeEventListener('loadeddata', handleLoadedData);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [nextTrack, pause, setProgress, seekTo]);

  // Handle Seek Request
  useEffect(() => {
    if (audioRef.current && seekRequest !== null) {
      audioRef.current.currentTime = seekRequest;
      clearSeekRequest();
    }
  }, [seekRequest, clearSeekRequest]);

  // Handle Track Changes
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    if (audioRef.current.src !== currentTrack.url) {
      audioRef.current.src = currentTrack.url;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Play failed:", e));
      }
    }
  }, [currentTrack]);

  // Handle Play/Pause
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Play failed:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  // Handle Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return null; // Headless component
};
