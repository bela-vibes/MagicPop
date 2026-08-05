
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Language } from '../types';
import { TRANSLATIONS, PROJECTS } from '../constants';

// Toggle between the new full-bleed project slideshow (true) and the original
// graphic "Magic / Pop" hero (false). Flip this one line to compare.
export const SLIDESHOW_HERO = true;

const SLIDE_INTERVAL = 4000; // ms between slides

interface HeroProps {
  lang: Language;
  isMobile?: boolean;
  blob1Ref?: React.RefObject<HTMLDivElement | null>;
  blob2Ref?: React.RefObject<HTMLDivElement | null>;
}

const Hero: React.FC<HeroProps> = ({ lang, isMobile = false, blob1Ref, blob2Ref }) => {
  const t = TRANSLATIONS[lang].hero;
  const textRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);

  // Slideshow state
  const slides = useMemo(
    () =>
      PROJECTS.filter(p => p.published !== false)
        .map(p => p.image)
        .filter(src => !src.toLowerCase().endsWith('.mp4'))
        // full-bleed hero wants a sharper image than the 800px grid thumbnail
        .map(src => src.replace('w_800', 'w_1600')),
    []
  );
  const [current, setCurrent] = useState(0);
  const slideLayerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Advance the slideshow
  useEffect(() => {
    if (!SLIDESHOW_HERO || slides.length <= 1) return;
    const id = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [slides.length]);

  // Scroll transition: the image shrinks + fades as the projects rise over it
  useEffect(() => {
    if (!SLIDESHOW_HERO) return;
    let rafId = 0;
    let ticking = false;

    const apply = () => {
      ticking = false;
      // Simple crossfade: the whole hero fades out as the projects scroll in.
      const p = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
      if (slideLayerRef.current) slideLayerRef.current.style.opacity = `${1 - p}`;
      if (contentRef.current) contentRef.current.style.opacity = `${1 - p}`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // ── Original graphic hero: interactive white-on-proximity ──────────────
  // Desktop: white-on-proximity follows the cursor.
  useEffect(() => {
    if (SLIDESHOW_HERO || isMobile) return;
    const handleMove = (e: MouseEvent) => {
      if (!textRef.current) return;
      const rect = textRef.current.getBoundingClientRect();
      const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
      const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
      const near = Math.sqrt(dx * dx + dy * dy) < 110;
      textRef.current.style.transition = 'color 0.3s ease';
      textRef.current.style.color = near ? '#F9F7F2' : '';
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isMobile]);

  // Mobile: the orange text turns white exactly when an orange blob actually
  // sits behind it — driven by the blob's real position, not the finger.
  useEffect(() => {
    if (SLIDESHOW_HERO || !isMobile) return;
    let rafId = 0;
    let last = 0;

    const check = (now: number) => {
      rafId = requestAnimationFrame(check);
      if (now - last < 90) return; // throttle: layout reads are expensive
      last = now;

      const el = textRef.current;
      if (!el) return;
      const tr = el.getBoundingClientRect();

      let overlap = false;
      for (const ref of [blob1Ref, blob2Ref]) {
        const b = ref?.current?.getBoundingClientRect();
        if (!b || b.width === 0) continue;
        const bcx = b.left + b.width / 2;
        const bcy = b.top + b.height / 2;
        const r = b.width / 2; // blob is a circle
        const nx = Math.max(tr.left, Math.min(bcx, tr.right));
        const ny = Math.max(tr.top, Math.min(bcy, tr.bottom));
        const dx = bcx - nx;
        const dy = bcy - ny;
        if (Math.sqrt(dx * dx + dy * dy) < r) { overlap = true; break; }
      }

      el.style.transition = 'color 0.3s ease';
      el.style.color = overlap ? '#F9F7F2' : '';
    };

    rafId = requestAnimationFrame(check);
    return () => cancelAnimationFrame(rafId);
  }, [isMobile, blob1Ref, blob2Ref]);

  // ── New slideshow hero ─────────────────────────────────────────────────
  if (SLIDESHOW_HERO) {
    return (
      <section id="hero" className="relative h-[100svh] overflow-hidden bg-transparent">
        {/* Full-bleed crossfading slideshow */}
        <div
          ref={slideLayerRef}
          className="absolute inset-0 overflow-hidden will-change-transform"
          style={{ transformOrigin: 'center center' }}
        >
          {slides.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              draggable={false}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out"
              style={{ opacity: i === current ? 1 : 0 }}
            />
          ))}
          {/* Scrim: darkens bottom + a touch of top so the tagline and header stay legible */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />
        </div>

        {/* Content overlay */}
        <div
          ref={contentRef}
          className="relative z-10 h-full flex flex-col px-6 md:px-12 pt-28 pb-12 will-change-transform"
        >
          <div className={`${mounted ? 'hero-subline' : 'opacity-0'} mt-auto mb-8 md:mb-4 max-w-4xl`}>
            <p className="font-editorial text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-off-white italic drop-shadow-lg">
              {t.subline} <br />
              <span
                ref={textRef}
                className="font-archivo not-italic text-2xl md:text-4xl lg:text-5xl uppercase tracking-tight inline-block text-magic-orange drop-shadow-lg"
              >
                {t.sublineBold1} <br />
                {t.sublineBold2}
              </span>
            </p>
          </div>

          <div className={`${mounted ? 'hero-footer' : 'opacity-0'} flex justify-between items-end`}>
            <div className="flex flex-col gap-1 md:gap-2">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-off-white/60">{t.location}</span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-off-white/60">{t.est}</span>
            </div>

            {/* Slide indicators */}
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? 'w-6 bg-off-white' : 'w-1.5 bg-off-white/40'}`}
                />
              ))}
            </div>

            <div
              className="group cursor-pointer flex flex-col items-center gap-2 animate-bounce"
              onClick={() => {
                const next = document.getElementById('services');
                if (next) {
                  window.scrollTo({ top: next.offsetTop - 80, behavior: 'smooth' });
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-off-white group-hover:text-magic-orange transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Original graphic hero ──────────────────────────────────────────────
  return (
    <section id="hero" className="relative min-h-[84dvh] md:min-h-[100dvh] flex flex-col px-6 md:px-12 pt-28 pb-12 overflow-hidden bg-transparent">
      <div className="relative z-10 w-full flex-1 flex flex-col">
        <div className="flex-1 flex flex-col justify-start pt-12 md:pt-0">
          <h1 className="font-archivo text-[18vw] md:text-[16vw] leading-[0.8] uppercase tracking-tighter text-magic-black dark:text-off-white flex flex-col select-none pointer-events-none transition-colors duration-500">
            <span className={`${mounted ? 'hero-magic' : 'opacity-0'} relative inline-block`}>
              Magic
            </span>
            <span className={`${mounted ? 'hero-pop' : 'opacity-0'} text-right -mt-[2vw] md:-mt-[3vw] relative inline-block`}>
              Pop
            </span>
          </h1>
        </div>

        <div className={`${mounted ? 'hero-subline' : 'opacity-0'} mt-auto md:mt-4 mb-8 md:mb-4 max-w-4xl relative z-20`}>
          <p className="font-editorial text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-magic-black dark:text-off-white italic">
            {t.subline} <br />
            <span
              ref={textRef}
              className="font-archivo not-italic text-2xl md:text-4xl lg:text-5xl uppercase tracking-tight cursor-default inline-block text-magic-orange"
            >
              {t.sublineBold1} <br />
              {t.sublineBold2}
            </span>
          </p>
        </div>
      </div>

      <div className={`${mounted ? 'hero-footer' : 'opacity-0'} mt-auto flex justify-between items-end relative z-10`}>
        <div className="flex flex-col gap-1 md:gap-2">
           <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-magic-black/30 dark:text-off-white/30">{t.location}</span>
           <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-magic-black/30 dark:text-off-white/30">{t.est}</span>
        </div>

        {/* Reverted Scroll Arrow */}
        <div
          className="group cursor-pointer flex flex-col items-center gap-2 animate-bounce"
          onClick={() => {
            const projects = document.getElementById('projects');
            if (projects) {
              window.scrollTo({ top: projects.offsetTop - 80, behavior: 'smooth' });
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-magic-black dark:text-off-white group-hover:text-magic-orange transition-colors">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
