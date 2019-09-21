/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-11-05 16:25:40
* @version: 1.0
*/
import router from '../router'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getStore,setStore} from '../utils/util'

NProgress.configure({ showSpinner: false });

const whiteList = ['/login', '/404'];

router.beforeEach((to, from, next) => {
  NProgress.start();
  if(whiteList.indexOf(to.path)>-1){
    next();
  }else if(getStore('token','local')){
  	if(!store.state.menuInitialized){
  	  Promise.all([
  	    store.dispatch('getUserInfo'),
        store.dispatch('listUserPermission')
      ]).then(()=>{
        router.addRoutes(store.state.menuList);
        next({ ...to, replace: true })
      })
        .catch(err=>{})
  	}else{
      next();
  	}
  }else{
      next({path:'/login?redirectUrl='+to.fullPath,replace:true});
  }
});

router.afterEach(() => {
  NProgress.done();
});
