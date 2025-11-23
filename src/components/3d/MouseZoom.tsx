import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export const MouseZoom = () => {
    const { camera, gl } = useThree();

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // Only zoom on desktop (when viewport is wide enough)
            // We can check viewport width here or pass a prop.
            // Let's use a simple check based on the canvas clientWidth to be safe, 
            // or just assume this component is only mounted on desktop if we control it in Scene.
            // But checking here is safer.
            if (window.innerWidth < 768) return;

            e.preventDefault();

            // Zoom speed
            const zoomSpeed = 0.002;
            const delta = -e.deltaY * zoomSpeed;

            // 1. Get mouse position in NDC
            const rect = gl.domElement.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            // 2. Unproject to find a point in 3D space
            // We want a vector from camera to the mouse position projected onto the scene
            const vector = new THREE.Vector3(x, y, 0.5);
            vector.unproject(camera);

            // 3. Calculate direction from camera to that point
            const dirToMouse = vector.sub(camera.position).normalize();

            // 4. Calculate movement
            // Scale movement by current distance to origin to keep speed consistent
            const distance = camera.position.length();
            const moveAmount = delta * distance;

            const newPos = camera.position.clone().add(dirToMouse.multiplyScalar(moveAmount));

            // 5. Clamp Z position to prevent clipping or going too far
            // Also clamp X/Y slightly to prevent getting lost in the void
            if (newPos.z < 3) {
                newPos.z = 3;
            } else if (newPos.z > 14) {
                newPos.z = 14;
                // When fully zoomed out, tend to return to center x/y
                newPos.x = newPos.x * 0.9;
                newPos.y = newPos.y * 0.9;
            }

            camera.position.copy(newPos);
        };

        const handleMouseDown = (e: MouseEvent) => {
            // Middle click (button 1) to reset
            if (e.button === 1) {
                e.preventDefault();
                // Reset to initial position
                camera.position.set(0, 0, 10);
                // Also reset rotation if it was changed (though PresentationControls handles rotation separately, 
                // resetting camera position is usually enough for zoom reset)
            }
        };

        const canvas = gl.domElement;
        canvas.addEventListener('wheel', handleWheel, { passive: false });
        canvas.addEventListener('mousedown', handleMouseDown);

        return () => {
            canvas.removeEventListener('wheel', handleWheel);
            canvas.removeEventListener('mousedown', handleMouseDown);
        };
    }, [camera, gl]);

    return null;
};
