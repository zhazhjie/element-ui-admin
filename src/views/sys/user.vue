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
      :dialogProps="{width:'500px'}"
      :handleProps="{width:'200px'}"
      :rules="rules"
      :loading='tableLoading'
      :handleLoading="handleLoading"
      :tableData='userList'
      :columns='columns'
      :handleList='handleList'
      :handlePageChange='fetchList'
      :page='params'>
    </table-template>
  </section>
</template>

<script>
  import {fetchList, getObj, updObj, addObj, resetPwd, delObj} from '@/api/sys/user'
  import {roleList} from '@/api/sys/role'

  export default {
    data() {
      return {
        dialogVisible: false,
        tableLoading: false,
        handleLoading: false,
        handleType: 0,
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        userList: [],
        curUser: {
          username: '',
          password: '',
          phone: '',
          email: '',
          state: 1,
          roleIdList: [],
        },
        roleList: [],
        columns: [
          {
            label: 'ID',
            field: 'id',
            hideInDialog: true,
            hideInSearch: true,
          },
          {
            label: '登录账号',
            field: 'username',
          },
          {
            label: '手机',
            field: 'phone',
            hideInSearch: true,
          },
          {
            label: '邮箱',
            field: 'email',
            hideInTable: true,
            hideInSearch: true,
          },
          {
            label: '角色',
            field: 'roleIdList',
            hideInTable: true,
            hideInSearch: true,
            options: () => this.roleList,
            defaultProp: {
              value: "id",
              text: "roleName"
            },
            formEl: {
              type: "select",
              props: {
                multiple: true,
              },
              attrs: {
                style: "width:100%"
              },
            },
          },
          {
            label: '状态',
            field: 'state',
            type: 'tag',
            options: [{value: 1, text: "正常"}, {value: 0, text: "禁用"}],
            render: (row) => {
              return row.state ? <el-tag type="success">正常</el-tag> : <el-tag type="danger">禁用</el-tag>
            },
            formEl: {
              type: "radio",
            },
            searchEl: {
              type: "select",
              props: {
                clearable: true
              }
            }
          },
          {
            label: '创建时间',
            field: 'createTime',
            hideInDialog: true,
            hideInSearch: true,
          }
        ],
        handleList: [
          {
            label: '重置密码',
            icon: 'el-icon-unlock',
            click: row => {
              this.handleResetPwd(row);
            }
          },
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
          username: [
            {required: true, message: '请输入登录账号', trigger: 'blur'}
          ],
        },
        params: {
          keyword: '',
          current: 1,
          size: 10,
          total: 10
        }
      }
    },
    components: {},
    methods: {
      fetchList() {
        this.tableLoading = true;
        fetchList(this.params).then(res => {
          this.tableLoading = false;
          this.userList = res.data.records;
          this.params.total = res.data.total;
        })
      },
      getRoleList() {
        roleList().then(res => {
          this.roleList = res.data;
        });
      },
      handleResetPwd(row) {
        this.confirm(`确定要重置[${row.username}]的密码吗?`).then(() => {
          resetPwd(row.id).then((res) => {
            this.$message({
              type: 'success',
              message: `重置成功，默认密码：${res.data}`
            });
          });
        });
      },
      handleDelete(row) {
        this.confirm(`确定删除[${row.username}]吗?`).then(() => {
          delObj([row.id]).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.fetchList();
          });
        });
      },
      handleSearch(params) {
        this.params.current = 1;
        this.params = {...this.params, ...params};
        this.fetchList();
      },
      submitAdd(row) {
        this.handleLoading = true;
        addObj(row).then((res) => {
          this.$message({
            type: 'success',
            message: `新增成功，默认密码：${res.data}`
          });
          this.fetchList();
          this.$refs.table.closeDialog();
          this.handleLoading = false;
        }).catch(() => {
          this.handleLoading = false;
        });
      },
      submitUpdate(row) {
        this.handleLoading = true;
        updObj(row).then(() => {
          this.$message({
            type: 'success',
            message: '更新成功!'
          });
          this.fetchList();
          this.$refs.table.closeDialog();
          this.handleLoading = false;
        }).catch(() => {
          this.handleLoading = false;
        });
      },
    },
    computed: {},
    mounted() {
      this.fetchList();
      this.getRoleList();
    }
  }
</script>

<style scoped>

</style>
