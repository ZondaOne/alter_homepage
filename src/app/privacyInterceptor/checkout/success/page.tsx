'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
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
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* Main Content */}
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px'
                }}
            >
                <div
                    style={{
                        width: '100%',
                        maxWidth: '420px',
                        textAlign: 'center',
                        animation: 'fadeIn 0.5s ease-out'
                    }}
                >
                    {/* Card Container */}
                    <div
                        style={{
                            background: '#FFFFFF',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            borderRadius: '20px',
                            padding: '40px 32px',
                            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
                        }}
                    >
                        {/* PI Icon */}
                        <div style={{ marginBottom: '28px' }}>
                            <Image
                                src="/pi_icon.png"
                                alt="Privacy Interceptor"
                                width={72}
                                height={72}
                                style={{
                                    borderRadius: '18px',
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                                    margin: '0 auto',
                                    display: 'block'
                                }}
                            />
                        </div>

                        {/* Success checkmark with celebration animation */}
                        <div style={{ animation: 'bounceIn 0.6s ease-out' }}>
                            <div
                                style={{
                                    width: '72px',
                                    height: '72px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 24px',
                                    background: 'linear-gradient(135deg, #30D158 0%, #34C759 100%)',
                                    boxShadow: '0 8px 32px rgba(48, 209, 88, 0.4)'
                                }}
                            >
                                <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>

                        <h1 style={{
                            fontSize: '28px',
                            fontWeight: 600,
                            color: '#1D1D1F',
                            marginBottom: '8px',
                            letterSpacing: '-0.02em'
                        }}>
                            Purchase complete
                        </h1>

                        <p style={{ color: '#6E6E73', fontSize: '16px', marginBottom: '28px', lineHeight: 1.5 }}>
                            Thank you for your purchase!
                        </p>

                        {/* Premium badge card */}
                        <div
                            style={{
                                background: 'linear-gradient(135deg, rgba(207, 29, 19, 0.06) 0%, rgba(209, 107, 0, 0.06) 100%)',
                                border: '1px solid rgba(207, 29, 19, 0.12)',
                                borderRadius: '16px',
                                padding: '20px 24px',
                                marginBottom: '24px'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
                                <span
                                    style={{
                                        background: 'linear-gradient(135deg, #CF1D13 0%, #D16B00 100%)',
                                        color: 'white',
                                        fontSize: '11px',
                                        fontWeight: 700,
                                        padding: '6px 14px',
                                        borderRadius: '20px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.06em',
                                        boxShadow: '0 4px 12px rgba(207, 29, 19, 0.25)'
                                    }}
                                >
                                    ✓ Premium Lifetime
                                </span>
                            </div>
                            <p style={{ fontSize: '14px', color: '#1D1D1F', lineHeight: 1.5 }}>
                                Unlimited access has been activated for your account.
                            </p>
                        </div>

                        {/* Features unlocked */}
                        <div
                            style={{
                                background: 'rgba(48, 209, 88, 0.08)',
                                border: '1px solid rgba(48, 209, 88, 0.12)',
                                borderRadius: '14px',
                                padding: '20px',
                                marginBottom: '24px'
                            }}
                        >
                            <p style={{
                                fontSize: '12px',
                                color: '#30D158',
                                fontWeight: 600,
                                marginBottom: '14px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>
                                Features unlocked
                            </p>
                            <div style={{ fontSize: '14px', color: '#1D1D1F', textAlign: 'left' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                    <span style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        background: 'rgba(48, 209, 88, 0.15)',
                                        color: '#30D158',
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>✓</span>
                                    <span>Unlimited file processing</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                    <span style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        background: 'rgba(48, 209, 88, 0.15)',
                                        color: '#30D158',
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>✓</span>
                                    <span>OCR for scanned documents</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        background: 'rgba(48, 209, 88, 0.15)',
                                        color: '#30D158',
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>✓</span>
                                    <span>All file formats supported</span>
                                </div>
                            </div>
                        </div>

                        <p style={{ fontSize: '13px', color: '#AEAEB2', lineHeight: 1.5 }}>
                            Return to the extension to use all features.<br />
                            You can close this tab.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer
                style={{
                    padding: '24px',
                    textAlign: 'center',
                    borderTop: '1px solid rgba(0, 0, 0, 0.04)'
                }}
            >
                <Link
                    href="/privacyInterceptor"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        textDecoration: 'none',
                        color: '#6E6E73',
                        fontSize: '13px',
                        transition: 'color 0.2s ease'
                    }}
                >
                    <Image
                        src="/pi_icon.png"
                        alt="Privacy Interceptor"
                        width={20}
                        height={20}
                        style={{ borderRadius: '5px' }}
                    />
                    Privacy Interceptor
                </Link>
            </footer>

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes bounceIn {
                    0% { opacity: 0; transform: scale(0.3); }
                    50% { transform: scale(1.05); }
                    70% { transform: scale(0.95); }
                    100% { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
}

