import React from 'react';
import { usePlayerStore } from '../../store/usePlayerStore';
import '../../styles/overlay.css';

export const Overlay: React.FC = () => {
    const { currentTrack, isPlaying, currentMixtape, currentTime, duration } = usePlayerStore();

    const formatTime = (time: number) => {
        if (!time || isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <>
            {/* Header */}
            <div className="overlay-header">
                <h1 className="overlay-title">
                    GUARDIANS PLAYER
                </h1>

                {/* Decorative line */}
                <div className="overlay-line"></div>

                <p className="overlay-subtitle">
                    TPS-L2 REPLICA
                </p>
            </div>

            {/* Now Playing Card */}
            {currentTrack && (
                <div className="now-playing-card">
                    {/* Mixtape label */}
                    {currentMixtape && (
                        <div className="mixtape-label">
                            {currentMixtape.title}
                        </div>
                    )}

                    {/* Track title */}
                    <h2 className="track-title">
                        {currentTrack.title}
                    </h2>

                    {/* Artist */}
                    <p className="track-artist">
                        {currentTrack.artist}
                    </p>

                    {/* Status indicator */}
                    <div className="status-indicator">
                        <div className={`status-dot ${isPlaying ? 'playing' : 'paused'}`}></div>
                        <span className={`status-text ${isPlaying ? 'playing' : 'paused'}`}>
                            {isPlaying ? '▶ PLAYING' : '⏸ PAUSED'}
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="progress-container">
                        <div
                            className="progress-bar"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                        ></div>
                    </div>

                    {/* Time Display */}
                    <div className="time-display">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
            )}

            {/* Instructions overlay */}
            <div
                className="instructions-overlay"
                style={{ opacity: currentTrack ? 0 : 1 }}
            >
                <p className="instructions-text">
                    ← CLICK A CASSETTE TO BEGIN →
                </p>
            </div>
        </>
    );
};
