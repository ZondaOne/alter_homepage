"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function BlogPostCloud() {
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

    // Set initial states for animations
    gsap.set([".blog-post-title", ".blog-post-meta", ".blog-post-image", ".blog-post-content > *"], {
      opacity: 0,
      y: 60,
      force3D: true,
    });

    // Create scroll-triggered animation
    const postTL = gsap.timeline({
      scrollTrigger: {
        trigger: article,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    postTL
      .to(".blog-post-title", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .to(".blog-post-meta", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
      .to(".blog-post-image", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.3")
      .to(".blog-post-content > *", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.4");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [mounted]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article
      ref={articleRef}
      className="min-h-screen bg-white py-20 lg:py-32"
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      {/* SEO Meta Tags */}
      <meta itemProp="headline" content={(ready && mounted) ? t("cloudPostTitle") : "Cloud-Native Architecture: Building Resilient Systems for Scale"} />
      <meta itemProp="description" content={(ready && mounted) ? t("cloudPostExcerpt") : "Learn the essential patterns and practices for designing cloud-native applications that scale effortlessly and maintain high availability."} />
      <meta itemProp="datePublished" content="2024-09-10T00:00:00Z" />
      <meta itemProp="dateModified" content="2024-09-10T00:00:00Z" />
      <meta itemProp="author" content="Zonda One Technology Team" />
      <meta itemProp="publisher" content="Zonda One" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-orange-600 transition-colors">Home</Link></li>
            <li>/</li>
            <li><a href="/blog" className="hover:text-orange-600 transition-colors">Blog</a></li>
            <li>/</li>
            <li className="text-gray-900">{(ready && mounted) ? t("cloudPostCategory") : "Cloud Computing"}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          <div className="blog-post-meta flex items-center gap-4 mb-6">
            <span className="inline-block bg-orange-500 text-white px-4 py-2 rounded-sm text-sm font-medium">
              {(ready && mounted) ? t("cloudPostCategory") : "Cloud Computing"}
            </span>
            <time className="text-gray-500 text-sm" dateTime="2024-09-10" itemProp="datePublished">
              {formatDate("2024-09-10")}
            </time>
            <span className="text-gray-500 text-sm">
              {(ready && mounted) ? t("cloudPostReadTime") : "6 min read"}
            </span>
          </div>

          <h1 className="blog-post-title text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[0.9] tracking-tight text-gray-900 font-display mb-6" itemProp="headline">
  <span
    className="hero-gradient-text"
    style={{
      background: "linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)",
      backgroundSize: "200% 100%",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}
  >
    {(ready && mounted) ? t("cloudPostTitle")?.split(":")[0] : "Cloud-Native Architecture"}
  </span>
  {(ready && mounted) ? t("cloudPostTitle")?.substring(t("cloudPostTitle")?.indexOf(":")) : ": Building Resilient Systems for Scale"}
</h1>



          <p className="text-xl text-gray-600 font-light leading-relaxed" itemProp="description">
            {(ready && mounted) ? t("cloudPostExcerpt") : "Learn the essential patterns and practices for designing cloud-native applications that scale effortlessly and maintain high availability."}
          </p>
        </header>

        {/* Featured Image */}
        <div className="blog-post-image mb-12 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop&crop=center"
            alt={(ready && mounted) ? t("cloudPostTitle") : "Cloud-Native Architecture: Building Resilient Systems for Scale"}
            className="w-full h-96 object-cover"
            width={600}
            height={400}
            itemProp="image"
          />
        </div>

        {/* Article Content */}
        <div className="blog-post-content prose prose-lg max-w-none" itemProp="articleBody">
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4">
              {(ready && mounted) ? t("cloudPostSection1Title") : "The Cloud-Native Paradigm Shift"}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {(ready && mounted) ? t("cloudPostSection1P1") : "Cloud-native architecture represents a fundamental shift in how we design, build, and operate applications. Unlike traditional monolithic approaches, cloud-native systems are built from the ground up to leverage the full potential of cloud computing environments. This approach embraces microservices, containerization, and dynamic orchestration to create systems that are inherently scalable, resilient, and adaptable."}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {(ready && mounted) ? t("cloudPostSection1P2") : "The core principles of cloud-native design—scalability, resilience, observability, and automation—work together to create applications that can handle unpredictable loads while maintaining high availability and performance standards."}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4">
              {(ready && mounted) ? t("cloudPostSection2Title") : "Essential Architecture Patterns"}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {(ready && mounted) ? t("cloudPostSection2P1") : "Successful cloud-native applications rely on proven architectural patterns that address common challenges in distributed systems. These patterns provide blueprints for building robust, maintainable systems that can evolve with changing business requirements."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {(ready && mounted) ? t("cloudPostPattern1Title") : "Microservices Architecture"}
                </h3>
                <p className="text-gray-700 text-sm">
                  {(ready && mounted) ? t("cloudPostPattern1Text") : "Breaking applications into small, independently deployable services that communicate through well-defined APIs."}
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {(ready && mounted) ? t("cloudPostPattern2Title") : "Event-Driven Design"}
                </h3>
                <p className="text-gray-700 text-sm">
                  {(ready && mounted) ? t("cloudPostPattern2Text") : "Using events and message queues to create loosely coupled systems that can scale independently."}
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {(ready && mounted) ? t("cloudPostPattern3Title") : "Circuit Breaker Pattern"}
                </h3>
                <p className="text-gray-700 text-sm">
                  {(ready && mounted) ? t("cloudPostPattern3Text") : "Implementing fault tolerance mechanisms that prevent cascading failures across distributed services."}
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {(ready && mounted) ? t("cloudPostPattern4Title") : "Database per Service"}
                </h3>
                <p className="text-gray-700 text-sm">
                  {(ready && mounted) ? t("cloudPostPattern4Text") : "Ensuring data independence by giving each service its own database, optimized for its specific needs."}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4">
              {(ready && mounted) ? t("cloudPostSection3Title") : "Containerization and Orchestration"}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {(ready && mounted) ? t("cloudPostSection3P1") : "Containers have revolutionized how we package and deploy applications, providing consistency across development, testing, and production environments. Kubernetes has emerged as the de facto standard for container orchestration, offering powerful capabilities for managing containerized workloads at scale."}
            </p>
            
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-6">
              <blockquote className="text-lg italic text-gray-800">
                {(ready && mounted) ? t("cloudPostQuote") : "The true power of cloud-native architecture lies in its ability to turn infrastructure into code and operations into automation."}
              </blockquote>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {(ready && mounted) ? t("cloudPostSection3P2") : "Modern orchestration platforms provide automated scaling, health monitoring, and self-healing capabilities that make applications more resilient and reduce operational overhead."}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4">
              {(ready && mounted) ? t("cloudPostSection4Title") : "Observability and Monitoring"}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {(ready && mounted) ? t("cloudPostSection4P1") : "In distributed cloud-native systems, observability becomes critical for understanding system behavior and diagnosing issues. The three pillars of observability—metrics, logs, and traces—provide comprehensive visibility into application performance and health."}
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              {(ready && mounted) ? t("cloudPostSection4P2") : "Modern observability platforms use artificial intelligence and machine learning to automatically detect anomalies, predict potential issues, and provide actionable insights for optimization."}
            </p>

            <div className="bg-gray-900 text-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Key Observability Metrics</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• {(ready && mounted) ? t("cloudPostMetric1") : "Request latency and throughput"}</li>
                <li>• {(ready && mounted) ? t("cloudPostMetric2") : "Error rates and failure patterns"}</li>
                <li>• {(ready && mounted) ? t("cloudPostMetric3") : "Resource utilization and capacity"}</li>
                <li>• {(ready && mounted) ? t("cloudPostMetric4") : "Business metrics and user experience"}</li>
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4">
              {(ready && mounted) ? t("cloudPostSection5Title") : "Security in Cloud-Native Environments"}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {(ready && mounted) ? t("cloudPostSection5P1") : "Security in cloud-native architectures requires a shift-left approach, integrating security considerations throughout the development and deployment pipeline. This includes implementing zero-trust networking, securing container images, and managing secrets and credentials properly."}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {(ready && mounted) ? t("cloudPostSection5P2") : "Modern security practices emphasize automated vulnerability scanning, policy-as-code, and continuous compliance monitoring to ensure that security keeps pace with rapid development cycles."}
            </p>
          </div>

          {/* Call to Action */}
          <div className="bg-gray-900 text-white p-8 rounded-lg mt-12">
            <h3 className="text-2xl font-semibold mb-4">
              {(ready && mounted) ? t("cloudPostCTATitle") : "Ready to Build Cloud-Native Applications?"}
            </h3>
            <p className="text-gray-300 mb-6">
              {(ready && mounted) ? t("cloudPostCTAText") : "Our cloud architecture experts can help you design and implement scalable, resilient systems that leverage the full power of cloud-native technologies."}
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-sm font-medium transition-colors duration-200">
              {(ready && mounted) ? t("cloudPostCTAButton") : "Start Your Project"}
            </button>
          </div>
        </div>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {(ready && mounted) ? t("cloudPostShareText") : "Share this article:"}
              </span>
              <div className="flex items-center gap-2">
                <button className="text-gray-600 hover:text-orange-600 transition-colors p-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="text-gray-600 hover:text-orange-600 transition-colors p-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </button>
              </div>
            </div>
            <Link
              href="/blog" 
              className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors duration-200 flex items-center gap-2"
            >
              ← {(ready && mounted) ? t("cloudPostBackToBlog") : "Back to Blog"}
           
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}