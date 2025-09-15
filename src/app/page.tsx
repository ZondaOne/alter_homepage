"use client";

import Hero from "./components/Hero";
import InteractiveBlobsSection from "./components/InteractiveBlobsSection";
import GradientSection from "./components/GradientSection";
import GridGallerySection from './components/GridGallerySection';
import MacBookSection from './components/MacBookSection';
import ScrollZoom from './components/SimpleParallax';
import SimpleParallax from "simple-parallax-js";

export default function HomePage() {
  return (
    <>
      <Hero />
      <InteractiveBlobsSection />
      <main className="relative z-10">

         {/* Imagen horizontal justo debajo de GradientSection */}
 
          <div className="hidden md:block">
            <ScrollZoom>
  <SimpleParallax scale={1.2}  transition="transform 0.1s linear">
    <img
      src="/banner.png"
      alt="Imagen horizontal"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </SimpleParallax>
  </ScrollZoom>
</div>

        
          {/* Gradient Section */}
        <GradientSection />

       

        {/* Grid Gallery */}
        <GridGallerySection />

        {/* MacBook Section */}
        <MacBookSection />
      </main>
    </>
  );
}
