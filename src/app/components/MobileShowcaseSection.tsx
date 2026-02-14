'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MobileShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const { t, ready } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !ready || !sectionRef.current) return

    // Cleanup previous ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === sectionRef.current) {
        trigger.kill()
      }
    })

    // Set initial state
    gsap.set([imageRef.current, textRef.current], {
      opacity: 0,
      y: 60,
      force3D: false
    })

    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      defaults: { ease: 'power3.out' }
    })

    tl.to(
      imageRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        transformOrigin: 'center bottom'
      },
      0
    ).to(
      textRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        transformOrigin: 'center bottom'
      },
      0.1
    )

    // Gradient animation for title
    gsap.to('.hero-gradient-text', {
      backgroundPosition: '200% 50%',
      repeat: -1,
      yoyo: true,
      duration: 8,
      ease: 'sine.inOut'
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [mounted, ready])

  if (!ready) return null

  return (
    <section
      ref={sectionRef}
      className="hidden lg:block relative w-full bg-white pb-8 lg:pb-16 2xl:pb-16 pt-0 overflow-hidden"
    >
      {/* Bold Architectural Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          className="absolute top-0 left-0"
        >
          <path
            d="M-100 200 C 400 50, 800 550, 1300 250"
            fill="none"
            stroke="#f97316"
            strokeWidth="2"
            strokeOpacity="0.5"
          />
          <path
            d="M-200 600 C 300 800, 950 350, 1400 550"
            fill="none"
            stroke="#f97316"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          <path
            d="M-50 400 C 500 200, 700 600, 1250 450"
            fill="none"
            stroke="#f97316"
            strokeWidth="1.2"
            strokeOpacity="0.35"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="flex items-center justify-between w-full gap-8 lg:gap-12">
          {/* Imagen a la izquierda */}
          <div ref={imageRef} className="w-3/5 lg:w-7/12">
            <Image
              src="/mobile.png"
              alt={t('mobileShowcase.imageAlt')}
              width={6144}
              height={2688}
              priority
              className="w-full h-auto shadow-none drop-shadow-none !filter-none border-none outline-none ring-0"
            />
          </div>

          {/* Texto a la derecha */}
          <div ref={textRef} className="w-2/5 lg:w-5/12">
            <h3 className="text-5xl lg:text-6xl 2xl:text-7xl font-semibold text-gray-900 mb-6 lg:mb-10 font-display tracking-tight leading-[1.1]">
              {t('mobileShowcase.title').split(' ').slice(0, -2).join(' ')}{' '}
              <span
                className="hero-gradient-text"
                style={{
                  background:
                    'linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {t('mobileShowcase.title').split(' ').slice(-2).join(' ')}
              </span>
            </h3>
            <p className="text-xl lg:text-2xl 2xl:text-3xl text-gray-600 leading-relaxed font-light max-w-2xl">
              {t('mobileShowcase.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
