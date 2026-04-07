
import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].hero;
  
  return (
    <section id="hero" className="relative min-h-screen flex flex-col px-6 md:px-12 pt-28 pb-12 overflow-hidden bg-transparent">
      {/* Background Graphic Elements - subtle grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-0 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="relative z-10 w-full flex-1 flex flex-col">
        <div className="flex-1 flex flex-col justify-start pt-12 md:pt-0">
          <h1 className="font-archivo text-[20vw] md:text-[18vw] leading-[0.8] uppercase tracking-tighter text-magic-black dark:text-off-white flex flex-col select-none pointer-events-none transition-colors duration-500">
            <motion.span 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
              className="relative inline-block"
            >
              Magic
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="text-right -mt-[2vw] md:-mt-[3vw] relative inline-block"
            >
              Pop
            </motion.span>
          </h1>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="mt-auto md:mt-4 mb-12 md:mb-8 max-w-4xl relative z-20"
        >
          <p className="font-editorial text-3xl md:text-6xl leading-[1.1] text-magic-black dark:text-off-white italic">
            {t.subline} <br />
            <span className="font-archivo not-italic text-2xl md:text-5xl uppercase tracking-tight text-magic-orange">
              {t.sublineBold}
            </span>
          </p>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-auto flex justify-between items-end relative z-10"
      >
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
      </motion.div>
    </section>
  );
};

export default Hero;
