import React, { useEffect, useRef, useMemo } from 'react';
import { PROJECTS, TRANSLATIONS } from '../constants';
import { Project, Language } from '../types';

interface ProjectsGridProps {
  lang: Language;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ lang, selectedProject, setSelectedProject }) => {
  const [activeFilter, setActiveFilter] = React.useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
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
        if (!selectedProject || selectedProject.slug !== hash) {
          setSelectedProject(project);
        }
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

  const handleOpenProject = (project: Project) => {
    window.location.hash = project.slug;
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      <div className="px-6 md:px-12 mb-16 flex flex-col md:flex-row justify-between items-end gap-12 relative z-10">
        <div className="max-w-2xl">
          <h2 className="font-archivo text-6xl md:text-8xl uppercase tracking-tighter mb-6 text-magic-black dark:text-off-white">{t.title}</h2>
          <p className="font-medium text-magic-black/60 dark:text-off-white/60 text-lg leading-relaxed mb-10">{t.description}</p>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <button onClick={() => setActiveFilter(null)} className={`font-archivo text-xs uppercase tracking-widest relative pb-1 ${!activeFilter ? 'text-magic-black' : 'text-magic-black/40 dark:text-off-white/40'}`}>
              {t.featured || (lang === 'de' ? 'Alle' : 'All')}
              {!activeFilter && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-magic-blue"></span>}
            </button>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveFilter(cat)} className={`font-archivo text-xs uppercase tracking-widest relative pb-1 ${activeFilter === cat ? 'text-magic-black' : 'text-magic-black/40 dark:text-off-white/40'}`}>
                {cat}
                {activeFilter === cat && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-magic-blue"></span>}
              </button>
            ))}
          </div>
        </div>
        <div className="hidden md:flex gap-4 mb-2">
          <button onClick={() => scroll('left')} className="w-16 h-16 rounded-full bg-magic-black/5 dark:bg-off-white/5 flex items-center justify-center text-magic-black dark:text-off-white hover:bg-magic-black hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          </button>
          <button onClick={() => scroll('right')} className="w-16 h-16 rounded-full bg-magic-black/5 dark:bg-off-white/5 flex items-center justify-center text-magic-black dark:text-off-white hover:bg-magic-black hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex overflow-x-auto gap-8 px-6 md:px-12 no-scrollbar scroll-smooth snap-x snap-mandatory pb-12 relative z-10">
        {filteredProjects.map((project, index) => (
          <div key={project.id} onClick={() => handleOpenProject(project)} className="min-w-[80vw] md:min-w-[45vw] snap-start group cursor-pointer">
            {/* DER FIX: Absolute Positionierung & Object-Fit als Inline Style */}
            <div className="relative w-full rounded-sm overflow-hidden bg-magic-black/5" style={{ aspectRatio: '16/10' }}>
              <div className={`absolute inset-0 z-10 transition-transform duration-700 translate-y-full group-hover:translate-y-0 ${project.color} opacity-90`}></div>
              <img 
                src={project.image} 
                alt={project.title[lang]} 
                style={{ 
                  position: 'absolute', 
                  top: 0, left: 0, width: '100%', height: '100%', 
                  objectFit: 'cover', // Dies verhindert das Stauchen!
                  objectPosition: 'center' 
                }}
                className="transition-transform duration-[1.2s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity p-8 text-white text-center">
                 <span className="font-archivo text-xs uppercase tracking-[0.3em] mb-4">{project.category[lang]}</span>
                 <h3 className="font-archivo text-3xl md:text-5xl uppercase tracking-tighter">{project.title[lang]}</h3>
                 <div className="mt-8 bg-white/20 backdrop-blur-md px-8 py-3 uppercase text-xs tracking-widest hover:bg-white hover:text-magic-black transition-all">{t.viewProject}</div>
              </div>
            </div>
            <div className="mt-8 flex justify-between items-start">
              <div>
                <h3 className="font-archivo text-2xl uppercase tracking-tighter mb-1 text-magic-black dark:text-off-white">{project.title[lang]}</h3>
                <p className="font-editorial text-xl italic text-magic-black/40 dark:text-off-white/40">{project.category[lang]}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-magic-black/5 dark:bg-off-white/5 flex items-center justify-center transition-all group-hover:rotate-45">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-magic-black dark:text-off-white"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-[200] bg-off-white dark:bg-magic-dark overflow-hidden">
          <div className="absolute inset-0 overflow-y-auto z-[210]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-48">
              <div className="mb-32"> 
                <h1 className="font-archivo text-5xl md:text-[11vw] leading-[0.75] uppercase tracking-tighter mb-16 text-magic-black dark:text-off-white">{selectedProject.title[lang]}</h1>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                  <div className="lg:col-span-7">
                    <p className="font-editorial text-2xl md:text-4xl lg:text-5xl leading-[1.1] text-magic-black dark:text-off-white italic mb-12">{selectedProject.description[lang].split('\n\n')[0]}</p>
                    <div className="w-full overflow-hidden rounded-sm mb-12 relative" style={{ aspectRatio: '16/9' }}>
                      <img 
                        src={selectedProject.gallery[0] || selectedProject.image} 
                        alt="" 
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                        className="grayscale hover:grayscale-0 transition-all duration-700" 
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-5 lg:pt-24">
                    <div className="text-magic-black/40 dark:text-off-white/40 font-archivo text-[10px] uppercase tracking-widest mb-8 flex justify-between border-b border-magic-black/10 pb-4">
                      <span>{selectedProject.category[lang]}</span>
                      <span>{selectedProject.year}</span>
                    </div>
                    <p className="font-archivo text-sm md:text-base leading-relaxed text-magic-black/70 dark:text-off-white/70 mb-12">{selectedProject.description[lang].split('\n\n')[1]}</p>
                    {selectedProject.gallery[1] && (
                      <div className="w-full overflow-hidden rounded-sm relative" style={{ aspectRatio: '16/9' }}>
                        <img src={selectedProject.gallery[1]} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
                {selectedProject.gallery.slice(2).map((img, i) => {
                  const spans = ["md:col-span-12", "md:col-span-7", "md:col-span-5", "md:col-span-6", "md:col-span-6", "md:col-span-8 md:col-start-2", "md:col-span-12"];
                  const span = spans[i % spans.length];
                  return (
                    <div key={i} className={`${span} overflow-hidden rounded-sm group relative`} style={{ aspectRatio: '16/9' }}>
                      <img src={img} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} className="transform group-hover:scale-105 transition-transform duration-1000" />
                    </div>
                  );
                })}
              </div>
              <div className="mt-32 pb-12 flex flex-col items-center">
                <div className="w-px h-24 bg-magic-black/20 dark:bg-off-white/20 mb-12"></div>
                <button onClick={handleCloseProject} className="font-archivo uppercase tracking-widest text-xs md:text-sm text-magic-black/40 dark:text-off-white/40 hover:text-magic-orange transition-colors flex items-center gap-4 group">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:-translate-x-2 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                  {t.backToProjects}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsGrid;
