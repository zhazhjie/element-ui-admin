import Vue from 'vue'
import Router from 'vue-router'
import staticRouter from './staticRouter'

const ENV = process.env.NODE_ENV;
const BASE_PATH = process.env.VUE_APP_BASE_PATH;
Vue.use(Router);

export default new Router({
  mode: ENV === 'development' ? 'hash' : 'history',
  base: BASE_PATH,
  routes: [
    {
      path: '/',
      component: (resolve) => require(['@/views/index'], resolve),
      children: [
        {
          path: '',
          meta: {
            name: '首页'
          },
          component: (resolve) => require(['@/views/homePage'], resolve),
        },
        {
          path: '/resetPassword',
          meta: {
            name: '修改密码'
          },
          component: (resolve) => require(['@/views/sys/info'], resolve),
        },
        {
          path: '/redirect/:path*',
          component: (resolve) => require(['@/views/redirect'], resolve),
          hidden: true,
        },
        ...staticRouter
      ],
    },
    {
      path: '/login',
      meta: {
        name: '登录'
      },
      component: (resolve) => require(['@/views/login'], resolve),
    },
    {
      path: '/redirect/:path*',
      component: (resolve) => require(['@/views/redirect'], resolve),
      hidden: true,
    },
    {
      path: '/404',
      component: (resolve) => require(['@/views/errorPage/404'], resolve),
      hidden: true
    },
    {
      path: '*',
      //redirect:'/404',
      component: (resolve) => require(['@/views/errorPage/404'], resolve),
      hidden: true
    },
  ]
})
