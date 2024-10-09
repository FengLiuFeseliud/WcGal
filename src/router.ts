import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
     history: createWebHistory(),
     routes: [
        {
            path: "/",
            name: 'home',
            component: () => import("@/viewes/HomeViewe.vue"),
            meta: {'title': 'WcGalGame'}
        },

        {
            path: "/home",
            redirect: "/"
        },

        {
            path: "/article/:articleId",
            name: 'article',
            component: () => import("@/viewes/ArticleViewe.vue"),
            meta: {'title': '文章'},
            props: true
        },

        {
            path: "/login",
            name: "login",
            component: () => import('@/viewes/LoginViewe.vue')
        },

        {
            path: "/register",
            name: "register",
            component: () => import('@/viewes/RegisterViewe.vue')
        },

        {
            path: "/password",
            name: "password",
            component: () => import('@/viewes/ResetPassword.vue')
        },

        {
            path: "/test",
            name: "test",
            component: () => import('@/test.vue')
        },

        {
            path: "/:pathMatch(.*)",
            component: () => import("@/viewes/NotViewe.vue"),
        }
     ]
})

export{ router }