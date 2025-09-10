'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  tags: string[];
  color: string;
  accentColor: string;
}

const GridGallerySection = () => {
  const { t, ready } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: "PixelPerfect",
      subtitle: "Professional image editing powered by AI",
      description: "Advanced image editing with background removal, upscaling, and content generation. Precision and ease combined in one powerful platform.",
      url: "pixelperfect.zonda.one",
      tags: ["AI", "Image Processing", "React", "WebGL"],
      color: "#f97316",
      accentColor: "#fb923c"
    },
    {
      id: 2,
      title: "Comerzia", 
      subtitle: "Smart business management platform",
      description: "Complete business management solution for handling clients and orders. Features dashboard analytics and automated customer notifications.",
      url: "comerzia.zonda.one",
      tags: ["Business", "Analytics", "CRM", "Automation"],
      color: "#ea580c",
      accentColor: "#f97316"
    },
    {
      id: 3,
      title: "ComChat",
      subtitle: "Custom AI chatbot for businesses", 
      description: "Intelligent chatbot that learns from your data. Supports text and multimodal conversations with privacy-focused local deployment.",
      url: "comchat.zonda.one",
      tags: ["AI", "Chatbot", "NLP", "Privacy"],
      color: "#fb923c",
      accentColor: "#ea580c"
    }
  ];

  return (
    <div 
      className="relative w-full py-20 md:py-32 px-5 md:px-8 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #fafafa 0%, #ffffff 25%, #fef7f0 50%, #ffffff 75%, #f9fafb 100%)'
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Tech grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="tech-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f97316" strokeWidth="0.5" opacity="0.3"/>
                <circle cx="20" cy="20" r="1" fill="#f97316" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tech-grid)" />
          </svg>
        </div>
        
        {/* Floating tech symbols */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => {
            const positions = [
              { left: 10, top: 20 }, { left: 85, top: 15 }, { left: 25, top: 80 },
              { left: 70, top: 75 }, { left: 45, top: 10 }, { left: 15, top: 60 },
              { left: 80, top: 40 }, { left: 35, top: 85 }, { left: 60, top: 25 },
              { left: 90, top: 70 }, { left: 5, top: 45 }, { left: 75, top: 90 },
              { left: 50, top: 5 }, { left: 20, top: 35 }, { left: 95, top: 55 }
            ];
            const symbols = ['<>', '/>', '{}', '[]', '()', 'fn', 'AI', 'ML'];
            return (
              <div
                key={i}
                className="absolute text-orange-500/10 font-mono text-xs animate-float"
                style={{
                  left: `${positions[i]?.left || 50}%`,
                  top: `${positions[i]?.top || 50}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${4 + (i % 3)}s`
                }}
              >
                {symbols[i % symbols.length]}
              </div>
            );
          })}
        </div>

        {/* Orange accent particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => {
            const particlePositions = [
              { left: 15, top: 25 }, { left: 75, top: 65 }, { left: 30, top: 80 },
              { left: 85, top: 20 }, { left: 50, top: 15 }, { left: 10, top: 70 },
              { left: 65, top: 85 }, { left: 90, top: 45 }
            ];
            return (
              <div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-orange-400 rounded-full animate-pulse opacity-20"
                style={{
                  left: `${particlePositions[i]?.left || 50}%`,
                  top: `${particlePositions[i]?.top || 50}%`,
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            );
          })}
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Clean header */}
        <div className="mb-16 md:mb-24 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.9] tracking-tight text-gray-900 mb-8 font-display">
            {mounted && ready ? t("galleryTitleLine1") : "Our latest"}
            <br />
            <span 
              className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 bg-clip-text text-transparent"
              style={{
                background: "linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {mounted && ready ? t("galleryTitleHighlight") : "programs"}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            {mounted && ready ? t("gallerySubtitle") : "Explore our portfolio of web applications that solve real problems with elegant design and powerful technology."}
          </p>
        </div>

        {/* Programs Showcase Grid */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Visual */}
              <div className="lg:w-1/2 relative">
                <div className="relative group">
                  {/* Main showcase card */}
                  <div 
                    className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transform transition-all duration-500 hover:scale-105"
                    style={{
                      boxShadow: hoveredProject === project.id 
                        ? `0 25px 50px -12px ${project.color}40` 
                        : '0 25px 50px -12px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {/* App mockup header */}
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="flex-1 bg-white rounded-md px-4 py-2 text-sm text-gray-600 font-mono border border-gray-200">
                          https://{project.url}
                        </div>
                      </div>
                    </div>

                    {/* App content area */}
                    <div className="relative h-80 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
                      {/* Project icon/logo area */}
                      <div 
                        className="w-32 h-32 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg transform transition-all duration-300 hover:scale-110"
                        style={{ backgroundColor: project.color }}
                      >
                        {project.title.substring(0, 2)}
                      </div>
                      
                      {/* Floating UI elements */}
                      <div className="absolute inset-4 pointer-events-none">
                        <div 
                          className="absolute top-4 left-4 w-16 h-3 rounded-full opacity-20"
                          style={{ backgroundColor: project.color }}
                        ></div>
                        <div 
                          className="absolute top-4 right-4 w-8 h-8 rounded-lg opacity-10"
                          style={{ backgroundColor: project.accentColor }}
                        ></div>
                        <div 
                          className="absolute bottom-4 left-4 w-24 h-2 rounded-full opacity-15"
                          style={{ backgroundColor: project.color }}
                        ></div>
                        <div 
                          className="absolute bottom-4 right-4 w-12 h-2 rounded-full opacity-10"
                          style={{ backgroundColor: project.accentColor }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Tech stack badges floating around */}
                  {project.tags.slice(0, 3).map((tag, tagIndex) => (
                    <div
                      key={tagIndex}
                      className={`absolute bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium shadow-lg transition-all duration-300 hover:scale-110 ${
                        tagIndex === 0 ? 'top-4 -right-4' : 
                        tagIndex === 1 ? 'bottom-8 -left-4' : 
                        'top-1/2 -right-8'
                      }`}
                      style={{ 
                        color: project.color,
                        borderColor: hoveredProject === project.id ? project.color : undefined
                      }}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="lg:w-1/2 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ 
                        backgroundColor: `${project.color}15`,
                        color: project.color 
                      }}
                    >
                      Project {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 font-display">
                    {project.title}
                  </h3>
                  
                  <h4 className="text-xl lg:text-2xl font-light text-gray-700">
                    {project.subtitle}
                  </h4>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed font-light">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="space-y-3">
                  <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Technology Stack
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all duration-200 hover:scale-105"
                        style={{ 
                          backgroundColor: hoveredProject === project.id ? `${project.color}10` : 'white',
                          borderColor: project.color,
                          color: project.color
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <button 
                    className="group inline-flex items-center gap-3 px-8 py-4 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                    style={{ 
                      backgroundColor: project.color,
                      boxShadow: `0 8px 25px ${project.color}40`
                    }}
                  >
                    <span>Launch {project.title}</span>
                    <svg 
                      className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Footer */}
        <div className="mt-24 text-center">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Build Something Amazing?</h3>
            <p className="text-gray-600 mb-6">
              Let's discuss your next project and bring your ideas to life with cutting-edge technology.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridGallerySection;