<template>
  <section>
    <div class="tinymce-container editor-container" :class="{fullscreen:fullscreen}">
      <textarea class="tinymce-textarea" :id="tinymceId"></textarea>
    </div>
    <material-library @selectImg='selectImg' :visible.sync='visible'/>
  </section>
</template>

<script>
  import plugins from './plugins'
  import toolbar from './toolbar'
  import materialLibrary from '@/components/materialLibrary'

  export default {
    name: 'tinymce',
    components: {materialLibrary},
    props: {
      id: {
        type: String
      },
      value: {
        type: String,
        default: ''
      },
      toolbar: {
        type: Array,
        required: false,
        default() {
          return []
        }
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
        OSS_URL: process.env.OSS_URL,
        visible: false,
        hasChange: false,
        hasInit: false,
        tinymceId: this.id || 'vue-tinymce-' + +new Date(),
        fullscreen: false
      }
    },
    watch: {
      value(val) {
        if (!this.hasChange && this.hasInit) {
          this.$nextTick(() =>
            window.tinymce.get(this.tinymceId).setContent(val || ''))
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
      selectImg(objUrl) {
        objUrl.forEach(v => {
          window.tinymce.get(this.tinymceId).insertContent(`<img class="wscnph" src="${this.OSS_URL + v}" />`)
        })
      },
      initTinymce() {
        window.tinymce.init({
          language: 'zh_CN',
          selector: `#${this.tinymceId}`,
          height: this.height,
          body_class: 'panel-body ',
          object_resizing: false,
          toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
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
              editor.setContent(this.value)
            }
            this.hasInit = true;
            editor.on('NodeChange Change KeyUp SetContent', () => {
              this.hasChange = true;
              this.$emit('input', editor.getContent())
            })
          },
          setup: editor => {
            editor.on('FullscreenStateChanged', (e) => {
              this.fullscreen = e.state
            });
            // 定义按钮，
            editor.addButton('selectimg', {
              // text: 'button',
              icon: 'image',
              tooltip: "选择图片",
              onclick: () => {
                this.visible = true;
              }
            })
          }
        })
      },
      destroyTinymce() {
        if (window.tinymce.get(this.tinymceId)) {
          window.tinymce.get(this.tinymceId).destroy()
        }
      },
      setContent(value) {
        window.tinymce.get(this.tinymceId).setContent(value)
      },
      getContent() {
        window.tinymce.get(this.tinymceId).getContent()
      },
    },
    destroyed() {
      this.destroyTinymce()
    }
  }
</script>

<style scoped>
  .tinymce-container {
    position: relative;
  }

  .tinymce-container >>> .mce-fullscreen {
    z-index: 10000;
  }

  .tinymce-textarea {
    visibility: hidden;
    z-index: -1;
  }

  .editor-custom-btn-container {
    position: absolute;
    right: 4px;
    top: 4px;
    /*z-index: 2005;*/
  }

  .fullscreen .editor-custom-btn-container {
    z-index: 10000;
    position: fixed;
  }

  .editor-upload-btn {
    display: inline-block;
  }
</style>
