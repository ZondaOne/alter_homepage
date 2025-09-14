'use client';

import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, useGLTF, useScroll, useTexture } from "@react-three/drei";
import { useMemo, useEffect, useRef, useState, Suspense } from "react";
import * as THREE from "three";

// --- Data for our products ---
const products = [
    {
        image: "/bg.png",
        title: "PixelPerfect",
        description: "Advanced image editing with background removal, upscaling, and content generation. Precision and ease combined in one powerful platform."
    },
    {
        image: "/bg2.png",
        title: "Comerzia",
        description: "Complete business management solution for handling clients and orders. Features dashboard analytics and automated customer notifications."
    },
    {
        image: "/bg3.png",
        title: "ComChat",
        description: "Intelligent chatbot that learns from your data. Supports text and multimodal conversations with privacy-focused local deployment."
    }
];


// SECTION: 3D Model and Canvas
// ==========================================

const MacContainer = ({ currentImage, isFlipping }: { currentImage: string; isFlipping: boolean }) => {
    const model = useGLTF("./models/mac.glb");
    const tex = useTexture(currentImage);
    const screenRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);
    
    // --- IMPROVEMENT: Smoother animation state ---
    // We will animate towards a target rotation using lerp for a natural feel.
    const targetRotation = useRef(0);

    useEffect(() => {
        // When isFlipping is triggered, set the target to a full 360-degree rotation.
        if (isFlipping) {
            targetRotation.current += Math.PI * 2;
        }
    }, [isFlipping]);
    
    // --- IMPROVEMENT: Highest possible image quality ---
    useMemo(() => {
        if (tex) {
            // This is the most crucial change for color accuracy.
            // It ensures the texture colors are displayed exactly as in the original image file.
            tex.colorSpace = THREE.SRGBColorSpace;
            
            // Keep existing optimizations for sharpness
            tex.generateMipmaps = true;
            tex.minFilter = THREE.LinearMipmapLinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.anisotropy = 16;
            
            // The texture in the model is flipped, so we keep this true.
            tex.flipY = true;
            tex.needsUpdate = true;
        }
    }, [tex]);

    const meshes = useMemo(() => {
        const meshMap: any = {};
        model.scene.traverse((e: any) => {
            meshMap[e.name] = e;
            if (e.material) {
                e.frustumCulled = false; // Disable frustum culling to prevent flickering during rotation
            }
        });
        return meshMap;
    }, [model.scene]);

    useMemo(() => {
        if (meshes.screen) {
            meshes.screen.rotation.x = THREE.MathUtils.degToRad(180);
            screenRef.current = meshes.screen;
        }
        if (meshes.matte && meshes.matte.material) {
            const material = meshes.matte.material;
            material.map = tex;
            // Ensure the material doesn't wash out the texture
            material.color = new THREE.Color(0xffffff); // Use pure white to not tint the texture
            material.emissiveIntensity = 0;
            material.metalness = 0;
            material.roughness = 1; // Set to 1 for a pure matte look that doesn't reflect light
            material.needsUpdate = true;
        }
    }, [meshes, tex]);

    const data = useScroll();

    useFrame((_, delta) => {
        // Scroll-based screen opening animation (already smooth due to ScrollControls damping)
        if (screenRef.current) {
            screenRef.current.rotation.x = THREE.MathUtils.degToRad(180 - data.offset * 90);
        }

        // --- IMPROVEMENT: Smoother 360° flip animation ---
        // We use lerp to smoothly transition to the target rotation.
        // This creates a natural ease-in and ease-out without complex math.
        if (groupRef.current) {
             groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                targetRotation.current,
                delta * 8 // Increased speed for smoother animation
            );
        }
    });

    return (
        // --- LAYOUT CHANGE: Positioned more to the left ---
        <group position={[-2, -14, 20]} scale={0.9}>
            <group ref={groupRef}>
                <primitive object={model.scene} />
            </group>
        </group>
    );
};

