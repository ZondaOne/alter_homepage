"use client";

import React from "react";

const PHONE_NUMBER = "393894396765"; // international format without +
const PREFILL = encodeURIComponent("Hi, I need support with your services.");

export default function WhatsAppSupport() {
  const href = `https://wa.me/${PHONE_NUMBER}?text=${PREFILL}`;

  return (
    <div>
     <a
  href={href}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Contact support on WhatsApp"
  className="fixed bottom-20 left-6 z-[2000] w-14 h-14 rounded-full flex items-center justify-center bg-white shadow-lg hover:scale-105 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#128C7E]"
>
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 48 48"
  className="w-6 h-6"
  fill="#25D366"
>
  <path d="M38.9,8.1A20.9,20.9,0,0,0,3.2,22.8,19.8,19.8,0,0,0,6,33.2L3,44l11.1-2.9a20.3,20.3,0,0,0,10,2.5A20.8,20.8,0,0,0,38.9,8.1Zm-14.8,32a17.1,17.1,0,0,1-9.5-2.8L8,39.1l1.8-6.4a17.9,17.9,0,0,1-3.1-9.9A17.4,17.4,0,1,1,24.1,40.1Z"/>
  <path d="M33.6,27.2A29.2,29.2,0,0,0,30,25.5c-.4-.2-.8-.3-1.1.2s-1.4,1.7-1.7,2.1a.8.8,0,0,1-1.1.1,15.2,15.2,0,0,1-4.2-2.6A15,15,0,0,1,19,21.7a.7.7,0,0,1,.2-1l.8-1a3.5,3.5,0,0,0,.5-.8.9.9,0,0,0,0-.9c-.2-.3-1.2-2.8-1.6-3.9s-.9-.9-1.2-.9h-1a1.7,1.7,0,0,0-1.4.7,5.5,5.5,0,0,0-1.8,4.3,10.4,10.4,0,0,0,2.1,5.4c.3.3,3.7,5.6,8.9,7.8a16.4,16.4,0,0,0,3,1.1,6.4,6.4,0,0,0,3.3.2c1-.1,3.1-1.2,3.5-2.4s.5-2.3.3-2.5A2.1,2.1,0,0,0,33.6,27.2Z"/>
</svg>

</a>


    </div>
  );
}
