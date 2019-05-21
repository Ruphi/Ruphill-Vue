import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    drawer: true,
    topSnackbar: false
  },
  mutations: {
    toggleDrawer: function (state) {
      state.drawer = !state.drawer
    },
    setDrawerAsTrue: function (state) {
      state.drawer = true;
    },
    setDrawerByInput: function (state, ev) {
      state.drawer = ev;
    },
    closeTopSnackbar: function (state) {
      state.topSnackbar = false;
    },
    showTopSnackbar: function (state) {
      state.topSnackbar = true;
    }
  }
});

export default store;
