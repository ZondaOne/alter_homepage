'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
}

const GridGallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { t, ready } = useTranslation();
  const [mounted, setMounted] = useState(false);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: "PixelPerfect",
      subtitle: "Professional image editing powered by AI",
      description: "Advanced image editing with background removal, upscaling, and content generation. Precision and ease combined in one powerful platform.",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop&crop=entropy",
      url: "pixelperfect.zonda.one",
      tags: ["AI", "Image Processing", "React", "WebGL"]
    },
    {
      id: 2,
      title: "Comerzia", 
      subtitle: "Smart business management platform",
      description: "Complete business management solution for handling clients and orders. Features dashboard analytics and automated customer notifications.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=entropy",
      url: "comerzia.zonda.one",
      tags: ["Business", "Analytics", "CRM", "Automation"]
    },
    {
      id: 3,
      title: "ComChat",
      subtitle: "Custom AI chatbot for businesses", 
      description: "Intelligent chatbot that learns from your data. Supports text and multimodal conversations with privacy-focused local deployment.",
      image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=800&h=600&fit=crop&crop=entropy",
      url: "comchat.zonda.one",
      tags: ["AI", "Chatbot", "NLP", "Privacy"]
    }
  ];

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 6000);
  }, [projects.length]);

  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      startInterval();
    } else {
      stopInterval();
    }
    
    return () => stopInterval();
  }, [isPlaying, startInterval, stopInterval]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
    if (isPlaying) {
      stopInterval();
      startInterval();
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
    if (isPlaying) {
      stopInterval();
      startInterval();
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (isPlaying) {
      stopInterval();
      startInterval();
    }
  };

  const currentProject = projects[currentSlide];

  return (
    <div 
      ref={sectionRef} 
      className="relative w-full py-20 md:py-32 px-5 md:px-8 min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f9fafb 0%, #fff 25%, #fef7f0 50%, #fff 75%, #f9fafb 100%)'
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 via-transparent to-red-50/10 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Main Title */}
        <div className="mb-16 md:mb-24 text-center max-w-4xl mx-auto">
          <h2 className="gallery-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[0.9] tracking-tight text-gray-900 mb-8 font-display">
            {mounted && ready ? t("galleryTitleLine1") : "Our latest"}
            <br />
            <span 
              className="hero-gradient-text"
              style={{
                background: "linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {mounted && ready ? t("galleryTitleHighlight") : "creations"}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            {mounted && ready ? t("gallerySubtitle") : "Explore our portfolio of web applications that solve real problems with elegant design and powerful technology."}
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Content Section */}
          <div className="gallery-content space-y-6 sm:space-y-8 order-2 xl:order-1 xl:w-1/2 w-full max-w-2xl xl:max-w-none">
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <span className="text-xs sm:text-sm tracking-[0.3em] text-orange-600 uppercase font-medium">
                  {String(currentSlide + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-gray-900 leading-[1.1] font-display">
                  {currentProject.title}
                </h3>
              </div>
              
              <h4 className="text-lg sm:text-xl lg:text-2xl font-light text-gray-700 leading-relaxed">
                {currentProject.subtitle}
              </h4>
              
              <p className="text-base sm:text-lg text-gray-600 leading-[1.7] max-w-md lg:max-w-lg font-light">
                {currentProject.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {currentProject.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 text-xs sm:text-sm bg-orange-50 text-orange-700 rounded-full border border-orange-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button className="group relative overflow-hidden inline-flex items-center gap-3 px-6 sm:px-8 py-3 bg-gray-900 text-white rounded-sm font-medium hover:bg-gray-800 transition-all duration-200 w-full sm:w-auto justify-center sm:justify-start">
                <span className="relative z-10 text-sm tracking-normal">
                  {mounted && ready ? t("galleryButtonVisit") : "Visit"} {currentProject.url}
                </span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:translate-x-1">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Project indicators */}
            <div className="flex justify-center sm:justify-start gap-3 pt-6">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-orange-500 scale-125' 
                      : 'bg-gray-300 hover:bg-orange-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Safari Browser Window */}
          <div className="browser-window relative order-1 xl:order-2 xl:w-1/2 w-full flex justify-center">
            <div className="relative mx-auto w-full max-w-5xl">
              {/* Browser frame */}
              <div className="relative bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Browser header */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
                  {/* Traffic lights */}
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full"></div>
                  </div>
                  
                  {/* URL bar */}
                  <div className="flex-1 mx-3 sm:mx-6">
                    <div className="bg-white rounded-md px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 border border-gray-200 font-mono truncate">
                      https://{currentProject.url}
                    </div>
                  </div>
                  
                  {/* Browser controls */}
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </div>
                </div>
                
                {/* Website content */}
                <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[450px] overflow-hidden">
                  {projects.map((project, index) => (
                    <div
                      key={project.id}
                      className="absolute inset-0 transition-all duration-700 ease-out"
                      style={{
                        transform: `translateX(${(index - currentSlide) * 100}%)`,
                        opacity: index === currentSlide ? 1 : 0.5
                      }}
                    >
                      <div className="relative h-full">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Subtle overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                        
                        {/* Content overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2">{project.title}</h3>
                          <p className="text-sm sm:text-base opacity-90 mb-3">{project.subtitle}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span 
                                key={tagIndex}
                                className="px-2 py-1 text-xs bg-white/20 backdrop-blur-sm rounded-md"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-orange-600 hover:bg-white transition-all duration-200"
                aria-label="Previous project"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-orange-600 hover:bg-white transition-all duration-200"
                aria-label="Next project"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridGallerySection;