

"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function StickySlidesOverlay() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestRatio = -1;
        let bestIndex = activeIndex;

        for (const entry of entries) {
          const idxAttr = entry.target.getAttribute("data-index");
          const idx = idxAttr ? parseInt(idxAttr, 10) : -1;
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestIndex = idx;
          }
        }

        if (bestIndex !== activeIndex && bestIndex >= 0) {
          setActiveIndex(bestIndex);
        }
      },
      {
        root: null,
        threshold: [0, 0.25, 0.5, 0.6, 0.75, 1],
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeIndex]);

  // Verified 8 Ekarth Foundation Programs
  const programs = [
    {
      num: "1",
      title: "Education Scholarships",
      desc: "Annual scholarship support for deserving underprivileged girls and youth to help cover tuition, books and educational materials. Scholarships of up to ₹5,000 per student.",
    },
    {
      num: "2",
      title: "Hospital Donations & Medical Aid",
      desc: "Supporting needy patients through hospital donations and medical assistance, including support for treatment, surgeries, medicines and diagnostics.",
    },
    {
      num: "3",
      title: "Talent Competitions",
      desc: "Academic, sports and creative competitions designed to identify, encourage and nurture hidden potential among rural and semi-urban youth.",
    },
    {
      num: "4",
      title: "Skill Development",
      desc: "Industry-aligned skill development opportunities including vocational skills, digital literacy, spoken English and computer basics.",
    },
    {
      num: "5",
      title: "Education Kits Distribution",
      desc: "Providing essential school supplies such as notebooks, stationery, school bags, uniforms, geometry boxes and water bottles.",
    },
    {
      num: "6",
      title: "Institutional Tie-Ups",
      desc: "Building partnerships with schools, colleges, government schools and skill-development institutes for structured and long-term student support.",
    },
    {
      num: "7",
      title: "Career Counselling",
      desc: "One-to-one guidance to help students understand career pathways, higher education opportunities and relevant government schemes.",
    },
    {
      num: "8",
      title: "Health Awareness Camps",
      desc: "Health awareness initiatives covering nutrition, hygiene, mental wellbeing and preventive healthcare in under-resourced communities.",
    },
  ];

  return (
    <div id="programs" className="relative bg-[#162b1b] pb-32 -mt-32 scroll-mt-24">
      <main className="relative z-10 overflow-visible">
        {/* Header */}
        <div className="pb-10 sm:pb-20">
          <h1 className="text-xl sm:text-2xl pt-10 mx-4 sm:mx-10 text-start font-light font-manrope text-[#edffaa] leading-tight">
            Our programs
          </h1>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mx-4 sm:mx-10">
            <h2 className="text-3xl sm:text-4xl font-light font-manrope text-white">
              What we do?
            </h2>
            <Link 
              href="/about"
              className="text-xs sm:text-sm font-light font-manrope border p-2 sm:p-3 rounded-l-xl rounded-r-3xl text-white hover:bg-[#edffaa] hover:text-black transition-colors whitespace-nowrap"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Slides */}
        {programs.map((item, index) => (
          <section
            key={index}
            data-index={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            className={`group sticky top-28 sm:top-32 min-h-[16rem] sm:h-64 
                        flex flex-col items-center justify-center 
                        mx-4 sm:mx-10 border-t bg-[#162b1b] py-6 sm:py-0 
                        transition duration-300 hover:text-yellow-200 
                        ${index === programs.length - 1 ? "border-b" : ""}`}
          >
            <div
              className="w-full text-white mx-auto flex flex-col md:flex-row 
                         items-start md:items-center justify-between gap-4 sm:gap-8 
                         px-2 sm:px-6 transition"
            >
              {/* Left Section */}
              <div className="flex items-center gap-3 sm:gap-6 min-w-[280px] lg:min-w-[380px]">
                <span className="text-4xl sm:text-6xl font-light font-manrope text-[#EDFFAA]">
                  {item.num}
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-light font-manrope">
                  {item.title}
                </h2>
              </div>

              {/* Right Section */}
              <div
                className="flex flex-col sm:flex-row items-start sm:items-center 
                           gap-3 sm:gap-6 w-full md:max-w-2xl"
              >
                {/* Button visible on hover */}
                <Link
                  href="/contact"
                  className="bg-[#E6FFB3] text-black px-4 sm:px-6 py-2 rounded-xl 
                             rounded-r-3xl font-medium shadow-md transition 
                             text-sm sm:text-base whitespace-nowrap opacity-0 
                             group-hover:opacity-100 group-hover:translate-y-0 
                             transform translate-y-2 duration-300"
                >
                  Get Involved
                </Link>

                <p className="text-base sm:text-lg font-light font-manrope leading-relaxed text-gray-200">
                  {item.desc}
                </p>
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
