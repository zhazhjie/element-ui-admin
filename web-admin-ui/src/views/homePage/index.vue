<template>
  <section>
    <p>欢迎回来，{{userInfo.username}}！</p>
  </section>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {

      }
    },
    components: {temp},
    methods: {

    },
    computed: {
      ...mapState(['userInfo']),
    },
    mounted() {

    }
  }
</script>
