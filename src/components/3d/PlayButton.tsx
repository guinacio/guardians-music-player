import React, { useRef, useState, useMemo } from 'react';
import { Mesh, Shape, ExtrudeGeometry } from 'three';
import { usePlayerStore } from '../../store/usePlayerStore';

interface PlayButtonProps {
    position: [number, number, number];
    rotation?: [number, number, number];
}

export const PlayButton: React.FC<PlayButtonProps> = ({ position, rotation = [0, 0, 0] }) => {
    const meshRef = useRef<Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);
    const { togglePlay, isPlaying } = usePlayerStore();

    // Create trapezoidal shape
    const trapezoidGeometry = useMemo(() => {
        const shape = new Shape();
        const width = 0.25;
        const topWidth = 0.2;
        const height = 0.08;
        
        // Draw trapezoid (wider at bottom, narrower at top)
        shape.moveTo(-width / 2, -height / 2);
        shape.lineTo(width / 2, -height / 2);
        shape.lineTo(topWidth / 2, height / 2);
        shape.lineTo(-topWidth / 2, height / 2);
        shape.lineTo(-width / 2, -height / 2);

        const extrudeSettings = {
            steps: 1,
            depth: 0.15,
            bevelEnabled: true,
            bevelThickness: 0.01,
            bevelSize: 0.01,
            bevelSegments: 2
        };

        return new ExtrudeGeometry(shape, extrudeSettings);
    }, []);

    const handleClick = (e: any) => {
        e.stopPropagation();
        setPressed(true);
        togglePlay();
        setTimeout(() => setPressed(false), 100);
    };

    return (
        <group position={position} rotation={rotation}>
            {/* Trapezoidal button base */}
            <mesh
                ref={meshRef}
                geometry={trapezoidGeometry}
                onClick={handleClick}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={(e) => {
                    e.stopPropagation();
                    setHovered(false);
                    document.body.style.cursor = 'auto';
                }}
                position={[0, 0, pressed ? -0.02 : 0]}
            >
                <meshStandardMaterial
                    color={isPlaying ? '#00ff00' : '#ff6b00'}
                    metalness={0.6}
                    roughness={0.4}
                    emissive={isPlaying ? '#00ff00' : '#ff6b00'}
                    emissiveIntensity={hovered ? 0.4 : 0.1}
                />
            </mesh>

            {/* Button highlight when playing */}
            {isPlaying && (
                <pointLight
                    position={[0, 0, 0.3]}
                    intensity={0.5}
                    distance={1.5}
                    color="#00ff00"
                />
            )}
        </group>
    );
};

