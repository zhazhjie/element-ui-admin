/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-11-06 17:08:41
* @version: 1.0
*/

<template>
  <el-button
    v-bind='$attrs'
    v-if='hasPermission'
    :type='type'
    @click="handleClick">
    <slot/>
  </el-button>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'permission-btn',
    props: {
      permission: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        //permissions:['sys_user_add','sys_dept_add']
      }
    },
    components: {},
    methods: {
      handleClick() {
        this.$emit('click')
      }
    },
    computed: {
      ...mapState(['permissions']),
      hasPermission() {
        if (!this.permission) {
          return true;
        } else {
          return this.permissions.some(permission => permission === this.permission)
        }
      },
    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>
