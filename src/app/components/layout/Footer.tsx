"use client";

import { useEffect, useState } from "react";

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
          <a href="#" className="hover:text-gray-800 transition">Privacy</a>
          <a href="#" className="hover:text-gray-800 transition">Terms</a>
          <a href="#" className="hover:text-gray-800 transition">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
