'use client'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'


const scrollToContact = () => {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const getProjects = (t: (key: string) => string) => [
  {
    id: 1,
    title: t('macbook.products.pixelperfect.title'),
    subtitle: t('macbook.products.pixelperfect.description'),
    description: t('macbook.products.pixelperfect.description'),
    url: 'pixelperfect.zonda.one',
    tags: [],
    image: '/bg.png',
  },
  {
    id: 2,
    title: t('macbook.products.comerzia.title'),
    subtitle: t('macbook.products.comerzia.description'),
    description: t('macbook.products.comerzia.description'),
    url: 'comerzia.zonda.one',
    tags: [],
    image: '/bg2.png',
  },
  {
    id: 3,
    title: t('macbook.products.comchat.title'),
    subtitle: t('macbook.products.comchat.description'),
    description: t('macbook.products.comchat.description'),
    url: 'comchat.zonda.one',
    tags: [],
    image: '/bg3.png',
  },
];

const GridGallerySection = () => {
  const { t, ready } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const projects = mounted && ready ? getProjects(t) : []

  return (
   <section id="gallery-section" className="relative w-full py-16 md:py-24 px-6 md:px-8 overflow-hidden md:hidden" style={{ backgroundColor: '#F9FAFB' }}>
  <div className="relative z-10 max-w-7xl mx-auto w-full">
    {/* Header */}
    <div className="mb-16 text-center max-w-5xl mx-auto">
      <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[0.9] tracking-tight text-neutral-900 mb-8">
        {mounted && ready ? t('galleryTitleLine1') : 'OUR LATEST'}
        <br />
        <span
          className="gradient-text font-semibold"
          style={{
            background:
              'linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {mounted && ready ? t('galleryTitleHighlight') : 'PROJECTS'}
        </span>
      </h2>
      <div className="w-16 h-px bg-orange-500 mx-auto mb-8"></div>
      <p className="text-xl text-neutral-700 max-w-2xl mx-auto font-light leading-relaxed">
        {mounted && ready
          ? t('gallerySubtitle')
          : "We architect digital solutions that merge precision, design and technology—crafted to inspire, scale, and perform."}
      </p>
    </div>

    {/* Grid zig-zag */}
    <div className="space-y-32">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className={`relative flex flex-col xl:flex-row items-center gap-16 xl:gap-28 ${
            index % 2 === 1 ? 'xl:flex-row-reverse' : ''
          }`}
        >
          {/* Imagen */}
          <div className="xl:w-7/12 relative group">
            <div className="relative overflow-hidden rounded-2xl shadow-xl transition-transform duration-700 ease-out group-hover:scale-[1.02]">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-80 lg:h-96 object-cover"
                />
              ) : (
                <div className="w-full h-80 lg:h-96 flex items-center justify-center text-gray-100 text-7xl font-semibold bg-gray-900">
                  {project.title.substring(0, 2)}
                </div>
              )}
            </div>
            {/* Esquinas decorativas */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-l-2 border-t-2 border-orange-200 opacity-60"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-r-2 border-b-2 border-orange-200 opacity-60"></div>
          </div>

          {/* Texto */}
          <div className="xl:w-5/12 space-y-8 text-center xl:text-left">
            <div className="flex flex-wrap gap-3 justify-center xl:justify-start">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200 tracking-[0.08em] uppercase rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-4xl lg:text-5xl font-bold text-neutral-900 leading-[1.1]">
              {project.title}
            </h3>
            <h4 className="text-xl lg:text-2xl font-light text-neutral-600">
              {project.subtitle}
            </h4>

            <div className="pt-6">
              <a
                href={`https://${project.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-8 py-4 text-white font-medium text-lg rounded-lg transition-all duration-300 ease-out bg-neutral-900 hover:bg-neutral-800 hover:scale-[1.02]"
              >
                <span className="relative z-10">Launch {project.title}</span>
                <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Footer CTA */}
    <div className="mt-40">
      <div className="relative bg-neutral-900 text-white p-16 rounded-2xl text-center shadow-xl">
        <h3 className="text-3xl lg:text-4xl font-semibold mb-6 leading-tight">
          {mounted && ready ? t('galleryCTA.title') : 'Ready to start building?'}
        </h3>
        <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          {mounted && ready ? t('galleryCTA.description') : "Every great project starts with a conversation. What's your next move?"}
        </p>
        <button
          onClick={scrollToContact}
          className="group bg-white text-neutral-900 px-8 py-4 font-medium tracking-wide uppercase text-sm border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 rounded-lg flex items-center gap-3 mx-auto"
        >
          {mounted && ready ? t('galleryCTA.button') : 'START YOUR PROJECT'}
          <span className="w-4 h-px bg-current group-hover:w-8 transition-all duration-300"></span>
        </button>
      </div>
    </div>
  </div>
</section>

  )
}

export default GridGallerySection
