import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Award, CheckCircle2, ShieldCheck, Heart, Sparkles, Target, ArrowRight } from 'lucide-react';

function About() {
  const scholarshipSteps = [
    {
      step: "01",
      title: "Identification",
      desc: "Students are identified through schools, community networks, referrals and local stakeholders across Pune and surrounding areas.",
    },
    {
      step: "02",
      title: "Verification",
      desc: "Applications are carefully assessed to understand financial circumstances, household vulnerability, and specific educational needs.",
    },
    {
      step: "03",
      title: "Scholarship Support",
      desc: "Selected students receive annual scholarship assistance aimed at reducing educational barriers and ensuring continuity of learning.",
    },
    {
      step: "04",
      title: "Direct School Payment",
      desc: "To maintain full transparency and accountability, scholarship cheques are issued directly to registered educational institutions.",
    },
  ];

  return (
    <>
      <Head>
        <title>About Us | Ekarth Foundation</title>
        <meta
          name="description"
          content="Ekarth Foundation is a Pune-based non-profit organisation dedicated to supporting the educational aspirations of adolescents and vulnerable children."
        />
      </Head>

      {/* Hero Banner */}
      <section className="min-h-[22rem] pt-28 pb-12 bg-[#f8fced] flex items-center justify-center px-4 sm:px-6 lg:px-12 font-manrope">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 text-center md:text-left">
          {/* Left Side */}
          <div className="flex-1">
            <div className="inline-block px-3.5 py-1 mb-3 rounded-full bg-[#e8f79a]/60 text-green-900 text-xs font-semibold tracking-wider uppercase">
              About Ekarth Foundation
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light font-manrope text-gray-900 leading-tight">
              Supporting Education. <br />
              <span className="italic font-medium text-green-900">Nurturing Futures.</span>
            </h1>
          </div>

          {/* Right Side */}
          <div className="flex-1 text-gray-700 font-light font-manrope text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl">
            <p>
              We believe that education is not merely a means of academic advancement, but a pathway to confidence, self-reliance, opportunity, and social mobility. Join us as we build a brighter tomorrow for every child.
            </p>
          </div>
        </div>
      </section>

      {/* Banner Visual */}
      <section className="h-[22rem] sm:h-[26rem] bg-[#f8fced] flex items-center justify-center relative overflow-hidden px-4 sm:px-8">
        <div className="relative w-full max-w-7xl h-full rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden shadow-md">
          <Image
            src="/image1.png"
            alt="Ekarth Foundation Community Work"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#162b1b]/80 via-transparent to-transparent flex items-end p-6 sm:p-12">
            <p className="text-white text-lg sm:text-2xl font-light font-manrope max-w-2xl">
              "Every child deserves the opportunity to learn, grow and build a better future."
            </p>
          </div>
        </div>
      </section>

      {/* Section: From the Desk of the Director & Inspiration */}
      <div className="bg-[#f5f3ed] py-16 px-4 sm:px-6 lg:px-8 font-manrope">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Director Section */}
          <div>
            <div className="mb-10">
              <p className="text-sm font-semibold text-green-900 uppercase tracking-widest mb-1">Leadership Message</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900">
                From the Desk of the Director
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Left: Message */}
              <div className="border border-gray-900/80 rounded-3xl p-6 sm:p-10 bg-white/40 flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold tracking-wider uppercase mb-3">
                      Foundation Inspiration
                    </span>
                    <h3 className="text-2xl font-normal text-gray-900 mb-2">
                      Hon. Shri Chandrakant Dada Patil
                    </h3>
                    <p className="text-sm font-medium text-amber-800">
                      Minister for Higher and Technical Education, Government of Maharashtra
                    </p>
                  </div>

                  <p className="text-base sm:text-lg font-light leading-relaxed text-gray-800">
                    Ekarth Foundation was established under the inspiration and visionary guidance of Hon. Shri Chandrakant Dada Patil.
                  </p>

                  <p className="text-sm sm:text-base font-light leading-relaxed text-gray-700">
                    His dedication to expanding higher, technical, and grassroots education across Maharashtra guides the Foundation's values of educational accessibility, institutional collaboration, and youth empowerment.
                  </p>

                  <div className="p-5 rounded-2xl bg-[#f8fced] border border-green-900/20">
                    <p className="text-sm font-medium text-green-900">
                      "Bridging educational inequalities ensures that merit and aspiration thrive regardless of economic circumstances."
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-900/20">
                  <p className="text-xs text-gray-600">
                    Guiding vision for youth skilling and higher education continuity in Pune.
                  </p>
                </div>
              </div>

              {/* Right: Visionary Guidance & Inspiration */}
               <div className="border border-gray-900/80 rounded-3xl p-6 sm:p-10 bg-white/40 flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-normal text-gray-900 mb-2">
                      Punit Joshi
                    </h3>
                    <p className="text-sm font-medium text-green-900 uppercase tracking-wider">
                      Director, Ekarth Foundation
                    </p>
                  </div>

                  <p className="text-base sm:text-lg font-light leading-relaxed text-gray-800">
                    "Education is one of the most powerful tools for transforming lives, yet for many children, financial hardship continues to stand between them and their aspirations."
                  </p>

                  <p className="text-sm sm:text-base font-light leading-relaxed text-gray-700">
                    "At Ekarth Foundation, our deepest resolve is to ensure that no child is denied the opportunity to learn, grow and succeed because of economic circumstances. Through targeted scholarship support and educational assistance, we help students remain connected to their studies and continue building a brighter future."
                  </p>

                  <p className="text-sm sm:text-base font-light leading-relaxed text-gray-700">
                    "We believe that education creates lasting change. Every student who remains in school gains not only knowledge, but also confidence, opportunity and the ability to shape a better life for themselves and their families."
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-900/20">
                  <p className="italic font-light text-gray-900 text-sm">
                    — Punit Joshi, Director
                  </p>
                </div>
              </div>

             
            </div>
          </div>

          {/* Section: Investing in Potential (Two Column About) */}
          <div className="pt-12">
            <div className="mb-10">
              <p className="text-sm font-semibold text-green-900 uppercase tracking-widest mb-1">Our Organization</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900">
                Investing in Potential, One Student at a Time
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Column Text */}
              <div className="border border-gray-900/80 rounded-3xl p-6 sm:p-10 bg-transparent space-y-6">
                <p className="text-base sm:text-lg font-light leading-relaxed text-gray-800">
                  <strong>Ekarth Foundation</strong> is a Pune-based non-profit organisation dedicated to supporting the educational aspirations of adolescents from economically vulnerable backgrounds.
                </p>

                <p className="text-sm sm:text-base font-light leading-relaxed text-gray-700">
                  The Foundation focuses on students aged <strong>12–18 years</strong> residing in and around Pune, where financial challenges can directly affect educational continuity.
                </p>

                <p className="text-sm sm:text-base font-light leading-relaxed text-gray-700">
                  School fees, examination charges, educational materials, transportation expenses and unforeseen financial emergencies can create barriers that prevent children from fully participating in their academic journey.
                </p>

                <p className="text-sm sm:text-base font-light leading-relaxed text-gray-700">
                  Ekarth Foundation provides structured scholarship assistance and educational support to help deserving students continue their studies without interruption.
                </p>

                <p className="text-sm sm:text-base font-light leading-relaxed text-gray-700">
                  Our approach is rooted in the belief that education is not merely a means of academic advancement, but a pathway to confidence, self-reliance, opportunity and social mobility.
                </p>
              </div>

              {/* Right Column Visual / Image */}
              <div className="relative rounded-3xl overflow-hidden h-[420px] lg:h-[500px] shadow-sm">
                <Image
                  src="/garib/img7.png"
                  alt="Ekarth Foundation Student Support"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 p-6 text-white">
                  <p className="text-sm font-medium text-[#EDFFAA]">A Pune-Based Non-Profit</p>
                  <p className="text-xs text-gray-200 mt-1">Focusing on adolescents aged 12–18 years for academic continuity.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Vision & Mission */}
          <div className="pt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Vision */}
              <div className="border border-gray-900 rounded-3xl p-8 sm:p-10 bg-white/30 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-green-900 text-white flex items-center justify-center mb-6">
                    <Target className="h-6 w-6 text-[#EDFFAA]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">
                    Our Vision
                  </h3>
                  <p className="text-base sm:text-lg font-light text-gray-700 leading-relaxed mb-4">
                    We envision a future where every child, regardless of their family's financial circumstances, can access quality education with dignity, stability and hope.
                  </p>
                  <p className="text-sm sm:text-base font-light text-gray-600 leading-relaxed">
                    Our goal is to nurture communities where economic hardship is never a barrier to learning, confidence or aspiration. By ensuring children from vulnerable households remain connected to their studies, we aim to break generational cycles of inequality.
                  </p>
                </div>
              </div>

              {/* Mission */}
              <div className="border border-gray-900 rounded-3xl p-8 sm:p-10 bg-white/30 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-green-900 text-white flex items-center justify-center mb-6">
                    <BookOpen className="h-6 w-6 text-[#EDFFAA]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">
                    Our Mission
                  </h3>
                  <p className="text-base sm:text-lg font-light text-gray-700 leading-relaxed mb-4">
                    To provide timely and targeted scholarship support to students aged 12–18, enabling them to continue their schooling without disruption.
                  </p>
                  <p className="text-sm sm:text-base font-light text-gray-600 leading-relaxed mb-4">
                    We are committed to strengthening academic continuity, improving performance and reducing the emotional burden that financial instability places on children.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                      SDG 4 – Quality Education
                    </span>
                    <span className="px-3 py-1 bg-pink-100 text-pink-800 text-xs font-semibold rounded-full">
                      SDG 10 – Reduced Inequalities
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: 4-Step Transparent Scholarship Support Model */}
          <div className="pt-12">
            <div className="mb-10 text-center max-w-3xl mx-auto">
              <span className="text-xs font-semibold tracking-widest text-green-900 uppercase">Accountable Approach</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mt-2">
                Our Scholarship Support Model
              </h2>
              <p className="text-base sm:text-lg text-gray-700 font-light mt-3">
                A structured, transparent and accountable system ensuring direct educational impact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {scholarshipSteps.map((item, i) => (
                <div key={i} className="border border-gray-900 rounded-3xl p-6 sm:p-8 bg-white/40 flex flex-col justify-between">
                  <div>
                    <span className="text-4xl sm:text-5xl font-light text-green-900 mb-4 block">
                      {item.step}
                    </span>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm font-light text-gray-700 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-green-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <ShieldCheck className="h-8 w-8 text-[#EDFFAA] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-medium text-[#EDFFAA]">Direct School Payment Transparency</h4>
                  <p className="text-sm text-gray-200 font-light mt-1">
                    This approach supports responsible fund utilisation, minimal administrative leakage, transparent implementation and direct educational impact.
                  </p>
                </div>
              </div>
              <Link
                href="/donate"
                className="bg-[#EDFFAA] hover:bg-yellow-200 text-green-950 font-medium px-6 py-3 rounded-full text-sm whitespace-nowrap transition-colors shadow-sm"
              >
                Support a Student
              </Link>
            </div>
          </div>

          {/* Section: What Does Ekarth Foundation Do? */}
          <div className="pt-12">
            <div className="border border-gray-900 rounded-3xl p-8 sm:p-12 bg-white/30">
              <div className="max-w-3xl mb-8">
                <h2 className="text-3xl sm:text-4xl font-light text-gray-900">
                  What Does Ekarth Foundation Do?
                </h2>
                <p className="text-base text-gray-700 font-light mt-2">
                  We work at the intersection of Education, Healthcare and Skill Development.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
                {[
                  "Provide educational scholarships to underprivileged girls and youth (up to ₹5,000/student)",
                  "Support needy patients through hospital donations and medical aid",
                  "Organise competitions to identify and nurture young talent",
                  "Run skill development programmes for underprivileged individuals",
                  "Distribute free education kits (stationery, bags, uniforms, supplies)",
                  "Facilitate partnerships with schools, colleges and skill-development institutes",
                  "Conduct health awareness camps and provide primary healthcare support",
                  "Promote digital literacy and career readiness among rural and semi-urban youth"
                ].map((action, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/60 border border-gray-200">
                    <CheckCircle2 className="h-5 w-5 text-green-800 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-800 font-light">{action}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-[#f8fced] border border-green-900/20 text-center sm:text-left">
                <p className="text-base sm:text-lg font-light text-green-950 leading-relaxed">
                  "Ekarth Foundation bridges the gap between privilege and potential. We work at the intersection of Education, Healthcare and Skill Development to ensure that poverty is never a barrier to opportunity."
                </p>
              </div>
            </div>
          </div>

          {/* Section: Why This Initiative Matters (Problem statement) */}
          <div className="pt-12">
            <div className="mb-10">
              <p className="text-sm font-semibold text-green-900 uppercase tracking-widest mb-1">Impact Rationale</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900">
                Education Should Never Depend on Household Income
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Educational Challenges */}
              <div className="border border-gray-900 rounded-3xl p-8 bg-white/40">
                <h3 className="text-2xl font-light text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-600"></span>
                  Educational Challenges
                </h3>
                <ul className="space-y-3 text-sm sm:text-base text-gray-700 font-light">
                  <li className="flex items-center gap-2">• Delayed fee payments causing academic disruption</li>
                  <li className="flex items-center gap-2">• Irregular attendance due to unpaid expenses</li>
                  <li className="flex items-center gap-2">• Reduced participation in essential school activities</li>
                  <li className="flex items-center gap-2">• Severe risk of adolescent school dropout</li>
                </ul>
              </div>

              {/* Emotional Challenges */}
              <div className="border border-gray-900 rounded-3xl p-8 bg-white/40">
                <h3 className="text-2xl font-light text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-600"></span>
                  Emotional Challenges
                </h3>
                <ul className="space-y-3 text-sm sm:text-base text-gray-700 font-light">
                  <li className="flex items-center gap-2">• Anxiety and chronic stress among students</li>
                  <li className="flex items-center gap-2">• Loss of confidence and academic self-esteem</li>
                  <li className="flex items-center gap-2">• Feelings of social exclusion among peers</li>
                  <li className="flex items-center gap-2">• Reduced motivation towards higher education</li>
                </ul>
              </div>
            </div>

            <p className="mt-8 text-base sm:text-lg text-gray-800 font-light text-center max-w-4xl mx-auto leading-relaxed">
              "By intervening during this critical stage of adolescence (aged 12–18), Ekarth Foundation helps ensure that temporary financial hardship does not become a permanent barrier to a child's future."
            </p>
          </div>

          {/* CTA Box */}
          <div className="pt-12 text-center">
            <div className="bg-[#162b1b] text-white rounded-3xl p-10 sm:p-16">
              <h2 className="text-3xl sm:text-4xl font-light mb-4">
                Support a Child's Education Today
              </h2>
              <p className="text-base sm:text-lg text-gray-300 font-light max-w-2xl mx-auto mb-8">
                Your partnership or contribution helps ensure that deserving adolescents in Pune continue their academic journey with dignity and hope.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/donate"
                  className="bg-[#EDFFAA] hover:bg-yellow-200 text-[#162b1b] font-medium px-8 py-3.5 rounded-full transition-colors text-sm sm:text-base"
                >
                  Donate Now
                </Link>
                <Link
                  href="/contact"
                  className="border border-white/40 hover:border-white text-white font-medium px-8 py-3.5 rounded-full transition-colors text-sm sm:text-base"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default About;