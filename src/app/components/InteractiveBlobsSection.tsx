"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next"; // <-- IMPORT i18n

gsap.registerPlugin(ScrollTrigger);

const InteractiveBlobsSection: React.FC = () => {
  const { t } = useTranslation(); // <-- HOOK i18n
  const main = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blobs = gsap.utils.toArray<HTMLElement>(".blob");
      const logoPaths = gsap.utils.toArray<SVGPathElement>(".logo-path");
      const textElements = gsap.utils.toArray<HTMLElement>(".text-element");

      // --- INITIAL STATES ---
      gsap.set(blobs, { scale: 0.8, opacity: 0.3, filter: "blur(20px)" });
      gsap.set(logoRef.current, { scale: 0.6, opacity: 0, y: 30 });
      gsap.set(logoPaths, {
        opacity: 0,
        scale: 0.8,
        transformOrigin: "center center",
      });
      gsap.set(textElements, {
        opacity: 0,
        x: 50,
        filter: "blur(4px)",
      });

      // --- SCROLL TIMELINE ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: main.current,
          start: "top 80%",
          end: "center center",
          scrub: 0.8,
        },
      });

      tl.to(blobs, {
        scale: 1,
        opacity: 0.9,
        filter: "blur(6px)",
        stagger: 0.15,
        duration: 2,
        ease: "power2.out",
      })
        .to(
          logoRef.current,
          {
            scale: 1,
            opacity: 1,
            y: 0,
            ease: "back.out(1.2)",
            duration: 1.5,
          },
          "-=1.5"
        )
        .to(
          logoPaths,
          {
            opacity: 1,
            scale: 1,
            stagger: {
              each: 0.08,
              from: "center",
              ease: "power2.out",
            },
            ease: "back.out(1.1)",
            duration: 1.2,
          },
          "-=1.2"
        )
        .to(
          textElements,
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            stagger: 0.12,
            ease: "power2.out",
            duration: 1,
          },
          "-=1"
        );

      gsap.to(logoRef.current, {
        filter:
          "drop-shadow(0 0 20px rgba(249, 115, 22, 0.6)) drop-shadow(0 0 40px rgba(251, 146, 60, 0.4)) drop-shadow(0 0 60px rgba(234, 88, 12, 0.2))",
        duration: 0.5,
        ease: "power2.out",
        delay: 0.5,
      });

      gsap.to(logoRef.current, {
        y: -8,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut",
      });

      gsap.to(".blob1", {
        scale: 1.05,
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: "sine.inOut",
      });

      gsap.to(".blob2", {
        scale: 0.95,
        repeat: -1,
        yoyo: true,
        duration: 3.5,
        ease: "sine.inOut",
        delay: -1,
      });

      gsap.to(".blob3", {
        scale: 1.03,
        repeat: -1,
        yoyo: true,
        duration: 4.5,
        ease: "sine.inOut",
        delay: -2,
      });
    }, main);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={main}
      className="hidden md:flex relative min-h-screen items-center justify-center overflow-hidden bg-cream-base px-8"
    >
      <div className="grain-overlay" />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="relative flex items-center justify-center h-full">
          <div className="absolute inset-0 z-0">
            <div
              className="blob blob1"
              style={
                {
                  "--color1": "rgba(249, 115, 22, 0.8)",
                  "--color2": "rgba(251, 146, 60, 0.5)",
                  "--color3": "rgba(234, 88, 12, 0.6)",
                } as React.CSSProperties
              }
            />
            <div
              className="blob blob2"
              style={
                {
                  "--color1": "rgba(234, 88, 12, 0.7)",
                  "--color2": "rgba(249, 115, 22, 0.4)",
                  "--color3": "rgba(194, 65, 12, 0.5)",
                } as React.CSSProperties
              }
            />
            <div
              className="blob blob3"
              style={
                {
                  "--color1": "rgba(251, 146, 60, 0.6)",
                  "--color2": "rgba(249, 115, 22, 0.5)",
                  "--color3": "rgba(234, 88, 12, 0.4)",
                } as React.CSSProperties
              }
            />
          </div>

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

        <div ref={textRef} className="flex flex-col justify-center space-y-6 text-gray-800">
          <h2 className="hero-h1 m-0 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[0.9] tracking-tight text-gray-900 font-display">
            <span
              className="hero-gradient-text text-element"
              style={{
                background:
                  "linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradient-flow 3s ease-in-out infinite",
              }}
            >
              {t("interactiveBlobs.hash")}
            </span>
            <span className="hero-line text-element">{t("interactiveBlobs.weAre")}</span>
            <span
              className="hero-gradient-text text-element"
              style={{
                background:
                  "linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradient-flow 3s ease-in-out infinite",
                animationDelay: "0.5s",
              }}
            >
              {t("interactiveBlobs.zonda")}
            </span>
          </h2>

          <p className="text-xl text-element">{t("interactiveBlobs.description1")}</p>

          <p className="text-lg text-element">{t("interactiveBlobs.description2")}</p>

          <button className="mt-6 px-8 py-3 bg-orange-500 text-white rounded-full font-semibold text-lg w-fit text-element hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform">
            {t("interactiveBlobs.discoverButton")}
          </button>
        </div>
      </div>

      {/* Grain & blobs CSS */}
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
          opacity: 0.4;
          mix-blend-mode: multiply;
        }
        .grain-overlay::before {
          content: "";
          position: absolute;
          top: -100%;
          left: -100%;
          width: 300%;
          height: 300%;
          background-image: url('data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="2"/></filter><rect width="100%" height="100%" filter="url(#noise)" opacity="0.7"/></svg>');
          animation: grain-pan 8s steps(15) infinite;
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
            transparent 30%,
            rgba(249, 115, 22, 0.05) 70%,
            rgba(234, 88, 12, 0.08) 100%
          );
        }
        @keyframes grain-pan { 
          0%,100%{transform:translate(0,0);} 
          10%{transform:translate(-3%,-6%);} 
          20%{transform:translate(-8%,2%);} 
          30%{transform:translate(4%,-12%);} 
          40%{transform:translate(-3%,15%);} 
          50%{transform:translate(-8%,5%);} 
          60%{transform:translate(8%,0%);} 
          70%{transform:translate(0%,8%);} 
          80%{transform:translate(2%,18%);} 
          90%{transform:translate(-5%,5%);} 
        }
        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .blob { 
          position: absolute; 
          top: 50%; 
          left: 50%; 
          transform: translate(-50%, -50%); 
          mix-blend-mode: multiply; 
          filter: blur(8px) saturate(1.2) contrast(1.3) brightness(1.1); 
          background: radial-gradient(ellipse at 30% 20%, var(--color1) 0%, var(--color2) 35%, var(--color3) 60%, transparent 85%); 
          will-change: border-radius, transform; 
          opacity: 0.8;
        }
        .blob1 { 
          width: 450px; 
          height: 450px; 
          animation: morph-gentle 14s ease-in-out infinite; 
        }
        .blob2 { 
          width: 380px; 
          height: 380px; 
          animation: morph-gentle 11s ease-in-out infinite reverse; 
          animation-delay: -3s;
        }
        .blob3 { 
          width: 500px; 
          height: 500px; 
          animation: morph-gentle 18s ease-in-out infinite; 
          animation-delay: -7s; 
        }
        @keyframes morph-gentle { 
          0%{
            border-radius: 55% 45% 35% 65% / 55% 35% 65% 45%; 
            transform: translate(-50%, -50%) rotate(0deg);
          } 
          25%{
            border-radius: 45% 55% 45% 35% / 65% 45% 55% 35%; 
            transform: translate(-50%, -50%) rotate(90deg) scale(1.02);
          } 
          50%{
            border-radius: 35% 55% 65% 45% / 45% 55% 35% 55%; 
            transform: translate(-50%, -50%) rotate(180deg) scale(0.98);
          } 
          75%{
            border-radius: 65% 35% 45% 55% / 35% 65% 45% 55%; 
            transform: translate(-50%, -50%) rotate(270deg) scale(1.01);
          } 
          100%{
            border-radius: 55% 45% 35% 65% / 55% 35% 65% 45%; 
            transform: translate(-50%, -50%) rotate(360deg) scale(1);
          } 
        }
      `}</style>
    </section>
  );
};

export default InteractiveBlobsSection;