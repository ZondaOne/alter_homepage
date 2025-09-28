"use client";
import React, { useEffect, useRef, useState } from "react";

interface SoftwareLogoProps {
  path?: string;
  scale?: number;

}

export default function SoftwareLogo({ path = "/Software.lottie", scale = 1 }: SoftwareLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadLottie = async () => {
      try {
        setIsLoading(true);

        // Importar las librerías necesarias
        const [lottie, JSZip] = await Promise.all([
          import("lottie-web"),
          import("jszip")
        ]);

        if (!isMounted || !containerRef.current) return;

        // Cargar el archivo .lottie como arrayBuffer
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        
        // Descomprimir el archivo .lottie
        const zip = new JSZip.default();
        const zipContent = await zip.loadAsync(arrayBuffer);
        
        // Primero intentar con el formato DotLottie nuevo
        let animationFile = zipContent.file("animations/data.json");
        
        // Si no encuentra, buscar el archivo Software.json
        if (!animationFile) {
          animationFile = zipContent.file("Software.json");
        }
        
        // Si no encuentra, buscar animation.json como fallback
        if (!animationFile) {
          animationFile = zipContent.file("animation.json");
        }
        
        // Si aún no encuentra, buscar cualquier archivo JSON que no sea manifest
        if (!animationFile) {
          const jsonFiles = Object.keys(zipContent.files).filter(name => 
            name.endsWith('.json') && !name.includes('manifest')
          );
   
          
          if (jsonFiles.length > 0) {
            animationFile = zipContent.file(jsonFiles[0]);
            
          }
        }
        
        if (!animationFile) {
          throw new Error(`No se encontró archivo de animación en .lottie. Archivos disponibles: ${Object.keys(zipContent.files).join(', ')}`);
        }

        // Extraer y parsear el JSON
        const animationJson = await animationFile.async("text");
       
        
        const animationData = JSON.parse(animationJson);
       

        // Validar que el JSON tiene la estructura correcta de Lottie
        if (!animationData || typeof animationData !== 'object') {
          throw new Error('Invalid animation data: not an object');
        }

        if (!animationData.layers || !Array.isArray(animationData.layers)) {
          throw new Error('Invalid animation data: missing or invalid layers');
        }

        if (!isMounted || !containerRef.current) return;

        // Limpiar contenedor
        containerRef.current.innerHTML = '';

        // Crear la animación con lottie-web usando animationData
        const animation = lottie.default.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
            progressiveLoad: true,
            hideOnTransparent: true,
            className: 'lottie-svg' // Para poder aplicar CSS optimizaciones
          }
        });

        // Eventos
        animation.addEventListener('DOMLoaded', () => {
          if (isMounted) {
            setIsLoading(false);
            
            // Optimizar el SVG una vez cargado
            const svgElement = containerRef.current?.querySelector('svg');
            if (svgElement) {
              svgElement.style.shapeRendering = 'geometricPrecision';
              svgElement.style.textRendering = 'geometricPrecision';
              svgElement.style.imageRendering = 'optimizeQuality';
            }
          }
        });

        animation.addEventListener('data_ready', () => {
          if (isMounted) {
            setIsLoading(false);
          }
        });

        // Cleanup
        return () => {
          if (animation) {
            animation.destroy();
          }
        };

      } catch (error) {
        console.error('Error loading .lottie file:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadLottie();

    return () => {
      isMounted = false;
    };
  }, [path, scale]);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      {isLoading && (
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-8 h-8 border-2 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
        </div>
      )}
      <div 
        ref={containerRef} 
        className={`${isLoading ? 'hidden' : 'block'} w-full h-full`}
        style={{ 
          width: `${600 * scale}px`, 
          height: `${600 * scale}px`,
          maxWidth: '100%',
          maxHeight: '100%'
        }}
      />
    </div>
  );
}