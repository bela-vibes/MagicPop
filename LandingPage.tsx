import React, { useState, useEffect, useRef } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

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
import { TRANSLATIONS, PROJECTS, CONTACT_EMAIL, CONTACT_PHONE } from './constants';

const BrandMarquee = ({ title }: { title: string }) => {
  const brands = ["LOQI", "Paul Kalkbrenner", "Dussmann", "I Like Visuals", "Arte", "Momox", "Biteaway", "Cornelsen", "Studio Stellar"];
  return (
    <section className="px-6 md:px-12 py-12 md:py-32 overflow-hidden bg-transparent">
      <div className="mb-10 md:mb-16">
        <h3 className="font-editorial text-2xl md:text-4xl lg:text-5xl italic text-magic-black dark:text-off-white leading-[1.1]">{title}</h3>
      </div>
      <div className="relative flex overflow-hidden py-10 -mx-6 md:-mx-12">
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="flex gap-x-20 md:gap-x-30 whitespace-nowrap pr-20 md:pr-40">
          {[...brands, ...brands].map((brand, i) => (
            <span key={`${brand}-${i}`} className="font-archivo text-4xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-magic-black/90 dark:text-off-white/90 select-none cursor-default">{brand}</span>
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
  
  // BLOB LOGIC
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [blob1Pos, setBlob1Pos] = useState({ x: 0, y: 0 });
  const [blob2Pos, setBlob2Pos] = useState({ x: 0, y: 0 });
  const requestRef = useRef<number>(null);
  const sectionOffsets = useRef<{ [key: string]: number }>({});

  useEffect(() => {
    document.title = "Magic Pop Studio — Creative Studio Berlin";
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const y = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      setMousePos({ x, y });
      document.documentElement.style.setProperty('--mouse-x', `${x}px`);
      document.documentElement.style.setProperty('--mouse-y', `${y}px`);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

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
  }, [mousePos]);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/impressum' || path === '/datenschutz' || path === '/') {
      setSelectedProject(null);
    } else {
      const project = PROJECTS.find(p => p.slug === path.substring(1));
      if (project) setSelectedProject(project);
      else if (path !== '/styleguide') navigate('/');
    }
  }, [location.pathname, navigate]);

  const [scrollTheme, setScrollTheme] = useState({ bg: 'bg-transparent', text: 'text-magic-black dark:text-off-white', shadow: '', blobColor: 'bg-magic-orange' });
  const headerTheme = selectedProject ? { bg: 'bg-magic-orange', text: 'text-white', shadow: 'dark:shadow-[0_10px_40px_-10px_rgba(255,77,0,0.6)]', blobColor: 'bg-magic-orange' } : scrollTheme;
  const t = TRANSLATIONS[lang] || TRANSLATIONS.de;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 400;
      const ids = ['services', 'projects', 'about', 'contact'];
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) sectionOffsets.current[id] = el.offsetTop;
      });
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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="relative selection:bg-magic-orange selection:text-white bg-off-white dark:bg-magic-dark transition-colors duration-500 min-h-screen overflow-x-hidden">
      
      {/* BLOBS */}
      <div className="pointer-events-none fixed inset-0 z-[5] overflow-visible">
        <div 
          className={`absolute w-[95vw] h-[95vw] md:w-[80vw] md:h-[80vw] lg:w-[60vw] lg:h-[60vw] max-w-[900px] max-h-[900px] rounded-full transition-colors duration-500 ease-in-out ${headerTheme.blobColor} opacity-90 dark:opacity-95`}
          style={{
            transform: `translate3d(${blob1Pos.x}px, ${blob1Pos.y}px, 0) translate(-50%, -50%)`,
            willChange: 'transform',
            filter: isMobile ? 'blur(60px)' : 'blur(140px)',
          }}
        />
        <div 
          className={`absolute w-[85vw] h-[85vw] md:w-[70vw] md:h-[70vw] lg:w-[50vw] lg:h-[50vw] max-w-[800px] max-h-[800px] rounded-full transition-colors duration-500 ease-in-out ${headerTheme.blobColor} opacity-75 dark:opacity-80`}
          style={{
            transform: `translate3d(${blob2Pos.x}px, ${blob2Pos.y}px, 0) translate(-50%, -50%)`,
            willChange: 'transform',
            filter: isMobile ? 'blur(80px)' : 'blur(160px)',
          }}
        />
      </div>

      <Header bgColor={`${headerTheme.bg} ${headerTheme.shadow}`} textColor={headerTheme.text} lang={lang} setLang={setLang} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} onNavClick={() => navigate('/')} />
      
      <main className="relative z-[10]">
        <Hero lang={lang} />
        <ProjectsGrid lang={lang} selectedProject={selectedProject} setSelectedProject={setSelectedProject} />

        <Section id="services" title={t.whatWeDo.title} subtitle={t.whatWeDo.subtitle} className="pt-6 pb-12 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-12">
            {t.whatWeDo.services.map((service, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group">
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
              <ProximityImage src="https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773295288/Dennis_Ruf_und_Be%CC%81la_Lehrnickel_Magic_Pop_Creative_Studio_tm4vyk.webp" alt="Studio" className="w-full h-auto max-h-[45vh] object-cover rounded-lg" />
            </motion.div>
            <div className="w-full lg:w-1/2 space-y-6">
              <p className="font-editorial text-2xl md:text-3xl italic opacity-90">{t.studio.p1}</p>
              <p className="text-base opacity-60 font-medium leading-relaxed">{t.studio.p2}</p>
            </div>
          </div>
        </Section>

        <BrandMarquee title={t.contact.trustTitle} />

        {/* KONTAKT SEKTION - VOLLSTÄNDIG WIEDERHERGESTELLT */}
        <Section id="contact" title={t.contact.title} subtitle={t.contact.subtitle} className="py-12 md:py-32">
          <div className="flex flex-col lg:flex-row gap-12 md:gap-24 mt-4">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:w-1/2 flex flex-col justify-between">
              <div className="space-y-6">
                <span className="font-archivo text-xs uppercase tracking-widest text-magic-black/30 dark:text-off-white/30 block">{t.contact.emailLabel}</span>
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-archivo uppercase tracking-tighter text-magic-black dark:text-off-white hover:text-magic-orange transition-colors no-underline block" style={{ fontSize: 'clamp(0.8rem, 4vw, 3.2rem)', lineHeight: '1' }}>
                  {CONTACT_EMAIL}
                </a>
                <div className="flex flex-wrap gap-x-6 gap-y-3 pt-4 font-archivo text-[10px] uppercase tracking-[0.2em] text-magic-black/40 dark:text-off-white/40">
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-magic-orange animate-pulse" />{t.contact.replyTime}</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-magic-blue" />{t.contact.location}</div>
                </div>
              </div>
              
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

            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="lg:w-1/2 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[280px] md:max-w-[380px]">
                <motion.div animate={{ y: [0, -15, 0], rotate: [-6, -3, -6] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative aspect-square w-full bg-yellow-400 rounded-full flex flex-col items-center justify-center text-center p-8 md:p-12 shadow-xl">
                  <div className="space-y-4 md:space-y-6 flex flex-col items-center">
                    <h3 className="font-editorial text-4xl md:text-5xl lg:text-6xl text-magic-black italic leading-[1.1]">
                      {t.contact.footerNoteSmall}
                    </h3>
                    <div className="flex gap-4 md:gap-6">
                      <a href={`mailto:${CONTACT_EMAIL}`} className="w-12 h-12 md:w-14 md:h-14 bg-magic-black text-off-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-xl group/icon">
                        <Mail className="w-5 h-5 md:w-6 md:h-6 group-hover/icon:animate-bounce" />
                      </a>
                      <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`} className="w-12 h-12 md:w-14 md:h-14 bg-magic-black text-off-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-xl group/icon">
                        <Phone className="w-5 h-5 md:w-6 md:h-6 group-hover/icon:animate-bounce" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="lg:hidden w-full pt-16 flex flex-col items-center">
                <span className="font-archivo text-xs uppercase tracking-widest text-magic-black/30 dark:text-off-white/30 block mb-6">{t.contact.followLabel}</span>
                <a href="https://www.instagram.com/magicpop.berlin" target="_blank" rel="noopener noreferrer" className="font-archivo uppercase text-xs tracking-widest text-magic-black dark:text-off-white">Instagram</a>
              </div>
            </motion.div>
          </div>
        </Section>
      </main>

      <footer className="bg-magic-black py-12 px-6 md:px-12 text-off-white flex justify-between items-center">
        <div className="font-archivo text-xl uppercase tracking-tighter">Magic Pop <span className="font-editorial lowercase opacity-50">studio</span></div>
        <div className="flex gap-4 font-archivo text-[10px] uppercase opacity-50">
          <Link to="/impressum" className="hover:text-magic-pink transition-colors">{t.contact.impressum}</Link>
          <Link to="/datenschutz" className="hover:text-magic-pink transition-colors">{t.contact.privacy}</Link>
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
