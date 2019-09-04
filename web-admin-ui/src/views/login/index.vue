/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-06-20 10:46:17
* @version: 1.0
*/

<template>
  <section id="login">
    <header class="header">
      <img class="logo" src="@/img/logo_blue.png" @click="gotoUrl('/')">
      <ul class="top-menu">
        <!--<li class="select">登录官网</li>-->
        <!--<li @click="aboutUs">关于我们</li>-->
      </ul>
    </header>
    <div class="main">
      <!--<vue-particles color="#fdf6ec" class='vue-particles'></vue-particles>-->
      <div class="login-box-wrap">
        <div class="pic1">
          <img src="@/img/login_pic1.png">
        </div>
        <transition name='fade-left'>
          <div class="login-box" v-show='showLoginBox'>
            <div class="login-tit font20">运营平台</div>
            <div class="login-info">
              <el-input size='medium' v-model="info.username" placeholder="请输入用户名">
                <i slot="prefix" class="icon el-input__icon icon-geren"></i>
              </el-input>
              <el-input size='medium' type="password" auto-complete="new-password" v-model="info.password" placeholder="请输入密码">
                <i slot="prefix" class="icon el-input__icon icon-mimasuo"></i>
              </el-input>
              <el-checkbox v-model="keepPassword">记住密码</el-checkbox>
              <el-button size='medium' type='primary' @click="login">登录</el-button>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <footer class="footer">
      <ul class="menu-list gray">
        <li @click="gotoUrl('/aboutUs')">关于我们</li>
        <li @click="gotoUrl('/aboutUs')">联系我们</li>
        <li @click="gotoUrl('/aboutUs')">联系客服</li>
        <li >免责声明</li>
        <!--<li @click="routeTo('/disclaimer')">免责声明</li>-->
        <li >隐私政策</li>
        <!--
                  <li @click="routeTo('/privacy')">隐私政策</li>
        -->
        <li @click="gotoUrl('/businessLicense')">营业执照</li>
      </ul>
    </footer>
  </section>
</template>

<script>

  import {mapState} from 'vuex'
  import {login} from '@/api/login'
  import {getStore,setStore} from '@/js/util'
  export default {
    data() {
      let info=getStore('info','local')||{};
      return {
        MCH_MALL:process.env.MCH_MALL,
        loading:false,
        showLoginBox:false,
        keepPassword:info.username?true:false,
        info:{
          username:info.username||'',
          password:info.password||'',
        }
      }
    },
    components: {

    },
    created(){

    },
    methods: {
      gotoUrl(path){
        window.location.href=this.MCH_MALL+path
      },
      login(){
        this.loading=true;
        login(this.info).then(res=>{
          this.$message({
            message:'登陆成功！',
            type:'success'
          })
          setStore('token',res.data,'local');
          // this.$store.dispatch('getUserInfo');
          if(this.keepPassword){
            setStore('info',this.info,'local');
          }else{
            setStore('info',null,'local');
          }
          this.routeTo('/',1);
          this.loading=false;
        })
          .catch(err=>this.loading=false)
      },
      handleLogin(){
        if(!this.info.username){
          return this.$message({
            message: '请输入用户名',
            type: 'warning'
          });
        }
        if(!this.info.password){
          return this.$message({
            message: '请输入密码',
            type: 'warning'
          });
        }
        this.login();
      },
      enterCallback(e){
        if(e.keyCode==13){
          this.handleLogin();
        }
      }
    },
    computed: {
      ...mapState(['paramInfo'])
    },
    mounted(){
      // this.getBg();
      this.showLoginBox=true;
      addEventListener('keyup', this.enterCallback)
    },
    beforeDestroy(){
      removeEventListener('keyup', this.enterCallback)
    }
  }
</script>

<style scoped>
  @import url('../../css/var.css');
  #login{
    width: 100vw;
    min-width: 12rem;
    height: 100vh;
    background: #fff;
  }
  .header{
    width: 12rem;
    height: 1rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.2rem;
  }
  .logo{
    cursor: pointer;
    width: 1.5rem;
  }
  .top-menu{
    display: flex;
  }
  .top-menu li{
    padding: 0.1rem;
    cursor: pointer;
  }
  .top-menu li.select{
    border-bottom: 2px solid var(--red);
  }
  .top-menu li:hover{
    color: var(--red);
  }
  .main{
    background-image: url("../../img/login_bg.png");
    height: 5rem;
    position: relative;
  }
  .login-box-wrap{
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    display: flex;
    width: 12rem;
    padding: 0.2rem;
    justify-content: space-between;
    align-items: center;
  }
  .login-box{
    border-radius: 0.1rem;
    width: 4rem;
    /*height: 3.5rem;*/
    overflow: hidden;
  }
  .login-tit{
    height: 0.6rem;
    line-height: 0.6rem;
    text-indent: 0.2rem;
    background: rgba(24,121,202,0.5);
    color: #fff;
  }
  .login-info{
    background: #fff;
    padding: 0.3rem 0.2rem;
  }
  .login-box .el-input{
    margin: 0.15rem 0;
  }
  .login-box .el-button{
    width: 100%;
    margin: 0.2rem 0;
  }
  .login-box .icon{
    width:100%;
    font-size: 0.16rem;
    margin-left: 0.05rem;
  }
  .menu-list{
    display: flex;
    padding: 0.2rem;
    justify-content: center;
  }
  .menu-list li{
    padding: 0 0.1rem;
    cursor: pointer;
  }
  .menu-list li:hover{
    color: red;
  }
  .menu-list li:nth-child(n+2){
    border-left: 1px solid var(--gray);
  }
  .pic1{
    text-align: center;
  }
  .pic1 img{
    width: 4.5rem;
    margin-left: 1rem;
  }
  .contact{
    text-align: right;
    padding: 0.2rem;
  }
  .main .vue-particles{
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    height: 100%;
    z-index: 2;
  }
  .fade-left-leave-active,
  .fade-left-enter-active {
    transition: all 0.7s;
  }
  .fade-left-enter,
  .fade-left-leave-to {
    opacity: 0;
    transform: translateX(50%);
  }
</style>
