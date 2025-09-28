"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import Logo from "../Logo";
import Link from "next/link";
import Loader from "../Loader";

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setActiveDropdown] = useState<string | null>(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mostrar loader si venimos de otra página
  useEffect(() => {
    const previousPath = sessionStorage.getItem("previousPath");
    if (previousPath && previousPath !== "/" && pathname === "/") {
      setShowLoader(true);
    }
    sessionStorage.setItem("previousPath", pathname);
  }, [pathname]);

  const navigateToSection = (sectionId: string) => {
  setIsMobileMenuOpen(false);
  setActiveDropdown(null);

  if (pathname === "/") {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  } else {
    sessionStorage.setItem("scrollToSection", sectionId);
    setShowLoader(true); // siempre activamos loader
    router.push("/"); 
  }
};




  const scrollToProjects = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    const targetId = window.innerWidth < 768 ? "gallery-section" : "macbook-section";

    if (pathname === "/") {
      const element = document.getElementById(targetId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      sessionStorage.setItem("scrollToSection", targetId);
      router.push("/");
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

  return (
    <>
      {/* Loader */}
      <AnimatePresence>
        {showLoader && (
          <Loader
            onLoadingComplete={() => {
              const sectionId = sessionStorage.getItem("scrollToSection");
              if (sectionId) {
                const element = document.getElementById(sectionId);
                if (element) element.scrollIntoView({ behavior: "smooth" });
                sessionStorage.removeItem("scrollToSection");
              }
              setShowLoader(false);
            }}
          />
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
            onClick={() => navigateToSection("hero")}
            className="flex items-center py-2 px-3 group transition-all duration-300 ease-in-out cursor-pointer"
          >
            <div className="w-10 h-10 flex items-center justify-center transform transition-transform duration-300 ease-in-out group-hover:scale-110">
              <Logo />
            </div>
            <div className="overflow-hidden ml-2">
              <span
                className="text-base text-[color:var(--foreground)] whitespace-nowrap block transform -translate-x-5 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
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
                    className="relative text-[15px] font-normal text-gray-800 py-2 px-1 transition-colors duration-200 hover:text-[color:var(--color-accent)] flex items-center gap-1 group"
                  >
                    {item.label}
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[color:var(--color-accent)] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.isProductsLink) scrollToProjects();
                      else if (item.sectionId) navigateToSection(item.sectionId);
                    }}
                    className="relative text-[15px] font-normal text-gray-800 py-2 px-1 transition-colors duration-200 hover:text-[color:var(--color-accent)] flex items-center gap-1 group"
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
                className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 shadow-md"
              >
                <Globe2 size={20} className="text-white" />
              </button>

              <AnimatePresence>
                {isLangMenuOpen && mounted && (
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
              className="bg-neutral-900 text-white py-2 px-4 rounded-sm text-sm font-medium transition-transform duration-200 hover:scale-105"
              onClick={() => navigateToSection("contact")}
            >
              {mounted ? t("workWithUs") : " "}
            </button>
          </div>

          {/* Mobile menu toggle */}
          <motion.button
            className="lg:hidden text-gray-700"
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
        {isMobileMenuOpen && (
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
                  { key: "products", label: t("products"), isProductsLink: true },
                  { key: "consulting", label: t("consulting") },
                  { key: "support", label: t("support") },
                  { key: "blog", label: t("blog") },
                  { key: "about", label: t("about") },
                ].map((item) => (
                  <div key={item.key} className="border-b border-gray-100 last:border-b-0">
                    <button
                      onClick={() => {
                        if (item.isProductsLink) scrollToProjects();
                        else navigateToSection(item.key);
                      }}
                      className="w-full text-left py-3 text-base font-medium text-gray-800 hover:text-[color:var(--color-accent)] transition-colors duration-200 flex items-center justify-between"
                    >
                      {mounted ? item.label : " "}
                    </button>
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
                      <span>{t("language")}</span>
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
                    onClick={() => navigateToSection("contact")}
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
