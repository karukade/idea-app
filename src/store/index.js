import Vue from 'vue';
import Vuex from 'vuex';
import state from './store';
import mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  mutations
});

export default store;
