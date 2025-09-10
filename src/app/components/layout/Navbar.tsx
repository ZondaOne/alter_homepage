"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import Logo from "../Logo";

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    if (pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${sectionId}`);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-200 z-[1000] flex items-center transition-all duration-300 ease-in-out ${
          isScrolled ? "shadow-[0_2px_6px_rgba(0,0,0,0.05)]" : ""
        }`}
        ref={navRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full h-full max-w-[1440px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => navigateToSection("home")}
              className="flex flex-row items-center gap-2 bg-none border-none py-2 px-3 cursor-pointer transition-all duration-300 ease-in-out"
            >
              <div className="w-10 h-10 flex items-center justify-center transition-all duration-300 ease-in-out [&>*]:!text-[color:var(--color-accent)] [&>*]:!fill-[color:var(--color-accent)] [&>*]:!stroke-[color:var(--color-accent)]">
                <Logo />
              </div>
              <span className="text-base font-semibold text-[color:var(--foreground)] tracking-[0.01em] font-aware-bold">
                ZONDA
              </span>
            </button>
          </div>

          <div className="flex-1 ml-10 hidden lg:block">
            <div className="flex items-center gap-6">
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle("products")}
                  className="relative text-[15px] font-normal bg-none border-none cursor-pointer text-gray-800 py-2 px-1 transition-colors duration-200 ease-in-out hover:text-[color:var(--color-accent)] flex items-center gap-1"
                >
                  Products
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ease-in-out ${
                      activeDropdown === "products" ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M4.5 6L8 9.5L11.5 6H4.5Z" />
                  </svg>
                </button>
                <AnimatePresence>
                  {activeDropdown === "products" && (
                    <motion.div
                      className="absolute top-full left-0 min-w-[220px] bg-white border border-gray-300 shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded mt-1.5 z-[2000] flex flex-col"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        onClick={() => navigateToSection("products")}
                        className="py-2.5 px-4 text-left text-sm cursor-pointer text-gray-700 transition-all duration-200 ease-in-out hover:bg-gray-100 hover:text-[color:var(--color-accent)]"
                      >
                        All Products
                      </button>
                      <button
                        onClick={() => navigateToSection("solutions")}
                        className="py-2.5 px-4 text-left text-sm cursor-pointer text-gray-700 transition-all duration-200 ease-in-out hover:bg-gray-100 hover:text-[color:var(--color-accent)]"
                      >
                        Solutions
                      </button>
                      <button
                        onClick={() => navigateToSection("services")}
                        className="py-2.5 px-4 text-left text-sm cursor-pointer text-gray-700 transition-all duration-200 ease-in-out hover:bg-gray-100 hover:text-[color:var(--color-accent)]"
                      >
                        Services
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => navigateToSection("consulting")}
                className="relative text-[15px] font-normal cursor-pointer text-gray-800 py-2 px-1 transition-colors duration-200 ease-in-out hover:text-[color:var(--color-accent)]"
              >
                Consulting
              </button>

              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle("support")}
                  className="relative text-[15px] font-normal cursor-pointer text-gray-800 py-2 px-1 transition-colors duration-200 ease-in-out hover:text-[color:var(--color-accent)] flex items-center gap-1"
                >
                  Support
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ease-in-out ${
                      activeDropdown === "support" ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M4.5 6L8 9.5L11.5 6H4.5Z" />
                  </svg>
                </button>
                <AnimatePresence>
                  {activeDropdown === "support" && (
                    <motion.div
                      className="absolute top-full left-0 min-w-[220px] bg-white border border-gray-300 shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded mt-1.5 z-[2000] flex flex-col"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        onClick={() => navigateToSection("support")}
                        className="py-2.5 px-4 text-left text-sm cursor-pointer text-gray-700 transition-all duration-200 ease-in-out hover:bg-gray-100 hover:text-[color:var(--color-accent)]"
                      >
                        Help Center
                      </button>
                      <button
                        onClick={() => navigateToSection("documentation")}
                        className="py-2.5 px-4 text-left text-sm cursor-pointer text-gray-700 transition-all duration-200 ease-in-out hover:bg-gray-100 hover:text-[color:var(--color-accent)]"
                      >
                        Documentation
                      </button>
                      <button
                        onClick={() => navigateToSection("community")}
                        className="py-2.5 px-4 text-left text-sm cursor-pointer text-gray-700 transition-all duration-200 ease-in-out hover:bg-gray-100 hover:text-[color:var(--color-accent)]"
                      >
                        Community
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => navigateToSection("about")}
                className="relative text-[15px] font-normal cursor-pointer text-gray-800 py-2 px-1 transition-colors duration-200 ease-in-out hover:text-[color:var(--color-accent)]"
              >
                About
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button className="cursor-pointer text-gray-600 transition-colors duration-200 ease-in-out hover:text-[color:var(--color-accent)]">
              <Globe size={18} />
            </button>
            <button
              className="btn-accent py-2 px-4 rounded-sm text-sm font-medium cursor-pointer transition-colors duration-200 ease-in-out"
              onClick={() => navigateToSection("contact")}
            >
              Work with us
            </button>
          </div>

          <button
            className="lg:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden bg-white border-t border-gray-300 p-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigateToSection("home")}
                  className="text-left text-base py-2 text-gray-800"
                >
                  Home
                </button>
                <button
                  onClick={() => navigateToSection("products")}
                  className="text-left text-base py-2 text-gray-800"
                >
                  Products
                </button>
                <button
                  onClick={() => navigateToSection("consulting")}
                  className="text-left text-base py-2 text-gray-800"
                >
                  Consulting
                </button>
                <button
                  onClick={() => navigateToSection("support")}
                  className="text-left text-base py-2 text-gray-800"
                >
                  Support
                </button>
                <button
                  onClick={() => navigateToSection("about")}
                  className="text-left text-base py-2 text-gray-800"
                >
                  About
                </button>
                <div className="mt-3">
                  <button
                    className="btn-accent py-2.5 px-3.5 rounded-sm text-[15px] cursor-pointer"
                    onClick={() => navigateToSection("contact")}
                  >
                    Work with us
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {activeDropdown && (
        <div
          className="fixed top-16 left-0 w-full h-[calc(100vh-64px)] bg-transparent z-[100]"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </>
  );
};

export default Navbar;
