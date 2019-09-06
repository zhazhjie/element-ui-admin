/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-11-05 15:33:58
* @version: 1.0
*/

<template>
  <section>
    <el-form :inline="true">
      <el-form-item>
        <el-input placeholder="名称" v-model='params.keyword'></el-input>
      </el-form-item>
      <el-form-item>
        <permission-btn type='primary' plain @click='handleSearch'>查询</permission-btn>
      </el-form-item>
    </el-form>
    <div style="margin-bottom: 15px;">
      <permission-btn permission='' type='primary' @click='handleAdd'>新增</permission-btn>
    </div>
    <table-template
      ref="table"
      @submit="handleSubmit"
      @showDialog="findParentId"
      :need-page="false"
      :tableProps="{rowKey:'id'}"
      :dialogProps="{width:'500px'}"
      :handleProps="{width:'150px'}"
      :rules="rules"
      :loading='tableLoading'
      :tableData='menuList'
      :columns='columns'
      :handleList='handleList'
      :handlePageChange='listMenu'
      :page='params'/>
  </section>
</template>

<script>
  import {listMenu, udpObj, addObj, delObj, selectMenu} from '@/api/sys/menu'
  import {treeDataTranslate} from "../../js/util";

  export default {
    data() {
      return {
        dialogVisible: false,
        deptVisible: false,
        tableLoading: false,
        handleLoading: false,
        handleType: 0,
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        curMenu: {
          id: '',
          name: '',
          type: 0,
          permissionFlag: '',
          url: '',
          sort: '',
          hidden: 0,
          icon: '',
          parentId: '',
          parentName: ''
        },
        menuList: [],
        selectMenuList: [],
        selectedPerms:[],
        columns: [
          {
            label: 'ID',
            field: 'id',
            hiddenInDialog: true,
            props: {
              width: 220,
              align: 'left'
            }
          },
          {
            label: '名称',
            field: 'name',
          },
          {
            label: '上级菜单',
            field: 'parentName',
            formItem: {
              render: row => {
                return (
                  <el-cascader
                    ref="perms"
                    style="width:100%"
                    placeholder="请选择权限"
                    value={this.selectedPerms}
                    // on-input={e=>row.parentId=e}
                    // on-change={this.handleSelectNode.bind(this,row)}
                    props={{
                      label: "name",
                      value: "id",
                      checkStrictly: true,
                      expandTrigger: "hover"
                    }}
                    options={this.menuList}
                    collapse-tags/>
                )
              }
            }
          },
          {
            label: '图标',
            field: 'icon',
            render: row => <i class={row.icon}></i>
          },
          {
            label: '类型',
            field: 'type',
            render: row => {
              if (row.type === 0) {
                return <el-tag size="small">菜单</el-tag>
              } else if (row.type === 1) {
                return <el-tag size="small" type="success">按钮</el-tag>
              } else {
                return <el-tag size="small" type="info">接口</el-tag>
              }
            },
            formItem: {
              render: row => {
                return (
                  <div>
                    <el-radio label={0} {...this.vModel(row)}>菜单</el-radio>
                    <el-radio label={1} {...this.vModel(row)}>按钮</el-radio>
                    <el-radio label={2} {...this.vModel(row)}>接口</el-radio>
                  </div>
                )
              }
            }
          },
          {
            label: '排序',
            field: 'sort',
          },
          {
            label: 'URL',
            field: 'url',
            props: {
              showOverflowTooltip: true,
            }
          },
          {
            label: '授权标识',
            field: 'permissionFlag',
            props: {
              showOverflowTooltip: true
            }
          },
        ],
        handleList: [
          {
            label: '编辑',
          },
          {
            label: '删除',
            props: {
              type: 'danger'
            },
            click: row => {
              this.handleDelete(row);
            }
          }
        ],
        rules: {
          name: [
            {required: true, message: '请输入菜单名称', trigger: 'blur'},
          ],
          parentName: [
            {message: '请选择上级目录', trigger: 'change'},
          ],
          url: [],
          perms: [],
        },
        params: {
          keyword: '',
          current: 1,
          size: 10
        }
      }
    },
    components: {},
    methods: {
      vModel(row) {
        return {
          props: {value: row.type},
          on: {input: e => row.type = e}
        }
      },
      listMenu: function () {
        this.tableLoading = true;
        listMenu(this.params).then((res) => {
          this.tableLoading = false;
          this.originalMenuList=res.data;
          this.menuList = treeDataTranslate(res.data);
        })
      },
      handleAdd() {
        let table = this.$refs.table;
        table.curRow = this.curMenu;
        table.showDialog();
      },
      handleDelete(id, name) {
        this.confirm('确定要删除[' + name + ']吗?', '提示').then(() => {
          delObj(id).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.listMenu();
            this.selectMenu();
          });
        });
      },
      handleSearch() {
        this.params.current = 1;
        this.listMenu();
      },
      handleSubmit(row) {
        if (this.$refs.table.handleType) {
          this.submitUpdate(row);
        } else {
          this.submitAdd(row);
        }
      },
      submitAdd(row) {
        addObj(row).then(() => {
          this.$message({
            type: 'success',
            message: '新增成功!'
          });
          this.listMenu();
          this.handleLoading = false;
          this.$refs.table.handleClose();
        }).catch(() => {
          this.handleLoading = false;
        });
      },
      submitUpdate(row) {
        udpObj(row).then(() => {
          this.$message({
            type: 'success',
            message: '更新成功!'
          });
          this.listMenu();
          this.handleLoading = false;
          this.$refs.table.handleClose();
        }).catch(() => {
          this.handleLoading = false;
        });
      },
      handleNodeClick(row, data) {
        this.deptVisible = false;
        row.parentId = data.id;
        row.parentName = data.name;
      },
      selectMenu() {
        selectMenu().then(res => {
          this.selectMenuList = [];
          this.selectMenuList.push(res.data);
        });
      },
      findParentId(row){
        let result=[];
        result.push(row.id);
        this.findNext(result,row.parentId);
        this.selectedPerms=[result.reverse()];
        console.log(row,this.selectedPerms)
      },
      findNext(result,parentId){
        let len=this.originalMenuList.length;
        for(let i =0;i<len;i++){
          let item=this.originalMenuList[i];
          if(item.id===parentId){
            result.push(item.id);
            if(item.parentId!=0) this.findNext(result,item.parentId);
            break;
          }
        }
      },
      handleMenuTypeChange() {
        this.rules.url = [];
        this.rules.perms = [];
        if (this.curMenu.type == 0) {
          this.curMenu.url = "";
          this.curMenu.perms = "";
        } else if (this.curMenu.type == 1) {
          this.curMenu.perms = "";
          this.rules.url.push({required: true, message: '请输入菜单路由', trigger: 'blur'});
        } else if (this.curMenu.type == 2) {
          this.curMenu.url = "";
          this.curMenu.icon = "";
          this.rules.perms.push({required: true, message: '请输入授权标识', trigger: 'blur'});
        }
      }
    },
    computed: {},
    mounted() {
      //this.fetchList();
      this.listMenu();
    }
  }
</script>

<style scoped>

</style>
