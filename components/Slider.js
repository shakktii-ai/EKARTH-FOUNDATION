
// "use client";

// import Image from "next/image";

// export default function Slider() {
//   const testimonials = [
    
//     {
//     image: "/garib/img1.png",
//     quote: "They alone live who live for others, the rest are more dead than alive.",
//     name: "— Swami Vivekananda"
//   },
//   {
//     image: "/garib/img2.png",
//     quote: "Man needs difficulties in life because they are necessary to enjoy success.",
//     name: "— Dr. A.P.J. Abdul Kalam"
//   },
//   {
//     image: "/garib/img3.png",
//     quote: "Service of mankind is service to God.",
//     name: "— Swami Vivekananda"
//   },
//   {
//     image: "/garib/img4.png",
//     quote: "If you want peace, do not look for fault in others; look within yourself.",
//     name: "— Swami Sivananda"
//   },
//   {
//     image: "/garib/img5.png",
//     quote: "Faith is taking the first step even when you don’t see the whole staircase.",
//     name: "— Dr. Martin Luther King Jr."
//   },
//   {
//     image: "/garib/img6.png",
//     quote: "The fragrance of flowers spreads only in the direction of the wind. But the goodness of a person spreads in all directions.",
//     name: "— Chanakya"
//   },
//   {
//     image: "/garib/img7.png",
//     quote: "When you help others, you help yourself. The act of service purifies the heart.",
//     name: "— Sri Sri Ravi Shankar"
//   },
//   {
//     image: "/garib/img8.png",
//     quote: "Do your duty without expecting any reward for it.",
//     name: "— Bhagavad Gita"
//   }
//   ];

//   return (
//     <main className="bg-[#f8fced] mb-[10rem]">
//       <div className="slider">
//         <div className="slide-track">
//           {/* First set of testimonials */}
//           {testimonials.map((testimonial, i) => (
//             <div className="slide" key={`first-${i}`}>
//               <div className="testimonial-card">
//                 <Image
//                   src={testimonial.image}
//                   alt={`${testimonial.name} testimonial`}
//                   width={300}
//                   height={400}
//                   priority={i < 4}
//                 />
//                 <div className="overlay">
//                   {/* <div className="location">{testimonial.location}</div> */}
//                   <div className="content-bottom">
//                     <div className="quote">"{testimonial.quote}"</div>
//                     <div className="name">{testimonial.name}</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//           {/* Duplicate set for seamless loop */}
//           {testimonials.map((testimonial, i) => (
//             <div className="slide" key={`second-${i}`}>
//               <div className="testimonial-card">
//                 <Image
//                   src={testimonial.image}
//                   alt={`${testimonial.name} testimonial`}
//                   width={300}
//                   height={400}
//                 />
//                 <div className="overlay">
//                   <div className="location">{testimonial.location}</div>
//                   <div className="content-bottom">
//                     <div className="quote">"{testimonial.quote}"</div>
//                     <div className="name">{testimonial.name}</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         .slider {
//           overflow: hidden;
//           position: relative;
//           width: 100%;
//           padding: 2.5rem 0;
//         }

//         .slide-track {
//           display: flex;
//           gap: 1rem;
//           width: calc((300px + 1rem) * ${testimonials.length * 2});
//           animation: scroll 60s linear infinite;
//           will-change: transform;
//         }

//         .slide {
//           flex: 0 0 auto;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .testimonial-card {
//           position: relative;
//           width: 250px;
//           height: 350px;
//           border-radius: 12px;
//           overflow: hidden;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//         }

//         .testimonial-card :global(img) {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           transition: transform 0.3s ease;
//         }

