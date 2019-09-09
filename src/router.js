import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

export function createRouter() {
  return new Router({
    routes: [
      { path: '/', redirect: { name: 'index' } },
      {
        path: '/',
        name: 'index',
        component: () => import('./pages/ThemeArea.vue')
      }
    ]
  });
}
