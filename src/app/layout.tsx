import type { Metadata } from "next";
import { Crimson_Text, Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Loader from './components/Loader';
import StructuredData from '../components/StructuredData';
import "../i18n"; // inicializa i18n
import ScrollToTop from "./components/layout/ScrollToTop";
import CookieConsent from "./components/layout/CookieConsent";
import WhatsAppSupport from "../components/WhatsAppSupport";

const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const awareBold = localFont({
  src: "./fonts/AwareBold.ttf",
  variable: "--font-aware-bold",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Zonda One",
    template: "%s | Zonda One"
  },
  description: "Zonda One is a software startup building innovative products and custom business solutions. We create software that people actually want to use.",
  keywords: ["software development", "startup", "custom solutions", "business software", "web development", "mobile apps", "digital transformation"],
  authors: [{ name: "Zonda One Team" }],
  creator: "Zonda One",
  publisher: "Zonda One",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://zonda.one'),
  icons: {
    icon: '/favicon.ico',
    apple: '/logo192.png',
  },
  openGraph: {
    title: "Zonda One",
    description: "We build innovative software products and custom business solutions that drive growth and efficiency.",
    url: 'https://zonda.one',
    siteName: 'Zonda One',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logo512.png',
        width: 512,
        height: 512,
        alt: 'Zonda One - Software Startup',
      }
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code-here',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zonda One - Software Startup Building Innovative Solutions',
    description: 'We build innovative software products and custom business solutions that drive growth and efficiency.',
    images: ['/logo512.png'],
  },
  alternates: {
    canonical: 'https://zonda.one',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
  <head>
    <StructuredData />

   
    
  </head>
  <body
    className={`${crimsonText.variable} ${sourceSans.variable} ${awareBold.variable} antialiased bg-background text-foreground`}
  >
    <Loader duration={1500} />
    <Navbar />

    <main>{children}</main>

    <ScrollToTop />
    <CookieConsent />
    <Footer />
    <WhatsAppSupport />
  </body>
</html>

  );
}
