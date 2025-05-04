import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col space-background text-white">
      <Header />
      <main className="flex-1 flex items-center pt-20 md:pt-0">

        <div className="container mx-auto ">
          <div className="flex flex-col md:flex-row items-center gap-8 mt-16 md:mt-0 px-4">

            <div className="w-full md:w-2/5 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-8 text-white">
                Find your focus <span className="bg-gradient-to-r from-[#A093E8] to-[#C4B5FD] bg-clip-text text-transparent">together</span>
              </h1>
              <p className="text-xl text-gray-00 mb-10"> {/* Increased font size and bottom margin */}
                Master screen time and unlock deeper focus, together. Invite friends, join group challenges, and support each other. 
              </p>
              <Link href="https://apps.apple.com/us/app/logoff-app-blocker/id6670452224" className="inline-flex items-center bg-white text-logoff-dark py-3 px-6 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A093E8] focus:ring-offset-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 814 1000">
                  <path xmlns="http://www.w3.org/2000/svg" d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
                </svg>
                Download on the App Store
              </Link>
            </div>

            <div className="w-full md:w-3/5 relative flex items-center justify-center">
              <video loop muted playsInline autoPlay  className='w-4/5 md:w-full'>
                <source src="https://cdn.logoffapp.com/0503(2).mov" type="video/mp4"/>
                  Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
