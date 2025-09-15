import React, { useState, useEffect, useRef } from "react";

interface SimpleParallaxProps {
  scale?: number;       // escala máxima
  minScale?: number;    // escala mínima (tamaño inicial)
  transition?: string;  // transición del zoom
  children?: React.ReactNode;
}

const SimpleParallax: React.FC<SimpleParallaxProps> = ({
  scale = 1.1,         // menor escala máxima para evitar zoom exagerado
  minScale = 0.1,      // empieza pequeña
  transition = "transform 0.2s ease-out", // transición más suave
  children,
}) => {
  const [currentScale, setCurrentScale] = useState(minScale);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Cuánto de la sección está visible (0 a 1)
      let scrollFraction = 1 - rect.top / windowHeight;
      scrollFraction = Math.max(0, Math.min(1, scrollFraction));

      // Escala interpolada entre minScale y scale
      const newScale = minScale + scrollFraction * (scale - minScale);
      setCurrentScale(newScale);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // inicial

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [minScale, scale]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          transform: `scale(${currentScale})`,
          transition: transition,
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default SimpleParallax;
