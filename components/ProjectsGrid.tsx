
import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
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
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;

    const rect = scrollRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const edgeSize = width * 0.15; // 15% of the width is the hot zone

    if (x < edgeSize) {
      // Left edge
      const intensity = (edgeSize - x) / edgeSize;
      scrollSpeedRef.current = -intensity * 15; // Max speed 15px per frame
      if (!isEdgeScrolling) setIsEdgeScrolling(true);
    } else if (x > width - edgeSize) {
      // Right edge
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

  // Handle URL Hash for Deep Linking and Back Button
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const project = PROJECTS.find(p => p.slug === hash);
      
      if (project) {
        if (!selectedProject || selectedProject.slug !== hash) {
          setSelectedProject(project);
        }
      } else if (selectedProject) {
        setSelectedProject(null);
      }
    };

    // Initial check on mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [setSelectedProject, selectedProject]);

  const handleOpenProject = (project: Project) => {
    window.location.hash = project.slug;
  };

  const handleCloseProject = () => {
    // 1. Force close the UI state immediately for instant feedback
    setSelectedProject(null);
    
    // 2. Clean up the URL hash reliably
    if (window.location.hash) {
      // pushState is more reliable than history.back() because it doesn't 
      // depend on the history stack (e.g. after a page refresh)
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeFilter]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="projects" 
      className="py-24 md:py-32 bg-transparent relative overflow-hidden transition-colors duration-500"
    >
      {/* Header Info */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className="px-6 md:px-12 mb-16 flex flex-col md:flex-row justify-between items-end gap-12 relative z-10"
      >
        <div className="max-w-2xl">
          <h2 className="font-archivo text-6xl md:text-8xl uppercase tracking-tighter mb-6 text-magic-black dark:text-off-white">{t.title}</h2>
          <p className="font-medium text-magic-black/60 dark:text-off-white/60 text-lg leading-relaxed mb-10">{t.description}</p>
          
          {/* Filter Bar */}
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <button 
              onClick={() => setActiveFilter(null)}
              className={`font-archivo text-xs uppercase tracking-widest transition-all duration-300 relative pb-1 ${!activeFilter ? 'text-magic-black' : 'text-magic-black/40 dark:text-off-white/40 hover:text-magic-black dark:hover:text-off-white'}`}
            >
              {t.featured || (lang === 'de' ? 'Alle' : 'All')}
              {!activeFilter && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-magic-blue"></span>}
            </button>
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`font-archivo text-xs uppercase tracking-widest transition-all duration-300 relative pb-1 ${activeFilter === cat ? 'text-magic-black' : 'text-magic-black/40 dark:text-off-white/40 hover:text-magic-black dark:hover:text-off-white'}`}
              >
                {cat}
                {activeFilter === cat && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-magic-blue"></span>}
              </button>
            ))}
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="hidden md:flex gap-4 mb-2">
          <button 
            onClick={() => scroll('left')}
            className="w-16 h-16 rounded-full bg-magic-black/5 dark:bg-off-white/5 flex items-center justify-center text-magic-black dark:text-off-white hover:bg-magic-black hover:text-white dark:hover:bg-off-white dark:hover:text-magic-black transition-all duration-300"
            aria-label="Scroll Left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-16 h-16 rounded-full bg-magic-black/5 dark:bg-off-white/5 flex items-center justify-center text-magic-black dark:text-off-white hover:bg-magic-black hover:text-white dark:hover:bg-off-white dark:hover:text-magic-black transition-all duration-300"
            aria-label="Scroll Right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Horizontal Slider */}
      <motion.div 
        ref={scrollRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
        className={`flex overflow-x-auto gap-8 px-6 md:px-12 scroll-px-6 md:scroll-px-12 no-scrollbar pb-12 min-h-[400px] relative z-10 ${!isEdgeScrolling ? 'snap-x snap-mandatory' : ''}`}
      >
        {filteredProjects.map((project, index) => (
          <motion.div 
            key={project.id}
            onClick={() => handleOpenProject(project)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="min-w-[80vw] md:min-w-[45vw] snap-start group cursor-pointer"
          >
            <div 
              className="relative overflow-hidden bg-magic-black/5 dark:bg-off-white/5 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.02] group-hover:shadow-[0_40px_80px_-20px_rgba(28,25,23,0.3)] dark:group-hover:shadow-[0_40px_80px_-20px_rgba(255,77,0,0.3)] rounded-sm"
              style={{ aspectRatio: '3/2' }}
            >
              <div className={`absolute inset-0 z-10 transition-transform duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-full group-hover:translate-y-0 ${project.color} opacity-90`}></div>
              
              <img 
                src={project.image} 
                alt={project.title[lang]} 
                draggable="false"
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110" 
              />
              
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 text-white text-center">
                 <span className="font-archivo text-xs uppercase tracking-[0.3em] mb-4 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] translate-y-8 group-hover:translate-y-0 group-hover:scale-125">
                  {project.category[lang]}
                 </span>
                 <h3 className="font-archivo text-3xl md:text-5xl uppercase tracking-tighter transition-all duration-700 delay-75 ease-[cubic-bezier(0.19,1,0.22,1)] translate-y-8 group-hover:translate-y-0 group-hover:scale-110">
                  {project.title[lang]}
                 </h3>
                 <div className="mt-8 bg-white/20 backdrop-blur-md border-0 px-8 py-3 uppercase text-xs tracking-widest hover:bg-white hover:text-magic-black transition-all duration-500 delay-150 translate-y-8 group-hover:translate-y-0">
                    {t.viewProject}
                 </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-start transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-1">
              <div className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.03] origin-left">
                <h3 className="font-archivo text-2xl uppercase tracking-tighter mb-1 text-magic-black dark:text-off-white transition-colors duration-300">{project.title[lang]}</h3>
                <p className="font-editorial text-xl italic text-magic-black/40 dark:text-off-white/40">{project.category[lang]}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-magic-black/5 dark:bg-off-white/5 flex items-center justify-center transition-all duration-500 group-hover:rotate-45">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 transition-colors text-magic-black dark:text-off-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                 </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[200] bg-off-white dark:bg-magic-dark overflow-hidden">
          
          {/* SCROLLABLE CONTENT - Animated separately */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 overflow-y-auto overscroll-contain z-[210]"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-48">
              {/* Editorial Header Section */}
              <div className="mb-32"> 
                <motion.h1 
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                  className="font-archivo text-5xl md:text-[11vw] leading-[0.75] uppercase tracking-tighter mb-16 text-magic-black dark:text-off-white pr-4 md:pr-12 break-normal hyphens-auto"
                >
                  {selectedProject.title[lang]}
                </motion.h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                    className="lg:col-span-7"
                  >
                    <p className="font-editorial text-2xl md:text-4xl lg:text-5xl leading-[1.1] text-magic-black dark:text-off-white italic whitespace-pre-line mb-12">
                      {selectedProject.description[lang].split('\n\n')[0]}
                    </p>
                    <div 
                      className="hidden lg:block w-full overflow-hidden rounded-sm mb-12"
                    >
                      <img src={selectedProject.gallery[0] || selectedProject.image} alt="" draggable="false" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    className="lg:col-span-5 lg:pt-24"
                  >
                    <div className="text-magic-black/40 dark:text-off-white/40 font-archivo text-[10px] uppercase tracking-widest mb-8 flex justify-between border-b border-magic-black/10 dark:border-off-white/10 pb-4">
                      <span>{selectedProject.category[lang]}</span>
                      <span>{selectedProject.year}</span>
                    </div>
                    <p className="font-archivo text-sm md:text-base leading-relaxed text-magic-black/70 dark:text-off-white/70 mb-12">
                      {selectedProject.description[lang].split('\n\n')[1]}
                    </p>
                    {selectedProject.gallery[1] && (
                      <div 
                        className="w-full overflow-hidden rounded-sm"
                      >
                        <img src={selectedProject.gallery[1]} alt="" draggable="false" className="w-full h-auto" />
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
              
              {/* Interwoven Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
                {selectedProject.gallery.slice(2).map((img, i) => {
                  // Create an editorial rhythm that adapts to content
                  const spans = [
                    "md:col-span-12", 
                    "md:col-span-7", 
                    "md:col-span-5", 
                    "md:col-span-6", 
                    "md:col-span-6",
                    "md:col-span-8 md:col-start-2",
                    "md:col-span-12"
                  ];
                  const span = spans[i % spans.length];
                  
                  // Determine aspect ratio class based on index for HANA (ID 2)
                  // 4 landscape, 1 portrait, 2 square
                  // Gallery starts at slice(2), so:
                  // i=0: Gallery[2] (Landscape)
                  // i=1: Gallery[3] (Landscape)
                  // i=2: Gallery[4] (Portrait)
                  // i=3: Gallery[5] (Square)
                  // i=4: Gallery[6] (Square)
                  let currentAspect = "3/2";
                  if (selectedProject.id === 2) {
                    if (i === 2) currentAspect = "3/4";
                    if (i === 3 || i === 4) currentAspect = "1/1";
                  } else if (selectedProject.id === 3) {
                    if (i === 3) currentAspect = "1/1";
                  }

                  return (
                    <React.Fragment key={i}>
                      {/* Inject the 3rd paragraph after the 3rd image in the gallery (index 2 of slice(2)) */}
                      {i === 2 && selectedProject.description[lang].split('\n\n')[2] && (
                        <motion.div 
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8 }}
                          className="md:col-span-12 py-24 flex justify-center"
                        >
                          <p className="font-editorial text-2xl md:text-3xl lg:text-4xl leading-tight text-magic-black/60 dark:text-off-white/60 italic max-w-3xl text-center">
                            {selectedProject.description[lang].split('\n\n')[2]}
                          </p>
                        </motion.div>
                      )}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className={`${span} overflow-hidden rounded-sm group`}
                      >
                        <img 
                          src={img} 
                          alt="" 
                          draggable="false"
                          className="w-full h-auto transform group-hover:scale-105 transition-transform duration-1000" 
                        />
                      </motion.div>
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Remaining Description Paragraphs (e.g. Director Credits) */}
              {selectedProject.description[lang].split('\n\n').slice(3).length > 0 && (
                <div className="mt-24 flex flex-col items-center text-center">
                  {selectedProject.description[lang].split('\n\n').slice(3).map((para, idx) => (
                    <motion.p 
                      key={idx}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="font-archivo text-xs md:text-sm uppercase tracking-widest text-magic-black/40 dark:text-off-white/40 mb-4"
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>
              )}

              <div className="mt-32 pb-12 flex flex-col items-center">
                <div className="w-px h-24 bg-magic-black/20 dark:bg-off-white/20 mb-12"></div>
                <button 
                  onClick={handleCloseProject}
                  className="font-archivo uppercase tracking-widest text-xs md:text-sm text-magic-black/40 dark:text-off-white/40 hover:text-magic-orange transition-colors flex items-center gap-4 group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:-translate-x-2 transition-transform text-inherit">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  {t.backToProjects}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default ProjectsGrid;
