<template>
  <div class="menu-wrapper">
    <template v-for="(item,index) in menu">
      <el-menu-item v-if="item.meta.length==0" v-show='item.meta.hidden==0' :index="item.path" @click="open(item)" :key="item.path">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{item.meta.name}}</span>
      </el-menu-item>
      <el-menu-item v-else-if="item.meta.type==1" v-show='item.meta.hidden==0' :index="item.path" @click="open(item)" :key="item.path">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{item.meta.name}}</span>
      </el-menu-item>
      <el-submenu v-else v-show='item.meta.hidden==0' :index="item.path" :key="item.path">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.name}}</span>
        </template>
        <template v-for="(child,cindex) in item.children">
          <el-menu-item :index="child.path" @click="open(child)" v-if="child.children.length==0" v-show='child.meta.hidden==0 && (child.meta.type == 0 || child.meta.type == 1)' :key="cindex">
            <i :class="child.meta.icon"></i>
            <span slot="title">{{child.meta.name}}</span>
          </el-menu-item>
          <sidebar-item v-else :menu="[child]" :key="cindex" :isCollapse="isCollapse"></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
export default {
  name: "SidebarItem",
  data() {
    return {};
  },
  props: {
    menu: {
      type: Array
    },
    isCollapse: {
      type: Boolean
    }
  },
  created() {

  },
  mounted() {},
  computed: {},
  methods: {
    filterPath(path, index) {
      return path == null ? index + "" : path;
    },
    open(item) {
      this.routeTo(item.path);
    }
  }
};
</script>
<style>
.el-menu--collapse span{
  display: none;
}
.el-menu--collapse .el-submenu__icon-arrow{
  display: none;
}
.el-menu--collapse .el-submenu__title,
.el-menu--collapse .el-menu-item,
.el-menu--collapse .el-tooltip{
  padding: 0 5px !important;
}
</style>
