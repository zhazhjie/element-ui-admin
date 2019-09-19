/**
 * @author: zhazhjie
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-11-05 10:31:38
 * @version: 1.0
 */

import axios from 'axios'
import store from '../store'
import {getStore} from '../utils/util'
import {Message} from 'element-ui'
import errorCode from './errorCode'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style

const API_ROOT = process.env.API_ROOT;
axios.defaults.timeout = 20000;
axios.defaults.baseURL = API_ROOT;
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
NProgress.configure({showSpinner: false});

// HTTPrequest拦截
axios.interceptors.request.use(config => {
  NProgress.start();
  config.headers['token'] = getStore("token", 'local');
  return config
}, error => {
  return Promise.reject(error)
});
// HTTPresponse拦截
axios.interceptors.response.use(res => {
  NProgress.done();
  let code = res.data.code;
  //console.log(code)
  if (code === 200) {
    return res.data;
  } else if (code === 401) {
    Message({
      message: res.data.message,
      type: 'warning'
    });
    store.commit('logout');
    return Promise.reject(res.data);
  } else {
    Message({
      message: res.data.message,
      type: 'error'
    });
    return Promise.reject(res.data);
  }
}, error => {
  NProgress.done();
  let errMsg = error.toString();
  let code = errMsg.substr(errMsg.indexOf('code') + 5);
  Message({
    message: errorCode[code] || errorCode['default'],
    type: 'error'
  });
  return Promise.reject(error)
});

export default axios
