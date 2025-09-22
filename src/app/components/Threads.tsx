import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

interface ThreadsProps {
  color?: [number, number, number];
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
  maxLines?: number;
  resolutionScale?: number | 'auto';
  targetFPS?: number;
}

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision mediump float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;
uniform int u_line_count;
uniform float u_pixel;
uniform bool u_static_mode;

varying vec2 vUv;

#define PI 3.1415926538
#define MAX_LINES 50
const float u_line_width = 7.0;
const float u_line_blur = 8.0;

float hash(vec2 p) {
  p = 50.0 * fract(p * 0.3183099 + vec2(0.71,0.113));
  return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float pixel(float count) {
  return u_pixel * count;
}

float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
  float split_offset = (perc * 0.4);
  float split_point = 0.1 + split_offset;

  float amplitude_normal = smoothstep(split_point, 0.7, st.x);
  float amplitude_strength = 0.5;

  float finalAmplitude;
  float time_scaled;

  if (u_static_mode) {
      finalAmplitude = amplitude_normal * amplitude_strength * amplitude * 0.3;
      time_scaled = 1.0 + perc * 0.5;
  } else {
      finalAmplitude = amplitude_normal * amplitude_strength * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);
      time_scaled = time * 0.1 + (mouse.x - 0.5) * 1.0;
  }

  float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

  float xnoise;
  if (u_static_mode) {
      xnoise = mix(
          noise(vec2(perc * 2.0, st.x + perc) * 2.0),
          noise(vec2(perc * 3.0, st.x + perc) * 3.0) * 0.66,
          st.x * 0.3
      );
  } else {
      xnoise = mix(
          noise(vec2(time_scaled, st.x + perc) * 2.0),
          noise(vec2(time_scaled * 1.5, st.x + time_scaled) * 3.0) * 0.66,
          st.x * 0.3
      );
  }

  float y = 0.5 + (perc - 0.5) * distance + (xnoise - 0.5) * finalAmplitude;

  float line_start = smoothstep(
      y + (width / 2.0) + (u_line_blur * pixel(1.0) * blur),
      y,
      st.y
  );

  float line_end = smoothstep(
      y,
      y - (width / 2.0) - (u_line_blur * pixel(1.0) * blur),
      st.y
  );

  return clamp(
      (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
      0.0,
      1.0
  );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;
  float line_strength = 1.0;
  for (int i = 0; i < MAX_LINES; i++) {
      if (i >= u_line_count) break;
      float p = float(i) / float(u_line_count);
      line_strength *= (1.0 - lineFn(
          uv,
          u_line_width * pixel(1.0) * (1.0 - p),
          p,
          (PI * 1.0) * p,
          uMouse,
          iTime,
          uAmplitude,
          uDistance
      ));
  }
  float colorVal = 1.0 - line_strength;
  fragColor = vec4(uColor * colorVal, colorVal);
}

