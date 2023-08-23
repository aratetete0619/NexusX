import i18n from 'i18next';
import Backend from 'i18next-fs-backend';
import { initReactI18next } from 'react-i18next';
import path from 'path';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: path.join(process.cwd(), 'locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(process.cwd(), 'locales/{{lng}}/{{ns}}.missing.json'),
    },
    lng: "en-US",
    fallbackLng: "en-US",
    supportedLngs: ['en-US', 'ja-JP'],
    ns: ['Background', 'Features', 'Footer', 'Participation', 'Recruitment', 'Registration', 'Sidebar', 'Summary1', 'Summary2', 'Summary3', 'common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
