'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(ScrollTrigger)

const InteractiveBlobsSection: React.FC = () => {
  const { t } = useTranslation()
  const mainRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<SVGSVGElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const blobContainerRef = useRef<HTMLDivElement>(null)
  const cardInnerRef = useRef<HTMLDivElement>(null)
  const typingH3Ref = useRef<HTMLHeadingElement>(null)
  const [mounted, setMounted] = React.useState(false)
  const [displayedText, setDisplayedText] = useState<WordData[]>([])
  const [isTyping, setIsTyping] = useState(false)

  // Define the type for word data
  interface WordData {
    word: string
    isLast: boolean
    shouldBreak: boolean
    style: React.CSSProperties
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  // Track if typing animation has been completed to prevent re-triggering
  const [typingCompleted, setTypingCompleted] = useState(false)
  const [typingTriggered, setTypingTriggered] = useState(false)

  // Typing effect function wrapped in useCallback
  const startTypingEffect = useCallback(() => {
    if (!mounted || isTyping || typingCompleted || typingTriggered) return

    setTypingTriggered(true)
    const fullText = `${t('card.fromConcept')} ${t('card.toCode')}`
    const words = fullText.split(' ')
    const isEnglish = fullText.includes('Code')

    // Pre-determine styles for each word based on complete text
    const wordsWithStyles: WordData[] = words.map((word, idx) => {
      const isLast = idx === words.length - 1
      const shouldBreak = isEnglish && word.toLowerCase() === 'to'

      return {
        word,
        isLast,
        shouldBreak,
        style: isLast
          ? {
              color: 'transparent',
              backgroundImage:
                'linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradient-flow 3s ease-in-out infinite',
              backgroundClip: 'text'
            }
          : {}
      }
    })

    setIsTyping(true)
    let currentWordIndex = 0
    let currentCharIndex = 0
    const revealedWords: WordData[] = []

    const typeNextChar = () => {
      if (currentWordIndex < wordsWithStyles.length) {
        const currentWordData = wordsWithStyles[currentWordIndex]
        const currentWord = currentWordData.word

        if (currentCharIndex < currentWord.length) {
          // Type character by character for current word
          const partialWord = currentWord.substring(0, currentCharIndex + 1)
          const tempWords: WordData[] = [...revealedWords]
          tempWords[currentWordIndex] = {
            ...currentWordData,
            word: partialWord
          }
          setDisplayedText(tempWords)
          currentCharIndex++
          setTimeout(typeNextChar, 100)
        } else {
          // Finished current word
          revealedWords[currentWordIndex] = currentWordData
          setDisplayedText([...revealedWords])
          currentWordIndex++
          currentCharIndex = 0
          setTimeout(typeNextChar, 100) // Shorter pause between words: 100ms
        }
      } else {
        // Finished typing
        setIsTyping(false)
        setTypingCompleted(true)
      }
    }

    // Start typing immediately when triggered
    typeNextChar()
  }, [mounted, isTyping, typingCompleted, typingTriggered, t])

  const renderTypingText = (wordsData: WordData[]) => {
    if (!wordsData || wordsData.length === 0) return null

    return wordsData.map((wordData, idx) => {
      if (!wordData) return null

      const { word, isLast, shouldBreak, style } = wordData

      return (
        <React.Fragment key={idx}>
          {shouldBreak && <br />}
          <span
            className={`inline-block px-2 mx-1 bg-orange-100 my-1 ${
              isLast ? '' : 'text-gray-800'
            }`}
            style={{
              ...style,
              transition: 'all 0.2s ease-out',
              animation: 'fadeIn 0.3s ease-out'
            }}
          >
            {word}
          </span>
        </React.Fragment>
      )
    })
  }

  // GSAP animations useEffect
  useEffect(() => {
    if (!mounted) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: typingH3Ref.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
        onEnter: () => {
          startTypingEffect()
        }
      })
    }, mainRef)

    return () => ctx.revert()
  }, [mounted, startTypingEffect])

  // NO useEffect that resets typing on language change - animation should persist

  const renderGrayBackgroundText = (text: string) => {
    const words = text.split(' ')
    const isEnglish = text.includes('Code')

    return words.map((word, idx) => {
      const isLast = idx === words.length - 1
      const shouldBreak = isEnglish && word.toLowerCase() === 'to'

      return (
        <React.Fragment key={idx}>
          {shouldBreak && <br />}
          <span
            className={`inline-block px-2 mx-1 bg-orange-100 my-1 ${
              isLast ? '' : 'text-gray-800'
            }`}
            style={
              isLast
                ? {
                    color: 'transparent',
                    backgroundImage:
                      'linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'gradient-flow 3s ease-in-out infinite',
                    backgroundClip: 'text'
                  }
                : {}
            }
          >
            {word}
          </span>
        </React.Fragment>
      )
    })
  }

  return (
    <section
      id="about"
      ref={mainRef}
      className="hidden md:flex relative min-h-screen items-center justify-center overflow-hidden bg-cream-base px-8 py-16"
    >
      <div className="grain-overlay" />
      <div className="container mx-auto space-y-4 2xl:space-y-2 relative z-10">
        {/* Header Text */}
        <div className="max-w-7xl mx-auto text-center">
          <div
            ref={textRef}
            className="flex flex-col justify-center space-y-4 2xl:space-y-2 text-gray-800"
          >
            <h2 className="hero-h1 m-0 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-8xl font-semibold leading-[0.9] tracking-tight text-gray-900 font-display mb-2 2xl:mb-0">
              <span
                className="hero-gradient-text text-element"
                style={{
                  background:
                    'linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'gradient-flow 3s ease-in-out infinite'
                }}
              >
                {mounted ? t('interactiveBlobs.hash') : ''}
              </span>
              <span className="hero-line text-element">
                {mounted ? t('interactiveBlobs.weAre') : ''}
              </span>
              <span
                className="hero-gradient-text text-element"
                style={{
                  background:
                    'linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'gradient-flow 3s ease-in-out infinite',
                  animationDelay: '0.5s'
                }}
              >
                {mounted ? t('interactiveBlobs.zonda') : ''}
              </span>
            </h2>
            <p className="text-lg lg:text-xl xl:text-2xl 2xl:text-2xl text-element max-w-4xl 2xl:max-w-6xl mx-auto 2xl:leading-relaxed">
              {mounted ? t('interactiveBlobs.description1') : ''}
            </p>
          </div>
        </div>

        {/* Enhanced Card Section  */}
        <div ref={cardRef} className="w-full">
          <div
            ref={cardInnerRef}
            className="relative overflow-visible card-element w-full"
            style={{ boxShadow: 'none' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[500px] 2xl:min-h-[700px] relative z-10 gap-16 lg:gap-24 2xl:gap-40">
              {/* Content Side */}
              <div className="lg:col-span-2 content-side p-8 lg:p-16 2xl:p-24 flex flex-col justify-center space-y-4 2xl:space-y-3 relative">
                <div className="space-y-3 2xl:space-y-2">
                  <div className="space-y-2 2xl:space-y-1">
                    <h3
                      ref={typingH3Ref}
                      className="text-5xl lg:text-6xl xl:text-7xl 2xl:text-7xl font-bold leading-relaxed tracking-tight font-display typing-container"
                      style={{
                        minHeight: '3em',
                        maxWidth: '100%',
                        width: '100%',
                        wordWrap: 'break-word',
                        wordBreak: 'break-word'
                      }}
                    >
                      {mounted &&
                        (typingCompleted
                          ? renderGrayBackgroundText(
                              `${t('card.fromConcept')} ${t('card.toCode')}`
                            )
                          : displayedText.length > 0 &&
                            renderTypingText(displayedText))}
                      <span
                        className={`typing-cursor ${
                          typingCompleted ? 'blink' : ''
                        }`}
                      >
                        |
                      </span>
                    </h3>

                    <p className="text-lg lg:text-xl xl:text-2xl 2xl:text-2xl text-gray-600 leading-relaxed max-w-lg 2xl:max-w-2xl">
                      {mounted ? t('card.digitalSolutionsDescription') : ''}
                    </p>
                  </div>
                </div>
              </div>

              {/* Blob & Logo Side - Sin recuadros ni sombras */}
              <div
                ref={blobContainerRef}
                className="lg:col-span-1 relative overflow-visible flex items-center justify-center min-h-[500px] 2xl:min-h-[700px]"
              >
                <div className="absolute inset-0 z-0">
                  <div
                    className="blob blob1"
                    style={
                      {
                        '--color1': 'rgba(249,115,22,0.8)',
                        '--color2': 'rgba(251,146,60,0.5)',
                        '--color3': 'rgba(234,88,12,0.6)'
                      } as React.CSSProperties
                    }
                  />
                  <div
                    className="blob blob2"
                    style={
                      {
                        '--color1': 'rgba(234,88,12,0.7)',
                        '--color2': 'rgba(249,115,22,0.4)',
                        '--color3': 'rgba(194,65,12,0.5)'
                      } as React.CSSProperties
                    }
                  />
                  <div
                    className="blob blob3"
                    style={
                      {
                        '--color1': 'rgba(251,146,60,0.6)',
                        '--color2': 'rgba(249,115,22,0.5)',
                        '--color3': 'rgba(234,88,12,0.4)'
                      } as React.CSSProperties
                    }
                  />
                </div>

                <div className="relative z-10">
                  <svg
                    ref={logoRef}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 500 500"
                    className="w-56 h-56 lg:w-72 lg:h-72 xl:w-96 xl:h-96 2xl:w-[380px] 2xl:h-[380px] glow-effect"
                  >
                    <path
                      className="logo-path"
                      d="M 88.478 186.141 L 147.278 101.441 L 257.616 101.606 L 316.242 186.175 L 88.478 186.141 Z"
                      fill="#fff"
                    />
                    <path
                      className="logo-path"
                      d="M 151.162 214.519 L 254.816 214.785 L 123.855 401.854 L 88.385 304.265 L 151.162 214.519 Z"
                      fill="#fff"
                    />
                    <path
                      className="logo-path"
                      d="M 375.69 100 L 412.058 198.385 L 348.108 288.629 L 243.925 288.629 L 375.69 100 Z"
                      fill="#fff"
                    />
                    <path
                      className="logo-path"
                      d="M 183.137 316.443 L 410.625 316.222 L 353.087 400.362 L 241.446 400.15 L 183.137 316.443 Z"
                      fill="#fff"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Styles  */}
      <style jsx global>{`
        .blob-side {
          position: relative;
        }

        .blob {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          mix-blend-mode: multiply;
          background: radial-gradient(
            ellipse at 30% 20%,
            var(--color1) 0%,
            var(--color2) 35%,
            var(--color3) 60%,
            transparent 85%
          );
          will-change: transform, border-radius;
          opacity: 0.8;
        }

        .blob1 {
          width: 370px;
          height: 370px;
          animation: morph-gentle 14s ease-in-out infinite;
        }

        .blob2 {
          width: 370px;
          height: 370px;
          animation: morph-gentle 11s ease-in-out infinite reverse;
          animation-delay: -3s;
        }

        .blob3 {
          width: 370px;
          height: 370px;
          animation: morph-gentle 18s ease-in-out infinite;
          animation-delay: -7s;
        }

        @media (min-width: 1536px) {
          .blob1,
          .blob2,
          .blob3 {
            width: 400px;
            height: 400px;
          }
        }

        @keyframes morph-gentle {
          0% {
            border-radius: 55% 45% 35% 65% / 55% 35% 65% 45%;
            transform: translate(-50%, -50%) rotate(0deg);
          }
          25% {
            border-radius: 45% 55% 45% 35% / 65% 45% 55% 35%;
            transform: translate(-50%, -50%) rotate(90deg) scale(1.02);
          }
          50% {
            border-radius: 35% 55% 65% 45% / 45% 55% 35% 55%;
            transform: translate(-50%, -50%) rotate(180deg) scale(0.98);
          }
          75% {
            border-radius: 65% 35% 45% 55% / 35% 65% 45% 55%;
            transform: translate(-50%, -50%) rotate(270deg) scale(1.01);
          }
          100% {
            border-radius: 55% 45% 35% 65% / 55% 35% 65% 45%;
            transform: translate(-50%, -50%) rotate(360deg) scale(1);
          }
        }

        .glow-effect {
          filter: drop-shadow(0 0 25px rgba(249, 115, 22, 0.55));
        }

        .logo-path,
        .text-element,
        .card-element {
          will-change: transform, opacity;
        }

        /* Typing effect styles */
        .typing-container {
          min-height: 2.4em;
          position: relative;
          display: block;
          white-space: normal;
          word-wrap: break-word;
          transition: all 0.3s ease-out;
        }

        .typing-container span {
          transition: all 0.2s ease-out;
        }

        .typing-cursor {
          display: inline-block;
          margin-left: 2px;
          color: #b4b4b462;
          font-weight: normal;
          font-size: 1em;
        }

        .typing-cursor.blink {
          animation: cursor-blink 1.5s infinite;
        }

        .typing-cursor.hidden {
          opacity: 0;
        }

        @keyframes cursor-blink {
          0%,
          60% {
            opacity: 1;
          }
          61%,
          100% {
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-2px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Eliminar cualquier sombra por defecto */
        .card-element {
          box-shadow: none !important;
        }

        @media (max-width: 1024px) {
          .content-side {
            clip-path: none;
          }
        }
      `}</style>
    </section>
  )
}

export default InteractiveBlobsSection
