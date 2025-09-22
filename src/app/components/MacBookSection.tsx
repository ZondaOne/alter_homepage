'use client';

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState, memo, useCallback } from "react";
import * as THREE from "three";
import { useTranslation } from "react-i18next";

// --- Data for products ---
const getProducts = (t: (key: string) => string) => [
 
  {
    image: "/bg2.png",
    title: t('macbook.products.comerzia.title'),
    description: t('macbook.products.comerzia.description'),
    key: 'comerzia'
  },
   {
    image: "/bg.png",
    title: t('macbook.products.pixelperfect.title'),
    description: t('macbook.products.pixelperfect.description'),
    key: 'pixelperfect'
  },
  {
    image: "/bg3.png",
    title: t('macbook.products.comchat.title'),
    description: t('macbook.products.comchat.description'),
    key: 'comchat'
  },
];

// --- Constants ---
const FLIP_LERP_FACTOR = 4.5;
const SWAP_IMAGE_DELAY = 400;
const TOTAL_FLIP_DURATION = 1000;

// Shared geometries for performance
const SHARED_PLANE_GEOMETRY = new THREE.PlaneGeometry(1, 1);

// Pre-created materials to avoid recreation
const BACKGROUND_MATERIALS = {
  pixelperfect: new THREE.MeshBasicMaterial({ color: "#83a7ea" }),
  comerzia: new THREE.MeshBasicMaterial({ color: "#fe7b3e" }),
  comchat: new THREE.MeshBasicMaterial({ color: "#dedede" }),
  default: new THREE.MeshBasicMaterial({ color: "black" })
};

// --- BackgroundPlane ---
const BackgroundPlane = memo(({ product }: { product: { key: string; image: string; title: string; description: string } }) => {
  const material = BACKGROUND_MATERIALS[product.key as keyof typeof BACKGROUND_MATERIALS] || BACKGROUND_MATERIALS.default;

  return (
    <>
      <mesh position={[0, 0, -50]} scale={[300, 200, 1]}>
        <primitive object={SHARED_PLANE_GEOMETRY} attach="geometry" />
        <primitive object={material} attach="material" />
      </mesh>
      {/* ZONDA Text */}
      <mesh position={[0, 0, -49]}>
        <planeGeometry args={[200, 50]} />
        <meshBasicMaterial transparent opacity={0.1}>
          <canvasTexture 
            attach="map" 
            args={[(() => {
              const canvas = document.createElement('canvas');
              canvas.width = 2048;
              canvas.height = 512;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.fillStyle = '#000000ff';
                ctx.font = '100px AwareBold';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('ZONDA', canvas.width / 2, canvas.height / 2);
              }
              return canvas;
            })()]}
          />
        </meshBasicMaterial>
      </mesh>
    </>
  );
});
BackgroundPlane.displayName = 'BackgroundPlane';

// --- MacContainer ---
const MacContainer = memo(({
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
  const meshesRef = useRef<Record<string, THREE.Object3D>>({});
  const screenMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);

  const targetRotationY = useRef(0);
  const currentRotationY = useRef(0);
  const targetScreenRotation = useRef(0);
  const currentScreenRotation = useRef(0);

  useEffect(() => {
    if (isFlipping) targetRotationY.current += Math.PI * 2 * flipDirection;
  }, [isFlipping, flipDirection]);

  const meshes = useMemo(() => {
    const meshMap: Record<string, THREE.Object3D> = {};
    model.scene.traverse((e: THREE.Object3D) => {
      meshMap[e.name] = e;
      if ('material' in e && e.material) {
        (e as THREE.Mesh).frustumCulled = true; // Enable frustum culling for better performance
        (e as THREE.Mesh).matrixAutoUpdate = false; // Disable auto matrix updates if not needed
      }
    });
    meshesRef.current = meshMap;
    return meshMap;
  }, [model.scene]);

  // Pre-configured texture map for faster lookups
  const imageMap = useMemo(() => ({ "/bg.png": 0, "/bg2.png": 1, "/bg3.png": 2 } as Record<string, number>), []);

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
    const index = imageMap[currentImage] ?? 0;
    const tex = textures[index];

    if (tex && material.map !== tex) { // Only update if texture actually changed
      // Configure texture properties once
      if (!tex.userData.configured) {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.flipY = true;
        tex.generateMipmaps = false; // Disable mipmaps for UI textures
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.userData.configured = true;
      }

      material.map = tex;
      material.needsUpdate = true;
    }

    // Assign our custom material to the screen mesh
    if ((meshes.matte as THREE.Mesh).material !== material) {
      (meshes.matte as THREE.Mesh).material = material;
    }
  }, [meshes, textures, currentImage, imageMap]);

  useEffect(() => {
    if (meshes.screen) {
      (meshes.screen as THREE.Mesh).rotation.x = THREE.MathUtils.degToRad(180);
      screenRef.current = meshes.screen as THREE.Mesh;
    }
  }, [meshes]);

  useFrame((_, delta) => {
    const deltaMultiplier = Math.min(delta * 60, 3); // Slightly higher cap for smoother motion

    if (screenRef.current) {
      const clamped = Math.max(0, Math.min(1, scrollProgress));
      targetScreenRotation.current = THREE.MathUtils.degToRad(180 - clamped * 90);

      const diff = Math.abs(currentScreenRotation.current - targetScreenRotation.current);
      if (diff > 0.001) { // Only update if difference is significant
        currentScreenRotation.current = THREE.MathUtils.lerp(
          currentScreenRotation.current,
          targetScreenRotation.current,
          deltaMultiplier * 0.12 // Slightly faster lerp
        );
        screenRef.current.rotation.x = currentScreenRotation.current;
      }
    }

    if (groupRef.current) {
      const diff = Math.abs(currentRotationY.current - targetRotationY.current);
      if (diff > 0.001) { // Only update if difference is significant
        const lerpFactor = Math.min(1, deltaMultiplier * (FLIP_LERP_FACTOR / 60));
        currentRotationY.current = THREE.MathUtils.lerp(
          currentRotationY.current,
          targetRotationY.current,
          lerpFactor
        );
        groupRef.current.rotation.y = currentRotationY.current;
      }
    }
  });

  return (
    <group position={[0, -14, 20]} scale={0.9}>
      <group ref={groupRef}>
        <primitive object={model.scene} />
      </group>
    </group>
  );
});
MacContainer.displayName = 'MacContainer';

