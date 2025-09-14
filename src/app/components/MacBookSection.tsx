'use client';

import { Canvas } from "@react-three/fiber";
import { ScrollControls, useGLTF, useScroll, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useEffect, useRef, useState, Suspense } from "react";
import * as THREE from "three";

const MacContainer = ({ currentImage, isFlipping }: { currentImage: string; isFlipping: boolean }) => {
    const model = useGLTF("./models/mac.glb");
    const tex = useTexture(currentImage);
    const screenRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);
    const flipProgress = useRef(0);
    const flipStartTime = useRef(0);
    const flipDuration = 0.6; // 600ms total flip time

    // Optimize texture quality
    useMemo(() => {
        if (tex) {
            tex.generateMipmaps = true;
            tex.minFilter = THREE.LinearMipmapLinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.anisotropy = 16; // Maximum anisotropy for better quality
            tex.flipY = true; // Fix image orientation
            tex.needsUpdate = true;
        }
    }, [tex]);

    const meshes = useMemo(() => {
        const meshMap: any = {};
        model.scene.traverse((e: any) => {
            meshMap[e.name] = e;
            // Optimize materials for performance
            if (e.material) {
                e.material.needsUpdate = false;
                e.frustumCulled = true;
            }
        });
        return meshMap;
    }, [model.scene]);

    useMemo(() => {
        if (meshes.screen) {
            meshes.screen.rotation.x = THREE.MathUtils.degToRad(180); // Restore screen rotation
            screenRef.current = meshes.screen;
        }
        if (meshes.matte && meshes.matte.material) {
            const material = meshes.matte.material;
            material.map = tex;
            material.emissive = new THREE.Color(0x000000); // No emissive
            material.emissiveIntensity = 0;
            material.metalness = 0;
            material.roughness = 0;
            material.transparent = false;
            material.alphaTest = 0;
            // Remove any color tinting that might wash out the image
            material.color = new THREE.Color(0xffffff);
            // Ensure high quality rendering
            material.precision = 'highp';
            material.needsUpdate = true;
        }
    }, [meshes, tex]);

    const data = useScroll();

    useFrame((state) => {
        // Handle screen animation
        if (screenRef.current) {
            screenRef.current.rotation.x = THREE.MathUtils.degToRad(180 - data.offset * 90);
        }

        // Handle 360° flip animation with easing
        if (isFlipping && groupRef.current) {
            if (flipStartTime.current === 0) {
                flipStartTime.current = state.clock.elapsedTime;
            }

            const elapsed = state.clock.elapsedTime - flipStartTime.current;
            const progress = Math.min(elapsed / flipDuration, 1);

            // Smooth easing function (ease-out)
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            groupRef.current.rotation.y = easedProgress * Math.PI * 2;

            // Complete animation
            if (progress >= 1) {
                groupRef.current.rotation.y = 0;
                flipStartTime.current = 0;
            }
        } else if (groupRef.current && !isFlipping) {
            groupRef.current.rotation.y = 0;
            flipStartTime.current = 0;
        }
    });

    return (
        <group position={[0, -14, 20]}>
            <group ref={groupRef}>
                <primitive object={model.scene} />
            </group>
        </group>
    );
};

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-full">
        <div className="relative">
            <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
            <p className="text-white text-sm mt-4 text-center">Loading MacBook...</p>
        </div>
    </div>
);

const MacBookCanvas = ({ currentImage, isFlipping }: { currentImage: string; isFlipping: boolean }) => (
    <Canvas
        camera={{ fov: 12, position: [0, -10, 220] }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        performance={{ min: 0.5 }} // Auto-adjust quality
        gl={{
            antialias: true, // Enable antialiasing for better texture quality
            alpha: false,
            powerPreference: "high-performance",
            precision: "highp" // High precision for better texture rendering
        }}
        frameloop="demand" // Only render when needed
    >
        <Suspense fallback={null}>
            {/* Enhanced lighting to make MacBook lighter */}
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

const MacBookSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [shouldRender, setShouldRender] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);

    const images = ["./bg.png", "./bg2.png"];
    const currentImage = images[currentImageIndex];

    const nextImage = () => {
        if (isFlipping) return; // Prevent multiple clicks during animation
        setIsFlipping(true);
        setTimeout(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 300); // Change image at halfway point
        setTimeout(() => setIsFlipping(false), 600); // Complete animation
    };

    const prevImage = () => {
        if (isFlipping) return; // Prevent multiple clicks during animation
        setIsFlipping(true);
        setTimeout(() => {
            setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
        }, 300); // Change image at halfway point
        setTimeout(() => setIsFlipping(false), 600); // Complete animation
    };

    // Start preloading immediately in background
    useEffect(() => {
        const timer = setTimeout(() => {
            useGLTF.preload("./models/mac.glb");
            useTexture.preload("./bg.png");
            useTexture.preload("./bg2.png");
        }, 1000); // Small delay to not interfere with initial page load

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.intersectionRatio > 0.1 && !shouldRender) {
                            setShouldRender(true);
                        }
                        if (entry.intersectionRatio > 0.5) {
                            section.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            });
                        }
                    }
                });
            },
            {
                threshold: [0.1, 0.5],
                rootMargin: '-5% 0px'
            }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, [shouldRender]);

    return (
        <div
            ref={sectionRef}
            className="w-full h-screen relative bg-black text-white snap-center snap-always"
            style={{
                scrollSnapAlign: 'center',
                scrollSnapStop: 'always'
            }}
        >
            {/* Floating Arrow Controls */}
            {shouldRender && (
                <>
                    {/* Left Arrow */}
                    <button
                        onClick={prevImage}
                        className="absolute top-1/2 -translate-y-1/2 z-10 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] hover:scale-110"
                        style={{
                            left: '10%',
                            filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'
                        }}
                    >
                        <svg width="96" height="96" viewBox="0 0 24 24" fill="none" className="text-white">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={nextImage}
                        className="absolute top-1/2 -translate-y-1/2 z-10 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] hover:scale-110"
                        style={{
                            right: '10%',
                            filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'
                        }}
                    >
                        <svg width="96" height="96" viewBox="0 0 24 24" fill="none" className="text-white">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </>
            )}

            {shouldRender ? (
                <Suspense fallback={<LoadingSpinner />}>
                    <MacBookCanvas currentImage={currentImage} isFlipping={isFlipping} />
                </Suspense>
            ) : (
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-lg flex items-center justify-center">
                            <div className="w-10 h-6 bg-gray-600 rounded"></div>
                        </div>
                        <p className="text-gray-400">MacBook Experience</p>
                        <p className="text-gray-500 text-sm">Scroll to load</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MacBookSection;