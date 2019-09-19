/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-06-20 10:46:17
* @version: 1.0
*/

<template>
  <section id="login">
    <!--<vue-particles color="#fdf6ec" class='vue-particles'></vue-particles>-->
    <transition name='fade-left'>
      <div class="login-box" v-show='showLoginBox'>
        <div class="login-tit font20">登录</div>
        <div class="login-info">
          <el-input size='medium' v-model="info.username" placeholder="请输入用户名">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
          <el-input size='medium' type="password" auto-complete="new-password" v-model="info.password"
                    placeholder="请输入密码">
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
          <el-checkbox v-model="keepPassword">记住密码</el-checkbox>
          <el-button size='medium' type='primary' @click="login">登录</el-button>
        </div>
      </div>
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
        info: {
          username: info.username || '',
          password: info.password || '',
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
          this.routeTo('/', 1);
          this.loading = false;
        })
          .catch(err => this.loading = false)
      },
      handleLogin() {
        if (!this.info.username) {
          return this.$message({
            message: '请输入用户名',
            type: 'warning'
          });
        }
        if (!this.info.password) {
          return this.$message({
            message: '请输入密码',
            type: 'warning'
          });
        }
        this.login();
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
    min-width: 12rem;
    height: 100vh;
    background-color: var(--bg);
  }

  .login-box {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-20%, -50%);
    border-radius: 0.1rem;
    width: 4rem;
    /*height: 3.5rem;*/
    overflow: hidden;
    box-shadow: 0.05rem 0.05rem 0.15rem 0.02rem var(--shadow);
  }

  .login-tit {
    height: 0.6rem;
    line-height: 0.6rem;
    text-indent: 0.2rem;
    /*color: #fff;*/
    border-bottom: 1px solid var(--border);
    background: #fff;
  }

  .login-info {
    background: #fff;
    padding: 0.3rem 0.2rem;
  }

  .login-box .el-input {
    margin: 0.15rem 0;
  }

  .login-box .el-button {
    width: 100%;
    margin: 0.2rem 0;
  }

  .login-box .icon {
    width: 100%;
    font-size: 0.16rem;
    margin-left: 0.05rem;
  }

  .fade-left-leave-active,
  .fade-left-enter-active {
    transition: all 0.7s;
  }

  .fade-left-enter,
  .fade-left-leave-to {
    opacity: 0;
    transform: translate(50%, -50%);
  }
</style>
