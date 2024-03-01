import { createRouter, createWebHistory } from 'vue-router';
// import PaintingCategory from '@/components/PaintingCategory.vue';
// import SculptureCategory from '@/components/SculptureCategory.vue';
import GraffitiCategory from '@/components/GraffitiCategory.vue';
// import FuturismCategory from '@/components/FuturismCategory.vue';

const routes = [
  // { path: '/category/painting', component: PaintingCategory },
  // { path: '/category/sculpture', component: SculptureCategory },
  { path: '/category/graffiti', component: GraffitiCategory },
  // { path: '/category/futurism', component: FuturismCategory },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
