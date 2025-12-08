"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./components/Hero";
import InteractiveBlobsSection from "./components/InteractiveBlobsSection";
import MobileShowcaseSection from "./components/MobileShowcaseSection";
import StepProcessSection from "./components/StepProcessSection";
import GridGallerySection from './components/GridGallerySection';
import MacBookSection from './components/MacBookSection';
import MyParallax from './components/MyParallax';
import ContactSection from './components/ContactSection';
import FAQ from './components/layout/FAQ';
import Image from "next/image";



gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

   useEffect(() => {
    const sectionId = sessionStorage.getItem("scrollToSection");
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
      sessionStorage.removeItem("scrollToSection");
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply Hero-style animations to parallax section
  useEffect(() => {
  if (!mounted) return;

  const parallaxSection = parallaxRef.current;

  
  if (parallaxSection) {
    // Set initial states without eyebrow
    gsap.set([".parallax-subtitle", ".parallax-button"], {
      opacity: 0,
      y: 60,
      rotationX: 15,
      force3D: true,
    });

    gsap.set([".parallax-subtitle", ".parallax-button", ".parallax-gradient-text"], {
      willChange: "transform, opacity",
    });

    const masterTL = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: parallaxSection,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    masterTL
      .to(".parallax-subtitle", {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.6,
        transformOrigin: "center bottom"
      }, "-=0.5")
 
  }


  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, [mounted]);


  return (
    <>
      <Hero />
      <div className="h-3 bg-white w-full"></div>
      <InteractiveBlobsSection />
      <div className="h-3 bg-white w-full"></div>
      <MobileShowcaseSection />
      <div className="h-3 bg-white w-full"></div>
      <article className="relative z-10">
        
        {/* Parallax Section with Hero-style text */}
        <section className="w-full bg-gray-50" ref={parallaxRef}>
          <MyParallax
            scale={1}
            minScale={0.95}
            mobileRef={mobileRef}
            leftLimit="-20vw"
          >
            <Image
            src="/banner.webp"
            alt="Zonda One team collaborating on custom software development projects with modern technology stack"
            width={1200}          // ancho inicial
            height={600}
            priority     
            className="w-full h-auto object-cover rounded-lg shadow-xl"
          />


          </MyParallax>
        </section>

        <div className="h-3 bg-white w-full"></div>

        {/* Gradient Section */}
        <StepProcessSection />

        <div className="h-3 bg-white w-full"></div>

        {/* Grid Gallery */}
        <GridGallerySection />

        <div className="h-3 bg-white w-full"></div>

        {/* MacBook Section */}
        <MacBookSection />

        <div className="h-3 bg-white w-full"></div>

        {/* FAQ Section */}
        <FAQ />

        {/* Contact Section */}
        <ContactSection />
      </article>
    </>
  );
}