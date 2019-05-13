import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    drawer: true
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
    }
  }
});

export default store;
