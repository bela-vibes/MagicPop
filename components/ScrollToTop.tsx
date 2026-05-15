import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { PROJECTS } from "../constants";

// Strip /en prefix to get the canonical path
const normalize = (p: string) => (p.startsWith('/en') ? p.slice(3) || '/' : p);

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathname = useRef<string>('');

  useEffect(() => {
    const prev = prevPathname.current;
    const curr = pathname;

    // Don't scroll if it's purely a language switch (same page, different prefix)
    const isLanguageSwitch = prev !== '' && normalize(prev) === normalize(curr);

    // Don't scroll for overlay routes (they sit on top of the landing page)
    const canon = normalize(curr);
    const isOverlayRoute =
      canon === '/impressum' ||
      canon === '/datenschutz' ||
      PROJECTS.some(p => `/${p.slug}` === canon);

    if (!isLanguageSwitch && !isOverlayRoute) {
      window.scrollTo(0, 0);
    }

    prevPathname.current = curr;
  }, [pathname]);

  return null;
}
