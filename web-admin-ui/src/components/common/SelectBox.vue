<template>
  <div class="crop-wrap" @touchstart="wrapTouchDown">
    <div class="shadow-box" :style="recStyle">
      <img :src="img" class="shadow-img" :style="imgStyle">
    </div>
    <div class="crop-box" @touchstart="boxTouchDown" :class="showBox ? 'show': ''" :style="recStyle">
      <span class="drag-point point-lt" @touchstart="pointTouchDown('drag-lt', $event)"><span></span></span>
      <span class="drag-point point-lb" @touchstart="pointTouchDown('drag-lb', $event)"><span></span></span>
      <span class="drag-point point-rt" @touchstart="pointTouchDown('drag-rt', $event)"><span></span></span>
      <span class="drag-point point-rb" @touchstart="pointTouchDown('drag-rb', $event)"><span></span></span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      ratio: {},
      img: {},
      srcSize: {}
    },
    data () {
      return {
        rec: {
          w: 0, h: 0, l: 0, t: 0
        },
        pl: 0,
        pt: 0,
        action: '',
        actionPoint: {x: 0, y: 0},
        referPoint: {x: 0, y: 0},
        $rec: null
      }
    },
    computed: {
      showBox () {
        return this.rec.w && this.rec.h
      },
      imgStyle () {
        return `width:${this.srcSize.w}px;height:${this.srcSize.h}px;top:${-this.rec.t}px;left:${-this.rec.l}px;`
      },
      recStyle () {
        return `width:${this.rec.w}px;height:${this.rec.h}px;left:${this.rec.l}px;top:${this.rec.t}px;`
      }
    },
    mounted () {
      window.addEventListener('touchend', this.disableDrag)
      window.addEventListener('touchmove', this.updateRec)
    },
    beforeDestroy () {
      window.removeEventListener('touchend', this.disableDrag)
      window.removeEventListener('touchmove', this.updateRec)
    },
    methods: {
      getLeft (el) {
        let left = el.offsetLeft
        let parent = el.offsetParent

        while (parent) {
          left += parent.offsetLeft
          parent = parent.offsetParent
        }
        return left
      },
      getTop (el) {
        let top = el.offsetTop
        let parent = el.offsetParent

        while (parent) {
          top += parent.offsetTop
          parent = parent.offsetParent
        }
        return top
      },
      initAction (name, x, y) {
        this.action = name
        this.pl = this.getLeft(this.$el)
        this.pt = this.getTop(this.$el)
        this.actionPoint = {x, y}
        this.referPoint = {x: this.rec.l, y: this.rec.t}

        if (name === 'drag-lt') {
          this.referPoint = {x: this.rec.l + this.rec.w, y: this.rec.t + this.rec.h}
        } else if (name === 'drag-lb') {
          this.referPoint = {x: this.rec.l + this.rec.w, y: this.rec.t}
        } else if (name === 'drag-rt') {
          this.referPoint = {x: this.rec.l, y: this.rec.t + this.rec.h}
        } else if (name === 'drag-rb') {
          this.referPoint = {x: this.rec.l, y: this.rec.t}
        }
      },
      pointTouchDown (name, e) {
        this.initAction(name, e.touches[0].pageX, e.touches[0].pageY)
        e.stopPropagation()
      },
      boxTouchDown (e) {
        this.initAction('move', e.touches[0].pageX, e.touches[0].pageY)
        e.stopPropagation()
      },
      wrapTouchDown (e) {
        if (this.rec.w && this.rec.h) {
          return
        }
        this.initAction('cross', e.touches[0].pageX, e.touches[0].pageY)
        this.rec = {
          w: 0,
          h: 0,
          l: e.touches[0].pageX - this.pl,
          t: e.touches[0].pageY - this.pt
        }
        e.stopPropagation()
      },
      disableDrag () {
        if (this.action) {
          this.action = ''
          this.$emit('selectEnd')
        }
      },
      clearRec () {
        this.action = ''
        this.rec = {w: 0, h: 0, l: 0, t: 0}
      },
      updateRec (e) {
        //console.log(e)
        if (!this.action) {
          return
        }

        const elWidth = this.$el.offsetWidth
        const elHeight = this.$el.offsetHeight
        const dx = e.changedTouches[0].pageX - this.actionPoint.x
        const dy = e.changedTouches[0].pageY - this.actionPoint.y
        const x = e.changedTouches[0].pageX
        const y = e.changedTouches[0].pageY
        let w = 0
        let h = 0
        let t = 0
        let l = 0

        if (dx === 0 && dy === 0) {
          return
        }

        if (this.action === 'move') {
          t = dy + this.referPoint.y
          l = dx + this.referPoint.x

          if (t <= 0) {
            t = 0
          } else if (t + this.rec.h >= elHeight) {
            t = elHeight - this.rec.h
          }

          if (l <= 0) {
            l = 0
          } else if (l + this.rec.w >= elWidth) {
            l = elWidth - this.rec.w
          }

          this.rec.l = l
          this.rec.t = t
        } else if (this.action === 'cross') {
          if (dx > 0 && dy > 0) {
            w = dx + this.rec.l >= elWidth ? elWidth - this.rec.l : dx
            h = w / this.ratio

            if (h + this.rec.t > elHeight) {
              h = elHeight - this.rec.t
              w = h * this.ratio
            }
            this.rec.w = w
            this.rec.h = h
          } else if (dx > 0 && dy < 0) {
            w = dx + this.referPoint.x >= elWidth ? elWidth - this.referPoint.x : dx
            h = w / this.ratio

            if (h >= this.referPoint.y) {
              h = this.referPoint.y
              w = h * this.ratio
            }

            this.rec.t = this.referPoint.y - h
            this.rec.w = w
            this.rec.h = h
          } else if (dx < 0 && dy < 0) {
            w = dx + this.referPoint.x <= 0 ? this.referPoint.x : -dx
            h = w / this.ratio

            if (h >= this.referPoint.y) {
              h = this.referPoint.y
              w = h * this.ratio
            }

            this.rec.t = this.referPoint.y - h
            this.rec.l = this.referPoint.x - w
            this.rec.w = w
            this.rec.h = h
          } else if (dx < 0 && dy > 0) {
            w = dx + this.referPoint.x <= 0 ? this.referPoint.x : -dx
            h = w / this.ratio

            if (h + this.referPoint.y >= elHeight) {
              h = elHeight - this.referPoint.y
              w = h * this.ratio
            }

            this.rec.l = this.referPoint.x - w
            this.rec.w = w
            this.rec.h = h
          }
        } else if (this.action === 'drag-lt' || this.action === 'drag-rt'
          || this.action === 'drag-lb' || this.action === 'drag-rb') {
          w = x - (this.referPoint.x + this.pl)
          h = y - (this.referPoint.y + this.pt)
          if (w < 0 && h < 0) {
            w = w * -1 >= this.referPoint.x ? this.referPoint.x : w * -1
            h = w / this.ratio

            if (h >= this.referPoint.y) {
              h = this.referPoint.y
              w = h * this.ratio
            }
            this.rec.l = this.referPoint.x - w
            this.rec.t = this.referPoint.y - h
          } else if (w < 0 && h > 0) {
            w = w * -1 >= this.referPoint.x ? this.referPoint.x : w * -1
            h = w / this.ratio

            if (h >= elHeight - this.referPoint.y) {
              h = elHeight - this.referPoint.y
              w = h * this.ratio
            }
            this.rec.l = this.referPoint.x - w
            this.rec.t = this.referPoint.y
          } else if (w > 0 && h < 0) {
            w = w >= elWidth - this.referPoint.x ? elWidth - this.referPoint.x : w
            h = w / this.ratio

            if (h >= this.referPoint.y) {
              h = this.referPoint.y
              w = h * this.ratio
            }
            this.rec.l = this.referPoint.x
            this.rec.t = this.referPoint.y - h
          } else if (w > 0 && h > 0) {
            w = w >= elWidth - this.referPoint.x ? elWidth - this.referPoint.x : w
            h = w / this.ratio

            if (h >= elHeight - this.referPoint.y) {
              h = elHeight - this.referPoint.y
              w = h * this.ratio
            }
            this.rec.l = this.referPoint.x
            this.rec.t = this.referPoint.y
          }

          this.rec.w = w
          this.rec.h = h
        }
        this.$emit('selectChange')
      }
    },
  }
</script>

<style scoped>
  .crop-wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    cursor: crosshair;
  }

  .crop-box {
    position: absolute;
    display: none;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    cursor: move;
    border: 1px solid #fff;
    z-index: 2;
    box-sizing: border-box;
  }

  .crop-box.show {
    display: block;
  }

  .drag-point {
    display: inline-block;
    position: absolute;
  }

  .drag-point span{
    display: inline-block;
    width: 10px;
    height: 10px;
    border: 1px solid #fff;
    box-sizing: border-box;
    margin: 10px;
  }

  .point-lt {
    top: -20px;
    left: -20px;
    cursor: nw-resize;
  }

  .point-lb {
    left: -20px;
    bottom: -24px;
    cursor: sw-resize;
  }

  .point-rt {
    right: -20px;
    top: -20px;
    cursor: ne-resize;
  }

  .point-rb {
    right: -20px;
    bottom: -24px;
    cursor: se-resize;
  }

  .shadow-box {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: 1;
  }

  .shadow-img {
    position: absolute;
    top: 0;
    left: 0;
  }

  .shadow-box::selection, .shadow-img::selection {
    background-color: transparent;
  }
</style>
