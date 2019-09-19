/** 
 * @author: zhazhjie 
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-11-05 15:33:58 
 * @version: 1.0 
 */

<template>
  <section>
    <pre class="code">
      <code class="javascript">
      //通用table组件  
      //继承&lt;el-table/> 可传el-table的其他参数
      &lt;table-template 
        :data='data' 
        :columns='columns' 
        :handleList='handleList' 
        @handleChange='handleChange' 
        handlePageFunction='getDataList' 
        needSelect='true'
        @select='select'
        :page='page'/>
   
      //需要显示的数据，必填 list
      data:[]
      
      //列参数
      columns:[{
        name:'',        //列标题，必填
        field:'',       //对应的字段，必填，一格显示多个字段传数组['field1','field2']
        separator:'/',  //多字段分隔符，默认'/'
        width:180,      //宽度
        color:'',       //颜色
        algin:'',       //对齐
        showText:{      //字段需要显示的文本，如：status:1,2,3
          1:{name:'正常',type:'success'},
          2:{name:'禁用',type:'danger'},
        },
      }]
      
      //操作按钮列表
      handleList:[{
        name:'修改',                //按钮名
        type:'warning',            //类型、颜色
        handleName:'handleChange', //监听的方法名
        permission:'sys_user_add', //权限标识
        algin:'',                  //对齐
      },{
        name:'删除',
        type:'danger',
        handleName:'handleDelete'
      }],

      如：@handleChange='handleChange' //接收两个参数(row,index)

      //handlePageFunction：切换页码需要触发的方法名
      //分页参数
      page:{
        current:2,   //当前页
        size:10,     //每页条数，默认可选[10,20,50,100]
        total:100    //总条数
      }
      //不需要分页:needPage='false'

      //勾选
      needSelect='true'
      //触发的方法，返回勾选的row
      @select='select'
      </code>
    </pre>  
  </section>
</template>

<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
hljs.highlightCode =   function () { 
  let blocks = document.querySelectorAll('pre code');
  [].forEach.call(blocks, hljs.highlightBlock);
};
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
    hljs.highlightCode()
  }
}
</script>

<style scoped>
.code code{
  background: #eee;
}
.hr{
  margin: 0.2rem 0;
}
</style>