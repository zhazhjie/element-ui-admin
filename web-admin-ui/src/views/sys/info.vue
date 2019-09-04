/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-11-05 15:33:58
* @version: 1.0
*/

<template>
  <section>
    <!-- <el-form :inline="true">
      <el-form-item>
        <el-input placeholder="用户名" v-model='params.username'></el-input>
      </el-form-item>
      <el-form-item>
        <permission-btn type='primary' plain @click='handleSearch'>查询</permission-btn>
        <permission-btn permission='sys:user:add' type='primary' @click='handleAdd'>新增</permission-btn>
      </el-form-item>
    </el-form> -->
    <!--  <table-template
      border
      :loading='tableLoading'
      :data='userList'
      :columns='columns'
      :handleList='handleList'
      @handleResetPwd='handleResetPwd'
      @handleChange='handleChange'
      @handleDelete='handleDelete'
      handlePageFunction='fetchList'
      :page='params'>
      <el-table-column label='操作' >
        <template slot-scope="scope">
          <permission-btn>编辑</permission-btn>
        </template>
      </el-table-column>
    </table-template> -->
    <!-- <el-dialog
      :title="handleType?'编辑':'新增'"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      width="500px"> -->
    <div style="width:400px;">
      <el-form :model="curUser" label-width="120px" :rules="rules" ref="ruleForm">
        <el-form-item label='登录账号' prop="username">
          <el-input v-model='curUser.username' placeholder='请输入登录账号' disabled></el-input>
        </el-form-item>

        <el-form-item label='原密码' prop="password">
          <el-input type='password' v-model='curUser.password' placeholder='请输入原密码'></el-input>
        </el-form-item>

        <el-form-item label='新密码' prop="newPassword">
          <el-input type='password' v-model='curUser.newPassword' placeholder='请输入新密码'></el-input>
        </el-form-item>

        <el-form-item label='确认新密码' prop="confirmPassword">
          <el-input type='password' v-model='curUser.confirmPassword' placeholder='请再次输入新密码'></el-input>
        </el-form-item>
        <!--<el-form-item label='机构'>
          <el-popover
            placement="bottom"
            width="250"
            trigger="manual"
            v-model="deptVisible">
            <el-tree
              :data="deptList"
              :props="defaultProps"
              v-model="deptVisible"
              @node-click="handleNodeClick">
            </el-tree>
            <el-input :value='curUser.deptName' readonly slot="reference" @click.native="deptVisible = !deptVisible"
                      placeholder='请选择机构'></el-input>
          </el-popover>
        </el-form-item>-->
        <!--     <el-form-item label='手机号'>
          <el-input v-model='curUser.phone' placeholder='请输入手机号'></el-input>
        </el-form-item> -->
        <!--   <el-form-item label='角色'>
          <el-select
            v-model="curUser.roleIdList"
            multiple
            default-first-option
            placeholder="请选择角色"
            style='width:100%'>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->
        <!--   <el-form-item label="状态">
          <el-select v-model="curUser.state">
            <el-option
              v-for="item in [{label:'正常',value:0},{label:'禁用',value:1}]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item>

          <el-button @click="handleClose('')">重置</el-button>
          <el-button type="primary" @click="handleSubmit('ruleForm')" :loading='handleLoading'>确 定</el-button>

        </el-form-item>
      </el-form>
    </div>
    <!--  <span slot="footer">

      </span> -->
    <!--   </el-dialog> -->
  </section>
</template>

