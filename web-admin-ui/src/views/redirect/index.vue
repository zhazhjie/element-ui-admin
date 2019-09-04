<script>
export default {
  beforeCreate() {
    const { path, query } = this.$route
    const routePath = path.replace('/redirect', '')
    this.$router.replace({ path: routePath, query })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
