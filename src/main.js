import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import commonEl from './components/index'
import './config/interceptor'
import './config/prototype'
import imgPreview from './utils/imgPreview'
Vue.use(ElementUI,{size:store.state.size});
Vue.config.productionTip = false;
Vue.use(imgPreview);
Vue.use(commonEl);
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
