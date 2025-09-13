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
        <GradientSection />
         <GridGallerySection />
        
      </main>
    </>
  );
}
