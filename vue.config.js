const path = require('path');
module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'ar',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    }
  },
  configureWebpack: {
    resolve: {
        alias: {
            "@": path.resolve(__dirname, 'src/')
        }
    }
  },
  // publicPath: '/catering/',
  css: {
    loaderOptions: {
        sass: {
          additionalData: `@import "@/stylesheets/tools/_mixins.scss";`
        }
    }
  }
}
