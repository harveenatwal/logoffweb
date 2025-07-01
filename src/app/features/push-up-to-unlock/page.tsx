"use client";

import Link from "next/link";

import Marquee from "@/components/Marquee";
import { motion } from "framer-motion";
import "@/app/purple-body.css";

export default function Home() {
  return (
    <div className="min-h-screen h-full flex flex-col bg-black items-center overflow-hidden">
      <div className="h-10">
        <Marquee speed={30}>
          <span className="text-white/60 text-sm font-medium space-x-6">
            <span className="line-through">TikTok</span>
            <span className="line-through">Instagram</span>
            <span className="line-through">YouTube</span>
            <span className="line-through">Twitter</span>
            <span className="line-through">Reddit</span>
            <span className="line-through">Snapchat</span>
            <span className="line-through">Facebook</span>
            <span className="line-through">Netflix</span>
            <span className="line-through">Twitch</span>
            <span className="line-through">Discord</span>
            <span className="line-through">Pinterest</span>
            <span className="line-through">LinkedIn</span>
          </span>
        </Marquee>
      </div>
      <div className="max-w-[118rem] px-2 sm:px-5 lg:px-10 w-full">
        <div className="space-background w-full rounded-4xl relative overflow-visible flex flex-col z-10">
          <div className="flex justify-center">
            <div className="relative h-[24px] w-[24px] md:h-[32px] md:w-[32px]">
              <div
                className="absolute top-0 left-0 w-full h-full bg-black"
                style={{
                  maskImage:
                    "radial-gradient(circle at 0 100%, transparent 32px, black 32px)",
                  WebkitMaskImage:
                    "radial-gradient(circle at 0 100%, transparent 32px, black 32px)",
                }}
              />
            </div>
            <nav className="py-3 md:py-6 bg-black px-10 rounded-b-4xl">
              <div className="flex justify-center items-center gap-12">
                <Link
                  href="#features"
                  className="text-white text-md md:text-lg font-extrabold hover:text-white/90 transition-colors"
                  scroll={true}
                >
                  Features
                </Link>
                <Link
                  href="/contact"
                  className="text-white text-md md:text-lg font-extrabold hover:text-white/90 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </nav>
            <div className="relative h-[24px] w-[24px] md:h-[32px] md:w-[32px]">
              <div
                className="absolute top-0 left-0 w-full h-full bg-black"
                style={{
                  maskImage:
                    "radial-gradient(circle at 100% 100%, transparent 32px, black 32px)",
                  WebkitMaskImage:
                    "radial-gradient(circle at 100% 100%, transparent 32px, black 32px)",
                }}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row flex-1 mt-13 lg:mt-15 px-4 relative z-10 w-full max-w-7xl mx-auto">
            <div className="flex flex-col items-center lg:items-start lg:flex-1 lg:pr-8">
              <motion.div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
              >
                <span className="text-white text-sm font-medium">
                  Free Feature
                </span>
              </motion.div>
              <motion.div className="overflow-hidden mb-4">
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl xl:text-8xl font-bold text-white font-bricolage-grotesque text-center lg:text-left"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.33, 1, 0.68, 1], // Custom cubic-bezier for smooth effect
                  }}
                >
                  Do Push-Ups
                  <br />
                  To Unlock Apps
                </motion.h1>
              </motion.div>
              <motion.p
                className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: "easeOut",
                }}
              >
                Get swole and build a massive chest.
              </motion.p>
              <motion.div
                className="flex items-center gap-2 text-white/60 text-sm sm:text-base mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: "easeOut",
                }}
              >
                <span>Loved by 10,000+ users with</span>
                <span className="text-yellow-400">⭐</span>
                <span>4.9 rating</span>
              </motion.div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-8">
                <motion.a
                  href="https://apps.apple.com/us/app/timm-app-blocker/id6670452224"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 md:px-8 py-3 md:py-4 bg-white text-black font-bold text-base md:text-lg rounded-full hover:bg-white/90 transition-colors inline-block text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                    ease: "easeOut",
                  }}
                >
                  Try for free
                </motion.a>
                <motion.a
                  href="https://discord.gg/fGnqhe7drG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 md:px-8 py-3 md:py-4 bg-white/10 text-white border border-white/20 font-bold text-base md:text-lg rounded-full hover:bg-white/20 transition-colors inline-block"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5,
                    ease: "easeOut",
                  }}
                >
                  Join our Discord
                </motion.a>
              </div>
            </div>
            <motion.div
              className="lg:flex-1 flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: "easeOut",
              }}
            >
              <div className="relative w-full max-w-xs mt-4 sm:mt-0">
                <video
                  src="https://cdn.timm.so/push-up-to-unlock.mov"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full rounded-3xl"
                />
              </div>
            </motion.div>
          </div>
          <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[130%] h-[40%] bg-black rounded-[50%]"></div>
        </div>
      </div>
    </div>
  );
}
