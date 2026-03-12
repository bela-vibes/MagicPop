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

  // Scroll-Logik
  useEffect(() => {
    const startScrolling = () => {
      if (scrollRef.current && scrollSpeedRef.current !== 0) {
        scrollRef.current.scrollLeft += scrollSpeedRef.current;
      }
      animationFrameRef.current = requestAnimationFrame(startScrolling);
    };
    animationFrameRef.current = requestAnimationFrame(startScrolling);
    return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    const rect = scrollRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const edgeSize = rect.width * 0.15;
    if (x < edgeSize) {
      scrollSpeedRef.current = -((edgeSize - x) / edgeSize) * 15;
      setIsEdgeScrolling(true);
    } else if (x > rect.width - edgeSize) {
      scrollSpeedRef.current = ((x - (rect.width - edgeSize)) / edgeSize) * 15;
      setIsEdgeScrolling(true);
    } else {
      scrollSpeedRef.current = 0;
      setIsEdgeScrolling(false);
    }
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    window.history.pushState(null, '', window.location.pathname);
  };

  useEffect(() => {
    const handleHash = () => {
      const project = PROJECTS.find(p => p.slug === window.location.hash.replace('#', ''));
      setSelectedProject(project || null);
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, [setSelectedProject]);

  return (
    <section id="projects" className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      {/* --- GRID HEADER --- */}
      <div className="px-6 md:px-12 mb-16 flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="max-w-2xl">
          <h2 className="font-archivo text-6xl md:text-8xl uppercase tracking-tighter mb-6 text-magic-black dark:text-off-white">
            {t.title}
          </h2>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <button onClick={() => setActiveFilter(null)} className={`font-archivo text-xs uppercase tracking-widest pb-1 border-b-2 ${!activeFilter ? 'border-magic-blue text-magic-black dark:text-off-white' : 'border-transparent text-magic-black/40'}`}>
              {lang === "de" ? "Alle" : "All"}
            </button>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)} className={`font-archivo text-xs uppercase tracking-widest pb-1 border-b-2 ${activeFilter === cat ? 'border-magic-blue text-magic-black dark:text-off-white' : 'border-transparent text-magic-black/40'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- HORIZONTAL SLIDER --- */}
      <div 
        ref={scrollRef} 
        onMouseMove={handleMouseMove} 
        onMouseLeave={() => {scrollSpeedRef.current = 0; setIsEdgeScrolling(false);}}
        className={`flex overflow-x-auto gap-8 px-6 md:px-12 no-scrollbar pb-12 ${!isEdgeScrolling ? 'snap-x snap-mandatory' : ''}`}
      >
        {filteredProjects.map((project) => (
          <div key={project.id} onClick={() => window.location.hash = project.slug} className="min-w-[80vw] md:min-w-[45vw] snap-start group cursor-pointer">
            <div className="relative overflow-hidden aspect-[3/2] rounded-sm bg-magic-black/5">
              <img src={project.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-magic-orange/90 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity p-8 text-white">
                <h3 className="font-archivo text-3xl uppercase tracking-tighter">{project.title[lang]}</h3>
                <div className="mt-4 border border-white/40 px-6 py-2 text-xs uppercase tracking-widest">{t.viewProject}</div>
              </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
                <h3 className="font-archivo text-xl uppercase tracking-tighter text-magic-black dark:text-off-white">{project.title[lang]}</h3>
                <span className="font-editorial italic text-magic-black/40 dark:text-off-white/40">{project.category[lang]}</span>
            </div>
          </div>
        ))}
      </div>

      {/* --- PROJECT DETAIL MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-off-white dark:bg-magic-dark overflow-hidden"
          >
            {/* Oranger Balken – absolut blickdicht & fixiert */}
            <div className="fixed top-0 left-0 w-full h-20 bg-[#ff4d00] z-[300] shadow-sm"></div>

            {/* Content Bereich */}
            <div className="absolute inset-0 overflow-y-auto overscroll-contain z-[210] pt-20">
              <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
                <motion.h1 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-archivo text-5xl md:text-[11vw] leading-[0.8] uppercase tracking-tighter mb-20 text-magic-black dark:text-off-white"
                >
                  {selectedProject.title[lang]}
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  <div className="lg:col-span-7">
                    <p className="font-editorial text-2xl md:text-4xl italic text-magic-black dark:text-off-white mb-12">
                      {selectedProject.description[lang].split('\n\n')[0]}
                    </p>
                    <img src={selectedProject.gallery[0] || selectedProject.image} className="w-full h-auto rounded-sm" alt="" />
                  </div>
                  <div className="lg:col-span-5 lg:pt-32">
                    <p className="font-archivo text-sm leading-relaxed text-magic-black/60 dark:text-off-white/60 mb-12">
                      {selectedProject.description[lang].split('\n\n')[1]}
                    </p>
                    {selectedProject.gallery[1] && <img src={selectedProject.gallery[1]} className="w-full h-auto rounded-sm" alt="" />}
                  </div>
                </div>

                {/* Back Button */}
                <div className="mt-32 pb-20 flex flex-col items-center">
                  <button 
                    onClick={handleCloseProject}
                    className="font-archivo uppercase tracking-widest text-xs text-magic-black/40 dark:text-off-white/40 hover:text-magic-orange transition-colors flex items-center gap-4"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
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
