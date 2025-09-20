"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";

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

const StepProcessSection: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState<any>(null);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    fetch("/dashboard.json")
      .then((res) => res.json())
      .then(setAnimationData);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    // Línea de marcador
    tl.fromTo(
      ".section-marker",
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: "power2.out" }
    );

    // Título principal con fade up
    tl.fromTo(
      ".main-title",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.3"
    );

    // Descripción con fade up
    tl.fromTo(
      ".hero-description",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.5"
    );

    // Animación de Lottie con fade up
    tl.fromTo(
      ".lottie-container",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.5"
    );

    // Bloques de pasos con stagger + fade up
    tl.fromTo(
      ".step-block",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" },
      "-=0.5"
    );

    // Animación infinita del gradiente
    gsap.to(".gradient-text", {
      backgroundPosition: "200% 50%",
      repeat: -1,
      yoyo: true,
      duration: 12,
      ease: "none",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header principal */}
        <div className="text-center lg:mb-20">
          <div className="mb-10">
            <h2 className="font-display main-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[0.9] tracking-tight text-gray-900">
              {t("solutions")}
              <br />
              <span
                className="gradient-text"
                style={{
                  background:
                    "linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t("engineered")}
              </span>
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="section-marker w-16 h-px bg-orange-500 mx-auto mb-8"></div>
            <p className="hero-description text-xl lg:text-2xl text-neutral-700 leading-[1.6] font-light">
              {t("hero.description")}
            </p>
          </div>
        </div>

        {/* Layout principal */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Columna izquierda */}
          <div className="lg:col-span-5 xl:col-span-6 space-y-12">
            <div className="relative">
              <div className="relative group">
                <div className="hidden md:flex absolute -top-6 -left-6 w-24 h-24 border-l-2 border-t-2 border-orange-200 opacity-60"></div>
                {animationData && (
                  <div className="lottie-container bg-white rounded-2xl p-8">
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

            {/* CTA */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-px bg-gradient-to-r from-orange-500 via-orange-400 to-transparent flex-1"></div>
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-xl font-bold text-neutral-900">
                    {t("cta.title")}
                  </h4>
                  <p className="text-neutral-600 leading-relaxed">
                    {t("cta.description")}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={scrollToContact}
                    className="group bg-neutral-900 text-white px-8 py-4 font-medium tracking-wide uppercase text-sm border-2 border-neutral-900 hover:bg-transparent hover:text-neutral-900 transition-all duration-300 rounded-lg"
                  >
                    <span className="flex items-center justify-center gap-3">
                      {t("cta.initiate")}
                      <span className="w-4 h-px bg-current group-hover:w-8 transition-all duration-300"></span>
                    </span>
                  </button>

                  <button className="group border-2 border-neutral-300 px-8 py-4 font-medium tracking-wide uppercase text-sm text-neutral-700 hover:border-orange-500 hover:text-orange-600 transition-all duration-300 rounded-lg">
                    <span className="flex items-center justify-center gap-3">
                      {t("cta.portfolio")}
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha: proceso */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-16">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-orange-500"></div>
                <h3 className="text-sm font-bold text-neutral-500 tracking-[0.3em] uppercase">
                  {t("process.title")}
                </h3>
              </div>
              <p className="text-lg text-neutral-600 leading-relaxed max-w-xl">
                {t("process.description")}
              </p>
            </div>

            {/* Bloques de proceso */}
            <div className="space-y-1">
              {[
                {
                  number: "01",
                  title: t("process.steps.analysis.title"),
                  description: t("process.steps.analysis.description"),
                },
                {
                  number: "02",
                  title: t("process.steps.engineering.title"),
                  description: t("process.steps.engineering.description"),
                },
                {
                  number: "03",
                  title: t("process.steps.performance.title"),
                  description: t("process.steps.performance.description"),
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

export default StepProcessSection;
