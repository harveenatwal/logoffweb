// ABOUTME: 3D perspective carousel component with barrel distortion effect
// ABOUTME: Displays 14 images in a rotating 3D cylinder with drag and auto-rotation

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, PanInfo, useAnimation } from 'framer-motion';
import { imageUrls } from '@/lib/imageData';
import styles from './styles.module.css';

interface PerspectiveCarouselProps {
  images?: string[];
}

const PerspectiveCarousel: React.FC<PerspectiveCarouselProps> = ({
  images = imageUrls
}) => {
  // State to track the committed rotation angle
  const [rotation, setRotation] = useState(0);
  
  // Framer Motion value to control the carousel's rotation
  const rotateY = useMotionValue(0);
  
  // Animation controls for auto-rotation
  const controls = useAnimation();
  
  // Timer ref for managing resume delay
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotation function
  const startAutoRotate = useCallback(() => {
    controls.start({
      rotateY: [rotateY.get(), rotateY.get() - 360],
      transition: { duration: 30, ease: 'linear', repeat: Infinity }
    });
  }, [controls, rotateY]);

  // Start auto-rotation on component mount
  useEffect(() => {
    startAutoRotate();
    
    // Cleanup function to stop animation and clear timer
    return () => {
      controls.stop();
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, [controls, startAutoRotate]);

  // Drag event handlers
  const handleDragStart = () => {
    // Stop auto-rotation when drag starts
    controls.stop();
    
    // Clear any pending resume timer
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Convert drag offset to rotation angle (sensitivity: -0.1 degrees per pixel)
    const dragRotation = info.offset.x * -0.1;
    rotateY.set(rotation + dragRotation);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Commit the rotation when drag ends
    const dragRotation = info.offset.x * -0.1;
    setRotation(current => current + dragRotation);
    
    // Resume auto-rotation after 5 seconds
    resumeTimerRef.current = setTimeout(() => {
      startAutoRotate();
    }, 5000);
  };

  // Create 7 arms, each containing 2 frames (14 total frames)
  const arms = Array.from({ length: 7 }, (_, armIndex) => {
    const frameStart = armIndex * 2;
    const armImages = [
      images[frameStart] || imageUrls[frameStart],
      images[frameStart + 1] || imageUrls[frameStart + 1]
    ];

    // Calculate rotation angle for this arm (360 degrees / 7 arms)
    const armRotationAngle = (360 / 7) * armIndex;
    const armTransform = `rotateY(${armRotationAngle}deg) translateZ(550px)`;

    return (
      <div 
        key={armIndex} 
        className={styles.arm}
        style={{ transform: armTransform }}
      >
        {armImages.map((imageSrc, frameIndex) => {
          // First frame: rotateY(90deg) translateZ(-130px)
          // Second frame: rotateY(-90deg) translateZ(-130px)
          const frameRotation = frameIndex === 0 ? 90 : -90;
          const frameTransform = `rotateY(${frameRotation}deg) translateZ(-130px)`;

          return (
            <div 
              key={frameIndex} 
              className={styles.frame}
              style={{ transform: frameTransform }}
            >
              <img 
                src={imageSrc} 
                alt={`Carousel image ${frameStart + frameIndex + 1}`}
                draggable={false}
              />
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <motion.div 
      className={styles.carouselWrapper}
      drag="x"
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      dragMomentum={false}
    >
      <motion.div className={styles.carousel}>
        <motion.div 
          className={styles.armsContainer}
          style={{ rotateY }}
          animate={controls}
        >
          {arms}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PerspectiveCarousel;