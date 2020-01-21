<template>
  <div class="feedback">
    <el-button
      type="primary"
      size="medium"
      class="feedback-icon"
      circle
      icon="icon-camera"
      @click="buildCanvas">
    </el-button>
    <table-template
      ref="table"
      :data="[]"
      :config="config"
      @submitAdd="handleSubmit">
      <template v-slot:imgDataForm>
        <div class="img-box" v-loading="loading">
          <img ref="img" :src="imgData" v-img-preview>
        </div>
      </template>
    </table-template>
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
        config: {
          searchable: false,
          pageable: false,
          withoutTable: true,
          showAddBtn: false,
          dialogProps: {width: '500px'},
          formProps: {labelWidth: '60px'},
          columns: [
            {
              label: '',
              field: 'imgData',
              formItem: {
                props: {
                  labelWidth: '0px'
                }
              }
            },
            {
              label: '标题',
              field: 'title',
            },
            {
              label: '内容',
              field: 'content',
              formEl: {
                props: {
                  type: 'textarea',
                  rows: 3,
                  showWordLimit: true,
                },
                attrs: {
                  maxlength: 255
                }
              }
            },
          ],
          rules: {
            title: [{required: true, message: '请输入标题', trigger: 'blur'}],
            content: [{required: true, message: '请输入内容', trigger: 'blur'}]
          },
        },
        loading: false,
        imgData: ""
      }
    },
    methods: {
      buildCanvas() {
        this.$refs.table.showAdd("反馈");
        this.loading = true;
        html2canvas(document.getElementById("el-main")).then(canvas => {
          this.imgData = canvas.toDataURL();
          this.loading = false;
        }).catch(() => this.loading = false);
      },
      handleSubmit(row, hideLoading, done) {
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
            row.imgUrl = res.data;
            this.saveFeedback(row, hideLoading, done);
          }).catch(() => hideLoading());
        }).catch(() => hideLoading());
      },
      saveFeedback(row, hideLoading, done) {
        saveFeedback(row).then(res => {
          this.$message.success("提交成功！");
          done();
        }).catch(() => hideLoading())
      },
    },
    mounted() {
    }
  }
</script>

<style scoped>
  @import "../../../css/var.css";

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

  .img-box {
    min-height: 200px;
    margin-bottom: 10px;
    border: 1px solid var(--border);
  }

  .img-box img {
    width: 100%;
  }
</style>
<style>

</style>
