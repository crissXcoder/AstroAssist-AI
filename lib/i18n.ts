import 'server-only';

// Type extraction from the base es.json to ensure 100% translation symmetry
export type Dictionary = typeof import('@/messages/es.json');

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  es: () => import('@/messages/es.json').then((module) => module.default),
  en: () => import('@/messages/en.json').then((module) => module.default as Dictionary),
};

export type Locale = keyof typeof dictionaries;
export const locales: Locale[] = ['es', 'en'];

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  if (!locales.includes(locale as Locale)) {
    return dictionaries['es']();
  }
  return dictionaries[locale as Locale]();
};
