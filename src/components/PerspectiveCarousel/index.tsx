// ABOUTME: 3D perspective carousel component with barrel distortion effect
// ABOUTME: Displays 14 images in a rotating 3D cylinder with drag and auto-rotation

import React from 'react';
import { imageUrls } from '@/lib/imageData';
import styles from './styles.module.css';

interface PerspectiveCarouselProps {
  images?: string[];
}

const PerspectiveCarousel: React.FC<PerspectiveCarouselProps> = ({
  images = imageUrls
}) => {
  // Create 7 arms, each containing 2 frames (14 total frames)
  const arms = Array.from({ length: 7 }, (_, armIndex) => {
    const frameStart = armIndex * 2;
    const armImages = [
      images[frameStart] || imageUrls[frameStart],
      images[frameStart + 1] || imageUrls[frameStart + 1]
    ];

    return (
      <div key={armIndex} className={styles.arm}>
        {armImages.map((imageSrc, frameIndex) => (
          <div key={frameIndex} className={styles.frame}>
            <img 
              src={imageSrc} 
              alt={`Carousel image ${frameStart + frameIndex + 1}`}
              draggable={false}
            />
          </div>
        ))}
      </div>
    );
  });

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carousel}>
        <div className={styles.armsContainer}>
          {arms}
        </div>
      </div>
    </div>
  );
};

export default PerspectiveCarousel;