import { createRouter, createWebHistory } from "vue-router";
import HomeViewe from "@/viewes/HomeViewe.vue";
import SearchViewe from "@/viewes/SearchViewe.vue";


const router = createRouter({
     history: createWebHistory(),
     routes: [
        {
            path: "/",
            name: 'home',
            component: HomeViewe,
            meta: {'title': 'WcGalGame'}
        },

        {
            path: "/home",
            redirect: "/"
        },

        {
            path: "/search",
            name: 'search',
            component: SearchViewe
        },

        {
            path: "/article/:articleId",
            name: 'article',
            beforeEnter: () => window.scrollTo({top: 0, behavior: "smooth"}),
            component: () => import("@/viewes/ArticleViewe.vue"),
            meta: {'title': '文章'},
            props: true
        },

        {
            path: "/user/:userId",
            name: "user",
            beforeEnter: () => window.scrollTo({top: 0, behavior: "smooth"}),
            component: () => import('@/viewes/UserViewe.vue'),
            props: true
        },

        {
            path: "/login",
            name: "login",
            beforeEnter: () => window.scrollTo({top: 0}),
            component: () => import('@/viewes/LoginViewe.vue')
        },

        {
            path: "/register",
            name: "register",
            beforeEnter: () => window.scrollTo({top: 0}),
            component: () => import('@/viewes/RegisterViewe.vue')
        },

        {
            path: "/password",
            name: "password",
            beforeEnter: () => window.scrollTo({top: 0}),
            component: () => import('@/viewes/ResetPasswordViewe.vue')
        },

        {
            path: "/favorite/:favoriteId",
            name: "favorite",
            component: () => import('@/viewes/FavoriteViewe.vue'),
            props: true
        },

        {
            path: "/upload/:articleId",
            name: "upload",
            component: () => import('@/viewes/UploadViewe.vue'),
            beforeEnter: () => window.scrollTo({top: 0, behavior: "smooth"}),
            props: true
        },

        {
            path: "/:pathMatch(.*)",
            component: HomeViewe,
        }
     ]
})


export{ router }