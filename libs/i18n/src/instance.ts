import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";
import { FALLBACK_LANGUAGE, normalizeLanguage } from "./detection";
import { detector } from "./detection/detector";

// Import resources to avoid rendering keys on SSR for the default language
// Only the fallback language is bundled to keep the initial bundle size small.
import enCommon from "./resources/en/common.json";
import enHome from "./resources/en/home.json";

const i18n = i18next.createInstance();

i18n
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      const normalized = normalizeLanguage(language);

      // English is bundled, so we resolve it immediately
      if (normalized === "en") {
        if (namespace === "home") return Promise.resolve(enHome);
        if (namespace === "common") return Promise.resolve(enCommon);
      }

      // Spanish is lazy-loaded
      if (normalized === "es") {
        if (namespace === "home") return import("./resources/es/home.json");
        if (namespace === "common") return import("./resources/es/common.json");
      }

      return Promise.reject(new Error(`Unknown language/namespace: ${language}/${namespace}`));
    }),
  )
  .use(initReactI18next);

// Initialize i18n
i18n.init({
  lng: detector.detect(),
  fallbackLng: FALLBACK_LANGUAGE,
  ns: ["common", "home"],
  defaultNS: "common",
  partialBundledLanguages: true,
  interpolation: {
    escapeValue: false, // React already escapes
  },
  react: {
    useSuspense: true, // Allow waiting for resources during rendering
  },
});

export default i18n;
