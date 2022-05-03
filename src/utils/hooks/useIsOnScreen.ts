import { useEffect, useState, useRef } from 'react';

/**
 * Uses IntersectionObserver to detect whether given element
 * is on screen or not, disconnecting observer once on screen
 * @param ref reference HTML element
 * @param false optional flag to bypass hook if set
 * @returns flag indicates where ref is on screen
 */
export function useIsOnScreen(ref, bypass) {
  if (bypass) {
    return true;
  }

  const [isOnScreen, setIsOnScreen] = useState(false);
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) =>{
      setIsOnScreen(entry.isIntersecting);
      // once on screen, disconnect observer
      if (entry.isIntersecting) {
        observerRef.current?.disconnect();
      }
    });
  }, []);

  useEffect(() => {
    observerRef.current?.observe(ref.current);
    return () => {
      observerRef.current?.disconnect();
    };
  }, [ref]);

  return isOnScreen;
}