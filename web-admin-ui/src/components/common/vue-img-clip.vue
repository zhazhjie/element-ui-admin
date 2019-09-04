<template>
  <div class="cropper-modal">
    <div class="title">
      <span>图片剪切</span>
    </div>
    <div class="modal">
      <div class="modal-content clearfix">
        <div class="img-clip-wrap">
          <div class="container-bg">
            <div class="img-container">
              <img id="clip_src_img" @load="srcImgLoaded" :src="img">
              <div class="shadow-box"></div>
              <Select-Box ref="box" :srcSize="imgSize" :ratio="ratio" :img="img" @selectEnd="selectEnd"
                          @selectChange="selectChange"></Select-Box>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <span class="cancel-clip" @click='cancelClip'>取消</span>
      <span class="submit-clip" @click='submitClip'>确定</span>  
    </div>
  </div>
</template>

<script>
  import SelectBox from './SelectBox.vue'
  export default {
    props:{
      img:{
        type:String,
        required:true,
      }
    },
    components: {
      SelectBox
    },
    data () {
      return {
        $srcImg: null,
        $resImg: null,
        $input: null,
        $imgContainer: null,
        $preContainer: null,
        nw: 0,
        nh: 0,
        clipData: null,
        ratio: 10 / 10, // equal to SelectBox's width / height
        imgSize: {w: 0, h: 0},
        containerTop: 0,
        realSize:{
          w:300,
          h:300
        }
      }
    }, 
    mounted () {
      this.$input = this.$el.querySelectorAll('#file_input')[0]
      this.$srcImg = this.$el.querySelectorAll('#clip_src_img')[0]
      this.$resImg = this.$el.querySelectorAll('#clip_res_img')[0]
      this.$imgContainer = this.$el.querySelectorAll('.img-container')[0]
      this.$preContainer = this.$el.querySelectorAll('.pre-container')[0]
      this.$containerBox = this.$el.querySelectorAll('.container-bg')[0]
    },
    methods: {
      cancelClip(){
        this.$emit('cancelClip',false);
        //this.img='./static/logo.png'
      },
      submitClip(){
        this.clip()
        //console.log(this.clipData)
        this.$emit('submitClip',this.clipData);
      },
      selectChange () {
        const rec = this.$refs.box.rec
        if (rec.w > 0 && rec.h > 0) {
          //this.updatePreview()
        }
      },
      selectEnd () {
        const rec = this.$refs.box.rec
        if (rec.w > 0 && rec.h > 0) {
          //this.clip()
        }
      },
      fileChange () {
        const me = this
        const fd = new FileReader()
        fd.onloadend = function () {
          me.img = fd.result
        };
        if (this.$input.files && this.$input.files[0]) {
          fd.readAsDataURL(this.$input.files[0])
        }
      },
      srcImgLoaded () {
        this.nw = this.$srcImg.naturalWidth
        this.nh = this.$srcImg.naturalHeight
        this.clearSelect()
        this.setImgSize()
        //this.updatePreview()
        //this.clip()
      },
      clearSelect () {
        const box = this.$refs.box
        box.clearRec()
        this.clipData = null
      },
      setImgSize () {
        // image's naturalWidth naturalHeight ratio
        const nr = this.nw / this.nh
        const scw = this.$containerBox.offsetWidth
        const sch = this.$containerBox.offsetHeight
        const sr = scw / sch
        let rw = 0  // select box width
        let rh = 0  // select box height
        if (nr >= sr) {
          this.imgSize.w = scw
          this.imgSize.h = scw / nr
          this.containerTop = (sch - this.imgSize.h) / 2
        } else {
          this.imgSize.h = sch
          this.imgSize.w = sch * nr
          this.containerTop = 0
        }
        if (this.nw >= this.nh) {
          rh = this.imgSize.h
          rw = rh * this.ratio
        }else{
          rw = this.imgSize.w
          rh = rw / this.ratio
        }
        this.$srcImg.setAttribute('style', `width:${this.imgSize.w}px;height:${this.imgSize.h}px;`)
        this.$imgContainer.setAttribute('style',
          `width:${this.imgSize.w}px;height:${this.imgSize.h}px;top:${this.containerTop}px;`)
        this.$refs.box.rec = {w: rw, h: rh, l: 0, t: 0}
      },
      getComputedRec (r) {
        const cw = this.$imgContainer.offsetWidth
        const ch = this.$imgContainer.offsetHeight
        const wr = cw / this.nw
        const hr = ch / this.nh
        return {
          l: r.l / wr, t: r.t / hr,
          w: r.w / wr, h: r.h / hr
        }
      },
      clip () {
        let rec = this.$refs.box.rec
        if (!rec.w || !rec.h) {
          return
        }
        const bufferCanvas = document.createElement('canvas')
        const bfx = bufferCanvas.getContext('2d')
        const computedRec = this.getComputedRec(rec)
        bufferCanvas.width = this.realSize.w
        bufferCanvas.height = this.realSize.h
        bfx.fillStyle = "#fff";
        bfx.fillRect(0, 0, bufferCanvas.width, bufferCanvas.height);
        bfx.drawImage(this.$srcImg, computedRec.l, computedRec.t, computedRec.w, computedRec.h,0,0,this.realSize.w, this.realSize.h)
        //bfx.drawImage(this.$srcImg, -computedRec.l, -computedRec.t, this.nw, this.nh)
        this.clipData = bufferCanvas.toDataURL('image/jpeg');
        //console.log(this.nw, this.nh)
      }, 
    }
  }
</script>

<style scoped>
.cropper-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  background-color: #000;
}

.cropper-modal .title{
  height: 40px;
  line-height: 40px;
  background: #fff;
  text-align: center;
}

.cropper-modal .modal {
  width: 100%;
  height: calc(100% - 80px);
  padding: 10px;
  box-sizing: border-box;
}

.modal-head {
  position: relative;
  text-align: center;
  padding: 0 16px 0 40px;
}

.head-wrap {
  position: relative;
  font-size: 14px;
  color: #222;
  height: 50px;
  line-height: 50px;
}

.modal-content {
  width: 100%;
  height: 100%;
}

.img-clip-wrap {
  width: 100%;
  height: 100%;
}

.container-bg {
  width: 100%;
  height: 100%;
  background-color: #000;
}

.img-container {
  position: relative;
  height: 0;
  margin: auto;
}

.img-container img {
  position: relative;
  width: 100%;
  height: 100%;
}

.img-container .shadow-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  z-index: 1;
}

.clearfix:before,
.clearfix:after {
  content: ' ';
  display: table;
}

.clearfix:after {
  clear: both;
}

.modal-footer {
  text-align: center;
  background: white;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}

.modal-footer span {
  float: left;
  width: 50%;
}

.modal-footer .submit-clip {
  background: rgb(55, 173, 255);
  color: white;
}

.modal-footer .submit-clip:active {
  background: #1153AD;
}
.modal-footer .cancel-clip:active {
  background: #ddd;
}
</style>

