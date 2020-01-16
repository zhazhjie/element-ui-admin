<template>
  <section>
    <div :id="tinymceId"></div>
    <upload-img @selectImg='selectImg' :visible.sync='visible'/>
  </section>
</template>

<script>
  import plugins from './plugins'
  import toolbar from './toolbar'
  import UploadImg from "./uploadImg";
  import {upload} from "../../api/base";

  export default {
    name: 'tinymce',
    components: {UploadImg},
    props: {
      value: {
        type: String,
        default: ''
      },
      size: {
        type: Number,
        default: 5
      },
      menubar: {
        default: 'file edit insert view format table'
      },
      height: {
        type: Number,
        required: false,
        default: 360
      }
    },
    data() {
      return {
        OSS_URL: process.env.VUE_APP_REMOTE_URL,
        visible: false,
        tinymceId: 'vue-tinymce-' + +new Date(),
        taskList: []
      }
    },
    watch: {
      value(val) {
        if (this.taskList.length) {
          this.taskList.pop();
          this.$nextTick(() =>
            window.tinymce.get(this.tinymceId).setContent(val || ''));
        }
      }
    },
    mounted() {
      this.initTinymce()
    },
    activated() {
      this.initTinymce()
    },
    deactivated() {
      this.destroyTinymce()
    },
    methods: {
      selectImg(imgList) {
        imgList.forEach(v => {
          this.insertContent(this.getImg(v));
        })
      },
      getImg(url) {
        return `<img class="wscnph" style="max-width: 100%" src="${this.OSS_URL + url}" />`
      },
      checkImg(file) {
        let limitType = /^image\/(jpeg|jpg|png)$/ig.test(file.type);
        let limitSize = file.size / 1024 / 1024 < this.size;
        if (!limitType) {
          this.$message.error('图片只能是 jpg/png 格式!');
          return false;
        }
        if (!limitSize) {
          this.$message.error('图片大小不能超过 5MB!');
          return false;
        }
        return true;
      },
      uploadImg(file) {
        let fd = new FormData();
        fd.set("file", file);
        // compressImg({file,maxWidth:1024});
        upload(fd).then(res => {
          this.insertContent(this.getImg(res.data));
        })
      },
      initTinymce() {
        window.tinymce.init({
          language: 'zh_CN',
          selector: `#${this.tinymceId}`,
          height: this.height,
          body_class: 'panel-body ',
          object_resizing: false,
          toolbar: toolbar,
          menubar: this.menubar,
          plugins: plugins,
          end_container_on_empty_block: true,
          powerpaste_word_import: 'clean',
          code_dialog_height: 450,
          code_dialog_width: 1000,
          advlist_bullet_styles: 'square',
          advlist_number_styles: 'default',
          imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
          default_link_target: '_blank',
          link_title: false,
          init_instance_callback: editor => {
            if (this.value) {
              editor.setContent(this.value);
            } else {
              this.taskList.push(1);
            }
            editor.on('NodeChange Change KeyUp SetContent', () => {
              this.$emit('input', editor.getContent());
            })
          },
          setup: editor => {
            editor.on('paste', (e) => {
              let files = e.clipboardData.files;
              if (files.length) {
                if (!this.checkImg(files[0])) return;
                this.uploadImg(files[0]);
                // editor.insertContent(this.defaultImg(id));
              }
            });
            editor.on('drop', (e) => {
              // console.log(e);
              let files = e.dataTransfer.files;
              if (files.length) {
                if (!this.checkImg(files[0])) return;
                this.uploadImg(files[0]);
                // editor.insertContent(this.defaultImg(id));
              }
            });
            editor.on('dragover', (e) => {
              e.preventDefault();
            });
            // 定义按钮
            editor.addButton('insertimg', {
              // text: 'button',
              icon: 'image',
              tooltip: "插入图片",
              onclick: () => {
                this.visible = true;
              }
            })
          }
        })
      },
      destroyTinymce() {
        if (window.tinymce.get(this.tinymceId)) {
          window.tinymce.get(this.tinymceId).destroy();
        }
      },
      insertContent(value) {
        window.tinymce.get(this.tinymceId).insertContent(value);
      },
      setContent(value) {
        window.tinymce.get(this.tinymceId).setContent(value);
      },
      getContent() {
        window.tinymce.get(this.tinymceId).getContent();
      },
    },
    destroyed() {
      this.destroyTinymce()
    }
  }
</script>

<style>
  .mce-fullscreen {
    z-index: 10000;
  }
</style>
