import React, { useRef, useEffect } from 'react';

export const BackgroundOverlay = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let animationFrameId;
    let time = 0;

    const mouseRef = { x: 0, y: 0 };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    
    const handleMouseMove = (e) => {
      mouseRef.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Deep black / charcoal background gradient
      const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 1.2);
      grad.addColorStop(0, '#0a0a0a');
      grad.addColorStop(1, '#000000');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // We will render thin vertical lines spanning across the screen width.
      const gap = 18; // Spacing between vertical lines
      const lineCount = Math.floor(w / gap);
      ctx.lineWidth = 1;

      for (let i = 0; i <= lineCount; i++) {
        const bx = i * gap;
        
        // Depth logic: brighter near center, fading out to edges
        const distFromCenter = Math.abs(bx - w / 2) / (w / 2);
        const maxAlpha = 0.35;
        const alpha = Math.max(0.02, maxAlpha - distFromCenter * 0.4);
        
        ctx.strokeStyle = `rgba(230, 230, 235, ${alpha})`;
        ctx.beginPath();
        
        // Draw the vertical line with wave distortion
        for (let y = 0; y <= h; y += 15) {
          const yNormalized = y / h;
          
          // S-shaped wave combinations distorted slightly by mouse position
          const timeOffset = time * 0.4 + mouseRef.x * 0.5;
          const amplitudeDistortion = 1 + mouseRef.y * 0.3;

          const wave1 = Math.sin(yNormalized * Math.PI * 2.5 + timeOffset) * 50 * amplitudeDistortion;
          const wave2 = Math.sin(yNormalized * Math.PI * 1.2 - time * 0.2 - mouseRef.x * 0.3) * 30 * amplitudeDistortion;
          
          const x = bx + wave1 + wave2;

          if (y === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Overlap vignette to softly darken top/bottom/edges deeply
      const vignette = ctx.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w);
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.85)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      time += 0.005; // extremely slow motion, fluid and premium
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-black">
      <canvas ref={canvasRef} className="block w-full h-full opacity-90" />
    </div>
  );
};
