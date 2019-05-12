import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    drawer: null
  },
  mutations: {
    toggleDrawer: function (state) {
      state.drawer = !state.drawer;
    }
  }
});

export default store;
