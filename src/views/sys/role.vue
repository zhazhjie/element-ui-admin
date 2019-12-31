/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-11-05 15:33:58
* @version: 1.0
*/

<template>
  <section>
    <table-template
      ref="table"
      @submitAdd="submitAdd"
      @submitEdit="submitUpdate"
      @submitSearch="handleSearch"
      @showEdit="findParentId"
      :dialogProps="{width:'500px'}"
      :loading='tableLoading'
      :handleLoading="handleLoading"
      :tableData='roleList'
      :columns='columns'
      :handleList='handleList'
      :handlePageChange='getRoleList'
      :page='params'/>
  </section>
</template>

<script>
  import {listPage, updObj, delObj, addObj} from '../../api/sys/role'
  import {formatTreeData, listToMap, treeDataTranslate} from '../../utils/util'
  import {mapState} from 'vuex'
  import {listPermission} from "../../api/sys/permission";

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
        selectedPerms: [],
        columns: [
          {
            label: 'ID',
            field: 'id',
            hideInDialog: true,
            hideInSearch: true
          },
          {
            label: '角色名',
            field: 'roleName',
          },
          {
            label: '备注',
            field: 'remark',
            hideInSearch: true
          },
          {
            label: '创建时间',
            field: 'createTime',
            hideInDialog: true,
            hideInSearch: true
          },
          {
            label: '选择权限',
            field: 'permissionIdList',
            hideInTable: true,
            hideInSearch: true,
            formEl: {
              render: row => {
                return (
                  <el-cascader
                    ref="perms"
                    style="width:100%"
                    placeholder="请选择权限"
                    vModel={this.selectedPerms}
                    props={{
                      props: {
                        label: "name",
                        value: "id",
                        multiple: true,
                        expandTrigger: "hover"
                      }
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
            label: '编辑',
            icon: 'el-icon-edit'
          },
          {
            label: '删除',
            icon: 'el-icon-delete',
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
        listPermission(this.params).then((res) => {
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
      handleDelete(row) {
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
      handleSearch(params) {
        this.params.current = 1;
        this.params = {...this.params, ...params};
        this.getRoleList();
      },
      setPerms(row) {
        let permissionIdList = [];
        this.selectedPerms.forEach(item => {
          permissionIdList.push(...item);
        });
        row.permissionIdList = [...new Set(permissionIdList)];
      },
      submitAdd(row) {
        this.handleLoading = true;
        this.setPerms(row);
        addObj(row).then(() => {
          this.$message({
            type: 'success',
            message: '新增成功!'
          });
          this.getRoleList();
          this.$refs.table.closeDialog();
          this.handleLoading = false;
        }).catch(() => {
          this.handleLoading = false;
        });
      },
      submitUpdate(row) {
        this.handleLoading = true;
        this.setPerms(row);
        updObj(row).then(() => {
          this.$message({
            type: 'success',
            message: '更新成功!'
          });
          this.getRoleList();
          this.$refs.table.closeDialog();
          this.handleLoading = false;
        }).catch(() => {
          this.handleLoading = false;
        });
      },
      findParentId(row) {
        let result = [];
        let index = 0;
        let permissionIdList = row.permissionIdList || [];
        permissionIdList.forEach((permissionId, i) => {
          if (!result[index]) {
            result[index] = [];
          }
          let permission = this.permissionMap[permissionId];
          if (permission) result[index].push(permission.id);
          let parent = this.permissionMap[permission.parentId];
          while (parent) {
            result[index].unshift(parent.id);
            parent = this.permissionMap[parent.parentId];
          }
          index++;
        });
        this.selectedPerms = result;
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
