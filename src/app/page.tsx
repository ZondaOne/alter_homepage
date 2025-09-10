import Hero from "./components/Hero";
import GradientSection from "./components/GradientSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <main className="relative z-10">
        <GradientSection />
      </main>
    </>
  );
}
