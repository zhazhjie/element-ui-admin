import Vue from 'vue'
import Vuex from 'vuex'
import {getUserInfo} from '../api/sys/user'
import {listUserPermission} from '../api/sys/permission'
import {setMenu, getStore, setStore} from '../utils/util'
import {listToMap, toTreeData, treeDataTranslate} from "../utils/util";
import staticRouter from '../router/staticRouter'
import router from '../router'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo: {},
    menuList: [],
    permissions: [],
    size: getStore('size') || 'mini',
    isCollapse: false,
    initFlag: false,
    cacheMenuList: getStore("cacheMenuList") || []
  },
  actions: {
    getUserInfo({commit, state, dispatch}) {
      getUserInfo().then(res => {
        setStore('userInfo', res.data || null);
        state.userInfo = res.data || {};
      })
        .catch(err => reject(err))
    },
    listUserPermission: function ({commit, state, dispatch}) {
      return new Promise((resolve, reject) => {
        listUserPermission().then(res => {
          state.menuList = setMenu(treeDataTranslate(res.data.menuList)).concat(staticRouter);
          state.permissions = res.data.permissions || [];
          resolve(res.data);
        })
          .catch(err => reject(err))
      })
    },
  },
  getters: {},
  mutations: {
    setSize(state, size) {
      state.size = size;
      setStore('size', size);
    },
    setCollapse(state) {
      state.isCollapse = !state.isCollapse;
    },
    logout(state) {
      setStore('token', null, 'local');
      setStore('cacheMenuList', null);
      state.menuList = [];
      state.permissions = [];
      state.userInfo = {};
      state.cacheMenuList = [];
      router.replace("/login");
      location.reload();
    },
    pushCacheMenu(state, data) {
      let isExist = state.cacheMenuList.some(v => v.path === data.path);
      if (isExist) return;
      state.cacheMenuList.push(data);
      setStore('cacheMenuList', state.cacheMenuList);
    },
    removeCacheMenu(state, data) {
      let cacheMenuList = state.cacheMenuList.filter(v => v.path !== data.path);
      state.cacheMenuList = cacheMenuList;
      setStore('cacheMenuList', state.cacheMenuList);
    },
    removeAllCacheMenu(state) {
      state.cacheMenuList = [];
      setStore('cacheMenuList', null);
    },
  }
})
