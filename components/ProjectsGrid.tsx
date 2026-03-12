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
      if (!isEdgeScrolling) setIsEdgeScrolling(true);
    } else if (x > width - edgeSize) {
      const intensity = (x - (width - edgeSize)) / edgeSize;
      scrollSpeedRef.current = intensity * 15;
      if (!isEdgeScrolling) setIsEdgeScrolling(true);
    } else {
      scrollSpeedRef.current = 0;
      if (isEdgeScrolling) setIsEdgeScrolling(false);
    }
  };

  const handleMouseLeave = () => {
    scrollSpeedRef.current = 0;
    setIsEdgeScrolling(false);
  };

  const handleOpenProject = (project: Project) => {
    window.location.hash = project.slug;
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
    // Die section steuert den Rand für die gesamte Main-Page (Desktop & Mobile)
    <section id="projects" className="py-24 md:py-32 bg-transparent relative overflow-hidden transition-colors duration-500">
      
      {/* Header Info - Hier nutzen wir px-6 für Mobile, md:px-12 für Desktop */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-6 md:px-12 mb-16 flex flex-col md:flex-row justify-between items-end gap-12 relative z-10"
      >
        <div className="max-w-2xl">
          <h2 className="font-archivo text-6xl md:text-8xl uppercase tracking-tighter mb-6 text-magic-black dark:text-off-white">{t.title}</h2>
          
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <button 
              onClick={() => setActiveFilter(null)}
              className={`font-archivo text-xs uppercase tracking-widest transition-all duration-300 relative pb-1 ${!activeFilter ? 'text-magic-black dark:text-off-white' : 'text-magic-black/40 dark:text-off-white/40 hover:text-magic-black dark:hover:text-off-white'}`}
            >
              {t.featured || (lang === 'de' ? 'Alle' : 'All')}
              {!activeFilter && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-magic-blue"></span>}
            </button>
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`font-archivo text-xs uppercase tracking-widest transition-all duration-300 relative pb-1 ${activeFilter === cat ? 'text-magic-black dark:text-off-white' : 'text-magic-black/40 dark:text-off-white/40 hover:text-magic-black dark:hover:text-off-white'}`}
              >
                {cat}
                {activeFilter === cat && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-magic-blue"></span>}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Slider Grid - Das Padding hier sorgt dafür, dass das erste Bild nicht am Rand klebt */}
      <div 
        ref={scrollRef} 
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave} 
        className={`flex overflow-x-auto gap-8 px-6 md:px-12 no-scrollbar pb-12 ${!isEdgeScrolling ? 'snap-x snap-mandatory' : ''}`}
      >
        {filteredProjects.map((project) => (
          <div key={project.id} onClick={() => handleOpenProject(project)} className="min-w-[80vw] md:min-w-[45vw] snap-start group cursor-pointer">
            <div className="relative overflow-hidden aspect-[3/2] rounded-sm bg-magic-black/5 dark:bg-off-white/5">
              <img src={project.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="mt-6">
                <h3 className="font-archivo text-2xl uppercase tracking-tighter text-magic-black dark:text-off-white">{project.title[lang]}</h3>
                <p className="font-editorial italic text-magic-black/40 dark:text-off-white/40 text-xl">{project.category[lang]}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL (MOBILE & DESKTOP) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-off-white dark:bg-magic-dark overflow-hidden flex flex-col"
          >
            {/* DAS BANNER - Mobil h-20, Desktop h-24 für mehr Luft */}
            <div className="w-full h-20 md:h-24 bg-[#ff4d00] flex items-center justify-between px-6 md:px-12 z-[2010] shrink-0">
              <div className="flex items-baseline gap-2 text-white">
                <span className="font-archivo font-bold text-xl md:text-2xl uppercase tracking-tighter">MAGIC POP</span>
                <span className="font-editorial italic text-lg md:text-xl">studio</span>
              </div>
              <button onClick={handleCloseProject} className="text-white hover:rotate-90 transition-transform duration-300 p-2">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>

            {/* SCROLL-INHALT */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
                <h1 className="font-archivo text-5xl md:text-[11vw] leading-[0.85] md:leading-[0.75] uppercase tracking-tighter mb-12 md:mb-16 text-magic-black dark:text-off-white">
                  {selectedProject.title[lang]}
                </h1>
                
                {/* Intro Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-20 md:mb-32">
                  <div className="lg:col-span-7">
                    <p className="font-editorial text-2xl md:text-5xl italic text-magic-black dark:text-off-white mb-10 md:mb-12">
                      {selectedProject.description[lang].split('\n\n')[0]}
                    </p>
                    <img src={selectedProject.gallery[0] || selectedProject.image} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" alt="" />
                  </div>
                  <div className="lg:col-span-5 lg:pt-24">
                    <div className="text-magic-black/40 dark:text-off-white/40 font-archivo text-[10px] uppercase tracking-widest mb-8 border-b border-magic-black/10 pb-4 flex justify-between">
                      <span>{selectedProject.category[lang]}</span>
                      <span>{selectedProject.year}</span>
                    </div>
                    <p className="font-archivo text-base md:text-lg leading-relaxed text-magic-black/70 dark:text-off-white/70">
                      {selectedProject.description[lang].split('\n\n')[1]}
                    </p>
                  </div>
                </div>

                {/* Galerie - Mobil untereinander, Desktop Zeitungs-Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16">
                  {selectedProject.gallery.slice(1).map((img, i) => {
                    const spans = ["md:col-span-12", "md:col-span-7", "md:col-span-5", "md:col-span-6", "md:col-span-6", "md:col-span-8 md:col-start-2"];
                    const span = spans[i % spans.length];
                    return (
                      <div key={i} className={`${span} overflow-hidden rounded-sm group`}>
                        <img src={img} className="w-full h-auto group-hover:scale-105 transition-transform duration-1000" alt="" />
                      </div>
                    );
                  })}
                </div>

                <div className="mt-24 pb-32 flex flex-col items-center">
                  <button onClick={handleCloseProject} className="font-archivo uppercase tracking-widest text-xs text-magic-black/40 dark:text-off-white/40 hover:text-[#ff4d00] transition-colors flex items-center gap-2">
                    <span className="text-lg">←</span> {t.backToProjects}
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
