import React, { useRef, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { Mesh } from 'three';

interface CassetteProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    color?: string;
    scale?: number;
    onClick?: () => void;
    isSelected?: boolean;
}

export const Cassette: React.FC<CassetteProps> = ({ 
    position, 
    rotation = [0, 0, 0],
    color = '#e07a5f', 
    scale = 0.01,
    onClick,
    isSelected = false
}) => {
    const geometry = useLoader(STLLoader, '/tape.stl');
    const meshRef = useRef<Mesh>(null);
    const [hovered, setHovered] = useState(false);

    return (
        <group 
            position={position}
            rotation={rotation}
            scale={scale}
        >
            <mesh 
                ref={meshRef}
                geometry={geometry} 
                onClick={onClick}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial 
                    color={color} 
                    metalness={0.3}
                    roughness={0.4}
                    emissive={hovered ? color : '#000000'}
                    emissiveIntensity={hovered ? 0.3 : 0}
                />
            </mesh>
            {isSelected && (
                <pointLight position={[0, 2, 0]} intensity={0.5} color={color} distance={3} />
            )}
        </group>
    );
};
