'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            setErrorMessage('Enter a valid email address');
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch(`${API_URL}/auth/request`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Failed to send verification email');
            }

            setStatus('sent');
        } catch {
            setErrorMessage('Something went wrong. Try again.');
            setStatus('error');
        }
    };

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
                        {/* Header with PI Icon */}
                        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                            <Image
                                src="/pi_icon.png"
                                alt="Privacy Interceptor"
                                width={72}
                                height={72}
                                style={{
                                    borderRadius: '18px',
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                                    marginBottom: '24px',
                                    display: 'block',
                                    margin: '0 auto 24px'
                                }}
                            />
                            <h1 style={{
                                fontSize: '26px',
                                fontWeight: 600,
                                color: '#1D1D1F',
                                marginBottom: '8px',
                                letterSpacing: '-0.02em'
                            }}>
                                Sign in to Privacy Interceptor
                            </h1>
                            <p style={{ color: '#6E6E73', fontSize: '15px', lineHeight: 1.5 }}>
                                Unlock all premium features
                            </p>
                        </div>

                        {/* How it works */}
                        <div
                            style={{
                                background: 'rgba(0, 0, 0, 0.02)',
                                border: '1px solid rgba(0, 0, 0, 0.04)',
                                borderRadius: '14px',
                                padding: '20px',
                                marginBottom: '24px'
                            }}
                        >
                            <p style={{
                                fontSize: '11px',
                                fontWeight: 600,
                                color: '#6E6E73',
                                textTransform: 'uppercase',
                                letterSpacing: '0.06em',
                                marginBottom: '16px'
                            }}>
                                How it works
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, rgba(207, 29, 19, 0.1) 0%, rgba(209, 107, 0, 0.1) 100%)',
                                        color: '#CF1D13',
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>1</span>
                                    <span style={{ fontSize: '14px', color: '#1D1D1F' }}>Enter your email below</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, rgba(207, 29, 19, 0.1) 0%, rgba(209, 107, 0, 0.1) 100%)',
                                        color: '#CF1D13',
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>2</span>
                                    <span style={{ fontSize: '14px', color: '#1D1D1F' }}>Click the magic link in your inbox</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, rgba(207, 29, 19, 0.1) 0%, rgba(209, 107, 0, 0.1) 100%)',
                                        color: '#CF1D13',
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>3</span>
                                    <span style={{ fontSize: '14px', color: '#1D1D1F' }}>Complete one-time payment (€0.99)</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        background: 'rgba(48, 209, 88, 0.12)',
                                        color: '#30D158',
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>✓</span>
                                    <span style={{ fontSize: '14px', color: '#1D1D1F', fontWeight: 500 }}>Lifetime access unlocked!</span>
                                </div>
                            </div>
                        </div>

                        {status === 'sent' ? (
                            <div style={{ animation: 'scaleIn 0.4s ease-out' }}>
                                <div
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 20px',
                                        background: 'rgba(48, 209, 88, 0.12)'
                                    }}
                                >
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#30D158" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <p style={{
                                    fontWeight: 600,
                                    color: '#1D1D1F',
                                    marginBottom: '8px',
                                    textAlign: 'center',
                                    fontSize: '18px'
                                }}>
                                    Check your inbox
                                </p>
                                <p style={{ color: '#6E6E73', fontSize: '15px', textAlign: 'center', marginBottom: '20px', lineHeight: 1.5 }}>
                                    We sent a sign-in link to<br />
                                    <strong style={{ color: '#1D1D1F' }}>{email}</strong>
                                </p>
                                <p style={{ fontSize: '13px', color: '#AEAEB2', textAlign: 'center', marginBottom: '20px', lineHeight: 1.5 }}>
                                    Click the link to sign in, then you&apos;ll be prompted to complete your purchase.
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        padding: '12px',
                                        background: 'transparent',
                                        border: '1px solid rgba(0, 0, 0, 0.08)',
                                        borderRadius: '10px',
                                        color: '#6E6E73',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.color = '#1D1D1F';
                                        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.15)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.color = '#6E6E73';
                                        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                                    }}
                                >
                                    Use a different email
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '16px' }}>
                                    <label htmlFor="email" style={{ display: 'none' }}>Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        disabled={status === 'loading'}
                                        style={{
                                            width: '100%',
                                            padding: '16px 18px',
                                            background: 'rgba(0, 0, 0, 0.02)',
                                            border: '1px solid rgba(0, 0, 0, 0.08)',
                                            borderRadius: '12px',
                                            fontSize: '16px',
                                            color: '#1D1D1F',
                                            outline: 'none',
                                            transition: 'all 0.2s ease',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => {
                                            e.currentTarget.style.borderColor = '#CF1D13';
                                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(207, 29, 19, 0.1)';
                                            e.currentTarget.style.background = '#FFFFFF';
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                                            e.currentTarget.style.boxShadow = 'none';
                                            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.02)';
                                        }}
                                    />
                                </div>

                                {status === 'error' && (
                                    <div
                                        style={{
                                            background: 'rgba(255, 59, 48, 0.08)',
                                            border: '1px solid rgba(255, 59, 48, 0.15)',
                                            borderRadius: '10px',
                                            padding: '12px 14px',
                                            marginBottom: '16px',
                                            animation: 'shakeIn 0.4s ease-out'
                                        }}
                                    >
                                        <p style={{ color: '#FF3B30', fontSize: '14px', margin: 0 }}>
                                            {errorMessage}
                                        </p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    style={{
                                        width: '100%',
                                        padding: '16px',
                                        background: 'linear-gradient(135deg, #CF1D13 0%, #D16B00 100%)',
                                        color: 'white',
                                        fontWeight: 600,
                                        fontSize: '16px',
                                        border: 'none',
                                        borderRadius: '12px',
                                        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                                        boxShadow: '0 4px 16px rgba(207, 29, 19, 0.3)',
                                        transition: 'all 0.2s ease',
                                        opacity: status === 'loading' ? 0.7 : 1
                                    }}
                                    onMouseOver={(e) => {
                                        if (status !== 'loading') {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(207, 29, 19, 0.4)';
                                        }
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(207, 29, 19, 0.3)';
                                    }}
                                >
                                    {status === 'loading' ? (
                                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                            <span
                                                style={{
                                                    width: '18px',
                                                    height: '18px',
                                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                                    borderTopColor: 'white',
                                                    borderRadius: '50%',
                                                    animation: 'spin 0.8s linear infinite'
                                                }}
                                            />
                                            Sending...
                                        </span>
                                    ) : 'Continue'}
                                </button>
                            </form>
                        )}

                        <p style={{ marginTop: '24px', fontSize: '12px', color: '#AEAEB2', textAlign: 'center' }}>
                            No password needed. Secure magic link authentication.
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
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

