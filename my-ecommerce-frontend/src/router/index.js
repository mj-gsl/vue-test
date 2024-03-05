//my-ecommerce-frontend/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../components/ProductList.vue';
import UserProfile from '../components/UserProfile.vue';

const routes = [
  { path: '/', component: ProductList },
  { path: '/user-profile/:userId', component: UserProfile, props: true  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
