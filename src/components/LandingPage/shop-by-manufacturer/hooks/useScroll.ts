// components/shop-by-manufacturer/hooks/useScroll.ts
import { useRef, useCallback } from 'react';

export const useScroll = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }, []);

  return {
    scrollContainerRef,
    scrollLeft,
    scrollRight
  };
};