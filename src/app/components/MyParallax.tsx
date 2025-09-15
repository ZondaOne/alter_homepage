import React, { useState, useEffect, useRef } from "react";

interface MyParallaxProps {
  scale?: number;
  minScale?: number;
  transition?: string;
  children?: React.ReactNode;
  text?: React.ReactNode;
}

const MyParallax: React.FC<MyParallaxProps> = ({
  scale = 1,
  minScale = 0.7,
  transition = "transform 0.5s ease-out",
  children,
  text,
}) => {
  const [currentScale, setCurrentScale] = useState(scale);
  const [imageTransform, setImageTransform] = useState({ x: 0, width: 100 });
  const [textOpacity, setTextOpacity] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = containerRef.current.offsetHeight;

      // Calculate scroll progress
      let scrollProgress = 0;
      
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        // Element is visible
        if (rect.top <= 0) {
          // Element is being scrolled through
          const visibleTop = Math.abs(rect.top);
          scrollProgress = Math.min(1, visibleTop / (elementHeight - windowHeight));
        }
      } else if (rect.bottom < 0) {
        // Element has passed
        scrollProgress = 1;
      }

      // Image scaling
      const newScale = Math.max(minScale, scale - scrollProgress * (scale - minScale));
      setCurrentScale(newScale);

      // Image positioning and width
      // Starts at good size to avoid pixelation, ends with good positioning
      const maxXTranslate = -25; // Less movement, not too close to edge
      const initialWidth = 85; // Start at 85vw - good size without pixelation
      const minWidth = 55; // Final size bigger and not too close to edge
      
      const newX = scrollProgress * maxXTranslate;
      const newWidth = initialWidth - (scrollProgress * (initialWidth - minWidth));
      
      setImageTransform({ 
        x: newX, 
        width: newWidth 
      });

      // Text appears earlier and more gradually
      const textStartPoint = 0.2; // Text starts appearing earlier (at 20% instead of 30%)
      const textProgress = Math.max(0, Math.min(1, (scrollProgress - textStartPoint) / (1 - textStartPoint)));
      setTextOpacity(textProgress);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Execute once on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [scale, minScale]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
    >
      {/* Image Container - starts full width center, moves left and shrinks */}
      <div className="relative w-full min-h-screen flex items-center justify-center overflow-visible">
        <div
          className="relative transition-all duration-500 ease-out max-w-none"
          style={{
            transform: `scale(${currentScale}) translateX(${imageTransform.x}vw)`,
            width: `${imageTransform.width}vw`,
            transformOrigin: "center center",
          }}
        >
          <div className="w-full h-auto">
            {children}
          </div>
        </div>

        {/* Text Content - positioned further right to prevent overlapping */}
        <div 
          className="absolute right-0 top-0 w-1/2 h-full flex items-center justify-end pr-8 lg:pr-16"
          style={{
            opacity: textOpacity,
            transform: `translateX(${(1 - textOpacity) * 100}px)`,
            transition: "opacity 0.10s ease-out, transform 0.10s ease-out",
          }}
        >
          <div className="max-w-lg text-right">
            {text && (
              <div className="space-y-6">
                {text}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyParallax;