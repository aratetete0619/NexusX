import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) // バインドする
  .init({
    resources: {
      en: {
        translation: {
          "key": "Hello World"
        }
      },
      ja: {
        translation: {
          "key": "こんにちは、世界"
        }
      }
    },
    lng: "en", // デフォルトの言語
    fallbackLng: "en", // リソースが見つからない場合のフォールバック

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
