import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationSV from './locales/sv/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  sv: {
    translation: translationSV
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'sv', // Default language or stored preference
    fallbackLng: 'en', // Fallback language if translation is missing
    interpolation: {
      escapeValue: false // React already escapes values by default
    }
  });

// Function to change language and store it in localStorage
export const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
};

export default i18n;