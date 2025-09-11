"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const faqRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [openIndex, setOpenIndex] = useState(0); // Primera pregunta abierta

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const faq = faqRef.current;
    if (!faq) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: faq,
        start: "top 80%",
      },
    });

    tl.from(".faq-h1", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    }).from(
      ".faq-item",
      {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6"
    );
  }, [mounted]);

  const faqs = [
    {
      question: "What services do you provide?",
      answer:
        "We provide end-to-end software development, from initial concept to deployment and ongoing support.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary depending on complexity, but most small to medium projects take 6-12 weeks.",
    },
    {
      question: "Do you offer post-launch support?",
      answer:
        "Yes, we provide maintenance and support packages to ensure your product runs smoothly.",
    },
    {
      question: "Can you work with existing teams?",
      answer:
        "Absolutely. We integrate with your team seamlessly, providing technical expertise where needed.",
    },
  ];

  return (
    <section
      ref={faqRef}
      className="relative py-32 overflow-hidden bg-white"
    >
      <div className="max-w-5xl mx-auto px-6 space-y-16">
        {/* Header */}
        <div className="text-center">
          <h1 className="faq-h1 m-0 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[0.9] tracking-tight text-gray-900 font-display">
            Frequently Asked
            <br />
            <span
              className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 100%" }}
            >
              Questions
            </span>
          </h1>
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = i === openIndex;
            return (
              <div
                key={i}
                className="faq-item border-l-2 border-gray-200 pl-6 py-4 hover:border-orange-500 transition-colors duration-300 cursor-pointer"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-xl font-bold text-gray-900">
                    {faq.question}
                  </h4>
                  <svg
                    className={`w-5 h-5 text-gray-600 transform transition-transform duration-300 ${
                      isOpen ? "rotate-90 text-orange-500" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                {isOpen && (
                  <p className="text-gray-600 font-light leading-relaxed mt-3">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
