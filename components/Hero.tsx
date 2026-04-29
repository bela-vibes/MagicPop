
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeroProps {
  lang: Language;
}

const PROJECT_IMAGES = [
  'https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775653742/060625_SonyMusic-0324_144dpi_SCREEN_uk7ozb.jpg',
  'https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775379766/250807_LOQI_TravelRetail_Katjes2_rohnmt.jpg',
  'https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773247515/lowe_2_Kopie_xqmf6g.jpg',
  'https://res.cloudinary.com/dpe3jvf3e/image/upload/v1775457660/ezgif-1bdb65971b5e9ce5_xb4jej.gif',
  'https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773297077/HANA_-_Interior_-_Detail_-_c_Steffen_Sinzinger_Content_Communication_-_241102_-13_vsmruo.jpg',
  'https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775457440/Bildschirmfoto_2024-04-29_um_09.46.26.png_fcivma.webp',
  'https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773390421/2024-magic-pop-setdesign-endspiel-interior-2_iv6y1h.png',
  'https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775553750/250120_FL_Alle_Momox_ILV_3_i4phy8.jpg'
];

const MOBILE_PROJECT_IMAGES = [
  'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800'
];

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].hero;
  const [currentImage, setCurrentImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const images = isMobile ? MOBILE_PROJECT_IMAGES : PROJECT_IMAGES;
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000); // 6 seconds display time
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  const activeImages = isMobile ? MOBILE_PROJECT_IMAGES : PROJECT_IMAGES;
  
  return (
    <section id="hero" className="relative min-h-[100dvh] flex flex-col px-6 md:px-12 pt-28 pb-12 overflow-hidden bg-transparent">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-magic-orange/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-magic-blue/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full flex-1 flex flex-col justify-center items-center">
        <div className="relative w-full max-w-[1600px] h-full flex flex-col justify-center items-center">
          {/* Centered Composition Container */}
          <div className="relative w-full max-w-[340px] md:max-w-[720px] lg:max-w-[850px] px-0 md:px-0">
            {/* Slideshow Window */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
              className="relative w-full aspect-[3/4] md:aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden bg-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] ring-1 ring-magic-black/5 dark:ring-white/5 group"
            >
              <AnimatePresence initial={false}>
                <motion.img
                  key={currentImage}
                  src={activeImages[currentImage % activeImages.length]}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1.05 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-magic-black/20 pointer-events-none" />
              <div className="absolute inset-0 bg-magic-black/10 mix-blend-overlay pointer-events-none" />
              
              <div className="absolute bottom-6 right-6 w-8 h-8 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </div>
            </motion.div>

            {/* Typography Overlay - Adjusted for better tablet and desktop frame fit */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
              className="absolute top-1/2 left-5 md:left-0 -translate-y-[45%] md:-translate-x-[10%] lg:-translate-x-[25%] z-30 pointer-events-none w-max"
            >
              <div className="flex flex-col">
                <h1 className="font-editorial text-3xl md:text-4xl lg:text-[3vw] leading-[0.9] text-magic-black dark:text-off-white italic transition-colors duration-500 mix-blend-difference invert dark:invert-0 drop-shadow-[0_2px_15px_rgba(0,0,0,0.6)]">
                  {t.subline}
                </h1>
                <div className="flex flex-col mt-2 md:mt-4">
                  <motion.span 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="font-archivo not-italic text-lg/tight md:text-3xl lg:text-[2.6vw] uppercase tracking-tighter text-magic-orange block drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
                  >
                    {t.sublineBold1}
                  </motion.span>
                  <motion.span 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="font-archivo not-italic text-lg/tight md:text-3xl lg:text-[2.6vw] uppercase tracking-tighter text-magic-orange block drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
                  >
                    {t.sublineBold2}
                  </motion.span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
      
      {/* Footer Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-auto flex justify-between items-end pt-12"
      >
        <div className="flex flex-col gap-1 md:gap-2">
           <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-magic-black/30 dark:text-off-white/30">{t.location}</span>
           <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-magic-black/30 dark:text-off-white/30">{t.est}</span>
        </div>
        
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
