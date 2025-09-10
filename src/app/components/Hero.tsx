"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SoftwareLogo from "./SoftwareLogo";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;

    // Timeline secuencial de entrada
    const tl = gsap.timeline();

    tl.from(".hero-h1", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
      .from(
        ".hero-subtitle",
        {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .from(
        ".hero-buttons",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );

    // Animación de gradiente en el span
    gsap.to(".hero-gradient-text", {
      backgroundPosition: "200% 50%",
      repeat: -1,
      yoyo: true,
      duration: 6,
      ease: "power1.inOut",
    });

    // Efecto parallax para SoftwareLogo
    gsap.to(".hero-logo", {
      y: -50,
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div ref={heroRef} className="relative h-screen overflow-hidden hero-gradient">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[55%_45%] h-full">
        <div className="flex flex-col justify-center px-6 sm:px-8 lg:px-16 xl:px-20">
          <h1 className="hero-h1 m-0 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[0.9] tracking-tight text-gray-900 font-display">
            Your idea
            <br />
            deserves
            <br />
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
              better code
            </span>
          </h1>

          <p className="hero-subtitle text-lg sm:text-xl lg:text-xl text-gray-600 max-w-lg mt-6 sm:mt-8 font-light leading-relaxed">
            Small team. Big ideas. We build software that people actually want to use.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-8 sm:mt-10">
            <button className="bg-gray-900 text-white px-8 py-3 rounded-sm text-sm font-medium hover:bg-gray-800 transition-colors duration-200 w-full sm:w-auto">
              Work with us
            </button>

            <button className="text-gray-700 text-sm font-medium hover:text-orange-600 transition-colors duration-200 flex items-center gap-2 group">
              See what we've made
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                <path
                  d="M6 3L11 8L6 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative h-full hidden lg:block">
          <div className="w-full h-full object-cover hero-logo">
            <SoftwareLogo scale={0.8} />
          </div>
        </div>
      </div>
    </div>
  );
}
