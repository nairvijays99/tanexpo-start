import * as Localization from "expo-localization";
import { normalizeLanguage } from "./index";

export const detector = {
  detect: () => {
    const locales = Localization.getLocales();
    return normalizeLanguage(locales[0]?.languageCode);
  },
};
