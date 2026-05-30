import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LandingPage from './LandingPage';
import StyleGuide from './components/StyleGuide';
import ScrollToTop from './components/ScrollToTop';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip shortcuts when typing in inputs
      const isTyping = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement;

      // Shift + S to toggle styleguide
      if (e.shiftKey && e.key.toLowerCase() === 's') {
        const isStyleGuide = window.location.pathname === '/styleguide';
        navigate(isStyleGuide ? '/' : '/styleguide');
      }

      // . to toggle dark mode
      if (e.key === '.' && !isTyping) {
        const isDark = document.documentElement.classList.toggle('dark');
        window.dispatchEvent(new CustomEvent('magicpop:darkmode', { detail: { isDark } }));
      }

      // d → switch to German, e → switch to English (preserves current subpage)
      if ((e.key === 'd' || e.key === 'e') && !isTyping) {
        const pathname = window.location.pathname;
        const isEnglish = pathname.startsWith('/en');
        const rawPath = isEnglish ? pathname.slice(3) || '/' : pathname;

        if (e.key === 'e' && !isEnglish) {
          navigate(rawPath === '/' ? '/en' : `/en${rawPath}`);
        } else if (e.key === 'd' && isEnglish) {
          navigate(rawPath);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <>
      <SpeedInsights />
      <Analytics />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/impressum" element={<LandingPage />} />
        <Route path="/datenschutz" element={<LandingPage />} />
        <Route path="/styleguide" element={<StyleGuide />} />
        {/* English versions — must come before /:slug */}
        <Route path="/en" element={<LandingPage />} />
        <Route path="/en/impressum" element={<LandingPage />} />
        <Route path="/en/datenschutz" element={<LandingPage />} />
        <Route path="/en/:slug" element={<LandingPage />} />
        <Route path="/:slug" element={<LandingPage />} />
        {/* Catch all for deep links if necessary */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </>
  );
};

export default App;
