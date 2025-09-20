"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

interface LoaderProps {
  duration?: number; // tiempo que se muestra el loader (ms)
}

const Loader: React.FC<LoaderProps> = ({ duration = 1200 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const logoVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      rotate: -180
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "backOut" as const,
        delay: 0.2
      }
    }
  };

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
      scale: 0.9
    },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      scale: 1,
      transition: {
        pathLength: {
          duration: 0.6,
          delay: i * 0.15,
          ease: "easeOut" as const
        },
        opacity: {
          duration: 0.4,
          delay: i * 0.15,
          ease: "easeOut" as const
        },
        scale: {
          duration: 0.5,
          delay: i * 0.15,
          ease: "backOut" as const
        }
      }
    })
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.08, 1],
      filter: [
        "drop-shadow(0 0 0px rgba(249, 115, 22, 0))",
        "drop-shadow(0 0 25px rgba(249, 115, 22, 0.9))",
        "drop-shadow(0 0 0px rgba(249, 115, 22, 0))"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 500 500"
              className="w-32 h-32"
              variants={pulseVariants}
              animate="pulse"
            >
              <motion.path
                custom={0}
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                d="M 88.478 186.141 L 147.278 101.441 L 257.616 101.606 L 316.242 186.175 L 88.478 186.141 Z"
                fill="none"
                stroke="#f97316"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <motion.path
                custom={1}
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                d="M 151.162 214.519 L 254.816 214.785 L 123.855 401.854 L 88.385 304.265 L 151.162 214.519 Z"
                fill="none"
                stroke="#fb923c"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <motion.path
                custom={2}
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                d="M 375.69 100 L 412.058 198.385 L 348.108 288.629 L 243.925 288.629 L 375.69 100 Z"
                fill="none"
                stroke="#ea580c"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <motion.path
                custom={3}
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                d="M 183.137 316.443 L 410.625 316.222 L 353.087 400.362 L 241.446 400.15 L 183.137 316.443 Z"
                fill="none"
                stroke="#c2410c"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
