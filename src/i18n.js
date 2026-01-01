// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import arTranslations from './locales/ar.json';
import enTranslations from './locales/en.json';

// استرجاع اللغة المحفوظة أو استخدام اللغة الافتراضية
const savedLanguage = localStorage.getItem('preferredLanguage');
const browserLanguage = navigator.language.split('-')[0];

// تحديد اللغة الافتراضية
const defaultLanguage = savedLanguage || (browserLanguage === 'ar' ? 'ar' : 'en');

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: arTranslations },
      en: { translation: enTranslations }
    },
    lng: defaultLanguage, // اللغة الافتراضية
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false // React يقوم بذلك تلقائياً
    }
  });

// تعيين اتجاه وسمة اللغة في HTML
document.documentElement.dir = defaultLanguage === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = defaultLanguage;

export default i18n;