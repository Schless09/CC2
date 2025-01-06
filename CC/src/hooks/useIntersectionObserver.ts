// src/hooks/useIntersectionObserver.ts
import { useEffect, useRef } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

export const useIntersectionObserver = ({
  threshold = 0.25,
  rootMargin = '50px',
  enabled = true,
}: UseIntersectionObserverProps = {}) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const currentRef = containerRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.getElementsByClassName('appear-on-scroll');
            Array.from(elements).forEach((element) => {
              if (!element.classList.contains('is-visible')) {
                element.classList.add('is-visible');
              }
            });
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, enabled]);

  return containerRef;
};