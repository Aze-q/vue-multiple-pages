import Vue from 'vue';
import VueRouter from 'vue-router';

import { getCookie } from '@/utils/cookie.js';
import Login from '@/views/Login/index.vue';
import PmsView from '@/views/index.vue';
import Home from '@/views/Home/index.vue';
import nextComponent from '@/views/nextComponent/index.vue';
Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: '登录' }
  },
  {
    path: '/pms',
    name: 'pms',
    component: PmsView,
    redirect: '/pms/home',
    children: [
      {
        path: 'home',
        name: 'home_view',
        component: Home,
        meta: { title: '首页', index: '1', icon: 'ns-home' }
      },
      {
        path: 'nextComponent',
        name: 'nextComponent',
        component: nextComponent,
        meta: { title: '组件', index: '2', icon: '' }
      },
    ]
  }
];
// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err);
};
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err);
};

const router = new VueRouter({
  routes: routes
});

// 路由导航
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    // 跳转前动态设置当前title
    document.title = to.meta.title;
  }
  if (getCookie('loginToken')) {
    // 移除进入浏览器历史记录
    if (from.name === 'err_view') {
      next({ replace: true });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
