import React, { useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom'; // Neu
import { PROJECTS, TRANSLATIONS } from '../constants';
import { Project, Language } from '../types';
import ProximityImage from './ProximityImage';

interface ProjectsGridProps {
  lang: Language;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  mousePos: { x: number; y: number };
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ lang, selectedProject, setSelectedProject, mousePos }) => {
  const navigate = useNavigate(); // Hook für die Navigation
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

  // --- NAVIGATION LOGIK ---
  
  const handleOpenProject = (project: Project) => {
    // Navigiert zur neuen URL. Die LandingPage fängt das über useParams() ab.
    navigate(`/project/${project.id}`);
  };

  const handleCloseProject = () => {
    // Geht zurück zur Hauptseite
    navigate('/');
  };

  // Esc-Key Handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseProject();
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedProject]);

  // --- EDGE SCROLLING (Unverändert) ---
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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-24 md:py-32 min-h-[100dvh] bg-transparent relative overflow-hidden">
      {/* Header & Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
        className="px-6 md:px-12 mb-16 flex flex-col md:flex-row justify-between items-end gap-12 relative z-10"
      >
        <div className="flex-1">
          <h2 className="font-archivo text-5xl md:text-[10vw] uppercase tracking-tighter mb-4 text-magic-black dark:text-off-white leading-[0.9]">{t.title}</h2>
          <p className="font-medium text-magic-black/60 dark:text-off-white/60 text-base md:text-lg max-w-2xl">{t.description}</p>
          
          <div className="flex flex-wrap gap-x-8 gap-y-4 w-full mt-10">
            <button onClick={() => setActiveFilter(null)} className={`font-archivo text-xs uppercase tracking-widest relative pb-1 ${!activeFilter ? 'text-magic-black dark:text-off-white' : 'opacity-40'}`}>
              {t.featured || (lang === 'de' ? 'Alle' : 'All')}
              {!activeFilter && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-magic-blue"></span>}
            </button>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveFilter(cat)} className={`font-archivo text-xs uppercase tracking-widest relative pb-1 ${activeFilter === cat ? 'text-magic-black dark:text-off-white' : 'opacity-40'}`}>
                {cat}
                {activeFilter === cat && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-magic-blue"></span>}
              </button>
            ))}
          </div>
        </div>
        
        <div className="hidden md:flex gap-4 flex-shrink-0">
          <button onClick={() => scroll('left')} className="w-16 h-16 rounded-full bg-magic-black/5 dark:bg-off-white/5 flex items-center justify-center hover:bg-magic-black hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          </button>
          <button onClick={() => scroll('right')} className="w-16 h-16 rounded-full bg-magic-black/5 dark:bg-off-white/5 flex items-center justify-center hover:bg-magic-black hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </button>
        </div>
      </motion.div>

      {/* Grid Slider */}
      <motion.div 
        ref={scrollRef} 
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave}
        className={`flex overflow-x-auto gap-8 px-6 md:px-12 no-scrollbar pb-12 relative z-10 ${!isEdgeScrolling ? 'snap-x snap-mandatory' : ''}`}
      >
        {filteredProjects.map((project, index) => (
          <motion.div 
            key={project.id} 
            onClick={() => handleOpenProject(project)}
            className="w-[80vw] md:w-[45vw] flex-shrink-0 snap-start group cursor-pointer"
          >
            <div className="relative overflow-hidden aspect-[3/2] bg-magic-black/5 rounded-sm">
              <div className={`absolute inset-0 z-10 transition-transform duration-700 translate-y-full group-hover:translate-y-0 ${project.color} opacity-90`}></div>
              {project.image.endsWith('.mp4') ? (
                <video src={project.image} muted loop playsInline autoPlay className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              ) : (
                <img src={project.image} alt={project.title[lang]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              )}
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity p-8 text-white">
                <h3 className="font-archivo text-3xl md:text-5xl uppercase tracking-tighter">{project.title[lang]}</h3>
                <div className="mt-8 bg-white/20 backdrop-blur-md px-8 py-3 uppercase text-xs tracking-widest">{t.viewProject}</div>
              </div>
            </div>
            <div className="mt-8 flex justify-between items-start">
              <div>
                <h3 className="font-archivo text-2xl uppercase tracking-tighter text-magic-black dark:text-off-white">{project.title[lang]}</h3>
                <p className="font-editorial text-xl italic opacity-40">{project.category[lang]}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-magic-black/5 dark:bg-off-white/5 flex items-center justify-center group-hover:rotate-45 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0, y: '2vh' }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: '2vh' }}
            className="fixed inset-0 z-[200] bg-off-white dark:bg-magic-dark overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-48">
              <h1 className="font-archivo text-5xl md:text-[11vw] leading-[0.75] uppercase tracking-tighter mb-16 text-magic-black dark:text-off-white">
                {selectedProject.title[lang]}
              </h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
                <div className="lg:col-span-7">
                  <p className="font-editorial text-2xl md:text-5xl italic mb-12">{selectedProject.description[lang].split('\n\n')[0]}</p>
                  <ProximityImage src={selectedProject.gallery[0] || selectedProject.image} alt="" mousePos={mousePos} className="w-full rounded-sm" />
                </div>
                <div className="lg:col-span-5 lg:pt-24">
                  <div className="flex justify-between border-b pb-4 mb-8 uppercase text-[10px] tracking-widest opacity-40">
                    <span>{selectedProject.category[lang]}</span>
                    <span>{selectedProject.year}</span>
                  </div>
                  <p className="font-archivo text-base opacity-70 mb-12">{selectedProject.description[lang].split('\n\n')[1]}</p>
                  {selectedProject.gallery[1] && <img src={selectedProject.gallery[1]} alt="" className="w-full rounded-sm" />}
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {selectedProject.gallery.slice(2).map((img, i) => (
                  <div key={i} className="md:col-span-6 overflow-hidden rounded-sm">
                    {img.endsWith('.mp4') ? (
                      <video src={img} controls className="w-full" />
                    ) : (
                      <img src={img} alt="" className="w-full hover:scale-105 transition-transform duration-1000" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-32 flex flex-col items-center">
                <button onClick={handleCloseProject} className="font-archivo uppercase tracking-widest text-sm opacity-40 hover:opacity-100 hover:text-magic-orange transition-all flex items-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                  {t.backToProjects}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsGrid;
