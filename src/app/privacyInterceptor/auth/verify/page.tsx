'use client';

import { useEffect, useState, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

function VerifyContent() {
    const { t, ready } = useTranslation();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [user, setUser] = useState<{ email: string; isPremium: boolean } | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [mounted, setMounted] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setErrorMessage(t('privacyInterceptor.authVerify.invalidLink'));
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

                window.postMessage({
                    type: 'PI_AUTH_TOKEN',
                    token: data.token,
                    user: data.user
                }, '*');

                setUser(data.user);
                setStatus('success');
            } catch {
                setStatus('error');
                setErrorMessage(t('privacyInterceptor.authVerify.linkExpired'));
            }
        };

        verifyToken();
    }, [token, t]);

    useEffect(() => {
        if (!mounted || !contentRef.current || status === 'loading') return;

        gsap.fromTo('.verify-animate',
            { opacity: 0, y: 30, rotationX: 10 },
            { opacity: 1, y: 0, rotationX: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
        );
    }, [mounted, status]);

    if (!mounted || !ready) return null;

    return (
        <div className="bg-white min-h-screen flex flex-col font-sans">
            <div className="flex-1 flex items-center justify-center px-6 py-16">
                <div ref={contentRef} className="w-full max-w-md text-center">
                    {/* Icon */}
                    <div className="mb-8">
                        <Image
                            src="/pi_icon.png"
                            alt="Privacy Interceptor"
                            width={72}
                            height={72}
                            className="mx-auto rounded-2xl shadow-lg"
                        />
                    </div>

                    {status === 'loading' && (
                        <div>
                            <div className="w-12 h-12 border-3 border-gray-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-6"
                                style={{ borderWidth: '3px' }} />
                            <h1 className="font-display text-3xl font-semibold text-gray-900 tracking-tight mb-2">
                                {t('privacyInterceptor.authVerify.verifyingTitle')}
                            </h1>
                            <p className="text-gray-600">{t('privacyInterceptor.authVerify.verifyingSubtitle')}</p>
                        </div>
                    )}

                    {status === 'success' && user && (
                        <div>
                            <div className="verify-animate w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                                <CheckIcon className="w-8 h-8 text-white" />
                            </div>

                            <h1 className="verify-animate font-display text-4xl font-semibold text-gray-900 tracking-tight mb-2">
                                {t('privacyInterceptor.authVerify.successTitle')}
                            </h1>
                            <p className="verify-animate text-gray-600 mb-8">{user.email}</p>

                            {/* Status Badge */}
                            <div className={`verify-animate rounded-2xl p-5 mb-8 ${user.isPremium
                                ? 'bg-orange-50 border border-orange-100'
                                : 'bg-gray-50 border border-gray-100'
                                }`}>
                                <div className="flex items-center justify-center gap-3">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${user.isPremium
                                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                                        : 'bg-gray-200 text-gray-600'
                                        }`}>
                                        {user.isPremium ? t('privacyInterceptor.authVerify.premium') : t('privacyInterceptor.authVerify.free')}
                                    </span>
                                    <span className="text-sm text-gray-900 font-medium">
                                        {user.isPremium ? t('privacyInterceptor.authVerify.lifetimeActive') : t('privacyInterceptor.authVerify.returnExtension')}
                                    </span>
                                </div>
                            </div>

                            <p className="verify-animate text-sm text-gray-400">
                                {t('privacyInterceptor.authVerify.closeTab')}
                            </p>
                        </div>
                    )}

                    {status === 'error' && (
                        <div>
                            <div className="verify-animate w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
                                <XIcon className="w-8 h-8 text-red-500" />
                            </div>

                            <h1 className="verify-animate font-display text-4xl font-semibold text-gray-900 tracking-tight mb-3">
                                {t('privacyInterceptor.authVerify.errorTitle')}
                            </h1>
                            <p className="verify-animate text-gray-600 mb-8">{errorMessage}</p>

                            <Link
                                href="/privacyInterceptor/login"
                                className="verify-animate inline-block px-8 py-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
                            >
                                {t('privacyInterceptor.authVerify.tryAgain')}
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer className="py-6 text-center border-t border-gray-100">
                <Link
                    href="/privacyInterceptor"
                    className="inline-flex items-center gap-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
                >
                    <Image
                        src="/pi_icon.png"
                        alt="Privacy Interceptor"
                        width={20}
                        height={20}
                        className="rounded"
                    />
                    Privacy Interceptor
                </Link>
            </footer>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={
            <div className="h-screen w-screen flex items-center justify-center bg-white">
                <div className="w-10 h-10 border-3 border-gray-200 border-t-orange-500 rounded-full animate-spin"
                    style={{ borderWidth: '3px' }} />
            </div>
        }>
            <VerifyContent />
        </Suspense>
    );
}

function CheckIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
        </svg>
    );
}

function XIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
}
