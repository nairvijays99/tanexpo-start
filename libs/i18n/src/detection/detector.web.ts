import { normalizeLanguage } from "./index";

export const detector = {
  detect: () => {
    if (typeof window === "undefined") return "en";
    return normalizeLanguage(window.navigator.language);
  },
};
