import Vue from 'vue'
import Vuex from 'vuex'
import {getUserInfo} from '@/api/login'
import {findNavTree} from '@/api/sys/menu'
import {setMenu,getStore,setStore} from '@/js/util'
import router from '@/router'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo:{},
    menuList:[],
    permissions:[],
    size:getStore('size')||'mini',
    isCollapse:false,
    menuInitialized:false
  },
  actions:{
    getUserInfo({commit,state,dispatch}){
      return new Promise((resolve, reject) => {
        var userInfo=getStore('userInfo');
        if(userInfo){
          state.userInfo=userInfo;
          resolve();
        }else{
          getUserInfo().then(res=>{
            if(res.data.id == 1 || res.data.orgTypeId == 1 || res.data.approveFlag == 2){
              setStore('userInfo',res.data||null);
            }
            state.userInfo=res.data||{};
            resolve()
          })
          .catch(error => {
            reject(error)
          })
        }
      })
    },
    getMenu({commit,state,dispatch}){
      return new Promise((resolve, reject) => {
        var menuList=getStore('menuList');
        if(menuList){
          state.menuList=setMenu(menuList);
          state.permissions=getStore('permissions');
          state.menuInitialized=true;
          resolve();
        }else{
          findNavTree().then(res=>{
            setStore('menuList',res.data.menuList||null);
            state.menuList=setMenu(res.data.menuList||[]);
            setStore('permissions',res.data.perms||null);
            state.permissions=res.data.perms||[];
            state.menuInitialized=true;
            resolve()
          })
          .catch(error => {
            reject(error)
          })
        }
      })
    },
    logout({commit,state,dispatch}){
      return new Promise((resolve, reject) => {
        setStore('menuList',null);
        setStore('permissions',null);
        setStore('userInfo',null);
        setStore('token',null,'local');
        state.menuList=[];
        state.permissions=[];
        state.userInfo={};
        resolve()
      })
      .catch(error => {
        reject(error)
      })
    }
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
    }
  }
})
