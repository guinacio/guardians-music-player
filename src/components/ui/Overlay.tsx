import React from 'react';
import { usePlayerStore } from '../../store/usePlayerStore';

export const Overlay: React.FC = () => {
    const { currentTrack, isPlaying, currentMixtape } = usePlayerStore();

    return (
        <>
            {/* Header */}
            <div style={{
                position: 'absolute',
                top: '2rem',
                left: '2rem',
                color: '#f4f1de',
                zIndex: 10,
                pointerEvents: 'none',
            }}>
                <h1 style={{ 
                    margin: 0, 
                    fontSize: '3.5rem', 
                    color: '#e07a5f',
                    fontFamily: 'Bebas Neue, sans-serif',
                    letterSpacing: '0.15em',
                    textShadow: `
                        0 0 10px rgba(224, 122, 95, 0.8),
                        0 0 20px rgba(224, 122, 95, 0.5),
                        0 0 30px rgba(224, 122, 95, 0.3),
                        2px 2px 0px rgba(0, 0, 0, 0.5)
                    `,
                    lineHeight: '1'
                }}>
                    GUARDIANS PLAYER
                </h1>
                
                {/* Decorative line */}
                <div style={{
                    width: '120px',
                    height: '3px',
                    background: 'linear-gradient(90deg, #e07a5f 0%, transparent 100%)',
                    marginTop: '0.5rem',
                    boxShadow: '0 0 10px rgba(224, 122, 95, 0.5)'
                }}></div>
                
                <p style={{ 
                    margin: '0.5rem 0 0 0', 
                    opacity: 0.8,
                    fontSize: '0.85rem',
                    letterSpacing: '0.3em',
                    fontFamily: 'Courier Prime, monospace',
                    color: '#4a9bad',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
                }}>
                    TPS-L2 REPLICA
                </p>
            </div>

            {/* Now Playing Card */}
            {currentTrack && (
                <div style={{
                    position: 'absolute',
                    bottom: '2rem',
                    right: '2rem',
                    background: 'rgba(43, 45, 66, 0.85)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(224, 122, 95, 0.4)',
                    borderRadius: '8px',
                    padding: '1.5rem 2rem',
                    minWidth: '280px',
                    boxShadow: `
                        0 8px 32px rgba(0, 0, 0, 0.4),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1),
                        0 0 20px rgba(224, 122, 95, 0.2)
                    `,
                    zIndex: 10,
                    pointerEvents: 'none'
                }}>
                    {/* Mixtape label */}
                    {currentMixtape && (
                        <div style={{
                            fontSize: '0.7rem',
                            color: '#4a9bad',
                            fontFamily: 'Courier Prime, monospace',
                            marginBottom: '0.75rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            opacity: 0.9
                        }}>
                            {currentMixtape.title}
                        </div>
                    )}
                    
                    {/* Track title */}
                    <h2 style={{ 
                        margin: 0, 
                        fontSize: '1.8rem',
                        fontFamily: 'Bebas Neue, sans-serif',
                        letterSpacing: '0.08em',
                        color: '#f4f1de',
                        lineHeight: '1.2',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                    }}>
                        {currentTrack.title}
                    </h2>
                    
                    {/* Artist */}
                    <p style={{ 
                        margin: '0.5rem 0 0 0', 
                        fontFamily: 'Courier Prime, monospace',
                        fontSize: '0.9rem',
                        color: '#d4896a',
                        letterSpacing: '0.05em'
                    }}>
                        {currentTrack.artist}
                    </p>
                    
                    {/* Status indicator */}
                    <div style={{
                        marginTop: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: isPlaying ? '#00ff00' : '#d62828',
                            boxShadow: isPlaying 
                                ? '0 0 10px #00ff00, 0 0 20px rgba(0, 255, 0, 0.5)'
                                : '0 0 10px #d62828',
                            animation: isPlaying ? 'pulse 2s ease-in-out infinite' : 'none'
                        }}></div>
                        <span style={{
                            color: isPlaying ? '#00ff00' : '#d62828',
                            fontWeight: 'bold',
                            fontFamily: 'Courier Prime, monospace',
                            fontSize: '0.85rem',
                            letterSpacing: '0.1em',
                            textShadow: isPlaying 
                                ? '0 0 10px rgba(0, 255, 0, 0.5)' 
                                : 'none'
                        }}>
                            {isPlaying ? '▶ PLAYING' : '⏸ PAUSED'}
                        </span>
                    </div>
                </div>
            )}
            
            {/* Instructions overlay */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                zIndex: 5,
                pointerEvents: 'none',
                opacity: currentTrack ? 0 : 0.6,
                transition: 'opacity 0.5s ease'
            }}>
                <p style={{
                    fontFamily: 'Courier Prime, monospace',
                    fontSize: '1rem',
                    color: '#f4f1de',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
                    letterSpacing: '0.1em'
                }}>
                    ← CLICK A CASSETTE TO BEGIN →
                </p>
            </div>
        </>
    );
};
