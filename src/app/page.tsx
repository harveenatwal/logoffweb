
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-logoff-white text-logoff-dark"> {/* Use brand colors */}
      {/* Header Placeholder - Could include Logoff logo */}
      <header className="p-4 sm:p-6">
        {/* <Image src="/logoff-logo.svg" alt="Logoff Logo" width={120} height={40} /> */}
        <span className="text-xl font-semibold text-logoff-dark">Logoff</span> {/* Placeholder Logo */}
      </header>

      {/* Main Content Area */}
      <main className="flex flex-col items-center justify-center flex-grow p-8 text-center gap-8">
        {/* Astronaut Placeholder - Replace with actual image/component. Use brand colors for placeholder */}
        <div className="w-40 h-40 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
          <span className="text-gray-500 dark:text-gray-400 text-sm">(Astronaut Here)</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          Ready to find your focus?
        </h1>

        <p className="max-w-md text-lg text-logoff-dark/80"> {/* Slightly muted text */}
          Logoff helps you gently navigate your digital world, encouraging balance and mindful screen time without the pressure. It's your friendly guide to logging off and living more.
        </p>

        {/* Call to Action - Link to App Store or more info */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <a
            href="#app-store-link" // Replace with actual App Store link
            className="rounded-full bg-logoff-purple text-logoff-white hover:opacity-90 font-medium text-base px-6 py-3 transition-opacity" // Use brand purple
          >
            Get Logoff on the App Store
          </a>
        </div>
      </main>

      {/* Footer Placeholder */}
      <footer className="p-4 sm:p-6 text-center text-sm text-logoff-dark/60"> {/* Muted footer text */}
        © {new Date().getFullYear()} Logoff. All rights reserved.
      </footer>
    </div>
  );
}
