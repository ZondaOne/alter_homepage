'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(ScrollTrigger)

const InteractiveBlobsSection: React.FC = () => {
  const { t, i18n } = useTranslation()
  const mainRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<SVGSVGElement>(null)
  const linesRef = useRef<SVGSVGElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const ctx = gsap.context(() => {
      // 1. Initial State: Logo starts as a clear black contour
      gsap.set(logoRef.current, {
        scale: 1.2,
        opacity: 0.5,
        transformOrigin: 'center center'
      })

      // 2. Initial State: Architectural Lines (more subtle at start)
      gsap.set(linesRef.current, {
        opacity: 0.15,
        scale: 1.05,
        transformOrigin: 'center center'
      })

      // 3. Initial State: Content 
      gsap.set(contentRef.current, {
        scale: 0.85,
        opacity: 0,
        y: 60
      })

      // 4. Scroll Timeline: "Recession / Reveal" Effect
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1.2,
          pin: true,
          anticipatePin: 1
        }
      })

      // Logo recedes into the distance
      tl.to(logoRef.current, {
        scale: 0.3,
        opacity: 0,
        filter: 'blur(12px)',
        duration: 2,
        ease: 'power2.inOut'
      })
      // Lines become more visible to match section below
      .to(linesRef.current, {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'power2.inOut'
      }, 0)
      // The content emerges as the logo moves back
      .to(contentRef.current, {
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 1.8,
        ease: 'power3.out'
      }, '-=1.2')

    }, mainRef)

    return () => ctx.revert()
  }, [mounted])

  if (!mounted) return null

  // Refined Multi-language Title logic
  const renderTitle = () => {
    const lang = i18n.language || 'es'
    
    let fromText = 'Del '
    let conceptText = 'Concepto'
    let toText = ' al '
    let codeText = 'Código'

    if (lang === 'en') {
      fromText = 'From '
      conceptText = 'Concept'
      toText = ' to '
      codeText = 'Code'
    } else if (lang === 'it') {
      fromText = 'Dal '
      conceptText = 'Concetto'
      toText = ' al '
      codeText = 'Codice'
    }

    return (
      <h2 className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter text-gray-900 leading-[1.05]">
        {fromText}
        <span className="blobs-gradient-text">
          {conceptText}
        </span>
        {toText}
        <span className="blobs-gradient-text">
          {codeText}
        </span>
      </h2>
    )
  }

  const logoPaths = (
    <>
      <path d="M 88.478 186.141 L 147.278 101.441 L 257.616 101.606 L 316.242 186.175 L 88.478 186.141 Z" />
      <path d="M 151.162 214.519 L 254.816 214.785 L 123.855 401.854 L 88.385 304.265 L 151.162 214.519 Z" />
      <path d="M 375.69 100 L 412.058 198.385 L 348.108 288.629 L 243.925 288.629 L 375.69 100 Z" />
      <path d="M 183.137 316.443 L 410.625 316.222 L 353.087 400.362 L 241.446 400.15 L 183.137 316.443 Z" />
    </>
  )

  return (
    <section
      ref={mainRef}
      className="relative min-h-screen flex items-center justify-center bg-white px-6 overflow-hidden py-32"
    >
      {/* Subtle Grain Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Architectural Lines - Sweeping pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <svg
          ref={linesRef}
          width="100%"
          height="100%"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          className="absolute top-0 left-0"
        >
          <path d="M-200 150 Q 400 600, 1400 100" fill="none" stroke="#f97316" strokeWidth="1.5" strokeOpacity="0.4" />
          <path d="M-300 450 Q 500 -100, 1500 550" fill="none" stroke="#f97316" strokeWidth="2" strokeOpacity="0.3" />
          <path d="M-100 700 Q 600 200, 1300 800" fill="none" stroke="#f97316" strokeWidth="1.2" strokeOpacity="0.25" />
        </svg>
      </div>

      {/* Background Logo — Starts as black border/contour */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <svg 
          ref={logoRef}
          viewBox="0 0 500 500" 
          className="w-[300px] h-[300px] md:w-[600px] md:h-[600px]"
          fill="none"
          stroke="#000000"
          strokeWidth="1"
        >
          {logoPaths}
        </svg>
      </div>

      {/* Content Section */}
      <div ref={contentRef} className="relative z-10 max-w-7xl w-full flex flex-col items-center text-center gap-16">
        <div className="flex flex-col items-center gap-6">
          <span className="text-orange-500 font-bold tracking-[0.4em] text-xs uppercase opacity-90">
            {t('interactiveBlobs.weAre')} ZONDA
          </span>
          <div className="h-px w-16 bg-orange-200"></div>
        </div>

        {renderTitle()}

        <p className="font-light text-xl md:text-2xl lg:text-3xl text-gray-400 max-w-4xl leading-relaxed">
          {t('card.digitalSolutionsDescription')}
        </p>
      </div>

      <style jsx global>{`
        .blobs-gradient-text {
          background-image: linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: blobs-gradient-flow 4s ease-in-out infinite;
        }
        @keyframes blobs-gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  )
}

export default InteractiveBlobsSection
