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
      :data="userList"
      :config="config"
      :tableLoading="tableLoading"
      @submitAdd="submitAdd"
      @submitEdit="submitUpdate"
      @submitSearch="handleSearch"
      @pageChange="fetchList"
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
        tableLoading: false,
        userList: [],
        roleList: [],
        config: {
          mode:"drawer",
          dialogProps: {width: '500px'},
          handleProps: {width: '200px'},
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
              formEl:{
                type: "date-picker",
              },
              value:new Date()
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
              value: 1,
              options: [{value: 1, text: "正常"}, {value: 0, text: "禁用"}],
              stateMapping:{
                0:"danger",
                1:"success"
              },
              // render: (row) => {
              //   return row.state ? <el-tag type="success">正常</el-tag> : <el-tag type="danger">禁用</el-tag>
              // },
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
        },
        params: {
          keyword: '',
          current: 1,
          size: 10,
          total: 10
        }
      }
    },
    methods: {
      fetchList() {
        this.tableLoading = true;
        fetchList(this.params).then(res => {
          this.userList = res.data.records;
          this.params.total = res.data.total;
          this.tableLoading = false;
        }).catch(()=>this.tableLoading=false);
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
      submitAdd(row, hideLoading, done) {
        addObj(row).then((res) => {
          this.$message({
            type: 'success',
            message: `新增成功，默认密码：${res.data}`
          });
          this.fetchList();
          done();
        }).catch(() => hideLoading());
      },
      submitUpdate(row, hideLoading, done) {
        updObj(row).then(() => {
          this.$message({
            type: 'success',
            message: '更新成功!'
          });
          this.fetchList();
          done();
        }).catch(() => hideLoading());
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
