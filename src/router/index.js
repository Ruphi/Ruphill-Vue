import Vue from 'vue'
import Router from 'vue-router'


import Welcome from '@/pages/Welcome'
import Index from '@/pages/Index'
import Admin from '@/pages/Admin'

Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },{
      path: '/index',
      name: 'Index',
      children:[
        {
          path: '/',
          component: resolve => require(['@/components/Index/IndexContent'], resolve)
        }
      ],
      component: Index
    },
    {
      path: '/admin',
      name: 'Admin',
      children:[
        {
          path: '/',
          component: resolve => require(['@/components/Admin/AdminContent'], resolve)
        },
        {
          path: 'todo',
          component: resolve => require(['@/pages/ToDo'], resolve)
        }
      ],
      component: Admin
    }
  ]
})
