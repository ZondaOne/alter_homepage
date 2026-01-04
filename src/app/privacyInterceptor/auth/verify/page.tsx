'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function VerifyPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [user, setUser] = useState<{ email: string; isPremium: boolean } | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setErrorMessage('Invalid verification link');
            return;
        }

        const verifyToken = async () => {
            try {
                const response = await fetch(`${API_URL}/auth/verify`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token }),
                });

                if (!response.ok) {
                    throw new Error('Verification failed');
                }

                const data = await response.json();

                // Send token to extension via postMessage
                // The auth-bridge.js content script will receive this
                window.postMessage({
                    type: 'PI_AUTH_TOKEN',
                    token: data.token,
                    user: data.user
                }, '*');

                setUser(data.user);
                setStatus('success');
            } catch {
                setStatus('error');
                setErrorMessage('This link is invalid or has expired');
            }
        };

        verifyToken();
    }, [token]);

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
                        maxWidth: '400px',
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

                        {status === 'loading' && (
                            <div style={{ animation: 'pulse 1.5s ease-in-out infinite' }}>
                                <div
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        border: '3px solid rgba(207, 29, 19, 0.15)',
                                        borderTopColor: '#CF1D13',
                                        borderRadius: '50%',
                                        margin: '0 auto 20px',
                                        animation: 'spin 0.8s linear infinite'
                                    }}
                                />
                                <h1 style={{
                                    fontSize: '22px',
                                    fontWeight: 600,
                                    color: '#1D1D1F',
                                    marginBottom: '8px',
                                    letterSpacing: '-0.01em'
                                }}>
                                    Verifying your email
                                </h1>
                                <p style={{ color: '#6E6E73', fontSize: '15px', lineHeight: 1.5 }}>
                                    Just a moment...
                                </p>
                            </div>
                        )}

                        {status === 'success' && user && (
                            <div style={{ animation: 'scaleIn 0.4s ease-out' }}>
                                <div
                                    style={{
                                        width: '64px',
                                        height: '64px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 24px',
                                        background: 'linear-gradient(135deg, #30D158 0%, #34C759 100%)',
                                        boxShadow: '0 8px 24px rgba(48, 209, 88, 0.35)'
                                    }}
                                >
                                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>

                                <h1 style={{
                                    fontSize: '26px',
                                    fontWeight: 600,
                                    color: '#1D1D1F',
                                    marginBottom: '8px',
                                    letterSpacing: '-0.02em'
                                }}>
                                    You&apos;re signed in
                                </h1>
                                <p style={{ color: '#6E6E73', fontSize: '15px', marginBottom: '24px' }}>
                                    {user.email}
                                </p>

                                {/* Status Badge */}
                                <div
                                    style={{
                                        background: user.isPremium
                                            ? 'linear-gradient(135deg, rgba(207, 29, 19, 0.08) 0%, rgba(209, 107, 0, 0.08) 100%)'
                                            : 'rgba(0, 0, 0, 0.03)',
                                        border: user.isPremium
                                            ? '1px solid rgba(207, 29, 19, 0.15)'
                                            : '1px solid rgba(0, 0, 0, 0.06)',
                                        borderRadius: '14px',
                                        padding: '16px 20px',
                                        marginBottom: '24px'
                                    }}
                                >
                                    {user.isPremium ? (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                            <span
                                                style={{
                                                    background: 'linear-gradient(135deg, #CF1D13 0%, #D16B00 100%)',
                                                    color: 'white',
                                                    fontSize: '10px',
                                                    fontWeight: 700,
                                                    padding: '5px 12px',
                                                    borderRadius: '20px',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.06em'
                                                }}
                                            >
                                                Premium
                                            </span>
                                            <span style={{ fontSize: '14px', color: '#1D1D1F', fontWeight: 500 }}>
                                                Lifetime access active
                                            </span>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                            <span
                                                style={{
                                                    background: 'rgba(0, 0, 0, 0.08)',
                                                    color: '#6E6E73',
                                                    fontSize: '10px',
                                                    fontWeight: 700,
                                                    padding: '5px 12px',
                                                    borderRadius: '20px',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.06em'
                                                }}
                                            >
                                                Free
                                            </span>
                                            <span style={{ fontSize: '14px', color: '#1D1D1F' }}>
                                                Return to the extension
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <p style={{ fontSize: '13px', color: '#AEAEB2' }}>
                                    You can close this tab
                                </p>
                            </div>
                        )}

                        {status === 'error' && (
                            <div style={{ animation: 'shakeIn 0.5s ease-out' }}>
                                <div
                                    style={{
                                        width: '64px',
                                        height: '64px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 24px',
                                        background: 'rgba(255, 59, 48, 0.1)'
                                    }}
                                >
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>

                                <h1 style={{
                                    fontSize: '26px',
                                    fontWeight: 600,
                                    color: '#1D1D1F',
                                    marginBottom: '8px',
                                    letterSpacing: '-0.02em'
                                }}>
                                    Verification failed
                                </h1>
                                <p style={{ color: '#6E6E73', fontSize: '15px', marginBottom: '28px', lineHeight: 1.5 }}>
                                    {errorMessage}
                                </p>

                                <a
                                    href="/privacyInterceptor/login"
                                    style={{
                                        display: 'inline-block',
                                        padding: '16px 32px',
                                        background: 'linear-gradient(135deg, #CF1D13 0%, #D16B00 100%)',
                                        color: 'white',
                                        fontWeight: 600,
                                        fontSize: '15px',
                                        borderRadius: '12px',
                                        textDecoration: 'none',
                                        boxShadow: '0 4px 16px rgba(207, 29, 19, 0.3)',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(207, 29, 19, 0.4)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(207, 29, 19, 0.3)';
                                    }}
                                >
                                    Try again
                                </a>
                            </div>
                        )}
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
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes shakeIn {
                    0% { opacity: 0; transform: translateX(-8px); }
                    25% { transform: translateX(6px); }
                    50% { transform: translateX(-4px); }
                    75% { transform: translateX(2px); }
                    100% { opacity: 1; transform: translateX(0); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
