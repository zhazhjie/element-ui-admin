<template>
  <el-dropdown @command="handleSetSize">
    <div>
      <i class="icon-font-size size-icon"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="size==='medium'" command="medium">Medium</el-dropdown-item>
      <el-dropdown-item :disabled="size==='small'" command="small">Small</el-dropdown-item>
      <el-dropdown-item :disabled="size==='mini'" command="mini">Mini</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    size() {
      return this.$store.state.size
    }
  },
  methods: {
    handleSetSize(size) {
      this.$ELEMENT.size = size
      this.$store.commit('setSize', size)
      this.refreshView()

      this.$message({
        message: '切换尺寸成功',
        type: 'success'
      })
    },
    refreshView() {
      // In order to make the cached page re-rendered

      const { fullPath } = this.$route
      console.log(fullPath)
      this.$nextTick(() => {
        this.routeTo({
          path: '/redirect' + fullPath,
        },1)
      })
    }
  }

}
</script>

<style scoped>
.icon-font-size{
  font-size: 25px;
  color: #48576a;
  cursor: pointer;
}
</style>

