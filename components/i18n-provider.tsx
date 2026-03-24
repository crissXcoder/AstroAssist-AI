"use client";

import React, { createContext, useContext } from 'react';
import type { Dictionary, Locale } from '@/lib/i18n';

type I18nContextType = {
  t: Dictionary;
  locale: Locale;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ 
  children, 
  dictionary,
  locale 
}: { 
  children: React.ReactNode;
  dictionary: Dictionary;
  locale: Locale;
}) {
  return (
    <I18nContext.Provider value={{ t: dictionary, locale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslations must be used within an I18nProvider');
  }
  return context.t;
}

export function useLocale() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useLocale must be used within an I18nProvider');
  }
  return context.locale;
}
