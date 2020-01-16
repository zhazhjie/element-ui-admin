<template>
  <el-dialog :visible="visible" @update:visible="handleVisible" title="上传图片">
    <upload-box
      ref="uploadBox"
      list-type="picture-card"
      :on-remove="handleRemove"
      :on-success="e=>fileList.push(e.data)"
    >
      <i class="el-icon-plus"></i>
    </upload-box>
    <span slot="footer">
      <el-button @click="handleVisible(false)">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import UploadBox from "../uploadBox";

  export default {
    name: "uploadImg",
    components: {UploadBox},
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        fileList: []
      }
    },
    methods: {
      handleRemove(file, fileList) {
        let index = this.fileList.indexOf(file.response.data);
        this.fileList.splice(index, 1);
      },
      handleVisible(val) {
        this.$emit("update:visible", val);
      },
      handleSubmit() {
        this.handleVisible(false);
        this.$emit("selectImg", this.fileList);
        this.$refs.uploadBox.$refs.upload.clearFiles();
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
