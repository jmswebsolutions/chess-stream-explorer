import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import pt from './locales/pt.json';
import es from './locales/es.json';

const resources = {
  en: { translation: en },
  pt: { translation: pt },
  es: { translation: es },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: (() => {
      try {
        return localStorage.getItem('language') || 'en';
      } catch (error) {
        console.error('Error loading language preference:', error);
        return 'en';
      }
    })(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem('language', lng);
  } catch (error) {
    console.error('Error saving language preference:', error);
  }
});

export default i18n;
