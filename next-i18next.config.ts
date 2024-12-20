// /** @type {import('next-i18next').UserConfig} */
// const path = require('path');
// module.exports = {
//     i18n: {
//       defaultLocale: 'fr', // Langue par défaut
//       locales: ['fr', 'en'], // Liste des langues supportées
//       localePath: path.resolve('./public/locales'),
//     },
//     //reloadOnPrerender: process.env.NODE_ENV === 'development', // Recharge en dev
//   };
import path from 'path';

const nextI18NextConfig = {
  i18n: {
    locales: ['en', 'fr'], // Liste des langues prises en charge
    defaultLocale: 'fr',   // Langue par défaut
    //localeDetection: false,
    localePath: path.resolve('./public/locales'), // Chemin vers vos fichiers de traduction
  },
   reloadOnPrerender: process.env.NODE_ENV === 'development', // Recharge en dev
};

export default nextI18NextConfig;