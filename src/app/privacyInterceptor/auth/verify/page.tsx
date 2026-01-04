'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

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
            } catch (err) {
                setStatus('error');
                setErrorMessage('This link is invalid or has expired');
            }
        };

        verifyToken();
    }, [token]);

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

                {status === 'loading' && (
                    <>
                        <div
                            className="w-8 h-8 border-2 rounded-full mx-auto mb-4"
                            style={{
                                borderColor: 'rgba(0, 0, 0, 0.1)',
                                borderTopColor: '#FF3131',
                                animation: 'spin 0.8s linear infinite'
                            }}
                        />
                        <p style={{ color: '#6E6E73', fontSize: '14px' }}>Verifying your email...</p>
                    </>
                )}

                {status === 'success' && user && (
                    <>
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
                            You're signed in
                        </h1>
                        <p style={{ color: '#6E6E73', fontSize: '14px', marginBottom: '24px' }}>{user.email}</p>

                        <div
                            style={{
                                background: '#FFFFFF',
                                border: '1px solid rgba(0, 0, 0, 0.06)',
                                borderRadius: '14px',
                                padding: '16px 20px',
                                marginBottom: '24px',
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
                            }}
                        >
                            {user.isPremium ? (
                                <div className="flex items-center justify-center gap-2">
                                    <span
                                        style={{
                                            background: 'linear-gradient(135deg, #CF1D13 0%, #D16B00 100%)',
                                            color: 'white',
                                            fontSize: '10px',
                                            fontWeight: 700,
                                            padding: '4px 10px',
                                            borderRadius: '20px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em'
                                        }}
                                    >
                                        Premium
                                    </span>
                                    <span style={{ fontSize: '14px', color: '#1D1D1F' }}>Lifetime access active</span>
                                </div>
                            ) : (
                                <p style={{ fontSize: '14px', color: '#1D1D1F' }}>
                                    Return to the extension to continue
                                </p>
                            )}
                        </div>

                        <p style={{ fontSize: '12px', color: '#AEAEB2' }}>
                            You can close this tab
                        </p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div
                            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                            style={{
                                background: 'rgba(255, 49, 49, 0.1)'
                            }}
                        >
                            <svg className="w-7 h-7" style={{ color: '#FF3131' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                            Verification failed
                        </h1>
                        <p style={{ color: '#6E6E73', fontSize: '14px', marginBottom: '24px' }}>{errorMessage}</p>

                        <a
                            href="/privacyInterceptor/login"
                            style={{
                                display: 'inline-block',
                                padding: '14px 28px',
                                background: 'linear-gradient(135deg, #CF1D13 0%, #D16B00 100%)',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '14px',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                boxShadow: '0 4px 12px rgba(207, 29, 19, 0.25)',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(207, 29, 19, 0.35)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(207, 29, 19, 0.25)';
                            }}
                        >
                            Try again
                        </a>
                    </>
                )}
            </div>

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
