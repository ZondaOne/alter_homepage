// Shared constants across components
export const GRADIENT_COLORS = {
  orange: 'linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)',
  orangeText: {
    color: 'transparent',
    backgroundImage:
      'linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)',
    backgroundSize: '200% 100%',
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text' as const
  }
}

export const SCROLL_TRIGGERS = {
  HERO_START: 'top 105%',
  CONTACT_START: 'top 80%',
  TYPING_START: 'top 80%'
}

export const ANIMATION_DURATIONS = {
  CHAR_DELAY: 100,
  WORD_DELAY: 150,
  TYPING_START_DELAY: 200,
  STANDARD: 0.8,
  SHORT: 0.5,
  LONG: 1.2
}

export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1024,
  WIDE: 1280
}

export const isMobileViewport = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < BREAKPOINTS.TABLET
}

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
