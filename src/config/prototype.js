/**
 * @author: zhazhjie
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-12-12 19:06:36
 * @version: 1.0
 */
import Vue from 'vue'
import store from '../store'
import {formatAmount} from "../utils/util";

const REMOTE_URL = process.env.VUE_APP_REMOTE_URL;
const defaultImg = require('@/img/defaultImg.png');

Vue.prototype.confirm = function (msg) {
  return new Promise((resolve, reject) => {
    this.$confirm(msg, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      resolve();
    }).catch(() => {
      //reject()
    });
  })
};
Vue.prototype.setNegate = function (key) {
  this[key] = !this[key];
};
Vue.prototype.routeTo = function (path, replace) {
  if (replace) {
    this.$router.replace(path)
  } else {
    this.$router.push(path)
  }
};
Vue.prototype.routeBack = function () {
  window.history.length > 1
    ? this.$router.go(-1)
    : this.$router.replace('/')
};
Vue.prototype.routeAndCache = function (route, replace) {
  this.routeTo(route.path, replace);
  store.commit("pushCacheMenu", route);
};
Vue.prototype.formatAmount = formatAmount;
Vue.filter('formatAmount', formatAmount);


Vue.directive('src', function (el, binding, vnode) {
  let isHttp = /^http/ig.test(binding.value);
  let imgUrl = isHttp ? binding.value : REMOTE_URL + binding.value;
  if (imgUrl === el.src) {
    return;
  }
  el.src = defaultImg;
  let newImg = new Image();
  newImg.onload = function () {
    el.src = this.src;
  };
  newImg.src = imgUrl;
});
