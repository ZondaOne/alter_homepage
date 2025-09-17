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
    const mobileSection = mobileRef.current;
    
    if (parallaxSection) {
      // Set initial states with Hero styling
      gsap.set([".parallax-eyebrow", ".parallax-title .title-line", ".parallax-subtitle", ".parallax-button"], {
        opacity: 0,
        y: 60,
        rotationX: 15,
        force3D: true,
      });

      gsap.set([".parallax-eyebrow", ".parallax-title", ".parallax-subtitle", ".parallax-button", ".parallax-gradient-text"], {
        willChange: "transform, opacity",
      });

      // Master timeline for entrance
      const masterTL = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: parallaxSection,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      masterTL
        .to(".parallax-eyebrow", {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.6,
          transformOrigin: "center bottom"
        })
        .to(".parallax-title .title-line", {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: {
            amount: 0.2,
            from: "start"
          },
          transformOrigin: "center bottom"
        }, "-=0.3")
        .to(".parallax-subtitle", {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.6,
          transformOrigin: "center bottom"
        }, "-=0.5")
        .to(".parallax-button", {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.5,
          transformOrigin: "center bottom"
        }, "-=0.3");

      // Gradient text animation
      gsap.to(".parallax-gradient-text", {
        backgroundPosition: "200% 50%",
        repeat: -1,
        yoyo: true,
        duration: 8,
        ease: "sine.inOut",
      });

      // Floating animation
      gsap.to(".parallax-gradient-text", {
        y: -4,
        scale: 1.01,
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: "sine.inOut",
      });
    }

    // Mobile section animations
    if (mobileSection) {
      gsap.set([".mobile-title", ".mobile-subtitle", ".mobile-button"], {
        opacity: 0,
        y: 40,
        force3D: true,
      });

      const mobileTL = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: mobileSection,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      mobileTL
        .to(".mobile-title", {
          opacity: 1,
          y: 0,
          duration: 0.8,
        })
        .to(".mobile-subtitle", {
          opacity: 1,
          y: 0,
          duration: 0.6,
        }, "-=0.4")
        .to(".mobile-button", {
          opacity: 1,
          y: 0,
          duration: 0.5,
        }, "-=0.3");
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [mounted]);

  return (
    <>
      <Hero />
      <InteractiveBlobsSection />
      <main className="relative z-10">
        
        {/* Parallax Section with Hero-style text */}
        <section className="w-full" ref={parallaxRef}>
          <MyParallax
            scale={1}
            minScale={0.90}
            mobileRef={mobileRef}
          >
            <img
              src="/banner.png"
              alt="Innovation in technology"
              className="w-full h-auto object-cover rounded-lg shadow-xl"
              style={{ maxHeight: 'none' }}
            />
          </MyParallax>
        </section>

        {/* Gradient Section */}
        <StepProcessSection />

        {/* Grid Gallery */}
        <GridGallerySection />

        {/* MacBook Section */}
        <MacBookSection />
      </main>
    </>
  );
}