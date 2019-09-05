/** 
* @author: zhazhjie 
* @email: zhazhjie@vip.qq.com
* @date: 2018-12-12 19:06:36 
* @version: 1.0 
*/	
import Vue from 'vue'
const OSS_URL = process.env.OSS_URL;
const defaultImg = require('@/img/defaultImg.png');
function formatAmount(value) {
  if (!value) return '0.00';
  value = value * 1;
  if (value > 1000000) {
    return (value / 10000).toFixed(2) + '万'
  } else {
    return value.toFixed(2)
  }
}
Vue.prototype.confirm = function(msg){
	return new Promise((resolve,reject)=>{
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
Vue.prototype.setNegate = function(key){
  this[key]=!this[key];
};
Vue.prototype.routeTo = function(path,replace){
  if(replace){
    this.$router.replace(path)
  }else{
    this.$router.push(path)
  }
};
Vue.prototype.routeBack = function(){
  window.history.length > 1
    ? this.$router.go(-1)
    : this.$router.replace('/')
};

Vue.prototype.formatAmount=formatAmount;
Vue.filter('formatAmount',formatAmount);

//图片模式mode详见：https://help.aliyun.com/document_detail/44688.html?spm=a2c4g.11186623.6.1181.e3803168l0gWII
Vue.directive('src', function (el, binding, vnode) {
  let size = Object.keys(binding.modifiers);
  let mode = binding.arg;
  let imgUrl = OSS_URL+binding.value+(!mode?'':`?x-oss-process=image/resize,m_${mode||'pad'},${size[0]||'w_100'},${size[1]||'h_100'}`);
  if(imgUrl == el.src){
    return;
  }
  el.src = defaultImg;
  let newImg = new Image();
  newImg.onload = function(){
    el.src = this.src;
  }
  newImg.src = imgUrl;
})
