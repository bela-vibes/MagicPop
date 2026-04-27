import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import StyleGuide from './components/StyleGuide';

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shift + S to toggle styleguide
      if (e.shiftKey && e.key.toLowerCase() === 's') {
        const isStyleGuide = window.location.pathname === '/styleguide';
        navigate(isStyleGuide ? '/' : '/styleguide');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/styleguide" element={<StyleGuide />} />
      {/* Catch all for deep links if necessary */}
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
};

export default App;
