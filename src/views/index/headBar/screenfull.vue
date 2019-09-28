<template>
  <i class="icon-fullscreen" @click='click'></i>
</template>

<script>
  export default {
    name: 'screen-full',
    props: {
      width: {
        type: Number,
        default: 22
      },
      height: {
        type: Number,
        default: 22
      },
      fill: {
        type: String,
        default: '#48576a'
      }
    },
    data() {
      return {
        isFullscreen: false
      }
    },
    methods: {
      click() {
        if (this.fullscreenEnable()) {
          this.exitFullScreen();
        } else {
          this.reqFullScreen();
        }
      },
      fullscreenEnable() {
        return document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen;
      },
      reqFullScreen() {
        if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        }
      },
      exitFullScreen() {
        if (document.documentElement.requestFullScreen) {
          document.exitFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.mozCancelFullScreen();
        }
      }
    }
  }
</script>

<style scoped>

</style>
