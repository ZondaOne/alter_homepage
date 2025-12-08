'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(ScrollTrigger)

export default function FAQ() {
  const { t, ready } = useTranslation()
  const faqRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [openIndex, setOpenIndex] = useState(0) // Primera pregunta abierta

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const faq = faqRef.current
    if (!faq) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: faq,
        start: 'top 80%'
      }
    })

    tl.from('.faq-h1', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }).from(
      '.faq-item',
      {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      },
      '-=0.6'
    )
  }, [mounted])

  const faqs =
    mounted && ready ? t('faq.questions', { returnObjects: true }) : []

  return (
    <section
      id="support"
      ref={faqRef}
      className="relative flex items-center overflow-hidden bg-gray-50 py-12 sm:py-16 2xl:py-16"
    >
      <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 w-full space-y-8 sm:space-y-12 lg:space-y-16 2xl:space-y-20">
        {/* Header */}
        <div className="text-center">
          <h1 className="faq-h1 m-0 text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-7xl font-semibold leading-[0.9] tracking-tight text-gray-900 font-display">
            {mounted && ready ? t('faq.title') : "What You're"}
            <br />
            <span
              className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent"
              style={{ backgroundSize: '200% 100%' }}
            >
              {mounted && ready ? t('faq.titleHighlight') : 'Wondering'}
            </span>
          </h1>
        </div>

        {/* FAQ items */}
        <div className="space-y-4 2xl:space-y-6">
          {Array.isArray(faqs) &&
            (faqs as { question: string; answer: string }[]).map((faq, i) => {
              const isOpen = i === openIndex
              return (
                <div
                  key={i}
                  className="faq-item border-l-2 border-gray-200 pl-4 sm:pl-6 2xl:pl-8 py-4 2xl:py-6 hover:border-orange-500 transition-colors duration-300 cursor-pointer"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg sm:text-xl 2xl:text-2xl font-bold text-gray-900 pr-4">
                      {faq.question}
                    </h4>
                    <svg
                      className={`w-5 h-5 2xl:w-7 2xl:h-7 text-gray-600 transform transition-transform duration-300 ${
                        isOpen ? 'rotate-90 text-orange-500' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                  {isOpen && (
                    <p className="text-sm sm:text-base 2xl:text-lg text-gray-600 font-light leading-relaxed mt-3 2xl:mt-4">
                      {faq.answer}
                    </p>
                  )}
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}
