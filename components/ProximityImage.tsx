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
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (alwaysColor) return;

    const container = containerRef.current;
    const colorLayer = colorLayerRef.current;
    if (!container || !colorLayer) return;

    const show = () => {
      if (hideTimerRef.current !== null) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      colorLayer.style.transition = 'opacity 0.35s ease';
      colorLayer.style.opacity = '1';
    };

    const hideDesktop = () => {
      colorLayer.style.transition = 'opacity 0.5s ease';
      colorLayer.style.opacity = '0';
    };

    const hideMobile = () => {
      // Delay equals the show-transition duration so the browser has painted
      // opacity:1 before we start the 3 s fade. Without this, iOS fires
      // pointerdown + pointerup in the same task and the transition sees 0→0.
      hideTimerRef.current = setTimeout(() => {
        hideTimerRef.current = null;
        colorLayer.style.transition = 'opacity 3s ease';
        colorLayer.style.opacity = '0';
      }, 400);
    };

    const handlePointerEnter = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') show();
    };
    const handlePointerLeave = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') hideDesktop();
    };
    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') show();
    };
    const handlePointerUp = (e: PointerEvent) => {
      if (e.pointerType === 'touch') hideMobile();
    };
    const handlePointerCancel = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        if (hideTimerRef.current !== null) {
          clearTimeout(hideTimerRef.current);
          hideTimerRef.current = null;
        }
        hideDesktop();
      }
    };

    container.addEventListener('pointerenter', handlePointerEnter);
    container.addEventListener('pointerleave', handlePointerLeave);
    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointercancel', handlePointerCancel);

    return () => {
      if (hideTimerRef.current !== null) clearTimeout(hideTimerRef.current);
      container.removeEventListener('pointerenter', handlePointerEnter);
      container.removeEventListener('pointerleave', handlePointerLeave);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointercancel', handlePointerCancel);
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
