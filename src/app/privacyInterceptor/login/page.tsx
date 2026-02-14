'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function LoginPage() {
    const { t, ready } = useTranslation();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [mounted, setMounted] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !formRef.current) return;

        gsap.set('.login-animate', {
            opacity: 0,
            y: 30,
            rotationX: 10,
            force3D: true
        });

        gsap.to('.login-animate', {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.1
        });
    }, [mounted]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            setErrorMessage(t('privacyInterceptor.login.invalidEmail'));
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
            setErrorMessage(t('privacyInterceptor.login.errorGeneric'));
            setStatus('error');
        }
    };

    if (!mounted || !ready) return null;

    return (
        <div className="bg-white min-h-screen flex flex-col font-sans">
            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center px-6 py-16">
                <div ref={formRef} className="w-full max-w-md">
                    {/* Header */}
                    <div className="login-animate text-center mb-10">
                        <Image
                            src="/pi_icon.png"
                            alt="Privacy Interceptor"
                            width={72}
                            height={72}
                            className="mx-auto rounded-2xl shadow-lg mb-6"
                        />
                        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-gray-900 tracking-tight mb-3">
                            {t('privacyInterceptor.login.title')}
                        </h1>
                        <p className="text-gray-600 text-lg font-light">
                            {t('privacyInterceptor.login.subtitle')}
                        </p>
                    </div>

                    {/* How it works */}
                    <div className="login-animate bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-8">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-5">
                            {t('privacyInterceptor.login.howItWorks')}
                        </p>
                        <div className="space-y-4">
                            <StepItem number="1" text={t('privacyInterceptor.login.step1')} />
                            <StepItem number="2" text={t('privacyInterceptor.login.step2')} />
                            <StepItem number="3" text={t('privacyInterceptor.login.step3')} />
                            <StepItem number="✓" text={t('privacyInterceptor.login.step4')} isSuccess />
                        </div>
                    </div>

                    {status === 'sent' ? (
                        <div className="login-animate text-center">
                            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                                <MailIcon className="w-8 h-8 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                {t('privacyInterceptor.login.checkInbox')}
                            </h2>
                            <p className="text-gray-600 mb-2">
                                {t('privacyInterceptor.login.weSentLink')}
                            </p>
                            <p className="text-gray-900 font-medium mb-6">{email}</p>
                            <p className="text-sm text-gray-400 mb-6">
                                {t('privacyInterceptor.login.clickToSignIn')}
                            </p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="text-gray-600 text-sm font-medium hover:text-gray-900 transition-colors"
                            >
                                {t('privacyInterceptor.login.useDifferentEmail')}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="login-animate">
                            <div className="mb-4">
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t('privacyInterceptor.login.emailPlaceholder')}
                                    disabled={status === 'loading'}
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-900 placeholder-gray-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all disabled:opacity-60"
                                />
                            </div>

                            {status === 'error' && (
                                <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-4">
                                    <p className="text-red-600 text-sm">{errorMessage}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-4 bg-gray-900 text-white font-medium text-base rounded-xl hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                            >
                                {status === 'loading' ? (
                                    <span className="flex items-center justify-center gap-3">
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        {t('privacyInterceptor.login.sendingButton')}
                                    </span>
                                ) : t('privacyInterceptor.login.continueButton')}
                            </button>
                        </form>
                    )}

                    <p className="login-animate text-center text-sm text-gray-400 mt-6">
                        {t('privacyInterceptor.login.securityNote')}
                    </p>
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

function StepItem({ number, text, isSuccess = false }: { number: string; text: string; isSuccess?: boolean }) {
    return (
        <div className="flex items-center gap-4">
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${isSuccess
                ? 'bg-green-100 text-green-600'
                : 'bg-orange-100 text-orange-600'
                }`}>
                {number}
            </span>
            <span className={`text-sm ${isSuccess ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                {text}
            </span>
        </div>
    );
}

function MailIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    );
}
