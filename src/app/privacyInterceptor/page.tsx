'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PrivacyInterceptorPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div
            style={{
                background: '#F5F5F7',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                minHeight: '100vh'
            }}
        >
            {/* Hero Section */}
            <section
                style={{
                    padding: '80px 24px 60px',
                    maxWidth: '720px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}
            >
                <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                    <Image
                        src="/pi_icon.png"
                        alt="Privacy Interceptor"
                        width={80}
                        height={80}
                        style={{
                            borderRadius: '20px',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                            marginBottom: '24px'
                        }}
                    />

                    <h1
                        style={{
                            fontSize: '42px',
                            fontWeight: 600,
                            color: '#1D1D1F',
                            letterSpacing: '-0.02em',
                            marginBottom: '16px',
                            lineHeight: 1.1
                        }}
                    >
                        Privacy-first<br />document redaction
                    </h1>

                    <p
                        style={{
                            fontSize: '18px',
                            color: '#6E6E73',
                            maxWidth: '480px',
                            margin: '0 auto 32px',
                            lineHeight: 1.5
                        }}
                    >
                        Intercept files before upload and automatically mask sensitive data.
                        All processing stays on your device.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                        <a
                            href="#"
                            style={{
                                display: 'inline-block',
                                padding: '16px 32px',
                                background: 'linear-gradient(135deg, #CF1D13 0%, #D16B00 100%)',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '16px',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                boxShadow: '0 4px 12px rgba(207, 29, 19, 0.25)',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(207, 29, 19, 0.35)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(207, 29, 19, 0.25)';
                            }}
                        >
                            Add to Chrome
                        </a>

                        <Link
                            href="/privacyInterceptor/login"
                            style={{
                                fontSize: '14px',
                                color: '#6E6E73',
                                textDecoration: 'none',
                                marginTop: '8px'
                            }}
                        >
                            Already using it? <span style={{ color: '#CF1D13', fontWeight: 500 }}>Sign in</span>
                        </Link>

                        <p style={{ fontSize: '13px', color: '#AEAEB2', marginTop: '16px' }}>
                            Coming soon to Firefox, Edge, and Safari
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section
                style={{
                    padding: '60px 24px',
                    maxWidth: '800px',
                    margin: '0 auto'
                }}
            >
                <h2
                    style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#6E6E73',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        textAlign: 'center',
                        marginBottom: '40px'
                    }}
                >
                    How it works
                </h2>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '24px'
                    }}
                >
                    <FeatureCard
                        title="Local-only processing"
                        description="Your documents never leave your browser. Zero cloud dependencies."
                    />
                    <FeatureCard
                        title="Multi-format support"
                        description="Works with PDFs, Word documents, text files, and images."
                    />
                    <FeatureCard
                        title="Smart detection"
                        description="Automatically finds phone numbers, emails, IDs, and addresses."
                    />
                    <FeatureCard
                        title="Regional patterns"
                        description="Recognizes formats from Europe, Americas, Asia, and Africa."
                    />
                    <FeatureCard
                        title="OCR for scanned docs"
                        description="Reads text from scanned documents and images."
                    />
                    <FeatureCard
                        title="Irreversible redaction"
                        description="Permanently masks sensitive data. No undo, no recovery."
                    />
                </div>
            </section>

            {/* Pricing Section */}
            <section
                style={{
                    padding: '60px 24px',
                    maxWidth: '720px',
                    margin: '0 auto'
                }}
            >
                <h2
                    style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#6E6E73',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        textAlign: 'center',
                        marginBottom: '40px'
                    }}
                >
                    Choose your plan
                </h2>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '20px'
                    }}
                >
                    {/* Free Tier */}
                    <div
                        style={{
                            background: '#FFFFFF',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            borderRadius: '16px',
                            padding: '28px',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
                        }}
                    >
                        <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', marginBottom: '4px' }}>
                            Free
                        </h3>
                        <p style={{ fontSize: '14px', color: '#6E6E73', marginBottom: '20px' }}>
                            Get started with basic protection
                        </p>

                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <PricingItem included>PDF documents</PricingItem>
                            <PricingItem included>Email detection</PricingItem>
                            <PricingItem included>Phone number detection</PricingItem>
                            <PricingItem>Images and Word files</PricingItem>
                            <PricingItem>OCR for scanned documents</PricingItem>
                            <PricingItem>Unlimited processing</PricingItem>
                        </ul>
                    </div>

                    {/* Premium Tier */}
                    <div
                        style={{
                            background: '#FFFFFF',
                            border: '2px solid #CF1D13',
                            borderRadius: '16px',
                            padding: '28px',
                            boxShadow: '0 4px 16px rgba(207, 29, 19, 0.1)',
                            position: 'relative'
                        }}
                    >
                        <span
                            style={{
                                position: 'absolute',
                                top: '-12px',
                                right: '20px',
                                background: 'linear-gradient(135deg, #CF1D13 0%, #D16B00 100%)',
                                color: 'white',
                                fontSize: '11px',
                                fontWeight: 700,
                                padding: '6px 12px',
                                borderRadius: '20px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}
                        >
                            Lifetime
                        </span>

                        <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', marginBottom: '4px' }}>
                            Premium
                        </h3>
                        <p style={{ fontSize: '14px', color: '#6E6E73', marginBottom: '20px' }}>
                            <span style={{ textDecoration: 'line-through', color: '#AEAEB2', marginRight: '8px' }}>€2.99</span>
                            <span style={{ fontSize: '28px', fontWeight: 600, color: '#1D1D1F' }}>€0.99</span>
                            <span style={{ fontSize: '11px', background: '#FFD200', color: '#2D1B00', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', marginLeft: '8px', textTransform: 'uppercase' }}>Early Bird</span>
                        </p>

                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <PricingItem included>Everything in Free</PricingItem>
                            <PricingItem included>Images and Word files</PricingItem>
                            <PricingItem included>OCR for scanned documents</PricingItem>
                            <PricingItem included>Unlimited processing</PricingItem>
                            <PricingItem included>All regional patterns</PricingItem>
                            <PricingItem included>Priority support</PricingItem>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Donation Section */}
            <section
                style={{
                    padding: '60px 24px',
                    maxWidth: '600px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}
            >
                <h2
                    style={{
                        fontSize: '24px',
                        fontWeight: 600,
                        color: '#1D1D1F',
                        marginBottom: '12px'
                    }}
                >
                    Support development
                </h2>
                <p
                    style={{
                        fontSize: '15px',
                        color: '#6E6E73',
                        marginBottom: '28px',
                        lineHeight: 1.5
                    }}
                >
                    Privacy Interceptor is built by a small independent team.
                    If you find it useful, consider buying us a coffee.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <a
                        href="https://buymeacoffee.com/zondaone"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 20px',
                            background: '#FFDD00',
                            color: '#000000',
                            fontWeight: 600,
                            fontSize: '14px',
                            borderRadius: '10px',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 221, 0, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <span>☕</span>
                        Buy Me a Coffee
                    </a>

                    <a
                        href="https://paypal.me/zondaone"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 20px',
                            background: '#0070BA',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '14px',
                            borderRadius: '10px',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 112, 186, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        PayPal
                    </a>
                </div>
            </section>

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
    return (
        <div
            style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                borderRadius: '14px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
            }}
        >
            <h3
                style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#1D1D1F',
                    marginBottom: '8px'
                }}
            >
                {title}
            </h3>
            <p
                style={{
                    fontSize: '14px',
                    color: '#6E6E73',
                    lineHeight: 1.45,
                    margin: 0
                }}
            >
                {description}
            </p>
        </div>
    );
}

function PricingItem({ children, included = false }: { children: React.ReactNode; included?: boolean }) {
    return (
        <li
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 0',
                fontSize: '14px',
                color: included ? '#1D1D1F' : '#AEAEB2'
            }}
        >
            <span
                style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 600,
                    background: included ? 'rgba(48, 209, 88, 0.12)' : 'rgba(0, 0, 0, 0.04)',
                    color: included ? '#30D158' : '#AEAEB2'
                }}
            >
                {included ? '✓' : '–'}
            </span>
            {children}
        </li>
    );
}
