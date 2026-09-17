// pages/[slug].js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

const fallbackStoriesMap = {
  "education-scholarship-drive": {
    title: "Education Scholarship Drive Across Pune",
    description: "Ekarth Foundation provides up to ₹5,000 scholarship aid per eligible student directly to educational institutions to ensure zero dropouts due to financial hardship. Through our stringent 4-step evaluation process, we identify students with great academic promise and severe financial constraints, disbursing aid directly to schools and colleges to maintain 100% transparency.",
    youtubeLink: "",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
  },
  "school-kits-distribution": {
    title: "School Essentials & Educational Kits Distribution",
    description: "Delivering school bags, notebooks, geometry kits, uniforms, and essential learning materials to underprivileged students in rural and urban community schools. We ensure that no child feels unequipped or hesitant to attend school because they lack standard educational materials.",
    youtubeLink: "",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop",
  },
  "hospital-support-medical-aid": {
    title: "Hospital Support & Medical Aid Initiatives",
    description: "Partnering with healthcare centers and hospitals across Pune and Maharashtra to supply critical medical supplies, diagnostic assistance, and direct patient support for underserved families facing catastrophic healthcare costs.",
    youtubeLink: "",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
  },
  "youth-skill-development-camps": {
    title: "Youth Talent & Skill Development Workshops",
    description: "Organizing debate, art, digital literacy, and career orientation programs empowering students with vocational insights, self-confidence, and future career pathways.",
    youtubeLink: "",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
  },
};

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

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const fetchPost = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/blogs/by-slug/${slug}`);
          
          if (response.ok) {
            const data = await response.json();
            if (data.success && data.data) {
              setPost(data.data);
              return;
            }
          }

          // Check fallback map
          if (fallbackStoriesMap[slug]) {
            setPost(fallbackStoriesMap[slug]);
          } else {
            setPost(null);
          }
        } catch (error) {
          console.error('Error fetching post:', error);
          if (fallbackStoriesMap[slug]) {
            setPost(fallbackStoriesMap[slug]);
          } else {
            setPost(null);
          }
        } finally {
          setLoading(false);
        }
      };
  
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fced]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fced] px-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Story Not Found</h1>
        <p className="text-gray-600 mb-6">The story you are looking for does not exist or has been moved.</p>
        <Link href="/blogs" className="px-6 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition">
          Back to Stories of Impact
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fced] pt-24 pb-16">
      <Head>
        <title>{post.title} | Ekarth Foundation</title>
        <meta name="description" content={post.description} />
      </Head>

      <main className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Link href="/blogs" className="inline-flex items-center text-sm font-semibold text-emerald-800 hover:text-emerald-950">
            &larr; Back to all stories
          </Link>
        </div>

        <article className="bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-emerald-100">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">{post.title}</h1>
          
          {post.youtubeLink ? (
            <div className="mb-8">
              <div className="aspect-video w-full">
                <iframe
                  src={convertToEmbedUrl(post.youtubeLink)}
                  title={post.title}
                  className="w-full h-full rounded-xl shadow-md"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ) : post.image ? (
            <div className="mb-8 overflow-hidden rounded-xl">
              <img
                src={post.image}
                alt={post.title}
                className="w-full max-h-[420px] object-cover rounded-xl shadow-md"
              />
            </div>
          ) : null}

          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">{post.description}</p>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Published by <span className="font-semibold text-gray-900">Ekarth Foundation</span>
            </div>
            <Link
              href="/donate"
              className="px-6 py-2.5 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition"
            >
              Support This Mission
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}