import React, { useState, useEffect, useRef } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { motion } from 'motion/react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Neu: useParams & useNavigate
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectsGrid from './components/ProjectsGrid';
import Section from './components/Section';
import { Language, Project } from './types';
import { TRANSLATIONS, PROJECTS } from './constants'; // Angenommen PROJECTS kommt aus constants
import Impressum from './components/Impressum';
import Datenschutz from './components/Datenschutz';
import ProximityImage from './components/ProximityImage';

const LandingPage: React.FC = () => {
  const { projectId } = useParams(); // Holt die ID aus der URL /project/:projectId
  const navigate = useNavigate();
  
  const [lang, setLang] = useState<Language>('de');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [blob1Pos, setBlob1Pos] = useState({ x: 0, y: 0 });
  const [blob2Pos, setBlob2Pos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const requestRef = useRef<number>(null);
  const sectionOffsets = useRef<{ [key: string]: number }>({});
  
  // Bestimme das aktive Projekt basierend auf der URL
  // Wir finden das Projekt in deiner PROJECTS Liste (musst du ggf. importieren)
  const activeProject = PROJECTS.find((p: Project) => p.id === projectId) || null;

  const [scrollTheme, setScrollTheme] = useState({
    bg: 'bg-transparent',
    text: 'text-magic-black dark:text-off-white',
    shadow: '',
    blobColor: 'bg-magic-orange'
  });

  // Header-Farbe ändert sich, wenn ein Projekt offen ist
  const headerTheme = activeProject
    ? { bg: 'bg-magic-orange', text: 'text-white', shadow: 'dark:shadow-[0_10px_40px_-10px_rgba(255,77,0,0.6)]', blobColor: 'bg-magic-orange' }
    : scrollTheme;

  const t = TRANSLATIONS[lang] || TRANSLATIONS.de;

  // Hilfsfunktion zum Schließen des Projekts
  const handleCloseProject = () => {
    navigate('/');
    document.body.style.overflow = 'unset';
  };

  // Effekt für Body-Scroll Lock, wenn Projekt offen
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeProject]);

  // --- Deine bestehenden useEffects (Offsets, Lang, Mouse, Blobs, DarkMode, Scroll) bleiben identisch ---
  // ... (Ich kürze sie hier der Übersichtlichkeit halber ab, behalte sie aber exakt so in deinem File!)

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
    window.addEventListener('resize', () => { updateOffsets(); checkMobile(); });
    const timer = setTimeout(updateOffsets, 1000);
    return () => {
      window.removeEventListener('resize', () => { updateOffsets(); checkMobile(); });
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, [isMobile]);

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
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [mousePos, isMobile]);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 350;
      const offsets = sectionOffsets.current;
      if (offsets.contact && scrollPos >= offsets.contact) setScrollTheme({ bg: 'bg-magic-pink', text: 'text-magic-black', shadow: 'dark:shadow-[0_10px_40px_-10px_rgba(255,183,213,0.6)]', blobColor: 'bg-magic-pink' });
      else if (offsets.about && scrollPos >= offsets.about) setScrollTheme({ bg: 'bg-magic-blue', text: 'text-white', shadow: 'dark:shadow-[0_10px_40px_-10px_rgba(0,56,255,0.6)]', blobColor: 'bg-magic-blue' });
      else if (offsets.services && scrollPos >= offsets.services) setScrollTheme({ bg: 'bg-yellow-400', text: 'text-magic-black', shadow: 'dark:shadow-[0_10px_40px_-10px_rgba(250,204,21,0.6)]', blobColor: 'bg-yellow-400' });
      else if (offsets.projects && scrollPos >= offsets.projects) setScrollTheme({ bg: 'bg-magic-orange', text: 'text-white', shadow: 'dark:shadow-[0_10px_40px_-10px_rgba(255,77,0,0.6)]', blobColor: 'bg-magic-orange' });
      else setScrollTheme({ bg: 'bg-transparent', text: 'text-magic-black dark:text-off-white', shadow: '', blobColor: 'bg-magic-orange' });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      if (window.location.hash === '#impressum' || window.location.hash === '#datenschutz') window.scrollTo(0, 0);
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
    setIsDarkMode(newDarkMode);
  };

  return (
    <div className="relative overflow-hidden selection:bg-magic-orange selection:text-white bg-off-white dark:bg-magic-dark transition-colors duration-500 min-h-screen">
      
      {/* Blobs */}
      <div className="pointer-events-none fixed inset-0 z-[5] overflow-visible">
        <div 
          className={`absolute w-[95vw] h-[95vw] md:w-[80vw] md:h-[80vw] lg:w-[60vw] lg:h-[60vw] max-w-[900px] max-h-[900px] rounded-full transition-colors duration-500 ease-in-out ${headerTheme.blobColor} opacity-90`}
          style={{ transform: `translate3d(${blob1Pos.x}px, ${blob1Pos.y}px, 0) translate(-50%, -50%)`, filter: isMobile ? 'blur(80px)' : 'blur(140px)' }}
        />
        <div 
          className={`absolute w-[85vw] h-[85vw] md:w-[70vw] md:h-[70vw] lg:w-[50vw] lg:h-[50vw] max-w-[800px] max-h-[800px] rounded-full transition-colors duration-500 ease-in-out ${headerTheme.blobColor} opacity-75`}
          style={{ transform: `translate3d(${blob2Pos.x}px, ${blob2Pos.y}px, 0) translate(-50%, -50%)`, filter: isMobile ? 'blur(100px)' : 'blur(160px)' }}
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
          handleCloseProject();
          setCurrentHash('');
        }}
      />
      
      <main className="relative z-[10] mt-0">
        <Hero lang={lang} />
        
        {/* ProjectsGrid erhält nun die URL-Steuerung */}
        <ProjectsGrid 
          lang={lang} 
          selectedProject={activeProject} 
          setSelectedProject={(p) => p ? navigate(`/project/${p.id}`) : handleCloseProject()} 
          mousePos={mousePos}
        />

        {/* Services Section */}
        <Section id="services" title={t.whatWeDo.title} subtitle={t.whatWeDo.subtitle} className="bg-transparent py-16 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-12">
            {t.whatWeDo.services.map((service, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="group">
                <span className="font-archivo text-xs uppercase tracking-widest mb-4 block text-magic-black/30 dark:text-off-white/30">0{i+1}</span>
                <h3 className="font-archivo text-xl md:text-2xl uppercase tracking-tighter mb-4 text-magic-black dark:text-off-white group-hover:translate-x-2 transition-transform duration-300">{service.title}</h3>
                <p className="text-base text-magic-black/60 dark:text-off-white/60 leading-relaxed font-medium">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* About Section */}
        <Section id="about" title={t.studio.title} subtitle={t.studio.subtitle} className="py-16 md:py-32">
           <div className="flex flex-col lg:flex-row gap-8 items-center">
            <ProximityImage src="https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773295288/Dennis_Ruf_und_Be%CC%81la_Lehrnickel_Magic_Pop_Creative_Studio_tm4vyk.webp" alt="Studio" mousePos={mousePos} className="w-full h-auto rounded-lg" />
            <div className="w-full lg:w-1/2 space-y-6">
              <p className="font-editorial text-2xl italic">{t.studio.p1}</p>
              <p className="opacity-60">{t.studio.p2}</p>
              <a href="mailto:hello@magicpop.berlin" className="inline-block bg-magic-blue text-white px-10 py-5 uppercase font-archivo tracking-widest">{t.studio.startProject}</a>
            </div>
          </div>
        </Section>

        {/* Contact Section */}
        <Section id="contact" title={t.contact.title} subtitle={t.contact.subtitle} className="py-16 md:py-32">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2 space-y-10">
              <a href="mailto:hello@magicpop.berlin" className="font-archivo text-4xl uppercase hover:text-magic-orange transition-colors">hello@magicpop.berlin</a>
              <div className="flex gap-6 uppercase font-archivo text-xs tracking-widest">
                <a href="https://instagram.com/magicpop.berlin" target="_blank" className="hover:text-magic-orange">Instagram</a>
              </div>
            </div>
            <div className="md:w-1/2 bg-yellow-400 p-8 rounded-sm">
              <p className="font-editorial text-3xl mb-8 italic">{t.contact.footerNote}</p>
              <a href="mailto:hello@magicpop.berlin" className="bg-magic-black text-off-white px-10 py-5 uppercase font-archivo tracking-widest">{t.studio.startProject}</a>
            </div>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="bg-magic-black py-12 px-12 text-off-white flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="font-archivo text-xl uppercase tracking-tighter">Magic Pop<span className="font-editorial lowercase text-lg ml-2">studio</span></div>
        <div className="flex gap-4 font-archivo uppercase text-[10px] tracking-widest opacity-50">
          <Link to="/styleguide" className="hover:text-magic-blue">Design</Link>
          <a href="#impressum" className="hover:text-magic-pink">{t.contact.impressum}</a>
          <a href="#datenschutz" className="hover:text-magic-pink">{t.contact.privacy}</a>
        </div>
      </footer>

      {currentHash === '#impressum' && <Impressum onClose={closeOverlay} />}
      {currentHash === '#datenschutz' && <Datenschutz onClose={closeOverlay} />}

      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default LandingPage;
