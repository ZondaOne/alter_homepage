import type { Metadata } from "next";
import { Crimson_Text, Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import "../i18n"; // inicializa i18n

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
  title: "Zonda Consulting",
  description: "Boutique consultancy landing page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${crimsonText.variable} ${sourceSans.variable} ${awareBold.variable} antialiased bg-background text-foreground`}
      >
        {/* Navbar es Client Component */}
        <Navbar />

        {/* Main content */}
        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
