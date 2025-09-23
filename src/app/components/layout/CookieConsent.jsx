"use client";

// CookieConsent.jsx
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [consent, setConsent] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const savedConsent = Cookies.get("userConsent");
    if (!savedConsent) {
      setShowBanner(true);
    } else {
      setConsent(JSON.parse(savedConsent));
    }
  }, []);

  const handleAcceptAll = () => saveConsent({ essential: true, analytics: true, marketing: true });
  const handleRejectAll = () => saveConsent({ essential: true, analytics: false, marketing: false });
  const handleSavePreferences = () => saveConsent(consent);

  const saveConsent = (consentObj) => {
    Cookies.set("userConsent", JSON.stringify(consentObj), { expires: 365, sameSite: 'Lax' });
    setConsent(consentObj);
    setShowBanner(false);
    enableScripts(consentObj);
  };

  const enableScripts = (consentObj) => {
    if (consentObj.analytics) console.log("Analytics enabled");
    if (consentObj.marketing) console.log("Marketing enabled");
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[9999] bg-black border-t-4 border-orange-500 shadow-xl">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between py-3 px-6 gap-3">
        
        {/* Texto */}
        <div className="flex-1 text-white text-sm md:text-base">
          <span className="font-bold text-orange-400">Cookies Consent:</span>{" "}
          We use cookies to improve your experience. Configure your preferences below.
        </div>

        {/* Botones rápidos */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleAcceptAll}
            className="bg-orange-500 text-black px-4 py-1 rounded-lg hover:bg-orange-600 transition font-medium"
          >
            Accept All
          </button>
          <button
            onClick={handleRejectAll}
            className="bg-gray-700 text-white px-4 py-1 rounded-lg hover:bg-gray-800 transition font-medium"
          >
            Reject All
          </button>
        </div>

        {/* Preferencias con checkboxes */}
        <div className="flex gap-4 items-center flex-wrap mt-2 md:mt-0">
          <label className="flex items-center gap-1 text-white text-sm md:text-base">
            <input
              type="checkbox"
              checked={consent.analytics}
              onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
              className="accent-orange-500 w-4 h-4"
            />
            Analytics
          </label>
          <label className="flex items-center gap-1 text-white text-sm md:text-base">
            <input
              type="checkbox"
              checked={consent.marketing}
              onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
              className="accent-orange-500 w-4 h-4"
            />
            Marketing
          </label>
          <button
            onClick={handleSavePreferences}
            className="bg-orange-500 text-black px-4 py-1 rounded-lg hover:bg-orange-600 transition font-medium"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
