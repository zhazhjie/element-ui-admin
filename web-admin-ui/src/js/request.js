/** 
* @author: zhazhjie 
* @email: zhazhjie@vip.qq.com
* @date: 2018-11-05 10:31:38 
* @version: 1.0 
*/	

import axios from 'axios'
import store from '@/store'
import router from '@/router'
import {getStore} from '@/js/util'
import { Message } from 'element-ui'
import errorCode from './errorCode'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style

const getToken=function(){
  return getStore("token",'local')||'';
}

const API_ROOT = process.env.API_ROOT
axios.defaults.timeout = 20000
axios.defaults.baseURL = API_ROOT
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true
NProgress.configure({ showSpinner: false })// NProgress Configuration

// HTTPrequest拦截
axios.interceptors.request.use(config => {
  //store.commit('SET_LOADING',true);
  NProgress.start() // start progress bar
  config.headers['token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  return config
}, error => {
  return Promise.reject(error)
})
// HTTPresponse拦截
axios.interceptors.response.use(res => {
  NProgress.done()
  //store.commit('SET_LOADING',false);
  //判断是否成功
  var code=res.data.code;
  //console.log(code)
  if(code==0){
    return res.data;
  }else if(code==401){
    Message({
      message: res.data.message,
      type: 'warning'
    });
    store.dispatch('logout').then(() => {
      router.push('/login')
      location.reload()// In order to re-instantiate the vue-router object to avoid bugs
    });;
    return Promise.reject(res.data);
  } else{
    Message({
      message: res.data.message,
      type: 'error'
    });
    return Promise.reject(res.data);
  }
}, error => {
  NProgress.done()
  //store.commit('SET_LOADING',false);
  let errMsg = error.toString()
  let code = errMsg.substr(errMsg.indexOf('code') + 5)
  Message({
    message: errorCode[code] || errorCode['default'],
    type: 'error'
  })
  return Promise.reject(error)
})

export default axios
