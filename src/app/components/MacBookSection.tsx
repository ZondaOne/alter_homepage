'use client';

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// --- Data for products ---
const products = [
  {
    image: "/bg.png",
    title: "PixelPerfect",
    description:
      "Advanced image editing with background removal, upscaling, and content generation. Precision and ease combined in one powerful platform.",
  },
  {
    image: "/bg2.png",
    title: "Comerzia",
    description:
      "Complete business management solution for handling clients and orders. Features dashboard analytics and automated customer notifications.",
  },
  {
    image: "/bg3.png",
    title: "ComChat",
    description:
      "Intelligent chatbot that learns from your data. Supports text and multimodal conversations with privacy-focused local deployment.",
  },
];

// --- Constants ---
const FLIP_LERP_FACTOR = 4.5;
const SWAP_IMAGE_DELAY = 100;
const TOTAL_FLIP_DURATION = 1000;

// --- BackgroundPlane ---
const BackgroundPlane = ({ product }: { product: typeof products[0] }) => {
  const ref = useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    switch (product.title) {
      case "PixelPerfect":
        return new THREE.MeshBasicMaterial({ color: "#83a7ea" }); 
      case "Comerzia":
        return new THREE.MeshBasicMaterial({ color: "#f7971e" }); 
      case "ComChat":
       return new THREE.MeshBasicMaterial({ color: "#dedede" }); 
      default:
        return new THREE.MeshBasicMaterial({ color: "black" });
    }
  }, [product]);

  return (
    <mesh ref={ref} position={[0, 0, -50]} scale={[300, 200, 1]}>
      <planeGeometry args={[1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

// --- MacContainer ---
const MacContainer = ({
  currentImage,
  isFlipping,
  scrollProgress,
  flipDirection,
}: {
  currentImage: string;
  isFlipping: boolean;
  scrollProgress: number;
  flipDirection: number;
}) => {
  const model = useGLTF("./models/mac.glb");
  const textures = useTexture(products.map((p) => p.image));

  const screenRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const meshesRef = useRef<any>({});

  const targetRotationY = useRef(0);
  const currentRotationY = useRef(0);
  const targetScreenRotation = useRef(0);
  const currentScreenRotation = useRef(0);

  useEffect(() => {
    if (isFlipping) targetRotationY.current += Math.PI * 2 * flipDirection;
  }, [isFlipping, flipDirection]);

  const meshes = useMemo(() => {
    const meshMap: any = {};
    model.scene.traverse((e: any) => {
      meshMap[e.name] = e;
      if (e.material) e.frustumCulled = false;
    });
    meshesRef.current = meshMap;
    return meshMap;
  }, [model.scene]);

  useEffect(() => {
    if (!meshes.matte) return;
    const material = meshes.matte.material;
    material.color = new THREE.Color(0xffffff);
    material.emissiveIntensity = 0;
    material.metalness = 0;
    material.roughness = 1;

    const index = products.findIndex((p) => p.image === currentImage);
    if (textures[index]) material.map = textures[index];
    material.needsUpdate = true;
  }, [meshes, textures]);

  useEffect(() => {
    if (!meshes.matte) return;
    const material = meshes.matte.material;
    const index = products.findIndex((p) => p.image === currentImage);
    if (textures[index]) material.map = textures[index];
  }, [currentImage, meshes, textures]);

  useEffect(() => {
    if (meshes.screen) {
      meshes.screen.rotation.x = THREE.MathUtils.degToRad(180);
      screenRef.current = meshes.screen;
    }
  }, [meshes]);

  useFrame((_, delta) => {
    const deltaMultiplier = Math.min(delta * 60, 2);

    if (screenRef.current) {
      const clamped = Math.max(0, Math.min(1, scrollProgress));
      targetScreenRotation.current = THREE.MathUtils.degToRad(180 - clamped * 90);
      currentScreenRotation.current = THREE.MathUtils.lerp(
        currentScreenRotation.current,
        targetScreenRotation.current,
        deltaMultiplier * 0.1
      );
      screenRef.current.rotation.x = currentScreenRotation.current;
    }

    if (groupRef.current) {
      const lerpFactor = Math.min(1, deltaMultiplier * (FLIP_LERP_FACTOR / 60));
      currentRotationY.current = THREE.MathUtils.lerp(
        currentRotationY.current,
        targetRotationY.current,
        lerpFactor
      );
      groupRef.current.rotation.y = currentRotationY.current;
    }
  });

  return (
    <group position={[-2, -14, 20]} scale={0.9}>
      <group ref={groupRef}>
        <primitive object={model.scene} />
      </group>
    </group>
  );
};

// --- MacBookCanvas ---
const MacBookCanvas = ({
  currentProduct,
  isFlipping,
  scrollProgress,
  flipDirection,
}: {
  currentProduct: typeof products[0];
  isFlipping: boolean;
  scrollProgress: number;
  flipDirection: number;
}) => (
  <Canvas
    camera={{ fov: 12, position: [0, -10, 220] }}
    dpr={[1, 2]}
    performance={{ min: 0.5 }}
    gl={{ antialias: true, alpha: false, powerPreference: "high-performance", precision: "highp" }}
    frameloop="always"
  >
    <Suspense fallback={null}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2.2} />
      <directionalLight position={[-10, 5, 5]} intensity={1.4} />
      <pointLight position={[0, 0, 10]} intensity={0.4} />

      {/* Fondo sólido según producto */}
      <BackgroundPlane product={currentProduct} />

      {/* MacBook */}
      <MacContainer
        currentImage={currentProduct.image}
        isFlipping={isFlipping}
        scrollProgress={scrollProgress}
        flipDirection={flipDirection}
      />
    </Suspense>
  </Canvas>
);

// --- LoadingSpinner ---
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
      <p className="text-white text-sm mt-4 text-center">Loading ...</p>
    </div>
  </div>
);

// --- ProductInfo ---
const ProductInfo = ({
  product,
  onNext,
  onPrev,
  isFlipping,
  isVisible,
}: {
  product: typeof products[0];
  onNext: () => void;
  onPrev: () => void;
  isFlipping: boolean;
  isVisible: boolean;
}) => (
  <div className="w-full h-full flex flex-col justify-center items-start p-8 md:p-16 relative overflow-hidden">
    <div
      className={`transform transition-all duration-700 ease-out ${
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
      }`}
      style={{ transitionDelay: isVisible ? "100ms" : "0ms" }}
    >
      <h1
        className={`text-4xl md:text-6xl font-bold mb-4 transform transition-all duration-500 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
      >
        {product.title}
      </h1>
      <p
        className={`text-md md:text-lg text-gray-300 max-w-md transform transition-all duration-500 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ transitionDelay: isVisible ? "350ms" : "0ms" }}
      >
        {product.description}
      </p>
    </div>

    <div
      className={`absolute bottom-10 left-1/2 md:left-16 -translate-x-1/2 md:-translate-x-0 flex gap-4 transform transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
      }`}
      style={{ transitionDelay: isVisible ? "800ms" : "0ms" }}
    >
      <button
        onClick={onPrev}
        disabled={isFlipping}
        className={`z-10 transition-all duration-500 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed transform ${
          isFlipping ? "scale-90 opacity-60" : "scale-100 opacity-100"
        }`}
        style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.3))" }}
      >
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="text-white transition-transform duration-300">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        onClick={onNext}
        disabled={isFlipping}
        className={`z-10 transition-all duration-500 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed transform ${
          isFlipping ? "scale-90 opacity-60" : "scale-100 opacity-100"
        }`}
        style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.3))" }}
      >
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="text-white transition-transform duration-300">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  </div>
);