//         .overlay {
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: linear-gradient(
//             to bottom,
//             rgba(0, 0, 0, 0.3) 0%,
//             rgba(22, 43, 27, 0.5) 30%,
//             rgba(22, 43, 27, 0.92) 70%,
//             rgba(22, 43, 27, 0.95) 100%
//           );
//           color: white;
//           padding: 1.5rem;
//           display: flex;
//           flex-direction: column;
//           justify-content: flex-end;
//           transform: translateY(100%);
//           transition: transform 0.4s ease-out;
//         }

//         .testimonial-card:hover .overlay {
//           transform: translateY(0);
//         }

//         .testimonial-card:hover {
//           transform: scale(1.05);
//           box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
//         }

//         .testimonial-card:hover :global(img) {
//           transform: scale(1.1);
//         }

//         .location {
//           font-size: 0.95rem;
//           font-weight: 400;
//           color: rgba(255, 255, 255, 0.95);
//           margin-bottom: 1rem;
//           position: absolute;
//           top: 1.5rem;
//           left: 1.5rem;
//           opacity: 0;
//           transform: translateY(20px);
//           transition: all 0.5s ease 0.1s;
//         }

//         .testimonial-card:hover .location {
//           opacity: 1;
//           transform: translateY(0);
//         }

//         .quote {
//           font-size: 1.1rem;
//           line-height: 1.5;
//           color: white;
//           font-weight: 400;
//           margin-bottom: 1.5rem;
//           text-align: left;
//           opacity: 0;
//           transform: translateY(30px);
//           transition: all 0.6s ease 0.2s;
//         }

//         .testimonial-card:hover .quote {
//           opacity: 1;
//           transform: translateY(0);
//         }

//         .name {
//           font-size: 1.2rem;
//           font-weight: 300;
//           color: #B8E6B8;
//           letter-spacing: 0.5px;
//           opacity: 0;
//           transform: translateY(25px);
//           transition: all 0.7s ease 0.3s;
//         }

//         .testimonial-card:hover .name {
//           opacity: 1;
//           transform: translateY(0);
//         }

//         .content-bottom {
//           margin-top: auto;
//         }

//         .slider:hover .slide-track {
//           animation-play-state: paused;
//         }

//         @keyframes scroll {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(calc(-50%));
//           }
//         }

//         .slide-track {
//           backface-visibility: hidden;
//           perspective: 1000px;
//         }

//         @media (max-width: 768px) {
//           .testimonial-card {
//             width: 200px;
//             height: 280px;
//           }
          
//           .slide-track {
//             width: calc((200px + 1rem) * ${testimonials.length * 2});
//           }
          
//           .overlay {
//             padding: 1rem;
//           }
          
//           .quote {
//             font-size: 0.9rem;
//           }
          
"use client";

import Image from "next/image";

export default function Slider() {
  const commitments = [
    {
      image: "/garib/img1.png",
      quote: "Empower. Educate. Elevate.",
      name: "— Ekarth Foundation"
    },
    {
      image: "/garib/img2.png",
      quote: "Every child deserves the opportunity to learn, grow and build a better future.",
      name: "— Educational Equity"
    },
    {
      image: "/garib/img3.png",
      quote: "Supporting Education. Nurturing Futures across Pune and surrounding communities.",
      name: "— Our Vision"
    },
    {
      image: "/garib/img4.png",
      quote: "Targeted scholarship assistance to ensure academic continuity without disruption.",
      name: "— Academic Continuity"
    },
    {
      image: "/garib/img5.png",
      quote: "Scholarship cheques issued directly to educational institutions for full transparency.",
      name: "— Transparent Support"
    },
    {
      image: "/garib/img6.png",
      quote: "Bridging the gap between privilege and potential for underprivileged youth.",
      name: "— Social Mobility"
    },
    {
      image: "/garib/img7.png",
      quote: "Industry-aligned skill development and digital literacy for career readiness.",
      name: "— Youth Empowerment"
    },
    {
      image: "/garib/img8.png",
      quote: "Health awareness, nutrition, and medical aid for under-resourced families.",
      name: "— Community Wellbeing"
    }
  ];

  return (
    <main className="bg-[#f8fced] mb-[6rem] sm:mb-[8rem]">
      <div className="slider">
        <div className="slide-track">
          {/* First set of cards */}
          {commitments.map((item, i) => (
            <div className="slide" key={`first-${i}`}>
              <div className="testimonial-card">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={400}
                  priority={i < 4}
                />
                <div className="overlay">
                  <div className="content-bottom">
                    <div className="bg-[#162b1b] h-[10rem] sm:h-[13rem] md:h-[15rem] lg:h-[17rem] -mb-10 -mx-7 px-6 sm:px-8 pt-6 sm:pt-8 rounded-t-full flex flex-col justify-center">
                      <div className="quote font-light font-manrope text-xs sm:text-sm md:text-base leading-relaxed text-white">
                        "{item.quote}"
                      </div>
                      <div className="name font-medium font-manrope mt-2 text-xs sm:text-sm text-[#EDFFAA]">
                        {item.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Duplicate set for seamless infinite loop */}
          {commitments.map((item, i) => (
            <div className="slide" key={`second-${i}`}>
              <div className="testimonial-card">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={400}
                />
                <div className="overlay">
                  <div className="content-bottom">
                    <div className="bg-[#162b1b] h-[10rem] sm:h-[13rem] md:h-[15rem] lg:h-[17rem] -mb-10 -mx-7 px-6 sm:px-8 pt-6 sm:pt-8 rounded-t-full flex flex-col justify-center">
                      <div className="quote font-light font-manrope text-xs sm:text-sm md:text-base leading-relaxed text-white">
                        "{item.quote}"
                      </div>
                      <div className="name font-medium font-manrope mt-2 text-xs sm:text-sm text-[#EDFFAA]">
                        {item.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .slider {
          overflow: hidden;
          position: relative;
          width: 100%;
          padding: 2rem 0;
        }

        .slide-track {
          display: flex;
          gap: 1.25rem;
          width: calc((280px + 1.25rem) * ${commitments.length * 2});
          animation: scroll 50s linear infinite;
          will-change: transform;
        }

        .slide {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .testimonial-card {
          position: relative;
          width: 260px;
          height: 360px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .testimonial-card :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(22, 43, 27, 0.4) 40%,
            rgba(22, 43, 27, 0.95) 100%
          );
          color: white;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          transform: translateY(60%);
          transition: transform 0.4s ease-out;
        }

        .testimonial-card:hover .overlay {
          transform: translateY(0);
        }

        .testimonial-card:hover {
          transform: scale(1.03);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.22);
        }

        .testimonial-card:hover :global(img) {
          transform: scale(1.08);
        }

        .quote {
          text-align: left;
        }

        .content-bottom {
          margin-top: auto;
        }

        .slider:hover .slide-track {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50%));
          }
        }

        .slide-track {
          backface-visibility: hidden;
          perspective: 1000px;
        }

        @media (max-width: 768px) {
          .testimonial-card {
            width: 220px;
            height: 310px;
          }
          
          .slide-track {
            width: calc((220px + 1.25rem) * ${commitments.length * 2});
          }
        }
      `}</style>
    </main>
  );
}