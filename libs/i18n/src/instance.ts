import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";
import { FALLBACK_LANGUAGE } from "./detection";
import { detector } from "./detection/detector";

const i18n = i18next.use(initReactI18next).use(
  resourcesToBackend((language: string, namespace: string) => {
    // Lazy load translations
    if (language === "en") {
      if (namespace === "home") return import("./resources/en/home.json");
      if (namespace === "common") return import("./resources/en/common.json");
    } else if (language === "es") {
      if (namespace === "home") return import("./resources/es/home.json");
      if (namespace === "common") return import("./resources/es/common.json");
    }
    return Promise.reject(new Error(`Unknown language/namespace: ${language}/${namespace}`));
  }),
);

// Initialize i18n
i18n.init({
  lng: detector.detect(),
  fallbackLng: FALLBACK_LANGUAGE,
  ns: ["common"],
  defaultNS: "common",
  interpolation: {
    escapeValue: false, // React already escapes
  },
  react: {
    useSuspense: false, // Safer for SSR hydration
  },
});

export default i18n;
