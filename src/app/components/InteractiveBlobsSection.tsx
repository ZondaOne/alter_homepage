"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const InteractiveBlobsSection: React.FC = () => {
  const main = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // gsap.context() is the modern way to handle cleanup in React
    const ctx = gsap.context(() => {
      // Selectors are scoped to the `main` ref
      const blobs = gsap.utils.toArray<HTMLElement>(".blob");
      const logoPaths = gsap.utils.toArray<SVGPathElement>(".logo-path");

      // --- INITIAL STATES ---
      if (blobs.length > 0) {
        gsap.set(blobs[0], { x: "-20vw", y: "-10vh", scale: 0.8 });
      }
      if (blobs.length > 1) {
        gsap.set(blobs[1], { x: "20vw", y: "10vh", scale: 1.2 });
      }
      if (logoPaths.length > 0) {
        gsap.set(logoPaths, {
          opacity: 0,
          scale: 0,
          transformOrigin: "center center",
          rotate: -180,
          x: (i) => (i % 2 === 0 ? -100 : 100),
          y: (i) => (i < 2 ? -50 : 50),
        });
      }

      // --- SCROLL TIMELINE ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: main.current,
          start: "top center",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      // 1. Blobs merge and focus
      tl.to(blobs, {
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(5px)", // Reduce blur as they come together
        ease: "power2.inOut",
      })
      // 2. Logo pieces elegantly form
      .to(logoPaths, {
        opacity: 1,
        scale: 1,
        rotate: 0,
        x: 0,
        y: 0,
        stagger: 0.1,
        ease: "back.out(1.7)",
      }, "-=0.5")
      // 3. Enhanced logo glow effect
      .to(logoRef.current, {
        filter: "drop-shadow(0 0 30px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 60px rgba(255, 145, 77, 0.5))",
        ease: "power2.out",
      }, "-=0.2");

      // --- CONTINUOUS FLOATING ANIMATION ---
      gsap.to(logoRef.current, {
        y: -15,
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: "sine.inOut",
      });

    }, main); // Scope the context to the main ref

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <section
      ref={main}
      className="hidden md:flex relative min-h-screen flex-col items-center justify-center overflow-hidden bg-cream-base"
    >
      {/* Grainy Texture Overlay */}
      <div className="grain-overlay" />

      {/* Blobs Container */}
      <div className="absolute inset-0 z-0">
        <div
          className="blob blob1"
          style={{
            '--color1': 'rgba(255, 145, 77, 0.7)',
            '--color2': 'rgba(255, 145, 77, 0.1)',
          } as React.CSSProperties}
        />
        <div
          className="blob blob2"
          style={{
            '--color1': 'rgba(255, 49, 49, 0.6)',
            '--color2': 'rgba(255, 49, 49, 0.1)',
          } as React.CSSProperties}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <svg
          ref={logoRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          className="w-80 h-80 sm:w-96 sm:h-96 mb-8"
        >
          {/* Paths are now easier to target with a class */}
          <path className="logo-path" d="M 88.478 186.141 L 147.278 101.441 L 257.616 101.606 L 316.242 186.175 L 88.478 186.141 Z" fill="#fff" />
          <path className="logo-path" d="M 151.162 214.519 L 254.816 214.785 L 123.855 401.854 L 88.385 304.265 L 151.162 214.519 Z" fill="#fff" />
          <path className="logo-path" d="M 375.69 100 L 412.058 198.385 L 348.108 288.629 L 243.925 288.629 L 375.69 100 Z" fill="#fff" />
          <path className="logo-path" d="M 183.137 316.443 L 410.625 316.222 L 353.087 400.362 L 241.446 400.15 L 183.137 316.443 Z" fill="#fff" />
        </svg>

      </div>

      <style jsx global>{`
        :root {
          --cream-base: #F5F3EF;
        }
        
        /* The Grainy Texture Overlay */
        .grain-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
          opacity: 0.1;
        }
        .grain-overlay::before {
          content: "";
          position: absolute;
          top: -100%; left: -100%;
          width: 300%; height: 300%;
          background-image: url('data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#noise)"/></svg>');
          animation: grain-pan 5s steps(10) infinite;
        }
        
        @keyframes grain-pan {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }

        /* The Animated Blobs */
        .blob {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          mix-blend-mode: multiply; /* Creates beautiful color overlaps */
          filter: blur(40px); /* Start with a heavy blur */
          background: radial-gradient(circle at center, var(--color1) 0%, var(--color2) 100%);
          will-change: border-radius, transform; /* Performance */
        }
        
        .blob1 {
          width: 800px;
          height: 800px;
          animation: morph 10s ease-in-out infinite;
        }
        
        .blob2 {
          width: 700px;
          height: 700px;
          animation: morph 8s ease-in-out infinite reverse; /* Different timing for variety */
        }
        
        @keyframes morph {
          0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        }
      `}</style>
    </section>
  );
};

export default InteractiveBlobsSection;