import Hero from "./components/Hero";
import GradientSection from "./components/GradientSection";
import GridGallerySection from './components/GridGallerySection';


export default function HomePage() {
  return (
    <>
      <Hero />
      <main className="relative z-10">
        <GradientSection />
         <GridGallerySection />
        
      </main>
    </>
  );
}
