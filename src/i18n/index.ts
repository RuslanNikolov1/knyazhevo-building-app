import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import bg from './locales/bg.json';
import en from './locales/en.json';
import ru from './locales/ru.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      bg: { translation: bg },
      en: { translation: en },
      ru: { translation: ru }
    },
    fallbackLng: 'bg',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
