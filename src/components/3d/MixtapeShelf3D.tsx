import React, { useMemo } from 'react';
import { usePlayerStore, Mixtape } from '../../store/usePlayerStore';
import { Cassette } from './Cassette';
import { TapeWheel } from './TapeWheel';
// @ts-ignore
import hookedOnAFeeling from '../../assets/hooked_on_a_feeling.mp3';
// @ts-ignore
import mrBlueSky from '../../assets/mr_blue_sky.mp3';
import { Text } from '@react-three/drei';
import { CanvasTexture } from 'three';

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

// Create aggressive steel wool brushed metal texture
const createBrushedMetalTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Base metal color - darker steel gray
    ctx.fillStyle = '#7a7f88';
    ctx.fillRect(0, 0, 512, 128);

    // Heavy steel wool scratches - many more lines
    for (let i = 0; i < 400; i++) {
        const y = Math.random() * 128;
        const opacity = Math.random() * 0.4 + 0.15;
        const isDark = Math.random() > 0.6;
        
        // More dramatic dark and light scratches
        ctx.strokeStyle = isDark 
            ? `rgba(30, 35, 40, ${opacity})` 
            : `rgba(200, 210, 220, ${opacity})`;
        ctx.lineWidth = Math.random() * 2 + 0.2;
        ctx.beginPath();
        ctx.moveTo(0, y);
        
        // Slightly wavy lines like real steel wool scratches
        for (let x = 0; x < 512; x += 20) {
            const wave = Math.sin(x * 0.1 + i) * 0.5;
            ctx.lineTo(x, y + wave);
        }
        ctx.lineTo(512, y);
        ctx.stroke();
    }

    // Add deeper scratch marks
    for (let i = 0; i < 50; i++) {
        const y = Math.random() * 128;
        ctx.strokeStyle = `rgba(40, 45, 50, ${Math.random() * 0.6 + 0.3})`;
        ctx.lineWidth = Math.random() * 3 + 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
    }

    // Aggressive noise for rough texture
    const imageData = ctx.getImageData(0, 0, 512, 128);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 30;
        data[i] += noise;     // R
        data[i + 1] += noise; // G
        data[i + 2] += noise; // B
    }
    ctx.putImageData(imageData, 0, 0);

    return new CanvasTexture(canvas);
};

export const MixtapeShelf3D: React.FC = () => {
    const { loadMixtape, currentMixtape, isPlaying } = usePlayerStore();
    
    // Create brushed metal texture once
    const metalTexture = useMemo(() => createBrushedMetalTexture(), []);

    return (
        <group>
            {MOCK_MIXTAPES.map((tape, index) => {
                // Position tapes on left and right sides of the walkman
                const xPos = index === 0 ? -4 : 4; // Left side or right side
                const isSelected = currentMixtape?.id === tape.id;
                
                return (
                    <group key={tape.id} position={[xPos, 0, 0]}>
                        {/* Group cassette and wheels together so they scale together when selected */}
                        <group scale={isSelected ? 1.2 : 1}>
                            <Cassette
                                position={[0, 0, 0]}
                                rotation={[Math.PI / 2, 0, Math.PI]} // Rotate to stand upright
                                color={tape.color}
                                scale={0.015}
                                onClick={() => loadMixtape(tape)}
                                isSelected={isSelected}
                            />
                            
                            {/* Tape wheels inside cassette holes */}
                            <TapeWheel 
                                position={[-0.43, -0.8, 0]} 
                                isPlaying={isSelected && isPlaying}
                                speed={1}
                            />
                            <TapeWheel 
                                position={[0.19, -0.8, 0]}
                                isPlaying={isSelected && isPlaying}
                                speed={1.2}
                            />
                        </group>
                        
                        {/* Background plate for text - brushed metal */}
                        <mesh position={[0, -1.8, 0]} rotation={[0, 0, 0]}>
                            <planeGeometry args={[3.2, 0.6]} />
                            <meshStandardMaterial 
                                map={metalTexture}
                                color="#ffffff"
                                roughness={0.6}
                                metalness={0.75}
                            />
                        </mesh>
                        
                        {/* Metal label border - darker gray */}
                        <mesh position={[0, -1.8, -0.01]} rotation={[0, 0, 0]}>
                            <planeGeometry args={[3.3, 0.7]} />
                            <meshStandardMaterial 
                                color="#3a3e45"
                                roughness={0.7}
                                metalness={0.7}
                            />
                        </mesh>
                        
                        {/* Mixtape title - engraved look on metal */}
                        <Text
                            position={[0, -1.8, 0.05]}
                            fontSize={0.25}
                            color="#2a2e35"
                            anchorX="center"
                            anchorY="middle"
                            fontWeight="bold"
                            letterSpacing={0.05}
                            outlineWidth={0.015}
                            outlineColor="#d0d5dd"
                        >
                            {tape.title}
                        </Text>
                        
                        {/* Metal corner pins/screws */}
                        <mesh position={[-1.5, -1.5, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
                            <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
                            <meshStandardMaterial 
                                color="#6b7280"
                                metalness={0.9}
                                roughness={0.3}
                            />
                        </mesh>
                        <mesh position={[1.5, -1.5, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
                            <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
                            <meshStandardMaterial 
                                color="#6b7280"
                                metalness={0.9}
                                roughness={0.3}
                            />
                        </mesh>
                        <mesh position={[-1.5, -2.1, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
                            <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
                            <meshStandardMaterial 
                                color="#6b7280"
                                metalness={0.9}
                                roughness={0.3}
                            />
                        </mesh>
                        <mesh position={[1.5, -2.1, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
                            <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
                            <meshStandardMaterial 
                                color="#6b7280"
                                metalness={0.9}
                                roughness={0.3}
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

