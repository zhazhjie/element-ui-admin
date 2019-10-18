<template>
  <div class="cache-menu-bar" v-if="cacheMenuList.length">
    <el-tabs v-model="curPath" closable @tab-remove="removeMenu" @tab-click="changeMenu">
      <el-tab-pane
        v-for="item in cacheMenuList"
        :key="item.path"
        :label="item.meta.name"
        :name="item.path">
      </el-tab-pane>
    </el-tabs>
    <div class="opt-box">
      <el-button type="success" circle icon="el-icon-refresh" @click="refresh"></el-button>
      <el-button type="danger" circle icon="el-icon-delete" @click="closeAll"></el-button>
    </div>

  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: "cache-menu-bar",
    data() {
      return {
        editableTabsValue:"",
        curPath: this.$route.path
      }
    },
    computed: {
      ...mapState(["cacheMenuList"])
    },
    watch: {
      "$route": function () {
        this.curPath = this.$route.path;
      }
    },
    methods: {
      changeMenu(tab){
        this.routeTo(tab.name);
      },
      removeMenu(path) {
        let menu=this.cacheMenuList.find(v=>v.path===path);
        this.$store.commit("removeCacheMenu", menu);
        if(this.curPath!==menu.path) return;
        if (!this.cacheMenuList.length) {
          this.routeTo("/");
        } else {
          this.routeTo(this.cacheMenuList[0]);
        }
      },
      refresh() {
        let fullPath = this.$route.fullPath;
        this.routeTo("/redirect" + fullPath, true);
      },
      closeAll(){
        this.$store.commit("removeAllCacheMenu");
        this.routeTo("/");
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  @import "../../../css/var.css";
  .cache-menu-bar {
    background: #fff;
    padding: 0 100px 0 20px;
    position: relative;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.1);
  }
  .opt-box{
    position: absolute;
    @apply --middle;
    right: 20px;
  }
</style>
<style>
  .cache-menu-bar .el-tabs__header {
    margin: 0;
  }
  .cache-menu-bar .el-tabs__item {
    height: 35px;
    line-height: 35px;
  }
  .cache-menu-bar .el-tabs {
    position: relative;
    /*bottom: -1px;*/
  }
  .cache-menu-bar .el-tabs__nav-wrap::after {
    height: 0;
  }
</style>
