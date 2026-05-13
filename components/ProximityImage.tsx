import React, { useRef, useEffect } from 'react';

interface ProximityImageProps {
  src: string;
  alt: string;
  mousePos?: { x: number; y: number }; // kept for API compat, not used internally
  className?: string;
  overlayColor?: string;
  /** Always show full color, skip grayscale entirely. */
  alwaysColor?: boolean;
  /** Mark as LCP image — sets fetchpriority="high" and loading="eager". */
  priority?: boolean;
}

const ProximityImage: React.FC<ProximityImageProps> = ({
  src,
  alt,
  className,
  overlayColor,
  alwaysColor,
  priority = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const colorLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (alwaysColor) return;

    const container = containerRef.current;
    const colorLayer = colorLayerRef.current;
    if (!container || !colorLayer) return;

    const show = () => {
      colorLayer.style.transition = 'opacity 0.35s ease';
      colorLayer.style.opacity = '1';
    };
    const hide = () => {
      colorLayer.style.transition = 'opacity 2s ease';
      colorLayer.style.opacity = '0';
    };
    const hideDelayed = () => setTimeout(hide, 600);

    // Desktop
    container.addEventListener('mouseenter', show);
    container.addEventListener('mouseleave', hide);
    // Mobile touch
    container.addEventListener('touchstart', show, { passive: true });
    container.addEventListener('touchend', hideDelayed, { passive: true });
    container.addEventListener('touchcancel', hide, { passive: true });

    return () => {
      container.removeEventListener('mouseenter', show);
      container.removeEventListener('mouseleave', hide);
      container.removeEventListener('touchstart', show);
      container.removeEventListener('touchend', hideDelayed);
      container.removeEventListener('touchcancel', hide);
    };
  }, [alwaysColor]);

  if (alwaysColor) {
    return (
      <div ref={containerRef} className={`relative overflow-hidden rounded-sm ${className}`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          draggable={false}
          fetchPriority={priority ? 'high' : 'auto'}
          loading={priority ? 'eager' : undefined}
        />
        {overlayColor && <div className={`absolute inset-0 ${overlayColor} pointer-events-none`} />}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden rounded-sm ${className}`}>
      {/* Grayscale base */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover grayscale"
        draggable={false}
        fetchPriority={priority ? 'high' : 'auto'}
        loading={priority ? 'eager' : undefined}
      />

      {/* Color layer — fades in on hover/touch */}
      <div
        ref={colorLayerRef}
        className="absolute inset-0 z-10"
        style={{ opacity: 0, willChange: 'opacity' }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          draggable={false}
          fetchPriority={priority ? 'high' : 'auto'}
          loading={priority ? 'eager' : undefined}
        />
        {overlayColor && <div className={`absolute inset-0 ${overlayColor} pointer-events-none`} />}
      </div>
    </div>
  );
};

export default ProximityImage;
