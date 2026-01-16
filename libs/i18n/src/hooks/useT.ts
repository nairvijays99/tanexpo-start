import { useTranslation } from "react-i18next";
import type { TKey } from "../types";

export function useT<Namespace extends string>(ns: Namespace) {
  const { t, i18n } = useTranslation(ns);

  const typedT = (key: TKey<Namespace>, options?: Record<string, unknown>): string => {
    return t(key as string, options) as string;
  };

  return {
    t: typedT,
    i18n,
    currentLanguage: i18n.language,
    changeLanguage: (lang: string) => i18n.changeLanguage(lang),
  };
}
