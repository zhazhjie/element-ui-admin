/** 
 * @author: zhazhjie 
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-09-21 16:33:02 
 * @version: 1.0 
 */

<template>
  <div class="not-data">
  	<i>&#xe64f;</i>
  	<div><slot>-暂无数据-</slot></div>
  </div>
</template>

<script>
export default {
  name:'not-data',
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
.not-data{
  padding: 15px;
  text-align: center;
  color: #999;
}
.not-data i{
	display: block;
	font-size: 1rem;
	color: #4888ff;
	margin-bottom: 0.1rem;
	text-indent: 0.3rem;
}
</style>