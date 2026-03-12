
import React, { useState } from 'react';
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
  const t = TRANSLATIONS[lang].nav;
  
  const navItems = [
    { label: t.projects, href: '#projects' },
    { label: t.whatWeDo, href: '#services' },
    { label: t.studio, href: '#about' },
    { label: t.contact, href: '#contact' },
  ];

  const handleNavItemClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // 1. Close Modals & Mobile Menu
    if (onNavClick) onNavClick();
    setIsMenuOpen(false);

    // 2. Smooth Scroll Logic
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80; // Adjusted for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL hash without jump
      window.history.pushState(null, '', href);
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-[700] transition-all duration-500 ease-in-out px-6 md:px-12 py-5 md:py-6 flex justify-between items-center ${bgColor}`}
      >
        <div className={`font-archivo text-2xl md:text-3xl tracking-tighter uppercase ${textColor} transition-colors duration-500 relative z-[110]`}>
          <a 
            href="#hero" 
            onClick={(e) => handleNavItemClick(e, '#hero')} 
            className="hover:opacity-60 transition-opacity"
          >
            Magic Pop<span className="font-editorial lowercase text-xl md:text-2xl ml-1">studio</span>
          </a>
        </div>
        
        <div className="flex items-center gap-4 md:gap-10">
          <nav className="hidden md:flex gap-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavItemClick(e, item.href)}
                className={`font-archivo text-xs uppercase tracking-widest hover:opacity-60 transition-all duration-300 ${textColor}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-6">
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

            <div className={`flex gap-2 md:gap-3 font-archivo text-[10px] md:text-xs uppercase tracking-widest ${textColor} transition-colors duration-500`}>
              <button 
                onClick={() => setLang('de')}
                className={`transition-all duration-300 ${lang === 'de' ? 'opacity-100 font-black' : 'opacity-40 hover:opacity-100'}`}
              >
                DE
              </button>
              <span className="opacity-20">/</span>
              <button 
                onClick={() => setLang('en')}
                className={`transition-all duration-300 ${lang === 'en' ? 'opacity-100 font-black' : 'opacity-40 hover:opacity-100'}`}
              >
                EN
              </button>
            </div>
          </div>

          <button 
            className={`md:hidden p-2 relative z-[110] transition-colors duration-300 ${isMenuOpen ? 'text-off-white' : textColor}`}
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

      <div 
        className={`fixed inset-0 z-[600] bg-magic-black transition-transform duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] flex flex-col justify-center px-6 ${isMenuOpen ? 'translate-y-0' : '-translate-y-[100dvh]'}`}
      >
        <nav className="flex flex-col gap-6">
          {navItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavItemClick(e, item.href)}
              className={`font-archivo text-5xl md:text-7xl uppercase tracking-tighter text-off-white transition-all duration-700 delay-[${100 + i * 50}ms] ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mt-20 pt-10 text-off-white/20 font-archivo text-[10px] uppercase tracking-widest">
          Magic Pop Studio &copy; 2024 / Berlin
        </div>
      </div>
    </>
  );
};

export default Header;
