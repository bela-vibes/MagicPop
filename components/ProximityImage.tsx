import React, { useRef, useEffect } from 'react';
import { motion, useSpring } from 'motion/react';

interface ProximityImageProps {
  src: string;
  alt: string;
  className?: string;
  overlayColor?: string;
}

const ProximityImage: React.FC<ProximityImageProps> = ({ src, alt, className, overlayColor }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Springs für smoothe Übergänge (Farbe & Scale)
  const opacity = useSpring(0, { stiffness: 60, damping: 20 });
  const scale = useSpring(1.05, { stiffness: 60, damping: 20 });

  useEffect(() => {
    // SECURITY CHECK: Auf Mobile deaktivieren wir den Effekt komplett.
    // Das spart CPU und verhindert den "White Screen of Death" auf Safari.
    if (window.innerWidth < 768) {
      opacity.set(1); // Direkt Farbe zeigen
      scale.set(1);   // Normaler Scale
      return; 
    }

    let frameId: number;

    const updateProximity = () => {
      if (!containerRef.current) return;

      // Mausposition aus den CSS-Variablen lesen
      const rootStyle = getComputedStyle(document.documentElement);
      const mX = rootStyle.getPropertyValue('--mouse-x');
      
      // Falls die Variable noch nicht gesetzt wurde (Page Load), Loop fortsetzen
      if (!mX || mX.trim() === "") {
        frameId = requestAnimationFrame(updateProximity);
        return;
      }

      const mouseX = parseFloat(mX);
      const mouseY = parseFloat(rootStyle.getPropertyValue('--mouse-y'));

      const rect = containerRef.current.getBoundingClientRect();
      
      // Hotspot: 10% Puffer um das Bild herum
      const paddingX = rect.width * 0.10;
      const paddingY = rect.height * 0.10;

      const isInsideHotspot = 
        mouseX >= rect.left - paddingX &&
        mouseX <= rect.right + paddingX &&
        mouseY >= rect.top - paddingY &&
        mouseY <= rect.bottom + paddingY;

      const intensity = isInsideHotspot ? 1 : 0;
      
      opacity.set(intensity);
      scale.set(1.05 - (intensity * 0.05));

      frameId = requestAnimationFrame(updateProximity);
    };

    frameId = requestAnimationFrame(updateProximity);
    return () => cancelAnimationFrame(frameId);
  }, [opacity, scale]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden rounded-sm ${className}`}>
      <motion.div style={{ scale }} className="w-full h-full will-change-transform">
        {/* Grayscale Layer (Basis) */}
        <img 
          src={src} 
          alt={`${alt} grayscale`}
          className="w-full h-full object-cover grayscale"
          draggable={false}
          loading="lazy"
        />
        
        {/* Color Layer (Überblendung) */}
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 z-10"
        >
          <img 
            src={src} 
            alt={`${alt} color`}
            className="w-full h-full object-cover"
            draggable={false}
          />
          {overlayColor && <div className={`absolute inset-0 ${overlayColor} pointer-events-none`} />}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProximityImage;
