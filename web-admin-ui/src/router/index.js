import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  //mode:'history',
  routes: [
    {
      path: '/',
      component: (resolve)=>require(['@/views/index'],resolve),
      children:[
        {
          path: '',
          redirect:'/homePage'
        },
        {
          path: 'homePage',
          meta:{
            name:'首页'
          },
          component: (resolve)=>require(['@/views/homePage'],resolve),
        },
        {
          path: '/resetPassword',
          meta:{
            name:'修改密码'
          },
          component: (resolve)=>require(['@/views/sys/info'],resolve),
        },
      ],
    },
    {
      path: '/login',
      meta:{
        name:'登录'
      },
      component: (resolve)=>require(['@/views/login'],resolve),
    },
    {
      path: '/redirect/:path*',
      name:'redirect',
      component: (resolve)=>require(['@/views/redirect'],resolve),
      hidden: true,
    },
    {
      path: '/404',
      component: (resolve) => require(['@/views/errorPage/404'],resolve),
      hidden: true
    },
    {
      path: '*',
      //redirect:'/404',
      component: (resolve) => require(['@/views/errorPage/404'],resolve),
      hidden: true
    },
  ]
})
