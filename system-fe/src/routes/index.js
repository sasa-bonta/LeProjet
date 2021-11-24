import Vue from "vue";
import VueRouter from 'vue-router'
import Home from "../components/pages/Home";
import Contacts from "../components/pages/Contacts";
import ViewCategories from "../components/pages/ViewCategories";
import Favorites from "../components/pages/Favorites";
import Shops from "../components/pages/Shops";
import Products from "../components/pages/Products";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
    },
    {
        path: '/products',
        name: 'products',
        component: Products,
    },
    {
        path: '/categories',
        name: 'categories',
        component: ViewCategories,
    },
    {
        path: '/favorites',
        name: 'favorites',
        component: Favorites,
    },
    {
        path: '/shops',
        name: 'shops',
        component: Shops,
    },
    {
        path: '/contacts',
        name: 'contacts',
        component: Contacts,
    }
]

const router = new VueRouter({
    routes,
    mode: "history",
})

export default router;