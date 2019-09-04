/** 
 * @author: zhazhjie 
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-09-26 09:33:03 
 * @version: 1.0 
 */

<template>
  <svg viewBox="25 25 50 50" class="circular" ref='clipper'>
    <circle ref='circle' cx="50" cy="50" r="20" fill="none" class="path"></circle>
  </svg>
</template>

<script>
export default {
  name:'el-spin',
  data() {
    return {

    }
  },
  components: {

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
.circular {
  height: 30px;
  width: 30px;
  margin: 5px;
  animation: loading-rotate 2s linear infinite;
}
@keyframes loading-rotate{
  100% {
    transform: rotate(1turn);
  }
}
.path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90,150;
  stroke-dashoffset: 0;
  stroke-width: 3;
  stroke: #4888ff;
  stroke-linecap: round;
}
@keyframes loading-dash{
  0% {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -120px;
  }
}
</style>