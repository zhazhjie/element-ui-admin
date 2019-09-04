/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-11-06 09:56:35
* @version: 1.0
*/
<template>
  <div class="">
    <el-table :data='data' style="width: 100%" highlight-current-row v-bind='$attrs' @selection-change="handleSelectionChange">
      <el-table-column
      v-if='needSelect'
      type="selection"
      align="center"
      width="55">
    </el-table-column>
      <el-table-column v-for='(item,index) in columns' :label="item.name" :key='index' :align="item.align||'center'"
                       :width='item.width'>
        <template slot-scope="scope">
          <template v-if='!item.multiple'>
            <span :style='{marginLeft:(item.expanded?scope.row._tier*30:0)+"px",cursor:(item.expanded?"pointer":"")}'
                  @click='handleExpanded(scope.row,scope.$index)'>
              <i v-if='item.expanded&&scope.row.children&&scope.row.children.length'
                 :class="scope.row._expanded?'el-icon-caret-bottom':'el-icon-caret-right'"></i>
              <span v-if='!item.showText' :style='{color:item.color}'>{{!item.format?scope.row[item.field]:item.format(scope.row[item.field])}}</span>
              <el-tag :type='item.showText[scope.row[item.field]].type' v-else>{{item.showText[scope.row[item.field]].name}}</el-tag>
            </span>
          </template>
          <el-tag v-else v-for='(el,i) in scope.row[item.field]' :key='i' 　style='margin: 0 3px'>
            {{el[item.multipleField]||el}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right"
                       header-align="center"
                       v-if='handleList.length'
                       label='操作'
                       :align="(handleList[0]&&handleList[0].align)||'center'" :width='(handleList[0]&& handleList.length * handleList[0].initWidth) || handleList.length*80'>
        <template slot-scope="scope">
          <permission-btn v-for='(item,index) in handleList' :type="item.type" :key='index'
                          :permission='item.permission' v-if='!item.showRule||item.showRule(scope.row)' @click="handleClick(scope.row,scope.$index,item.handleName)">
            {{item.name}}
          </permission-btn>
        </template>
      </el-table-column>
      <slot/>
    </el-table>
    <el-pagination v-if='needPage' style='margin-top: 20px' @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" :current-page="+page.curPage" :page-sizes="[10, 20, 50, 100]"
                   :page-size="+page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="+page.totalCount">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    name: 'table-template',
    props: {
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      columns: {
        type: Array,
        default: () => {
          return []
        }
      },
      handleList: {
        type: Array,
        default: () => {
          return []
        }
      },
      page: {
        type: Object,
        default: () => {
          return {}
        }
      },
      needPage: {
        type: Boolean,
        default: true,
      },
      handlePageFunction: {
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
        if(typeof this.$parent[this.handlePageFunction] === 'function'){
          this.$parent[this.handlePageFunction]();
        }else if(typeof this.$parent.$parent[this.handlePageFunction] === 'function'){
          this.$parent.$parent[this.handlePageFunction]();
        }
      },
      handleCurrentChange(curPage) {
        //console.log(`当前页: ${val}`);
        this.page.curPage = curPage;
        if(typeof this.$parent[this.handlePageFunction] === 'function'){
          this.$parent[this.handlePageFunction]();
        }else if(typeof this.$parent.$parent[this.handlePageFunction] === 'function'){
          this.$parent.$parent[this.handlePageFunction]();
        }
      },
      handleExpanded(row, index) {
        if (typeof row._expanded != 'boolean' || !row.children || !row.children.length)
          return;
        if (row._expanded) {
          this.removeChildNode(this.data, row)
        } else {
          var len = row.children.length;
          for (var i = len - 1; i >= 0; i--) {
            this.data.splice(index + 1, 0, row.children[i])
          }
          row._expanded = true;
        }
      },
      removeChildNode(data, row) {
        for (var i = data.length - 1; i >= 0; i--) {
          if (data[i] && data[i].parentId == row.id) {
            row._expanded = false;
            data.splice(i, 1);
            if (row.children && row.children.length) {
              for (var j = row.children.length - 1; j >= 0; j--) {
                if (row.children[j]._expanded)
                  this.removeChildNode(data, row.children[j])
              }
            }
          }
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.$emit('select',val)
        //console.log(this.multipleSelection)
      }
    },
    computed: {},
    mounted() {

    }
  }

</script>
<style scoped>
</style>
