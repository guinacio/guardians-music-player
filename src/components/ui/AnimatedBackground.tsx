import React, { useEffect, useRef } from 'react';

export const AnimatedBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        // Set canvas size - use lower resolution for better performance
        const resizeCanvas = () => {
            const dpr = Math.min(window.devicePixelRatio, 1.5); // Cap at 1.5x for performance
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let gridOffset = 0;
        let animationId: number;
        let lastTime = 0;
        const fps = 30; // Cap at 30 FPS for better performance
        const frameDelay = 1000 / fps;

        // Animation loop - optimized
        const animate = (currentTime: number) => {
            animationId = requestAnimationFrame(animate);
            
            const deltaTime = currentTime - lastTime;
            if (deltaTime < frameDelay) return; // Throttle to 30 FPS
            
            lastTime = currentTime - (deltaTime % frameDelay);

            const w = window.innerWidth;
            const h = window.innerHeight;
            
            ctx.clearRect(0, 0, w, h);

            // Simplified grid
            const gridSize = 60;
            const horizon = h * 0.45;
            
            gridOffset = (gridOffset + 1.5) % gridSize;

            // Draw horizontal lines (less lines, no shadows)
            ctx.strokeStyle = 'rgba(224, 122, 95, 0.25)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let i = horizon; i < h + gridSize; i += gridSize) {
                const y = i - gridOffset;
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
            }
            ctx.stroke();

            // Draw vertical lines (simplified)
            ctx.strokeStyle = 'rgba(74, 155, 173, 0.2)';
            ctx.beginPath();
            const vanishX = w / 2;
            for (let i = -w; i < w * 2; i += gridSize) {
                const x = i - gridOffset;
                ctx.moveTo(vanishX + (x - vanishX) * 0.3, horizon);
                ctx.lineTo(x, h);
            }
            ctx.stroke();

            // Occasional glitch (less frequent)
            if (Math.random() > 0.99) {
                const glitchY = Math.random() * h;
                ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 0, 255, 0.2)' : 'rgba(0, 255, 255, 0.2)';
                ctx.fillRect(0, glitchY, w, 3);
            }
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none'
            }}
        />
    );
};

