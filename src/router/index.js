import Vue from 'vue'
import Router from 'vue-router'


import Welcome from '@/pages/Welcome'
import Index from '@/pages/Index'
import Admin from '@/pages/Admin/Admin'
import Pictures from '@/pages/Pictures'

Vue.use(Router);


export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '*',
      redirect: {
        path: '/404'
      }
    },
    {
      path: '/404',
      name: '404',
      component: resolve => require(['@/pages/NotFound'], resolve)
    },
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },{
      path: '/index',
      name: 'Index',
      component: Index,
      children:[
        {
          path: '/',
          component: resolve => require(['@/components/Index/IndexContent'], resolve)
        },
        {
          path: 'projects/ife',
          component: resolve => require(['@/components/Ife/Ife'], resolve),
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      query: {
        componentPage: 'Admin'
      },
      children:[
        {
          path: '/',
          component: resolve => require(['@/components/Admin/AdminContent'], resolve)
        },
        {
          path: 'dashboard/todo',
          component: resolve => require(['@/pages/Admin/ToDo'], resolve),
          query: {
            componentPage: 'Index'
          }
        },
        {
          path: 'dashboard/imgUpload',
          component: resolve => require(['@/pages/Admin/ImgUpload'], resolve)
        },
        {
          path: 'dashboard/editor',
          component: resolve => require(['@/pages/Admin/Editor'], resolve)
        }
      ]
    },
    {
      path: '/pictures',
      name: 'Pictures',
      component: Pictures
    }
  ]
})
