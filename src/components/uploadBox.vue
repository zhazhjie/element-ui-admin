<template>
  <el-upload
    ref="upload"
    v-bind="$attrs"
    :action="uploadUrl"
    :headers="headers"
    :before-upload="beforeUpload">
    <slot></slot>
    <slot name="tip" slot="tip"></slot>
  </el-upload>
</template>

<script>
  import {getStore} from "../utils/util";

  export default {
    name: "uploadBox",
    props: {
      size: {
        type: Number,
        default: 5
      }
    },
    data() {
      return {
        uploadUrl: process.env.VUE_APP_REMOTE_URL + process.env.VUE_APP_API_ROOT + "/public/upload",
        headers: {
          token: getStore('token', 'local')
        }
      }
    },
    methods: {
      beforeUpload(file) {
        let limitType = /^image\/(jpeg|jpg|png)$/ig.test(file.type);
        let limitSize = file.size / 1024 / 1024 < this.size;
        if (!limitType) {
          this.$message.error('图片只能是 jpg/png 格式!');
        }
        if (!limitSize) {
          this.$message.error('图片大小不能超过 5MB!');
        }
        return limitType && limitSize;
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
<style>
  .avatar-uploader-icon {
    width: 148px;
    height: 148px;
    border: 1px dashed #c0ccda;
    border-radius: 5px;
    line-height: 146px;
    text-align: center;
    cursor: pointer;
    font-size: 28px;
    color: #8c939d;
    background-color: #fbfdff;
  }
</style>
