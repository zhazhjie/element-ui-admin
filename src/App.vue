<template>
  <div id="app">
    <transition name='fade-right'>
      <router-view class='router-view'/>
    </transition>
  </div>
</template>

<script>
import {mapState} from 'vuex'  
export default {
  name: 'App',
  computed:{
    
  },
  components:{

  },
  methods:{

  },
  mounted(){

  }
}
</script>

<style>
@import './css/iconfont.css';
@import './css/global.css';
#app{
  width: 100%;
  height: 100%;
  position: relative;
}
.el-message{
  z-index: 3000 !important;
}
</style>
