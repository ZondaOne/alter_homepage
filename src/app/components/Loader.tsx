"use client";
import { motion, AnimatePresence, Variants } from "framer-motion";
import React, { useEffect, useState, useCallback } from "react";

interface LoaderProps {
  duration?: number; // loader display time in ms
  onLoadingComplete?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ duration = 2000, onLoadingComplete }) => {
  const [visible, setVisible] = useState(true);
  const [,setContentReady] = useState(false);

  // Use requestIdleCallback to defer heavy operations and avoid blocking
  const deferHeavyOperations = useCallback(() => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        setContentReady(true);
        onLoadingComplete?.();
      });
    } else {
      setTimeout(() => {
        setContentReady(true);
        onLoadingComplete?.();
      }, 100);
    }
  }, [onLoadingComplete]);

  useEffect(() => {
    deferHeavyOperations();
    
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration, deferHeavyOperations]);

  // Logo entrance animation
  const logoVariants: Variants = {
    hidden: { scale: 0, opacity: 0, rotate: -180 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: { 
        duration: 0.8, 
        ease: "backOut", 
        delay: 0.2,
      }
    }
  };

  // Path animations with better timing
  const pathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (custom: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 0.6,
          delay: custom * 0.1,
          ease: [0.4, 0, 0.2, 1],
          type: "tween"
        },
        opacity: {
          duration: 0.4,
          delay: custom * 0.1,
          ease: "easeOut"
        }
      }
    })
  };

  // Wrapper pulse animation with delay
  const pulseVariants: Variants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.05, 1],
      transition: { 
        duration: 2, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: 1.0 // Start after paths complete
      }
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.1 } }}
          style={{ 
            willChange: "opacity",
            transform: "translateZ(0)" // Force GPU layer to prevent blocking
          }}
        >
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="relative will-change-transform"
          >
            {/* Pulse wrapper */}
            <motion.div 
              variants={pulseVariants} 
              initial="initial"
              animate="pulse" 
              className="relative will-change-transform"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 500 500"
                className="w-32 h-32"
                style={{ willChange: "stroke-dashoffset, opacity" }}
              >
                <motion.path
                  d="M 88.478 186.141 L 147.278 101.441 L 257.616 101.606 L 316.242 186.175 L 88.478 186.141 Z"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                />
                <motion.path
                  d="M 151.162 214.519 L 254.816 214.785 L 123.855 401.854 L 88.385 304.265 L 151.162 214.519 Z"
                  fill="none"
                  stroke="#fb923c"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                />
                <motion.path
                  d="M 375.69 100 L 412.058 198.385 L 348.108 288.629 L 243.925 288.629 L 375.69 100 Z"
                  fill="none"
                  stroke="#ea580c"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                />
                <motion.path
                  d="M 183.137 316.443 L 410.625 316.222 L 353.087 400.362 L 241.446 400.15 L 183.137 316.443 Z"
                  fill="none"
                  stroke="#c2410c"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                />
              </motion.svg>
            </motion.div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;