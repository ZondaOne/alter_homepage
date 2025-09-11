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
      className="relative py-32 bg-white"
    >
      
     

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">
        
        {/* Animación con marco arquitectónico */}
        <div className="relative lg:sticky lg:top-20">
          <div className="relative group">
            
            {animationData && (
               <div className="bg-white  rounded-2xl ">

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
                  className="w-full h-auto lg:h-[600px]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Contenido arquitectural */}
        <div className="space-y-16">
          
          {/* Header minimalista y directo */}
          <div>
          
            
            <div className="space-y-2 mb-8">
              <p className="text-xs font-medium text-orange-600 tracking-[0.3em] uppercase">
                ZONDA ONE
              </p>
              <h2 className="font-display main-title text-6xl lg:text-7xl font-thin text-neutral-900 leading-[0.85] tracking-[-0.03em]">
                SOLUTIONS
              </h2>
              <h2 className="font-display gradient-text text-6xl lg:text-7xl font-black bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent leading-[0.85] tracking-[-0.03em]" style={{ backgroundSize: "200%" }}>
                ENGINEERED
              </h2>
              <p className="text-2xl font-thin italic text-neutral-600 tracking-wide mt-6">
                FOR IMPACT
              </p>
            </div>
            
            <div className="border-l-2 border-orange-300 pl-6">
              <p className="text-lg text-neutral-700 leading-[1.6] font-light max-w-lg">
                We architect digital experiences that don't just meet expectations—they redefine them. 
                Every project is a statement of precision, purpose, and uncompromising quality.
              </p>
            </div>
          </div>

          {/* Process blocks - arquitectónicos */}
          <div className="space-y-8">
            <div className="border-l-2 border-neutral-200 pl-6">
              <h3 className="text-sm font-medium text-neutral-500 tracking-[0.2em] uppercase mb-6">
                PROCESS
              </h3>
            </div>
            
            {[
              {
                number: "01",
                title: "STRATEGIC ANALYSIS",
                description: "Deep-dive into business architecture. We dissect challenges, identify leverage points, and map transformation pathways."
              },
              {
                number: "02",
                title: "PRECISION ENGINEERING", 
                description: "Technical mastery meets creative vision. We build solutions that perform flawlessly under pressure and scale without compromise."
              },
              {
                number: "03",
                title: "PERFORMANCE MASTERY",
                description: "Relentless optimization and measurement. Every metric matters, every improvement compounds into measurable business impact."
              },
            ].map((step, i) => (
              <div key={i} className="step-block group">
                <div className="grid grid-cols-12 gap-6 py-8 border-t border-neutral-200 hover:border-orange-300 transition-colors duration-500">
                  
                  <div className="col-span-2">
                    <div className="text-3xl font-black text-orange-500 group-hover:text-orange-600 transition-colors duration-300">
                      {step.number}
                    </div>
                  </div>
                  
                  <div className="col-span-10 space-y-3">
                    <h4 className="text-xl font-bold text-neutral-900 tracking-wide group-hover:text-orange-800 transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-neutral-600 leading-relaxed font-light text-base max-w-md">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA minimalista */}
          <div className="pt-8 space-y-6">
            <div className="h-px bg-gradient-to-r from-orange-500 to-transparent"></div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="group bg-neutral-900 text-white px-8 py-4 font-medium tracking-wide uppercase text-sm border-2 border-neutral-900 hover:bg-transparent hover:text-neutral-900 transition-all duration-300">
                <span className="flex items-center gap-3">
                  INITIATE PROJECT
                  <span className="w-4 h-px bg-current group-hover:w-8 transition-all duration-300"></span>
                </span>
              </button>
              
              <button className="group border-2 border-neutral-300 px-8 py-4 font-medium tracking-wide uppercase text-sm text-neutral-700 hover:border-orange-500 hover:text-orange-600 transition-all duration-300">
                <span className="flex items-center gap-3">
                  VIEW PORTFOLIO
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GradientSection;