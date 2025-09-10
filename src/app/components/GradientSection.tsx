"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslation, Trans } from "react-i18next";
import Lottie from "lottie-react";

gsap.registerPlugin(ScrollTrigger);

const GradientSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const [mounted, setMounted] = useState(false);
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Cargar animación Lottie desde public
    fetch("/dashboard.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch(console.error);

    if (!mounted) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.from(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });

    tl.from(
      textRef.current,
      {
        opacity: 0,
        y: 20,
        duration: 1.2,
        ease: "power3.out",
      },
      "-=0.5"
    );
  }, [mounted]);

  return (
    <div
  ref={sectionRef}
  className="relative w-full min-h-[70vh] bg-gray-100 mt-4 mb-4 flex flex-col md:flex-row items-center justify-center px-4 md:px-8"
>
  <div className="flex flex-col md:flex-row w-full items-center gap-8 md:gap-12">
    {/* Lottie left 50% */}
    <div className="w-full md:w-1/2 flex justify-center items-center">
      {animationData && (
        <Lottie 
          animationData={animationData} 
          loop 
          autoplay 
          className="w-full md:max-w-[600px] h-auto"
        />
      )}
    </div>

    {/* Text right 50% */}
    <div ref={textRef} className="w-full md:w-1/2 flex flex-col items-start md:items-start gap-6">
      {mounted && (
        <>
          <p className="text-xl md:text-2xl font-light leading-[1.5] text-[#1c1c1c] tracking-wide">
            <Trans i18nKey="gradientText">
              We build <span className="text-gray-900 font-normal">brands that matter</span>, creating digital experiences tailored to your vision. Every project is a partnership, every solution is crafted with purpose.
            </Trans>
          </p>

          {/* CTA */}
          <Trans i18nKey="gradientCTA">
            <a
              href="#contact"
              className="btn-accent py-3 px-6 rounded-md font-semibold text-white transition-colors duration-200 hover:bg-accent-dark"
            >
              Contact us
            </a>
          </Trans>
        </>
      )}
    </div>
  </div>
</div>


  );
};

export default GradientSection;
