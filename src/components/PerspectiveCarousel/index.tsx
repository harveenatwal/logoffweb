// ABOUTME: 3D perspective carousel component with barrel distortion effect
// ABOUTME: Displays 14 images in a rotating 3D cylinder with drag and auto-rotation

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, PanInfo, useAnimation } from 'framer-motion';
import { imageUrls } from '@/lib/imageData';
import { useResponsiveCarousel } from './useResponsiveCarousel';
import styles from './styles.module.css';

interface PerspectiveCarouselProps {
  /**
   * Array of 14 image URLs to display in the 3D carousel.
   * Falls back to default placeholder images if not provided.
   */
  images?: string[];
}

const PerspectiveCarousel: React.FC<PerspectiveCarouselProps> = ({
  images
}) => {
  // Use provided images or fall back to default imageUrls
  const carouselImages = images && images.length >= 14 ? images : imageUrls;
  // State to track the committed rotation angle
  const [rotation, setRotation] = useState(0);
  
  // Framer Motion value to control the carousel's rotation
  const rotateY = useMotionValue(0);
  
  // Animation controls for auto-rotation
  const controls = useAnimation();
  
  // Timer ref for managing resume delay
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Responsive values for different screen sizes
  const { perspective, translateZ } = useResponsiveCarousel();

  /**
   * Initiates the automatic clockwise rotation animation
   * Rotates 360 degrees clockwise over 30 seconds with infinite repeat
   */
  const startAutoRotate = useCallback(() => {
    controls.start({
      // Animate from current position to current position - 360 degrees (clockwise)
      rotateY: [rotateY.get(), rotateY.get() - 360],
      transition: { 
        duration: 30,           // 30 seconds for full rotation
        ease: 'linear',         // Constant speed
        repeat: Infinity        // Loop indefinitely
      }
    });
  }, [controls, rotateY]);

  /**
   * Auto-rotation lifecycle management
   * Starts rotation on mount and handles cleanup on unmount
   */
  useEffect(() => {
    // Begin auto-rotation immediately when component mounts
    startAutoRotate();
    
    // Cleanup function: stop animations and clear timers on unmount
    return () => {
      controls.stop();
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, [controls, startAutoRotate]);

  /**
   * Drag event handlers for user interaction
   * These handle the pause/resume logic and real-time rotation updates
   */
  const handleDragStart = () => {
    // Immediately stop auto-rotation when user starts dragging
    controls.stop();
    
    // Clear any pending resume timer to prevent overlapping timers
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Convert horizontal drag distance to rotation angle
    // Sensitivity: -0.1 degrees per pixel (negative for natural drag direction)
    const dragRotation = info.offset.x * -0.1;
    
    // Apply real-time rotation by combining base rotation with current drag offset
    rotateY.set(rotation + dragRotation);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Calculate final rotation based on total drag distance
    const dragRotation = info.offset.x * -0.1;
    
    // Commit the rotation to state for future drag calculations
    setRotation(current => current + dragRotation);
    
    // Schedule auto-rotation to resume after 5 seconds of inactivity
    resumeTimerRef.current = setTimeout(() => {
      startAutoRotate();
    }, 5000);
  };

  /**
   * Generate the 3D arm structure
   * Creates 7 arms arranged in a circle, each containing 2 frames
   */
  const arms = Array.from({ length: 7 }, (_, armIndex) => {
    const frameStart = armIndex * 2;
    const armImages = [
      carouselImages[frameStart],
      carouselImages[frameStart + 1]
    ];

    // Calculate rotation angle for this arm (360° ÷ 7 arms = ~51.43° per arm)
    const armRotationAngle = (360 / 7) * armIndex;
    
    // Apply arm transforms: rotate around Y-axis and push out to form cylinder
    // translateZ value is responsive and determines the cylinder radius
    const armTransform = `rotateY(${armRotationAngle}deg) translateZ(${translateZ})`;

    return (
      <div 
        key={armIndex} 
        className={styles.arm}
        style={{ transform: armTransform }}
      >
        {armImages.map((imageSrc, frameIndex) => {
          // Position frames perpendicular to arm direction for barrel effect
          // First frame: rotate 90° and translate inward by half frame width (130px)
          // Second frame: rotate -90° and translate inward by half frame width
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
      style={{ perspective }} // Dynamic perspective for responsive viewing
      drag="x"
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      dragMomentum={false} // Disable momentum for precise control
    >
      <motion.div className={styles.carousel}>
        <motion.div 
          className={styles.armsContainer}
          style={{ rotateY }} // Manual rotation control during drag
          animate={controls}  // Auto-rotation animation control
        >
          {arms}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PerspectiveCarousel;