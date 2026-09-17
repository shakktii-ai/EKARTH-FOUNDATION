import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";

// Utility function to convert YouTube links to embed format
const convertToEmbedUrl = (url) => {
  if (!url) return '';
  
  try {
    const urlObj = new URL(url);
    let videoId = '';
    
    // Format: https://www.youtube.com/watch?v=VIDEO_ID
    if (urlObj.hostname.includes('youtube.com') && urlObj.searchParams.has('v')) {
      videoId = urlObj.searchParams.get('v');
    }
    // Format: https://youtu.be/VIDEO_ID
    else if (urlObj.hostname.includes('youtu.be')) {
      videoId = urlObj.pathname.slice(1);
    }
    // Format: https://www.youtube.com/shorts/VIDEO_ID
    else if (urlObj.pathname.includes('/shorts/')) {
      videoId = urlObj.pathname.split('/shorts/')[1].split('?')[0];
    }
    // Already embed format
    else if (urlObj.pathname.includes('/embed/')) {
      return url;
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  } catch (error) {
    console.error('Error converting YouTube URL:', error);
    return url;
  }
};

const fallbackStories = [
  {
    slug: "education-scholarship-drive",
    title: "Education Scholarship Drive Across Pune",
    description: "Ekarth Foundation provides up to ₹5,000 scholarship aid per eligible student directly to educational institutions to ensure zero dropouts due to financial hardship.",
    youtubeLink: "",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "school-kits-distribution",
    title: "School Essentials & Educational Kits Distribution",
    description: "Delivering school bags, notebooks, stationery sets, and learning materials to underprivileged students in rural and urban community schools.",
    youtubeLink: "",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "hospital-support-medical-aid",
    title: "Hospital Support & Medical Aid Initiatives",
    description: "Partnering with healthcare centers and hospitals to supply critical medical supplies and direct patient support for underserved families.",
    youtubeLink: "",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "youth-skill-development-camps",
    title: "Youth Talent & Skill Development Workshops",
    description: "Organizing debate, art, and career orientation programs empowering students with vocational insights, self-confidence, and future career pathways.",
    youtubeLink: "",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
  },
];

function Blogs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);
  const [blogs, setBlogs] = useState([]);
  const [displayCount, setDisplayCount] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/blogs");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.data) && data.data.length > 0) {
            setBlogs(data.data);
          } else {
            setBlogs(fallbackStories);
          }
        } else {
          setBlogs(fallbackStories);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs(fallbackStories);
      } finally {
        setIsLoading(false);
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
  }, [activeIndex, blogs]);

  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 5);
  };

  const handleLoadPrevious = () => {
    setDisplayCount(prevCount => Math.max(5, prevCount - 5));
  };

  const displayedBlogs = Array.isArray(blogs) ? blogs.slice(0, displayCount) : [];
  const hasMore = Array.isArray(blogs) && displayCount < blogs.length;
  const hasPrevious = displayCount > 5;

  return (
    <>
      <Head>
        <title>Stories of Impact | Ekarth Foundation</title>
        <meta name="description" content="Explore stories of change, education scholarships, and community initiatives led by Ekarth Foundation in Pune and Maharashtra." />
      </Head>

      {/* Hero Section */}
      <section className="min-h-[20rem] pt-20 bg-[#f8fced] flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-light font-marnrope text-gray-900 leading-tight">
              Stories of Impact
            </h1>
          </div>
          <div className="flex-1 text-gray-700 text-base font-marnrope md:text-lg leading-relaxed max-w-lg">
            <p>
              We believe in the power of collective effort to bring hope,
              educational equity, and long-term empowerment to students and families in need.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Sections */}
      <div className="relative bg-[#162b1b] font-marnrope pb-20">
        <div className="pb-16">
          <h1 className="text-2xl pt-10 mx-6 sm:mx-10 text-start font-light text-[#edffaa] leading-tight">
            Our Initiatives
          </h1>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mx-6 sm:mx-10 mt-4 gap-3">
            <h2 className="text-3xl md:text-4xl text-white font-semibold">
              Transforming Lives Through Action
            </h2>
            <Link href="/about">
              <h2 className="text-sm border p-3 rounded-l-xl rounded-r-3xl text-white hover:bg-[#edffaa] hover:text-black transition-all duration-300 cursor-pointer">
                Learn More
              </h2>
            </Link>
          </div>
        </div>

        <main className="relative z-10 overflow-visible">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[26rem]">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#edffaa] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white text-lg">Loading stories...</p>
              </div>
            </div>
          ) : displayedBlogs.length > 0 ? (
            displayedBlogs.map((blog, idx) => (
              <section
                key={idx}
                data-index={idx}
                ref={(el) => (sectionRefs.current[idx] = el)}
                className="sticky top-24 sm:top-28 min-h-[18rem] md:min-h-[22rem] lg:min-h-[26rem] flex flex-col items-center justify-center mx-4 sm:mx-10 border-t border-b border-[#2b4c33] bg-[#162b1b] py-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 w-full max-w-6xl">
                  {/* Media (Video or Fallback Image) */}
                  <div className="w-full">
                    {blog.youtubeLink ? (
                      <div className="aspect-video w-full">
                        <iframe
                          className="w-full h-full rounded-2xl shadow-lg"
                          src={convertToEmbedUrl(blog.youtubeLink)}
                          title={blog.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-lg bg-emerald-900/40">
                        {blog.image ? (
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#edffaa] font-semibold text-lg p-6 text-center border border-emerald-700/50 rounded-2xl">
                            {blog.title}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Text */}
                  <div className="text-center md:text-left px-4 md:px-0">
                    <Link href={`/${blog.slug}`}>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold font-marnrope hover:text-[#edffaa] transition-colors duration-300">
                        {blog.title}
                      </h2>
                    </Link>
                    <p className="mt-3 text-base md:text-lg font-marnrope text-gray-200">
                      {blog.description ? blog.description.split(" ").slice(0, 30).join(" ") + (blog.description.split(" ").length > 30 ? "..." : "") : ""}
                    </p>
                    <div className="mt-4">
                      <Link href={`/${blog.slug}`} className="inline-flex items-center text-sm font-semibold text-[#edffaa] hover:underline">
                        Read Story &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            ))
          ) : (
            <p className="text-white text-center py-10">No stories found.</p>
          )}

          {/* Pagination Buttons */}
          {(hasMore || hasPrevious) && (
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 mt-12 flex gap-4">
              {hasPrevious && (
                <button
                  onClick={handleLoadPrevious}
                  className="text-sm border px-6 py-3 rounded-l-xl rounded-r-3xl text-white hover:bg-[#edffaa] hover:text-black transition-all duration-300 cursor-pointer"
                >
                  Previous
                </button>
              )}
              {hasMore && (
                <button
                  onClick={handleLoadMore}
                  className="text-sm border px-6 py-3 rounded-l-xl rounded-r-3xl text-white hover:bg-[#edffaa] hover:text-black transition-all duration-300 cursor-pointer"
                >
                  Next
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Blogs;