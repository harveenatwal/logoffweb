// ABOUTME: 3D perspective carousel component with barrel distortion effect
// ABOUTME: Displays 14 images in a rotating 3D cylinder with drag and auto-rotation

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, PanInfo, useAnimation } from "framer-motion";
import { imageUrls } from "@/lib/imageData";
import { useResponsiveCarousel } from "./useResponsiveCarousel";
import styles from "./styles.module.css";

interface PerspectiveCarouselProps {
  /**
   * Array of 14 image URLs to display in the 3D carousel.
   * Falls back to default placeholder images if not provided.
   */
  images?: string[];
}

const PerspectiveCarousel: React.FC<PerspectiveCarouselProps> = ({
  images,
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

  /**
   * Initiates the automatic clockwise rotation animation
   * Rotates 360 degrees clockwise over 30 seconds with infinite repeat
   */
  const startAutoRotate = useCallback(() => {
    controls.start({
      // Animate from current position to current position - 360 degrees (clockwise)
      transform: [`perspective(600px) rotateY(${rotateY.get() - 360}deg)`],
      transition: {
        duration: 45,
        ease: "linear", // Constant speed
        repeat: Infinity, // Loop indefinitely
      },
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
   * Generate the 3D arm structure
   * Creates 7 arms arranged in a circle, each containing 2 frames
   */
  const arms = Array.from({ length: 7 }, (_, armIndex) => {
    const frameStart = armIndex * 2;
    const armImages = [
      carouselImages[frameStart],
      carouselImages[frameStart + 1],
    ];

    // Custom rotation angles for each arm
    const armRotationAngles = [0, 30, 60, 90, 120, 150, 180];
    const armRotationAngle = armRotationAngles[armIndex];

    // Apply arm transforms: rotate around Y-axis and push out to form cylinder
    const armTransform = `rotateY(${armRotationAngle}deg)`;

    // Determine additional CSS classes based on arm index
    let armClasses = styles.arm;
    if (armIndex > 0) {
      armClasses += ` ${styles.notFirstArm}`;
      armClasses += ` ${styles.otherArms}`;
    }

    return (
      <div
        key={armIndex}
        className={armClasses}
        style={{ transform: armTransform }}
      >
        {armImages.map((imageSrc, frameIndex) => {
          const frameRotation = frameIndex === 0 ? 90 : -90;
          const frameTransform = `rotateY(${frameRotation}deg)`;

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
      dragMomentum={false} // Disable momentum for precise control
      style={{
        transform: `perspective(800px) rotateY(${rotateY.get()}deg)`,
      }}
      animate={controls} // Auto-rotation animation control
    >
      <div className={styles.carousel}>
        <div className={styles.armsContainer}>{arms}</div>
      </div>
    </motion.div>
  );
};

export default PerspectiveCarousel;
