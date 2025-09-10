"use client";
import { motion } from "framer-motion";
import SoftwareLogo from "./SoftwareLogo";

export default function Hero() {
  return (
    <div className="relative h-screen overflow-hidden hero-gradient">
      {/* Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[55%_45%] h-full">
        {/* Left side content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center px-6 sm:px-8 lg:px-16 xl:px-20"
        >
          <h1 className="m-0 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[0.9] tracking-tight text-gray-900 font-display">
            Your idea
            <br />
            deserves
            <br />
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background:
                  "linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              better code
            </motion.span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-xl text-gray-600 max-w-lg mt-6 sm:mt-8 font-light leading-relaxed">
            Small team. Big ideas. We build software that people 
            actually want to use.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-8 sm:mt-10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-900 text-white px-8 py-3 rounded-sm text-sm font-medium hover:bg-gray-800 transition-colors duration-200 w-full sm:w-auto"
            >
              Work with us
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-gray-700 text-sm font-medium hover:text-orange-600 transition-colors duration-200 flex items-center gap-2 group"
            >
              See what we've made
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                <path
                  d="M6 3L11 8L6 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Right side: Lottie animation (hidden on mobile and small tablets) */}
        <div className="relative h-full hidden lg:block">
          <div className="w-full h-full object-cover">
            {/* Client component to render the Lottie animation */}
            <SoftwareLogo scale={0.8} />
          </div>
        </div>
      </div>
    </div>
  );
}