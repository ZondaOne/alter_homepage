"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./components/Hero";
import InteractiveBlobsSection from "./components/InteractiveBlobsSection";
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
      <InteractiveBlobsSection />
      <article className="relative z-10">
        
        {/* Parallax Section with Hero-style text */}
        <section className="w-full" ref={parallaxRef}>
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

        {/* Gradient Section */}
        <StepProcessSection />

        {/* Grid Gallery */}
        <GridGallerySection />

        {/* MacBook Section */}
        <MacBookSection />

        {/* FAQ Section */}
        <FAQ />

        {/* Contact Section */}
        <ContactSection />
      </article>
    </>
  );
}