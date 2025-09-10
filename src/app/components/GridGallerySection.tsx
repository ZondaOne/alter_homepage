'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const GridGallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const projects: Project[] = [
    {
      id: 1,
      title: "Sustainable Innovation",
      subtitle: "Building tomorrow's solutions today",
      description: "We create innovative products that respect our planet while delivering exceptional value to our stakeholders worldwide.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=1200&fit=crop&crop=entropy"
    },
    {
      id: 2,
      title: "Global Impact", 
      subtitle: "Connecting communities worldwide",
      description: "Our mission extends beyond borders, creating meaningful connections and opportunities for growth in every corner of the world.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=1200&fit=crop&crop=entropy"
    },
    {
      id: 3,
      title: "Future Forward",
      subtitle: "Technology that transforms lives", 
      description: "Through cutting-edge technology and human-centered design, we're building solutions that make life better for everyone.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=1200&fit=crop&crop=entropy"
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
      className="w-full py-20 md:py-32 px-5 md:px-8 min-h-screen flex items-center bg-white"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Main Title */}
        <div className="mb-16 md:mb-24 text-center max-w-4xl mx-auto">
          <h2 className="gallery-title text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-gray-900 mb-8">
            Crafting experiences that
            <span className="block text-transparent bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text mt-4">
              define the future
            </span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-10 rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-center">
          {/* Content Section */}
          <div className="gallery-content space-y-12 order-2 lg:order-1 lg:w-1/2">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-sm tracking-[0.3em] text-orange-600 uppercase font-bold">
                  {String(currentSlide + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-[1.2]">
                  {currentProject.title}
                </h3>
              </div>
              
              <h4 className="text-xl md:text-2xl font-semibold text-gray-700 leading-relaxed">
                {currentProject.subtitle}
              </h4>
              
              <p className="text-lg text-gray-600 leading-[1.8] max-w-md">
                {currentProject.description}
              </p>
            </div>

            <div className="pt-6">
              <button className="group relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="relative z-10 text-lg tracking-normal">
                  Explore project
                </span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-8 pt-10">
              <button
                onClick={togglePlayPause}
                className="group flex items-center gap-4 text-gray-700 hover:text-orange-600 transition-colors duration-300"
                aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                <div className="w-12 h-12 rounded-full border-2 border-gray-300 group-hover:border-orange-500 flex items-center justify-center transition-all duration-300 group-hover:bg-orange-50">
                  {isPlaying ? (
                    <div className="flex space-x-1.5">
                      <div className="w-1.5 h-4 bg-current rounded-sm"></div>
                      <div className="w-1.5 h-4 bg-current rounded-sm"></div>
                    </div>
                  ) : (
                    <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </div>
                <span className="text-base tracking-wide font-semibold">
                  {isPlaying ? 'Pause' : 'Play'}
                </span>
              </button>

              <div className="flex items-center gap-4">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-orange-500 text-gray-600 hover:text-orange-600 transition-all duration-300 flex items-center justify-center hover:bg-orange-50"
                  aria-label="Previous slide"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-orange-500 text-gray-600 hover:text-orange-600 transition-all duration-300 flex items-center justify-center hover:bg-orange-50"
                  aria-label="Next slide"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Project indicators */}
            <div className="flex justify-start mt-10 gap-3">
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

          {/* iPhone Frame Section */}
          <div className="iphone-frame relative order-1 lg:order-2 lg:w-1/2 flex justify-center">
            <div className="relative mx-auto">
              {/* iPhone frame */}
              <div className="relative w-80 h-[600px]">
                {/* Device frame */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[50px] p-2 shadow-2xl">
                  {/* Dynamic Island */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20"></div>
                  
                  {/* Screen content */}
                  <div className="relative h-full rounded-[40px] overflow-hidden bg-black">
                    <div className="relative h-full overflow-hidden">
                      {projects.map((project, index) => (
                        <div
                          key={project.id}
                          className="absolute inset-0 transition-all duration-700 ease-out"
                          style={{
                            transform: `translateY(${(index - currentSlide) * 100}%)`,
                            opacity: index === currentSlide ? 1 : 0.3
                          }}
                        >
                          <div className="relative h-full">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                            {/* Instagram-style overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            
                            {/* Content overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                              <h3 className="text-xl font-bold mb-2 text-shadow-lg">{project.title}</h3>
                              <p className="text-sm font-medium text-white/90 text-shadow">{project.subtitle}</p>
                              
                              {/* Instagram-style icons */}
                              <div className="flex justify-between items-center mt-4">
                                <div className="flex space-x-4">
                                  <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                  </svg>
                                  <svg className="w-6 h-6" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                                  </svg>
                                  <svg className="w-6 h-6" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Home indicator */}
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center z-30">
                      <div className="w-32 h-1 bg-white/80 rounded-full"></div>
                    </div>

                    {/* Story dots indicator */}
                    <div className="absolute top-16 left-4 right-4 flex space-x-1 z-20">
                      {projects.map((_, index) => (
                        <div
                          key={index}
                          className={`flex-1 h-0.5 rounded-full transition-all duration-300 ${
                            index <= currentSlide ? 'bg-white' : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="absolute -bottom-8 left-0 right-0 h-2 bg-gray-200 rounded-full shadow-sm">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-700 ease-out rounded-full"
                style={{ width: `${((currentSlide + 1) / projects.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridGallerySection;