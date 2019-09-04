import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import './permission'
import {getStore,setStore} from '@/js/util'
import './js/prototype'
import imgPreview from '@/js/img-preview'
Vue.use(ElementUI,{size:getStore('size')||'mini'});
Vue.config.productionTip = false;
Vue.use(imgPreview);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
