/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-06-20 10:46:17
* @version: 1.0
*/

<template>
  <section id="login">
    <!--<vue-particles color="#fdf6ec" class='vue-particles'></vue-particles>-->
    <transition name='fade-down'>
      <el-form class="login-box" v-show='showLoginBox' :model="info" :rules="rules" ref="form">
        <div class="login-tit font20">后台管理</div>
        <el-form-item prop="username">
          <el-input size='medium' v-model="info.username" placeholder="请输入用户名">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size='medium' type="password" auto-complete="new-password" v-model="info.password"
                    placeholder="请输入密码">
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-checkbox v-model="keepPassword">记住密码</el-checkbox>
        <el-button size='medium' type='primary' @click="handleLogin">登录</el-button>
      </el-form>
    </transition>
  </section>
</template>

<script>

  import {mapState} from 'vuex'
  import {login} from '../../api/sys/user'
  import {getStore, setStore} from '../../utils/util'

  export default {
    data() {
      let info = getStore('info', 'local') || {};
      return {
        loading: false,
        showLoginBox: false,
        keepPassword: !!info.username,
        redirectUrl: this.$route.query.redirectUrl || '/',
        info: {
          username: info.username || 'guest',
          password: info.password || '123456',
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 50, message: '长度在 6 到 50 个字符', trigger: 'blur'}
          ],
        }
      }
    },
    components: {},
    created() {

    },
    methods: {
      login() {
        this.loading = true;
        login(this.info).then(res => {
          this.$message({
            message: '登陆成功！',
            type: 'success'
          });
          setStore('token', res.data, 'local');
          // this.$store.dispatch('getUserInfo');
          if (this.keepPassword) {
            setStore('info', this.info, 'local');
          } else {
            setStore('info', null, 'local');
          }
          this.routeTo(this.redirectUrl, 1);
          this.loading = false;
        })
          .catch(err => this.loading = false)
      },
      handleLogin() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.login();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      enterCallback(e) {
        if (e.keyCode === 13) {
          this.handleLogin();
        }
      }
    },
    computed: {
      ...mapState(['paramInfo'])
    },
    mounted() {
      // this.getBg();
      this.showLoginBox = true;
      addEventListener('keyup', this.enterCallback)
    },
    beforeDestroy() {
      removeEventListener('keyup', this.enterCallback)
    }
  }
</script>

<style scoped>
  @import url('../../css/var.css');

  #login {
    width: 100vw;
    height: 100vh;
    background-color: var(--bg);
  }

  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    width: 400px;
    overflow: hidden;
    box-shadow: 5px 5px 15px 2px var(--shadow);
    padding: 20px 30px;
    background: #fff;
  }

  .login-tit {
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .login-box .el-form-item {
    margin-top: 30px;
  }

  .login-box .el-button {
    width: 100%;
    margin: 20px 0;
  }

  .login-box .icon {
    width: 100%;
    font-size: 16px;
    margin-left: 5px;
  }

  .fade-down-leave-active,
  .fade-down-enter-active {
    transition: all 0.5s;
  }

  .fade-down-enter,
  .fade-down-leave-to {
    opacity: 0;
    transform: translate(-70%, -50%);
  }
</style>
