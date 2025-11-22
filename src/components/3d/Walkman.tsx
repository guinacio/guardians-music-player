import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { useGLTF, Center } from '@react-three/drei';
import { usePlayerStore } from '../../store/usePlayerStore';
import { PlayButton } from './PlayButton';

export const Walkman: React.FC = () => {
    const groupRef = useRef<Group>(null);
    const { isPlaying } = usePlayerStore();
    const { scene } = useGLTF('/walkman_tps-l2_sony.glb');

    useFrame((state) => {
        if (groupRef.current && isPlaying) {
            // Subtle vibration/jitter when playing
            groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 20) * 0.002;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            <Center>
                <primitive object={scene} scale={0.005} rotation={[0, 0, 0]} />
            </Center>
            
            {/* Play button positioned on the walkman's control panel */}
            <PlayButton 
                position={[-0.34, 1.26, 0.06]} 
                rotation={[2 * Math.PI, 0, 0]} 
            />
        </group>
    );
};
