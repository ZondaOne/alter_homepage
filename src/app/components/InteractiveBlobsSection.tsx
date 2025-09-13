"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const InteractiveBlobsSection: React.FC = () => {
  const main = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blobs = gsap.utils.toArray<HTMLElement>(".blob");
      const logoPaths = gsap.utils.toArray<SVGPathElement>(".logo-path");

      // --- INITIAL STATES ---
      gsap.set(blobs, { scale: 1.4, opacity: 0 }); // blobs empiezan más grandes y escondidos
      gsap.set(logoRef.current, { scale: 0.6, opacity: 0, transformOrigin: "center center" });
      gsap.set(logoPaths, {
        opacity: 0,
        scale: 0,
        transformOrigin: "center center",
        rotate: -180,
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

      // Blobs hacen zoom-out y aparecen
      tl.to(blobs, {
        scale: 1,
        opacity: 1,
        stagger: 0.2,
        ease: "power2.out",
      })
        // Logo aparece con zoom-in + fade
        .to(
          logoRef.current,
          {
            scale: 1,
            opacity: 1,
            ease: "back.out(1.7)",
          },
          "-=0.8"
        )
        // Paths del logo se arman
        .to(
          logoPaths,
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.6"
        )
        // Glow extra cuando termina de armarse
        .to(
          logoRef.current,
          {
            filter:
              "drop-shadow(0 0 25px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 50px rgba(255, 145, 77, 0.5))",
            ease: "power2.out",
          },
          "-=0.3"
        );

      // --- FLOATING ANIMATION (loop) ---
      gsap.to(logoRef.current, {
        y: -12,
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: "sine.inOut",
      });
    }, main);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={main}
      className="hidden md:flex relative min-h-screen flex-col items-center justify-center overflow-hidden bg-cream-base"
    >
      {/* Grainy Texture Overlay */}
      <div className="grain-overlay" />

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
      <div className="relative z-10 flex flex-col items-center">
        <svg
          ref={logoRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          className="w-64 h-64 mb-8"
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
          filter: blur(4px) saturate(1.2) contrast(1.5) brightness(1.3)
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
          width: 450px;
          height: 450px;
          animation: morph 12s ease-in-out infinite;
        }

        .blob2 {
          width: 400px;
          height: 400px;
          animation: morph 9s ease-in-out infinite reverse;
        }

        .blob3 {
          width: 500px;
          height: 500px;
          animation: morph 15s ease-in-out infinite;
          animation-delay: -5s;
        }

        @keyframes morph {
          0% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: translate(-50%, -50%) rotate(0deg);
          }
          25% {
            border-radius: 40% 60% 50% 30% / 70% 40% 60% 30%;
            transform: translate(-50%, -50%) rotate(90deg);
          }
          50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            transform: translate(-50%, -50%) rotate(180deg);
          }
          75% {
            border-radius: 70% 30% 40% 60% / 40% 70% 50% 60%;
            transform: translate(-50%, -50%) rotate(270deg);
          }
          100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default InteractiveBlobsSection;
