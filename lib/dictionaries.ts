import 'server-only';

const dictionaries = {
    en: () => import('../dictionaries/en.json').then((module) => module.default),
    es: () => import('../dictionaries/es.json').then((module) => module.default),
    fr: () => import('../dictionaries/fr.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;
export const defaultLocale: Locale = 'es';
export const locales: Locale[] = ['en', 'es', 'fr'];

export const getDictionary = async (locale: Locale) => dictionaries[locale]?.() ?? dictionaries[defaultLocale]();
