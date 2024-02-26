import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
// import Category from "../views/CategoryView.vue";
// import Artwork from "../views/ArtworkView.vue";

const routes = [
    { path: "/", name: "Home", component: Home },
    { 
        path: "/category", 
        name: "Category", 
        component: () => import(/*webpackChunkName: "Category" */ "../views/CategoryView.vue") },
    {
        path: "/category/:name",
        name: "CategoryShow", 
        component: () => import(/*webpackChunkName: "CategoryShow" */ "../views/CategoryShow.vue")
    }
    // {path: "/category/:categoryId", name: "Artwork", component: Artwork}
    ];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
