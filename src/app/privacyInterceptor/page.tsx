'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function PrivacyInterceptorPage() {
    const { t, ready } = useTranslation();
    const [mounted, setMounted] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const pricingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Hero animations
        gsap.set(['.hero-title .hero-line', '.hero-subtitle', '.hero-cta'], {
            opacity: 0,
            y: 60,
            rotationX: 15,
            force3D: true
        });

        const heroTL = gsap.timeline({
            defaults: { ease: 'power3.out' },
            delay: 0.1
        });

        heroTL
            .to('.hero-title .hero-line', {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 0.8,
                stagger: 0.15,
                transformOrigin: 'center bottom'
            })
            .to('.hero-subtitle', {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 0.6,
                transformOrigin: 'center bottom'
            }, '-=0.4')
            .to('.hero-cta', {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 0.5,
                transformOrigin: 'center bottom'
            }, '-=0.3');

        // Gradient animation
        gsap.to('.gradient-text', {
            backgroundPosition: '200% 50%',
            repeat: -1,
            yoyo: true,
            duration: 8,
            ease: 'sine.inOut'
        });

        // Features animation
        gsap.fromTo('.feature-card',
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: featuresRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );

        // Steps animation
        gsap.fromTo('.step-item',
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.steps-section',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );

        // Pricing animation
        gsap.fromTo('.pricing-card',
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.15,
                scrollTrigger: {
                    trigger: pricingRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [mounted]);

    if (!mounted || !ready) return null;

    return (
        <div className="bg-white font-sans min-h-screen">
            {/* Hero Section */}
            <section
                ref={heroRef}
                className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 lg:px-12"
            >
                <div className="max-w-5xl mx-auto text-center">
                    <div className="mb-8">
                        <Image
                            src="/pi_icon.png"
                            alt="Privacy Interceptor"
                            width={80}
                            height={80}
                            className="mx-auto rounded-2xl shadow-lg"
                        />
                    </div>

                    <h1 className="hero-title font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[0.95] tracking-tight text-gray-900 mb-8">
                        <div className="hero-line">{t('privacyInterceptor.landing.heroLine1')}</div>
                        <div className="hero-line">{t('privacyInterceptor.landing.heroLine2')}</div>
                        <div className="hero-line">
                            <span
                                className="gradient-text"
                                style={{
                                    background: 'linear-gradient(90deg, #f97316, #fb923c, #ea580c, #fb923c, #f97316)',
                                    backgroundSize: '200% 100%',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}
                            >
                                {t('privacyInterceptor.landing.heroLine3')}
                            </span>
                        </div>
                    </h1>

                    <p className="hero-subtitle text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed mb-10">
                        {t('privacyInterceptor.landing.heroSubtitle')}
                    </p>

                    <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                        <a
                            href="https://chrome.google.com/webstore"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 bg-gray-900 text-white w-full sm:w-60 px-8 py-4 rounded-lg text-base font-medium hover:bg-gray-800 transition-all duration-200 group"
                        >
                            <ChromeIcon className="w-5 h-5" />
                            {t('privacyInterceptor.landing.addToChrome')}
                        </a>

                        <a
                            href="https://addons.mozilla.org/en-US/firefox/addon/privacy-interceptor/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 bg-orange-500 text-white w-full sm:w-60 px-8 py-4 rounded-lg text-base font-medium hover:bg-orange-600 transition-all duration-200 group"
                        >
                            <FirefoxIcon className="w-5 h-5" />
                            {t('privacyInterceptor.landing.addToFirefox')}
                        </a>
                    </div>

                    <div className="mb-12">
                        <Link
                            href="/privacyInterceptor/login"
                            className="text-gray-600 text-sm font-medium hover:text-orange-600 transition-colors"
                        >
                            {t('privacyInterceptor.landing.alreadyUsing')} <span className="text-orange-600">{t('privacyInterceptor.landing.signIn')}</span>
                        </Link>
                    </div>

                    {/* Browser Support */}
                    <div className="flex items-center justify-center gap-6 text-gray-400">
                        <BrowserBadge icon={<ChromeIcon className="w-5 h-5" />} label="Chrome" available />
                        <BrowserBadge icon={<FirefoxIcon className="w-5 h-5" />} label="Firefox" available />
                        <BrowserBadge icon={<EdgeIcon className="w-5 h-5" />} label="Edge" />
                        <BrowserBadge icon={<SafariIcon className="w-5 h-5" />} label="Safari" />
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="steps-section py-20 lg:py-28 px-6 lg:px-12 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-center font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight text-gray-900 mb-6">
                        {t('privacyInterceptor.landing.stepsTitle')}{' '}
                        <span
                            className="gradient-text"
                            style={{
                                background: 'linear-gradient(90deg, #f97316, #fb923c, #ea580c)',
                                backgroundSize: '200% 100%',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}
                        >
                            {t('privacyInterceptor.landing.stepsTitleHighlight')}
                        </span>{' '}
                        {t('privacyInterceptor.landing.stepsTitleEnd')}
                    </h2>
                    <p className="text-center text-lg lg:text-xl text-gray-600 font-light max-w-2xl mx-auto mb-16">
                        {t('privacyInterceptor.landing.stepsSubtitle')}
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                        <StepCard
                            number="01"
                            title={t('privacyInterceptor.landing.step1Title')}
                            description={t('privacyInterceptor.landing.step1Description')}
                        />
                        <StepCard
                            number="02"
                            title={t('privacyInterceptor.landing.step2Title')}
                            description={t('privacyInterceptor.landing.step2Description')}
                        />
                        <StepCard
                            number="03"
                            title={t('privacyInterceptor.landing.step3Title')}
                            description={t('privacyInterceptor.landing.step3Description')}
                        />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section ref={featuresRef} className="py-20 lg:py-28 px-6 lg:px-12">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
                            {t('privacyInterceptor.landing.featuresLabel')}
                        </p>
                        <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-tight tracking-tight text-gray-900">
                            {t('privacyInterceptor.landing.featuresTitle')}
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={<LockIcon />}
                            title={t('privacyInterceptor.landing.feature1Title')}
                            description={t('privacyInterceptor.landing.feature1Description')}
                        />
                        <FeatureCard
                            icon={<DocumentIcon />}
                            title={t('privacyInterceptor.landing.feature2Title')}
                            description={t('privacyInterceptor.landing.feature2Description')}
                        />
                        <FeatureCard
                            icon={<GlobeIcon />}
                            title={t('privacyInterceptor.landing.feature3Title')}
                            description={t('privacyInterceptor.landing.feature3Description')}
                        />
                        <FeatureCard
                            icon={<ScanIcon />}
                            title={t('privacyInterceptor.landing.feature4Title')}
                            description={t('privacyInterceptor.landing.feature4Description')}
                        />
                        <FeatureCard
                            icon={<BoltIcon />}
                            title={t('privacyInterceptor.landing.feature5Title')}
                            description={t('privacyInterceptor.landing.feature5Description')}
                        />
                        <FeatureCard
                            icon={<ShieldIcon />}
                            title={t('privacyInterceptor.landing.feature6Title')}
                            description={t('privacyInterceptor.landing.feature6Description')}
                        />
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section ref={pricingRef} className="py-20 lg:py-28 px-6 lg:px-12 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
                            {t('privacyInterceptor.landing.pricingLabel')}
                        </p>
                        <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-tight tracking-tight text-gray-900 mb-4">
                            {t('privacyInterceptor.landing.pricingTitle')}
                        </h2>
                        <p className="text-lg text-gray-600 font-light max-w-xl mx-auto">
                            {t('privacyInterceptor.landing.pricingSubtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Free Plan */}
                        <div className="pricing-card bg-white border border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition-colors">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('privacyInterceptor.landing.freePlanTitle')}</h3>
                            <p className="text-gray-600 text-sm mb-6">{t('privacyInterceptor.landing.freePlanDescription')}</p>

                            <div className="mb-8">
                                <span className="text-4xl font-semibold text-gray-900">{t('privacyInterceptor.landing.freePlanPrice')}</span>
                                <span className="text-gray-500 ml-2">{t('privacyInterceptor.landing.freePlanPeriod')}</span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                <PricingFeature included>{t('privacyInterceptor.landing.freePlanFeature1')}</PricingFeature>
                                <PricingFeature included>{t('privacyInterceptor.landing.freePlanFeature2')}</PricingFeature>
                                <PricingFeature included>{t('privacyInterceptor.landing.freePlanFeature3')}</PricingFeature>
                                <PricingFeature>{t('privacyInterceptor.landing.freePlanFeature4')}</PricingFeature>
                                <PricingFeature>{t('privacyInterceptor.landing.freePlanFeature5')}</PricingFeature>
                                <PricingFeature>{t('privacyInterceptor.landing.freePlanFeature6')}</PricingFeature>
                            </ul>

                            <a
                                href="https://chrome.google.com/webstore"
                                className="block w-full text-center py-3 px-6 border-2 border-gray-900 text-gray-900 font-medium rounded-lg hover:bg-gray-900 hover:text-white transition-all"
                            >
                                {t('privacyInterceptor.landing.freePlanButton')}
                            </a>
                        </div>

                        {/* Premium Plan */}
                        <div className="pricing-card relative bg-white border-2 border-orange-500 rounded-2xl p-8 shadow-lg shadow-orange-500/10">
                            <div className="absolute -top-3 right-6">
                                <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-full uppercase tracking-wide">
                                    {t('privacyInterceptor.landing.premiumPlanBadge')}
                                </span>
                            </div>

                            {/* Countdown Timer - positioned at bottom border */}
                            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                                <Countdown targetDate={new Date('2026-02-01T00:00:00')} endsInLabel={t('privacyInterceptor.landing.countdownEndsIn')} />
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('privacyInterceptor.landing.premiumPlanTitle')}</h3>
                            <p className="text-gray-600 text-sm mb-6">{t('privacyInterceptor.landing.premiumPlanDescription')}</p>

                            <div className="mb-8">
                                <span className="text-gray-400 line-through text-lg mr-2">{t('privacyInterceptor.landing.premiumPlanOriginalPrice')}</span>
                                <span className="text-4xl font-semibold text-gray-900">{t('privacyInterceptor.landing.premiumPlanPrice')}</span>
                                <span className="text-gray-500 ml-2">{t('privacyInterceptor.landing.premiumPlanPeriod')}</span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                <PricingFeature included>{t('privacyInterceptor.landing.premiumPlanFeature1')}</PricingFeature>
                                <PricingFeature included>{t('privacyInterceptor.landing.premiumPlanFeature2')}</PricingFeature>
                                <PricingFeature included>{t('privacyInterceptor.landing.premiumPlanFeature3')}</PricingFeature>
                                <PricingFeature included>{t('privacyInterceptor.landing.premiumPlanFeature4')}</PricingFeature>
                                <PricingFeature included>{t('privacyInterceptor.landing.premiumPlanFeature5')}</PricingFeature>
                                <PricingFeature included>{t('privacyInterceptor.landing.premiumPlanFeature6')}</PricingFeature>
                            </ul>

                            <Link
                                href="/privacyInterceptor/login"
                                className="block w-full text-center py-3 px-6 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-all"
                            >
                                {t('privacyInterceptor.landing.premiumPlanButton')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Collaborate */}
            <section className="py-20 lg:py-24 px-6 lg:px-12">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="font-display text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
                        {t('privacyInterceptor.landing.collaborateTitle')}
                    </h2>
                    <p className="text-lg text-gray-600 font-light mb-8">
                        {t('privacyInterceptor.landing.collaborateDescription')}
                    </p>

                    <a
                        href="mailto:team@zonda.one"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        ✉️ {t('privacyInterceptor.landing.collaborateEmail')}
                    </a>
                </div>
            </section>
        </div>
    );
}

// --- Component: Step Card ---
function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
    return (
        <div className="step-item group text-center lg:text-left">
            <div className="text-3xl lg:text-4xl font-bold text-orange-500 mb-4 group-hover:text-orange-600 transition-colors">
                {number}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 font-light leading-relaxed">{description}</p>
        </div>
    );
}

// --- Component: Feature Card ---
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="feature-card bg-gray-50 border border-gray-100 rounded-xl p-6 hover:border-orange-200 hover:bg-orange-50/30 transition-all duration-300">
            <div className="w-10 h-10 mb-4 text-orange-500">{icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 font-light text-sm leading-relaxed">{description}</p>
        </div>
    );
}

// --- Component: Pricing Feature ---
function PricingFeature({ children, included = false }: { children: React.ReactNode; included?: boolean }) {
    return (
        <li className={`flex items-center gap-3 text-sm ${included ? 'text-gray-900' : 'text-gray-400'}`}>
            <span className={`flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold ${included ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}>
                {included ? '✓' : '–'}
            </span>
            {children}
        </li>
    );
}

// --- Component: Browser Badge ---
function BrowserBadge({ icon, label, available = false }: { icon: React.ReactNode; label: string; available?: boolean }) {
    return (
        <div className={`flex items-center gap-2 ${available ? 'text-gray-700' : 'text-gray-400'}`}>
            {icon}
            <span className="text-xs font-medium hidden sm:inline">{label}</span>
            {!available && <span className="text-xs text-gray-300 hidden sm:inline">Soon</span>}
        </div>
    );
}

// --- Component: Countdown Timer ---
function Countdown({ targetDate, endsInLabel }: { targetDate: Date; endsInLabel: string }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = targetDate.getTime() - new Date().getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="inline-flex items-center gap-2 px-5 py-1.5 bg-white border-2 border-orange-500 rounded-full shadow-md whitespace-nowrap">
            <span className="text-xs text-orange-600 font-semibold uppercase tracking-wide">{endsInLabel}</span>
            <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
                <span>{timeLeft.days}d</span>
                <span className="text-orange-400">:</span>
                <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
                <span className="text-orange-400">:</span>
                <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
                <span className="text-orange-400">:</span>
                <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
        </div>
    );
}

// --- Feature Icons ---
function LockIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    );
}

function DocumentIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14,2 14,8 20,8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
    );
}

function GlobeIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    );
}

function ScanIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <path d="M3 7V5a2 2 0 0 1 2-2h2" />
            <path d="M17 3h2a2 2 0 0 1 2 2v2" />
            <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
            <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
            <circle cx="12" cy="12" r="3" />
            <path d="M12 8v1" />
            <path d="M12 15v1" />
            <path d="M16 12h-1" />
            <path d="M9 12H8" />
        </svg>
    );
}

function BoltIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
        </svg>
    );
}

function ShieldIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    );
}

// --- Browser Icons ---
function ChromeIcon({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4.036 6.977l-2.29-3.966A7.986 7.986 0 0 1 8-.001a7.994 7.994 0 0 1 6.883 3.922H8.355a4.1 4.1 0 0 0-4.32 3.055zm6.828-1.899h4.585a8 8 0 0 1-7.358 10.921l3.272-5.667a4.08 4.08 0 0 0-.499-5.254zM5.094 8c0-1.603 1.304-2.906 2.906-2.906S10.906 6.398 10.906 8 9.602 10.906 8 10.906 5.094 9.602 5.094 8zm4.003 3.944l-2.29 3.967a8.001 8.001 0 0 1-5.78-11.833l3.266 5.657a4.1 4.1 0 0 0 4.804 2.21z" />
        </svg>
    );
}

function FirefoxIcon({ className }: { className?: string }) {
    return (
        <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <title>Firefox</title>
            <path d="M20.452 3.445a11.002 11.002 0 00-2.482-1.908C16.944.997 15.098.093 12.477.032c-.734-.017-1.457.03-2.174.144-.72.114-1.398.292-2.118.56-1.017.377-1.996.975-2.574 1.554.583-.349 1.476-.733 2.55-.992a10.083 10.083 0 013.729-.167c2.341.34 4.178 1.381 5.48 2.625a8.066 8.066 0 011.298 1.587c1.468 2.382 1.33 5.376.184 7.142-.85 1.312-2.67 2.544-4.37 2.53-.583-.023-1.438-.152-2.25-.566-2.629-1.343-3.021-4.688-1.118-6.306-.632-.136-1.82.13-2.646 1.363-.742 1.107-.7 2.816-.242 4.028a6.473 6.473 0 01-.59-1.895 7.695 7.695 0 01.416-3.845A8.212 8.212 0 019.45 5.399c.896-1.069 1.908-1.72 2.75-2.005-.54-.471-1.411-.738-2.421-.767C8.31 2.583 6.327 3.061 4.7 4.41a8.148 8.148 0 00-1.976 2.414c-.455.836-.691 1.659-.697 1.678.122-1.445.704-2.994 1.248-4.055-.79.413-1.827 1.668-2.41 3.042C.095 9.37-.2 11.608.14 13.989c.966 5.668 5.9 9.982 11.843 9.982C18.62 23.971 24 18.591 24 11.956a11.93 11.93 0 00-3.548-8.511z" />
        </svg>
    );
}

function EdgeIcon({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path d="M9.482 9.341c-.069.062-.17.153-.17.309 0 .162.107.325.3.456.877.613 2.521.54 2.592.538h.002c.667 0 1.32-.18 1.894-.519A3.84 3.84 0 0 0 16 6.819c.018-1.316-.44-2.218-.666-2.664l-.04-.08C13.963 1.487 11.106 0 8 0A8 8 0 0 0 .473 5.29C1.488 4.048 3.183 3.262 5 3.262c2.83 0 5.01 1.885 5.01 4.797h-.004v.002c0 .338-.168.832-.487 1.244l.006-.006z" />
            <path d="M.01 7.753a8.14 8.14 0 0 0 .753 3.641 8 8 0 0 0 6.495 4.564 5 5 0 0 1-.785-.377h-.01l-.12-.075a5.5 5.5 0 0 1-1.56-1.463A5.543 5.543 0 0 1 6.81 5.8l.01-.004.025-.012c.208-.098.62-.292 1.167-.285q.194.001.384.033a4 4 0 0 0-.993-.698l-.01-.005C6.348 4.282 5.199 4.263 5 4.263c-2.44 0-4.824 1.634-4.99 3.49m10.263 7.912q.133-.04.265-.084-.153.047-.307.086z" />
            <path d="M10.228 15.667a5 5 0 0 0 .303-.086l.082-.025a8.02 8.02 0 0 0 4.162-3.3.25.25 0 0 0-.331-.35q-.322.168-.663.294a6.4 6.4 0 0 1-2.243.4c-2.957 0-5.532-2.031-5.532-4.644q.003-.203.046-.399a4.54 4.54 0 0 0-.46 5.898l.003.005c.315.441.707.821 1.158 1.121h.003l.144.09c.877.55 1.721 1.078 3.328.996" />
        </svg>
    );
}

function SafariIcon({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.25-14.75v1.5a.25.25 0 0 1-.5 0v-1.5a.25.25 0 0 1 .5 0m0 12v1.5a.25.25 0 1 1-.5 0v-1.5a.25.25 0 1 1 .5 0M4.5 1.938a.25.25 0 0 1 .342.091l.75 1.3a.25.25 0 0 1-.434.25l-.75-1.3a.25.25 0 0 1 .092-.341m6 10.392a.25.25 0 0 1 .341.092l.75 1.299a.25.25 0 1 1-.432.25l-.75-1.3a.25.25 0 0 1 .091-.34ZM2.28 4.408l1.298.75a.25.25 0 0 1-.25.434l-1.299-.75a.25.25 0 0 1 .25-.434Zm10.392 6 1.299.75a.25.25 0 1 1-.25.434l-1.3-.75a.25.25 0 0 1 .25-.434ZM1 8a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 0 .5h-1.5A.25.25 0 0 1 1 8m12 0a.25.25 0 0 1 .25-.25h1.5a.25.25 0 1 1 0 .5h-1.5A.25.25 0 0 1 13 8M2.03 11.159l1.298-.75a.25.25 0 0 1 .25.432l-1.299.75a.25.25 0 0 1-.25-.432Zm10.392-6 1.299-.75a.25.25 0 1 1 .25.433l-1.3.75a.25.25 0 0 1-.25-.434ZM4.5 14.061a.25.25 0 0 1-.092-.341l.75-1.3a.25.25 0 0 1 .434.25l-.75 1.3a.25.25 0 0 1-.342.091m6-10.392a.25.25 0 0 1-.091-.342l.75-1.299a.25.25 0 1 1 .432.25l-.75 1.3a.25.25 0 0 1-.341.09ZM6.494 1.415l.13.483a.25.25 0 1 1-.483.13l-.13-.483a.25.25 0 0 1 .483-.13M9.86 13.972l.13.483a.25.25 0 1 1-.483.13l-.13-.483a.25.25 0 0 1 .483-.13M3.05 3.05a.25.25 0 0 1 .354 0l.353.354a.25.25 0 0 1-.353.353l-.354-.353a.25.25 0 0 1 0-.354m9.193 9.193a.25.25 0 0 1 .353 0l.354.353a.25.25 0 1 1-.354.354l-.353-.354a.25.25 0 0 1 0-.353M1.545 6.01l.483.13a.25.25 0 1 1-.13.483l-.483-.13a.25.25 0 1 1 .13-.482Zm12.557 3.365.483.13a.25.25 0 1 1-.13.483l-.483-.13a.25.25 0 1 1 .13-.483m-12.863.436a.25.25 0 0 1 .176-.306l.483-.13a.25.25 0 1 1 .13.483l-.483.13a.25.25 0 0 1-.306-.177m12.557-3.365a.25.25 0 0 1 .176-.306l.483-.13a.25.25 0 1 1 .13.483l-.483.13a.25.25 0 0 1-.306-.177M3.045 12.944a.3.3 0 0 1-.029-.376l3.898-5.592a.3.3 0 0 1 .062-.062l5.602-3.884a.278.278 0 0 1 .392.392L9.086 9.024a.3.3 0 0 1-.062.062l-5.592 3.898a.3.3 0 0 1-.382-.034zm3.143 1.817a.25.25 0 0 1-.176-.306l.129-.483a.25.25 0 0 1 .483.13l-.13.483a.25.25 0 0 1-.306.176M9.553 2.204a.25.25 0 0 1-.177-.306l.13-.483a.25.25 0 1 1 .483.13l-.13.483a.25.25 0 0 1-.306.176" />
        </svg>
    );
}
