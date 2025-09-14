'use client';

import { Canvas } from "@react-three/fiber";
import { ScrollControls, useGLTF, useScroll, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useEffect, useRef, useState, Suspense } from "react";
import * as THREE from "three";

const MacContainer = () => {
    const model = useGLTF("./models/mac.glb");
    const tex = useTexture("./bg.png");
    const screenRef = useRef<THREE.Mesh>(null);

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
            meshes.screen.rotation.x = THREE.MathUtils.degToRad(180);
            screenRef.current = meshes.screen;
        }
        if (meshes.matte && meshes.matte.material) {
            const material = meshes.matte.material;
            material.map = tex;
            material.emissiveIntensity = 0;
            material.metalness = 0;
            material.roughness = 1;
            material.needsUpdate = true;
        }
    }, [meshes, tex]);

    const data = useScroll();

    useFrame(() => {
        if (screenRef.current) {
            screenRef.current.rotation.x = THREE.MathUtils.degToRad(180 - data.offset * 90);
        }
    });

    return (
        <group position={[0, -14, 20]}>
            <primitive object={model.scene} />
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

const MacBookCanvas = () => (
    <Canvas
        camera={{ fov: 12, position: [0, -10, 220] }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        performance={{ min: 0.5 }} // Auto-adjust quality
        gl={{
            antialias: false, // Disable antialiasing for performance
            alpha: false,
            powerPreference: "high-performance"
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
                <MacContainer />
            </ScrollControls>
        </Suspense>
    </Canvas>
);

const MacBookSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [shouldRender, setShouldRender] = useState(false);

    // Start preloading immediately in background
    useEffect(() => {
        const timer = setTimeout(() => {
            useGLTF.preload("./models/mac.glb");
            useTexture.preload("./bg.png");
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
            {shouldRender ? (
                <Suspense fallback={<LoadingSpinner />}>
                    <MacBookCanvas />
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