import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface TapeWheelProps {
    position: [number, number, number];
    isPlaying: boolean;
    speed?: number;
}

export const TapeWheel: React.FC<TapeWheelProps> = ({ position, isPlaying, speed = 1 }) => {
    const wheelRef = useRef<Group>(null);

    useFrame(() => {
        if (wheelRef.current && isPlaying) {
            wheelRef.current.rotation.z += 0.1 * speed;
        }
    });

    return (
        <group position={position} ref={wheelRef}>
            {/* Main wheel disk with hole (torus/ring shape) */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <torusGeometry args={[0.12, 0.04, 16, 32]} />
                <meshStandardMaterial 
                    color="#2a2a2a"
                    metalness={0.3}
                    roughness={0.7}
                />
            </mesh>

            {/* Brown magnetic tape layer */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <torusGeometry args={[0.1, 0.035, 16, 32]} />
                <meshStandardMaterial 
                    color="#4a3a2a"
                    metalness={0.1}
                    roughness={0.9}
                />
            </mesh>

            {/* Inward-pointing teeth/splines around inner edge (like real cassette wheel) */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
                const angle = (i * Math.PI * 2) / 10;
                const innerRadius = 0.08; // Inner edge of torus
                const toothLength = 0.03; // How far teeth extend inward (larger)
                const toothWidth = 0.015; // Wider teeth
                const toothHeight = 0.04; // Taller teeth
                
                return (
                    <mesh 
                        key={i}
                        position={[
                            Math.cos(angle) * (innerRadius - toothLength / 2),
                            Math.sin(angle) * (innerRadius - toothLength / 2),
                            0
                        ]}
                        rotation={[0, 0, angle + Math.PI / 2]}
                    >
                        <boxGeometry args={[toothWidth, toothLength, toothHeight]} />
                        <meshStandardMaterial 
                            color="#5a5a5a"
                            metalness={0.5}
                            roughness={0.5}
                        />
                    </mesh>
                );
            })}
        </group>
    );
};
