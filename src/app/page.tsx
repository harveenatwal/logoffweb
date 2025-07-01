"use client";

import Link from "next/link";
import Footer from "@/app/components/Footer";
import PerspectiveCarousel from "@/components/PerspectiveCarousel";
import Marquee from "@/components/Marquee";
import { motion, PanInfo } from "framer-motion";
import { useState } from "react";
import "@/app/purple-body.css";

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(0);

  const features = [
    {
      title: "Smart App Blocking & Time Limits",
      description:
        "Block distracting apps with intelligent rules. Set time limits, schedule blocks, and use location-based restrictions to stay focused when it matters most.",
      image: "https://cdn.timm.so/feature_block_screen.png",
    },
    {
      title: "Focus Sessions & Productivity Timer",
      description:
        "Start focused work sessions with built-in timers. Track your productive time and build consistency with daily focus streaks.",
      image: "https://cdn.timm.so/feature_focus_session.png",
    },
    {
      title: "Group Challenges & Social Accountability",
      description:
        "Join friends and family in group challenges. Share progress, compete on streaks, and stay motivated together with social accountability features.",
      image: "https://cdn.timm.so/feature_challenge.png",
    },
    {
      title: "Detailed Analytics & Insights",
      description:
        "Monitor your screen time, track weekly improvements, and get insights into your digital habits with comprehensive analytics and progress tracking.",
      image: "https://cdn.timm.so/feature_detailed_analytics.png",
    },
  ];

  const faqs = [
    {
      question: "How does Timmy actually block apps?",
      answer:
        "Timmy uses iOS Screen Time API to create unbreakable app restrictions. Unlike other apps, you cannot easily bypass blocks in moments of weakness - they're enforced at the system level.",
    },
    {
      question: "What makes group challenges work?",
      answer:
        "Social accountability is powerful. When you join a challenge, your friends can see if you break your commitments. This peer pressure helps you stay on track when willpower alone isn't enough.",
    },
    {
      question: "Can I use Timmy for work and personal time differently?",
      answer:
        "Yes! Set location-based rules to block social media at work but allow it at home. Create different schedules for weekdays vs weekends. Timmy adapts to your life.",
    },
    {
      question: "Will Timmy drain my battery?",
      answer:
        "No. Timmy is designed to be battery efficient. It only runs when checking app access or updating analytics - not constantly in the background.",
    },
    {
      question: "What if I need to access a blocked app in an emergency?",
      answer:
        "You can set up emergency bypass options or cooldown periods. If you need immediate access in a true emergency, you can always reach out to our support team for an emergency code. The key is making it just hard enough that you won't impulsively open apps, but not impossible when truly needed.",
    },
  ];

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
        <div className="space-background w-full h-[100vh] rounded-4xl relative overflow-visible flex flex-col z-10">
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
                  Timmy - #1 App Blocker
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
                    className="w-48 md:w-80 rounded-3xl"
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
                    className="w-48 md:w-80 rounded-3xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
          <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[130%] h-[40%] bg-black rounded-[50%]"></div>
        </div>
      </div>

      {/* What's Included Section */}
      <section
        id="features"
        className="pb-20 lg:pb-32 relative z-20 pt-24 lg:-mt-30 lg:pt-0"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-bricolage-grotesque">
              What does Timmy include?
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Features List */}
            <div className="space-y-4 text-left order-2 lg:order-1 flex flex-col items-stretch lg:items-end">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`border rounded-2xl p-6 cursor-pointer transition-all duration-300 w-full lg:w-3/4 ${
                    index === activeFeature
                      ? "bg-white/10 border-white/30 shadow-lg"
                      : "bg-white/5 border-white/10 hover:bg-white/8"
                  }`}
                  onClick={() => setActiveFeature(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="text-lg font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Phone Mockup */}
            <div className="w-full flex justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-md overflow-hidden">
                <motion.div
                  className="w-full h-[600px] lg:h-[750px] flex items-center justify-center lg:scale-125 lg:pointer-events-none"
                  key={activeFeature}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(event, info: PanInfo) => {
                    const swipeThreshold = 50;
                    if (info.offset.x > swipeThreshold && activeFeature > 0) {
                      setActiveFeature(activeFeature - 1);
                    } else if (
                      info.offset.x < -swipeThreshold &&
                      activeFeature < features.length - 1
                    ) {
                      setActiveFeature(activeFeature + 1);
                    }
                  }}
                  whileTap={{ cursor: "grabbing" }}
                >
                  <img
                    src={features[activeFeature].image}
                    alt={features[activeFeature].title}
                    className="w-full h-full object-contain select-none"
                  />
                </motion.div>
                {/* Dots indicator */}
                <div className="flex justify-center mt-6 gap-2">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveFeature(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === activeFeature ? "bg-white" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perspective Carousel Section */}
      <div className="relative py-20">
        <div className="relative flex justify-center scale-40 lg:scale-70">
          <PerspectiveCarousel />
        </div>
        <div className="relative">
          <div className="absolute left-[10%] w-[60%] bottom-0">
            <div className="gradient-blur"></div>
          </div>
        </div>
      </div>

      {/* Why Choose Timmy Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-bricolage-grotesque">
              Why choose Timmy?
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Timmy is the most effective app blocker for focus.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Benefit 1 */}
            <motion.div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-6">🎯</div>
              <h3 className="text-xl font-bold text-white mb-4">
                Get deep work done
              </h3>
              <p className="text-white/70 leading-relaxed">
                Block distractions during work hours and actually complete
                important projects. Users report 3x more productive sessions.
              </p>
            </motion.div>

            {/* Benefit 2 */}
            <motion.div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-6">👥</div>
              <h3 className="text-xl font-bold text-white mb-4">
                Stay accountable together
              </h3>
              <p className="text-white/70 leading-relaxed">
                Join challenges with friends and family. When someone tries to
                break their streak, the group knows - social pressure works.
              </p>
            </motion.div>

            {/* Benefit 3 */}
            <motion.div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-6">📱</div>
              <h3 className="text-xl font-bold text-white mb-4">
                Break phone addiction
              </h3>
              <p className="text-white/70 leading-relaxed">
                Cut your screen time in half with smart blocking that cannot be
                easily bypassed. Average users save 2+ hours daily.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section with Color Blocking */}
      <div className="max-w-[118rem] px-2 sm:px-5 lg:px-10 w-full">
        <section className="w-full rounded-4xl relative overflow-hidden bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-transparent">
          <div className="py-20 lg:py-32">
            <div className="mx-auto px-4 max-w-4xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-bricolage-grotesque">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-white/70">
                  Everything you need to know about Timmy
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setActiveQuestion(
                          activeQuestion === index ? null : index
                        )
                      }
                      className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                        activeQuestion === index
                          ? "bg-gradient-to-r from-purple-600/20 to-purple-500/10 border border-purple-500/30"
                          : "bg-white/5 border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white pr-4">
                          {faq.question}
                        </h3>
                        <span
                          className={`text-2xl text-purple-400 transition-transform duration-300 ${
                            activeQuestion === index ? "rotate-45" : ""
                          }`}
                        >
                          +
                        </span>
                      </div>

                      <motion.div
                        initial={false}
                        animate={{
                          height: activeQuestion === index ? "auto" : 0,
                          marginTop: activeQuestion === index ? 16 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-white/70 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="container mt-40">
        <Footer />
      </div>
    </div>
  );
}
