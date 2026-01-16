import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";
import { FALLBACK_LANGUAGE } from "./detection";
import { detector } from "./detection/detector";

// Import resources to avoid rendering keys on SSR for the default language
// Only the fallback language is bundled to keep the initial bundle size small.
import enCommon from "./resources/en/common.json";
import enHome from "./resources/en/home.json";

const i18n = i18next.use(initReactI18next).use(
  resourcesToBackend((language: string, namespace: string) => {
    // Lazy load translations for all languages (including en, as a backup)
    if (language === "en") {
      if (namespace === "home") return import("./resources/en/home.json");
      if (namespace === "common") return import("./resources/en/common.json");
    } else if (language === "es") {
      if (namespace === "home") return import("./resources/es/home.json");
      if (namespace === "common") return import("./resources/es/common.json");
    }
    // Add more languages here...
    return Promise.reject(new Error(`Unknown language/namespace: ${language}/${namespace}`));
  }),
);

// Initialize i18n
i18n.init({
  lng: detector.detect(),
  fallbackLng: FALLBACK_LANGUAGE,
  ns: ["common"],
  defaultNS: "common",
  resources: {
    en: {
      common: enCommon,
      home: enHome,
    },
    // Other languages are loaded on-demand via resourcesToBackend
  },
  interpolation: {
    escapeValue: false, // React already escapes
  },
  react: {
    useSuspense: true, // Crucial: Allows SSR to wait for lazy-loaded translations
  },
});

export default i18n;
