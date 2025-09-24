"use client";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import SoftwareLogo from "./SoftwareLogo";
import Threads, { ThreadsRef } from "./Threads";

gsap.registerPlugin(ScrollTrigger);

// Memoized scroll functions to prevent recreation
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
  const isMobile = window.innerWidth < 768;
  const targetId = isMobile ? 'gallery-section' : 'macbook-section';
  const targetSection = document.getElementById(targetId);
  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

// Device capability detection with enhanced metrics
const detectDeviceCapabilities = () => {
  // Check if we're in the browser environment
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      hardwareConcurrency: 1,
      deviceMemory: 1,
      isWeakGPU: true,
      isSlowConnection: false,
      prefersReducedMotion: false,
      prefersDarkMode: false,
      getBatteryInfo: async () => ({ lowBattery: false, isCharging: true })
    };
  }

  const isMobile = window.innerWidth < 768;
  const hardwareConcurrency = navigator.hardwareConcurrency || 1;
  const deviceMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 1;
  
  // Enhanced GPU detection
  let isWeakGPU = false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string;
        const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) as string;
        
        const weakGPUPatterns = [
          'intel hd graphics 3000',
          'intel hd graphics 4000',
          'intel uhd graphics',
          'amd radeon r[45]',
          'powervr',
          'adreno [34]',
          'mali-[4-5]',
          'videocore',
          'software'
        ];
        
        const rendererLower = renderer.toLowerCase();
        const vendorLower = vendor.toLowerCase();
        
        isWeakGPU = weakGPUPatterns.some(pattern => 
          rendererLower.includes(pattern) || vendorLower.includes(pattern)
        );
      }
      
      // Test WebGL performance
      const buffer = gl.createBuffer();
      const program = gl.createProgram();
      if (!buffer || !program) {
        isWeakGPU = true;
      }
      
      // Clean up test resources
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
    } else {
      isWeakGPU = true;
    }
  } catch {
    isWeakGPU = true;
  }
  
  // Network detection
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
    connection?.effectiveType === '3g' ||
    (connection?.downlink && connection.downlink < 1) ||
    connection?.saveData;
  
  // User preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Battery API (if available)
  type BatteryManager = {
    level: number;
    charging: boolean;
  };
  
  const getBatteryInfo = async (): Promise<{ lowBattery: boolean; isCharging: boolean }> => {
    try {
      if ('getBattery' in navigator) {
      const battery: BatteryManager = await (navigator as Navigator & { getBattery: () => Promise<BatteryManager> }).getBattery();
        return {
          lowBattery: battery.level < 0.2,
          isCharging: battery.charging
        };
      }
    } catch {}
    return { lowBattery: false, isCharging: true };
  };
  
  return {
    isMobile,
    hardwareConcurrency,
    deviceMemory,
    isWeakGPU,
    isSlowConnection,
    prefersReducedMotion,
    prefersDarkMode,
    getBatteryInfo
  };
};

