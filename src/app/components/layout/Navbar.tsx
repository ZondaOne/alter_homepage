"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import Logo from "../Logo";

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

  return (
    <>
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
            onClick={() => navigateToSection("home")}
            className="flex items-center gap-2 py-2 px-3"
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <Logo />
            </div>
            <span className="text-base font-semibold text-[color:var(--foreground)]">
              ZONDA
            </span>
          </button>

          {/* Nav items */}
          <div className="flex-1 ml-10 hidden lg:flex items-center gap-8">
            {[
              { key: "products", label: t("products"), dropdown: true },
              { key: "consulting", label: t("consulting") },
              { key: "support", label: t("support"), dropdown: true },
              { key: "about", label: t("about") },
            ].map((item) => (
              <div key={item.key} className="relative">
                <button
                  onClick={() =>
                    item.dropdown
                      ? handleDropdownToggle(item.key)
                      : navigateToSection(item.key)
                  }
                  className="relative text-[15px] font-normal text-gray-800 py-2 px-1 transition-colors duration-200 hover:text-[color:var(--color-accent)] flex items-center gap-1 group"
                >
                  {mounted ? item.label : " "}
                  {item.dropdown && (
                    <svg
                      className={`w-5 h-5 transition-transform duration-200 ease-in-out ${
                        activeDropdown === item.key ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5} // flecha más gorda
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4.5 6L8 9.5L11.5 6" />
                    </svg>
                  )}

                  {/* underline hover */}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[color:var(--color-accent)] transition-all duration-300 group-hover:w-full"></span>
                </button>

                {/* Dropdowns */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.key && mounted && (
                    <motion.div
                      className="absolute top-full left-0 min-w-[220px] bg-white border border-gray-200 shadow-lg rounded-md mt-1.5 z-[2000] flex flex-col overflow-hidden"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.key === "products" && (
                        <>
                          <button
                            onClick={() => navigateToSection("products")}
                            className="py-2.5 px-4 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-[color:var(--color-accent)] transition-all"
                          >
                            {t("allProducts")}
                          </button>
                          <button
                            onClick={() => navigateToSection("solutions")}
                            className="py-2.5 px-4 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-[color:var(--color-accent)] transition-all"
                          >
                            {t("solutions")}
                          </button>
                          <button
                            onClick={() => navigateToSection("services")}
                            className="py-2.5 px-4 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-[color:var(--color-accent)] transition-all"
                          >
                            {t("services")}
                          </button>
                        </>
                      )}

                      {item.key === "support" && (
                        <>
                          <button
                            onClick={() => navigateToSection("support")}
                            className="py-2.5 px-4 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-[color:var(--color-accent)] transition-all"
                          >
                            {t("helpCenter")}
                          </button>
                          <button
                            onClick={() => navigateToSection("documentation")}
                            className="py-2.5 px-4 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-[color:var(--color-accent)] transition-all"
                          >
                            {t("documentation")}
                          </button>
                          <button
                            onClick={() => navigateToSection("community")}
                            className="py-2.5 px-4 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-[color:var(--color-accent)] transition-all"
                          >
                            {t("community")}
                          </button>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
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

      {/* Overlay to close dropdown */}
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
