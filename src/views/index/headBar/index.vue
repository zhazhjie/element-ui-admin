/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-11-05 20:48:31
* @version: 1.0
*/

<template>
  <section class="el-header">
    <div class="right-menu">
      <i class="icon-menu menu-icon" :class='isCollapse?"rotate90":""' @click='commitCollapse'></i>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-if='item.meta.name' :key='index' v-for='(item,index) in breadcrumb'>{{item.meta.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-menu">
      <el-tooltip content="全屏显示" effect="dark" placement="bottom">
        <screenfull class="right-menu-item menu-icon"/>
      </el-tooltip>
      <el-tooltip content="切换尺寸" effect="dark" placement="bottom">
        <size-select class="right-menu-item"/>
      </el-tooltip>
      <el-tooltip content="主题颜色" effect="dark" placement="bottom">
        <theme-picker class="right-menu-item"/>
      </el-tooltip>
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="avatar" v-src:avatar="userInfo.avatar">
          <span>{{userInfo.username}}</span>
          <i class="el-icon-arrow-down"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native='routeTo("/")'>首页</el-dropdown-item>
          <el-dropdown-item @click.native='routeTo("/resetPassword")'>修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="logout" divided>退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </section>
</template>

<script>
  import screenfull from './screenfull'
  import sizeSelect from './sizeSelect'
  import themePicker from './themePicker'
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        breadcrumb: []
      }
    },
    components: {
      screenfull,
      sizeSelect,
      themePicker
    },
    methods: {
      commitCollapse() {
        this.$store.commit('setCollapse')
      },
      logout() {
        this.$store.commit('logout');
      },
      getBreadcrumb() {
        this.breadcrumb = this.$route.matched;
      }
    },
    computed: {
      ...mapState(['userInfo']),
      isCollapse() {
        return this.$store.state.isCollapse
      }
    },
    watch: {
      '$route': 'getBreadcrumb'
    },
    mounted() {
      this.getBreadcrumb();
    }
  }
</script>

<style scoped>
  @import "../../../css/var.css";

  .el-header {
    background-color: #fff;
    color: #000;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border);
  }

  .right-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .right-menu-item {
    margin-right: 20px;
  }

  .el-dropdown-link {
    cursor: pointer;
  }

  .menu-icon {
    font-size: 20px;
    color: #48576a;
    cursor: pointer;
    transition: all 0.2s;
  }

  .rotate90 {
    transform: rotate(90deg);
    transition: all 0.2s
  }

  .el-breadcrumb {
    margin-left: 20px;
  }

  .avatar {
    margin-right: 5px;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    box-sizing: border-box;
    border: 1px solid var(--border);
  }

  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
</style>
