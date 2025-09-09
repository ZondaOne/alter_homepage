"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div
      className="relative h-[calc(100vh-5rem)] overflow-hidden"
      style={{
        backgroundColor: "#fff",
      }}
    >
      {/* Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[50%_50%] h-full">
        {/* Left side content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center max-w-2xl px-8 lg:px-16"
        >
          <h1 className="m-0 text-5xl lg:text-7xl font-light leading-[1.1] tracking-tight text-gray-900">
            Technology
            <br />
            that dares to
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
              delight
            </motion.span>
          </h1>

          <p className="text-lg lg:text-xl text-gray-600 max-w-xl mt-6 font-light leading-relaxed">
            Transforming ideas into impact with tailored strategies and digital
            solutions.
          </p>

          {/* CTA */}
          <div className="flex items-center gap-6 mt-10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-900 text-white px-8 py-3 rounded-sm text-base font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Get Started
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-gray-900 text-base font-medium hover:text-orange-600 transition-colors duration-200 flex items-center gap-2 group"
            >
              Learn more
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                <path
                  d="M6 3L11 8L6 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Right side image - occupying full gray area */}
          <div className="relative h-full">
          <img
            src="https://i.imgur.com/jlsyzoe.png"
            alt="Vertical mockup"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}