// --- Main Component ---
const MacBookSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [contentVisible, setContentVisible] = useState(true);
  const [flipDirection, setFlipDirection] = useState(1);

  const currentProduct = products[currentIndex];

  const handleChange = (nextIndex: number, direction: number) => {
    if (isFlipping) return;
    setFlipDirection(direction);
    setIsFlipping(true);
    setContentVisible(false);
    setTimeout(() => setCurrentIndex(nextIndex), SWAP_IMAGE_DELAY);
    setTimeout(() => setContentVisible(true), SWAP_IMAGE_DELAY + 100);
    setTimeout(() => setIsFlipping(false), TOTAL_FLIP_DURATION);
  };

  const next = () => handleChange((currentIndex + 1) % products.length, 1);
  const prev = () => handleChange((currentIndex - 1 + products.length) % products.length, -1);

  // Scroll progress
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          const rect = sectionRef.current.getBoundingClientRect();
          const sectionHeight = sectionRef.current.offsetHeight;
          const windowHeight = window.innerHeight;
          let progress = 0;
          if (rect.top <= 0 && rect.bottom >= windowHeight) {
            progress = Math.abs(rect.top) / (sectionHeight - windowHeight);
          } else if (rect.top > 0) progress = 0;
          else if (rect.bottom < windowHeight) progress = 1;
          setScrollProgress(Math.max(0, Math.min(1, progress)));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Preload assets
  useEffect(() => {
    const timer = setTimeout(() => {
      useGLTF.preload("./models/mac.glb");
      products.forEach((p) => useTexture.preload(p.image));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Intersection observer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldRender) {
            setShouldRender(true);
            setTimeout(() => setContentVisible(true), 200);
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px 0px 50px 0px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div
      ref={sectionRef}
      className="hidden md:flex w-full relative bg-black text-white"
      style={{ height: "180vh", scrollSnapAlign: "start", scrollSnapStop: "always" }}
    >
      <div className="sticky top-0 w-full h-screen flex">
        <div className="w-full md:w-2/5 h-full">
          {shouldRender && (
            <ProductInfo
              product={currentProduct}
              onNext={next}
              onPrev={prev}
              isFlipping={isFlipping}
              isVisible={contentVisible}
            />
          )}
        </div>

        <div className="w-full md:w-3/5 h-full">
          {shouldRender ? (
            <Suspense fallback={<LoadingSpinner />}>
              <MacBookCanvas
                currentProduct={currentProduct}
                isFlipping={isFlipping}
                scrollProgress={scrollProgress}
                flipDirection={flipDirection}
              />
            </Suspense>
          ) 
            
: (<LoadingSpinner />)}
        </div>
      </div>
    </div>
  );
};

export default MacBookSection;
