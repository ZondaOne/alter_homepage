'use client';

import { Canvas } from "@react-three/fiber";
import { Environment, ScrollControls, useGLTF, useScroll, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useEffect, useRef } from "react";
import * as THREE from "three";

useGLTF.preload("./models/mac.glb");
useTexture.preload("./bg.png");

const MacContainer = () => {
    const model = useGLTF("./models/mac.glb");
    const tex = useTexture("./bg.png");

    const meshes = useMemo(() => {
        const meshMap: any = {};
        model.scene.traverse((e: any) => {
            meshMap[e.name] = e;
        });
        return meshMap;
    }, [model.scene]);

    useMemo(() => {
        if (meshes.screen) {
            meshes.screen.rotation.x = THREE.MathUtils.degToRad(180);
        }
        if (meshes.matte) {
            meshes.matte.material.map = tex;
            meshes.matte.material.emissiveIntensity = 0;
            meshes.matte.material.metalness = 0;
            meshes.matte.material.roughness = 1;
        }
    }, [meshes, tex]);

    const data = useScroll();

    useFrame(() => {
        if (meshes.screen) {
            meshes.screen.rotation.x = THREE.MathUtils.degToRad(180 - data.offset * 90);
        }
    });

    return (
        <group position={[0, -14, 20]}>
            <primitive object={model.scene} />
        </group>
    );
};

const MacBookSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                        section.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                });
            },
            {
                threshold: [0.5],
                rootMargin: '-10% 0px'
            }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={sectionRef}
            className="w-full h-screen relative bg-black text-white snap-center snap-always"
            style={{
                scrollSnapAlign: 'center',
                scrollSnapStop: 'always'
            }}
        >
            <Canvas camera={{ fov: 12, position: [0, -10, 220] }}>
                <Environment
                    files={[
                        "https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/4k/wide_street_01_4k.exr",
                    ]}
                />
                <ScrollControls pages={3} damping={0.2}>
                    <MacContainer />
                </ScrollControls>
            </Canvas>
        </div>
    );
};

export default MacBookSection;