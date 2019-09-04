/**
 * @author: zhazhjie
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-11-05 14:37:23
 * @version: 1.0
 */

<template>
  <el-menu
      :default-active="$route.path"
      class="el-menu-vertical"
      :collapse="isCollapse"
      text-color="rgb(191, 203, 217)"
      background-color="#304156">
      <div class="logo">
        <!-- <img src="@/img/google.svg"> -->
        <span class="tit">{{userInfo.orgTypeName}}运营平台</span>
      </div>
      <el-menu-item index='/homePage' @click='routeTo("/homePage")'>
        <i class="icon-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <sidebar-item :menu="menuList" :isCollapse="isCollapse"></sidebar-item>
      <!--<el-submenu index="/help">-->
        <!--<template slot="title">-->
          <!--<i class="icon-question-circle"></i>-->
          <!--<span slot="title">帮助</span>-->
        <!--</template>-->
        <!--<el-menu-item index="/help/other" @click='routeTo("/help/other")'>说明</el-menu-item>-->
        <!--<el-menu-item index="/help/table" @click='routeTo("/help/table")'>表格</el-menu-item>-->
        <!--<el-menu-item index="/help/iconfont" @click='routeTo("/help/iconfont")'>图标</el-menu-item>-->
        <!--<el-menu-item index="/help/richText" @click='routeTo("/help/richText")'>富本文</el-menu-item>-->

      <!--</el-submenu>-->
    </el-menu>
</template>

<script>
import SidebarItem from "./sidebarItem";
import { mapState } from "vuex";
export default {
  data() {
    return {
    	//isCollapse: false,
    }
  },
  components: {
    SidebarItem
  },
  methods: {

  },
  computed: {
    ...mapState(["menuList","userInfo","isCollapse"]),
  },
  mounted(){
    // this.$store.dispatch('getMenu').then(res=>{
    //   this.routeTo('/',1)
    // })
  }
}
</script>

<style scoped>
@import url('../../../css/var.css');
.logo{
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  border-bottom: 1px solid #263445;
  color: var(--blue);
  font-weight: bold;
}
.logo img{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: middle;
}
.el-menu--collapse .logo .tit{
  display: none;
}
</style>
<style>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 180px;
  overflow-y: auto;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}
.el-menu{
  border-right: 0;
}
.el-menu--collapse {
  width: 36px;
}
.el-menu-vertical i{
  color: inherit !important;
}
.el-menu--collapse i{
  display: inline-block;
  margin: 0 auto !important;
}
</style>
