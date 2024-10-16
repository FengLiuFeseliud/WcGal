import { createRouter, createWebHistory } from "vue-router";
import HomeViewe from "@/viewes/HomeViewe.vue";


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
            path: "/article/:articleId",
            name: 'article',
            component: () => import("@/viewes/ArticleViewe.vue"),
            meta: {'title': '文章'},
            props: true
        },

        {
            path: "/user/:userId",
            name: "user",
            component: () => import('@/viewes/UserViewe.vue'),
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
            component: () => import('@/viewes/ResetPasswordViewe.vue')
        },

        {
            path: "/test",
            name: "test",
            component: () => import('@/test.vue')
        },

        {
            path: "/upload/:articleId",
            name: "upload",
            component: () => import('@/viewes/UploadViewe.vue'),
            props: true
        },

        {
            path: "/:pathMatch(.*)",
            component: () => HomeViewe,
        }
     ]
})

export{ router }