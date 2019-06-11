// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from './axios/axios'
import rpserver from './axios/rpserver'

import moment from 'moment'

import Vuetify from 'vuetify'
import zhHans from 'vuetify/es5/locale/zh-Hans'
import Vuelidate from 'vuelidate'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont'

import store from './store'

Vue.use(Vuetify, {
  iconfont: 'md',
  lang: {
    locales: { zhHans },
    current: 'zhHans'
  }
});
Vue.use(Vuelidate);
Vue.prototype.$axios = axios;
Vue.prototype.$rpserver = rpserver;
Vue.prototype.$moment = moment;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
