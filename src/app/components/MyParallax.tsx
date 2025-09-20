"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

interface MyParallaxProps {
  scale?: number;
  minScale?: number;
  children?: React.ReactNode;
  text?: React.ReactNode;
  preStartOffset?: number;
  mobileRef?: React.RefObject<HTMLDivElement | null>;
}

const MyParallax: React.FC<MyParallaxProps> = ({
  scale = 1,
  minScale = 0.7,
  children,
  text,
  preStartOffset = 150,
  mobileRef,
}) => {
  const { t, ready } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [currentScale, setCurrentScale] = useState(scale);
  const [imageTransform, setImageTransform] = useState({ x: 0, width: 100 });
  const [textOpacity, setTextOpacity] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // === Parallax scroll ===
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = containerRef.current.offsetHeight;

      let scrollProgress = 0;
      const adjustedTop = rect.top - preStartOffset;

      if (adjustedTop <= windowHeight && rect.bottom >= 0) {
        if (adjustedTop <= 0) {
          const visibleTop = Math.abs(adjustedTop);
          scrollProgress = Math.min(1, visibleTop / (elementHeight - windowHeight));
        }
      } else if (rect.bottom < 0) {
        scrollProgress = 1;
      }

      const scaleProgress = Math.min(1, scrollProgress * 1.5);
      const newScale = Math.max(minScale, scale - scaleProgress * (scale - minScale));
      setCurrentScale(newScale);

      const moveProgress = Math.max(0, scrollProgress - 0.15);
      const maxXTranslate = -25;
      const initialWidth = 85;
      const minWidth = 55;
      const newX = moveProgress * maxXTranslate;
      const newWidth = initialWidth - moveProgress * (initialWidth - minWidth);
      setImageTransform({ x: newX, width: newWidth });

      const textStartPoint = 0.25;
      const textProgress = Math.max(
        0,
        Math.min(1, (scrollProgress - textStartPoint) / (1 - textStartPoint))
      );
      setTextOpacity(textProgress);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [scale, minScale, preStartOffset]);

  // === Animaciones GSAP tipo Hero ===
  useEffect(() => {
    if (!containerRef.current) return;

    gsap.set([".parallax-title-line", ".parallax-subtitle"], {
      opacity: 0,
      y: 60,
      rotationX: 15,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      defaults: { ease: "power3.out" },
    });

    tl.to(".parallax-title-line", {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      stagger: 0.2,
    }).to(
      ".parallax-subtitle",
      { opacity: 1, y: 0, rotationX: 0, duration: 0.6 },
      "-=0.4"
    );
  }, []);

  // === Texto por defecto (sin botones) ===
  const defaultText = (
    <div className="text-gray-900 space-y-6">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[0.9] tracking-tight font-display">
        <div className="parallax-title-line">
          {mounted && ready ? t('parallax.desktop.line1') : 'Turning complex'}
        </div>
        <div className="parallax-title-line">
          {mounted && ready ? t('parallax.desktop.line2') : 'problems into'}
        </div>
        <div className="parallax-title-line">
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
            {mounted && ready ? t('parallax.desktop.line3') : 'simple solutions'}
          </span>
        </div>
      </h1>
      <p className="parallax-subtitle text-lg sm:text-xl text-gray-600 max-w-lg font-light leading-relaxed">
        {mounted && ready ? t('parallax.desktop.subtitle') : 'Every challenge is an opportunity to build something meaningful. We take what\'s complicated and make it work beautifully.'}
      </p>
    </div>
  );

  // === Mobile version (también sin botones) ===
  const defaultMobileText = (
    <>
      <h1 className="text-3xl font-semibold text-gray-900 font-display tracking-tight">
        {mounted && ready ? t('parallax.mobile.title') : 'Simple solutions for'}{" "}
        <span
          className="block hero-gradient-text"
          style={{
            background:
              "linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {mounted && ready ? t('parallax.mobile.highlight') : 'complex problems'}
        </span>
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed font-light">
        {mounted && ready ? t('parallax.mobile.subtitle') : 'We take the complicated stuff and make it work beautifully. That\'s what good software should do.'}
      </p>
    </>
  );

  return (
    <>
      {/* Desktop */}
      <div
        ref={containerRef}
        className="hidden md:block relative w-full min-h-screen bg-white"
      >
        <div className="relative w-full min-h-screen flex items-center justify-center overflow-visible">
          <div
            className="relative transition-all duration-600 ease-out max-w-none"
            style={{
              transform: `scale(${currentScale}) translateX(${imageTransform.x}vw)`,
              width: `${imageTransform.width}vw`,
              transformOrigin: "center center",
            }}
          >
            <div className="w-full h-auto">{children}</div>
          </div>

          <div
            className="absolute right-0 top-0 w-1/2 h-full flex items-center justify-end pr-8 lg:pr-16"
            style={{
              opacity: textOpacity,
              transform: `translateX(${(1 - textOpacity) * 100}px)`,
              transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
            }}
          >
            <div className="max-w-lg text-right">{text || defaultText}</div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <section
        className="block md:hidden px-6 py-16 bg-gradient-to-br from-gray-50 to-gray-100"
        ref={mobileRef}
      >
        <div className="max-w-md mx-auto text-center space-y-8">
          <div className="relative w-64 h-64 mx-auto">
            <img
              src="/banner.png"
              alt="Technological innovation"
              className="w-full h-full object-cover rounded-2xl shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-red-500/20 rounded-2xl"></div>
          </div>
          <div className="space-y-4">{defaultMobileText}</div>
        </div>
      </section>
    </>
  );
};

export default MyParallax;
