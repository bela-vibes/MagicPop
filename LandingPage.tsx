import React, { useState, useEffect, useRef, memo } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectsGrid from './components/ProjectsGrid';
import Section from './components/Section';
import { Language, Project } from './types';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { TRANSLATIONS, PROJECTS, CONTACT_EMAIL, CONTACT_PHONE } from './constants';
import Impressum from './components/Impressum';
import Datenschutz from './components/Datenschutz';
import ProximityImage from './components/ProximityImage';

import { Mail, Phone } from 'lucide-react';

interface BrandItemProps {
  brand: string;
  index: number;
  scrollYProgress: any;
}

// Memoize sections to prevent re-renders when motion values change
const MemoizedHeader = memo(Header);
const MemoizedHero = memo(Hero);
const MemoizedProjectsGrid = memo(ProjectsGrid);
const MemoizedSection = memo(Section);

const BrandMarquee = memo(({ title }: { title: string }) => {
  const brands = ["LOQI", "Paul Kalkbrenner", "Dussmann", "Arte", "Momox", "Biteaway", "Cornelsen", "I Like Visuals", "Studio Stellar"];
  
  return (
    <section className="px-6 md:px-12 py-12 md:py-32 overflow-hidden bg-transparent">
      <div className="mb-10 md:mb-16">
        <h3 className="font-editorial text-2xl md:text-4xl lg:text-5xl italic text-magic-black dark:text-off-white leading-[1.1]">
          {title}
        </h3>
      </div>

      <div className="relative flex overflow-hidden py-10 -mx-6 md:-mx-12">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-x-20 md:gap-x-30 whitespace-nowrap pr-20 md:pr-40"
        >
          {/* Erster Satz Icons/Marken */}
          {[...brands, ...brands].map((brand, i) => (
            <span 
              key={`${brand}-${i}`} 
              className="font-archivo text-4xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-magic-black/90 dark:text-off-white/90 select-none cursor-default"
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

const LandingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lang, setLang] = useState<Language>('de');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Use MotionValues for physics-based animations without triggering React re-renders
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const blob1X = useMotionValue(0);
  const blob1Y = useMotionValue(0);
  const blob2X = useMotionValue(0);
  const blob2Y = useMotionValue(0);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const requestRef = useRef<number>(null);
  const sectionOffsets = useRef<{ [key: string]: number }>({});

  // Reset title when on landing page
  useEffect(() => {
    document.title = "magicpop | creative studio";
  }, []);

  // Effect to handle routing/overlays based on URL path
  useEffect(() => {
    const path = location.pathname;
    
    if (path === '/impressum' || path === '/datenschutz' || path === '/') {
      setSelectedProject(null);
    } else {
      const slug = path.substring(1); // remove leading slash
      const project = PROJECTS.find(p => p.slug === slug);
      if (project) {
        setSelectedProject(project);
      } else if (path !== '/styleguide') {
        // Only navigate home if it's not the styleguide (which is a separate page)
        navigate('/');
      }
    }
  }, [location.pathname, navigate]);
  
  // Effect to handle inner-page scrolling when coming from a sub-route
  useEffect(() => {
    if (location.hash && location.pathname === '/') {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Small delay to ensure the overlay has started closing and Layout is ready
        const timer = setTimeout(() => {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [location.hash, location.pathname]);

  const [scrollTheme, setScrollTheme] = useState({
    bg: 'bg-transparent',
    text: 'text-magic-black dark:text-off-white',
    shadow: '',
    blobColor: 'bg-magic-orange'
  });

  const headerTheme = selectedProject
    ? { bg: 'bg-magic-orange', text: 'text-white', shadow: 'dark:shadow-[0_10px_40px_-10px_rgba(255,77,0,0.6)]', blobColor: 'bg-magic-orange' }
    : scrollTheme;

  const t = TRANSLATIONS[lang] || TRANSLATIONS.de;

  useEffect(() => {
    const updateOffsets = () => {
      const ids = ['services', 'projects', 'about', 'contact'];
      const offsets: { [key: string]: number } = {};
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) offsets[id] = el.offsetTop;
      });
      sectionOffsets.current = offsets;
    };

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    
    updateOffsets();
    checkMobile();
    
    window.addEventListener('resize', () => {
      updateOffsets();
      checkMobile();
    });
    
    const timer = setTimeout(updateOffsets, 1000);
    
    return () => {
      window.removeEventListener('resize', () => {
        updateOffsets();
        checkMobile();
      });
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });
    
    if (mouseX.get() === -500) {
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 2);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, [mouseX, mouseY]);

  // Blob animation loop - updates MotionValues directly (bypass React state)
  useEffect(() => {
    let time = 0;
    let animationFrameId: number;

    const animateBlobs = () => {
      time += 0.01;
      const driftX = Math.sin(time * 0.5) * 20;
      const driftY = Math.cos(time * 0.3) * 20;

      const mX = mouseX.get();
      const mY = mouseY.get();

      // Get current positions
      const b1X = blob1X.get();
      const b1Y = blob1Y.get();
      const b2X = blob2X.get();
      const b2Y = blob2Y.get();

      // Smooth interpolation
      blob1X.set(b1X + (mX + driftX - b1X) * 0.06);
      blob1Y.set(b1Y + (mY + driftY - b1Y) * 0.06);
      blob2X.set(b2X + (mX - driftX - b2X) * 0.03);
      blob2Y.set(b2Y + (mY - driftY - b2Y) * 0.03);

      animationFrameId = requestAnimationFrame(animateBlobs);
    };
    animationFrameId = requestAnimationFrame(animateBlobs);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mouseX, mouseY, blob1X, blob1Y, blob2X, blob2Y]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 400;
      const offsets = sectionOffsets.current;

      if (offsets.contact && scrollPos >= offsets.contact) {
        setScrollTheme(prev => prev.bg === 'bg-magic-pink' ? prev : { bg: 'bg-magic-pink', text: 'text-magic-black', shadow: 'dark:shadow-[0_10px_40px_-10px_rgba(255,183,213,0.6)]', blobColor: 'bg-magic-pink' });
      } else if (offsets.about && scrollPos >= offsets.about) {
        setScrollTheme(prev => prev.bg === 'bg-magic-blue' ? prev : { bg: 'bg-magic-blue', text: 'text-white', shadow: 'dark:shadow-[0_10px_40px_-10px_rgba(0,56,255,0.6)]', blobColor: 'bg-magic-blue' });
      } else if (offsets.services && scrollPos >= offsets.services) {
        setScrollTheme(prev => prev.bg === 'bg-yellow-400' ? prev : { bg: 'bg-yellow-400', text: 'text-magic-black', shadow: 'dark:shadow-[0_10px_40px_-10px_rgba(250,204,21,0.6)]', blobColor: 'bg-yellow-400' });
      } else if (offsets.projects && scrollPos >= offsets.projects) {
        setScrollTheme(prev => prev.bg === 'bg-magic-orange' ? prev : { bg: 'bg-magic-orange', text: 'text-white', shadow: 'dark:shadow-[0_10px_40px_-10px_rgba(255,77,0,0.6)]', blobColor: 'bg-magic-orange' });
      } else {
        setScrollTheme(prev => prev.bg === 'bg-transparent' ? prev : { bg: 'bg-transparent', text: 'text-magic-black dark:text-off-white', shadow: '', blobColor: 'bg-magic-orange' });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeOverlay = () => {
    navigate('/');
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    document.documentElement.classList.add('transitioning');
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setIsDarkMode(newDarkMode);
    setTimeout(() => {
      document.documentElement.classList.remove('transitioning');
    }, 500);
  };

  return (
    <div className="relative overflow-hidden selection:bg-magic-orange selection:text-white bg-off-white dark:bg-magic-dark transition-colors duration-500 min-h-screen">
      
      <div className="pointer-events-none fixed inset-0 z-[5] overflow-visible">
        <motion.div 
          className={`absolute w-[95vw] h-[95vw] md:w-[80vw] md:h-[80vw] lg:w-[60vw] lg:h-[60vw] max-w-[900px] max-h-[900px] rounded-full transition-colors duration-500 ease-in-out ${headerTheme.blobColor} ${isMobile ? 'opacity-100' : 'opacity-90'} dark:opacity-95`}
          style={{
            x: blob1X,
            y: blob1Y,
            translateX: '-50%',
            translateY: '-50%',
            willChange: 'transform',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            filter: isMobile ? 'blur(40px)' : 'blur(140px)', // Drastically reduce blur on mobile
            WebkitFilter: isMobile ? 'blur(40px)' : 'blur(140px)',
          }}
        />
        <motion.div 
          className={`absolute w-[85vw] h-[85vw] md:w-[70vw] md:h-[70vw] lg:w-[50vw] lg:h-[50vw] max-w-[800px] max-h-[800px] rounded-full transition-colors duration-500 ease-in-out ${headerTheme.blobColor} ${isMobile ? 'opacity-85' : 'opacity-75'} dark:opacity-80`}
          style={{
            x: blob2X,
            y: blob2Y,
            translateX: '-50%',
            translateY: '-50%',
            willChange: 'transform',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            filter: isMobile ? 'blur(60px)' : 'blur(160px)', // Reduce blur on mobile
            WebkitFilter: isMobile ? 'blur(60px)' : 'blur(160px)',
          }}
        />
      </div>

      <MemoizedHeader 
        bgColor={`${headerTheme.bg} ${headerTheme.shadow}`} 
        textColor={headerTheme.text} 
        lang={lang} 
        setLang={setLang} 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onNavClick={() => {
          navigate('/');
          document.body.style.overflow = 'unset';
        }}
      />
      
      <main className="relative z-[10] mt-0">
        <MemoizedHero lang={lang} />
        <MemoizedProjectsGrid 
          lang={lang} 
          selectedProject={selectedProject} 
          setSelectedProject={setSelectedProject} 
          mouseX={mouseX}
          mouseY={mouseY}
        />

        <MemoizedSection id="services" title={t.whatWeDo.title} subtitle={t.whatWeDo.subtitle} className="bg-transparent pt-6 pb-12 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-12">
            {t.whatWeDo.services.map((service, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
                className="group pt-0 md:pt-4"
              >
                <span className="font-archivo text-xs md:text-sm uppercase tracking-widest mb-4 block text-magic-black/30 dark:text-off-white/30">0{i+1}</span>
                <h3 className="font-archivo text-xl md:text-2xl uppercase tracking-tighter mb-1 text-magic-black dark:text-off-white group-hover:translate-x-2 transition-transform duration-300">{service.title}</h3>
                <span className="font-archivo text-[10px] md:text-[11px] uppercase tracking-[0.2em] mb-4 md:mb-6 block text-magic-black/20 dark:text-off-white/20 transition-transform duration-300 group-hover:translate-x-2">{service.subline}</span>
                <p className="text-base md:text-lg text-magic-black/60 dark:text-off-white/60 leading-relaxed font-medium">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </MemoizedSection>

        <MemoizedSection 
          id="about" 
          title={t.studio.title} 
          subtitle={t.studio.subtitle} 
          className="relative overflow-hidden py-12 md:py-32"
        >
          <div className="relative z-10 flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
              className="w-full lg:w-1/2 flex justify-center"
            >
              <ProximityImage 
                src="https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773295288/Dennis_Ruf_und_Be%CC%81la_Lehrnickel_Magic_Pop_Creative_Studio_tm4vyk.webp"
                alt="Studio"
                mouseX={mouseX}
                mouseY={mouseY}
                className="w-full h-auto max-h-[45vh] object-cover rounded-lg"
                overlayColor="bg-magic-blue/10"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="w-full lg:w-1/2 space-y-6 md:space-y-8 text-magic-black dark:text-off-white"
            >
              <p className="font-editorial text-2xl md:text-3xl italic leading-tight drop-shadow-sm opacity-90">{t.studio.p1}</p>
              <p className="text-base md:text-lg opacity-60 font-medium leading-relaxed">{t.studio.p2}</p>
            </motion.div>
          </div>
        </MemoizedSection>

        <BrandMarquee title={t.contact.trustTitle} />

        <MemoizedSection id="contact" title={t.contact.title} subtitle={t.contact.subtitle} className="bg-transparent py-12 md:py-32">
          {/* Main Contact Grid */}
          <div className="flex flex-col lg:flex-row gap-12 md:gap-24 mt-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="lg:w-1/2 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <span className="font-archivo text-xs uppercase tracking-widest text-magic-black/30 dark:text-off-white/30 block">{t.contact.emailLabel}</span>
                <a href={`mailto:${CONTACT_EMAIL}`} 
                   className="font-archivo uppercase tracking-tighter text-magic-black dark:text-off-white hover:text-magic-orange transition-colors duration-300 no-underline hover:underline underline-offset-8 decoration-magic-orange whitespace-nowrap block"
                   style={{ fontSize: 'clamp(0.8rem, 4vw, 3.2rem)', lineHeight: '1' }}>
                  {CONTACT_EMAIL}
                </a>
                
                <div className="flex flex-wrap gap-x-6 gap-y-3 pt-4 font-archivo text-[10px] uppercase tracking-[0.2em] text-magic-black/40 dark:text-off-white/40">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-magic-orange animate-pulse" />
                    {t.contact.replyTime}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-magic-blue" />
                    {t.contact.location}
                  </div>
                </div>
              </div>

              {/* Instagram on Desktop */}
              <div className="hidden lg:block pt-16 md:pt-24">
                <span className="font-archivo text-xs uppercase tracking-widest text-magic-black/30 dark:text-off-white/30 block mb-6">{t.contact.followLabel}</span>
                <div className="flex gap-8 font-archivo uppercase text-xs md:text-sm tracking-widest text-magic-black dark:text-off-white">
                  <a href="https://www.instagram.com/magicpop.berlin" target="_blank" rel="noopener noreferrer" className="relative group overflow-hidden">
                    <span className="block group-hover:-translate-y-full transition-transform duration-300">Instagram</span>
                    <span className="absolute top-0 left-0 block translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-magic-orange">Instagram</span>
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="lg:w-1/2 flex flex-col items-center justify-center py-12 lg:py-0"
            >
              <div className="relative w-full max-w-[280px] md:max-w-[340px] lg:max-w-[380px]">
                <motion.div 
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [-6, -3, -6]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="relative aspect-square w-full bg-yellow-400 rounded-full flex flex-col items-center justify-center text-center p-8 md:p-12 shadow-[0_30px_80px_-20px_rgba(250,204,21,0.4)] transition-shadow duration-500"
                >
                  <div className="space-y-4 md:space-y-6 flex flex-col items-center">
                    <h3 className="font-editorial text-4xl md:text-5xl lg:text-6xl text-magic-black italic leading-[1.1] max-w-[200px] md:max-w-[260px] lg:max-w-[300px]">
                      {t.contact.footerNoteSmall}
                    </h3>
                    
                    <div className="flex gap-4 md:gap-6">
                      <a 
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="w-12 h-12 md:w-14 md:h-14 bg-magic-black text-off-white rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 shadow-xl group/icon"
                        title={CONTACT_EMAIL}
                      >
                        <Mail className="w-5 h-5 md:w-6 md:h-6 group-hover/icon:animate-bounce" />
                      </a>
                      <a 
                        href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`}
                        className="w-12 h-12 md:w-14 md:h-14 bg-magic-black text-off-white rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 shadow-xl group/icon"
                        title={CONTACT_PHONE}
                      >
                        <Phone className="w-5 h-5 md:w-6 md:h-6 group-hover/icon:animate-bounce" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Instagram on Mobile */}
              <div className="lg:hidden w-full pt-16 flex flex-col items-center">
                <span className="font-archivo text-xs uppercase tracking-widest text-magic-black/30 dark:text-off-white/30 block mb-6">{t.contact.followLabel}</span>
                <div className="flex gap-8 font-archivo uppercase text-xs md:text-sm tracking-widest text-magic-black dark:text-off-white">
                  <a href="https://www.instagram.com/magicpop.berlin" target="_blank" rel="noopener noreferrer" className="relative group overflow-hidden">
                    <span className="block group-hover:-translate-y-full transition-transform duration-300">Instagram</span>
                    <span className="absolute top-0 left-0 block translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-magic-orange">Instagram</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </MemoizedSection>
      </main>

      <footer className="relative z-[20] bg-magic-black dark:bg-magic-dark py-8 md:py-12 px-6 md:px-12 text-off-white flex flex-col md:flex-row justify-between items-center gap-8 transition-colors duration-500">
        <div className="font-archivo text-xl uppercase tracking-tighter text-off-white">Magic Pop<span className="font-editorial lowercase text-lg ml-2">studio</span></div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div className="text-[10px] md:text-xs uppercase tracking-widest text-off-white/30 text-center md:text-left">© 2026 Magic Pop Studio. Create the Magic. Make it Pop.</div>
          <div className="flex gap-4 font-archivo uppercase text-[10px] md:text-xs tracking-widest text-off-white/50">
            <Link to="/styleguide" className="hover:text-magic-blue transition-colors opacity-30 hover:opacity-100">Design</Link>
            <Link to="/impressum" className="hover:text-magic-pink transition-colors">{t.contact.impressum}</Link>
            <Link to="/datenschutz" className="hover:text-magic-pink transition-colors">{t.contact.privacy}</Link>
          </div>
        </div>
      </footer>

      <AnimatePresence mode="wait">
        {location.pathname === '/impressum' && (
          <motion.div
            key="impressum"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[100]"
          >
            <Impressum onClose={closeOverlay} />
          </motion.div>
        )}
        {location.pathname === '/datenschutz' && (
          <motion.div
            key="datenschutz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[100]"
          >
            <Datenschutz onClose={closeOverlay} />
          </motion.div>
        )}
      </AnimatePresence>

      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default LandingPage;
