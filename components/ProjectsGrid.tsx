import React, { useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS, TRANSLATIONS } from '../constants';
import { Project, Language } from '../types';

interface ProjectsGridProps {
  lang: Language;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ lang, selectedProject, setSelectedProject }) => {
  const [activeFilter, setActiveFilter] = React.useState<string | null>(null);
  const [isEdgeScrolling, setIsEdgeScrolling] = React.useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollSpeedRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const t = TRANSLATIONS[lang].projects;

  const categories = useMemo(() => {
    const cats = PROJECTS.map(p => p.category[lang]);
    return Array.from(new Set(cats));
  }, [lang]);

  const filteredProjects = useMemo(() => {
    if (!activeFilter) return PROJECTS;
    return PROJECTS.filter(p => p.category[lang] === activeFilter);
  }, [activeFilter, lang]);

  // Edge Scrolling Logic
  useEffect(() => {
    const startScrolling = () => {
      if (scrollRef.current && scrollSpeedRef.current !== 0) {
        scrollRef.current.scrollLeft += scrollSpeedRef.current;
      }
      animationFrameRef.current = requestAnimationFrame(startScrolling);
    };
    animationFrameRef.current = requestAnimationFrame(startScrolling);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    const rect = scrollRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const edgeSize = width * 0.15;

    if (x < edgeSize) {
      const intensity = (edgeSize - x) / edgeSize;
      scrollSpeedRef.current = -intensity * 15;
      setIsEdgeScrolling(true);
    } else if (x > width - edgeSize) {
      const intensity = (x - (width - edgeSize)) / edgeSize;
      scrollSpeedRef.current = intensity * 15;
      setIsEdgeScrolling(true);
    } else {
      scrollSpeedRef.current = 0;
      setIsEdgeScrolling(false);
    }
  };

  const handleMouseLeave = () => {
    scrollSpeedRef.current = 0;
    setIsEdgeScrolling(false);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') handleCloseProject(); };
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedProject]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const project = PROJECTS.find(p => p.slug === hash);
      if (project) {
        if (!selectedProject || selectedProject.slug !== hash) setSelectedProject(project);
      } else if (selectedProject) {
        setSelectedProject(null);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [setSelectedProject, selectedProject]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      {/* Header & Filter Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-6 md:px-12 mb-16 flex flex-col md:flex-row justify-between items-end gap-12 relative z-10"
      >
        <div className="max-w-2xl">
          <h2 className="font-archivo text-6xl md:text-8xl uppercase tracking-tighter mb-6 text-magic-black dark:text-off-white">
            {t.title}
          </h2>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <button onClick={() => setActiveFilter(null)} className={`font-archivo text-xs uppercase tracking-widest relative pb-1 ${activeFilter === null ? "text-magic-black dark:text-off-white" : "text-magic-black/40 dark:text-off-white/40"}`}>
              {lang === "de" ? "Alle" : "All"}
              {activeFilter === null && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-magic-blue"></span>}
            </button>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveFilter(cat)} className={`font-archivo text-xs uppercase tracking-widest relative pb-1 ${activeFilter === cat ? "text-magic-black dark:text-off-white" : "text-magic-black/40 dark:text-off-white/40"}`}>
                {cat}
                {activeFilter === cat && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-magic-blue"></span>}
              </button>
            ))}
          </div>
        </div>
        
        <div className="hidden md:flex gap-4">
          <button onClick={() => scroll('left')} className="w-16 h-16 rounded-full bg-magic-black/5 dark:bg-off-white/5 flex items-center justify-center text-magic-black dark:text-off-white hover:bg-magic-black hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          </button>
          <button onClick={() => scroll('right')} className="w-16 h-16 rounded-full bg-magic-black/5 dark:bg-off-white/5 flex items-center justify-center text-magic-black dark:text-off-white hover:bg-magic-black hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </button>
        </div>
      </motion.div>

      {/* Grid Slider */}
      <motion.div 
        ref={scrollRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`flex overflow-x-auto gap-8 px-6 md:px-12 no-scrollbar pb-12 ${!isEdgeScrolling ? 'snap-x snap-mandatory' : ''}`}
      >
        {filteredProjects.map((project, index) => (
          <motion.div 
            key={project.id}
            onClick={() => window.location.hash = project.slug}
            className="min-w-[85vw] md:min-w-[45vw] snap-start group cursor-pointer"
          >
            <div className="relative overflow-hidden aspect-[3/2] rounded-sm bg-magic-black/5">
              <img src={project.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-magic-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white text-magic-black px-6 py-2 uppercase text-xs tracking-widest font-archivo">{t.viewProject}</span>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-archivo text-2xl uppercase tracking-tighter text-magic-black dark:text-off-white">{project.title[lang]}</h3>
              <p className="font-editorial italic text-magic-black/40 dark:text-off-white/40">{project.category[lang]}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* --- PROJECT MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-off-white dark:bg-magic-dark overflow-hidden flex flex-col"
          >
            {/* FIXED MODAL HEADER (The Orange Banner) */}
            <div 
              className="w-full h-20 bg-[#ff4d00] flex items-center justify-between z-[1010] relative"
              style={{ 
                paddingLeft: 'calc(env(safe-area-inset-left) + 1.5rem)',
                paddingRight: 'calc(env(safe-area-inset-right) + 1.5rem)' 
              }}
            >
              <div className="flex items-baseline gap-2 text-white">
                <span className="font-archivo font-bold text-xl md:text-2xl uppercase tracking-tighter">MAGIC POP</span>
                <span className="font-editorial italic text-lg md:text-xl">studio</span>
              </div>
              
              <button 
                onClick={handleCloseProject}
                className="w-10 h-10 flex items-center justify-center text-white hover:rotate-90 transition-transform duration-300"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div 
                className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24"
                style={{ 
                  paddingLeft: 'calc(env(safe-area-inset-left) + 1.5rem)',
                  paddingRight: 'calc(env(safe-area-inset-right) + 1.5rem)' 
                }}
              >
                <motion.h1 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="font-archivo text-5xl md:text-[10vw] leading-[0.8] uppercase tracking-tighter mb-16 text-magic-black dark:text-off-white"
                >
                  {selectedProject.title[lang]}
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                  <div className="lg:col-span-7">
                    <p className="font-editorial text-2xl md:text-4xl leading-tight italic text-magic-black dark:text-off-white mb-12">
                      {selectedProject.description[lang].split('\n\n')[0]}
                    </p>
                    <img src={selectedProject.gallery[0] || selectedProject.image} alt="" className="w-full h-auto rounded-sm" />
                  </div>
                  
                  <div className="lg:col-span-5 pt-0 lg:pt-24">
                    <div className="flex justify-between border-b border-magic-black/10 dark:border-off-white/10 pb-4 mb-8 text-[10px] uppercase tracking-widest text-magic-black/40 dark:text-off-white/40 font-archivo">
                      <span>{selectedProject.category[lang]}</span>
                      <span>{selectedProject.year}</span>
                    </div>
                    <p className="font-archivo text-base leading-relaxed text-magic-black/70 dark:text-off-white/70 mb-12">
                      {selectedProject.description[lang].split('\n\n')[1]}
                    </p>
                    {selectedProject.gallery[1] && <img src={selectedProject.gallery[1]} alt="" className="w-full h-auto rounded-sm" />}
                  </div>
                </div>

                {/* Gallery Items */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12">
                  {selectedProject.gallery.slice(2).map((img, i) => (
                    <div key={i} className="md:col-span-6 overflow-hidden rounded-sm">
                      <img src={img} alt="" className="w-full h-auto" />
                    </div>
                  ))}
                </div>

                <div className="mt-32 pb-20 flex flex-col items-center">
                  <div className="w-px h-24 bg-magic-black/10 dark:bg-off-white/10 mb-12"></div>
                  <button onClick={handleCloseProject} className="font-archivo uppercase tracking-widest text-xs text-magic-black/40 dark:text-off-white/40 hover:text-magic-orange transition-colors">
                    {t.backToProjects}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsGrid;
