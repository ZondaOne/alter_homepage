"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  slug: string;
  featured?: boolean;
}

const getBlogPosts = (t: (key: string) => string, ready: boolean, mounted: boolean): BlogPost[] => [
  {
    id: "1",
    title: (ready && mounted) ? t("blogPost1Title") : "The Future of Enterprise AI: Beyond Automation to Intelligent Transformation",
    excerpt: (ready && mounted) ? t("blogPost1Excerpt") : "Discover how leading organizations are leveraging AI not just for automation, but for complete business model reinvention and competitive advantage.",
    category: (ready && mounted) ? t("blogPost1Category") : "Artificial Intelligence",
    readTime: (ready && mounted) ? t("blogPost1ReadTime") : "8 min read",
    date: "2024-09-15",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&crop=center",
    slug: "enterprise-ai",
    featured: true
  },
  {
    id: "2",
    title: (ready && mounted) ? t("blogPost2Title") : "Cloud-Native Architecture: Building Resilient Systems for Scale",
    excerpt: (ready && mounted) ? t("blogPost2Excerpt") : "Learn the essential patterns and practices for designing cloud-native applications that scale effortlessly and maintain high availability.",
    category: (ready && mounted) ? t("blogPost2Category") : "Cloud Computing",
    readTime: (ready && mounted) ? t("blogPost2ReadTime") : "6 min read",
    date: "2024-09-10",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop&crop=center",
    slug: "cloud-native-architecture-resilient-systems"
  },
  {
    id: "3",
    title: (ready && mounted) ? t("blogPost3Title") : "Cybersecurity in the Age of Remote Work: A Strategic Approach",
    excerpt: (ready && mounted) ? t("blogPost3Excerpt") : "Explore advanced cybersecurity strategies that protect distributed workforces while enabling seamless collaboration and productivity.",
    category: (ready && mounted) ? t("blogPost3Category") : "Cybersecurity",
    readTime: (ready && mounted) ? t("blogPost3ReadTime") : "7 min read",
    date: "2024-09-05",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop&crop=center",
    slug: "cybersecurity-remote-work-strategy"
  },
  {
    id: "4",
    title: (ready && mounted) ? t("blogPost4Title") : "Data Mesh: Democratizing Data Architecture for Enterprise Success",
    excerpt: (ready && mounted) ? t("blogPost4Excerpt") : "Understand how data mesh principles are revolutionizing enterprise data management and enabling self-serve analytics at scale.",
    category: (ready && mounted) ? t("blogPost4Category") : "Data Engineering",
    readTime: (ready && mounted) ? t("blogPost4ReadTime") : "9 min read",
    date: "2024-08-28",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&crop=center",
    slug: "data-mesh-enterprise-architecture"
  },
  {
    id: "5",
    title: (ready && mounted) ? t("blogPost5Title") : "DevOps Evolution: Platform Engineering and Developer Experience",
    excerpt: (ready && mounted) ? t("blogPost5Excerpt") : "Discover how platform engineering is transforming DevOps practices and creating superior developer experiences across organizations.",
    category: (ready && mounted) ? t("blogPost5Category") : "DevOps",
    readTime: (ready && mounted) ? t("blogPost5ReadTime") : "5 min read",
    date: "2024-08-20",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=400&fit=crop&crop=center",
    slug: "devops-platform-engineering-dx"
  },
  {
    id: "6",
    title: (ready && mounted) ? t("blogPost6Title") : "Sustainable Technology: Green Computing for Modern Enterprises",
    excerpt: (ready && mounted) ? t("blogPost6Excerpt") : "Learn how organizations are reducing their carbon footprint through sustainable technology practices and green computing initiatives.",
    category: (ready && mounted) ? t("blogPost6Category") : "Sustainability",
    readTime: (ready && mounted) ? t("blogPost6ReadTime") : "6 min read",
    date: "2024-08-15",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop&crop=center",
    slug: "sustainable-technology-green-computing"
  }
];

export default function Blog() {
  const { t, ready } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const blogPosts = getBlogPosts(t, ready, mounted);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'newsletter',
          'email': email
        }).toString()
      });
      
      if (response.ok) {
        setMessage('Successfully subscribed! Thank you.');
        setEmail('');
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('Error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section
      id="blog"
      className="py-20 lg:py-32 bg-white"
      aria-label="Technology Insights Blog"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
        {/* Blog Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[0.9] tracking-tight text-gray-900 font-display mb-6">
            <div>{mounted && ready ? t("blogTitleLine1") : "Technology"}</div>
            <div>
              <span className="hero-text-gradient">
                {mounted && ready ? t("blogTitleLine2") : "Insights"}
              </span>
            </div>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 font-light leading-relaxed">
            {mounted && ready ? t("blogSubtitle") : "Explore cutting-edge perspectives on digital transformation, enterprise architecture, and the future of technology. Stay ahead with insights that drive business innovation."}
          </p>
        </div>

        {/* Featured Post */}
        {blogPosts.filter(post => post.featured).map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id}>
            <article
              className="mb-16 lg:mb-20 bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative overflow-hidden">
                <Image
                  width={600}
                  height={400}
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  priority={post.featured}
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-sm text-sm font-medium">
                    {mounted && ready ? t("blogFeatured") : "Featured"}
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-sm">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-200">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <time className="text-sm text-gray-500" dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors duration-200">
                    {mounted && ready ? t("blogReadMore") : "Read more"}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      <path
                        d="M6 3L11 8L6 13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Link>
        ))}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.filter(post => !post.featured).map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id}>
              <article
                className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
              <div className="relative overflow-hidden">
                <Image
                  width={400}
                  height={200}
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-sm">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <time className="text-xs text-gray-500" dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                  <div className="flex items-center gap-1 text-xs font-medium text-gray-700 group-hover:text-orange-600 transition-colors duration-200">
                    {mounted && ready ? t("blogReadMore") : "Read more"}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      <path
                        d="M6 3L11 8L6 13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </article>
          </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 lg:mt-20">
          <div className="bg-gray-50 rounded-lg p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4">
              {mounted && ready ? t("blogNewsletterTitle") : "Stay Updated with Technology Trends"}
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              {mounted && ready ? t("blogNewsletterSubtitle") : "Get the latest insights on digital transformation, emerging technologies, and industry best practices delivered directly to your inbox."}
            </p>
            <form 
              name="newsletter" 
              method="POST" 
              data-netlify="true"
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
            >
              <input type="hidden" name="form-name" value="newsletter" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={mounted && ready ? t("blogEmailPlaceholder") : "Enter your email address"}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                aria-label="Email address for newsletter subscription"
                required
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="bg-gray-900 text-white px-8 py-3 rounded-sm text-sm font-medium hover:bg-gray-800 transition-colors duration-200 w-full sm:w-auto whitespace-nowrap disabled:opacity-50"
              >
                {isLoading 
                  ? (mounted && ready ? t("blogSubscribing") : "Subscribing...") 
                  : (mounted && ready ? t("blogSubscribeButton") : "Subscribe")
                }
              </button>
            </form>
            {message && (
              <p className={`mt-4 text-sm text-center ${
                message.includes('Successfully') 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}