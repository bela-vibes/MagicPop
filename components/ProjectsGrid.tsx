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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseProject();
    };
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
        setSelectedProject(project);
      } else if (selectedProject) {
        setSelectedProject(null);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setSelectedProject, selectedProject]);

  const handleOpenProject = (project: Project) => {
    window.location.hash = project.slug;
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    window.history.pushState(null, '', window.location.pathname);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-24 md:py-32 bg-transparent relative overflow-hidden transition-colors duration-500">
      <div className="px-6 md:px-12 mb-16 flex flex-col md:flex-row justify-between items-end gap-12 relative z-10">
        <div className="max-w-2xl">
          <h2 className="font-archivo text-6xl md:text-8xl uppercase tracking-tighter mb-6 text-magic-black dark:text-off-white">{t.title}</h2>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <button onClick={() => setActiveFilter(null)} className={`font-archivo text-xs uppercase tracking-widest transition-all ${!activeFilter ? 'text-magic-black dark:text-off-white border-b-2 border-magic-blue' : 'text-magic-black/40'}`}>
              {t.featured || 'Alle'}
            </button>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveFilter(cat)} className={`font-archivo text-xs uppercase tracking-widest transition-all ${activeFilter === cat ? 'text-magic-black dark:text-off-white border-b-2 border-magic-blue' : 'text-magic-black/40'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="hidden md:flex gap-4">
          <button onClick={() => scroll('left')} className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-magic-black dark:text-white">←</button>
          <button onClick={() => scroll('right')} className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-magic-black dark:text-white">→</button>
        </div>
      </div>

      {/* Horizontal Slider (Clean Preview) */}
      <div 
        ref={scrollRef} 
        onMouseMove={handleMouseMove} 
        onMouseLeave={() => {scrollSpeedRef.current = 0; setIsEdgeScrolling(false);}}
        className="flex overflow-x-auto gap-8 px-6 md:px-12 no-scrollbar pb-12 snap-x snap-mandatory"
      >
        {filteredProjects.map((project) => (
          <motion.div key={project.id} onClick={() => handleOpenProject(project)} className="min-w-[80vw] md:min-w-[45vw] snap-start group cursor-pointer">
            <div className="relative overflow-hidden aspect-[3/2] rounded-sm bg-black/5">
              <img src={project.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                <span className="uppercase text-xs tracking-widest mb-2">{project.category[lang]}</span>
                <h3 className="text-3xl font-archivo uppercase">{project.title[lang]}</h3>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-archivo uppercase dark:text-white">{project.title[lang]}</h3>
              <p className="font-editorial italic opacity-40 dark:text-white">{project.category[lang]}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Detail View (VIDEO INTEGRATED HERE) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-off-white dark:bg-magic-dark overflow-y-auto">
            <div className="max-w-7xl mx-auto px-6 py-32 md:py-48">
              
              <div className="w-full aspect-video rounded-sm overflow-hidden bg-black mb-16">
                {selectedProject.slug === 'suitcase' ? (
                  <video
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                    poster="https://res.cloudinary.com/dpe3jvf3e/image/upload/v1775421343/Bildschirmfoto_2026-04-05_um_22.35.29_l9wxuf.png"
                  >
                    <source src="https://res.cloudinary.com/dpe3jvf3e/video/upload/v1741212883/Suitcase_R_m88p3p.mp4" type="video/mp4" />
                  </video>
                ) : (
                  <img src={selectedProject.image} className="w-full h-full object-cover" alt="" />
                )}
              </div>

              <h1 className="text-5xl md:text-[10vw] font-archivo uppercase mb-12 dark:text-white">{selectedProject.title[lang]}</h1>
              <p className="text-2xl md:text-4xl font-editorial italic max-w-4xl dark:text-white mb-24">{selectedProject.description[lang]}</p>
              
              <button onClick={handleCloseProject} className="font-archivo uppercase tracking-widest text-sm opacity-50 hover:opacity-100 dark:text-white">
                ← {t.backToProjects || 'Back'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsGrid;
