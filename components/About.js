"use client";
import { useState, useEffect } from "react";

export default function About() {
  const images = [
    "/garib/img1.png",
    "/garib/img2.png",
    "/garib/img3.png",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = images.length;
  const [fade, setFade] = useState(false);

  // Auto slide every 3 seconds with smooth fade
  useEffect(() => {
    const timer = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
        setFade(false);
      }, 500); // fade timing
    }, 3000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  return (
    <div className="min-h-screen bg-[#f5f3ed] px-4 sm:px-6 py-16 font-manrope">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xl sm:text-2xl text-green-900 font-medium mb-2">About us</p>
          <h1 className="text-4xl sm:text-5xl font-light text-gray-900">
            A nonprofit organisation
          </h1>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mission Box */}
          <div className="bg-transparent rounded-xl rounded-br-[4rem] sm:rounded-br-[5rem] p-6 sm:p-8 border border-gray-900 shadow-sm flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-manrope font-light m-4 sm:m-8 text-[#162b1b] mb-4">
              Our mission
            </h2>
            <p className="text-lg sm:text-xl font-manrope font-light m-4 sm:m-8 text-[#162b1b] leading-relaxed">
              To provide timely and targeted scholarship support to students aged 12–18, enabling them to continue their schooling without disruption. We are committed to strengthening academic continuity, improving performance, and reducing the financial burden that vulnerability places on young learners.
            </p>
          </div>

          {/* Why Support Us */}
          <div className="bg-transparent rounded-xl rounded-r-[4rem] sm:rounded-r-[5rem] p-6 sm:p-8 border border-gray-900 shadow-sm flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl m-4 sm:m-8 font-light font-manrope text-[#162b1b] mb-4">
              Why Our Work Matters
            </h2>
            <p className="text-lg sm:text-xl m-4 sm:m-8 font-light font-manrope text-[#162b1b] leading-relaxed">
              Quality education is the cornerstone of societal mobility. Helping students remain enrolled without interruption reduces stress, builds lasting confidence, and strengthens vulnerable households. Our work contributes directly to breaking cycles of educational inequality across Pune and surrounding communities.
            </p>
          </div>

          {/* Image Carousel Box */}
          <div className="bg-transparent rounded-xl rounded-bl-[4rem] sm:rounded-bl-[5rem] overflow-hidden border border-gray-900 shadow-sm relative min-h-[320px] lg:min-h-[380px]">
            <div className="relative h-full w-full bg-gray-200">
              <img
                src={images[currentSlide]}
                alt={`Ekarth Foundation impact slide ${currentSlide + 1}`}
                className={`w-full h-full object-cover transition-opacity duration-700 ${
                  fade ? "opacity-0" : "opacity-100"
                }`}
              />

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx === currentSlide
                        ? "bg-white scale-125 shadow-md"
                        : "bg-white/50"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Story Box */}
          <div className="bg-transparent rounded-xl rounded-tl-[3rem] p-6 sm:p-8 border border-gray-900 shadow-sm flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl m-4 sm:m-8 font-light font-manrope text-[#162b1b] mb-4">
              Investing in Potential
            </h2>
            <p className="text-lg sm:text-xl font-light font-manrope m-4 sm:m-8 text-[#162b1b] leading-relaxed">
              Ekarth Foundation is a Pune-based non-profit organisation dedicated to ensuring that poverty never becomes a barrier to educational aspiration and opportunity. We bridge the gap between privilege and potential through structured scholarships, healthcare aid, skill development, and community support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
