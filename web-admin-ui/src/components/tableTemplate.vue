/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-11-06 09:56:35
* @version: 1.0
*/
<template>
  <div class="">
    <el-table :data='data' style="width: 100%" highlight-current-row v-bind='$attrs' @selection-change="handleSelectionChange" @row-click="handleRowClick" v-loading='loading'>
      <el-table-column v-if='needSelect' type="selection" align="center" width="30">
      </el-table-column>
      <el-table-column v-for='(item,index) in columns' :label="item.name" :key='index' :align="item.align||'center'" :width='item.width'>
        <template slot-scope="scope">
          <template v-if='typeof item.field == "string"'>
            <span v-if='!item.showText&&!item.showHTML' :style='{color:item.color}'>{{!item.format?scope.row[item.field]:item.format(scope.row[item.field])}}</span>
            <span v-else-if='item.showHTML' v-html='item.showHTML(scope.row)'></span>
            <el-tag :type='item.showText[scope.row[item.field]].type' v-else>{{item.showText[scope.row[item.field]].name}}</el-tag>
          </template>
          <template v-else>
            <span v-for='(el,i) in item.field' :style='{color:item.color}'>{{scope.row[el]}}{{i<(item.field.length-1)?(item.separator||" / "):""}}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column fixed="right" header-align="center" v-if='handleList.length' label='操作' :align="(handleList[0]&&handleList[0].align)||'center'" :width='(handleList[0]&& handleList.length * handleList[0].initWidth) || handleList.length*85'>
        <template slot-scope="scope">
          <permission-btn v-for='(item,index) in handleList' :type="item.type" :key='index' :permission='item.permission' v-if='!item.showRule||item.showRule(scope.row)' @click="handleClick(scope.row,scope.$index,item.handleName)">
            {{item.name}}
          </permission-btn>
        </template>
      </el-table-column>
      <slot />
    </el-table>
    <el-pagination v-if='needPage' style='margin-top: 20px' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="+page.curPage" :page-sizes="[5,10, 20, 50, 100]" :page-size="+page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="+page.totalCount">
    </el-pagination>
  </div>
</template>


<script>
  export default {
    name: 'table-template',
    props: {
      loading:{
        type:Boolean,
        default:false,
      },
      data: {
        type: Array,
        default: _ => ([])
      },
      columns: {
        type: Array,
        default: _ => ([])
      },
      handleList: {
        type: Array,
        default: _ => ([])
      },
      page: {
        type: Object,
        default: _ => ({})
      },
      needPage: {
        type: Boolean,
        default: true,
      },
      handlePageFunction: {
        type: String,
        default: '',
      },
      handleRowClickFunction: {
        type: String,
        default: '',
      },
      needSelect: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        multipleSelection:[]
      }
    },
    components: {},
    methods: {
      handleClick(row, index, handleName) {
        this.$emit(handleName, row, index)
      },
      handleSizeChange(pageSize) {
        //console.log(`每页 ${val} 条`);
        this.page.pageSize = pageSize;
        //console.log(this.$parent.$parent.$parent[this.handlePageFunction])
        if(typeof this.$parent[this.handlePageFunction] === 'function'){
          this.$parent[this.handlePageFunction]();
        }else if(typeof this.$parent.$parent[this.handlePageFunction] === 'function'){
          this.$parent.$parent[this.handlePageFunction]();
        }else if(typeof this.$parent.$parent.$parent[this.handlePageFunction] === 'function'){
          this.$parent.$parent.$parent[this.handlePageFunction]();
        }
      },
      handleCurrentChange(curPage) {
        // console.log(`当前页:`+curPage);
        this.page.curPage = curPage;
        this.handleSizeChange(this.page.pageSize);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.$emit('select',val)
        //console.log(this.multipleSelection)
      },
      handleRowClick(row){
        if(typeof this.$parent.$parent[this.handleRowClickFunction] === 'function'){
          this.$parent.$parent[this.handleRowClickFunction](row);
        }
      }
    },
    computed: {},
    mounted() {

    }
  }

</script>
<style scoped>
</style>
