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
      background-color="#545c64"
      text-color="#fff">
      <div class="logo">
        <span class="tit" v-if="!isCollapse">spring-admin</span>
        <img v-else src="../../../img/logo.png">
      </div>
      <el-menu-item index='/homePage' @click='routeTo("/homePage")'>
        <i class="icon-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <sidebar-item :menu="menuList" :isCollapse="isCollapse"></sidebar-item>
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

  }
}
</script>

<style scoped>
@import url('../../../css/var.css');
.el-menu-vertical{
  flex-shrink: 0;
}
.logo{
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  color: #fff;
  font-weight: bold;
}
.logo img{
  width: 30px;
  height: 30px;
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
  /*border-right: 0;*/
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
