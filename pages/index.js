
import Head from "next/head";
import localFont from "next/font/local";

import Hero from "@/components/Hero";
import Slider from "@/components/Slider";
import StickySlidesOverlay from "@/components/StickySlidesOverlay";
import About from "@/components/About";

import Our from "@/components/Our";
export default function Home() {
  return (
    <>
    <Head>
        <title>Ekarth Foundation | Empower. Educate. Elevate.</title>
        <meta name="description" content="Ekarth Foundation is dedicated to supporting education, empowering underprivileged students, and nurturing futures through scholarships, medical aid, and community development." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
       <Hero /> 
       <Slider />
<StickySlidesOverlay />
<About />
<Our />

      
    </>
  );
}
