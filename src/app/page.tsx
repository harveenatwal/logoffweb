"use client";

import Link from "next/link";
import Footer from "@/app/components/Footer";
import PerspectiveCarousel from "@/components/PerspectiveCarousel";
import Marquee from "@/components/Marquee";
import { motion } from "framer-motion";
import "@/app/purple-body.css";

export default function Home() {
  return (
    <div className="min-h-screen h-full flex flex-col bg-black items-center">
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
      <div className="max-w-[118rem] px-10 w-full">
        <div className="space-background w-full h-220 rounded-4xl relative overflow-visible flex flex-col">
          <div className="flex justify-center">
            <div className="relative h-[32px] w-[32px]">
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
            <nav className="py-6 bg-black px-10 rounded-b-4xl">
              <div className="flex justify-center items-center gap-12">
                {/* <Link
                  href="#about"
                  className="text-white text-lg font-extrabold hover:text-white/90 transition-colors"
                  scroll={true}
                >
                  About
                </Link>
                <Link
                  href="#features"
                  className="text-white text-lg font-extrabold hover:text-white/90 transition-colors"
                  scroll={true}
                >
                  Features
                </Link> */}
                <Link
                  href="/contact"
                  className="text-white text-lg font-extrabold hover:text-white/90 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </nav>
            <div className="relative h-[32px] w-[32px]">
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
          <div className="flex flex-col items-center flex-1 mt-15">
            <motion.div className="overflow-hidden mb-4">
              <motion.h1
                className="text-8xl font-bold text-white font-bricolage-grotesque"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.33, 1, 0.68, 1], // Custom cubic-bezier for smooth effect
                }}
              >
                Meet Logoff
              </motion.h1>
            </motion.div>
            <motion.p
              className="text-3xl text-white/80 max-w-2xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut",
              }}
            >
              Join thousands taking back their screen time — block apps
              together, achieve more
            </motion.p>
            <motion.a
              href="https://apps.apple.com/us/app/logoff-app-blocker/id6670452224"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 px-8 py-4 bg-white text-black font-bold text-xl rounded-full hover:bg-white/90 transition-colors inline-block"
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
              Download the app!
            </motion.a>
          </div>
          <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[130%] h-[40%] bg-black rounded-[50%]"></div>
          <div className="absolute left-[10%] w-[60%] bottom-[30%]">
            <div className="gradient-blur"></div>
          </div>
          <div className="flex justify-center absolute bottom-10 left-0 right-0 ">
            <PerspectiveCarousel />
          </div>
        </div>
      </div>
      <div className="mt-40">
        <Footer />
      </div>
    </div>
  );
}
