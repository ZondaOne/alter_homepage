"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [year, setYear] = useState<number>();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <p>© {year ?? "…"} Zonda. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link href="/privacy" className="hover:text-gray-800 transition">Privacy</Link>
          <Link href="/terms" className="hover:text-gray-800 transition">Terms</Link>
          <a href="https://www.linkedin.com/company/zonda-one" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
