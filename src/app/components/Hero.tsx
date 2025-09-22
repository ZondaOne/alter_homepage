"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import SoftwareLogo from "./SoftwareLogo";
import Threads from "./Threads";

gsap.registerPlugin(ScrollTrigger);

const scrollToContact = () => {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const scrollToProjects = () => {
  const isMobile = window.innerWidth < 768; // md breakpoint
  const targetId = isMobile ? 'gallery-section' : 'macbook-section';
  const targetSection = document.getElementById(targetId);
  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { t, ready } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  // Detectar dispositivos de bajo rendimiento
  useEffect(() => {
    const detectLowEndDevice = () => {
      // Verificar si es móvil
      const isMobile = window.innerWidth < 768;
      
      // Verificar capacidades del hardware
      const hardwareConcurrency = navigator.hardwareConcurrency || 1;
      const deviceMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 1;

      
      // Detectar GPU débil
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
      let isWeakGPU = false;
      
      if (gl) {
        try {
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string;
            // Lista de GPUs conocidas como de bajo rendimiento
            const weakGPUs = [
              'Intel HD Graphics 3000',
              'Intel HD Graphics 4000',
              'Intel UHD Graphics',
              'AMD Radeon R5',
              'AMD Radeon R4',
              'PowerVR',
              'Adreno 3',
              'Adreno 4',
              'Mali-4',
              'Intel(R) HD Graphics'
            ];
            isWeakGPU = weakGPUs.some(gpu => renderer.toLowerCase().includes(gpu.toLowerCase()));
          }
        } catch {
          // Si hay error obteniendo info de GPU, asumimos que es débil
          isWeakGPU = true;
        }
      }
      
      // Detectar conexión lenta
      type NetworkInformation = {
      effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
      downlink?: number;
      rtt?: number;
      saveData?: boolean;
    };

const connection = (navigator as unknown as { connection?: NetworkInformation }).connection;

const isSlowConnection =
  connection?.effectiveType === 'slow-2g' ||
  connection?.effectiveType === '2g' ||
  connection?.effectiveType === '3g';

      
      // Detectar si prefiere movimiento reducido
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Determinar si es un dispositivo de bajo rendimiento
      const isLowEnd = (
        isMobile ||
        hardwareConcurrency <= 2 ||
        deviceMemory <= 2 ||
        isWeakGPU ||
        isSlowConnection ||
        prefersReducedMotion
      );
      
      setIsLowEndDevice(isLowEnd);
      
      // Log para debugging (remover en producción)
      console.log('Device Performance Check:', {
        isMobile,
        hardwareConcurrency,
        deviceMemory,
        isWeakGPU,
        isSlowConnection,
        prefersReducedMotion,
        isLowEnd
      });
    };
    
    detectLowEndDevice();
    window.addEventListener('resize', detectLowEndDevice);
    setMounted(true);
    
    return () => window.removeEventListener('resize', detectLowEndDevice);
  }, []);

  // Elegant entrance animations with GSAP (solo dispositivos de alto rendimiento)
  useEffect(() => {
    if (!mounted || isLowEndDevice) return;

    const hero = heroRef.current;
    if (!hero) return;

    // Set initial states and optimize for performance
    gsap.set([".hero-h1 .hero-line", ".hero-subtitle", ".hero-buttons", ".hero-logo"], {
      opacity: 0,
      y: 60,
      rotationX: 15,
      force3D: true, // GPU acceleration
    });

    // Performance optimizations
    gsap.set([".hero-h1", ".hero-subtitle", ".hero-buttons", ".hero-logo", ".hero-gradient-text"], {
      willChange: "transform, opacity",
    });

    // Master timeline for orchestrated entrance
    const masterTL = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.1
    });

    // Sophisticated text reveal animation
    masterTL
      .to(".hero-h1 .hero-line", {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: {
          amount: 0.2,
          from: "start"
        },
        transformOrigin: "center bottom"
      })
      .to(".hero-subtitle", {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.6,
        transformOrigin: "center bottom"
      }, "-=0.5")
      .to(".hero-buttons", {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.5,
        transformOrigin: "center bottom"
      }, "-=0.3")
      .to(".hero-logo", {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        transformOrigin: "center bottom"
      }, "-=0.6");

    // Enhanced gradient text animations
    gsap.to(".hero-gradient-text", {
      backgroundPosition: "200% 50%",
      repeat: -1,
      yoyo: true,
      duration: 8,
      ease: "sine.inOut",
    });

    // Subtle floating animation with breathing effect
    gsap.to(".hero-gradient-text", {
      y: -4,
      scale: 1.01,
      repeat: -1,
      yoyo: true,
      duration: 4,
      ease: "sine.inOut",
    });

    // Advanced hover interactions
    const gradientText = document.querySelector(".hero-gradient-text");
    if (gradientText) {
      const hoverTL = gsap.timeline({ paused: true });
      hoverTL
        .to(".hero-gradient-text", {
          scale: 1.05,
          rotationY: 2,
          duration: 0.4,
          ease: "back.out(1.7)",
        })
        .to(".hero-gradient-text", {
          textShadow: "0 8px 32px rgba(249, 115, 22, 0.3)",
          duration: 0.3,
        }, "<");

      gradientText.addEventListener("mouseenter", () => hoverTL.play());
      gradientText.addEventListener("mouseleave", () => hoverTL.reverse());
    }

    // Smooth parallax with momentum
    gsap.to(".hero-logo", {
      y: -80,
      rotationY: -5,
      scale: 1.1,
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // Subtle background elements animation
    gsap.to(hero, {
      backgroundPosition: "50% 100%",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 2,
      },
    });

    // Cleanup function for performance
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.set([".hero-h1", ".hero-subtitle", ".hero-buttons", ".hero-logo", ".hero-gradient-text"], {
        clearProps: "all",
      });
    };
  }, [mounted, isLowEndDevice]);

  // Para dispositivos de bajo rendimiento, mostrar elementos sin animación
  useEffect(() => {
    if (!mounted || !isLowEndDevice) return;

    // En dispositivos de bajo rendimiento, simplemente hacer visibles todos los elementos
    gsap.set([".hero-h1 .hero-line", ".hero-subtitle", ".hero-buttons", ".hero-logo"], {
      opacity: 1,
      y: 0,
      rotationX: 0,
    });
  }, [mounted, isLowEndDevice]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen overflow-hidden hero-gradient"
      style={{ backgroundColor: "#FFFFFF" }}
      aria-label="Hero section - Zonda One"
    >
      <div className="absolute inset-0 w-screen h-screen z-0" style={{ opacity: 0.7 }}>
        <Threads
          color={[0.98, 0.45, 0.14]}
          amplitude={0.5}
          distance={0.9}
          enableMouseInteraction={!isLowEndDevice} // Deshabilitar interacción en dispositivos de bajo rendimiento
        />
      </div>
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[55%_45%] h-full">
        <div className="flex flex-col justify-center px-6 sm:px-8 lg:px-16 xl:px-20">
          <h1 className="hero-h1 m-0 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[0.9] tracking-tight text-gray-900 font-display">
            <div className="hero-line">
              {mounted && ready ? t("heroTitleLine1") : "Your idea"}
            </div>
            <div className="hero-line">
              {mounted && ready ? t("heroTitleLine2") : "deserves"}
            </div>
            <div className="hero-line">
              <span
                className={`hero-gradient-text ${isLowEndDevice ? 'low-end-gradient' : ''}`}
                style={{
                  background:
                    "linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {mounted && ready ? t("heroTitleHighlight") : "better code"}
              </span>
            </div>
          </h1>

          <p className="hero-subtitle text-lg sm:text-xl lg:text-xl text-gray-600 max-w-lg mt-6 sm:mt-8 font-light leading-relaxed">
            {mounted && ready ? t("heroSubtitle") : "Small team. Big ideas. We build software that people actually want to use."}
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-8 sm:mt-10">
            <button
              onClick={scrollToContact}
              className="bg-gray-900 text-white px-8 py-3 rounded-sm text-sm font-medium hover:bg-gray-800 transition-colors duration-200 w-full sm:w-auto"
            >
              {mounted && ready ? t("heroButtonWork") : "Work with us"}
            </button>

            <button
              onClick={scrollToProjects}
              className="text-gray-700 text-sm font-medium hover:text-orange-600 transition-colors duration-200 flex items-center gap-2 group"
            >
              {mounted && ready ? t("heroButtonSee") : "See what we've made"}
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
    </section>
  );
}