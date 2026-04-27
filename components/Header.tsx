import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeaderProps {
  bgColor: string;
  textColor: string;
  lang: Language;
  setLang: (lang: Language) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onNavClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ bgColor, textColor, lang, setLang, isDarkMode, toggleDarkMode, onNavClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const t = TRANSLATIONS[lang].nav;
  
  const navItems = [
    { label: t.projects, href: '#projects' },
    { label: t.whatWeDo, href: '#services' },
    { label: t.studio, href: '#about' },
    { label: t.contact, href: '#contact' },
  ];

  const delayClasses = ['delay-100', 'delay-150', 'delay-200', 'delay-300'];

  const handleNavItemClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    const targetId = href.replace('#', '');
    
    if (location.pathname !== '/') {
      // If we are not on the home page, go home first
      if (onNavClick) onNavClick();
      navigate('/' + href);
      
      // We still need to scroll after navigation, usually this happens via the hash in react-router-dom 
      // but only if configured. Our LandingPage offsets might need time.
      // For now, LandingPage will handle closing the overlay, 
      // and we expect the window to scroll to top (via ScrollToTop logic) or we can force it.
      return;
    }

    if (onNavClick) onNavClick();

    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-[700] transition-[background-color,padding,box-shadow] duration-500 ease-in-out py-5 lg:py-6 flex justify-between items-center ${bgColor}`}
        style={{
          paddingLeft: 'max(1.5rem, env(safe-area-inset-left))',
          paddingRight: 'max(1.5rem, env(safe-area-inset-right))',
        }}
      >
        <div className="font-archivo text-2xl md:text-3xl tracking-tighter uppercase relative z-[110] leading-[0.9]">
          <a 
            href="#hero" 
            onClick={(e) => handleNavItemClick(e, '#hero')} 
            className="hover:opacity-60 flex flex-wrap items-baseline"
          >
            <span className={`${textColor} transition-colors duration-500 ease-in-out mr-1.5`}>Magic</span>
            <div className="flex items-baseline">
              <span className={`${textColor} transition-colors duration-500 ease-in-out`}>Pop</span>
              <span className={`font-editorial lowercase text-xl md:text-2xl ml-2 ${textColor} transition-colors duration-500 ease-in-out`}>studio</span>
            </div>
          </a>
        </div>
        
        <div className="flex items-center gap-4 lg:gap-10">
          <nav className="hidden lg:flex gap-6 xl:gap-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavItemClick(e, item.href)}
                className={`font-archivo text-xs uppercase tracking-widest hover:opacity-60 transition-colors duration-500 ease-in-out ${textColor}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:gap-6">
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${textColor}`}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M3 12h2.25m.386-6.364l1.591 1.591M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </button>

            <div className={`flex gap-2 lg:gap-3 font-archivo text-[10px] lg:text-xs uppercase tracking-widest ${textColor} transition-colors duration-500 ease-in-out`}>
              <button 
                onClick={() => setLang('de')}
                className={`transition-all duration-300 ${lang === 'de' ? 'opacity-100 font-black' : 'opacity-40 hover:opacity-100'}`}
              >DE</button>
              <span className="opacity-20">/</span>
              <button 
                onClick={() => setLang('en')}
                className={`transition-all duration-300 ${lang === 'en' ? 'opacity-100 font-black' : 'opacity-40 hover:opacity-100'}`}
              >EN</button>
            </div>
          </div>

          <button 
            className={`lg:hidden p-2 relative z-[110] transition-colors duration-500 ease-in-out ${isMenuOpen ? 'text-off-white' : textColor}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay
          Fix für iOS Safari dvh-Bug:
          - overflow:hidden auf dem äußeren Wrapper schneidet alles ab
          - Das innere Div ragt mit -top-[80px] und pb-[80px] extra weit raus,
            sodass dvh-Sprünge der URL-Bar nie eine schwarze Kante zeigen */}
      <div className="fixed inset-0 z-[600] overflow-hidden pointer-events-none">
        <div 
          className={`absolute inset-x-0 -top-[80px] bottom-0 pb-[80px] bg-magic-black transition-transform duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] flex flex-col justify-center px-6 pointer-events-auto ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
        >
          <nav className="flex flex-col gap-6 mt-[80px]">
            {navItems.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavItemClick(e, item.href)}
                className={`font-archivo text-5xl md:text-7xl uppercase tracking-tighter text-off-white transition-all duration-700 ${delayClasses[i]} ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Copyright — portrait only */}
          <div className="mt-20 pt-10 text-off-white/20 font-archivo text-[10px] uppercase tracking-widest hidden portrait:block">
            Magic Pop Studio &copy; 2024 / Berlin
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
