/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-11-05 16:25:40
* @version: 1.0
*/
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import {getStore,setStore} from '@/js/util'

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/404']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if(getStore('token','local')){
    if(to.path == '/login'){
      next({path:'/',replace:true});
      return;
    }
  	if(!store.state.menuInitialized){
      Promise.all([
        store.dispatch('getUserInfo'), store.dispatch('getMenu')
      ]).then(()=>{
        console.log(store.state.menuList);
        router.addRoutes(store.state.menuList);
        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      })
  	}else{
      next();
  	}
  }else{
    if(to.path == '/login'){
      next();
    }else{
      next({path:'/login',replace:true});
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
