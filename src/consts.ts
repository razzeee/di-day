// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const DEFAULT_LOCALE = "de";
export const LOCALES = ["de", "en"] as const;
export type Locale = (typeof LOCALES)[number];
