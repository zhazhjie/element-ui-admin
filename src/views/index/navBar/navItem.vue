<template>
  <div class="menu-wrapper">
    <template v-for="(item,index) in menu">
      <el-menu-item v-if="!item.children||!item.children.length" v-show='!item.meta.hidden' :index="item.path" @click="open(item)" :key="item.path">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{item.meta.name}}</span>
      </el-menu-item>
      <el-submenu v-else v-show='!item.meta.hidden' :index="item.path" :key="item.path">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.name}}</span>
        </template>
        <template v-for="(child,i) in item.children">
          <el-menu-item :index="child.path" @click="open(child)" v-if="!child.children||!child.children.length" v-show='!child.meta.hidden' :key="i">
            <i :class="child.meta.icon"></i>
            <span slot="title">{{child.meta.name}}</span>
          </el-menu-item>
          <nav-item v-else :menu="[child]" :key="i"></nav-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
export default {
  name: "navItem",
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
    open(item) {
      this.routeAndCache(item);
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
