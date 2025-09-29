"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const InteractiveBlobsSection: React.FC = () => {
  const { t } = useTranslation();
  const mainRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const blobContainerRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const typingH3Ref = useRef<HTMLHeadingElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const [displayedText, setDisplayedText] = useState<WordData[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Define the type for word data
  interface WordData {
    word: string;
    isLast: boolean;
    shouldBreak: boolean;
    style: React.CSSProperties;
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track if typing animation has been completed to prevent re-triggering
  const [typingCompleted, setTypingCompleted] = useState(false);
  const [typingTriggered, setTypingTriggered] = useState(false);

  // Typing effect function
  const startTypingEffect = () => {
    if (!mounted || isTyping || typingCompleted || typingTriggered) return;
    
    setTypingTriggered(true);
    const fullText = `${t("card.fromConcept")} ${t("card.toCode")}`;
    const words = fullText.split(" ");
    const isEnglish = fullText.includes("Code");
    
    // Pre-determine styles for each word based on complete text
    const wordsWithStyles: WordData[] = words.map((word, idx) => {
      const isLast = idx === words.length - 1;
      const shouldBreak = isEnglish && word.toLowerCase() === "to";
      
      return {
        word,
        isLast,
        shouldBreak,
        style: isLast ? {
          color: "transparent",
          backgroundImage: "linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "gradient-flow 3s ease-in-out infinite",
          backgroundClip: "text",
        } : {}
      };
    });
    
    setIsTyping(true);
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    const revealedWords: WordData[] = [];
    
    const typeNextChar = () => {
      if (currentWordIndex < wordsWithStyles.length) {
        const currentWordData = wordsWithStyles[currentWordIndex];
        const currentWord = currentWordData.word;
        
        if (currentCharIndex < currentWord.length) {
          // Type character by character for current word
          const partialWord = currentWord.substring(0, currentCharIndex + 1);
          const tempWords: WordData[] = [...revealedWords];
          tempWords[currentWordIndex] = { ...currentWordData, word: partialWord };
          setDisplayedText(tempWords);
          currentCharIndex++;
          setTimeout(typeNextChar, 150); // Faster typing: 110ms per character
        } else {
          // Finished current word
          revealedWords[currentWordIndex] = currentWordData;
          setDisplayedText([...revealedWords]);
          currentWordIndex++;
          currentCharIndex = 0;
          setTimeout(typeNextChar, 120); // Shorter pause between words: 100ms
        }
      } else {
        // Finished typing
        setIsTyping(false);
        setTypingCompleted(true);
      }
    };
    
    // Start typing immediately when triggered
    typeNextChar();
  };

  const renderTypingText = (wordsData: WordData[]) => {
    if (!wordsData || wordsData.length === 0) return null;
    
    return wordsData.map((wordData, idx) => {
      if (!wordData) return null;
      
      const { word, isLast, shouldBreak, style } = wordData;
      
      return (
        <React.Fragment key={idx}>
          {shouldBreak && <br />}
          <span
            className={`inline-block px-2 mx-1 mb-2 bg-orange-100 ${
              isLast ? "" : "text-gray-800"
            }`}
            style={style}
          >
            {word}
          </span>
        </React.Fragment>
      );
    });
  };

  // GSAP animations useEffect - removed 't' from dependencies
  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      const blobs = gsap.utils.toArray<HTMLElement>(".blob");
      const logoPaths = gsap.utils.toArray<SVGPathElement>(".logo-path");
      const textElements = gsap.utils.toArray<HTMLElement>(".text-element");
      const cardElements = gsap.utils.toArray<HTMLElement>(".card-element");

      gsap.set(blobs, { scale: 0.8, autoAlpha: 0.3 });
      gsap.set(logoRef.current, { scale: 0.6, autoAlpha: 0, y: 30 });
      gsap.set(logoPaths, { scale: 0.8, autoAlpha: 0, transformOrigin: "center center" });
      gsap.set(textElements, { x: 50, autoAlpha: 0 });
      gsap.set(cardElements, { y: 30, autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top 105%",
          toggleActions: "play none none none",
        },
      });

      tl.to(blobs, {
        scale: 1,
        autoAlpha: 0.9,
        stagger: 0.15,
        duration: 1.5,
        ease: "power2.out",
      })
        .to(
          logoRef.current,
          { scale: 1, autoAlpha: 1, y: 0, ease: "back.out(1.2)", duration: 1.2 },
          "-=1"
        )
        .to(
          logoPaths,
          { scale: 1, autoAlpha: 1, stagger: { each: 0.08, from: "center" }, ease: "back.out(1.1)", duration: 1 },
          "-=1"
        )
        .to(
          textElements,
          { x: 0, autoAlpha: 1, stagger: 0.12, ease: "power2.out", duration: 0.8 },
          "-=0.8"
        )
        .to(
          cardElements,
          { y: 0, autoAlpha: 1, stagger: 0.1, ease: "power2.out", duration: 0.8 },
          "-=0.6"
        );

      // Separate ScrollTrigger specifically for the typing animation
      ScrollTrigger.create({
        trigger: typingH3Ref.current,
        start: "top 80%", // Trigger when the h3 element is 80% into the viewport
        toggleActions: "play none none none",
        onEnter: () => {
          // Small delay to ensure the element is visible
          setTimeout(startTypingEffect, 200);
        }
      });

    }, mainRef);

    return () => ctx.revert();
  }, [mounted]); // Remove 't' to prevent GSAP animations from re-running

  // Handle typing effect restart when language changes (only if not completed)
  useEffect(() => {
    if (mounted && typingCompleted) {
      // Reset typing states when language changes
      setDisplayedText([]);
      setIsTyping(false);
      setTypingCompleted(false);
      setTypingTriggered(false);
    }
  }, [t, mounted]);

  const renderGrayBackgroundText = (text: string) => {
    const words = text.split(" ");
    const isEnglish = text.includes("Code");
    
    return words.map((word, idx) => {
      const isLast = idx === words.length - 1;
      const shouldBreak = isEnglish && word.toLowerCase() === "to";
      
      return (
        <React.Fragment key={idx}>
          {shouldBreak && <br />}
          <span
            className={`inline-block px-2 mx-1 mb-2 bg-orange-100 ${
              isLast ? "" : "text-gray-800"
            }`}
            style={
              isLast
                ? {
                    color: "transparent",
                    backgroundImage:
                      "linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "gradient-flow 3s ease-in-out infinite",
                    backgroundClip: "text",
                  }
                : {}
            }
          >
            {word}
          </span>
        </React.Fragment>
      );
    });
  };

  return (
    <section
      id="about"
      ref={mainRef}
      className="hidden md:flex relative min-h-screen items-center justify-center overflow-hidden bg-cream-base px-8 py-16"
    >
      <div className="grain-overlay" />
      <div className="container mx-auto space-y-16 relative z-10">
        {/* Header Text */}
        <div className="max-w-4xl mx-auto text-center">
          <div ref={textRef} className="flex flex-col justify-center space-y-6 text-gray-800">
            <h2 className="hero-h1 m-0 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[0.9] tracking-tight text-gray-900 font-display mb-8">
              <span className="hero-gradient-text text-element" style={{
                background: "linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradient-flow 3s ease-in-out infinite"
              }}>
                {mounted ? t("interactiveBlobs.hash") : ""}
              </span>
              <span className="hero-line text-element">{mounted ? t("interactiveBlobs.weAre") : ""}</span>
              <span className="hero-gradient-text text-element" style={{
                background: "linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradient-flow 3s ease-in-out infinite",
                animationDelay: "0.5s"
              }}>
                {mounted ? t("interactiveBlobs.zonda") : ""}
              </span>
            </h2>
            <p className="text-xl text-element max-w-2xl mx-auto">{mounted ? t("interactiveBlobs.description1") : ""}</p>
          </div>
        </div>

        {/* Enhanced Card Section  */}
        <div ref={cardRef} className="max-w-8xl mx-auto">
          <div 
            ref={cardInnerRef}
            className="relative overflow-hidden card-element"
            style={{ boxShadow: 'none' }}
          >            
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] relative z-10">
              {/* Content Side */}
              <div className="content-side p-8 lg:p-12 flex flex-col justify-center space-y-8 relative">                
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h3 
                      ref={typingH3Ref}
                      className="text-4xl lg:text-5xl xl:text-8xl font-bold leading-tight tracking-tight font-display typing-container"
                    >
                      {mounted && (typingCompleted ? 
                        renderGrayBackgroundText(`${t("card.fromConcept")} ${t("card.toCode")}`) :
                        (displayedText.length > 0 && renderTypingText(displayedText))
                      )}
                      <span className={`typing-cursor ${typingCompleted ? 'blink' : ''}`}>|</span>

                    </h3>

                    <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                      {mounted ? t("card.digitalSolutionsDescription") : ""}
                    </p>
                  </div>
                </div>
              </div>

              {/* Blob & Logo Side - Sin recuadros ni sombras */}
              <div ref={blobContainerRef} className="relative overflow-hidden flex items-center justify-center min-h-[500px]">
                <div className="absolute inset-0 z-0">
                  <div className="blob blob1" style={{ "--color1": "rgba(249,115,22,0.8)", "--color2": "rgba(251,146,60,0.5)", "--color3": "rgba(234,88,12,0.6)" } as React.CSSProperties} />
                  <div className="blob blob2" style={{ "--color1": "rgba(234,88,12,0.7)", "--color2": "rgba(249,115,22,0.4)", "--color3": "rgba(194,65,12,0.5)" } as React.CSSProperties} />
                  <div className="blob blob3" style={{ "--color1": "rgba(251,146,60,0.6)", "--color2": "rgba(249,115,22,0.5)", "--color3": "rgba(234,88,12,0.4)" } as React.CSSProperties} />
                </div>
                
                <div className="relative z-10">
                  <svg ref={logoRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className="w-56 h-56 lg:w-64 lg:h-64 glow-effect">
                    <path className="logo-path" d="M 88.478 186.141 L 147.278 101.441 L 257.616 101.606 L 316.242 186.175 L 88.478 186.141 Z" fill="#fff" />
                    <path className="logo-path" d="M 151.162 214.519 L 254.816 214.785 L 123.855 401.854 L 88.385 304.265 L 151.162 214.519 Z" fill="#fff" />
                    <path className="logo-path" d="M 375.69 100 L 412.058 198.385 L 348.108 288.629 L 243.925 288.629 L 375.69 100 Z" fill="#fff" />
                    <path className="logo-path" d="M 183.137 316.443 L 410.625 316.222 L 353.087 400.362 L 241.446 400.15 L 183.137 316.443 Z" fill="#fff" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Clean Styles  */}
      <style jsx global>{`
        .blob-side {
          position: relative;
        }
        
        .blob { 
          position: absolute; 
          top: 50%; 
          left: 50%; 
          transform: translate(-50%,-50%); 
          mix-blend-mode: multiply; 
          background: radial-gradient(ellipse at 30% 20%, var(--color1) 0%, var(--color2) 35%, var(--color3) 60%, transparent 85%); 
          will-change: transform,border-radius; 
          opacity: 0.8; 
        }
        
        .blob1 { 
          width: 370px;
          height: 370px;
          animation: morph-gentle 14s ease-in-out infinite; 
        }
        
        .blob2 { 
          width: 370px;
          height: 370px;
          animation: morph-gentle 11s ease-in-out infinite reverse; 
          animation-delay: -3s;
        }
        
        .blob3 { 
          width: 370px;
          height: 370px;
          animation: morph-gentle 18s ease-in-out infinite; 
          animation-delay: -7s;
        }
        
        @keyframes morph-gentle {
          0% {
            border-radius: 55% 45% 35% 65% / 55% 35% 65% 45%; 
            transform: translate(-50%,-50%) rotate(0deg);
          }
          25% {
            border-radius: 45% 55% 45% 35% / 65% 45% 55% 35%; 
            transform: translate(-50%,-50%) rotate(90deg) scale(1.02);
          }
          50% {
            border-radius: 35% 55% 65% 45% / 45% 55% 35% 55%; 
            transform: translate(-50%,-50%) rotate(180deg) scale(0.98);
          }
          75% {
            border-radius: 65% 35% 45% 55% / 35% 65% 45% 55%; 
            transform: translate(-50%,-50%) rotate(270deg) scale(1.01);
          }
          100% {
            border-radius: 55% 45% 35% 65% / 55% 35% 65% 45%; 
            transform: translate(-50%,-50%) rotate(360deg) scale(1);
          } 
        }
        
        .glow-effect { 
          filter: drop-shadow(0 0 25px rgba(249,115,22,0.55)); 
        }
        
        .logo-path, .text-element, .card-element { 
          will-change: transform, opacity; 
        }
        
        /* Typing effect styles */
        .typing-container {
          min-height: 1em;
          position: relative;
        }
        
        .typing-cursor {
          display: inline-block;
          margin-left: 2px;
          color: #b4b4b462;
          font-weight: normal;
          font-size: 1em;
        }
        
        .typing-cursor.blink {
          animation: cursor-blink 1.5s infinite;
        }
        
        .typing-cursor.hidden {
          opacity: 0;
        }
        
        @keyframes cursor-blink {
          0%, 60% { opacity: 1; }
          61%, 100% { opacity: 0; }
        }
        
        /* Eliminar cualquier sombra por defecto */
        .card-element {
          box-shadow: none !important;
        }
        
        @media (max-width: 1024px) {
          .content-side {
            clip-path: none;
          }
        }
      `}</style>
    </section>
  );
};

export default InteractiveBlobsSection;