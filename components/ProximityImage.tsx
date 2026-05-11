import React, { useRef, useEffect } from 'react';
import { motion, useSpring } from 'motion/react';

interface ProximityImageProps {
  src: string;
  alt: string;
  mousePos: { x: number; y: number };
  className?: string;
  overlayColor?: string;
  /** Narrow layouts: always full color, one image (no grayscale / proximity). */
  alwaysColor?: boolean;
}

const ProximityImage: React.FC<ProximityImageProps> = ({
  src,
  alt,
  mousePos,
  className,
  overlayColor,
  alwaysColor,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Springs for smooth transitions
  const opacity = useSpring(0, { stiffness: 60, damping: 20 });
  const scale = useSpring(1.05, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (alwaysColor) return;

    const updateProximity = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      // Hotspot padding: 10% of the image size
      const paddingX = rect.width * 0.1;
      const paddingY = rect.height * 0.1;

      const isInsideHotspot =
        mousePos.x >= rect.left - paddingX &&
        mousePos.x <= rect.right + paddingX &&
        mousePos.y >= rect.top - paddingY &&
        mousePos.y <= rect.bottom + paddingY;

      const intensity = isInsideHotspot ? 1 : 0;

      opacity.set(intensity);
      scale.set(1.05 - intensity * 0.05);
    };

    updateProximity();
  }, [mousePos, opacity, scale, alwaysColor]);

  if (alwaysColor) {
    return (
      <div ref={containerRef} className={`relative overflow-hidden rounded-sm ${className}`}>
        <div className="relative w-full h-full">
          <img src={src} alt={alt} className="w-full h-full object-cover" draggable={false} />
          {overlayColor && <div className={`absolute inset-0 ${overlayColor} pointer-events-none`} />}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden rounded-sm ${className}`}>
      <motion.div style={{ scale }} className="w-full h-full">
        {/* Grayscale Layer (Static) */}
        <img 
          src={src} 
          alt={`${alt} grayscale`}
          className="w-full h-full object-cover grayscale"
          draggable={false}
        />
        
        {/* Color Layer (Animated Opacity) */}
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
