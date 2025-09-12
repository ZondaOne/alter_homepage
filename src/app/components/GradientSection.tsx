"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lottie from "lottie-react";

gsap.registerPlugin(ScrollTrigger);

const GradientSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState<any>(null);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    // Cargar animación
    fetch("/dashboard.json")
      .then((res) => res.json())
      .then(setAnimationData);

    // Animaciones más directas y arquitectónicas
    const tl = gsap.timeline({
      scrollTrigger: { 
        trigger: sectionRef.current, 
        start: "top 70%",
      }
    });

    tl.fromTo(
      ".section-marker",
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(
      ".main-title",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(
      ".step-block",
      { opacity: 0, x: -30 },
      { 
        opacity: 1, 
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      },
      "-=0.5"
    );

    // Gradiente sutil
    gsap.to(".gradient-text", {
      backgroundPosition: "200% 50%",
      repeat: -1,
      yoyo: true,
      duration: 12,
      ease: "none"
    });

  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-20 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header principal - estilo Hero */}
        <div className="text-center  lg:mb-20">
          <div className="mb-10">
            <h2 className="font-display main-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[0.9] tracking-tight text-gray-900">
              SOLUTIONS
              <br />
              <span
                className="gradient-text"
                style={{
                  background: "linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ENGINEERED
              </span>
            </h2>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-px bg-orange-500 mx-auto mb-8"></div>
            <p className="text-xl lg:text-2xl text-neutral-700 leading-[1.6] font-light">
              We architect digital experiences that don't just meet expectations—they redefine them. 
              Every project is a statement of precision, purpose, and uncompromising quality.
            </p>
          </div>
        </div>

        {/* Layout principal mejorado */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Columna izquierda: Animación + CTA */}
          <div className="lg:col-span-5 xl:col-span-6 space-y-12">
            {/* Animación Lottie */}
            <div className="relative">
              <div className="relative group">
                {/* Decoración arquitectónica */}
                <div className="absolute -top-6 -left-6 w-24 h-24 border-l-2 border-t-2 border-orange-200 opacity-60"></div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 border-r-2 border-b-2 border-orange-200 opacity-60"></div>
                
                {animationData && (
                  <div className="bg-white rounded-2xl p-8 shadow-xl shadow-orange-100/50 border border-orange-100/30">
                    <Lottie
                      lottieRef={lottieRef}
                      animationData={animationData}
                      loop
                      autoplay
                      onDOMLoaded={() => {
                        if (lottieRef.current) {
                          lottieRef.current.setSpeed?.(0.4);
                          lottieRef.current.animation?.setSpeed(0.4);
                        }
                      }}
                      className="w-full h-auto lg:h-[500px] xl:h-[600px]"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* CTA section - ahora en la columna izquierda */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-px bg-gradient-to-r from-orange-500 via-orange-400 to-transparent flex-1"></div>
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-xl font-bold text-neutral-900">Ready to Transform?</h4>
                  <p className="text-neutral-600 leading-relaxed">
                    Let's discuss how we can architect your next breakthrough solution.
                  </p>
                </div>
                
                <div className="flex flex-col gap-4">
                  <button className="group bg-neutral-900 text-white px-8 py-4 font-medium tracking-wide uppercase text-sm border-2 border-neutral-900 hover:bg-transparent hover:text-neutral-900 transition-all duration-300 rounded-lg">
                    <span className="flex items-center justify-center gap-3">
                      INITIATE PROJECT
                      <span className="w-4 h-px bg-current group-hover:w-8 transition-all duration-300"></span>
                    </span>
                  </button>
                  
                  <button className="group border-2 border-neutral-300 px-8 py-4 font-medium tracking-wide uppercase text-sm text-neutral-700 hover:border-orange-500 hover:text-orange-600 transition-all duration-300 rounded-lg">
                    <span className="flex items-center justify-center gap-3">
                      VIEW PORTFOLIO
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha: Solo el proceso */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-16">
            
            {/* Process header */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-orange-500"></div>
                <h3 className="text-sm font-bold text-neutral-500 tracking-[0.3em] uppercase">
                  OUR PROCESS
                </h3>
              </div>
              <p className="text-lg text-neutral-600 leading-relaxed max-w-xl">
                Three pillars of excellence that transform complexity into clarity, 
                challenges into opportunities, and visions into measurable results.
              </p>
            </div>

            {/* Process blocks */}
            <div className="space-y-1">
              {[
                {
                  number: "01",
                  title: "STRATEGIC ANALYSIS",
                  description: "Deep-dive into business architecture. We dissect challenges, identify leverage points, and map transformation pathways that align with your strategic vision."
                },
                {
                  number: "02",
                  title: "PRECISION ENGINEERING", 
                  description: "Technical mastery meets creative vision. We build solutions that perform flawlessly under pressure and scale without compromise across all platforms."
                },
                {
                  number: "03",
                  title: "PERFORMANCE MASTERY",
                  description: "Relentless optimization and measurement. Every metric matters, every improvement compounds into measurable business impact and sustained growth."
                },
              ].map((step, i) => (
                <div key={i} className="step-block group">
                  <div className="grid grid-cols-12 gap-6 py-8 lg:py-10 border-t border-neutral-200 hover:border-orange-300 transition-all duration-500 hover:bg-orange-50/30 -mx-6 px-6 rounded-lg">
                    
                    <div className="col-span-3 sm:col-span-2">
                      <div className="text-2xl lg:text-3xl font-black text-orange-500 group-hover:text-orange-600 transition-colors duration-300">
                        {step.number}
                      </div>
                    </div>
                    
                    <div className="col-span-9 sm:col-span-10 space-y-4">
                      <h4 className="text-lg lg:text-xl font-bold text-neutral-900 tracking-wide group-hover:text-orange-800 transition-colors duration-300">
                        {step.title}
                      </h4>
                      <p className="text-neutral-600 leading-relaxed font-light text-base lg:text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GradientSection;