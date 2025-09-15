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

// --- TUNABLE CONSTANTS ---
// Adjust these values to change flip speed and logo size/placement
const FLIP_LERP_FACTOR = 2.0; // lower => slower follow (was 8)
const SWAP_IMAGE_DELAY = 800; // ms before swapping the product image (was 300)
const TOTAL_FLIP_DURATION = 2000; // ms until isFlipping becomes false (was 800)
const LOGO_PLANE_SIZE = { width: 10, height: 6 };

// SECTION: 3D Model and Canvas
// ==========================================

const MacContainer = ({ currentImage, isFlipping, scrollProgress }: { currentImage: string; isFlipping: boolean; scrollProgress: number }) => {
    const model = useGLTF("./models/mac.glb");
    const tex = useTexture(currentImage);
    const screenRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);
    const meshesRef = useRef<any>({});

    // --- IMPROVEMENT: Smoother animation state ---
    const targetRotation = useRef(0);

    useEffect(() => {
        if (isFlipping) {
            // Request a full 360° spin — the actual perceived speed is controlled in useFrame by FLIP_LERP_FACTOR
            targetRotation.current += Math.PI * 2;
        }
    }, [isFlipping]);
    
    // --- IMPROVEMENT: Highest possible image quality ---
    useMemo(() => {
        if (tex) {
            tex.colorSpace = (THREE as any).SRGBColorSpace || (THREE as any).sRGBEncoding;
            tex.generateMipmaps = true;
            tex.minFilter = THREE.LinearMipmapLinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.anisotropy = 16;
            tex.flipY = true;
            tex.needsUpdate = true;
        }
    }, [tex]);

    const meshes = useMemo(() => {
        const meshMap: any = {};
        model.scene.traverse((e: any) => {
            meshMap[e.name] = e;
            if (e.material) {
                e.frustumCulled = false;
            }
        });
        meshesRef.current = meshMap;
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
            material.color = new THREE.Color(0xffffff);
            material.emissiveIntensity = 0;
            material.metalness = 0;
            material.roughness = 1;
            material.needsUpdate = true;
        }
    }, [meshes, tex]);

    // --- RANDOM LOGO ON THE BACK ---
    const logoCandidates = [
        "https://i.imgur.com/FS4PhT4.png"
    ];
    const [logoPath] = useState(() => logoCandidates[Math.floor(Math.random() * logoCandidates.length)]);
    const logoTex = useTexture(logoPath);

    useEffect(() => {
        // When the model is ready, try to attach a small plane to the lid/back surface.
        if (!logoTex || !meshesRef.current) return;

        // Heuristic: try to find a mesh that looks like the lid/back
        const lidMesh = Object.values(meshesRef.current).find((m: any) => {
            if (!m || !m.name) return false;
            return /lid|screen_back|back|top|rear|cover/i.test(m.name);
        }) || meshesRef.current['screen'] || model.scene;

        // Create plane and material
        const logoMaterial = new THREE.MeshBasicMaterial({ map: logoTex, transparent: true, alphaTest: 0.4, side: THREE.DoubleSide });
        const logoGeometry = new THREE.PlaneGeometry(LOGO_PLANE_SIZE.width, LOGO_PLANE_SIZE.height);
        const logoMesh = new THREE.Mesh(logoGeometry, logoMaterial);

        // Positioning: try to place slightly above the lid's local origin and facing outward
        try {
            // Reset local transform
            logoMesh.position.set(0, 0, 0.01);
            logoMesh.rotation.set(0, 0, 0);

            // If the lidMesh has a known bounding box, we can push the logo slightly outwards
            const bbox = new THREE.Box3().setFromObject(lidMesh);
            const size = new THREE.Vector3();
            bbox.getSize(size);

            // Place the logo near the center-top area of the lid/back (heuristic)
            logoMesh.position.set(0, size.y * 0.15, size.z * 0.51);

            // Align rotation to the lid (if lid has rotation)
            logoMesh.rotation.copy(lidMesh.rotation || new THREE.Euler());

            // Slightly scale down if the lid is small
            const scaleFactor = Math.max(0.4, Math.min(1.0, size.x / 20));
            logoMesh.scale.setScalar(scaleFactor);

            // Add as child to maintain transform with the lid
            lidMesh.add(logoMesh);
        } catch (e) {
            // Fallback: add to root
            model.scene.add(logoMesh);
        }

        return () => {
            try {
                if (logoMesh.parent) logoMesh.parent.remove(logoMesh);
                logoGeometry.dispose();
                logoMaterial.dispose();
            } catch (e) {}
        };
    }, [logoTex, meshesRef, model.scene]);

    useFrame((_, delta) => {
        // Use the external scroll progress instead of internal scroll
        if (screenRef.current) {
            // Clamp the scroll progress to prevent over-rotation
            const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
            screenRef.current.rotation.x = THREE.MathUtils.degToRad(180 - clampedProgress * 90);
        }

        // Smoother 360° flip animation (slower now)
        if (groupRef.current) {
             groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                targetRotation.current,
                delta * FLIP_LERP_FACTOR
            );
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

const MacBookCanvas = ({ currentImage, isFlipping, scrollProgress }: { currentImage: string; isFlipping: boolean; scrollProgress: number }) => (
    <Canvas
        camera={{ fov: 12, position: [0, -10, 220] }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
            precision: "highp"
        }}
        frameloop="always"
    >
        <Suspense fallback={null}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 5]} intensity={2.2} />
            <directionalLight position={[-10, 5, 5]} intensity={1.4} />
            <pointLight position={[0, 0, 10]} intensity={0.4} />
            <MacContainer currentImage={currentImage} isFlipping={isFlipping} scrollProgress={scrollProgress} />
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
    const [scrollProgress, setScrollProgress] = useState(0);

    const currentProduct = products[currentImageIndex];

    const handleImageChange = (nextIndex: number) => {
        if (isFlipping) return;
        setIsFlipping(true);

        // Slightly longer delay before swapping to match the slower flip
        setTimeout(() => {
            setCurrentImageIndex(nextIndex);
        }, SWAP_IMAGE_DELAY);

        // Keep the flipping state for a longer duration so animation finishes
        setTimeout(() => setIsFlipping(false), TOTAL_FLIP_DURATION);
    };

    const nextImage = () => {
        const nextIndex = (currentImageIndex + 1) % products.length;
        handleImageChange(nextIndex);
    };

    const prevImage = () => {
        const prevIndex = (currentImageIndex - 1 + products.length) % products.length;
        handleImageChange(prevIndex);
    };

    // Handle scroll progress calculation
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const section = sectionRef.current;
            const rect = section.getBoundingClientRect();
            const sectionHeight = section.offsetHeight;
            const windowHeight = window.innerHeight;

            // Calculate scroll progress within the section
            let progress = 0;
            
            if (rect.top <= 0 && rect.bottom >= windowHeight) {
                // Section is fully visible and scrolling through it
                progress = Math.abs(rect.top) / (sectionHeight - windowHeight);
            } else if (rect.top > 0) {
                // Section is below viewport
                progress = 0;
            } else if (rect.bottom < windowHeight) {
                // Section is above viewport
                progress = 1;
            }

            // Clamp progress between 0 and 1
            progress = Math.max(0, Math.min(1, progress));
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial calculation

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Preload assets
    useEffect(() => {
        const timer = setTimeout(() => {
            useGLTF.preload("./models/mac.glb");
            products.forEach(p => useTexture.preload(p.image));
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Intersection observer for initial render
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !shouldRender) {
                        setShouldRender(true);
                    }
                });
            },
            { 
                threshold: 0.1,
                rootMargin: '50px 0px 50px 0px' // Start loading a bit before the section is visible
            }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, [shouldRender]);

    return (
        <div
            ref={sectionRef}
            className="hidden md:flex w-full relative bg-black text-white"
            style={{ 
                height: '180vh', // Make it taller so there's scroll space for the animation
                scrollSnapAlign: 'start',
                scrollSnapStop: 'always',
            }}
        >
            {/* Sticky container that holds everything in place during animation */}
            <div 
                className="sticky top-0 w-full h-screen flex"
                style={{
                    // The sticky behavior keeps this in view while scrolling through the taller parent
                    position: 'sticky',
                    top: 0,
                }}
            >
                {/* Left side for Info */}
                <div className="w-full md:w-2/5 h-full">
                     {shouldRender && (
                        <ProductInfo 
                            product={currentProduct} 
                            onNext={nextImage} 
                            onPrev={prevImage}
                            isFlipping={isFlipping}
                        />
                     )}
                </div>

                {/* Right side for Canvas */}
                <div className="w-full md:w-3/5 h-full">
                    {shouldRender ? (
                        <Suspense fallback={<LoadingSpinner />}>
                            <MacBookCanvas 
                                currentImage={currentProduct.image} 
                                isFlipping={isFlipping} 
                                scrollProgress={scrollProgress}
                            />
                        </Suspense>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center text-gray-500">
                                 <p>Scroll down to experience</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MacBookSection;
