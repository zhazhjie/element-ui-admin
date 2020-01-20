<template>
  <div class="feedback">
    <el-button type="primary" size="medium" class="feedback-icon" circle icon="icon-camera"
               @click="buildCanvas"></el-button>
    <el-dialog width="500px" :visible.sync="dialogVisible" :before-close="resetForm" title="反馈">
      <div class="img-box" v-loading="loading">
        <img ref="img" :src="imgData" v-img-preview>
      </div>
      <el-form label-width="60px" :rules="rules" :model="params" ref="form">
        <el-form-item label="标题" prop="title">
          <el-input placeholder="请输入标题" v-model="params.title" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input placeholder="请输入内容" type="textarea" v-model="params.content" :rows="3" show-word-limit maxlength="255"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" :loading="handleLoading" @click="handleSubmit">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import html2canvas from 'html2canvas';
  import {saveFeedback, upload} from "../../../api/base";
  import {compressImg} from "../../../utils/util";

  export default {
    name: "feedback",
    data() {
      return {
        dialogVisible: false,
        handleLoading: false,
        loading: false,
        rules: {
          title: [{required: true, message: '请输入标题', trigger: 'blur'}],
          content: [{required: true, message: '请输入内容', trigger: 'blur'}]
        },
        params: {
          title: "",
          content: ""
        },
        imgData:""
      }
    },
    methods: {
      buildCanvas() {
        this.dialogVisible = true;
        this.loading = true;
        html2canvas(document.getElementById("el-main")).then(canvas => {
          this.imgData=canvas.toDataURL();
          this.loading = false;
        }).catch(() => this.loading = false);
      },
      uploadImg() {
        let params = {
          file: this.$refs.img.src,
          maxWidth: 500,
          exportType: "file",
          fileName: (+new Date()) + "_feedback.png"
        };
        compressImg(params).then(data => {
          let fr = new FormData();
          fr.set("file", data);
          upload(fr).then(res => {
            this.params.imgUrl = res.data;
            this.saveFeedback();
          }).catch(() => this.handleLoading = false);
        }).catch(() => this.handleLoading = false);
      },
      saveFeedback() {
        saveFeedback(this.params).then(res => {
          this.$message.success("提交成功！");
          this.handleLoading = false;
          this.dialogVisible = false;
        }).catch(() => this.handleLoading = false)
      },
      handleSubmit() {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            this.handleLoading = true;
            this.uploadImg();
          } else {
            return false;
          }
        });
      },
      resetForm() {
        this.dialogVisible = false;
        this.$refs["form"].resetFields();
      },
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .feedback-icon {
    position: fixed;
    bottom: 10px;
    right: -20px;
    transition: all 0.3s;
  }

  .feedback-icon:hover {
    right: 0;
    transition: all 0.3s;
  }

  .feedback-icon >>> i {
    margin-right: 0;
  }

  .img-box {
    min-height: 200px;
    margin-bottom: 10px;
    border: 1px solid #eee;
  }

  .img-box >>> img {
    width: 100% !important;
    height: auto !important;
  }
</style>
<style>

</style>
