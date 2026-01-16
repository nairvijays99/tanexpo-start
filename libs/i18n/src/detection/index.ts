export interface LanguageDetector {
  detect(): string;
}

export const FALLBACK_LANGUAGE = "en";
export const SUPPORTED_LANGUAGES = ["en", "es"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export function normalizeLanguage(lang: string | null | undefined): SupportedLanguage {
  if (!lang) return FALLBACK_LANGUAGE;
  const base = lang.split("-")[0].toLowerCase();
  return SUPPORTED_LANGUAGES.includes(base as SupportedLanguage)
    ? (base as SupportedLanguage)
    : FALLBACK_LANGUAGE;
}
