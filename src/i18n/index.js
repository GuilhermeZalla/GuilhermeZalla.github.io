import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import pt from './pt.json';

let language = 'en';
try { if (localStorage.getItem('portfolio-language') === 'pt') language = 'pt'; } catch { /* Storage may be disabled. */ }

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, pt: { translation: pt } },
  lng: language,
  fallbackLng: 'en',
  supportedLngs: ['en', 'pt'],
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

i18n.on('languageChanged', next => {
  try { localStorage.setItem('portfolio-language', next); } catch { /* Optional preference. */ }
});

export default i18n;
