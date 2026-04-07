import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectsGrid from './components/ProjectsGrid';
import Section from './components/Section';
import { Language, Project } from './types';
import { TRANSLATIONS } from './constants';
import Impressum from './components/Impressum';
import Datenschutz from './components/Datenschutz';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('de');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [blob1Pos, setBlob1Pos] = useState({ x: 0, y: 0 });
  const [blob2Pos, setBlob2Pos] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const requestRef = useRef<number>(null);
  const sectionOffsets = useRef<{ [key: string]: number }>({});
  
  const [scrollTheme, setScrollTheme] = useState({
    bg: 'bg-transparent',
    text: 'text-magic-black dark:text-off-white',
    shadow: '',
    blobColor: 'bg-magic-orange'
  });

  // Wenn ein Projekt offen ist → immer orange Header
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
    
    // Initial delay to ensure fonts/layout are ready
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
      const scrollPos = window.scrollY + 120;
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

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      if (window.location.hash === '#impressum' || window.location.hash === '#datenschutz') {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const closeOverlay = () => {
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
    setCurrentHash('');
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
          setSelectedProject(null);
          setCurrentHash('');
          document.body.style.overflow = 'unset';
        }}
      />
      
      <main className="relative z-[10] mt-0">
        <Hero lang={lang} />
        <ProjectsGrid 
          lang={lang} 
          selectedProject={selectedProject} 
          setSelectedProject={setSelectedProject} 
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
                <h3 className="font-archivo text-2xl md:text-3xl uppercase tracking-tighter mb-4 md:mb-6 text-magic-black dark:text-off-white group-hover:translate-x-2 transition-transform duration-300">{service.title}</h3>
                <p className="text-base md:text-lg text-magic-black/60 dark:text-off-white/60 leading-relaxed font-medium">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section 
          id="about" 
          title={t.studio.title} 
          subtitle={t.studio.subtitle} 
          className="relative overflow-hidden py-16 md:py-48"
        >
          <div className="relative z-10 flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
              className="w-full lg:w-1/2"
            >
              <div className="relative group overflow-hidden rounded-sm">
                <img 
                  src="https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773295288/Dennis_Ruf_und_Be%CC%81la_Lehrnickel_Magic_Pop_Creative_Studio_tm4vyk.webp" 
                  alt="Studio" 
                  draggable="false" 
                  loading="lazy"
                  className="w-full grayscale group-hover:grayscale-0 active:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100 aspect-video md:aspect-auto object-cover" 
                />
                <div className="absolute inset-0 bg-magic-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="w-full lg:w-1/2 space-y-6 md:space-y-8 text-magic-black dark:text-off-white"
            >
              <p className="font-editorial text-3xl md:text-4xl italic leading-tight drop-shadow-sm opacity-90">{t.studio.p1}</p>
              <p className="text-lg md:text-xl opacity-60 font-medium leading-relaxed">{t.studio.p2}</p>
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
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 mt-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="md:w-1/2 space-y-10 md:space-y-12"
            >
              <div>
                <span className="font-archivo text-xs uppercase tracking-widest text-magic-black/30 dark:text-off-white/30 block mb-4">{t.contact.emailLabel}</span>
                <a href="mailto:hello@magicpop.berlin" 
   className="font-archivo uppercase tracking-tighter 
              text-magic-black dark:text-off-white hover:text-magic-orange 
              transition-colors duration-300 underline underline-offset-8 
              decoration-transparent hover:decoration-magic-orange"
   style={{ fontSize: 'clamp(1rem, 3.5vw, 3rem)', wordBreak: 'keep-all' }}>
  hello@magicpop.berlin
</a>
              </div>
              <div>
                <span className="font-archivo text-xs uppercase tracking-widest text-magic-black/30 dark:text-off-white/30 block mb-4">{t.contact.followLabel}</span>
                <div className="flex gap-6 md:gap-8 font-archivo uppercase text-xs md:text-sm tracking-widest text-magic-black dark:text-off-white">
                  <a href="https://www.instagram.com/magicpop.berlin" target="_blank" rel="noopener noreferrer" className="hover:text-magic-orange transition-colors">Instagram</a>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="md:w-1/2 bg-yellow-400 p-8 md:p-12 flex flex-col justify-center shadow-[0_30px_80px_-20px_rgba(250,204,21,0.3)] rounded-sm"
            >
              <p className="font-editorial text-3xl md:text-5xl text-magic-black italic leading-tight mb-8">{t.contact.footerNote}</p>
              <a 
                href="mailto:hello@magicpop.berlin"
                className="inline-block bg-magic-black text-off-white font-archivo uppercase tracking-widest px-10 py-5 hover:bg-magic-black/80 transition-all duration-300 self-start active:scale-95 text-center"
              >
                {t.studio.startProject}
              </a>
            </motion.div>
          </div>
        </Section>
      </main>

      <footer className="relative z-[20] bg-magic-black dark:bg-magic-dark py-12 md:py-24 px-6 md:px-12 text-off-white flex flex-col md:flex-row justify-between items-center gap-8 transition-colors duration-500">
        <div className="font-archivo text-xl uppercase tracking-tighter text-off-white">Magic Pop<span className="font-editorial lowercase text-lg ml-1">studio</span></div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div className="text-[10px] md:text-xs uppercase tracking-widest text-off-white/30 text-center md:text-left">© 2026 Magic Pop Studio. Create the Magic. Make it Pop.</div>
          <div className="flex gap-4 font-archivo uppercase text-[10px] md:text-xs tracking-widest text-off-white/50">
            <a href="#impressum" className="hover:text-magic-pink transition-colors">{t.contact.impressum}</a>
            <a href="#datenschutz" className="hover:text-magic-pink transition-colors">{t.contact.privacy}</a>
          </div>
        </div>
      </footer>

      {currentHash === '#impressum' && <Impressum onClose={closeOverlay} />}
      {currentHash === '#datenschutz' && <Datenschutz onClose={closeOverlay} />}
    </div>
  );
};

export default App;
