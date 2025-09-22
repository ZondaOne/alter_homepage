"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const InteractiveBlobsSection: React.FC = () => {
  const { t } = useTranslation();
  const mainRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const blobContainerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blobs = gsap.utils.toArray<HTMLElement>(".blob");
      const logoPaths = gsap.utils.toArray<SVGPathElement>(".logo-path");
      const textElements = gsap.utils.toArray<HTMLElement>(".text-element");
      const cardElements = gsap.utils.toArray<HTMLElement>(".card-element");

      // --- INITIAL STATES ---
      gsap.set(blobs, { scale: 0.8, autoAlpha: 0.3 });
      gsap.set(logoRef.current, { scale: 0.6, autoAlpha: 0, y: 30 });
      gsap.set(logoPaths, { scale: 0.8, autoAlpha: 0, transformOrigin: "center center" });
      gsap.set(textElements, { x: 50, autoAlpha: 0 });
      gsap.set(cardElements, { y: 30, autoAlpha: 0 });

      // --- SCROLL TRIGGER ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top bottom",
          toggleActions: "play none none none",
        },
      });

      // --- TIMELINE ---
      tl.to(blobs, {
        scale: 1,
        autoAlpha: 0.9,
        stagger: 0.15,
        duration: 1.5,
        ease: "power2.out",
      })
        .to(
          logoRef.current,
          { scale: 1, autoAlpha: 1, y: 0, ease: "back.out(1.2)", duration: 1.2 },
          "-=1"
        )
        .to(
          logoPaths,
          { scale: 1, autoAlpha: 1, stagger: { each: 0.08, from: "center" }, ease: "back.out(1.1)", duration: 1 },
          "-=1"
        )
        .to(
          textElements,
          { x: 0, autoAlpha: 1, stagger: 0.12, ease: "power2.out", duration: 0.8 },
          "-=0.8"
        )
        .to(
          cardElements,
          { y: 0, autoAlpha: 1, stagger: 0.1, ease: "power2.out", duration: 0.8 },
          "-=0.6"
        );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={mainRef}
      className="hidden md:flex relative min-h-screen items-center justify-center overflow-hidden bg-cream-base px-8 py-16"
    >
      <div className="grain-overlay" />
      <div className="container mx-auto space-y-16 relative z-10">
        
        {/* Original Text Content - Now Standalone */}
        <div className="max-w-4xl mx-auto text-center">
          <div ref={textRef} className="flex flex-col justify-center space-y-6 text-gray-800">
            <h2 className="hero-h1 m-0 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[0.9] tracking-tight text-gray-900 font-display mb-8">
              <span className="hero-gradient-text text-element" style={{
                background: "linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradient-flow 3s ease-in-out infinite"
              }}>
                {mounted ? t("interactiveBlobs.hash") : ""}
              </span>
              <span className="hero-line text-element">{mounted ? t("interactiveBlobs.weAre") : ""}</span>
              <span className="hero-gradient-text text-element" style={{
                background: "linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradient-flow 3s ease-in-out infinite",
                animationDelay: "0.5s"
              }}>
                {mounted ? t("interactiveBlobs.zonda") : ""}
              </span>
            </h2>
            <p className="text-xl text-element max-w-2xl mx-auto">{mounted ? t("interactiveBlobs.description1") : ""}</p>
          </div>
        </div>

       
        <div ref={cardRef} className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden card-element transform hover:scale-[1.02] transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
              {/* Content Side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center space-y-8">
                <div className="space-y-4 card-element">
                  <h3 className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-gray-900 leading-[0.9] tracking-tight font-display">
                    <span className="hero-gradient-text" style={{
                      background: "linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)",
                      backgroundSize: "200% 100%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      animation: "gradient-flow 3s ease-in-out infinite"
                    }}>
                      From Concept
                    </span>
                    {" "}
                    <span>to Code</span>
                  </h3>
                  <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                    We create integrated digital solutions and experiences that your audience loves to interact with.
                  </p>
                </div>
              </div>
              
              {/* Blob and Logo Side */}
              <div ref={blobContainerRef} className="relative overflow-hidden card-element flex items-center justify-center bg-cream-base min-h-[400px]">
                <div className="absolute inset-0 z-0">
                  <div className="blob blob1" style={{ "--color1": "rgba(249,115,22,0.8)", "--color2": "rgba(251,146,60,0.5)", "--color3": "rgba(234,88,12,0.6)" } as React.CSSProperties} />
                  <div className="blob blob2" style={{ "--color1": "rgba(234,88,12,0.7)", "--color2": "rgba(249,115,22,0.4)", "--color3": "rgba(194,65,12,0.5)" } as React.CSSProperties} />
                  <div className="blob blob3" style={{ "--color1": "rgba(251,146,60,0.6)", "--color2": "rgba(249,115,22,0.5)", "--color3": "rgba(234,88,12,0.4)" } as React.CSSProperties} />
                </div>
                <div className="relative z-10">
                  <svg ref={logoRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className="w-48 h-48 lg:w-56 lg:h-56 glow-effect">
                    <path className="logo-path" d="M 88.478 186.141 L 147.278 101.441 L 257.616 101.606 L 316.242 186.175 L 88.478 186.141 Z" fill="#fff" />
                    <path className="logo-path" d="M 151.162 214.519 L 254.816 214.785 L 123.855 401.854 L 88.385 304.265 L 151.162 214.519 Z" fill="#fff" />
                    <path className="logo-path" d="M 375.69 100 L 412.058 198.385 L 348.108 288.629 L 243.925 288.629 L 375.69 100 Z" fill="#fff" />
                    <path className="logo-path" d="M 183.137 316.443 L 410.625 316.222 L 353.087 400.362 L 241.446 400.15 L 183.137 316.443 Z" fill="#fff" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        :root { --cream-base: #f5f3ef; }
        .grain-overlay { position: absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:2; opacity:0.25; mix-blend-mode: multiply; background-image:url("/noise-texture.png"); background-size:300px; animation: grain-pan 8s linear infinite; }
        @keyframes grain-pan { 0%,100% {transform:translate(0,0);} 50%{transform:translate(-10%,-10%);} }
        @keyframes gradient-flow {0%,100%{background-position:0% 50%;}50%{background-position:100% 50%;}}
        .blob { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); mix-blend-mode: multiply; background: radial-gradient(ellipse at 30% 20%, var(--color1) 0%, var(--color2) 35%, var(--color3) 60%, transparent 85%); will-change: transform,border-radius; opacity:0.8; }
        .blob1 { width:300px;height:300px;animation:morph-gentle 14s ease-in-out infinite; }
        .blob2 { width:270px;height:270px;animation:morph-gentle 11s ease-in-out infinite reverse; animation-delay:-3s;}
        .blob3 { width:250px;height:250px;animation:morph-gentle 18s ease-in-out infinite; animation-delay:-7s;}
        @keyframes morph-gentle {0%{border-radius:55%45%35%65%/55%35%65%45%; transform:translate(-50%,-50%) rotate(0deg);}25%{border-radius:45%55%45%35%/65%45%55%35%; transform:translate(-50%,-50%) rotate(90deg) scale(1.02);}50%{border-radius:35%55%65%45%/45%55%35%55%; transform:translate(-50%,-50%) rotate(180deg) scale(0.98);}75%{border-radius:65%35%45%55%/35%65%45%55%; transform:translate(-50%,-50%) rotate(270deg) scale(1.01);}100%{border-radius:55%45%35%65%/55%35%65%45%; transform:translate(-50%,-50%) rotate(360deg) scale(1);}}
        .glow-effect { filter: drop-shadow(0 0 25px rgba(249,115,22,0.55)); }
        .logo-path,.text-element,.card-element { will-change: transform, opacity; }
        .ocean-waves { 
          background: linear-gradient(45deg, 
            rgba(255,255,255,0.1) 25%, 
            transparent 25%, 
            transparent 50%, 
            rgba(255,255,255,0.1) 50%, 
            rgba(255,255,255,0.1) 75%, 
            transparent 75%, 
            transparent
          );
          background-size: 60px 60px;
          animation: wave-move 4s linear infinite;
        }
        @keyframes wave-move {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(60px) translateY(60px); }
        }
        @media (prefers-reduced-motion: reduce) { .blob,.grain-overlay,.hero-gradient-text,.ocean-waves { animation:none !important; } }
      `}</style>
    </section>
  );
};

export default InteractiveBlobsSection;