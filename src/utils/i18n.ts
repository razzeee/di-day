import type { Locale } from "./consts";

export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split("/");
  if (lang === "en") return "en";
  return "de";
}

export function useTranslations(locale: Locale) {
  return async function t(key: string, params?: Record<string, string>) {
    const translations = await import(
      `../public/locales/${locale}/translation.json`
    );
    const keys = key.split(".");
    let value: any = translations.default;

    for (const k of keys) {
      value = value?.[k];
    }

    if (typeof value === "string" && params) {
      return value.replace(/\{\{(\w+)\}\}/g, (_, key) => params[key] || "");
    }

    return value || key;
  };
}

export function getLocalizedPath(path: string, locale: Locale): string {
  if (locale === "de") {
    return path;
  }
  return `/${locale}${path}`;
}
