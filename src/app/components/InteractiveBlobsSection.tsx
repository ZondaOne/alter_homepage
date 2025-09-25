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
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
  if (!mounted) return; // Esperamos a que el DOM esté listo

  const ctx = gsap.context(() => {
    const blobs = gsap.utils.toArray<HTMLElement>(".blob");
    const logoPaths = gsap.utils.toArray<SVGPathElement>(".logo-path");
    const textElements = gsap.utils.toArray<HTMLElement>(".text-element");
    const cardElements = gsap.utils.toArray<HTMLElement>(".card-element");

    // Inicializamos estados
    gsap.set(blobs, { scale: 0.8, autoAlpha: 0.3 });
    gsap.set(logoRef.current, { scale: 0.6, autoAlpha: 0, y: 30 });
    gsap.set(logoPaths, { scale: 0.8, autoAlpha: 0, transformOrigin: "center center" });
    gsap.set(textElements, { x: 50, autoAlpha: 0 });
    gsap.set(cardElements, { y: 30, autoAlpha: 0 });

    // Timeline de scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top 105%", // Más seguro que 105%
        toggleActions: "play none none none",
      },
    });

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

    // Hover cards
    if (cardInnerRef.current) {
      const cardInner = cardInnerRef.current;
      cardInner.addEventListener("mouseenter", () => {
        gsap.to(cardInner, {
          y: -8,
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
          duration: 0.3,
          ease: "power2.out",
        });
      });
      cardInner.addEventListener("mouseleave", () => {
        gsap.to(cardInner, {
          y: 0,
          boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    }
  }, mainRef);

  return () => ctx.revert();
}, [mounted]); 


  return (
    <section
      id="about"
      ref={mainRef}
      className="hidden md:flex relative min-h-screen items-center justify-center overflow-hidden bg-cream-base px-8 py-16"
    >
      <div className="grain-overlay" />
      <div className="container mx-auto space-y-16 relative z-10">

        {/* Header Text */}
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

        {/* Improved Card Section */}
        <div ref={cardRef} className="max-w-8xl mx-auto">
          <div 
            ref={cardInnerRef}
            className="improved-card relative overflow-hidden card-element"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[450px] relative z-10">
              {/* Content Side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center space-y-8 relative">
                <div className="space-y-6 card-element">
                  <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight tracking-tight font-display">
                <span
                  className="hero-gradient-text"
                  style={{
                    background:
                      "linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "gradient-flow 3s ease-in-out infinite",
                  }}
                >
                  {mounted ? t("card.fromConcept") : ""}
                </span>{" "}
                <span>{mounted ? t("card.toCode") : ""}</span>
              </h3>

              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                {mounted ? t("card.digitalSolutionsDescription") : ""}
              </p>

                </div>
              </div>

              {/* Blob & Logo Side */}
              <div ref={blobContainerRef} className="relative overflow-hidden card-element flex items-center justify-center bg-gradient-to-br from-cream-base via-orange-50 to-cream-base min-h-[450px]">
                <div className="absolute inset-0 z-0">
                  <div className="blob blob1" style={{ "--color1": "rgba(249,115,22,0.8)", "--color2": "rgba(251,146,60,0.5)", "--color3": "rgba(234,88,12,0.6)" } as React.CSSProperties} />
                  <div className="blob blob2" style={{ "--color1": "rgba(234,88,12,0.7)", "--color2": "rgba(249,115,22,0.4)", "--color3": "rgba(194,65,12,0.5)" } as React.CSSProperties} />
                  <div className="blob blob3" style={{ "--color1": "rgba(251,146,60,0.6)", "--color2": "rgba(249,115,22,0.5)", "--color3": "rgba(234,88,12,0.4)" } as React.CSSProperties} />
                </div>
                
                <div className="relative z-10">
                  <svg ref={logoRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className="w-56 h-56 lg:w-64 lg:h-64 glow-effect">
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

      {/* Clean Styles */}
      <style jsx global>{`
        :root { --cream-base: #f5f3ef; }
        .grain-overlay { position: absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:2; opacity:0.25; mix-blend-mode: multiply; background-size:300px; animation: grain-pan 8s linear infinite; }
        @keyframes grain-pan { 0%,100% {transform:translate(0,0);} 50%{transform:translate(-10%,-10%);} }
        @keyframes gradient-flow {0%,100%{background-position:0% 50%;}50%{background-position:100% 50%;}}
        
        .improved-card {
          background: white;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          transition: all 0.3s ease;
          will-change: transform, box-shadow;
        }

        .simple-cta {
          padding: 14px 28px;
          background: linear-gradient(135deg, #f97316, #ea580c);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .simple-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(249,115,22,0.3);
        }

        .blob { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); mix-blend-mode: multiply; background: radial-gradient(ellipse at 30% 20%, var(--color1) 0%, var(--color2) 35%, var(--color3) 60%, transparent 85%); will-change: transform,border-radius; opacity:0.8; }
        .blob1 { width:370px;height:370px;animation:morph-gentle 14s ease-in-out infinite; }
        .blob2 { width:370px;height:370px;animation:morph-gentle 11s ease-in-out infinite reverse; animation-delay:-3s;}
        .blob3 { width:370px;height:370px;animation:morph-gentle 18s ease-in-out infinite; animation-delay:-7s;}
        @keyframes morph-gentle {0%{border-radius:55%45%35%65%/55%35%65%45%; transform:translate(-50%,-50%) rotate(0deg);}25%{border-radius:45%55%45%35%/65%45%55%35%; transform:translate(-50%,-50%) rotate(90deg) scale(1.02);}50%{border-radius:35%55%65%45%/45%55%35%55%; transform:translate(-50%,-50%) rotate(180deg) scale(0.98);}75%{border-radius:65%35%45%55%/35%65%45%55%; transform:translate(-50%,-50%) rotate(270deg) scale(1.01);}100%{border-radius:55%45%35%65%/55%35%65%45%; transform:translate(-50%,-50%) rotate(360deg) scale(1);} }
        .glow-effect { filter: drop-shadow(0 0 25px rgba(249,115,22,0.55)); }
        .logo-path,.text-element,.card-element { will-change: transform, opacity; }
        
        @media (prefers-reduced-motion: reduce) { 
          .blob,.grain-overlay,.hero-gradient-text { 
            animation: none !important; 
          } 
        }
      `}</style>
    </section>
  );
};

export default InteractiveBlobsSection;