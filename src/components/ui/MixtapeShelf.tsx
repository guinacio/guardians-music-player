import React from 'react';
import { usePlayerStore, Mixtape } from '../../store/usePlayerStore';
// @ts-ignore
import hookedOnAFeeling from '../../assets/hooked_on_a_feeling.mp3';
// @ts-ignore
import mrBlueSky from '../../assets/mr_blue_sky.mp3';

const MOCK_MIXTAPES: Mixtape[] = [
    {
        id: '1',
        title: 'Awesome Mix Vol. 1',
        color: '#e07a5f',
        tracks: [
            { id: 't1', title: 'Hooked on a Feeling', artist: 'Blue Swede', duration: 172, url: hookedOnAFeeling },
        ]
    },
    {
        id: '2',
        title: 'Awesome Mix Vol. 2',
        color: '#3d5a80',
        tracks: [
            { id: 't3', title: 'Mr. Blue Sky', artist: 'Electric Light Orchestra', duration: 303, url: mrBlueSky },
        ]
    }
];

export const MixtapeShelf: React.FC = () => {
    const { loadMixtape, currentMixtape } = usePlayerStore();

    return (
        <div style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '1rem',
            zIndex: 10
        }}>
            {MOCK_MIXTAPES.map((tape) => (
                <div
                    key={tape.id}
                    onClick={() => loadMixtape(tape)}
                    style={{
                        width: '120px',
                        height: '180px',
                        backgroundColor: tape.color,
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.5rem',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                        border: currentMixtape?.id === tape.id ? '2px solid #fff' : 'none',
                        transform: currentMixtape?.id === tape.id ? 'translateY(-10px)' : 'none',
                        transition: 'transform 0.2s'
                    }}
                >
                    <div style={{
                        width: '100%',
                        height: '60px',
                        backgroundColor: '#f4f1de',
                        marginBottom: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center'
                    }}>
                        <span style={{
                            fontFamily: 'Courier Prime, monospace',
                            fontSize: '0.7rem',
                            color: '#1a1a1a',
                            fontWeight: 'bold'
                        }}>
                            {tape.title}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};
