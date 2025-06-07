// ABOUTME: Custom hook for responsive 3D carousel viewport adjustments
// ABOUTME: Returns perspective and translateZ values based on screen width breakpoints

import { useState, useEffect } from 'react';

interface ResponsiveCarouselValues {
  perspective: string;
  translateZ: string;
}

export const useResponsiveCarousel = (): ResponsiveCarouselValues => {
  const [values, setValues] = useState<ResponsiveCarouselValues>({
    perspective: '500px',
    translateZ: '550px', // Default to Studio Display values
  });

  useEffect(() => {
    const updateValues = () => {
      const width = window.innerWidth;
      
      if (width < 768) {
        // Phone: shows ~3 frames
        setValues({
          perspective: '500px',
          translateZ: '180px',
        });
      } else if (width <= 1280) {
        // MacBook: shows ~6 frames
        setValues({
          perspective: '500px',
          translateZ: '350px',
        });
      } else {
        // Studio Display: shows ~9 frames
        setValues({
          perspective: '500px',
          translateZ: '550px',
        });
      }
    };

    // Set initial values
    updateValues();

    // Listen for window resize events
    window.addEventListener('resize', updateValues);

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', updateValues);
    };
  }, []);

  return values;
};