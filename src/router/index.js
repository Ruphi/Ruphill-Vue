import Vue from 'vue'
import Router from 'vue-router'
import paths from './path'

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: paths.path
})
