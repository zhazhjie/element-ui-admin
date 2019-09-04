/** 
 * @author: zhazhjie 
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-11-06 15:31:27 
 * @version: 1.0 
 */

<template>
	<div id="help">
  <pre class="code">
      <code class="javascript">
        //静态路由位于router/index
        
        //ajax请求位于api/

        //表格尽量使用表格组件&lt;table-template/>，详见<a @click='routeTo("/help/table")'>表格</a>

        //图标用法&lt;i class="icon-*">&lt;/i>，详见<a @click='routeTo("/help/iconfont")'>图标</a>

        //需要鉴权的按钮使用&lt;permission-btn/>，如：&lt;permission-btn permission='sys_user_add'>新增&lt;/permission-btn>
        //权限标识permission，不需要鉴权可不传，权限由permission-btn统一处理
        //继承&lt;el-button/>，可传el-button其他参数

        //增删改按钮加loading，防止重复点击
        //如&lt;permission-btn :loading='loading'/>
      </code>
  </pre> 
  </div>
</template>

<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
hljs.highlightCode =   function () { 
  let blocks = document.querySelectorAll('pre code');
  [].forEach.call(blocks, hljs.highlightBlock);
};
// require('../../../static/js/exportExcel')
// require('../../../static/js/importExcel')
export default {
  data() {
    return {
      content:''
    }
  },
  components: {
  	
  },
  methods: {
    
  },
  computed: {

  },
  mounted(){
    //hljs.highlightCode()
  }
}
</script>

<style scoped>
.code{
  background: #eee;
}
.hr{
  margin: 0.2rem 0;
}
</style>