import Link from "next/link";
import Footer from "@/app/components/Footer";
import PerspectiveCarousel from "@/components/PerspectiveCarousel";
import "@/app/purple-body.css";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div className="h-10"></div>
      <div className="space-background container mx-auto w-full h-220 rounded-4xl relative overflow-visible flex flex-col">
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
              <Link
                href="#about"
                className="text-white text-lg font-extrabold hover:text-white/80 transition-colors"
                scroll={true}
              >
                About
              </Link>
              <Link
                href="#features"
                className="text-white text-lg font-extrabold hover:text-white/80 transition-colors"
                scroll={true}
              >
                Features
              </Link>
              <Link
                href="/contact"
                className="text-white text-lg font-extrabold hover:text-white/80 transition-colors"
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
        <div className="flex flex-col items-center flex-1 mt-12">
          <h1 className="text-8xl font-bold text-white mb-4 font-bricolage-grotesque">
            Meet Logoff
          </h1>
          <p className="text-3xl text-white/80 max-w-2xl text-center">
            Join thousands taking back their screen time — block apps together,
            achieve more
          </p>
          <button className="mt-8 px-8 py-4 bg-white text-black font-bold text-xl rounded-full hover:bg-white/90 transition-colors">
            Download the app!
          </button>
        </div>
        <PerspectiveCarousel />
        <div className="absolute -bottom-[15%] left-1/2 -translate-x-1/2 w-[120%] h-[30%] bg-black rounded-[50%]"></div>
      </div>
      <Footer />
    </div>
  );
}
