// ABOUTME: Marquee component with infinite scroll and edge fade effects
// ABOUTME: Displays scrolling text with smooth fade-out/in on both edges

"use client";

import React from "react";
import styles from "./styles.module.css";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number; // Speed in seconds for one complete scroll
}

const Marquee: React.FC<MarqueeProps> = ({ children, speed = 30 }) => {
  return (
    <div className={`mx-auto container ${styles.marqueeContainer}`}>
      <div className={styles.fadeLeft} />
      <div className={styles.fadeRight} />
      <div className={styles.marqueeContent}>
        <div
          className={styles.marqueeTrack}
          style={{ animationDuration: `${speed}s` }}
        >
          <div className={styles.marqueeItem}>{children}</div>
          <div className={styles.marqueeItem}>{children}</div>
          <div className={styles.marqueeItem}>{children}</div>
          <div className={styles.marqueeItem}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
