"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PrivacyInterceptorPrivacy() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
                        ← Back to Zonda
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-400 rounded-2xl flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight text-gray-900 font-display">
                                Privacy Interceptor
                            </h1>
                            <p className="text-lg text-gray-500">Privacy Policy</p>
                        </div>
                    </div>
                    <p className="text-gray-600">Last updated: January 18, 2026</p>
                </div>

                {/* TL;DR */}
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-12">
                    <h2 className="text-xl font-semibold text-green-800 mb-2">
                        The Short Version
                    </h2>
                    <p className="text-green-700 text-lg">
                        <strong>We don&apos;t collect, store, or transmit any of your data. Period.</strong>
                        <br />
                        All document processing happens entirely on your device. Your files never leave your browser.
                    </p>
                </div>

                <div className="prose prose-gray prose-lg max-w-none">
                    {/* Data Collection */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Data Collection
                        </h2>

                        <h3 className="text-xl font-medium text-gray-800 mb-3">
                            What We DON&apos;T Collect
                        </h3>
                        <ul className="list-none space-y-2 mb-6">
                            <li className="flex items-center text-gray-600">
                                <span className="text-red-500 mr-3">✗</span>
                                Your documents or files
                            </li>
                            <li className="flex items-center text-gray-600">
                                <span className="text-red-500 mr-3">✗</span>
                                The content of your documents
                            </li>
                            <li className="flex items-center text-gray-600">
                                <span className="text-red-500 mr-3">✗</span>
                                Your browsing history
                            </li>
                            <li className="flex items-center text-gray-600">
                                <span className="text-red-500 mr-3">✗</span>
                                Personal information
                            </li>
                            <li className="flex items-center text-gray-600">
                                <span className="text-red-500 mr-3">✗</span>
                                Usage analytics or telemetry
                            </li>
                            <li className="flex items-center text-gray-600">
                                <span className="text-red-500 mr-3">✗</span>
                                IP addresses or device identifiers
                            </li>
                        </ul>

                        <h3 className="text-xl font-medium text-gray-800 mb-3">
                            What We Store Locally
                        </h3>
                        <p className="text-gray-600 mb-4">
                            The extension stores the following data <strong>locally on your device</strong> using Chrome&apos;s storage API:
                        </p>
                        <div className="bg-gray-50 rounded-xl p-4 mb-4">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-2 text-gray-700 font-medium">Data</th>
                                        <th className="py-2 text-gray-700 font-medium">Purpose</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600">
                                    <tr className="border-b border-gray-100">
                                        <td className="py-2">Toggle preferences</td>
                                        <td className="py-2">Remember your detection settings</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-2">Region selection</td>
                                        <td className="py-2">Apply appropriate ID patterns</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-2">Language preference</td>
                                        <td className="py-2">OCR language for scanned documents</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2">License key</td>
                                        <td className="py-2">Validate lifetime access (if purchased)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-gray-500 text-sm">
                            This data never leaves your device, is not transmitted to any server, is not shared with anyone, and can be deleted by uninstalling the extension.
                        </p>
                    </section>

                    {/* Data Controller */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Data Controller
                        </h2>
                        <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-gray-700 mb-2">
                                <strong>Operated by:</strong> ZondaOne (individual developer)
                            </p>
                            <p className="text-gray-700 mb-2">
                                <strong>Location:</strong> European Union
                            </p>
                            <p className="text-gray-700">
                                <strong>Contact:</strong>{" "}
                                <a href="mailto:team@zonda.one" className="text-blue-600 hover:underline">
                                    team@zonda.one
                                </a>
                            </p>
                        </div>
                        <p className="text-gray-500 text-sm mt-4">
                            As Privacy Interceptor does not collect or process any personal data, we act as a software provider rather than a data controller in the traditional sense. All data processing occurs locally on your device under your control.
                        </p>
                    </section>

                    {/* Legal Basis */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Legal Basis (GDPR)
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Under the General Data Protection Regulation (GDPR), processing personal data requires a legal basis. Privacy Interceptor is designed to <strong>not process any personal data</strong> on our end:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                            <li><strong>No data transmission:</strong> Your documents are never sent to our servers</li>
                            <li><strong>No data storage:</strong> We do not store any information about you or your files</li>
                            <li><strong>Local processing only:</strong> All detection and redaction happens in your browser</li>
                        </ul>
                        <p className="text-gray-600">
                            The only data stored (your preferences) is kept locally on your device via Chrome&apos;s storage API and is never transmitted to us. This local storage is based on your <strong>consent</strong> when you install and configure the extension.
                        </p>
                    </section>

                    {/* Document Processing */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Document Processing
                        </h2>

                        <h3 className="text-xl font-medium text-gray-800 mb-3">
                            How It Works
                        </h3>
                        <ol className="list-decimal list-inside text-gray-600 space-y-2 mb-6">
                            <li>When you select a file for upload, Privacy Interceptor intercepts it</li>
                            <li>The file is scanned <strong>locally</strong> using pattern matching and OCR</li>
                            <li>Sensitive data is detected and shown to you</li>
                            <li>You choose what to redact</li>
                            <li>Redaction happens <strong>locally</strong> on your device</li>
                            <li>The redacted file replaces the original for upload</li>
                        </ol>

                        <h3 className="text-xl font-medium text-gray-800 mb-3">
                            No Cloud Processing
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-red-50 rounded-xl p-4">
                                <p className="font-medium text-red-800 mb-2">We Do NOT:</p>
                                <ul className="text-red-700 space-y-1 text-sm">
                                    <li>• Upload files to any server</li>
                                    <li>• Use cloud AI or ML services</li>
                                    <li>• Have access to your documents</li>
                                </ul>
                            </div>
                            <div className="bg-green-50 rounded-xl p-4">
                                <p className="font-medium text-green-800 mb-2">We DO:</p>
                                <ul className="text-green-700 space-y-1 text-sm">
                                    <li>• Process using your device&apos;s CPU</li>
                                    <li>• Run OCR locally via Tesseract.js</li>
                                    <li>• Use local regex for detection</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Permissions */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Permissions Explained
                        </h2>
                        <div className="bg-gray-50 rounded-xl p-4">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-2 text-gray-700 font-medium">Permission</th>
                                        <th className="py-2 text-gray-700 font-medium">Why We Need It</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600">
                                    <tr className="border-b border-gray-100">
                                        <td className="py-2 font-mono text-sm">storage</td>
                                        <td className="py-2">Save your preferences locally</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-2 font-mono text-sm">unlimitedStorage</td>
                                        <td className="py-2">Store OCR models locally for offline use</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 font-mono text-sm">&lt;all_urls&gt;</td>
                                        <td className="py-2">Intercept file uploads on any website</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-gray-500 text-sm mt-4">
                            We request <code className="bg-gray-100 px-1 rounded">&lt;all_urls&gt;</code> because file uploads can happen on any website. We cannot predict which sites you&apos;ll use, so we need broad permission to protect you everywhere.
                        </p>
                    </section>

                    {/* Third-Party Services */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Third-Party Services
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Privacy Interceptor does <strong>not</strong> use any third-party services for:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>Analytics</li>
                            <li>Advertising</li>
                            <li>Cloud processing</li>
                            <li>Data storage</li>
                        </ul>
                        <p className="text-gray-500 text-sm mt-4">
                            The only external resource loaded is the Inter font from Google Fonts for UI styling, which does not transmit any personal data.
                        </p>
                    </section>

                    {/* Your Rights */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Your Rights
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Since we don&apos;t collect any personal data, there&apos;s nothing to:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                            <li>Request access to</li>
                            <li>Request deletion of</li>
                            <li>Export</li>
                        </ul>
                        <p className="text-gray-700 font-medium mb-6">
                            Your privacy is protected by design, not by policy.
                        </p>
                        <h3 className="text-xl font-medium text-gray-800 mb-3">
                            GDPR Rights (for reference)
                        </h3>
                        <p className="text-gray-600 mb-4">
                            While we don&apos;t hold your data, EU residents maintain these rights under GDPR:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>Right to access any personal data we hold (we hold none)</li>
                            <li>Right to rectification (not applicable)</li>
                            <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
                            <li>Right to restrict processing</li>
                            <li>Right to data portability</li>
                            <li>Right to object to processing</li>
                            <li>Right to lodge a complaint with a supervisory authority</li>
                        </ul>
                    </section>

                    {/* Data Transfers */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            International Data Transfers
                        </h2>
                        <p className="text-gray-600">
                            Privacy Interceptor does <strong>not transfer any data</strong> outside of your device. All processing occurs locally in your browser. There are no international data transfers because there are no data transfers at all.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Contact Us
                        </h2>
                        <p className="text-gray-600 mb-4">
                            If you have questions about this privacy policy, contact us at:
                        </p>
                        <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-gray-700">
                                <strong>Email:</strong>{" "}
                                <a
                                    href="mailto:team@zonda.one"
                                    className="text-blue-600 hover:underline"
                                >
                                    team@zonda.one
                                </a>
                            </p>
                            <p className="text-gray-700">
                                <strong>Website:</strong>{" "}
                                <a
                                    href="https://zonda.one"
                                    className="text-blue-600 hover:underline"
                                >
                                    zonda.one
                                </a>
                            </p>
                        </div>
                    </section>

                    {/* Footer */}
                    <section className="border-t border-gray-200 pt-8">
                        <p className="text-gray-500 text-sm">
                            Privacy Interceptor is developed by ZondaOne.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
