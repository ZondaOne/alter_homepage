"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslation, Trans } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const GradientSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
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

    if (blobRef.current) {
      gsap.to(blobRef.current, {
        duration: 4,
        x: "+=20",
        y: "-=20",
        scale: 1.1,
        rotation: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(blobRef.current, {
        duration: 5,
        x: "-=22",
        y: "+=18",
        scale: 1,
        rotation: -2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
      });
    }
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-[70vh] bg-gray-100 overflow-hidden flex flex-col items-center justify-center grain-background"
    >
      {/* Background blob */}
      <div
        ref={blobRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 max-w-sm max-h-sm"
        style={{
          background:
            "radial-gradient(at 50% 50%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), radial-gradient(at 70% 60%, rgb(195, 224, 96) 0%, rgba(195, 224, 96, 0) 90%), radial-gradient(at 30% 30%, rgb(195, 224, 96) 0%, rgba(195, 224, 96, 0) 60%), radial-gradient(at left bottom, rgb(0, 163, 203) 0%, rgba(0, 163, 203, 0) 70%), linear-gradient(135deg, rgba(18, 46, 119, 0) 0%, rgba(18, 46, 119, 0) 75%, rgb(18, 46, 119) 100%), linear-gradient(to right, rgb(98, 87, 147) 0%, rgb(213, 93, 100) 35%, rgb(228, 145, 41) 65%, rgb(192, 103, 28) 100%)",
          borderRadius: "66rem",
          backgroundBlendMode:
            "overlay, luminosity, multiply, saturation, color-dodge, lighten",
          filter: "blur(46px)",
          height: "100%",
          width: "100%",
          maxHeight: "400px",
          maxWidth: "400px",
        }}
      />

      {/* Section text */}
      <div
        ref={textRef}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <p className="text-2xl font-light leading-[1.4] text-[#1c1c1c] no-underline tracking-wide mb-6">
          <Trans i18nKey="gradientText">
            We build <span className="text-gray-900 font-normal">brands that matter</span>, creating digital experiences tailored to your vision. Every project is a partnership, every solution is crafted with purpose.
          </Trans>
        </p>

        {/* CTA Button */}
       <Trans i18nKey="gradientCTA">
  <a
    href="#contact"
    className="mt-6 inline-block py-4 px-8 rounded-md text-lg font-semibold text-white bg-black transition-colors duration-200 hover:bg-gray-800"
  >
    Contact us
  </a>
</Trans>

      </div>

      {/* Grainy background */}
      <style jsx>{`
        .grain-background::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100" height="100" filter="url(%23noise)"/></svg>');
          opacity: 0.05;
          pointer-events: none;
          z-index: 20;
        }
      `}</style>
    </div>
  );
};

export default GradientSection;
