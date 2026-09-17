
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Award, HeartHandshake, BookOpen, Users, Building2, Stethoscope, Sparkles } from "lucide-react";

const convertToEmbedUrl = (url) => {
  if (!url) return '';
  try {
    const urlObj = new URL(url);
    let videoId = '';
    if (urlObj.hostname.includes('youtube.com') && urlObj.searchParams.has('v')) {
      videoId = urlObj.searchParams.get('v');
    } else if (urlObj.hostname.includes('youtu.be')) {
      videoId = urlObj.pathname.slice(1);
    } else if (urlObj.pathname.includes('/shorts/')) {
      videoId = urlObj.pathname.split('/shorts/')[1].split('?')[0];
    } else if (urlObj.pathname.includes('/embed/')) {
      return url;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  } catch (error) {
    return url;
  }
};

export default function Our() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);
  const [blogs, setBlogs] = useState([]);

  // Curated fallback stories of impact
  const defaultImpactStories = [
    {
      title: "Education & Scholarships",
      description: "Structured scholarship assistance of up to ₹5,000 per student, ensuring that financial vulnerability never forces adolescents to drop out of school.",
      tag: "Academic Continuity",
      icon: BookOpen,
      slug: "about",
    },
    {
      title: "Healthcare & Wellness Camps",
      description: "Organising community health camps, preventive diagnostics, and medical assistance across under-resourced neighbourhoods in Pune.",
      tag: "Healthcare Aid",
      icon: Stethoscope,
      slug: "about",
    },
    {
      title: "Skill Development & Digital Literacy",
      description: "Empowering adolescents and youth with industry-aligned digital skills, computer fundamentals, and spoken English communication.",
      tag: "Career Readiness",
      icon: Sparkles,
      slug: "about",
    },
    {
      title: "Community & School Tie-Ups",
      description: "Collaborating directly with educational institutions, government schools, and stakeholders to identify deserving students and issue cheques directly.",
      tag: "Transparent Impact",
      icon: Building2,
      slug: "about",
    }
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        if (data && Array.isArray(data.data) && data.data.length > 0) {
          setBlogs(data.data);
        }
      } catch (error) {
        // Use default impact stories on error
      }
    };

    fetchBlogs();
  }, []);

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
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeIndex]);

  const displayedStories = blogs.length > 0 ? blogs.slice(-5) : defaultImpactStories;

  return (
    <div id="impact" className="relative bg-[#162b1b] text-white font-manrope scroll-mt-20">
      
      {/* 1. Verified Organisational Impact Statistics */}
      <div className="pt-16 pb-12 border-b border-[#2b4c33] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-widest uppercase text-[#EDFFAA] mb-3">
          Organisational Capacity &amp; Impact
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-10">
          Measurable Change in Communities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl bg-white/5 border border-[#2b4c33] backdrop-blur-sm flex flex-col justify-between">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#EDFFAA]">
              100+
            </span>
            <p className="mt-4 text-base sm:text-lg text-gray-200 font-light">
              Students supported since inception with targeted scholarship assistance.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 border border-[#2b4c33] backdrop-blur-sm flex flex-col justify-between">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#EDFFAA]">
              10,000+
            </span>
            <p className="mt-4 text-base sm:text-lg text-gray-200 font-light">
              Targeted beneficiaries across Pune and surrounding communities by 2027.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 border border-[#2b4c33] backdrop-blur-sm flex flex-col justify-between">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#EDFFAA]">
              500+
            </span>
            <p className="mt-4 text-base sm:text-lg text-gray-200 font-light">
              Healthcare and wellness camps to be organised across Pune till 2027.
            </p>
          </div>
        </div>
      </div>

      {/* 2. CSR Partnerships & SDG Alignment */}
      <div id="csr" className="py-16 border-b border-[#2b4c33] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#EDFFAA]/20 text-[#EDFFAA] text-xs font-semibold uppercase tracking-wider mb-4">
              CSR Partnerships
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-white leading-tight mb-6">
              Partner With Us To Keep Students Learning
            </h2>
            <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed mb-8">
              Education remains one of the most impactful and sustainable investments in social development. By partnering with Ekarth Foundation, organisations can directly contribute towards educational continuity for adolescents from financially vulnerable households.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                "Transparent fund utilisation",
                "Direct educational impact",
                "Measurable outcomes",
                "SDG-aligned implementation",
                "Regular impact reporting",
                "Scalable intervention model"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-200">
                  <CheckCircle2 className="h-4 w-4 text-[#EDFFAA] flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-[#EDFFAA] text-[#162b1b] px-6 py-3 rounded-xl rounded-r-3xl font-medium shadow-md hover:bg-yellow-200 transition-colors text-sm sm:text-base"
              >
                Partner With Us
              </Link>
              <Link
                href="/contact"
                className="border border-white/40 hover:border-white text-white px-6 py-3 rounded-xl rounded-r-3xl font-medium transition-colors text-sm sm:text-base"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* SDG Presentation */}
          <div className="bg-white/5 border border-[#2b4c33] rounded-3xl p-8 sm:p-10">
            <h3 className="text-xl sm:text-2xl font-light text-white mb-6 flex items-center gap-3">
              <Award className="h-6 w-6 text-[#EDFFAA]" />
              Aligned With Sustainable Development Goals
            </h3>

            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#C5192D]/20 border border-[#C5192D]/40">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 rounded-lg bg-[#C5192D] text-white font-bold flex items-center justify-center text-sm">
                    4
                  </span>
                  <h4 className="text-lg font-semibold text-white">
                    SDG 4 – Quality Education
                  </h4>
                </div>
                <p className="text-sm text-gray-200 font-light leading-relaxed">
                  Ensuring inclusive and equitable quality education and promoting lifelong learning opportunities for all.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#DD1367]/20 border border-[#DD1367]/40">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 rounded-lg bg-[#DD1367] text-white font-bold flex items-center justify-center text-sm">
                    10
                  </span>
                  <h4 className="text-lg font-semibold text-white">
                    SDG 10 – Reduced Inequalities
                  </h4>
                </div>
                <p className="text-sm text-gray-200 font-light leading-relaxed">
                  Reducing inequalities by creating equitable access to educational opportunities for vulnerable communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Stories of Impact Section */}
      <div className="pt-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-10 sm:pb-16 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-light text-[#edffaa] leading-tight mb-2">
              Stories of Impact
            </h1>
            <h2 className="text-3xl sm:text-4xl text-white font-light">
              Transforming Lives in Pune
            </h2>
          </div>
          <Link
            href="/about"
            className="text-xs sm:text-sm border font-light p-2 sm:p-3 rounded-l-xl rounded-r-3xl text-white hover:bg-[#edffaa] hover:text-black transition-colors whitespace-nowrap"
          >
            Explore All Initiatives
          </Link>
        </div>

        <main className="relative z-10 overflow-visible">
          {displayedStories.map((story, idx) => (
            <section
              key={idx}
              data-index={idx}
              ref={(el) => (sectionRefs.current[idx] = el)}
              className="sticky top-24 sm:top-28 min-h-[16rem] md:min-h-[18rem] flex flex-col items-center justify-center border-t border-b border-[#2b4c33] bg-[#162b1b] py-8 my-2 transition-colors"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 w-full">
                {/* Media or Visual Card */}
                <div className="w-full">
                  {story.youtubeLink ? (
                    <div className="aspect-video w-full">
                      <iframe
                        className="w-full h-full rounded-2xl shadow-lg"
                        src={convertToEmbedUrl(story.youtubeLink)}
                        title={story.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="p-8 rounded-2xl bg-white/5 border border-[#2b4c33] flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-[#EDFFAA]/10 border border-[#EDFFAA]/30 flex items-center justify-center flex-shrink-0">
                        {story.icon ? (
                          <story.icon className="h-7 w-7 text-[#EDFFAA]" />
                        ) : (
                          <HeartHandshake className="h-7 w-7 text-[#EDFFAA]" />
                        )}
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-widest text-[#EDFFAA] font-semibold">
                          {story.tag || "Core Initiative"}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-semibold text-white mt-1">
                          {story.title}
                        </h3>
                      </div>
                    </div>
                  )}
                </div>

                {/* Text Content */}
                <div className="text-center md:text-left px-2 md:px-0">
                  <Link href={story.slug ? `/${story.slug}` : "/about"}>
                    <h2 className="text-2xl sm:text-3xl text-white font-light hover:text-[#edffaa] transition-colors duration-300">
                      {story.title}
                    </h2>
                  </Link>
                  <p className="mt-3 text-base sm:text-lg text-gray-300 font-light leading-relaxed">
                    {story.description}
                  </p>
                  <div className="mt-5">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm text-[#EDFFAA] hover:underline"
                    >
                      <span>Learn how you can support this</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </main>
      </div>

    </div>
  );
}