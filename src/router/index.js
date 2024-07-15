import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        redirect: '/404',
    },
    {
        path: '/',
        redirect: '/main/template',
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('../views/Login'),
    },
    {
        name: 'main',
        path: '/main',
        redirect: '/404',
        component: () => import('../views/mainPages'),
        children: [
            {
                name: 'template',
                path: '/main/template',
                component: () => import('../views/mainPages/template'),
            }
        ]
    },
    {
        name: 'back',
        path: '/back',
        component: () => import('../views/backPages'),
        redirect: '/404',
        children: [
            {
                name: 'profile',
                path: '/back/profile',
                component: () => import('../views/backPages/system/profile'),
            },
            {
                name: 'dept',
                path: '/back/dept',
                component: () => import('../views/backPages/system/dept'),
            },
            {
                name: 'dict',
                path: '/back/dict',
                component: () => import('../views/backPages/system/dict'),
            },
            {
                name: 'menu',
                path: '/back/menu',
                component: () => import('../views/backPages/system/menu'),
            },
            {
                name: 'role',
                path: '/back/role',
                component: () => import('../views/backPages/system/role'),
            },
            {
                name: 'user',
                path: '/back/user',
                component: () => import('../views/backPages/system/user'),
            },
            {
                name: 'template',
                path: '/back/template',
                component: () => import('../views/backPages/template'),
            }
        ]
    },
    {
        name: '404',
        path: '/404',
        component: () => import('../views/errorPages/404'),
    },
]

const router = new VueRouter({
    routes
})

export default router
