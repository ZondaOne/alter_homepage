"use client";
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopArrow() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Scroll to Top Arrow */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          // Move the arrow above the WhatsApp button to avoid overlap and keep it on top
          className="fixed bottom-20 right-6 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl z-[3000] group"
          aria-label="Scroll to top"
        >
          <ArrowUp 
            size={24} 
            className="group-hover:-translate-y-1 transition-transform duration-200" 
          />
        </button>
      )}
    </>
  );
}