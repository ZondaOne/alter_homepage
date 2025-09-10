import type { Metadata } from "next";
import { Crimson_Text, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

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

export const metadata: Metadata = {
  title: "Zonda Consulting",
  description: "Boutique consultancy landing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${crimsonText.variable} ${sourceSans.variable} antialiased bg-background text-foreground`}
      >
        {/* Navbar fija arriba */}
        <Navbar />

        {/* Main content without top padding for hero */}
        <main>{children}</main>
         
        <Footer />
      </body>
    </html>
  );
}
