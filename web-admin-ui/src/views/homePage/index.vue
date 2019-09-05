<template>
  <section>
    <temp :columns="columns" :tableData="tableData" :handleList="handleList"></temp>
  </section>
</template>
<script>
  import {mapState} from 'vuex'
  import temp from '../../components/tableTemplate'
  import ElButton from "../../components/common/button";
  export default {
    components: {ElButton},
    data() {
      return {
        data:<el-button>666</el-button>,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        handleList: [
          {
            name: '重置密码',
            props:{
              type:'danger'
            },
            click:(row)=>{
              console.log(row)
            }
          },
          {
            name: '编辑',
            type: '',
            handleName: 'handleChange',
            click:(row)=>{
              console.log(row)
            }
          }, {
            name: '删除',
            type: 'danger',
            handleName: 'handleDelete',
          }
        ],
        columns: [{
          name: '时间',
          field: 'date',
          props:{
            width: 150,
            align:'left'
          },
          form:{
            placeholder:"123",
            labelWidth: 100,
            component:"checkbox"
          },
          render:(a)=>{
            console.log(a)
            return <el-button on-click={this.cons.bind(this,a)}>666</el-button>
          }
        },
          {
            name: '登录账号',
            field: 'name',
          },
          {
            name: '地址',
            field: 'address',
          },
        ],
      }
    },
    components: {temp},
    methods: {
      cons(text){
        console.log(text)
      }
    },
    computed: {
      ...mapState(['permissions', 'userInfo']),
    },
    mounted() {

    }
  }
</script>
