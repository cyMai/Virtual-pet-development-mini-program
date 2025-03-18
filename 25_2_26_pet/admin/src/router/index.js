import Vue from "vue";
import VueRouter from "vue-router";
import Layouts from "../layouts";


Vue.use(VueRouter);

/**
 *  path: "/login",   ------页面地址
 meta: {
      title: "登录",    ------页面标题
      icon: "el-icon-user-solid",  ------菜单图标
      oneself: true,  ------是否在单独页面打开
      hide: true,  ------是否隐藏改菜单
    },
 component: () => import("../views/login/index.vue"),  ------组件地址
 */

const routes = [
    {
        path: "",
        redirect: "gameRecord",
        component: Layouts,
        children: [
            {
                path: "/login",
                name: "Login",
                meta: {
                    title: "登录",
                    oneself: true,
                    hide: true,
                },
                component: () => import("../views/login"),
            },
            {
                path: "/register",
                name: "Register",
                meta: {
                    title: "注册",
                    oneself: true,
                    hide: true,
                },
                component: () => import("../views/register"),
            },
 {
                path: "/gameRecord",
                meta: {title: "游戏记录管理", icon: "el-icon-timer"},
                component: () => import("../views/gameRecord"),
            },   {
                path: "/clothes",
                meta: {title: "橱窗管理", icon: "el-icon-shopping-bag-1"},
                component: () => import("../views/clothes"),
            },   {
                path: "/focusRecord",
                meta: {title: "专注记录管理", icon: "el-icon-timer"},
                component: () => import("../views/record"),
            },   {
                path: "/activityRecord",
                meta: {title: "活动记录管理", icon: "el-icon-medal"},
                component: () => import("../views/activityRecord"),
            },   {
                path: "/pages",
                meta: {title: "知识管理", icon: "el-icon-notebook-1"},
                component: () => import("../views/pages"),
            },   {
                path: "/pet",
                meta: {title: "宠物管理", icon: "el-icon-s-home"},
                component: () => import("../views/pet"),
            },   {
                path: "/user",
                meta: {title: "用户管理", icon: "el-icon-user"},
                component: () => import("../views/user"),
            },            


        ],
    }
];

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法，取消路由重复的报错
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

// 前置路由拦截器
router.beforeEach((to, from, next) => {
    // 设置当前页签名称
    document.title = to.meta.title;
    // 没有登录并且要去的页面不是登录页面，在强制跳转到登录
    if (to.path === "/login") {
        localStorage.removeItem('userInfo')
        next()
    } else if (!localStorage.getItem('userInfo')) {
        if (to.path === "/register") {
            next();
        }else {
            next('/login')
        }

    } else {
        next()
    }
});

export default router;
