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
          path: 'password',
          meta:{
            name:'修改密码'
          },
          component: (resolve)=>require(['@/views/sys/info'],resolve),
        },
        {
          path: 'help',
          meta:{
            name:'帮助'
          },
          component: (resolve)=>require(['@/views/routerView'],resolve),
          children:[
            {
              path: 'iconfont',
              meta:{
                name:'图标'
              },
              component: (resolve)=>require(['@/views/help/iconfont'],resolve),
            },
            {
              path: 'table',
              meta:{
                name:'表格'
              },
              component: (resolve)=>require(['@/views/help/table'],resolve),
            },
            {
              path: 'richText',
              meta:{
                name:'富文本'
              },
              component: (resolve)=>require(['@/views/help/richText'],resolve),
            },
            {
              path: 'other',
              meta:{
                name:'说明'
              },
              component: (resolve)=>require(['@/views/help/index'],resolve),
            },
          ]
        },
        {
          path: 'sys',
          meta:{
            name:'说明'
          },
          component: (resolve)=>require(['@/views/routerView'],resolve),
          children:[
            {
              path: 'user',
              meta:{
                name:'说明'
              },
              component: (resolve)=>require(['@/views/sys/user'],resolve),
            },
          ]
        },

      ],
    },
    {
      path: '/login',
      name: 'login',
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
