"use client";

import Hero from "./components/Hero";
import InteractiveBlobsSection from "./components/InteractiveBlobsSection";
import GradientSection from "./components/GradientSection";
import GridGallerySection from './components/GridGallerySection';
import MacBookSection from './components/MacBookSection';
import SimpleParallax from "simple-parallax-js";

export default function HomePage() {
  return (
    <>
      <Hero />
      <InteractiveBlobsSection />
      <main className="relative z-10">

         {/* Imagen horizontal justo debajo de GradientSection */}
 
          <SimpleParallax>
          <img
            src="/banner.png"
            alt="Imagen horizontal"
            className="w-full h-300 object-cover"
          />
          </SimpleParallax>
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
