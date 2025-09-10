'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GradientSection = () => {
  const sectionRef = useRef(null);
  const blobRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Animate section and text when scrolled into view
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%', // when top of section hits 80% of viewport
        toggleActions: 'play none none none', // play only once
      },
    });

    // Section entrance
    tl.from(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    });

    // Text entrance
    tl.from(
      textRef.current,
      {
        opacity: 0,
        y: 20,
        duration: 1.2,
        ease: 'power3.out',
      },
      '-=0.5' // overlap slightly with section animation
    );

    // Blob floating animation (continuous, not scroll-dependent)
    gsap.to(blobRef.current, {
      duration: 6,
      x: '+=40',
      y: '-=40',
      scale: 1.2,
      rotation: 5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    gsap.to(blobRef.current, {
      duration: 8,
      x: '-=30',
      y: '+=35',
      scale: 1,
      rotation: -5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 2,
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen bg-gray-100 overflow-hidden flex items-center justify-center grain-background"
    >
      {/* Background blob */}
      <div
        ref={blobRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 max-w-sm max-h-sm"
        style={{
          background:
            'radial-gradient(at 50% 50%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), radial-gradient(at 70% 60%, rgb(195, 224, 96) 0%, rgba(195, 224, 96, 0) 90%), radial-gradient(at 30% 30%, rgb(195, 224, 96) 0%, rgba(195, 224, 96, 0) 60%), radial-gradient(at left bottom, rgb(0, 163, 203) 0%, rgba(0, 163, 203, 0) 70%), linear-gradient(135deg, rgba(18, 46, 119, 0) 0%, rgba(18, 46, 119, 0) 75%, rgb(18, 46, 119) 100%), linear-gradient(to right, rgb(98, 87, 147) 0%, rgb(213, 93, 100) 35%, rgb(228, 145, 41) 65%, rgb(192, 103, 28) 100%)',
          borderRadius: '66rem',
          backgroundBlendMode: 'overlay, luminosity, multiply, saturation, color-dodge, lighten',
          filter: 'blur(46px)',
          height: '100%',
          width: '100%',
          maxHeight: '400px',
          maxWidth: '400px',
        }}
      />

      {/* Section text */}
      <div ref={textRef} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="text-xl font-light leading-[1.4] text-[#1c1c1c] no-underline tracking-wide">
          We build <span className="text-gray-900 font-normal">brands that matter</span>, creating digital experiences{' '}
          <span className="text-black font-medium">tailored to your vision</span>.{' '}
          Every project is a partnership, every solution is <span className="text-gray-900 font-normal">crafted with purpose</span>.
        </p>
      </div>
    </div>
  );
};

export default GradientSection;