void main() {
  vec2 fragCoord = vUv * iResolution.xy;
  mainImage(gl_FragColor, fragCoord);
}
`;

const Threads: React.FC<ThreadsProps> = ({
  color = [1, 1, 1],
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = false,
  maxLines = 25,
  resolutionScale = 'auto',
  targetFPS = 60,
  ...rest
}) => {
  // ALL HOOKS MUST BE AT THE TOP, BEFORE ANY CONDITIONAL LOGIC
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLowEndDevice, setIsLowEndDevice] = useState<boolean | undefined>(undefined);
  
  const rendererRef = useRef<Renderer | null>(null);
  const programRef = useRef<Program | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastMousePosition = useRef<[number, number]>([0.5, 0.5]);
  const currentMouse = useRef<[number, number]>([0.5, 0.5]);
  const uResolution = useRef(new Float32Array([1, 1, 1]));
  const uColor = useRef(new Float32Array([1, 1, 1]));
  const uMouse = useRef(new Float32Array([0.5, 0.5]));

  // Mouse handlers - defined as callbacks before any conditional returns
  const handleMouseMove = useCallback((e: MouseEvent, container: HTMLDivElement) => {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height;
    lastMousePosition.current[0] = x;
    lastMousePosition.current[1] = y;
  }, []);

  const handleMouseLeave = useCallback(() => {
    lastMousePosition.current[0] = 0.5;
    lastMousePosition.current[1] = 0.5;
  }, []);

  // Device detection effect
  useEffect(() => {
    const detectLowEndDevice = () => {
      const isMobile = window.innerWidth < 768;
      const hardwareConcurrency = navigator.hardwareConcurrency || 1;
      const deviceMemory = (navigator as { deviceMemory?: number }).deviceMemory ?? 1;

      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
      let isWeakGPU = false;
      if (gl) {
        try {
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string;
            const weakGPUs = [
              'Intel HD Graphics 3000','Intel HD Graphics 4000','Intel UHD Graphics',
              'AMD Radeon R5','AMD Radeon R4','PowerVR','Adreno 3','Adreno 4','Mali-4','Intel(R) HD Graphics'
            ];
            isWeakGPU = weakGPUs.some(gpu => renderer.toLowerCase().includes(gpu.toLowerCase()));
          }
        } catch {
          isWeakGPU = true;
        }
      }

      const connection = (navigator as { connection?: { effectiveType?: string } }).connection;
      let isSlowConnection = false;
      if (connection && connection.effectiveType) {
        isSlowConnection = ['slow-2g','2g','3g'].includes(connection.effectiveType);
      }

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const lowEnd = isMobile || hardwareConcurrency <= 2 || deviceMemory <= 2 || isWeakGPU || isSlowConnection || prefersReducedMotion;

      setIsLowEndDevice(lowEnd);
    };

    detectLowEndDevice();
    window.addEventListener('resize', detectLowEndDevice);
    return () => window.removeEventListener('resize', detectLowEndDevice);
  }, []);

  // Initialize OGL effect
  useEffect(() => {
    // Don't initialize if we haven't detected the device type yet or if it's a low-end device
    if (isLowEndDevice === undefined || isLowEndDevice) return;

    const container = containerRef.current;
    if (!container) return;

    let pixelRatio = window.devicePixelRatio || 1;
    if (resolutionScale === 'auto') pixelRatio = Math.min(pixelRatio, 1.5);
    else if (typeof resolutionScale === 'number') pixelRatio = Math.max(0.3, Math.min(2, resolutionScale));

    const renderer = new Renderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    rendererRef.current = renderer;
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: uResolution.current },
        uColor: { value: uColor.current },
        uAmplitude: { value: amplitude },
        uDistance: { value: distance },
        uMouse: { value: uMouse.current },
        u_line_count: { value: Math.max(1, Math.min(50, Math.round(maxLines))) },
        u_pixel: { value: 1 / Math.max(1, Math.max(window.innerWidth, window.innerHeight)) },
        u_static_mode: { value: false }
      }
    });
    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });
    meshRef.current = mesh;

    const setSize = () => {
      const width = container.clientWidth || 300;
      const height = container.clientHeight || 150;
      renderer.setSize(width * pixelRatio, height * pixelRatio);

      uResolution.current[0] = width * pixelRatio;
      uResolution.current[1] = height * pixelRatio;
      uResolution.current[2] = width / Math.max(1, height);
      program.uniforms.iResolution.value = uResolution.current;
      program.uniforms.u_pixel.value = 1 / Math.max(width, height);
    };

    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(container);
    setSize();

    if (enableMouseInteraction) {
      container.addEventListener('mousemove', (e) => handleMouseMove(e, container));
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    let lastT = performance.now();
    const targetInterval = 1000 / targetFPS;

    const update = (t: number) => {
      const dt = t - lastT;
      if (dt >= targetInterval) {
        lastT = t;
        // smooth mouse
        const smoothing = 0.12;
        const tx = lastMousePosition.current[0];
        const ty = lastMousePosition.current[1];
        currentMouse.current[0] += (tx - currentMouse.current[0]) * smoothing;
        currentMouse.current[1] += (ty - currentMouse.current[1]) * smoothing;
        uMouse.current[0] = currentMouse.current[0];
        uMouse.current[1] = currentMouse.current[1];
        program.uniforms.uMouse.value = uMouse.current;

        program.uniforms.iTime.value = t * 0.001;

        renderer.render({ scene: mesh });
      }
      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [amplitude, distance, enableMouseInteraction, handleMouseLeave, handleMouseMove, maxLines, resolutionScale, targetFPS, isLowEndDevice]);

  // Update uniforms effect
  useEffect(() => {
    if (!programRef.current || isLowEndDevice) return;
    
    uColor.current[0] = color[0];
    uColor.current[1] = color[1];
    uColor.current[2] = color[2];
    programRef.current.uniforms.uColor.value = uColor.current;
    programRef.current.uniforms.uAmplitude.value = amplitude;
    programRef.current.uniforms.uDistance.value = distance;
    programRef.current.uniforms.u_line_count.value = Math.max(1, Math.min(50, Math.round(maxLines)));
  }, [color, amplitude, distance, maxLines, isLowEndDevice]);

  // CONDITIONAL RENDERING MUST HAPPEN AFTER ALL HOOKS
  if (isLowEndDevice === undefined) {
    return <div ref={containerRef} className="w-full h-full relative" {...rest} />;
  }
  
  if (isLowEndDevice) {
    return null;
  }

  return <div ref={containerRef} className="w-full h-full relative" {...rest} />;
};

export default Threads;