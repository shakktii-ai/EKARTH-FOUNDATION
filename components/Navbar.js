import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'top-5 m-2 bg-[#edffaa] shadow-md rounded-xl'
          : 'top-0 bg-white bg-opacity-95 backdrop-blur-sm shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative h-32 w-44 sm:h-12 sm:w-56">
                <Image
                  src="/ekarthword.png"
                  alt="Ekarth Foundation"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 font-manrope">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-green-800 font-medium transition-colors text-sm lg:text-base"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-green-800 font-medium transition-colors text-sm lg:text-base"
            >
              About
            </Link>
            <Link 
              href="/#programs" 
              className="text-gray-700 hover:text-green-800 font-medium transition-colors text-sm lg:text-base"
            >
              Programs
            </Link>
            <Link 
              href="/#impact" 
              className="text-gray-700 hover:text-green-800 font-medium transition-colors text-sm lg:text-base"
            >
              Impact
            </Link>
            <Link 
              href="/blogs" 
              className="text-gray-700 hover:text-green-800 font-medium transition-colors text-sm lg:text-base"
            >
              Blogs
            </Link>
            <Link 
              href="/#csr" 
              className="text-gray-700 hover:text-green-800 font-medium transition-colors text-sm lg:text-base"
            >
              CSR
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-green-800 font-medium transition-colors text-sm lg:text-base"
            >
              Contact
            </Link>
          </nav>

          {/* Contact and Donate */}
          <div className="flex items-center justify-end space-x-3 sm:space-x-4">
            <a 
              href="tel:+919922899786" 
              className="hidden lg:flex items-center border border-black rounded-xl rounded-r-3xl px-4 py-2 hover:border-green-800 hover:text-green-800 transition-colors text-sm font-medium"
            >
              +91 99228 99786
            </a>
            <Link 
              href="/donate" 
              className="bg-green-800 hover:bg-green-900 text-white px-5 sm:px-6 py-2 rounded-xl rounded-r-3xl font-medium transition-colors text-sm sm:text-base shadow-sm"
            >
              Donate Now
            </Link>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-green-800 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 mt-2 bg-white/95 rounded-b-xl px-2">
            <nav className="flex flex-col space-y-3 font-manrope">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-green-800 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-green-800 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/#programs" 
                className="text-gray-700 hover:text-green-800 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Programs
              </Link>
              <Link 
                href="/#impact" 
                className="text-gray-700 hover:text-green-800 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Impact
              </Link>
              <Link 
                href="/blogs" 
                className="text-gray-700 hover:text-green-800 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blogs
              </Link>
              <Link 
                href="/#csr" 
                className="text-gray-700 hover:text-green-800 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CSR Partnerships
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-green-800 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <a 
                href="tel:+919922899786" 
                className="text-gray-700 hover:text-green-800 font-medium transition-colors px-2 py-1 border-t border-gray-100 pt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                📞 +91 99228 99786
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
