'use client';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, ArrowRight, Globe, Zap, Users, Shield } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  tags: string[];
  color: string;
  accentColor: string;
  image?: string;
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
      accentColor: "#fb923c",
      image: "https://i.imgur.com/JT2A7mZ.png"
    },
    {
      id: 2,
      title: "Comerzia", 
      subtitle: "Smart business management platform",
      description: "Complete business management solution for handling clients and orders. Features dashboard analytics and automated customer notifications.",
      url: "comerzia.zonda.one",
      tags: ["Business", "Analytics", "CRM", "Automation"],
      color: "#ea580c",
      accentColor: "#f97316",
      image: "https://i.imgur.com/U2UveIV.png" 
    },
    {
      id: 3,
      title: "ComChat",
      subtitle: "Custom AI chatbot for businesses", 
      description: "Intelligent chatbot that learns from your data. Supports text and multimodal conversations with privacy-focused local deployment.",
      url: "comchat.zonda.one",
      tags: ["AI", "Chatbot", "NLP", "Privacy"],
      color: "#fb923c",
      accentColor: "#ea580c",
      image: "https://i.imgur.com/FTmgxYV.png"
    }
  ];

  const getProjectIcon = (tags: string[]) => {
    if (tags.includes("AI")) return <Zap className="w-5 h-5" />;
    if (tags.includes("Business")) return <Users className="w-5 h-5" />;
    if (tags.includes("Privacy")) return <Shield className="w-5 h-5" />;
    return <Globe className="w-5 h-5" />;
  };

  return (
    <div className="relative w-full py-20 md:py-32 px-5 md:px-8 overflow-hidden bg-gray-50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #f97316 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #ea580c 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-20 text-center max-w-4xl mx-auto">
       
          
           
          
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.9] tracking-tight text-gray-900 mb-8 font-display">
            {mounted && ready ? t("galleryTitleLine1") : "Our latest"}{' '}
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 bg-clip-text text-transparent">
              {mounted && ready ? t("galleryTitleHighlight") : "programs"}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            {mounted && ready ? t("gallerySubtitle") : "Explore our portfolio of web applications that solve real problems with elegant design and powerful technology."}
          </p>
        </div>

        {/* Products Grid */}
        <div className="space-y-20">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Background accent */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                   style={{ 
                     background: `linear-gradient(135deg, ${project.color}08 0%, transparent 50%)`,
                   }} />
              
              <div className={`relative flex flex-col xl:flex-row items-center gap-12 xl:gap-16 ${index % 2 === 1 ? 'xl:flex-row-reverse' : ''}`}>
                
                {/* Enhanced Image Container */}
                <div className="xl:w-7/12 relative">
                  <div className="relative group/image">
                    {/* Main image container with professional styling */}
                    <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100 transform transition-all duration-700 group-hover:shadow-3xl"
                         style={{ 
                           boxShadow: hoveredProject === project.id 
                             ? `0 25px 50px -12px ${project.color}25, 0 0 0 1px ${project.color}15`
                             : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                         }}>
                      
                      {/* Image with overlay effects */}
                      <div className="relative">
                        {project.image ? (
                          <>
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-80 lg:h-96 object-cover transition-all duration-700 group-hover/image:scale-105"
                            />
                            {/* Subtle overlay for better text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
                          </>
                        ) : (
                          <div
                            className="w-full h-80 lg:h-96 flex items-center justify-center text-white text-6xl font-bold transition-all duration-700 group-hover/image:scale-105"
                            style={{ backgroundColor: project.color }}
                          >
                            {project.title.substring(0, 2)}
                          </div>
                        )}

                      </div>
                      
                      {/* Enhanced URL Card - positioned outside image */}
                    </div>
                    
                    {/* Professional URL presentation */}
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group/url">
                          <div className="flex-shrink-0">
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${project.color}15` }}
                            >
                              <Globe className="w-5 h-5" style={{ color: project.color }} />
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-500 mb-1">Live Application</p>
                            <a
                              href={`https://${project.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors duration-200 flex items-center gap-2 group/link"
                            >
                              <span className="truncate">{project.url}</span>
                              <ExternalLink className="w-4 h-4 opacity-0 group-hover/url:opacity-100 group-hover/link:translate-x-1 transition-all duration-200" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Content Section */}
                <div className="xl:w-5/12 space-y-8">
                  {/* Project badge and tags */}
                  <div className="space-y-4">
            
                  
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full border border-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Title and subtitle */}
                  <div className="space-y-4">
                    <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 font-display leading-tight">
                      {project.title}
                    </h3>
                    <h4 className="text-xl lg:text-2xl font-light text-gray-700 leading-relaxed">
                      {project.subtitle}
                    </h4>
                  </div>
                  
                  {/* Description */}
                  <p className="text-lg text-gray-600 leading-relaxed font-light">
                    {project.description}
                  </p>

                  {/* Enhanced CTA Button */}
                  <div className="pt-4">
                    <button 
                      className="group/button relative inline-flex items-center gap-3 px-8 py-4 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
                      style={{ 
                        backgroundColor: project.color,
                        boxShadow: `0 10px 30px ${project.color}40`
                      }}
                    >
                      {/* Button background animation */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(45deg, ${project.color}, ${project.accentColor})`
                        }}
                      />
                      
                      <span className="relative z-10">Launch {project.title}</span>
                      <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover/button:translate-x-1" />
                      
                      {/* Subtle shine effect */}
                      <div className="absolute inset-0 opacity-0 group-hover/button:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover/button:translate-x-[-200%] transition-transform duration-1000" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Footer CTA */}
        <div className="mt-32">
          <div className="relative">
            {/* Background with subtle pattern */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-200"></div>
            <div className="absolute inset-0 rounded-3xl" style={{
              backgroundImage: `radial-gradient(circle at 30% 20%, ${projects[0].color}08 0%, transparent 50%),
                               radial-gradient(circle at 70% 80%, ${projects[1].color}08 0%, transparent 50%)`
            }}></div>
            
            <div className="relative p-12 text-center max-w-3xl mx-auto">
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
                <Zap className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">Ready to Innovate</span>
              </div>
              
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-display">
                Ready to Build Something Amazing?
              </h3>
              <p className="text-xl text-gray-600 mb-8 font-light leading-relaxed">
                Let's discuss your next project and bring your ideas to life with cutting-edge technology.
              </p>
              
              <button className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden">
                <span className="relative z-10">Start Your Project</span>
                <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
                
                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridGallerySection;