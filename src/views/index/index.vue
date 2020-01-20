/** 
 * @author: zhazhjie 
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-06-21 15:26:49 
 * @version: 1.0 
 */

<template>
  <section id="index">
    <el-container class='container'>
      <nav-bar/>
      <el-container class='right-container'>
        <head-bar />
        <cache-menu-bar></cache-menu-bar>
        <el-main id='el-main'>
          <el-router-view/>
        </el-main>
      </el-container>
      <feedback></feedback>
    </el-container>
  </section>
</template>


<script>
import headBar from './headBar'
import navBar from './navBar'
import elRouterView from '../routerView'
import CacheMenuBar from "./cacheMenuBar/index";
import Feedback from "./feedback/index";
export default {
  data() {
    return {
      
    }
  },
  components: {
    Feedback,
    CacheMenuBar,
    headBar,
    navBar,
    elRouterView
  },
  methods: {

  },
  computed: {

  },
  mounted(){
    
  }
}
</script>

<style scoped>
.container{
	height: 100vh;
  background: #fff;
}
#el-main{
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
}
.right-container{
  flex-direction: column;
}
</style>
