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
        <el-input placeholder="角色名称" v-model='params.keyword' :clearable="true"></el-input>
      </el-form-item>
      <el-form-item>
        <permission-btn type='primary' plain @click='handleSearch'>查询</permission-btn>
      </el-form-item>
    </el-form>
    <div style="margin-bottom: 15px;">
      <permission-btn type='primary' @click='handleAdd'>新增</permission-btn>
    </div>
    <table-template
      ref="table"
      @showDialog="findParentId"
      :dialogProps="{width:'500px'}"
      :loading='tableLoading'
      :tableData='roleList'
      :columns='columns'
      :handleList='handleList'
      :handlePageChange='getRoleList'
      @submit="handleSubmit"
      :page='params'/>
  </section>
</template>

<script>
  import {listPage, getObj, updObj, delObj, addObj} from '../../api/sys/role'
  import {formatTreeData, listToMap, treeDataTranslate} from '../../js/util'
  import {mapState} from 'vuex'
  import {listMenu} from "../../api/sys/menu";

  export default {
    data() {
      return {
        tableLoading: false,
        handleLoading: false,
        roleList: [],
        curRole: {
          roleName: '',
          remark: '',
          permissionIdList: []
        },
        permissionTree: [],
        selectedPerms:[],
        columns: [
          {
            label: 'ID',
            field: 'id',
            hiddenInDialog: true
          },
          {
            label: '角色名',
            field: 'roleName',
          },
          {
            label: '备注',
            field: 'remark',
          },
          {
            label: '创建时间',
            field: 'createTime',
            hiddenInDialog: true
          },
          {
            label: '选择权限',
            field: 'permissionIdList',
            hiddenInTable: true,
            formEl: {
              render: row => {
                return (
                  <el-cascader
                    ref="perms"
                    style="width:100%"
                    placeholder="请选择权限"
                    value={this.selectedPerms}
                    on-input={e =>{console.log(e);this.selectedPerms=e}}
                    props={{
                      label: "name",
                      value: "id",
                      multiple: true,
                      expandTrigger: "hover"
                    }}
                    options={this.permissionTree}
                    collapse-tags/>
                )
              }
            }
          }
        ],
        handleList: [
          {
            label: '编辑'
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
          roleName: [
            {required: true, message: '请输入角色名', trigger: 'blur'},
          ]
        },
        params: {
          keyword: '',
          current: 1,
          size: 10,
          total: 10
        },
      }
    },
    components: {},
    methods: {
      listPermission() {
        this.tableLoading = true;
        listMenu(this.params).then((res) => {
          this.tableLoading = false;
          this.permissionTree = treeDataTranslate(res.data);
          this.permissionMap = listToMap(res.data);
        })
      },
      getRoleList() {
        this.tableLoading = true;
        listPage(this.params).then(res => {
          this.tableLoading = false;
          this.roleList = res.data.records;
          this.params.total = res.data.total;
        })
      },
      handleAdd() {
        this.handleType = 0;
        this.dialogVisible = true;
      },
      handleDelete(row, index) {
        this.confirm('确定要删除[' + row.roleName + ']吗?').then(() => {
          delObj([row.id]).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getRoleList();
          });
        });
      },
      handleSearch() {
        this.params.current = 1;
        this.getRoleList();
      },
      handleSubmit(row) {
        let permissionIdList=[];
        this.selectedPerms.forEach(item=>{
          permissionIdList.push(...item);
        });
        console.log(permissionIdList)
        row.permissionIdList=[...new Set(permissionIdList)];
        let table = this.$refs.table;
        if (table.handleType) {
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
          this.getRoleList();
          this.$refs.table.handleCloseDialog();
          this.handleLoading = false;
        }).catch(() => {
          this.handleLoading = false;
        });
      },
      submitUpdate(row) {
        updObj(row).then(() => {
          this.$message({
            type: 'success',
            message: '更新成功!'
          });
          this.getRoleList();
          this.$refs.table.handleCloseDialog();
          this.handleLoading = false;
        }).catch(() => {
          this.handleLoading = false;
        });
      },
      findParentId(row){
        let result=[];
        let index=0;
        let permissionIdList=row.permissionIdList||[];
        permissionIdList.forEach((permissionId,i)=>{
          if(!result[index]){
            result[index]=[];
          }
          let permission=this.permissionMap[permissionId];
          result[index].push(permission.id);
          let parent=this.permissionMap[permission.parentId];
          while (parent){
            result[index].unshift(parent.id);
            parent=this.permissionMap[parent.parentId];
          }
          index++;
        });
        this.selectedPerms=result;
      },
    },
    computed: {
      ...mapState(['userInfo']),
    },
    mounted() {
      this.listPermission();
      this.getRoleList();
    }
  }
</script>

<style scoped>

</style>
