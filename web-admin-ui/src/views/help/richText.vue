/** 
 * @author: zhazhjie 
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-11-07 21:18:10 
 * @version: 1.0 
 */

<template>
  <section>
    <tinymce v-model='content' />
    <el-button type='success' @click='submit'>提交</el-button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      content:''
    }
  },
  components: {
    tinymce:(resolve)=>require(['@/components/Tinymce'],resolve),
  },
  methods: {
    submit(){
      this.$alert(this.content)
      .catch(res=>{});
    }
  },
  computed: {

  },
  mounted(){
    
  }
}
</script>

<style scoped>

</style>