import { createApp } from 'vue'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import router from './router';
import VueCookies from 'vue3-cookies'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import store from './store/index';
import main from './store/main'

// Create a new store instance.
const store = createStore({
    modules: {
        main,
    },
    plugins: [createPersistedState()],
  })
  
  
  import './stylesheets'
  
import globalMixin from './mixins/global';
  
  import App from './App.vue'
  import i18n from './i18n'
  const app = createApp(App).use(router).use(i18n).use(store).use(VueCookies).mixin(globalMixin)
  
  import setupAxiosConfig from "./axios";
  setupAxiosConfig();
  
app.use(ElementPlus)
app.mount('#app')

export default {
  store
}