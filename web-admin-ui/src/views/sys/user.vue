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
        <el-input placeholder="用户名" v-model='params.keyword'></el-input>
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
      :dialogProps="{width:'500px'}"
      :rules="rules"
      :loading='tableLoading'
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
    components: {},
    data() {
      let validateStringIsIncludeBlank = function (rule, value, callback) {
        if (value === "") {
          return false;
        }
        if (value.indexOf(" ") > -1) {
          callback(new Error('密码不能包含空格!'));
        } else {
          callback();
        }
      };
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
            hiddenInDialog: true,
          },
          {
            label: '登录账号',
            field: 'username',
          },
          // {
          //   label: '密码',
          //   field: 'password',
          //   hiddenInTable: true,
          // },
          {
            label: '手机',
            field: 'phone',
          },
          {
            label: '邮箱',
            field: 'email',
            hiddenInTable: true
          },
          {
            label: '角色',
            field: 'roleIdList',
            hiddenInTable: true,
            formEl: {
              render: (row) => {
                return (<el-select
                  value={row.roleIdList}
                  on-input={e=>row.roleIdList=e}
                  multiple
                  default-first-option
                  placeholder="请选择角色"
                  style='width:100%'>
                  {this.roleList.map(role => {
                    return (
                      <el-option
                        key={role.id}
                        label={role.roleName}
                        value={role.id}>
                      </el-option>
                    )
                  })}
                </el-select>)
              }
            },
          },
          {
            label: '状态',
            field: 'state',
            render: (row) => {
              return row.state ? <el-tag type="success">正常</el-tag> : <el-tag type="danger">禁用</el-tag>
            },
            formEl: {
              render: (row) => {
                return (<div>
                  <el-radio label={1} value={row.state} on-input={e => row.state = e}>正常</el-radio>
                  <el-radio label={0} value={row.state} on-input={e => row.state = e}>禁用</el-radio>
                </div>)
              }
            },
          },
          {
            label: '创建时间',
            field: 'createTime',
            hiddenInDialog: true
          }
        ],
        handleList: [
          {
            label: '重置密码',
            props: {
              type: 'success'
            },
            click: row => {
              this.handleResetPwd(row);
            }
          },
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
          username: [
            {required: true, message: '请输入登录账号', trigger: 'blur'},
            {validator: validateStringIsIncludeBlank, trigger: 'blur', message: "登录账号不能包含空格"}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, message: '密码长度必须6位或者6位以上', trigger: 'blur'},
            {validator: validateStringIsIncludeBlank, trigger: 'blur'}
          ],
        },
        params: {
          keyword: '',
          current: 1,
          size: 10,
          total:10
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
      handleAdd() {
        let table = this.$refs.table;
        table.curRow = this.curUser;
        table.showDialog();
      },
      handleResetPwd(row) {
        this.confirm('确定要重置[' + row.username + ']的密码吗?').then(() => {
          resetPwd(row.id).then(() => {
            this.$message({
              type: 'success',
              message: '密码重置成功!'
            });
          });
        });
      },
      handleDelete(row) {
        this.confirm('确定要删除[' + row.username + ']吗?').then(() => {
          delObj([row.id]).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.fetchList();
          });
        });
      },
      handleSearch() {
        this.params.current = 1;
        this.fetchList();
      },
      handleSubmit(row) {
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
          this.fetchList();
          this.$refs.table.handleClose();
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
          this.$refs.table.handleClose();
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
