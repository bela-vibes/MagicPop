import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PROJECTS } from "../constants";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Skip scroll to top for overlay routes to preserve landing page scroll position
    const isOverlayRoute = pathname === '/impressum' || pathname === '/datenschutz' || PROJECTS.some(p => `/${p.slug}` === pathname);
    if (!isOverlayRoute) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
