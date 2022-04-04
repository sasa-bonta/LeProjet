import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './routes'
import store from "./store"
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import i18n from './i18n'
import VueClipboard from 'vue-clipboard2'
import * as MusculaLog from '@muscula.com/muscula-webapp-js-logger';

Vue.config.productionTip = false
Vue.use(VueClipboard)
MusculaLog.Init('pnKCX4tXwI');

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
