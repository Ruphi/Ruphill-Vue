export default {
  path: [
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
      component: resolve => require(['@/pages/Welcome'], resolve)
    },
    {
      path: '/index',
      name: 'Index',
      component: resolve => require(['@/pages/Index'], resolve),
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
      name: 'Login',
      path: '/login',
      component: resolve => require(['@/pages/Login'], resolve)
    },
    {
      path: '/admin',
      name: 'Admin',
      component: resolve => require(['@/pages/Admin/Admin'], resolve),
      children:[
        {
          path: '/',
          component: resolve => require(['@/components/Admin/AdminContent'], resolve)
        },
        {
          path: 'dashboard/todo',
          component: resolve => require(['@/pages/Admin/ToDo'], resolve),
        },
        {
          path: 'dashboard/imgUpload',
          component: resolve => require(['@/pages/Admin/ImgUpload'], resolve)
        },
        {
          path: 'dashboard/editor',
          component: resolve => require(['@/pages/Admin/Editor'], resolve)
        },
        {
          path: 'dashboard/blog-admin',
          component: resolve => require(['@/pages/Admin/BlogList'], resolve)
        }
      ]
    },
    {
      path: '/pictures',
      name: 'Pictures',
      component: resolve => require(['@/pages/Pictures'], resolve)
    }
  ]
}
