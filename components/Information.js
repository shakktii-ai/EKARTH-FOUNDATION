// import React, { useEffect, useState } from 'react';

// const ScrollOverlapComponent = () => {
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const sections = [
//     {
//       id: 1,
//       number: "1",
//       title: "Digital Innovation",
//       description: "We create cutting-edge digital solutions that transform businesses and drive growth in the modern marketplace through innovative technology.",
//       color: "#1e3a2e"
//     },
//     {
//       id: 2,
//       number: "2", 
//       title: "Strategic Planning",
//       description: "Our comprehensive strategic planning services help organizations navigate complex challenges and achieve sustainable long-term success.",
//       color: "#2d4a3e"
//     },
//     {
//       id: 3,
//       number: "3",
//       title: "Community Empowerment", 
//       description: "Through economic development programs, we help families and communities become self-sufficient. This includes micro-loan initiatives, skills training, and capacity building.",
//       color: "#3c5a4e"
//     },
//     {
//       id: 4,
//       number: "4",
//       title: "Clean Water for All",
//       description: "Access to clean water is essential for health and well-being, yet many communities still lack this basic necessity. Our Clean Water for All program builds sustainable water systems.",
//       color: "#4b6a5e"
//     },
//     {
//       id: 5,
//       number: "5", 
//       title: "Emergency Relief",
//       description: "When disaster strikes, we are there. From natural disasters to humanitarian crises, we provide immediate relief and long-term recovery support to help rebuild communities.",
//       color: "#5a7a6e"
//     }
//   ];

//   const getSectionTransform = (index) => {
//     // Handle server-side rendering
//     if (typeof window === 'undefined') {
//       return index === 0 ? 'translateY(0%)' : 'translateY(100%)';
//     }
    
//     const sectionHeight = window.innerHeight;
    
//     // For the first section, it stays in place
//     if (index === 0) {
//       return 'translateY(0%)';
//     }
    
//     // For other sections, calculate their position based on scroll
//     // Section starts moving when previous section's scroll area begins
//     const startScrollPosition = (index - 1) * sectionHeight;
//     const scrollProgress = Math.max(0, Math.min(1, (scrollY - startScrollPosition) / sectionHeight));
    
//     // Move from 100% (below screen) to 0% (on screen)
//     const translateY = (1 - scrollProgress) * 100;
    
//     return `translateY(${translateY}%)`;
//   };

//   return (
//     <div >
//     <div className="relative" style={{ height: `${sections.length * 100}vh` }}>
//       {sections.map((section, index) => {
//         const transform = getSectionTransform(index);
        
//         return (
//           <div
//             key={section.id}
//             className="fixed inset-0 h-screen flex items-center justify-between px-8 md:px-16"
//             style={{
//               backgroundColor: section.color,
//               transform: transform,
//               zIndex: index + 1,
//             }}
//           >
//             {/* Left side - Number and Title */}
//             <div className="flex-1 max-w-md">
//               <div className="text-6xl md:text-8xl font-bold text-white/20 mb-4">
//                 {section.number}
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//                 {section.title}
//               </h2>
//             </div>

//             {/* Right side - Description */}
//             <div className="flex-1 max-w-lg ml-8">
//               <p className="text-lg md:text-xl text-white/90 leading-relaxed">
//                 {section.description}
//               </p>
//             </div>

//             {/* Decorative line */}
//             <div className="absolute top-0 left-8 right-8 h-px bg-white/20"></div>
//           </div>
//         );
//       })}
//     </div>
//     </div>
//   );
// };

// export default ScrollOverlapComponent;
import React, { useEffect, useState } from 'react';

const ScrollOverlapComponent = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    {
      id: 1,
      number: "1",
      title: "Digital Innovation",
      description: "We create cutting-edge digital solutions that transform businesses and drive growth in the modern marketplace through innovative technology.",
      color: "#1e3a2e"
    },
    {
      id: 2,
      number: "2", 
      title: "Strategic Planning",
      description: "Our comprehensive strategic planning services help organizations navigate complex challenges and achieve sustainable long-term success.",
      color: "#2d4a3e"
    },
    {
      id: 3,
      number: "3",
      title: "Community Empowerment", 
      description: "Through economic development programs, we help families and communities become self-sufficient. This includes micro-loan initiatives, skills training, and capacity building.",
      color: "#3c5a4e"
    },
    {
      id: 4,
      number: "4",
      title: "Clean Water for All",
      description: "Access to clean water is essential for health and well-being, yet many communities still lack this basic necessity. Our Clean Water for All program builds sustainable water systems.",
      color: "#4b6a5e"
    },
    {
      id: 5,
      number: "5", 
      title: "Emergency Relief",
      description: "When disaster strikes, we are there. From natural disasters to humanitarian crises, we provide immediate relief and long-term recovery support to help rebuild communities.",
      color: "#5a7a6e"
    }
  ];

  const getSectionTransform = (index) => {
    // Handle server-side rendering
    if (typeof window === 'undefined') {
      return index === 0 ? 'translateY(0%)' : 'translateY(100%)';
    }
    
    const sectionHeight = window.innerHeight;
    
    // For the first section, it stays in place
    if (index === 0) {
      return 'translateY(0%)';
    }
    
    // For other sections, calculate their position based on scroll
    // Section starts moving when previous section's scroll area begins
    const startScrollPosition = (index - 1) * sectionHeight;
    const scrollProgress = Math.max(0, Math.min(1, (scrollY - startScrollPosition) / sectionHeight));
    
    // Move from 100% (below screen) to 0% (on screen)
    const translateY = (1 - scrollProgress) * 100;
    
    return `translateY(${translateY}%)`;
  };

  return (
    <>
      {/* Other content before scroll section */}
      <div className="bg-gray-100 p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Site</h1>
        <p className="text-xl">This content appears before the scroll overlap section</p>
      </div>

      {/* Scroll Overlap Section */}
      <div className="relative" style={{ height: `${sections.length * 100}vh` }}>
        {sections.map((section, index) => {
          const transform = getSectionTransform(index);
          
          return (
            <div
              key={section.id}
              className="fixed inset-0 h-screen flex items-center justify-between px-8 md:px-16"
              style={{
                backgroundColor: section.color,
                transform: transform,
                zIndex: index + 1,
              }}
            >
              {/* Left side - Number and Title */}
              <div className="flex-1 max-w-md">
                <div className="text-6xl md:text-8xl font-bold text-white/20 mb-4">
                  {section.number}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {section.title}
                </h2>
              </div>

              {/* Right side - Description */}
              <div className="flex-1 max-w-lg ml-8">
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  {section.description}
                </p>
              </div>

              {/* Decorative line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-white/20"></div>
            </div>
          );
        })}
      </div>

      {/* Other content after scroll section */}
      <div className="bg-blue-100 p-8 text-center min-h-screen">
        <h2 className="text-4xl font-bold mb-4">More Content</h2>
        <p className="text-xl mb-8">This content appears after the scroll overlap section</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Feature 1</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Feature 2</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Feature 3</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollOverlapComponent;