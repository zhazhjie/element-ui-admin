<template>
  <section>
  </section>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
      }
    },
    components: {},
    methods: {

    },
    computed: {
      ...mapState(['permissions', 'userInfo']),
    },
    mounted() {

    }
  }
</script>
