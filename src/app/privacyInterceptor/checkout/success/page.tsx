'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function CheckoutSuccessPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{
                background: '#F5F5F7',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
            }}
        >
            <div
                className="w-full max-w-sm text-center"
                style={{
                    animation: 'fadeIn 0.4s ease-out'
                }}
            >
                {/* PI Icon */}
                <div className="mb-6">
                    <Image
                        src="/pi_icon.png"
                        alt="Privacy Interceptor"
                        width={64}
                        height={64}
                        className="mx-auto"
                        style={{
                            borderRadius: '16px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                        }}
                    />
                </div>

                {/* Success checkmark */}
                <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{
                        background: 'linear-gradient(135deg, #30D158 0%, #34C759 100%)',
                        boxShadow: '0 4px 12px rgba(48, 209, 88, 0.3)'
                    }}
                >
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                    Purchase complete
                </h1>

                <p style={{ color: '#6E6E73', fontSize: '14px', marginBottom: '24px' }}>
                    Thank you for your purchase!
                </p>

                {/* Premium card */}
                <div
                    style={{
                        background: '#FFFFFF',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        borderRadius: '14px',
                        padding: '20px',
                        marginBottom: '24px',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
                    }}
                >
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #CF1D13 0%, #D16B00 100%)',
                                color: 'white',
                                fontSize: '10px',
                                fontWeight: 700,
                                padding: '4px 12px',
                                borderRadius: '20px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                boxShadow: '0 2px 8px rgba(207, 29, 19, 0.2)'
                            }}
                        >
                            ✓ Premium Lifetime
                        </span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#1D1D1F' }}>
                        Unlimited access has been activated for your account.
                    </p>
                </div>

                {/* Features unlocked */}
                <div
                    style={{
                        background: 'rgba(48, 209, 88, 0.08)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginBottom: '24px'
                    }}
                >
                    <p style={{ fontSize: '12px', color: '#30D158', fontWeight: 600, marginBottom: '8px' }}>
                        Features unlocked:
                    </p>
                    <div style={{ fontSize: '13px', color: '#1D1D1F', textAlign: 'left' }}>
                        <div className="flex items-center gap-2 mb-1">
                            <span style={{ color: '#30D158' }}>✓</span>
                            <span>Unlimited file processing</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                            <span style={{ color: '#30D158' }}>✓</span>
                            <span>OCR for scanned documents</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span style={{ color: '#30D158' }}>✓</span>
                            <span>All file formats supported</span>
                        </div>
                    </div>
                </div>

                <p style={{ fontSize: '12px', color: '#AEAEB2' }}>
                    Return to the extension to use all features.<br />
                    You can close this tab.
                </p>
            </div>

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
