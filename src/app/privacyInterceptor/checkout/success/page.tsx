'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';

export default function CheckoutSuccessPage() {
    const [mounted, setMounted] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !contentRef.current) return;

        gsap.fromTo('.success-animate',
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' }
        );
    }, [mounted]);

    if (!mounted) return null;

    return (
        <div className="bg-white min-h-screen flex flex-col font-sans">
            <div className="flex-1 flex items-center justify-center px-6 py-16">
                <div ref={contentRef} className="w-full max-w-lg text-center">
                    {/* Icon */}
                    <div className="success-animate mb-8">
                        <Image
                            src="/pi_icon.png"
                            alt="Privacy Interceptor"
                            width={72}
                            height={72}
                            className="mx-auto rounded-2xl shadow-lg"
                        />
                    </div>

                    {/* Success checkmark */}
                    <div className="success-animate w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/30">
                        <CheckIcon className="w-10 h-10 text-white" />
                    </div>

                    <h1 className="success-animate font-display text-4xl sm:text-5xl font-semibold text-gray-900 tracking-tight mb-3">
                        You&apos;re all set
                    </h1>

                    <p className="success-animate text-lg text-gray-600 font-light mb-12">
                        Your premium access is now active—forever.
                    </p>

                    {/* What's next section - minimal cards */}
                    <div className="success-animate">
                        <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-6">
                            What&apos;s next
                        </p>

                        <div className="grid gap-4 text-left">
                            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                                    <ExtensionIcon className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 mb-1">Return to the extension</p>
                                    <p className="text-sm text-gray-500">Your account is synced automatically</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                    <UnlockIcon className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 mb-1">All features unlocked</p>
                                    <p className="text-sm text-gray-500">OCR, all formats, unlimited processing</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="success-animate text-sm text-gray-400 mt-10">
                        You can safely close this tab.
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

function CheckIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
        </svg>
    );
}

function ExtensionIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
    );
}

function UnlockIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 9.9-1" />
        </svg>
    );
}
