"use client";

import Link from "next/link";
import Footer from "@/app/components/Footer";
import PerspectiveCarousel from "@/components/PerspectiveCarousel";
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
        <div className="space-background w-full h-[85vh] md:h-[100vh] rounded-4xl relative overflow-visible flex flex-col">
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
                {/* <Link
                  href="#about"
                  className="text-white text-md md:text-lg font-extrabold hover:text-white/90 transition-colors"
                  scroll={true}
                >
                  About
                </Link>
                <Link
                  href="#features"
                  className="text-white text-md md:text-lg font-extrabold hover:text-white/90 transition-colors"
                  scroll={true}
                >
                  Features
                </Link> */}
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
                <span className="text-white text-sm font-medium">Timmy - #1 App Blocker</span>
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
                  Cut Screen
                  <br />
                  Time in Half
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
                Improve your concentration and focus. Thousands have with Timmy.
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
              <motion.p
                className="text-white/50 text-sm mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.7,
                  ease: "easeOut",
                }}
              >
                3-day free trial & 100% money-back guarantee, no questions asked.
              </motion.p>
            </div>
            <motion.div
              className="lg:flex-1 flex justify-center mt-12 lg:mt-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: "easeOut",
              }}
            >
              <div className="relative flex gap-4 md:gap-8">
                <div className="relative transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                  <img
                    src="https://cdn.timm.so/screen_time_before.png"
                    alt="Screen time before"
                    className="w-48 md:w-64 rounded-3xl"
                  />
                </div>
                <svg
                  className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-3/4 w-12 md:w-16 opacity-80"
                  viewBox="0 0 850 352"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M293.728 191.843C312.896 171.405 327.65 149.977 334.798 124.141C341.221 100.93 339.359 78.2164 327.899 56.8614C316.948 36.4534 296.273 32.7935 278.341 47.5384C270.627 53.8884 265.125 61.8858 261.171 70.9807C253.993 87.4845 251.426 104.802 252.093 122.688C253.155 151.118 261.912 176.945 278.135 200.312C280.123 203.171 281.626 203.367 284.022 200.984C287.53 197.498 291.223 194.19 293.728 191.843ZM732.541 192.38C731.422 191.1 729.792 191.292 728.382 191.011C708.605 187.075 689.591 180.797 671.239 172.488C662.841 168.688 655.116 163.875 648.934 156.874C647.067 154.762 645.456 152.491 644.365 149.891C641.034 141.987 645.002 135.126 653.502 134.098C657.588 133.606 661.619 134.246 665.625 134.929C679.538 137.298 693.228 140.668 706.87 144.238C741.141 153.197 776.087 158.038 811.262 161.492C814.562 161.811 817.856 161.762 821.145 161.319C824.299 160.897 827.47 160.77 830.638 161.197C842.545 162.816 850.305 172.743 848.886 184.68C847.963 192.482 844.304 199.161 839.872 205.429C833.477 214.475 826.07 222.7 818.644 230.871C801.359 249.895 786.138 270.52 770.719 291.035C756.986 309.308 741.458 326.142 725.56 342.584C723 345.228 720.233 347.696 716.933 349.42C712.211 351.888 707.408 352.219 702.81 349.227C698.1 346.154 696.371 341.562 696.831 336.071C697.188 331.818 698.748 327.896 700.575 324.131C716.385 291.648 732.783 259.529 757.757 232.778C758.429 232.058 759.279 231.405 759.369 230.232C758.57 229.233 757.746 230.022 757.074 230.344C714.655 250.858 669.348 263.173 624.498 276.664C585.209 288.48 545.48 298.801 505.07 306.141C468.484 312.798 431.684 315.065 394.759 309.138C357.024 303.086 322.218 289.809 291.813 266.124C286.797 262.222 281.916 258.15 277.448 253.629C275.78 251.946 274.285 251.61 272.071 252.672C229.358 273.217 184.903 275.609 139.319 265.015C101.46 256.215 66.6088 240.85 36.0762 216.445C23.4441 206.343 11.6691 195.345 2.84008 181.585C-0.109491 176.992 -0.465761 173.871 1.86454 171.895C5.43387 168.882 8.5618 171.215 11.5455 173.13C32.2768 186.434 52.7523 200.195 74.9417 211.013C108.931 227.583 144.539 237.974 182.683 237.799C204.937 237.702 226.277 232.904 246.736 224.163C251.049 222.322 251.022 222.29 248.46 218.337C220.42 175.12 212.258 128.049 222.429 77.9129C227.192 54.4153 238.763 34.2936 257.338 18.5781C293.623 -12.1291 343.03 -2.96 365.136 39.1624C380.68 68.7852 382.605 100.3 373.856 132.166C363.35 170.433 341.14 201.424 311.426 227.271C306.829 231.269 306.675 231.274 311.777 234.877C340.652 255.254 372.99 265.85 408.047 268.436C442.061 270.937 475.503 266.557 508.645 259.388C563.101 247.602 616.388 231.774 668.873 213.111C689.091 205.921 709.389 198.926 730.201 193.551C731.014 193.344 731.976 193.337 732.541 192.38Z"
                    fill="white"
                  />
                </svg>
                <div className="relative transform rotate-6 hover:rotate-0 transition-transform duration-300">
                  <img
                    src="https://cdn.timm.so/screen_time_after.png"
                    alt="Screen time after"
                    className="w-48 md:w-64 rounded-3xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
          {/* <div className="relative justify-center scale-40 lg:scale-70 z-1">
            <PerspectiveCarousel />
          </div> */}
          <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[130%] h-[40%] bg-black rounded-[50%]"></div>
        </div>
        {/* <div className="relative">
          <div className="absolute left-[10%] w-[60%] bottom-75">
            <div className="gradient-blur"></div>
          </div>
        </div> */}
      </div>
      <div className="container mt-40">
        <Footer />
      </div>
    </div>
  );
}
