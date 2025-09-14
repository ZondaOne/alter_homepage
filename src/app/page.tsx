import Hero from "./components/Hero";
import InteractiveBlobsSection from "./components/InteractiveBlobsSection";
import GradientSection from "./components/GradientSection";
import GridGallerySection from './components/GridGallerySection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <InteractiveBlobsSection />
      <main className="relative z-10">

         {/* Imagen horizontal justo debajo de GradientSection */}
        <div className="w-full mt-8">
          <img
            src="https://i.imgur.com/pKFQ8vg.png"
            alt="Imagen horizontal"
            className="w-full h-auto object-cover"
          />
        </div>
        {/* Gradient Section */}
        <GradientSection />

       

        {/* Grid Gallery */}
        <GridGallerySection />
      </main>
    </>
  );
}
