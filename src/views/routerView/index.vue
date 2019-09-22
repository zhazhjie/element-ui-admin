/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-11-06 14:29:32
* @version: 1.0
*/

<template>
  <section class="router">
    <transition name='fade-right' mode='out-in'>
      <keep-alive :include="menuList">
        <router-view class='router-view'/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'elRouterView',
    data() {
      return {

      }
    },
    components: {

    },
    methods: {

    },
    computed: {
      menuList(){
        return this.$store.state.cacheMenuList.map(v=>v.meta.name);
      }
    },
    mounted(){

    }
  }
</script>

<style scoped>
  .router{
    height: 100%;
  }
</style>
