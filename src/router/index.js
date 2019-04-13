import Vue from 'vue'
import Router from 'vue-router'


import Welcome from '@/pages/Welcome'
import Index from '@/pages/Index'
import Admin from '@/pages/Admin/Admin'
import Pictures from '@/pages/Pictures'

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
          component: resolve => require(['@/pages/Admin/ToDo'], resolve)
        },
        {
          path: 'imgUpload',
          component: resolve => require(['@/pages/Admin/ImgUpload'], resolve)
        },
        {
          path: 'editor',
          component: resolve => require(['@/pages/Admin/Editor'], resolve)
        }
      ],
      component: Admin
    },
    {
      path: '/pictures',
      name: 'Pictures',
      component: Pictures
    }
  ]
})
