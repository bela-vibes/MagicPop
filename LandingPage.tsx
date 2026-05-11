import React, { useState, useEffect, useRef } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectsGrid from './components/ProjectsGrid';
import Section from './components/Section';
import Impressum from './components/Impressum';
import Datenschutz from './components/Datenschutz';
import ProximityImage from './components/ProximityImage';

// Context & Constants
import { Language, Project } from './types';
import { TRANSLATIONS, PROJECTS, CONTACT_EMAIL } from './constants';

const BrandMarquee = ({ title }: { title: string }) => {
  const brands = ["LOQI", "Paul Kalkbrenner", "Dussmann", "I Like Visuals", "Arte", "Momox", "Biteaway", "Cornelsen", "Studio Stellar"];
  
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
};

const LandingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lang, setLang] = useState<Language>('de');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionOffsets = useRef<{ [key: string]: number }>({});

  useEffect(() => {
    document.title = "Magic Pop Studio — Creative Studio Berlin";
  }, []);

  // Performance-optimiertes Mouse Tracking via CSS Variables
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMove = (e: MouseEvent | TouchEvent) => {
      // Auf Mobile stoppen wir das Tracking für die Blobs, um White-Screens zu verhindern
      if (window.innerWidth < 768) return;

      const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const y = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      
      document.documentElement.style.setProperty('--mouse-x', `${x}px`);
      document.documentElement.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: true });
    
    // Initial-Position
    document.documentElement.style.setProperty('--mouse-x', `${window.innerWidth / 2}px`);
    document.documentElement.style.setProperty('--mouse-y', `${window.innerHeight / 2}px`);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

  // Sync Path with Projects
  useEffect(() => {
    const path = location.pathname;
    if (path === '/impressum' || path === '/datenschutz' || path === '/') {
      setSelectedProject(null);
    } else {
      const slug = path.substring(1);
      const project = PROJECTS.find(p => p.slug === slug);
      if (project) {
        setSelectedProject(project);
      } else if (path !== '/styleguide') {
        navigate('/');
      }
    }
  }, [location.pathname, navigate]);

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

  // Update Section Offsets
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
    updateOffsets();
    window.addEventListener('resize', updateOffsets);
    return () => window.removeEventListener('resize', updateOffsets);
  }, []);

  // Scroll Logic for Theme Switching
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 400;
      const offsets = sectionOffsets.current;
      if (offsets.contact && scrollPos >= offsets.contact) {
        setScrollTheme({ bg: 'bg-magic-pink', text: 'text-magic-black', shadow: 'dark:shadow-[0_10px_40px_-10px_rgba(255,183,213,0.6)]', blobColor: 'bg-magic-pink' });
      } else if (offsets.about && scrollPos >= offsets.about) {
        setScrollTheme({ bg: 'bg-magic-blue', text: 'text-white', shadow: 'dark:shadow-[0_10px_40px_-10px_rgba(0,56,255,0.6)]', blobColor: 'bg-magic-blue' });
      } else if (offsets.services && scrollPos >= offsets.services) {
        setScrollTheme({ bg: 'bg-yellow-400', text: 'text-magic-black', shadow: 'dark:shadow-[0_10px_40px_-10px_rgba(250,204,21,0.4)]', blobColor: 'bg-yellow-400' });
      } else if (offsets.projects && scrollPos >= offsets.projects) {
        setScrollTheme({ bg: 'bg-magic-orange', text: 'text-white', shadow: 'dark:shadow-[0_10px_40px_-10px_rgba(255,77,0,0.6)]', blobColor: 'bg-magic-orange' });
      } else {
        setScrollTheme({ bg: 'bg-transparent', text: 'text-magic-black dark:text-off-white', shadow: '', blobColor: 'bg-magic-orange' });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.add('transitioning');
    setTimeout(() => document.documentElement.classList.remove('transitioning'), 500);
  };

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  return (
    <div className="relative selection:bg-magic-orange selection:text-white bg-off-white dark:bg-magic-dark transition-colors duration-500 min-h-screen">
      
      {/* PERFORMANCE BLOBS */}
      <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" style={{ contain: 'strict' }}>
        <div 
          className={`absolute rounded-full transition-colors duration-1000 ease-in-out ${headerTheme.blobColor} opacity-80 dark:opacity-50`}
          style={{
            left: isMobile ? '75%' : 'var(--mouse-x)',
            top: isMobile ? '20%' : 'var(--mouse-y)',
            width: isMobile ? '350px' : '80vw',
            height: isMobile ? '350px' : '80vw',
            transform: 'translate3d(-50%, -50%, 0)', 
            filter: isMobile ? 'blur(60px)' : 'blur(120px)',
            WebkitFilter: isMobile ? 'blur(60px)' : 'blur(120px)',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
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
        onNavClick={() => navigate('/')}
      />
      
      <main className="relative z-[10]">
        <Hero lang={lang} />
        
        <ProjectsGrid 
          lang={lang} 
          selectedProject={selectedProject} 
          setSelectedProject={setSelectedProject} 
        />

        <Section id="services" title={t.whatWeDo.title} subtitle={t.whatWeDo.subtitle} className="pt-6 pb-12 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-12">
            {t.whatWeDo.services.map((service, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <span className="font-archivo text-xs text-magic-black/30 dark:text-off-white/30 block mb-4">0{i+1}</span>
                <h3 className="font-archivo text-xl md:text-2xl uppercase tracking-tighter mb-1">{service.title}</h3>
                <span className="font-archivo text-[10px] uppercase tracking-[0.2em] mb-4 block opacity-30">{service.subline}</span>
                <p className="text-base opacity-70 leading-relaxed font-medium">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="about" title={t.studio.title} subtitle={t.studio.subtitle} className="py-12 md:py-32">
          <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="w-full lg:w-1/2">
              <ProximityImage 
                src="https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773295288/Dennis_Ruf_und_Be%CC%81la_Lehrnickel_Magic_Pop_Creative_Studio_tm4vyk.webp"
                alt="Studio"
                className="w-full h-auto max-h-[45vh] object-cover rounded-lg"
              />
            </motion.div>
            <div className="w-full lg:w-1/2 space-y-6">
              <p className="font-editorial text-2xl md:text-3xl italic opacity-90">{t.studio.p1}</p>
              <p className="text-base opacity-60 font-medium leading-relaxed">{t.studio.p2}</p>
            </div>
          </div>
        </Section>

        <BrandMarquee title={t.contact.trustTitle} />

        <Section id="contact" title={t.contact.title} subtitle={t.contact.subtitle} className="py-12 md:py-32">
          <div className="flex flex-col lg:flex-row gap-12 md:gap-24">
            <div className="lg:w-1/2">
              <span className="font-archivo text-xs uppercase tracking-widest opacity-30 block mb-6">{t.contact.emailLabel}</span>
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-archivo uppercase tracking-tighter text-magic-orange" style={{ fontSize: 'clamp(1rem, 5vw, 3rem)' }}>
                {CONTACT_EMAIL}
              </a>
            </div>
            <div className="lg:w-1/2 flex justify-center">
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="w-64 h-64 bg-yellow-400 rounded-full flex items-center justify-center p-8 shadow-xl">
                   <h3 className="font-editorial text-3xl italic text-center text-magic-black">{t.contact.footerNoteSmall}</h3>
                </motion.div>
            </div>
          </div>
        </Section>
      </main>

      <footer className="bg-magic-black py-12 px-6 md:px-12 text-off-white flex justify-between items-center">
        <div className="font-archivo text-xl uppercase">Magic Pop <span className="font-editorial lowercase opacity-50">studio</span></div>
        <div className="flex gap-4 font-archivo text-[10px] uppercase opacity-50">
          <Link to="/impressum">{t.contact.impressum}</Link>
          <Link to="/datenschutz">{t.contact.privacy}</Link>
        </div>
      </footer>

      <AnimatePresence mode="wait">
        {location.pathname === '/impressum' && <Impressum onClose={() => navigate('/')} />}
        {location.pathname === '/datenschutz' && <Datenschutz onClose={() => navigate('/')} />}
      </AnimatePresence>

      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default LandingPage;
