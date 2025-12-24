import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black text-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-black bg-opacity-80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image src="/next.svg" alt="Logo" width={100} height={20} className="dark:invert" />
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-lg">
            <a href="#" className="hover:text-gray-400 transition-colors">Home</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Features</a>
            <a href="#" className="hover:text-gray-400 transition-colors">About</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Contact</a>
          </nav>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-20">
        <section className="min-h-screen flex items-center justify-center text-center bg-gradient-to-b from-gray-900 to-black">
          <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
              Build the Future, Today.
            </h1>
            <p className="text-lg md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Experience the next generation of web development. Blazing fast, SEO-friendly, and infinitely scalable.
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-110 shadow-lg shadow-green-500/50">
              Discover More
            </button>
          </div>
        </section>

        {/* Firebase Data Section (Placeholder) */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-10">Data from Firebase</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Placeholder Content */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-2">Coming Soon</h3>
                <p className="text-gray-400">Dynamic content from Firebase will be displayed here.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-2">Coming Soon</h3>
                <p className="text-gray-400">Dynamic content from Firebase will be displayed here.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-2">Coming Soon</h3>
                <p className="text-gray-400">Dynamic content from Firebase will be displayed here.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-center py-8">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} My Awesome App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
