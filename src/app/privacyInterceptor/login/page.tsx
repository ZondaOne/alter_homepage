'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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
        } catch (err) {
            setErrorMessage('Something went wrong. Try again.');
            setStatus('error');
        }
    };

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
                className="w-full max-w-sm"
                style={{
                    animation: 'fadeIn 0.4s ease-out'
                }}
            >
                {/* Header with PI Icon */}
                <div className="text-center mb-8">
                    <Image
                        src="/pi_icon.png"
                        alt="Privacy Interceptor"
                        width={64}
                        height={64}
                        className="mx-auto mb-4"
                        style={{
                            borderRadius: '16px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                        }}
                    />
                    <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#1D1D1F', marginBottom: '4px' }}>
                        Sign in to Privacy Interceptor
                    </h1>
                    <p style={{ color: '#6E6E73', fontSize: '14px' }}>
                        Unlock all premium features
                    </p>
                </div>

                {/* How it works */}
                <div
                    style={{
                        background: '#FFFFFF',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        borderRadius: '14px',
                        padding: '16px',
                        marginBottom: '20px',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
                    }}
                >
                    <p style={{ fontSize: '11px', fontWeight: 600, color: '#6E6E73', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                        How it works
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(207, 29, 19, 0.1)', color: '#CF1D13', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
                            <span style={{ fontSize: '13px', color: '#1D1D1F' }}>Enter your email below</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(207, 29, 19, 0.1)', color: '#CF1D13', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
                            <span style={{ fontSize: '13px', color: '#1D1D1F' }}>Click the magic link in your inbox</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(207, 29, 19, 0.1)', color: '#CF1D13', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
                            <span style={{ fontSize: '13px', color: '#1D1D1F' }}>Complete one-time payment (€0.99)</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(48, 209, 88, 0.12)', color: '#30D158', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>
                            <span style={{ fontSize: '13px', color: '#1D1D1F' }}>Lifetime access unlocked!</span>
                        </div>
                    </div>
                </div>

                {status === 'sent' ? (
                    <div
                        style={{
                            background: '#FFFFFF',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            borderRadius: '14px',
                            padding: '24px',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                            animation: 'fadeIn 0.3s ease-out'
                        }}
                    >
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                            style={{
                                background: 'rgba(48, 209, 88, 0.12)'
                            }}
                        >
                            <svg className="w-6 h-6" style={{ color: '#30D158' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p style={{ fontWeight: 600, color: '#1D1D1F', marginBottom: '8px', textAlign: 'center' }}>
                            Check your inbox
                        </p>
                        <p style={{ color: '#6E6E73', fontSize: '14px', textAlign: 'center', marginBottom: '16px' }}>
                            We sent a sign-in link to<br />
                            <strong style={{ color: '#1D1D1F' }}>{email}</strong>
                        </p>
                        <p style={{ fontSize: '12px', color: '#AEAEB2', textAlign: 'center', marginBottom: '16px' }}>
                            Click the link to sign in, then you'll be prompted to complete your purchase.
                        </p>
                        <button
                            onClick={() => setStatus('idle')}
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '10px',
                                background: 'transparent',
                                border: 'none',
                                color: '#6E6E73',
                                fontSize: '14px',
                                cursor: 'pointer',
                                transition: 'color 0.2s ease'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = '#1D1D1F'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#6E6E73'}
                        >
                            Use a different email
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '16px' }}>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                disabled={status === 'loading'}
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    background: '#FFFFFF',
                                    border: '1px solid rgba(0, 0, 0, 0.06)',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    color: '#1D1D1F',
                                    outline: 'none',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#FF3131';
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 49, 49, 0.08)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.06)';
                                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04)';
                                }}
                            />
                        </div>

                        {status === 'error' && (
                            <p style={{ color: '#FF3131', fontSize: '13px', marginBottom: '16px' }}>
                                {errorMessage}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            style={{
                                width: '100%',
                                padding: '14px',
                                background: 'linear-gradient(135deg, #CF1D13 0%, #D16B00 100%)',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '15px',
                                border: 'none',
                                borderRadius: '12px',
                                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                                boxShadow: '0 4px 12px rgba(207, 29, 19, 0.25)',
                                transition: 'all 0.2s ease',
                                opacity: status === 'loading' ? 0.7 : 1
                            }}
                            onMouseOver={(e) => {
                                if (status !== 'loading') {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(207, 29, 19, 0.35)';
                                }
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(207, 29, 19, 0.25)';
                            }}
                        >
                            {status === 'loading' ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span
                                        className="w-4 h-4 border-2 rounded-full"
                                        style={{
                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                            borderTopColor: 'white',
                                            animation: 'spin 0.8s linear infinite'
                                        }}
                                    />
                                    Sending...
                                </span>
                            ) : 'Continue'}
                        </button>
                    </form>
                )}

                <p style={{ marginTop: '24px', fontSize: '11px', color: '#AEAEB2', textAlign: 'center' }}>
                    No password needed. Secure magic link authentication.
                </p>
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
