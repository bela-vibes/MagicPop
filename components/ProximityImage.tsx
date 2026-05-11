import React, { useRef, useEffect } from 'react';
import { motion, useSpring, MotionValue } from 'motion/react';

interface ProximityImageProps {
  src: string;
  alt: string;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  className?: string;
  overlayColor?: string;
}

const ProximityImage: React.FC<ProximityImageProps> = ({ src, alt, mouseX, mouseY, className, overlayColor }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Springs for smooth transitions
  const opacity = useSpring(0, { stiffness: 60, damping: 20 });
  const scale = useSpring(1.05, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const updateProximity = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mX = mouseX.get();
      const mY = mouseY.get();
      
      // Hotspot padding: 10% of the image size
      const paddingX = rect.width * 0.10;
      const paddingY = rect.height * 0.10;

      const isInsideHotspot = 
        mX >= rect.left - paddingX &&
        mX <= rect.right + paddingX &&
        mY >= rect.top - paddingY &&
        mY <= rect.bottom + paddingY;

      const intensity = isInsideHotspot ? 1 : 0;
      
      opacity.set(intensity);
      scale.set(1.05 - (intensity * 0.05));
    };

    // Use MotionValue subscriptions to update without re-rendering the component
    const unsubX = mouseX.on("change", updateProximity);
    const unsubY = mouseY.on("change", updateProximity);
    
    updateProximity();

    return () => {
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY, opacity, scale]);

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
