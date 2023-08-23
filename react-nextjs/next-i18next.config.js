const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en-US',
    locales: ['en-US', 'ja-JP'],
  },
  localePath: path.resolve('./locales'),
  use: ['i18next-http-middleware', 'i18next-fs-backend'],
  backend: {
    loadPath: path.join(__dirname, 'locales/{{lng}}/{{ns}}.json'),
    addPath: path.join(__dirname, 'locales/{{lng}}/{{ns}}.missing.json'),
  }
};
