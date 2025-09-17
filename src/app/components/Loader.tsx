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
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