const MacBookCanvas = ({ currentImage, isFlipping }: { currentImage: string; isFlipping: boolean }) => (
    <Canvas
        camera={{ fov: 12, position: [0, -10, 220] }}
        dpr={[1, 2]} // Use device pixel ratio up to 2 for sharp images on high-res screens
        performance={{ min: 0.5 }}
        gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
            // High precision is good for quality
            precision: "highp"
        }}
        // frameloop="demand" is great for performance, renders only when needed. [1]
        frameloop="always"
    >
        <Suspense fallback={null}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 5]} intensity={2.2} />
            <directionalLight position={[-10, 5, 5]} intensity={1.4} />
            <pointLight position={[0, 0, 10]} intensity={0.4} />
            <ScrollControls pages={3} damping={0.2}>
                <MacContainer currentImage={currentImage} isFlipping={isFlipping} />
            </ScrollControls>
        </Suspense>
    </Canvas>
);


// SECTION: UI Components
// ==========================================

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-full">
        <div className="relative">
            <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
            <p className="text-white text-sm mt-4 text-center">Loading MacBook...</p>
        </div>
    </div>
);

const ProductInfo = ({ product, onNext, onPrev, isFlipping }: { product: any; onNext: () => void; onPrev: () => void; isFlipping: boolean; }) => (
    <div className="w-full h-full flex flex-col justify-center items-start p-8 md:p-16 relative">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{product.title}</h1>
        <p className="text-md md:text-lg text-gray-300 max-w-md">{product.description}</p>
        
        {/* Floating Arrow Controls */}
        <div className="absolute bottom-10 left-1/2 md:left-16 -translate-x-1/2 md:-translate-x-0 flex gap-4">
             {/* Left Arrow */}
             <button
                onClick={onPrev}
                disabled={isFlipping}
                className="z-10 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] hover:scale-110 disabled:opacity-50"
                style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' }}
            >
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>

            {/* Right Arrow */}
            <button
                onClick={onNext}
                disabled={isFlipping}
                className="z-10 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] hover:scale-110 disabled:opacity-50"
                style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' }}
            >
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    </div>
);


// SECTION: Main Exported Component
// ==========================================

const MacBookSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [shouldRender, setShouldRender] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);

    const currentProduct = products[currentImageIndex];

    const handleImageChange = (nextIndex: number) => {
        if (isFlipping) return;
        setIsFlipping(true);
        setTimeout(() => {
            setCurrentImageIndex(nextIndex);
        }, 300); // Change image mid-animation
        setTimeout(() => setIsFlipping(false), 800); // Allow animation to complete
    };

    const nextImage = () => {
        const nextIndex = (currentImageIndex + 1) % products.length;
        handleImageChange(nextIndex);
    };

    const prevImage = () => {
        const prevIndex = (currentImageIndex - 1 + products.length) % products.length;
        handleImageChange(prevIndex);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            useGLTF.preload("./models/mac.glb");
            products.forEach(p => useTexture.preload(p.image));
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !shouldRender) {
                    setShouldRender(true);
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(section);
        return () => observer.disconnect();
    }, [shouldRender]);

    return (
        <div
            ref={sectionRef}
            className="hidden md:flex w-full h-screen relative bg-black text-white snap-center snap-always flex-col md:flex-row"
            style={{ scrollSnapAlign: 'center', scrollSnapStop: 'always' }}
        >
            {/* --- LAYOUT: Left side for Info, Right side for Canvas --- */}
            <div className="w-full md:w-2/5 h-1/2 md:h-full">
                 {shouldRender && (
                    <ProductInfo 
                        product={currentProduct} 
                        onNext={nextImage} 
                        onPrev={prevImage}
                        isFlipping={isFlipping}
                    />
                 )}
            </div>

            <div className="w-full md:w-3/5 h-1/2 md:h-full">
                {shouldRender ? (
                    <Suspense fallback={<LoadingSpinner />}>
                        <MacBookCanvas currentImage={currentProduct.image} isFlipping={isFlipping} />
                    </Suspense>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-500">
                             <p>Scroll down to experience the MacBook</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MacBookSection;