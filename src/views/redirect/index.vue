<script>
  export default {
    beforeCreate() {
      const {path, query} = this.$route;
      const routePath = path.replace('/redirect', '');
      this.routeTo({path: routePath, query}, true)
    },
    // beforeRouteEnter(to, from, next) {
    //   from.meta.keepAlive = false;
    //   next();
    // },
    beforeRouteLeave(to, from, next) {
      to.meta.keepAlive = true;
      next();
    },
    render: function (h) {
      return h() // avoid warning message
    }
  }
</script>
