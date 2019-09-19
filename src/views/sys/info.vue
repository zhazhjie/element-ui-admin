/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-11-05 15:33:58
* @version: 1.0
*/

<template>
  <section>
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

        <el-form-item>

          <el-button @click="handleClose('')">重置</el-button>
          <el-button type="primary" @click="handleSubmit('ruleForm')" :loading='handleLoading'>确 定</el-button>

        </el-form-item>
      </el-form>
    </div>
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
      }
    },
    components: {},
    created: function () {
      this.curUser.username = this.userInfo.username
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
      handleResetPwd(row, index) {
        this.confirm('确定要重置[' + row.username + ']的密码吗?', '提示').then(() => {
          resetPwd(row.id).then(() => {
            this.$message({
              type: 'success',
              message: '密码重置成功!'
            });
          });
        });
      },
      handleSearch(curPage) {
        this.params.curPage = curPage;
        this.fetchList();
      },
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.handleLoading = true;
            this.submitUpdate();
          } else {
            return false;
          }
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
