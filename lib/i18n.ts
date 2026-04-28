import 'server-only';
import es from '@/messages/es.json';

// Type extraction from the base es.json to ensure 100% translation symmetry
export type I18nDictionary = typeof es;

const dictionaries: Record<string, () => Promise<I18nDictionary>> = {
  es: () => import('@/messages/es.json').then((module) => module.default),
  en: () => import('@/messages/en.json').then((module) => module.default as I18nDictionary),
};

export type Locale = keyof typeof dictionaries;
export const locales: Locale[] = ['es', 'en'];

export const getDictionary = async (locale: string): Promise<I18nDictionary> => {
  if (!locales.includes(locale as Locale)) {
    return dictionaries['es']();
  }
  return dictionaries[locale as Locale]();
};
