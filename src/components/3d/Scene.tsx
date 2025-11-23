import React from 'react';
import { Canvas } from '@react-three/fiber';
import { PresentationControls, Environment, ScrollControls } from '@react-three/drei';
import { Walkman } from './Walkman';
import { MixtapeShelf3D } from './MixtapeShelf3D';
import { MouseZoom } from './MouseZoom';

export const Scene: React.FC = () => {
    return (
        <Canvas
            camera={{ position: [0, 0, 10], fov: 50 }}
            gl={{
                alpha: true,
                antialias: true,
                toneMapping: 2, // ACESFilmicToneMapping for cinematic look
                toneMappingExposure: 1.2
            }}
        >
            {/* Warm ambient base light */}
            <ambientLight intensity={0.4} color="#f4e4d4" />

            {/* Key light - warm from top-right */}
            <directionalLight
                position={[8, 10, 6]}
                intensity={1.2}
                color="#ffd4a3"
                castShadow
            />

            {/* Fill light - cool teal from left */}
            <pointLight
                position={[-8, 5, 4]}
                intensity={0.6}
                color="#4a9bad"
                distance={20}
            />

            {/* Rim light - warm orange from behind */}
            <pointLight
                position={[0, 2, -8]}
                intensity={0.8}
                color="#e07a5f"
                distance={15}
            />

            {/* Accent light - red from bottom for drama */}
            <pointLight
                position={[0, -5, 2]}
                intensity={0.4}
                color="#d62828"
                distance={12}
            />

            {/* Environment for reflections - using local HDR file */}
            <Environment files="/venice_sunset_1k.hdr" />

            {/* Subtle fog for depth */}
            <fog attach="fog" args={['#1a1a1a', 15, 30]} />

            <PresentationControls
                config={{ mass: 0.1, tension: 170 }}
                rotation={[0, 0, 0]}
                polar={[-Math.PI / 3, Math.PI / 3]}
                azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            >
                <Walkman />
            </PresentationControls>

            <ScrollWrapper />
            <MouseZoom />
        </Canvas>
    );
};

import { useThree } from '@react-three/fiber';

const ScrollWrapper: React.FC = () => {
    const { viewport } = useThree();
    const isMobile = viewport.width < 8;

    if (isMobile) {
        return (
            <ScrollControls pages={2} damping={0.2} style={{ zIndex: 0 }}>
                <MixtapeShelf3D />
            </ScrollControls>
        );
    }

    return <MixtapeShelf3D />;
}
