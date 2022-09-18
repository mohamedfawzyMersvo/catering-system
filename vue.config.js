// const path = require('path');
module.exports = {
  publicPath:'/catering/albilad/', 
  outputDir: 'dist',
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
  // configureWebpack: {
  //   resolve: {
  //       alias: {
  //           // "@": path.resolve(__dirname, 'src/')
  //       }
  //   }
  // },
  css: {
    loaderOptions: {
        sass: {
          additionalData: `@import "@/stylesheets/tools/_mixins.scss";`
        }
    }
  }
}