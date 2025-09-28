"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function BlogPostAI() {
  const articleRef = useRef<HTMLDivElement>(null);
  const { t, ready } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const article = articleRef.current;
    if (!article) return;

    gsap.set(
      [".blog-post-title", ".blog-post-meta", ".blog-post-image", ".blog-post-content > *"],
      { opacity: 0, y: 60, force3D: true }
    );

    const postTL = gsap.timeline({
      scrollTrigger: {
        trigger: article,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    postTL
      .to(".blog-post-title", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to(
        ".blog-post-meta",
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      )
      .to(".blog-post-image", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
      .to(
        ".blog-post-content > *",
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.4"
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [mounted]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <article ref={articleRef} className="min-h-screen bg-white py-20 lg:py-32" itemScope itemType="https://schema.org/BlogPosting">
      {/* SEO Meta Tags */}
      <meta
        itemProp="headline"
        content={mounted && ready ? t("aiPostTitle") : "The Future of Enterprise AI: Beyond Automation to Intelligent Transformation"}
      />
      <meta
        itemProp="description"
        content={mounted && ready ? t("aiPostExcerpt") : "Discover how leading organizations are leveraging AI not just for automation, but for complete business model reinvention and competitive advantage."}
      />
      <meta itemProp="datePublished" content="2024-09-15T00:00:00Z" />
      <meta itemProp="dateModified" content="2024-09-15T00:00:00Z" />
      <meta itemProp="author" content="Zonda One Technology Team" />
      <meta itemProp="publisher" content="Zonda One" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-orange-600 transition-colors">Blog</Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{mounted && ready ? t("aiPostCategory") : "Artificial Intelligence"}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          <div className="blog-post-meta flex items-center gap-4 mb-6">
            <span className="inline-block bg-orange-500 text-white px-4 py-2 rounded-sm text-sm font-medium">
              {mounted && ready ? t("aiPostCategory") : "Artificial Intelligence"}
            </span>
            <time className="text-gray-500 text-sm" dateTime="2024-09-15" itemProp="datePublished">
              {formatDate("2024-09-15")}
            </time>
            <span className="text-gray-500 text-sm">{mounted && ready ? t("aiPostReadTime") : "8 min read"}</span>
          </div>

          <h1 className="blog-post-title text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[0.9] tracking-tight text-gray-900 font-display mb-6" itemProp="headline">
            {mounted && ready ? t("aiPostTitle") : "The Future of Enterprise AI: Beyond Automation to Intelligent Transformation"}
          </h1>

          <p className="text-xl text-gray-600 font-light leading-relaxed" itemProp="description">
            {mounted && ready ? t("aiPostExcerpt") : "Discover how leading organizations are leveraging AI not just for automation, but for complete business model reinvention and competitive advantage."}
          </p>
        </header>

        {/* Featured Image */}
        <div className="blog-post-image mb-12 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop&crop=center"
            alt={mounted && ready ? t("aiPostTitle") : "The Future of Enterprise AI: Beyond Automation to Intelligent Transformation"}
            width={1200}
            height={600}
            className="w-full h-96 object-cover"
            itemProp="image"
          />
        </div>

        {/* Article Content */}
        <div className="blog-post-content prose prose-lg max-w-none" itemProp="articleBody">
          {/* Section 1 */}
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4">
              {mounted && ready ? t("aiPostSection1Title") : "The AI Revolution: From Efficiency to Intelligence"}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {mounted && ready ? t("aiPostSection1P1") : "Artificial Intelligence has evolved far beyond simple task automation. Today's leading enterprises are discovering that AI's true potential lies not in replacing human workers, but in augmenting human intelligence and transforming entire business models. This shift represents a fundamental change in how organizations approach technology adoption and strategic planning."}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {mounted && ready ? t("aiPostSection1P2") : "Companies that once viewed AI as a cost-cutting tool are now recognizing it as a driver of innovation, customer experience, and competitive differentiation. The question is no longer 'How can AI make us more efficient?' but rather 'How can AI help us reimagine what's possible?' "}
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4">
              {mounted && ready ? t("aiPostSection2Title") : "Strategic Implementation: Beyond the Hype"}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {mounted && ready ? t("aiPostSection2P1") : "Successful AI transformation requires more than cutting-edge technology. It demands a holistic approach that encompasses organizational culture, data infrastructure, and strategic alignment. Leading organizations are investing heavily in AI literacy across all levels of their workforce, ensuring that the benefits of intelligent systems are realized throughout the enterprise."}
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-6">
              <blockquote className="text-lg italic text-gray-800">
                {mounted && ready ? t("aiPostQuote") : "The most successful AI implementations are those that amplify human capabilities rather than replace them entirely."}
              </blockquote>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {mounted && ready ? t("aiPostSection2P2") : "This approach focuses on creating symbiotic relationships between human expertise and machine intelligence, leading to outcomes that neither could achieve independently."}
            </p>
          </div>

          {/* Section 3 */}
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4">
              {mounted && ready ? t("aiPostSection3Title") : "Real-World Applications and Impact"}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {mounted && ready ? t("aiPostSection3P1") : "From predictive analytics that anticipate market shifts to personalized customer experiences that drive loyalty, AI is reshaping every aspect of business operations. Healthcare organizations are using AI to accelerate drug discovery, financial institutions are leveraging machine learning for risk assessment, and manufacturing companies are implementing intelligent systems for predictive maintenance."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {mounted && ready ? t("aiPostExample1Title") : "Predictive Analytics"}
                </h3>
                <p className="text-gray-700 text-sm">
                  {mounted && ready ? t("aiPostExample1Text") : "Organizations are using AI to forecast market trends, customer behavior, and operational challenges before they occur."}
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {mounted && ready ? t("aiPostExample2Title") : "Intelligent Automation"}
                </h3>
                <p className="text-gray-700 text-sm">
                  {mounted && ready ? t("aiPostExample2Text") : "Smart systems that learn and adapt, handling complex decision-making processes with minimal human intervention."}
                </p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4">
              {mounted && ready ? t("aiPostSection4Title") : "The Path Forward: Building AI-Ready Organizations"}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {mounted && ready ? t("aiPostSection4P1") : "Creating an AI-ready organization requires careful planning, significant investment, and a commitment to continuous learning. Organizations must focus on developing robust data governance frameworks, investing in talent development, and fostering a culture of experimentation and innovation."}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {mounted && ready ? t("aiPostSection4P2") : "The future belongs to organizations that can successfully integrate artificial intelligence into their strategic vision while maintaining focus on human values and ethical considerations. This balance will define the next generation of successful enterprises."}
            </p>
          </div>

          {/* Call to Action */}
          <div className="bg-gray-900 text-white p-8 rounded-lg mt-12">
            <h3 className="text-2xl font-semibold mb-4">
              {mounted && ready ? t("aiPostCTATitle") : "Ready to Transform Your Business with AI?"}
            </h3>
            <p className="text-gray-300 mb-6">
              {mounted && ready ? t("aiPostCTAText") : "Our team of AI specialists can help you develop and implement intelligent solutions that drive real business value."}
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-sm font-medium transition-colors duration-200">
              {mounted && ready ? t("aiPostCTAButton") : "Get Started Today"}
            </button>
          </div>
        </div>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{mounted && ready ? t("aiPostShareText") : "Share this article:"}</span>
              <div className="flex items-center gap-2">
                {/* Social buttons omitted for brevity; puedes reutilizar los SVGs */}
              </div>
            </div>
            <Link
              href="/blog"
              className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors duration-200 flex items-center gap-2"
            >
              ← {mounted && ready ? t("aiPostBackToBlog") : "Back to Blog"}
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}
