"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./components/Hero";
import InteractiveBlobsSection from "./components/InteractiveBlobsSection";
import GradientSection from "./components/GradientSection";
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
            text={
              <div className="text-black space-y-8">
                <div className="parallax-eyebrow text-sm font-medium tracking-wider uppercase text-orange-400">
                  ELEVATE YOUR VISION
                </div>
                <h1 className="parallax-title text-4xl lg:text-5xl xl:text-6xl font-semibold leading-[0.9] tracking-tight font-display">
                  <div className="title-line">
                    Build something
                  </div>
                  <div className="title-line">
                    that matters with
                  </div>
                  <div className="title-line">
                    <span
                      className="parallax-gradient-text"
                      style={{
                        background: "linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)",
                        backgroundSize: "200% 100%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      cutting-edge tech
                    </span>
                  </div>
                </h1>
                <p className="parallax-subtitle text-lg lg:text-xl text-gray-300 leading-relaxed max-w-md font-light">
                  Step into the future of innovation. Bring your creativity, passion, and bold ideas to life with us.
                </p>
                <div className="parallax-button pt-4">
                  <button className="inline-flex items-center px-8 py-3 bg-orange-600 text-white rounded-sm text-sm font-medium hover:bg-orange-700 transition-colors duration-200">
                    Join Our Mission
                    <svg className="ml-2 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            }
          >
            <img
              src="/banner.png"
              alt="Innovation in technology"
              className="w-full h-auto object-cover rounded-lg shadow-xl"
              style={{ maxHeight: 'none' }}
            />
          </MyParallax>
        </section>

        {/* Mobile fallback with Hero-style animations */}
        <section className="block md:hidden px-6 py-16 bg-gradient-to-br from-gray-50 to-gray-100" ref={mobileRef}>
          <div className="max-w-md mx-auto text-center space-y-8">
            <div className="relative w-64 h-64 mx-auto">
              <img
                src="/banner.png"
                alt="Technological innovation"
                className="w-full h-full object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl"></div>
            </div>
            <div className="space-y-4">
              <h1 className="mobile-title text-3xl font-semibold text-gray-900 font-display tracking-tight">
                Innovation That
                <span 
                  className="block"
                  style={{
                    background: "linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Transforms
                </span>
              </h1>
              <p className="mobile-subtitle text-lg text-gray-600 leading-relaxed font-light">
                Discover how our solutions revolutionize the way you interact with technology and shape the future.
              </p>
              <div className="mobile-button">
                <button className="px-8 py-3 bg-gray-900 text-white rounded-sm text-sm font-medium hover:bg-gray-800 transition-colors duration-200">
                  Explore More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Gradient Section */}
        <GradientSection />

        {/* Grid Gallery */}
        <GridGallerySection />

        {/* MacBook Section */}
        <MacBookSection />
      </main>
    </>
  );
}