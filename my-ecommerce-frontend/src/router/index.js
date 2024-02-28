import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import SearchResults from "../views/SearchResultsView.vue"; // Füge die neue Komponente hinzu

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/category", name: "Category", component: () => import(/* webpackChunkName: "Category" */ "../views/CategoryView.vue") },
  { path: "/category/:name", name: "CategoryShow", component: () => import(/* webpackChunkName: "CategoryShow" */ "../views/CategoryShow.vue") },
  { path: "/shoppingcarte", name: "ShoppingCarte", component: () => import(/* webpackChunkName: "ShoppingCarte" */ "../views/ShoppingCarte.vue") },
  { path: "/search-results", name: "SearchResults", component: SearchResults }, // Neue Route für Suchergebnisse
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
