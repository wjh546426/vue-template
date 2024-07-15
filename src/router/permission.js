/**
 * 权限校验：
 *  Vue Router中的 前置钩子函数 beforeEach(to, from, next)
 * 当进行路由跳转之前，进行判断 是否已经登录过，登录过则允许访问非登录页面，否则回到登录页
 *
 * to:  即将要进入的目标路由对象
 * from: 即将要离开的路由对象
 * next: 是一个方法，可以指定路由地址，进行路由跳转
 */

import router from "./index";
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({showSpinner: false})

router.beforeEach((to, from, next) => {

    NProgress.start()

    const token = JSON.parse(localStorage.getItem("userInfo"))?.token

    if (token) {
        if (to.path === '/login') {
            next({path: '/home'})
        } else {
            next()
        }
    } else {
        if (to.path === '/login') {
            next()
        } else {
            next({path: '/login'})
        }
    }

    NProgress.done()

})
