"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import es from "./locales/es/translation.json";
import it from "./locales/it/translation.json";



i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    interpolation: { escapeValue: false },
     react: { useSuspense: false },
    resources: {
      en: { translation: en },
      es: { translation: es },
      it: { translation: it }
    }
  });

export default i18n;
