import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { createRouter } from './router';
import store from './store/index';

Vue.config.productionTip = false;
const router = createRouter();

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
