import React from 'react';
import { usePlayerStore, Mixtape } from '../../store/usePlayerStore';
import { Cassette } from './Cassette';
// @ts-ignore
import hookedOnAFeeling from '../../assets/hooked_on_a_feeling.mp3';
// @ts-ignore
import mrBlueSky from '../../assets/mr_blue_sky.mp3';
import { Text } from '@react-three/drei';

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

export const MixtapeShelf3D: React.FC = () => {
    const { loadMixtape, currentMixtape } = usePlayerStore();

    return (
        <group>
            {MOCK_MIXTAPES.map((tape, index) => {
                // Position tapes on left and right sides of the walkman
                const xPos = index === 0 ? -4 : 4; // Left side or right side
                const isSelected = currentMixtape?.id === tape.id;
                
                return (
                    <group key={tape.id} position={[xPos, 0, 0]}>
                        <Cassette
                            position={[0, 0, 0]}
                            rotation={[Math.PI / 2, 0, Math.PI]} // Rotate to stand upright
                            color={tape.color}
                            scale={0.015}
                            onClick={() => loadMixtape(tape)}
                            isSelected={isSelected}
                        />
                        
                        {/* Background plate for text */}
                        <mesh position={[0, -1.8, 0]} rotation={[0, 0, 0]}>
                            <planeGeometry args={[2.5, 0.6]} />
                            <meshStandardMaterial 
                                color={tape.color} 
                                transparent 
                                opacity={0.8}
                                emissive={tape.color}
                                emissiveIntensity={isSelected ? 0.3 : 0.1}
                            />
                        </mesh>
                        
                        {/* Mixtape title */}
                        <Text
                            position={[0, -1.8, 0.05]}
                            fontSize={0.25}
                            color="#ffffff"
                            anchorX="center"
                            anchorY="middle"
                            fontWeight="bold"
                            letterSpacing={0.05}
                            outlineWidth={0.02}
                            outlineColor="#000000"
                        >
                            {tape.title}
                        </Text>
                        
                        {/* Decorative lines */}
                        <mesh position={[0, -2.2, 0]} rotation={[0, 0, 0]}>
                            <boxGeometry args={[2.2, 0.02, 0.02]} />
                            <meshStandardMaterial 
                                color="#ffffff" 
                                emissive="#ffffff"
                                emissiveIntensity={isSelected ? 0.5 : 0.2}
                            />
                        </mesh>
                        
                        {/* Selection indicator */}
                        {isSelected && (
                            <>
                                <mesh position={[-1.6, -1.8, 0.1]} rotation={[0, 0, Math.PI / 4]}>
                                    <boxGeometry args={[0.15, 0.15, 0.02]} />
                                    <meshStandardMaterial 
                                        color="#00ff00" 
                                        emissive="#00ff00"
                                        emissiveIntensity={0.8}
                                    />
                                </mesh>
                                <mesh position={[1.6, -1.8, 0.1]} rotation={[0, 0, Math.PI / 4]}>
                                    <boxGeometry args={[0.15, 0.15, 0.02]} />
                                    <meshStandardMaterial 
                                        color="#00ff00" 
                                        emissive="#00ff00"
                                        emissiveIntensity={0.8}
                                    />
                                </mesh>
                            </>
                        )}
                    </group>
                );
            })}
        </group>
    );
};

