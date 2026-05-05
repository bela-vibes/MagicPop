import React, { useState, useEffect, useRef } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectsGrid from './components/ProjectsGrid';
import Section from './components/Section';
import { Language, Project } from './types';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { TRANSLATIONS, PROJECTS } from './constants';
import Impressum from './components/Impressum';
import Datenschutz from './components/Datenschutz';
import ProximityImage from './components/ProximityImage';

const LandingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lang, setLang] = useState<Language>('de');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [blob1Pos, setBlob1Pos] = useState({ x: 0, y: 0 });
  const [blob2Pos, setBlob2Pos] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const requestRef = useRef<number>(null);
  const sectionOffsets = useRef<{ [key: string]: number }>({});

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
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: true });
    if (mousePos.x === -500) {
      setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, [mousePos.x, isMobile]);

  useEffect(() => {
    let time = 0;
    const animate = () => {
      time += 0.01;
      const driftX = Math.sin(time * 0.5) * 20;
      const driftY = Math.cos(time * 0.3) * 20;
      setBlob1Pos((prev) => ({
        x: prev.x + (mousePos.x + driftX - prev.x) * 0.06,
        y: prev.y + (mousePos.y + driftY - prev.y) * 0.06,
      }));
      setBlob2Pos((prev) => ({
        x: prev.x + (mousePos.x - driftX - prev.x) * 0.03,
        y: prev.y + (mousePos.y - driftY - prev.y) * 0.03,
      }));
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [mousePos, isMobile]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 350;
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
        <div 
          className={`absolute w-[95vw] h-[95vw] md:w-[80vw] md:h-[80vw] lg:w-[60vw] lg:h-[60vw] max-w-[900px] max-h-[900px] rounded-full transition-colors duration-500 ease-in-out ${headerTheme.blobColor} ${isMobile ? 'opacity-100' : 'opacity-90'} dark:opacity-95`}
          style={{
            transform: `translate3d(${blob1Pos.x}px, ${blob1Pos.y}px, 0) translate(-50%, -50%)`,
            willChange: 'transform, filter',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            WebkitPerspective: '1000px',
            perspective: '1000px',
            WebkitFilter: isMobile ? 'blur(80px)' : 'blur(140px)',
            filter: isMobile ? 'blur(80px)' : 'blur(140px)',
          }}
        />
        <div 
          className={`absolute w-[85vw] h-[85vw] md:w-[70vw] md:h-[70vw] lg:w-[50vw] lg:h-[50vw] max-w-[800px] max-h-[800px] rounded-full transition-colors duration-500 ease-in-out ${headerTheme.blobColor} ${isMobile ? 'opacity-85' : 'opacity-75'} dark:opacity-80`}
          style={{
            transform: `translate3d(${blob2Pos.x}px, ${blob2Pos.y}px, 0) translate(-50%, -50%)`,
            willChange: 'transform, filter',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            WebkitPerspective: '1000px',
            perspective: '1000px',
            WebkitFilter: isMobile ? 'blur(100px)' : 'blur(160px)',
            filter: isMobile ? 'blur(100px)' : 'blur(160px)',
          }}
        />
      </div>

      <Header 
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
        <Hero lang={lang} />
        <ProjectsGrid 
          lang={lang} 
          selectedProject={selectedProject} 
          setSelectedProject={setSelectedProject} 
          mousePos={mousePos}
        />

        <Section id="services" title={t.whatWeDo.title} subtitle={t.whatWeDo.subtitle} className="bg-transparent py-16 md:py-32">
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
                <h3 className="font-archivo text-xl md:text-2xl uppercase tracking-tighter mb-4 md:mb-6 text-magic-black dark:text-off-white group-hover:translate-x-2 transition-transform duration-300">{service.title}</h3>
                <p className="text-base md:text-lg text-magic-black/60 dark:text-off-white/60 leading-relaxed font-medium">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section 
          id="about" 
          title={t.studio.title} 
          subtitle={t.studio.subtitle} 
          className="relative overflow-hidden py-16 md:py-32"
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
                mousePos={mousePos}
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
              <a 
                href="mailto:hello@magicpop.berlin"
                className="inline-block w-full md:w-auto bg-magic-blue text-white font-archivo uppercase tracking-widest px-10 py-5 hover:bg-blue-700 transition-all duration-300 shadow-[0_10px_40_rgba(0,56,255,0.3)] hover:shadow-[0_15px_50px_rgba(0,56,255,0.5)] active:scale-95 text-center"
              >
                {t.studio.startProject}
              </a>
            </motion.div>
          </div>
        </Section>

        <Section id="contact" title={t.contact.title} subtitle={t.contact.subtitle} className="bg-transparent py-16 md:py-32">
          {/* Main Contact Grid */}
          <div className="flex flex-col lg:flex-row gap-12 md:gap-24 mt-12 border-t border-magic-black/10 dark:border-off-white/10 pt-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="lg:w-1/2 space-y-12"
            >
              <div className="space-y-6">
                <span className="font-archivo text-xs uppercase tracking-widest text-magic-black/30 dark:text-off-white/30 block">{t.contact.emailLabel}</span>
                <a href="mailto:hello@magicpop.berlin" 
                   className="font-archivo uppercase tracking-tighter text-magic-black dark:text-off-white hover:text-magic-orange transition-colors duration-300 no-underline hover:underline underline-offset-8 decoration-magic-orange whitespace-nowrap block"
                   style={{ fontSize: 'clamp(0.8rem, 4vw, 3.2rem)', lineHeight: '1' }}>
                  hello@magicpop.berlin
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

              <div className="pt-12 border-t border-magic-black/5 dark:border-off-white/5">
                <span className="font-archivo text-[10px] uppercase tracking-widest text-magic-black/30 dark:text-off-white/30 block mb-8">{t.contact.processTitle}</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {t.contact.process.map((p: any, i: number) => (
                    <div key={i} className="space-y-3">
                      <span className="font-editorial italic text-xl text-magic-black/20 dark:text-off-white/20 block">{p.step}</span>
                      <h4 className="font-archivo text-[10px] uppercase tracking-widest text-magic-black dark:text-off-white">{p.title}</h4>
                      <p className="text-[12px] text-magic-black/50 dark:text-off-white/50 leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-archivo text-xs uppercase tracking-widest text-magic-black/30 dark:text-off-white/30 block mb-4">{t.contact.followLabel}</span>
                <div className="flex gap-8 font-archivo uppercase text-xs md:text-sm tracking-widest text-magic-black dark:text-off-white">
                  <a href="https://www.instagram.com/magicpop.berlin" target="_blank" rel="noopener noreferrer" className="relative group overflow-hidden">
                    <span className="block group-hover:-translate-y-full transition-transform duration-300">Instagram</span>
                    <span className="absolute top-0 left-0 block translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-magic-orange">Instagram</span>
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="lg:w-1/2 bg-yellow-400 p-8 md:p-12 flex flex-col justify-between shadow-[0_40px_100px_-20px_rgba(250,204,21,0.2)] rounded-sm min-h-[400px]"
            >
              <div>
                <h3 className="font-archivo text-[10vw] lg:text-6xl text-magic-black uppercase tracking-tighter leading-[0.9] mb-6 break-words">
                  {t.contact.footerNote}
                </h3>
                <p className="font-editorial text-xl text-magic-black/60 italic max-w-xs mb-10">
                  {t.contact.footerNoteSmall}
                </p>
              </div>
              <a 
                href="mailto:hello@magicpop.berlin"
                className="group relative inline-flex items-center justify-center bg-magic-black text-off-white font-archivo uppercase tracking-[0.2em] text-[10px] px-10 py-5 overflow-hidden transition-all duration-500 hover:pr-14 active:scale-95 self-start"
              >
                <span className="relative z-10">{t.contact.cta}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 absolute right-6 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Logo Wall */}
          <div className="mt-24 md:mt-32 pt-16 border-t border-magic-black/5 dark:border-off-white/5">
            <span className="font-archivo text-[10px] uppercase tracking-[0.3em] text-magic-black/20 dark:text-off-white/20 block text-center mb-12">{t.contact.trustTitle}</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-30 dark:opacity-20 grayscale brightness-0 dark:invert">
              {/* Hier können echte Logos als SVG oder PNG rein */}
              <div className="font-archivo text-[10px] uppercase tracking-widest text-magic-black dark:text-off-white">Sony Music</div>
              <div className="font-archivo text-[10px] uppercase tracking-widest text-magic-black dark:text-off-white">LOQI</div>
              <div className="font-archivo text-[10px] uppercase tracking-widest text-magic-black dark:text-off-white">Momox</div>
              <div className="font-archivo text-[10px] uppercase tracking-widest text-magic-black dark:text-off-white">Dermapharm</div>
              <div className="font-archivo text-[10px] uppercase tracking-widest text-magic-black dark:text-off-white">HANA Berlin</div>
              <div className="font-archivo text-[10px] uppercase tracking-widest text-magic-black dark:text-off-white">Amores Production</div>
            </div>
          </div>
        </Section>
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