// Performance tier classification
const classifyPerformanceTier = (capabilities: ReturnType<typeof detectDeviceCapabilities>) => {
  const {
    isMobile,
    hardwareConcurrency,
    deviceMemory,
    isWeakGPU,
    isSlowConnection,
    prefersReducedMotion
  } = capabilities;
  
  // High-end: Desktop with good specs
  if (!isMobile && hardwareConcurrency >= 8 && deviceMemory >= 8 && !isWeakGPU && !isSlowConnection && !prefersReducedMotion) {
    return 'high';
  }
  
  // Mid-end: Modern mobile or mid-range desktop
  if (hardwareConcurrency >= 4 && deviceMemory >= 4 && !isWeakGPU && !prefersReducedMotion) {
    return 'mid';
  }
  
  // Low-end: Everything else
  return 'low';
};

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const threadsRef = useRef<ThreadsRef | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const textAnimationsInitialized = useRef(false); // Add ref to track text animations
  
  const { t, ready } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [performanceTier, setPerformanceTier] = useState<'high' | 'mid' | 'low'>('low');
  const [isInViewport, setIsInViewport] = useState(true);
  const [batteryStatus, setBatteryStatus] = useState({ lowBattery: false, isCharging: true });

  // Memoized device detection - only run on client side
  const deviceCapabilities = useMemo(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        hardwareConcurrency: 1,
        deviceMemory: 1,
        isWeakGPU: true,
        isSlowConnection: false,
        prefersReducedMotion: false,
        prefersDarkMode: false,
        getBatteryInfo: async () => ({ lowBattery: false, isCharging: true })
      };
    }
    return detectDeviceCapabilities();
  }, []);

  // Initialize performance detection
  useEffect(() => {
    const initializePerformanceDetection = async () => {
      const tier = classifyPerformanceTier(deviceCapabilities);
      const battery = await deviceCapabilities.getBatteryInfo();
      
      setPerformanceTier(tier);
      setBatteryStatus(battery);
      setMounted(true);
    };

    initializePerformanceDetection();
  }, [deviceCapabilities]);

  // Viewport intersection observer for resource management
  useEffect(() => {
  if (!mounted) return;

  const options = {
    root: null,
    rootMargin: '100px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      setIsInViewport(entry.isIntersecting);

      if (entry.isIntersecting) {
        // Fade-in SoftwareLogo
        if (logoRef.current) {
          gsap.fromTo(
            logoRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
          );
        }

        // Play Threads y fade-in
        if (threadsRef.current && performanceTier !== 'low') {
          threadsRef.current.play();

          if (threadsRef.current.container) {
            gsap.fromTo(
              threadsRef.current.container,
              { opacity: 0 },
              { opacity: 1, duration: 0.8, ease: "power2.out" }
            );
          }
        }
      } else {
        // Pause Threads al salir del viewport
        if (threadsRef.current) threadsRef.current.pause();
      }
    });
  }, options);

  if (heroRef.current) observer.observe(heroRef.current);

  return () => observer.disconnect();
}, [mounted, performanceTier]);
  

  // SEPARATE EFFECT: Initialize text animations only once when component mounts
  useEffect(() => {
    if (!mounted || !isInViewport || textAnimationsInitialized.current) return;

    const hero = heroRef.current;
    if (!hero) return;

    // Mark text animations as initialized
    textAnimationsInitialized.current = true;

    // Always initialize text animations regardless of performance tier
    // Set initial states with GPU optimization
    gsap.set([".hero-h1 .hero-line", ".hero-subtitle", ".hero-buttons", ".hero-logo"], {
      opacity: 0,
      y: 60,
      rotationX: 15,
      force3D: true,
    });

    gsap.set([".hero-h1", ".hero-subtitle", ".hero-buttons", ".hero-logo", ".hero-gradient-text"], {
      willChange: "transform, opacity",
    });

    // Orchestrated entrance animation
    const masterTL = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.1
    });

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
      }, "-=0.4")
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

  }, [mounted, isInViewport]); // Only depend on mounted and viewport, not performance tier

  // SEPARATE EFFECT: Handle gradient and advanced animations based on performance
  useEffect(() => {
    if (!mounted || !isInViewport || !textAnimationsInitialized.current) return;

    const hero = heroRef.current;
    if (!hero) return;

    // Clean up any existing gradient/advanced animations
    gsap.killTweensOf([".hero-gradient-text"]);
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === hero || trigger.vars.trigger === ".hero-logo") {
        trigger.kill();
      }
    });

    // Low-end devices: minimal gradient animation
    if (performanceTier === 'low' || batteryStatus.lowBattery) {
      if (!deviceCapabilities.prefersReducedMotion) {
        gsap.to(".hero-gradient-text", {
          backgroundPosition: "200% 50%",
          repeat: -1,
          duration: 12,
          ease: "none",
        });
      }
      return;
    }

    

    // Enhanced effects only for high-end devices
    if (performanceTier === 'high') {
      // Complex gradient animation
      gsap.to(".hero-gradient-text", {
        backgroundPosition: "200% 50%",
        repeat: -1,
        yoyo: true,
        duration: 8,
        ease: "sine.inOut",
      });

      // Floating animation
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

        const handleMouseEnter = () => hoverTL.play();
        const handleMouseLeave = () => hoverTL.reverse();

        gradientText.addEventListener("mouseenter", handleMouseEnter);
        gradientText.addEventListener("mouseleave", handleMouseLeave);

        // Cleanup hover listeners
        return () => {
          gradientText.removeEventListener("mouseenter", handleMouseEnter);
          gradientText.removeEventListener("mouseleave", handleMouseLeave);
        };
      }

      // Parallax effects
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

      gsap.to(hero, {
        backgroundPosition: "50% 100%",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });
    } else {
      // Simplified gradient animation for mid-tier
      gsap.to(".hero-gradient-text", {
        backgroundPosition: "200% 50%",
        repeat: -1,
        duration: 10,
        ease: "none",
      });
    }

    // Cleanup function for this effect only
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === hero || trigger.vars.trigger === ".hero-logo") {
          trigger.kill();
        }
      });
      gsap.killTweensOf([".hero-gradient-text"]);
    };
  }, [mounted, performanceTier, isInViewport, batteryStatus.lowBattery, deviceCapabilities.prefersReducedMotion]);

  // Throttled resize handler
  const handleResize = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      const newCapabilities = detectDeviceCapabilities();
      const newTier = classifyPerformanceTier(newCapabilities);
      
      if (newTier !== performanceTier) {
        setPerformanceTier(newTier);
      }
    });
  }, [performanceTier]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleResize]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf("*");
      gsap.set([".hero-h1", ".hero-subtitle", ".hero-buttons", ".hero-logo", ".hero-gradient-text"], {
        clearProps: "all",
      });
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen overflow-hidden hero-gradient"
      style={{ backgroundColor: "#FFFFFF" }}
      aria-label="Hero section - Zonda One"
    >
      <div className="absolute inset-0 w-screen h-screen z-0" style={{ opacity: 0.7 }}>
        {/* Conditionally render Threads based on performance and viewport */}
        {isInViewport && performanceTier !== 'low' && !batteryStatus.lowBattery && (
          <Threads
            ref={threadsRef}
            color={[0.98, 0.45, 0.14]}
            amplitude={performanceTier === 'high' ? 0.5 : 0.3}
            distance={performanceTier === 'high' ? 0.9 : 0.7}
            enableMouseInteraction={performanceTier === 'high'}
            quality={performanceTier === 'high' ? 'high' : 'medium'}
          />
        )}
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
                className={`hero-gradient-text ${performanceTier === 'low' ? 'low-end-gradient' : ''}`}
                style={{
                  background: "linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)",
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
          <div ref={logoRef} className="w-full h-full object-cover hero-logo">
            {/* Only render SoftwareLogo if in viewport and not low-end */}
            {isInViewport && (performanceTier !== 'low' || !batteryStatus.lowBattery) ? (
              <SoftwareLogo scale={performanceTier === 'high' ? 0.8 : 0.6} />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg">
                <div className="text-6xl text-orange-500 opacity-50">⚡</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}