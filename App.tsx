import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import StyleGuide from './components/StyleGuide';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shift + S to toggle styleguide
      if (e.shiftKey && e.key.toLowerCase() === 's') {
        const isStyleGuide = window.location.pathname === '/styleguide';
        navigate(isStyleGuide ? '/' : '/styleguide');
      }

      // . to toggle dark mode (skip when typing in inputs)
      if (e.key === '.' && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement) && !(e.target instanceof HTMLSelectElement)) {
        document.documentElement.classList.toggle('dark');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/impressum" element={<LandingPage />} />
        <Route path="/datenschutz" element={<LandingPage />} />
        <Route path="/styleguide" element={<StyleGuide />} />
<Route path="/:slug" element={<LandingPage />} />
        {/* Catch all for deep links if necessary */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </>
  );
};

export default App;
