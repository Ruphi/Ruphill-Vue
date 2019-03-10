import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import Index from '@/pages/Index'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Router);
Vue.use(Vuetify);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
