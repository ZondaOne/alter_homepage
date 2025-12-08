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
      force3D: true
    })

    gsap.set([imageRef.current, textRef.current], {
      willChange: 'transform, opacity'
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

    tl.to(imageRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      transformOrigin: 'center bottom'
    }, 0)
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      transformOrigin: 'center bottom'
    }, 0.1)

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [mounted, ready])

  if (!ready) return null

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gray-50 py-8 lg:py-16 2xl:py-16"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="flex items-center justify-between w-full gap-8 lg:gap-12">
          {/* Imagen a la izquierda */}
          <div ref={imageRef} className="w-3/5 lg:w-7/12">
            <Image
              src="/mobile.png"
              alt={t('mobileShowcase.imageAlt')}
              width={6144}
              height={2688}
              priority
              className="w-full h-auto"
            />
          </div>
          
          {/* Texto a la derecha */}
          <div ref={textRef} className="w-2/5 lg:w-5/12">
            <h3 className="text-4xl lg:text-5xl 2xl:text-6xl font-semibold text-gray-900 mb-4 lg:mb-6">
              {t('mobileShowcase.title')}
            </h3>
            <p className="text-lg lg:text-xl 2xl:text-2xl text-gray-600 leading-relaxed mb-6 lg:mb-8">
              {t('mobileShowcase.description')}
            </p>
            <ul className="space-y-3 lg:space-y-4">
              <li className="flex items-center gap-3 text-base lg:text-lg 2xl:text-xl text-gray-700">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                {t('mobileShowcase.feature1')}
              </li>
              <li className="flex items-center gap-3 text-base lg:text-lg 2xl:text-xl text-gray-700">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                {t('mobileShowcase.feature2')}
              </li>
              <li className="flex items-center gap-3 text-base lg:text-lg 2xl:text-xl text-gray-700">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                {t('mobileShowcase.feature3')}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
