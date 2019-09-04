/** 
 * @author: zhazhjie 
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-06-21 15:26:49 
 * @version: 1.0 
 */

<template>
  <section id="index">
    <el-container class='container'>
      <sidebar/>
      <el-container class='right-container'>
        <headbar />
        <el-main class='el-main'>
          <transition name='fade-right' mode='out-in'>
            <router-view class='router-view child-router' />
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </section>
</template>


<script>
import headbar from './headbar'
import sidebar from './sidebar'
export default {
  data() {
    return {
      
    }
  },
  components: {
    headbar,
    sidebar,
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