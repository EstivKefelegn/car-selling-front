// components/hero/hooks/useCarousel.ts
import { useState, useEffect, useCallback } from 'react';

export const useCarousel = (images: string[]) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [bgLoaded, setBgLoaded] = useState(false);

  // Preload all images
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = images.length;
    
    images.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setBgLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setBgLoaded(true);
        }
      };
    });
  }, [images]);

  // Auto-slide functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  return {
    currentSlide,
    isPlaying,
    bgLoaded,
    goToSlide,
    nextSlide,
    prevSlide,
    togglePlayPause
  };
};