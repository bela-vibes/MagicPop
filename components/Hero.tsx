import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeroProps {
  lang: Language;
}

// Einzelner Buchstabe der auf Cursor-Nähe reagiert
const MagneticLetter: React.FC<{ char: string; mousePos: { x: number; y: number }; index: number }> = ({ char, mousePos, index }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0, rotate: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = mousePos.x - centerX;
    const dy = mousePos.y - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 180;

    if (dist < maxDist) {
      const force = (1 - dist / maxDist) * 18;
      setOffset({
        x: (dx / dist) * force,
        y: (dy / dist) * force * 0.6,
        rotate: (dx / dist) * force * 0.8,
      });
    } else {
      setOffset({ x: 0, y: 0, rotate: 0 });
    }
  }, [mousePos]);

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      animate={{ x: offset.x, y: offset.y, rotate: offset.rotate }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 0.5 }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].hero;
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  // Parallax via Scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // "MAGIC" scrollt langsamer als "POP" → Tiefenwirkung
  const magicY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const popY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%']);
  const subtitleY = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);
  const scrollIndicatorY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);

  // Grain Canvas
  const grainRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let tick = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      tick++;
      if (tick % 3 !== 0) { // nur jeden 3. Frame neu rendern → Performance
        animFrame = requestAnimationFrame(render);
        return;
      }
      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 18; // sehr subtil
      }
      ctx.putImageData(imageData, 0, 0);
      animFrame = requestAnimationFrame(render);
    };
    animFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Mouse tracking nur im Hero
  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

  // Ticker-Inhalt — zweimal für nahtlosen Loop
  const tickerItems = [
    'SET DESIGN',
    'BERLIN',
    'INTERIOR',
    'FOTOGRAFIE',
    'RÄUME',
    'OBJEKTE',
    'GESCHICHTEN',
    'MAGIC POP',
    'INNENARCHITEKTUR',
    'STUDIO',
  ];
  const tickerContent = [...tickerItems, ...tickerItems];

  const magic = 'MAGIC';
  const pop = 'POP';

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Film Grain Overlay — animiertes Canvas */}
      <canvas
        ref={grainRef}
        className="pointer-events-none fixed inset-0 z-[8] mix-blend-overlay opacity-40 dark:opacity-20"
        style={{ willChange: 'contents' }}
      />

      {/* Hauptinhalt */}
      <div className="relative z-[10] px-6 md:px-12 pt-32 md:pt-40 pb-8">

        {/* Intro-Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          className="font-archivo text-[10px] md:text-xs uppercase tracking-[0.3em] text-magic-black/40 dark:text-off-white/40 mb-8 md:mb-10"
        >
          Creative Studio · Berlin
        </motion.div>

        {/* MAGIC — parallax langsamer */}
        <motion.div style={{ y: magicY }} className="overflow-visible">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="font-archivo text-[18vw] md:text-[16vw] lg:text-[14vw] leading-[0.85] tracking-tighter uppercase text-magic-black dark:text-off-white select-none cursor-default"
            style={{ willChange: 'transform' }}
          >
            {magic.split('').map((char, i) => (
              <MagneticLetter key={i} char={char} mousePos={mousePos} index={i} />
            ))}
          </motion.h1>
        </motion.div>

        {/* POP — parallax schneller → Tiefenwirkung */}
        <motion.div style={{ y: popY }} className="overflow-visible">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.19, 1, 0.22, 1] }}
            className="text-right -mt-[2vw] md:-mt-[3vw]"
          >
            <span
              className="font-archivo text-[18vw] md:text-[16vw] lg:text-[14vw] leading-[0.85] tracking-tighter uppercase text-magic-black dark:text-off-white select-none cursor-default"
              style={{ willChange: 'transform' }}
            >
              {pop.split('').map((char, i) => (
                <MagneticLetter key={i} char={char} mousePos={mousePos} index={i + 5} />
              ))}
            </span>
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          style={{ y: subtitleY }}
          className="mt-10 md:mt-14"
        >
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="font-editorial italic text-3xl md:text-5xl text-magic-black/80 dark:text-off-white/80 max-w-md leading-snug"
          >
            {t.subline} <br />
            <span className="font-archivo not-italic text-2xl md:text-4xl uppercase tracking-tight text-magic-orange">
              {t.sublineBold}
            </span>
          </motion.p>
        </motion.div>

        {/* Bottom bar: location + scroll arrow */}
        <div className="mt-10 mb-2 flex justify-between items-end">
          <div className="flex flex-col gap-1 md:gap-2">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-magic-black/30 dark:text-off-white/30">{t.location}</span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-magic-black/30 dark:text-off-white/30">{t.est}</span>
          </div>
          <div
            className="group cursor-pointer flex flex-col items-center gap-2 animate-bounce"
            onClick={() => {
              const projects = document.getElementById('projects');
              if (projects) window.scrollTo({ top: projects.offsetTop - 80, behavior: 'smooth' });
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-magic-black dark:text-off-white group-hover:text-magic-orange transition-colors">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Ticker Marquee */}
      <motion.div
        style={{ y: scrollIndicatorY }}
        className="relative z-[10] mt-8 md:mt-12 overflow-hidden border-t border-b border-magic-black/10 dark:border-off-white/10 py-3"
      >
        <motion.div
          className="flex gap-0 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 28,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {tickerContent.map((item, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="font-archivo text-[10px] md:text-xs uppercase tracking-[0.25em] text-magic-black/30 dark:text-off-white/30 px-6 md:px-10">
                {item}
              </span>
              <span className="text-magic-orange text-[8px]">◆</span>
            </span>
          ))}
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
          50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
        }
        .animate-bounce { animation: bounce 2s infinite; }
      `}</style>
    </section>
  );
};

export default Hero;
