"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import Logo from "../Logo";
import Link from "next/link";


const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setActiveDropdown] = useState<string | null>(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const loaderTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle navigation from other pages to home with scroll
  useEffect(() => {
    if (pathname === "/" && isNavigating) {
      const sectionId = sessionStorage.getItem("scrollToSection");
      if (sectionId) {
        // Add a longer delay to ensure the page is fully loaded
        const timeoutId = setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
          sessionStorage.removeItem("scrollToSection");
          setIsNavigating(false); // Reset navigation state
        }, 300); // Increased delay

        return () => clearTimeout(timeoutId);
      } else {
        setIsNavigating(false);
      }
    }
  }, [pathname, isNavigating]);

  // Reset states when pathname changes and handle navigation completion
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setIsLangMenuOpen(false);
    
    // Reset navigation state when we reach the home page
    if (pathname === "/" && isNavigating) {
      // Keep isNavigating true until scrolling is complete
      // This will be handled by the scroll effect
    } else {
      setIsNavigating(false);
    }
  }, [pathname, isNavigating]);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);

    if (pathname === "/") {
      // Already on home - just scroll, no loader
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Coming from another page - show loader and navigate
    
      sessionStorage.setItem("scrollToSection", sectionId);
      
      // Clear any existing timeouts
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
      if (loaderTimeoutRef.current) {
        clearTimeout(loaderTimeoutRef.current);
      }
      
      // Set states in the right order
      setIsNavigating(true);
      setShowLoader(true);
      
      // Navigate after a short delay
      navigationTimeoutRef.current = setTimeout(() => {
       
        router.push("/");
      }, 100);

      // Hide loader after minimum duration (independent of Loader component)
      loaderTimeoutRef.current = setTimeout(() => {
        
        setShowLoader(false);
      }, 2000); // 2 seconds minimum
    }
  };

  const scrollToProducts = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    const targetId = window.innerWidth < 768 ? "gallery-section" : "macbook-section";

    if (pathname === "/") {
      // Already on home - just scroll, no loader
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Coming from another page - show loader and navigate
      
      sessionStorage.setItem("scrollToSection", targetId);
      
      // Clear any existing timeouts
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
      if (loaderTimeoutRef.current) {
        clearTimeout(loaderTimeoutRef.current);
      }
      
      // Set states in the right order
      setIsNavigating(true);
      setShowLoader(true);
      
      // Navigate after a short delay
      navigationTimeoutRef.current = setTimeout(() => {
    
        router.push("/");
      }, 100);

      // Hide loader after minimum duration (independent of Loader component)
      loaderTimeoutRef.current = setTimeout(() => {
     
        setShowLoader(false);
      }, 2000); // 2 seconds minimum
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };



  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debug effect to monitor showLoader state
  useEffect(() => {
   
  }, [showLoader]);

  return (
    <>
   
      <AnimatePresence mode="wait">
        {showLoader && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] bg-white"
          >
            {/* Primary fallback loader */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading...</p>
              </div>
            </div>
            
          
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <motion.nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full h-16 z-[1000] flex items-center transition-all duration-300 ease-in-out border-b ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            : "bg-transparent border-transparent"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full h-full max-w-[1440px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            disabled={isNavigating}
            className={`flex items-center py-2 px-3 group transition-all duration-300 ease-in-out cursor-pointer hover:opacity-80 ${
              isNavigating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className="w-10 h-10 flex items-center justify-center transform transition-transform duration-300 ease-in-out group-hover:scale-110">
              <Logo />
            </div>
            <div className="overflow-hidden ml-2">
              <span
                className="text-lg text-[color:var(--foreground)] whitespace-nowrap block transform transition-all duration-300 ease-out lg:-translate-x-5 lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100 translate-x-0 opacity-100"
                style={{ fontFamily: "AwareBold, sans-serif" }}
              >
                ZONDA
              </span>
            </div>
          </button>

          {/* Desktop nav items */}
          <div className="flex-1 ml-10 hidden lg:flex items-center gap-8">
            {[
              { key: "Home", label: t("home"), sectionId: "hero" },
              { key: "products", label: t("products"), isProductsLink: true },
              { key: "consulting", label: t("consulting"), sectionId: "consulting" },
              { key: "support", label: t("support"), sectionId: "support" },
              { key: "about", label: t("about"), sectionId: "about" },
              { key: "blog", label: t("Blog"), href: "/blog" },
            ].map((item) => (
              <div key={item.key} className="relative">
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`relative text-[15px] font-normal text-gray-800 py-2 px-1 transition-colors duration-200 hover:text-[color:var(--color-accent)] flex items-center gap-1 group ${
                      isNavigating ? 'pointer-events-none opacity-50' : ''
                    }`}
                  >
                    {item.label}
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[color:var(--color-accent)] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      if (item.isProductsLink) {
                        scrollToProducts();
                      } else if (item.sectionId) {
                        scrollToSection(item.sectionId);
                      }
                    }}
                    disabled={isNavigating}
                    className={`relative text-[15px] font-normal text-gray-800 py-2 px-1 transition-colors duration-200 hover:text-[color:var(--color-accent)] flex items-center gap-1 group cursor-pointer ${
                      isNavigating ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {item.label}
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[color:var(--color-accent)] transition-all duration-300 group-hover:w-full"></span>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-4 relative">
            {/* Language selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                disabled={isNavigating}
                className={`flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 shadow-md ${
                  isNavigating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Globe2 size={20} className="text-white" />
              </button>

              <AnimatePresence>
                {isLangMenuOpen && mounted && !isNavigating && (
                  <motion.div
                    className="absolute top-full right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg flex flex-col z-[2000] overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {["en", "es", "it"]
                      .filter((lng) => lng !== i18n.language)
                      .map((lng) => (
                        <button
                          key={lng}
                          onClick={() => changeLanguage(lng)}
                          className="px-4 py-2 text-sm text-left hover:bg-gray-50"
                        >
                          {t(`languages.${lng}`)}
                        </button>
                      ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA button */}
            <button
              className={`bg-neutral-900 text-white py-2 px-4 rounded-sm text-sm font-medium transition-transform duration-200 hover:scale-105 cursor-pointer ${
                isNavigating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isNavigating}
              onClick={() => scrollToSection("contact")}
            >
              {mounted ? t("workWithUs") : " "}
            </button>
          </div>

          {/* Mobile menu toggle */}
          <motion.button
            className={`lg:hidden text-gray-700 ${
              isNavigating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isNavigating}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && !isNavigating && (
          <motion.div
            className="fixed top-16 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg z-[999] lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="max-w-[1440px] mx-auto px-6 py-4">
              <div className="flex flex-col space-y-1">
                {[
                  { key: "home", label: t("Home"), href: "/" },
                  { key: "products", label: t("products"), isProductsLink: true },
                  { key: "consulting", label: t("consulting"), sectionId: "consulting" },
                  { key: "support", label: t("support"), sectionId: "support" },
                  { key: "blog", label: t("Blog"), href: "/blog" },
                  { key: "about", label: t("about"), sectionId: "about" },
                ].map((item) => (
                  <div key={item.key} className="border-b border-gray-100 last:border-b-0">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="w-full text-left py-3 text-base font-medium text-gray-800 hover:text-[color:var(--color-accent)] transition-colors duration-200 flex items-center justify-between"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {mounted ? item.label : " "}
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          if (item.isProductsLink) {
                            scrollToProducts();
                          } else if (item.sectionId) {
                            scrollToSection(item.sectionId);
                          }
                        }}
                        className="w-full text-left py-3 text-base font-medium text-gray-800 hover:text-[color:var(--color-accent)] transition-colors duration-200 flex items-center justify-between cursor-pointer"
                      >
                        {mounted ? item.label : " "}
                      </button>
                    )}
                  </div>
                ))}

                {/* Mobile language selector */}
                <div className="border-b border-gray-100 pb-3 pt-2">
                  <button
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    className="w-full text-left py-3 text-base font-medium text-gray-800 hover:text-[color:var(--color-accent)] transition-colors duration-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Globe2 size={20} className="text-orange-500" />
                      <span>{t("Language")}</span>
                    </div>
                    <svg
                      className={`w-5 h-5 transition-transform duration-200 ease-in-out ${
                        isLangMenuOpen ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4.5 6L8 9.5L11.5 6" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {isLangMenuOpen && mounted && (
                      <motion.div
                        className="bg-gray-50 rounded-md mt-2 overflow-hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {["en", "es", "it"]
                          .filter((lng) => lng !== i18n.language)
                          .map((lng) => (
                            <button
                              key={lng}
                              onClick={() => changeLanguage(lng)}
                              className="w-full text-left py-2.5 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-[color:var(--color-accent)] transition-all"
                            >
                              {t(`languages.${lng}`)}
                            </button>
                          ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile CTA button */}
                <div className="pt-2">
                  <button
                    className="w-full bg-neutral-900 text-white py-3 px-4 rounded-md text-base font-medium transition-colors duration-200 hover:bg-neutral-800"
                    onClick={() => scrollToSection("contact")}
                  >
                    {mounted ? t("workWithUs") : " "}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/20 z-[900] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;