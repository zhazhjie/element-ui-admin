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
        <el-main class='el-main'>
          <el-router-view/>
        </el-main>
      </el-container>
    </el-container>
  </section>
</template>


<script>
import headBar from './headBar'
import navBar from './navBar'
import elRouterView from '../routerView'
export default {
  data() {
    return {
      
    }
  },
  components: {
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
}
.el-main{
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
}
.right-container{
  flex-direction: column;
}
</style>
