import { useState, useEffect } from 'react';

/**
 * Breakpoint values aligned with OpenAI apps-sdk-ui
 * @see reference/apps-sdk-ui/src/hooks/useBreakpoints.tsx
 */
const BREAKPOINTS = {
  xs: 380,
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Hook for responsive media query detection.
 * Returns true if the viewport is at least as wide as the specified breakpoint.
 *
 * @example
 * const isTablet = useBreakpoint('md');  // true if viewport >= 768px
 * const isDesktop = useBreakpoint('lg'); // true if viewport >= 1024px
 */
export const useBreakpoint = (bp: Breakpoint): boolean => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(`(min-width: ${BREAKPOINTS[bp]}px)`).matches;
    }
    return false;
  });

  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${BREAKPOINTS[bp]}px)`);

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, [bp]);

  return matches;
};
