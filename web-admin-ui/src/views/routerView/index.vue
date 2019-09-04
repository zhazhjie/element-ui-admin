/** 
 * @author: zhazhjie 
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-11-06 14:29:32 
 * @version: 1.0 
 */

<template>
  <div class="router">
    <transition name='fade-right' mode='out-in'>
      <router-view class='router-view child-router'/>
    </transition>
  </div>
</template>

<script>
export default {
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

</style>