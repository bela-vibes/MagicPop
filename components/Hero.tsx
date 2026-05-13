
import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].hero;
  const textRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!textRef.current) return;
      const x = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
      if (x === undefined || y === undefined) return;
      const rect = textRef.current.getBoundingClientRect();
      const dx = Math.max(rect.left - x, 0, x - rect.right);
      const dy = Math.max(rect.top - y, 0, y - rect.bottom);
      const near = Math.sqrt(dx * dx + dy * dy) < 110;
      textRef.current.style.transition = 'color 0.3s ease';
      textRef.current.style.color = near ? '#F9F7F2' : '';
    };

    const handleTouchEnd = () => {
      if (!textRef.current) return;
      textRef.current.style.transition = 'color 0.5s ease';
      textRef.current.style.color = '';
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
  
  return (
    <section id="hero" className="relative min-h-[100dvh] flex flex-col px-6 md:px-12 pt-28 pb-12 overflow-hidden bg-transparent">
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
