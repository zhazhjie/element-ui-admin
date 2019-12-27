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
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="handleSubmit('ruleForm')" :loading='handleLoading'>确 定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
  import {updatePassword} from '../../api/sys/user'
  import {mapState} from 'vuex'

  export default {
    data() {
      let validatePass = (rule, value, callback) => {
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
      };
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
        handleLoading: false,
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
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
          newPassword: [
            {required: true, trigger: 'blur'},
            {min: 6, message: '密码长度必须6位及以上', trigger: 'blur'},
            {validator: validateStringIsIncludeBlank, trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
        },
      }
    },
    components: {},
    created: function () {
      this.curUser.username = this.userInfo.username
    },
    methods: {
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
        updatePassword(this.curUser).then(() => {
          this.$message({
            type: 'success',
            message: '更新成功!'
          });
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