// --- MacBookCanvas ---
const MacBookCanvas = ({
  currentProduct,
  isFlipping,
  scrollProgress,
  flipDirection,
}: {
  currentProduct: { key: string; image: string; title: string; description: string };
  isFlipping: boolean;
  scrollProgress: number;
  flipDirection: number;
}) => (
  <Canvas
    camera={{ fov: 12, position: [0, -10, 220] }}
    dpr={[1, Math.min(2, window.devicePixelRatio)]}
    performance={{ min: 0.7, max: 1.0, debounce: 200 }}
    gl={{
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
      precision: "highp",
      stencil: false,
      depth: true
    }}
    frameloop="always"
    flat
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
  product: { key: string; image: string; title: string; description: string };
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

  const handleChange = useCallback((nextIndex: number, direction: number) => {
    if (isFlipping || !products.length) return;
    setFlipDirection(direction);
    setIsFlipping(true);
    setContentVisible(false);
    setTimeout(() => setCurrentIndex(nextIndex), SWAP_IMAGE_DELAY);
    setTimeout(() => setContentVisible(true), SWAP_IMAGE_DELAY + 100);
    setTimeout(() => setIsFlipping(false), TOTAL_FLIP_DURATION);
  }, [isFlipping, products.length]);

  const next = useCallback(() => products.length && handleChange((currentIndex + 1) % products.length, 1), [products.length, currentIndex, handleChange]);
  const prev = useCallback(() => products.length && handleChange((currentIndex - 1 + products.length) % products.length, -1), [products.length, currentIndex, handleChange]);

  // Optimized scroll progress with throttling
  useEffect(() => {
    let ticking = false;
    let lastProgress = 0;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current) {
            ticking = false;
            return;
          }

          const rect = sectionRef.current.getBoundingClientRect();
          const sectionHeight = sectionRef.current.offsetHeight;
          const windowHeight = window.innerHeight;
          let progress = 0;

          if (rect.top <= 0 && rect.bottom >= windowHeight) {
            progress = Math.abs(rect.top) / (sectionHeight - windowHeight);
          } else if (rect.top > 0) {
            progress = 0;
          } else if (rect.bottom < windowHeight) {
            progress = 1;
          }

          const newProgress = Math.max(0, Math.min(1, progress));

          // Only update if change is significant (reduces unnecessary re-renders)
          if (Math.abs(newProgress - lastProgress) > 0.005) {
            setScrollProgress(newProgress);
            lastProgress = newProgress;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Optimized preloading with priority
  useEffect(() => {
    if (!products.length) return;

    // Immediate preload for critical assets
    useGLTF.preload("./models/mac.glb");

    // Staggered texture preloading to avoid blocking
    const preloadTextures = async () => {
      for (let i = 0; i < products.length; i++) {
        await new Promise(resolve => {
          useTexture.preload(products[i].image);
          setTimeout(resolve, 50); // Small delay between preloads
        });
      }
    };

    const timer = setTimeout(preloadTextures, 500);
    return () => clearTimeout(timer);
  }, [products]);

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
      style={{ height: "180vh", scrollSnapAlign: "start", scrollSnapStop: "always", borderBottom: "12px solid #ffffff" }}
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

        {/* Línea vertical divisoria */}
        <div className="w-2 h-full bg-white"></div>

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