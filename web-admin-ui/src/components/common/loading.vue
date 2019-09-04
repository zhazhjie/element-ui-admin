/** 
 * @author: zhazhjie 
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-04-27 14:48:34 
 * @version: 1.0 
 */

<template>
    <div id="loading-wrap">
      <div id="loading">
        L<el-spin/>ADING<span class="point"><i>...</i></span>
      </div>
    </div>
</template>

<script>
//import {mapState} from 'vuex'  
export default {
  data() {
    return {

    }
  },
  components: {

  },
  methods: {

  },
  computed:{
    //...mapState(['loadFlag']),
  },
}
</script>

<style scoped>
#loading-wrap {
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}

#loading {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;  
}

.point {
  position: relative;
  width: 1em;
  height: 1em;
  display: flex;
  align-items: center;
}

.point i {
  height: 1em;
  line-height: 1em;
  position: absolute;
  overflow: hidden;
  animation: point 1.5s ease-in-out infinite;
}

@keyframes point {
  0% {
    width: 0;
  }

  100% {
    width: 100%;
  }
}

</style>