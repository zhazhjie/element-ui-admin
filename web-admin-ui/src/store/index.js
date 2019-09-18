import Vue from 'vue'
import Vuex from 'vuex'
import {getUserInfo} from '@/api/sys/user'
import {listUserPermission} from '@/api/sys/permission'
import {setMenu,getStore,setStore} from '@/js/util'
import {listToMap, toTreeData, treeDataTranslate} from "../js/util";
import staticRouter from '../router/staticRouter'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo:{},
    menuList:[],
    permissions:[],
    size:getStore('size')||'mini',
    isCollapse:false,
    menuInitialized:false,
    cacheMenuList:getStore("cacheMenuList")||[]
  },
  actions:{
    getUserInfo({commit,state,dispatch}){
      return new Promise((resolve, reject) => {
          getUserInfo().then(res=>{
            setStore('userInfo',res.data||null);
            state.userInfo=res.data||{};
            resolve(res.data);
          })
            .catch(err=>reject(err))
      }).catch(err=>reject(err))
    },
    listUserPermission: function ({commit, state, dispatch}) {
      return new Promise((resolve, reject) => {
        listUserPermission().then(res => {
          // setStore('menuList', res.data.menuList || null);
          state.menuList = setMenu(treeDataTranslate(res.data.menuList)).concat(staticRouter);
          // setStore('permissions', res.data.permissions || null);
          state.permissions = res.data.permissions || [];
          state.menuInitialized = true;
          resolve();
        })
          .catch(err=>reject(err))
      }).catch(err=>reject(err))
    },
  },
  getters:{

  },
  mutations: {
    setSize(state,size){
      state.size=size;
      setStore('size',size);
    },
    setCollapse(state,isCollapse){
      state.isCollapse=!state.isCollapse;
    },
    logout(state){
        // setStore('menuList',null);
        // setStore('permissions',null);
        // setStore('userInfo',null);
        setStore('token',null,'local');
        state.menuList=[];
        state.permissions=[];
        state.userInfo={};
        location.reload();
    },
    pushCacheMenu(state,data){
      let isExist=state.cacheMenuList.some(v=>v.path===data.path);
      if(isExist) return;
      state.cacheMenuList.push(data);
      setStore('cacheMenuList',state.cacheMenuList);
    },
    removeCacheMenu(state,data){
      let cacheMenuList=state.cacheMenuList.filter(v=>v.path!==data.path);
      state.cacheMenuList=cacheMenuList;
      setStore('cacheMenuList',state.cacheMenuList);
    },
    removeAllCacheMenu(state){
      state.cacheMenuList=[];
      setStore('cacheMenuList',null);
    },
  }
})
