

// components/Hero.js
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-[28rem] pt-28 sm:pt-32 pb-16 bg-[#f8fced] flex items-center justify-center px-4 sm:px-6 lg:px-12 font-manrope">
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 text-center md:text-left">
        
        {/* Left Side */}
        <div className="flex-1 mt-4 md:mt-0">
          <div className="inline-block px-3.5 py-1.5 mb-4 rounded-full bg-[#e8f79a]/60 text-green-900 text-xs sm:text-sm font-semibold tracking-wider uppercase">
            Ekarth Foundation
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light font-manrope text-gray-900 leading-tight">
            Empower. Educate. <br />
            <span className="italic font-medium text-green-900">Elevate.</span>
          </h1>

          <p className="mt-4 text-lg sm:text-xl font-medium text-gray-800">
            Supporting Education. Nurturing Futures.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap gap-4 justify-center md:justify-start items-center">
            <Link 
              href="/donate"
              className="bg-green-800 hover:bg-green-900 text-white font-medium px-6 py-3.5 sm:px-8 sm:py-3.5 rounded-full shadow-sm transition transform hover:-translate-y-0.5 text-sm sm:text-base"
            >
              Support Our Mission
            </Link>
            <Link 
              href="/#programs"
              className="bg-[#f1ffad] text-gray-900 font-medium px-6 py-3.5 sm:px-8 sm:py-3.5 rounded-full shadow-sm hover:bg-[#e8f79a] transition text-sm sm:text-base border border-gray-900/10"
            >
              Explore Our Programs
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 text-gray-700 font-light font-manrope sm:text-lg lg:text-xl leading-relaxed max-w-xl">
          <p>
            Every child deserves the opportunity to learn, grow and build a better future. Ekarth Foundation works to ensure that financial hardship never becomes a barrier to education, wellbeing and opportunity.
          </p>
          
          <div className="mt-8 pt-6 border-t border-gray-300/70 flex flex-wrap gap-3 justify-center md:justify-start text-xs sm:text-sm text-gray-600">
            <span className="bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-gray-200">
              📍 Pune, Maharashtra
            </span>
            <span className="bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-gray-200">
              📜 12A &amp; 80G Certified
            </span>
            <span className="bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-gray-200">
              🎓 SDG 4 &amp; 10 Aligned
            </span>
          </div>
        </div>
        
      </div>
    </section>
  );
}
