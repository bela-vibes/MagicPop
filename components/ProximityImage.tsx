import React, { useRef, useEffect } from 'react';
import { motion, useSpring } from 'motion/react';

interface ProximityImageProps {
  src: string;
  alt: string;
  /** Always-updated pointer (incl. touch); avoids React re-renders on every move. */
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  className?: string;
  overlayColor?: string;
}

const ProximityImage: React.FC<ProximityImageProps> = ({ src, alt, pointerRef, className, overlayColor }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const intersectingRef = useRef(true);

  // Springs for smooth transitions
  const opacity = useSpring(0, { stiffness: 60, damping: 20 });
  const scale = useSpring(1.05, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        intersectingRef.current = e.isIntersecting;
      },
      { rootMargin: '80px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      const el = containerRef.current;
      if (el && intersectingRef.current) {
        const rect = el.getBoundingClientRect();
        const { x, y } = pointerRef.current;

        const paddingX = rect.width * 0.1;
        const paddingY = rect.height * 0.1;

        const isInsideHotspot =
          x >= rect.left - paddingX &&
          x <= rect.right + paddingX &&
          y >= rect.top - paddingY &&
          y <= rect.bottom + paddingY;

        const intensity = isInsideHotspot ? 1 : 0;
        opacity.set(intensity);
        scale.set(1.05 - intensity * 0.05);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pointerRef, opacity, scale]);

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
        <motion.div style={{ opacity }} className="absolute inset-0 z-10">
          <img src={src} alt={`${alt} color`} className="w-full h-full object-cover" draggable={false} />
          {overlayColor && <div className={`absolute inset-0 ${overlayColor} pointer-events-none`} />}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProximityImage;
