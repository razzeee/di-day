import de from "../i18n/de.json";
import en from "../i18n/en.json";

const ui = { de, en };

export function useTranslations(lang: string) {
  return ui[lang as keyof typeof ui] || de;
}
