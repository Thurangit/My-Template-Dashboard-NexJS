import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonFr from './public/locales/fr/common.json';
import commonEn from './public/locales/en/common.json';

i18n
  .use(initReactI18next) // Initialise react-i18next
  .init({
    resources: {
      fr: {
        common: commonFr,
      },
      en: {
        common: commonEn,
      },
    },
    lng: 'fr', // Langue par défaut
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    react: { useSuspense: false }, // Désactive suspense
  });

export default i18n;
