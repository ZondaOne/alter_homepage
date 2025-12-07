import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface AnimationConfig {
  duration?: number
  delay?: number
  ease?: string
  stagger?: number | { amount: number; from: 'center' | 'start' | 'end' | 'edges' | 'random' }
  force3D?: boolean
}

export const defaultAnimConfig: AnimationConfig = {
  duration: 0.8,
  ease: 'power3.out',
  force3D: true
}

// Reusable GSAP timeline setup
export const createScrollTimeline = (
  trigger: HTMLElement | null,
  config?: { start?: string; end?: string }
) => {
  return gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger,
      start: config?.start || 'top 80%',
      end: config?.end,
      toggleActions: 'play none none reverse'
    }
  })
}

// Animate elements in
export const animateIn = (
  selector: string | gsap.TweenTarget,
  config: AnimationConfig = {}
) => {
  const mergedConfig = { ...defaultAnimConfig, ...config }
  return gsap.to(selector, {
    opacity: 1,
    y: 0,
    rotationX: 0,
    ...mergedConfig,
    transformOrigin: 'center bottom'
  } as gsap.TweenVars)
}

// Set initial state for animations
export const setInitialState = (selector: string | gsap.TweenTarget) => {
  gsap.set(selector, {
    opacity: 0,
    y: 60,
    rotationX: 15,
    force3D: true
  })
}

// Cleanup ScrollTriggers for a specific element
export const cleanupScrollTriggers = (element: HTMLElement | null) => {
  if (!element) return
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.trigger === element) {
      trigger.kill()
    }
  })
}

// Setup gradient animation
export const animateGradient = (selector: string, duration: number = 8) => {
  gsap.to(selector, {
    backgroundPosition: '200% 50%',
    repeat: -1,
    yoyo: true,
    duration,
    ease: 'sine.inOut'
  })
}

// Cleanup all animations
export const cleanupAllAnimations = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  gsap.set('*', { clearProps: 'all' })
}
