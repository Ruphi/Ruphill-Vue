import Vue from 'vue'
import Router from 'vue-router'
import paths from './path'
import rpserver from '../axios/rpserver'
import store from '../store';

Vue.use(Router);

const router = new Router({
  linkActiveClass: 'active',
  routes: paths.path
});

router.beforeEach((to, from, next) => {
  store.commit('closeTopSnackbar');
  if (to.fullPath.indexOf('admin') >= 0) {// is to admin module
    rpserver.get('/api/user/auth').then( res => {
      if (res.data.code === -1) {// out of login
        next({path: '/login'});
      }else {// go on
        next();
      }
    }).catch(err => { //err need login
      next({path: '/login'});
    });
  }else {
    next();
  }
});

export default router;