<script>
  import {fetchList, getObj, updObj, addObj, resetPwd, delObj} from '@/api/sys/info'
  import {roleList} from '@/api/sys/role'
  import {mapState} from 'vuex'

  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (this.curUser.password !== '') {
          if (value === '') {
            callback(new Error('请输入新密码'))
          }
          /*else if (value.length < 6) {
            callback(new Error('密码不能小于6位'))
          } */
          else {
            callback()
          }
        } else {
          callback()
        }
      }

      var validatePass2 = (rule, value, callback) => {
        if (this.curUser.password !== '') {
          if (value === '') {
            callback(new Error('请再次输入密码'))
          } else if (value !== this.curUser.newPassword) {
            callback(new Error('两次输入密码不一致!'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      let validateStringIsIncludeBlank = function (rule, value, callback) {
        if (value == "") {
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
        roleList: [],
        userList: [],
        curUser: {
          username: '',
          password: '',
          newPassword: '',
          confirmPassword: '',
        },
        deptList: [],
        columns: [{
          name: 'ID',
          field: 'id',
          width: 160
        },
          {
            name: '登录账号',
            field: 'username',
          },
          {
            name: '手机',
            field: 'phone',
          },
          {
            name: '状态',
            field: 'state',
            showText: {
              0: {name: '正常', type: 'success'},
              1: {name: '禁用', type: 'danger'},
            },
          },
          {
            name: '创建时间',
            field: 'createTime'
          }
        ],
        handleList: [
          {
            name: '重置密码',
            type: '',
            handleName: 'handleResetPwd',
          },
          {
            name: '编辑',
            type: '',
            handleName: 'handleChange',
          }, {
            name: '删除',
            type: 'danger',
            handleName: 'handleDelete'
          }
        ],
        rules: {
          username: [
            /* {required: true, message: '请输入用户名', trigger: 'blur'},*/
          ],
          password: [
            /*{required: true, message: '请输入密码', trigger: 'blur'},*/
          ],

          newPassword: [
            {validator: validatePass, trigger: 'blur'},
            {min: 6, message: '密码长度必须6位或者6位以上', trigger: 'blur'},
            {validator: validateStringIsIncludeBlank, trigger: 'blur'}
          ],

          confirmPassword: [
            {validator: validatePass2, trigger: 'blur'}
          ],
        },
        params: {
          username: '',
          curPage: 1,
          pageSize: 10,
          totalCount: 100
        }
      }
    },
    components: {},
    created: function () {
      this.curUser.username = this.userInfo.username
      /* this.curUser.password = this.userInfo.password*/
      // this.curUser.phone = this.userInfo.phone
      //this.curUser.id = this.userInfo.id
    },
    methods: {
      fetchList() {
        this.tableLoading = true;
        fetchList(this.params).then(res => {
          this.tableLoading = false;
          this.userList = res.data.list;
          this.params.totalCount = res.data.totalCount;
        })
      },
      getRoleList() {
        roleList().then(res => {
          //console.log('role', res.data)
          this.roleList = res.data;
        })
      },
      handleAdd() {
        this.handleType = 0;
        this.dialogVisible = true;
        for (var key in this.curUser) {
          this.curUser[key] = '';
        }
        this.curUser.state = 0;
      },
      handleResetPwd(row, index) {
        this.$confirm('确定要重置[' + row.username + ']的密码吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resetPwd(row.id).then(() => {
            this.$message({
              type: 'success',
              message: '密码重置成功!'
            });
          });
        }).catch(() => {

        });
      },
      handleChange(row, index) {
        this.handleType = 1;
        this.dialogVisible = true;
        getObj(this.userList[index].id).then(res => {
          this.curUser = res.data;
        });
        // this.curUser.roles = this.curUser.roles.map(el => el.roleId);
      },
      handleDelete(row, index) {
        //this.curUser=Object.assign({},this.userList[index]);
        this.$confirm('确定要删除[' + row.username + ']吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delObj([row.id]).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.fetchList();
          });
        }).catch(() => {

        });
      },
      handleSearch(curPage) {
        this.params.curPage = curPage;
        this.fetchList();
      },
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.handleLoading = true
            this.submitUpdate();
            /*            if (this.handleType) {
              this.submitUpdate();
            } else {
              this.submitAdd();
            }*/
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
      },
      submitAdd() {
        //console.log('新增')
        addObj(this.curUser).then(() => {
          this.$message({
            type: 'success',
            message: '新增成功!'
          });
          this.fetchList();
          this.dialogVisible = false;
          this.handleLoading = false;
        }).catch(() => {
          this.handleLoading = false;
        });
      },
      submitUpdate() {
        updObj(this.curUser).then(() => {
          this.$message({
            type: 'success',
            message: '更新成功!'
          });

          this.$store.dispatch('logout').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          });
          //this.fetchList();
          //this.dialogVisible = false;
          this.handleLoading = false;
        }).catch(() => {
          this.handleLoading = false;
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleNodeClick(data) {
        this.curUser.deptId = data.id;
        this.curUser.deptName = data.name;
      },
      handleClose(done) {
        //this.dialogVisible = false;
        this.resetForm('ruleForm');
        if (done) {
          done();
        }
      }
    },
    computed: {
      ...mapState(['userInfo']),
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
