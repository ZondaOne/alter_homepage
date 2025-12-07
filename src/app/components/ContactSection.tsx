'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const contactRef = useRef<HTMLDivElement>(null)
  const { t, ready } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitType, setSubmitType] = useState<'success' | 'error' | ''>('')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !ready) return

    const contactSection = contactRef.current
    if (!contactSection) return

    // Cleanup previous ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === contactSection) {
        trigger.kill()
      }
    })

    // Wait a frame to ensure DOM is ready
    const initAnimation = () => {
      const titleLines = contactSection.querySelectorAll('.title-line')
      const subtitle = contactSection.querySelector('.contact-subtitle')
      const form = contactSection.querySelector('.contact-form')

      if (!titleLines.length || !subtitle || !form) {
        setTimeout(initAnimation, 100)
        return
      }

      // Set initial states
      gsap.set(titleLines, {
        opacity: 0,
        y: 60,
        rotationX: 15,
        force3D: true
      })

      gsap.set([subtitle, form], {
        opacity: 0,
        y: 60,
        rotationX: 15,
        force3D: true
      })

      // Create timeline with ScrollTrigger
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: contactSection,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      })

      tl.to(titleLines, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.2,
        transformOrigin: 'center bottom'
      })
        .to(
          subtitle,
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.6,
            transformOrigin: 'center bottom'
          },
          '-=0.5'
        )
        .to(
          form,
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            transformOrigin: 'center bottom'
          },
          '-=0.4'
        )

      // Fallback: trigger animation manually if not triggered by scroll
      setTimeout(() => {
        const rect = contactSection.getBoundingClientRect()
        const inView = rect.top < window.innerHeight * 0.8
        if (inView && gsap.getProperty(titleLines[0], 'opacity') === 0) {
          tl.play()
        }
      }, 1000)
    }

    // Start animation initialization
    requestAnimationFrame(initAnimation)

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === contactSection) {
          trigger.kill()
        }
      })
    }
  }, [mounted, ready])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormState(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')
    setSubmitType('')

    try {
      const response = await fetch('https://formspree.io/f/xgvylepr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      })

      if (response.ok) {
        setSubmitType('success')
        setSubmitMessage(t('contact.form.success'))
        setFormState({ name: '', email: '', message: '' })
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitType('error')
      setSubmitMessage(t('contact.form.error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      ref={contactRef}
      className="relative min-h-screen flex items-center py-8 sm:py-16 2xl:py-24"
      style={{ backgroundColor: 'white' }}
    >
      <div className="max-w-7xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 w-full">
        <div className="max-w-5xl 2xl:max-w-6xl mx-auto text-center">
          <h2 className="contact-title text-5xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-8xl font-semibold leading-[0.9] tracking-tight text-gray-900 font-display mb-4 sm:mb-6 2xl:mb-8">
            <div className="title-line">
              {mounted && ready ? t('contact.title') : "Let's start"}
            </div>
            <div className="title-line">
              <span
                className="gradient-text"
                style={{
                  background:
                    'linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {mounted && ready
                  ? t('contact.titleHighlight')
                  : 'building together'}
              </span>
            </div>
          </h2>

          <p className="contact-subtitle text-base sm:text-lg lg:text-xl 2xl:text-3xl text-gray-600 max-w-3xl 2xl:max-w-5xl mx-auto mb-8 sm:mb-12 2xl:mb-16 font-light leading-relaxed px-4 sm:px-0">
            {mounted && ready
              ? t('contact.subtitle')
              : "Have a project in mind? We'd love to hear about it. Drop us a message and let's discuss how we can help bring your ideas to life."}
          </p>
        </div>

        <div className="contact-form max-w-3xl 2xl:max-w-4xl mx-auto px-4 sm:px-0">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-6 2xl:space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 2xl:gap-8">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm 2xl:text-lg font-medium text-gray-700 mb-2 2xl:mb-3"
                >
                  {mounted && ready ? t('contact.form.name') : 'Your name'}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder={
                    mounted && ready
                      ? t('contact.form.namePlaceholder')
                      : 'Enter your name'
                  }
                  required
                  className="w-full px-3 sm:px-4 2xl:px-6 py-2 sm:py-3 2xl:py-4 border border-gray-300 rounded-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm sm:text-base 2xl:text-lg"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm 2xl:text-lg font-medium text-gray-700 mb-2 2xl:mb-3"
                >
                  {mounted && ready ? t('contact.form.email') : 'Email address'}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  placeholder={
                    mounted && ready
                      ? t('contact.form.emailPlaceholder')
                      : 'Enter your email'
                  }
                  required
                  className="w-full px-3 sm:px-4 2xl:px-6 py-2 sm:py-3 2xl:py-4 border border-gray-300 rounded-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm sm:text-base 2xl:text-lg"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm 2xl:text-lg font-medium text-gray-700 mb-2 2xl:mb-3"
              >
                {mounted && ready
                  ? t('contact.form.message')
                  : 'Tell us about your project'}
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formState.message}
                onChange={handleInputChange}
                placeholder={
                  mounted && ready
                    ? t('contact.form.messagePlaceholder')
                    : 'What are you looking to build? Share your ideas, challenges, or any questions you have...'
                }
                required
                className="w-full px-3 sm:px-4 2xl:px-6 py-2 sm:py-3 2xl:py-4 border border-gray-300 rounded-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-vertical min-h-[100px] sm:min-h-[120px] 2xl:min-h-[150px] text-sm sm:text-base 2xl:text-lg"
              />
            </div>

            <div className="flex flex-col items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-900 text-white px-6 sm:px-8 2xl:px-12 py-2 sm:py-3 2xl:py-4 rounded-sm text-sm 2xl:text-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 w-full sm:w-auto min-w-[160px] 2xl:min-w-[200px]"
              >
                {isSubmitting
                  ? mounted && ready
                    ? t('contact.form.sending')
                    : 'Sending...'
                  : mounted && ready
                  ? t('contact.form.submit')
                  : 'Send message'}
              </button>

              {submitMessage && (
                <div
                  className={`mt-4 p-4 rounded-sm text-sm ${
                    submitType === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {submitMessage}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
