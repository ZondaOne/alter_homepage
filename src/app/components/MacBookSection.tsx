'use client';

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useTranslation } from "react-i18next";

// --- Data for products ---
const getProducts = (t: any) => [
  {
    image: "/bg.png",
    title: t('macbook.products.pixelperfect.title'),
    description: t('macbook.products.pixelperfect.description'),
    key: 'pixelperfect'
  },
  {
    image: "/bg2.png",
    title: t('macbook.products.comerzia.title'),
    description: t('macbook.products.comerzia.description'),
    key: 'comerzia'
  },
  {
    image: "/bg3.png",
    title: t('macbook.products.comchat.title'),
    description: t('macbook.products.comchat.description'),
    key: 'comchat'
  },
];

// --- Constants ---
const FLIP_LERP_FACTOR = 2.9;
const SWAP_IMAGE_DELAY = 100;
const TOTAL_FLIP_DURATION = 1000;

// --- BackgroundPlane ---
const BackgroundPlane = ({ product }: { product: any }) => {
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
  const textures = useTexture(["/bg.png", "/bg2.png", "/bg3.png"]);

  const screenRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const meshesRef = useRef<any>({});
  const screenMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);

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

    // Create (once) an unlit material so the screen image isn't affected by lights or tone mapping
    if (!screenMaterialRef.current) {
      screenMaterialRef.current = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        toneMapped: false,
        side: THREE.DoubleSide,
      });
    }

    const material = screenMaterialRef.current;

    // Choose the texture based on current image and ensure correct color space/orientation
    const imageMap: { [key: string]: number } = { "/bg.png": 0, "/bg2.png": 1, "/bg3.png": 2 };
    const index = imageMap[currentImage] ?? 0;
    const tex = textures[index];

    if (tex) {
      // Make sure UI textures render with their intended colors
      tex.colorSpace = THREE.SRGBColorSpace;
      // This mesh's UVs expect the default orientation
      tex.flipY = true;
      tex.needsUpdate = true;

      material.map = tex;
      material.needsUpdate = true;
    }

    // Assign our custom material to the screen mesh
    if ((meshes.matte as THREE.Mesh).material !== material) {
      (meshes.matte as THREE.Mesh).material = material;
    }
  }, [meshes, textures, currentImage]);

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
    <group position={[-2, -14, 20]} scale={1.0}>
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
  currentProduct: any;
  isFlipping: boolean;
  scrollProgress: number;
  flipDirection: number;
}) => (
  <Canvas
    camera={{ fov: 12, position: [0, -10, 220] }}
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
  product: any;
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
        className={`text-md md:text-lg text-gray-300 max-w-md mb-8 transform transition-all duration-500 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ transitionDelay: isVisible ? "350ms" : "0ms" }}
      >
        {product.description}
      </p>

      {/* Launch Button */}
      <div
        className={`transform transition-all duration-500 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ transitionDelay: isVisible ? "500ms" : "0ms" }}
      >
        <a
          href={`https://${product.title.toLowerCase()}.zonda.one`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-8 py-4 text-black font-medium text-lg rounded-lg transition-all duration-300 ease-out bg-white hover:bg-gray-100 hover:scale-[1.02]"
        >
          <span className="relative z-10">Launch {product.title}</span>
          <svg
            className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
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
  const { t, ready } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [contentVisible, setContentVisible] = useState(true);
  const [flipDirection, setFlipDirection] = useState(1);

  const products = useMemo(() => mounted && ready ? getProducts(t) : [], [t, mounted, ready]);
  const currentProduct = products[currentIndex] || null;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (nextIndex: number, direction: number) => {
    if (isFlipping || !products.length) return;
    setFlipDirection(direction);
    setIsFlipping(true);
    setContentVisible(false);
    setTimeout(() => setCurrentIndex(nextIndex), SWAP_IMAGE_DELAY);
    setTimeout(() => setContentVisible(true), SWAP_IMAGE_DELAY + 100);
    setTimeout(() => setIsFlipping(false), TOTAL_FLIP_DURATION);
  };

  const next = () => products.length && handleChange((currentIndex + 1) % products.length, 1);
  const prev = () => products.length && handleChange((currentIndex - 1 + products.length) % products.length, -1);

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
      useTexture.preload("/bg.png");
      useTexture.preload("/bg2.png");
      useTexture.preload("/bg3.png");
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
      id="macbook-section"
      ref={sectionRef}
      className="hidden md:flex w-full relative bg-black text-white"
      style={{ height: "180vh", scrollSnapAlign: "start", scrollSnapStop: "always" }}
    >
      <div className="sticky top-0 w-full h-screen flex">
        <div className="w-full md:w-2/5 h-full">
          {shouldRender && currentProduct && (
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
          {shouldRender && currentProduct ? (
            <Suspense fallback={<LoadingSpinner />}>
              <MacBookCanvas
                currentProduct={currentProduct}
                isFlipping={isFlipping}
                scrollProgress={scrollProgress}
                flipDirection={flipDirection}
              />
            </Suspense>
          ) : (<LoadingSpinner />)}
        </div>
      </div>
    </div>
  );
};

export default MacBookSection;
