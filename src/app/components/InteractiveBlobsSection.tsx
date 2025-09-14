"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const InteractiveBlobsSection: React.FC = () => {
  const main = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blobs = gsap.utils.toArray<HTMLElement>(".blob");
      const logoPaths = gsap.utils.toArray<SVGPathElement>(".logo-path");
      const textElements = gsap.utils.toArray<HTMLElement>(".text-element");

      // --- INITIAL STATES ---
      gsap.set(blobs, { scale: 1.6, opacity: 0 });
      gsap.set(logoRef.current, { scale: 0.4, opacity: 0, transformOrigin: "center center" });
      gsap.set(logoPaths, {
        opacity: 0,
        scale: 0,
        transformOrigin: "center center",
        rotate: -180,
      });
      gsap.set(textElements, {
        opacity: 0,
        y: 40,
        filter: "blur(8px)",
      });

      // --- SCROLL TIMELINE ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: main.current,
          start: "top center",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      // Blobs zoom-out with fade-in
      tl.to(blobs, {
        scale: 1,
        opacity: 1,
        stagger: 0.25,
        ease: "power3.out",
      })
        // Logo reveal with elastic zoom
        .to(
          logoRef.current,
          {
            scale: 1,
            opacity: 1,
            ease: "elastic.out(1, 0.6)",
            duration: 1.2,
          },
          "-=0.8"
        )
        // Logo paths assembling with rotation
      .to(
  logoPaths,
  {
    opacity: 1,
    scale: 1,
    rotate: 0,
    stagger: {
      each: 0.09,
      from: "start", // puedes probar "center" para otro efecto
      ease: "sine.out", // muy suave y natural
    },
    ease: "sine.out",
    duration: 1.2, // transición más lenta para sensación premium
  },
  "-=0.6"
)

        // Text reveal with subtle blur fade
        .to(
          textElements,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.2,
            ease: "power2.out",
          },
          "-=0.5"
        )
        // Premium glow highlight after logo forms
        .to(
          logoRef.current,
          {
            filter:
              "drop-shadow(0 0 35px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 70px rgba(255, 145, 77, 0.6)) drop-shadow(0 0 120px rgba(255, 87, 34, 0.3))",
            ease: "power2.out",
          },
          "-=0.3"
        );

      // --- FLOATING + ROTATION LOOP ---
      gsap.to(logoRef.current, {
        y: -16,
        rotation: 2,
        repeat: -1,
        yoyo: true,
        duration: 5,
        ease: "sine.inOut",
      });
    }, main);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={main}
      className="hidden md:flex relative min-h-screen items-center justify-center overflow-hidden bg-cream-base px-8"
    >
      {/* Grainy Texture Overlay */}
      <div className="grain-overlay" />

      {/* Main two-column layout */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left column: Blobs + logo */}
        <div className="relative flex items-center justify-center h-full">
          {/* Blobs */}
          <div className="absolute inset-0 z-0">
            <div
              className="blob blob1"
              style={
                {
                  "--color1": "rgba(255, 87, 34, 0.9)",
                  "--color2": "rgba(255, 193, 7, 0.4)",
                  "--color3": "rgba(255, 152, 0, 0.6)",
                } as React.CSSProperties
              }
            />
            <div
              className="blob blob2"
              style={
                {
                  "--color1": "rgba(244, 67, 54, 0.8)",
                  "--color2": "rgba(233, 30, 99, 0.5)",
                  "--color3": "rgba(156, 39, 176, 0.3)",
                } as React.CSSProperties
              }
            />
            <div
              className="blob blob3"
              style={
                {
                  "--color1": "rgba(255, 193, 7, 0.7)",
                  "--color2": "rgba(255, 87, 34, 0.5)",
                  "--color3": "rgba(244, 67, 54, 0.4)",
                } as React.CSSProperties
              }
            />
          </div>

          {/* Logo */}
          <div className="relative z-10">
            <svg
              ref={logoRef}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 500 500"
              className="w-64 h-64"
            >
              <path
                className="logo-path"
                d="M 88.478 186.141 L 147.278 101.441 L 257.616 101.606 L 316.242 186.175 L 88.478 186.141 Z"
                fill="#fff"
              />
              <path
                className="logo-path"
                d="M 151.162 214.519 L 254.816 214.785 L 123.855 401.854 L 88.385 304.265 L 151.162 214.519 Z"
                fill="#fff"
              />
              <path
                className="logo-path"
                d="M 375.69 100 L 412.058 198.385 L 348.108 288.629 L 243.925 288.629 L 375.69 100 Z"
                fill="#fff"
              />
              <path
                className="logo-path"
                d="M 183.137 316.443 L 410.625 316.222 L 353.087 400.362 L 241.446 400.15 L 183.137 316.443 Z"
                fill="#fff"
              />
            </svg>
          </div>
        </div>

        {/* Right column: Text */}
        <div ref={textRef} className="flex flex-col justify-center space-y-6 text-gray-800">
         <h2 className="hero-h1 m-0 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[0.9] tracking-tight text-gray-900 font-display">
  <span
    className="hero-gradient-text"
    style={{
      background:
        "linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)",
      backgroundSize: "200% 100%",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}
  >
    #
  </span>
  <span className="hero-line">WeAre</span>
  <span
    className="hero-gradient-text"
    style={{
      background:
        "linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)",
      backgroundSize: "200% 100%",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}
  >
    Zonda
  </span>
</h2>


          <p className="text-xl text-element">
            We transform ideas into solutions, challenges into opportunities, and technology into value.
          </p>

          <p className="text-lg text-element">
            What sets us apart is not what we do, but how we do it: with people, with purpose, with passion.
          </p>

          <button className="mt-6 px-8 py-3 bg-orange-500 text-white rounded-full font-semibold text-lg w-fit text-element hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl">
            Discover Zonda
          </button>
        </div>
      </div>

      <style jsx global>{`
        :root {
          --cream-base: #f5f3ef;
        }

        .grain-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
          opacity: 0.5;
          mix-blend-mode: multiply;
        }
        .grain-overlay::before {
          content: "";
          position: absolute;
          top: -100%;
          left: -100%;
          width: 300%;
          height: 300%;
          background-image: url('data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="5" stitchTiles="stitch"/><feColorMatrix type="saturate" values="3"/></filter><rect width="100%" height="100%" filter="url(#noise)" opacity="0.9"/></svg>');
          animation: grain-pan 6s steps(20) infinite;
        }
        .grain-overlay::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            ellipse at center,
            transparent 20%,
            rgba(255, 87, 34, 0.08) 60%,
            rgba(244, 67, 54, 0.15) 100%
          );
        }

        @keyframes grain-pan {
          0%,
          100% {
            transform: translate(0, 0);
          }
          10% {
            transform: translate(-5%, -10%);
          }
          20% {
            transform: translate(-15%, 5%);
          }
          30% {
            transform: translate(7%, -25%);
          }
          40% {
            transform: translate(-5%, 25%);
          }
          50% {
            transform: translate(-15%, 10%);
          }
          60% {
            transform: translate(15%, 0%);
          }
          70% {
            transform: translate(0%, 15%);
          }
          80% {
            transform: translate(3%, 35%);
          }
          90% {
            transform: translate(-10%, 10%);
          }
        }

        /* Blobs */
        .blob {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          mix-blend-mode: hard-light;
          filter: blur(6px) saturate(1.3) contrast(1.6) brightness(1.3)
            hue-rotate(-5deg);
          background: radial-gradient(
            ellipse at 25% 15%,
            var(--color1) 0%,
            var(--color2) 30%,
            var(--color3) 55%,
            transparent 80%
          );
          will-change: border-radius, transform;
        }

        .blob1 {
          width: 480px;
          height: 480px;
          animation: morph 12s ease-in-out infinite;
        }

        .blob2 {
          width: 420px;
          height: 420px;
          animation: morph 10s ease-in-out infinite reverse;
        }

        .blob3 {
          width: 520px;
          height: 520px;
          animation: morph 16s ease-in-out infinite;
          animation-delay: -5s;
        }

        @keyframes morph {
          0% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: translate(-50%, -50%) rotate(0deg);
          }
          25% {
            border-radius: 40% 60% 50% 30% / 70% 40% 60% 30%;
            transform: translate(-50%, -50%) rotate(90deg) scale(1.05);
          }
          50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            transform: translate(-50%, -50%) rotate(180deg) scale(0.95);
          }
          75% {
            border-radius: 70% 30% 40% 60% / 40% 70% 50% 60%;
            transform: translate(-50%, -50%) rotate(270deg) scale(1.08);
          }
          100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: translate(-50%, -50%) rotate(360deg) scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default InteractiveBlobsSection;
