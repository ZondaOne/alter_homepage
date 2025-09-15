import React, { useState, useEffect, useRef } from "react";

interface MyParallaxProps {
  scale?: number;
  minScale?: number;
  children?: React.ReactNode;
  text?: React.ReactNode;
  preStartOffset?: number; // nuevo: cuánto antes empieza la animación en px
}

const MyParallax: React.FC<MyParallaxProps> = ({
  scale = 1,
  minScale = 0.7,
  children,
  text,
  preStartOffset = 150, // empieza 150px antes de llegar a la nav
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

      // scrollProgress con preStartOffset
      let scrollProgress = 0;
      const adjustedTop = rect.top - preStartOffset;

      if (adjustedTop <= windowHeight && rect.bottom >= 0) {
        if (adjustedTop <= 0) {
          const visibleTop = Math.abs(adjustedTop);
          scrollProgress = Math.min(1, visibleTop / (elementHeight - windowHeight));
        }
      } else if (rect.bottom < 0) {
        scrollProgress = 1;
      }

      // --- Escalado rápido antes de mover ---
      const scaleProgress = Math.min(1, scrollProgress * 1.5);
      const newScale = Math.max(minScale, scale - scaleProgress * (scale - minScale));
      setCurrentScale(newScale);

      // --- Posición y ancho después ---
      const moveProgress = Math.max(0, scrollProgress - 0.15);
      const maxXTranslate = -25;
      const initialWidth = 85;
      const minWidth = 55;
      const newX = moveProgress * maxXTranslate;
      const newWidth = initialWidth - moveProgress * (initialWidth - minWidth);
      setImageTransform({ x: newX, width: newWidth });

      // --- Texto aparece más tarde ---
      const textStartPoint = 0.25;
      const textProgress = Math.max(
        0,
        Math.min(1, (scrollProgress - textStartPoint) / (1 - textStartPoint))
      );
      setTextOpacity(textProgress);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [scale, minScale, preStartOffset]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-white">
      <div className="relative w-full min-h-screen flex items-center justify-center overflow-visible">
        <div
          className="relative transition-all duration-500 ease-out max-w-none"
          style={{
            transform: `scale(${currentScale}) translateX(${imageTransform.x}vw)`,
            width: `${imageTransform.width}vw`,
            transformOrigin: "center center",
          }}
        >
          <div className="w-full h-auto">{children}</div>
        </div>

        <div
          className="absolute right-0 top-0 w-1/2 h-full flex items-center justify-end pr-8 lg:pr-16"
          style={{
            opacity: textOpacity,
            transform: `translateX(${(1 - textOpacity) * 100}px)`,
            transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
          }}
        >
          <div className="max-w-lg text-right">{text && <div className="space-y-6">{text}</div>}</div>
        </div>
      </div>
    </div>
  );
};

export default MyParallax;
