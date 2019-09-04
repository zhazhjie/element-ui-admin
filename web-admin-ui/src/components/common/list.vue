/** 
 * @author: zhazhjie 
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-04-20 11:14:13 
 * @version: 1.0 
 */

<template>
  <div class="list" @touchstart='start' @touchmove='move' @touchend='end'>
    <div class="scroll-box" ref='list' @scroll='scroll'>
      <div class="body-box" ref='body'>
        <transition name='fade'>
          <div class="success-text" v-show='successFlag'>刷新成功</div>
        </transition>
        <div class="pull-down" ref='pullDown' :class='zoomIn?"zoom-in":""'>
          <!-- <div class="spinner"> -->
            <svg viewBox="25 25 50 50" class="circular" ref='clipper'>
              <circle ref='circle' cx="50" cy="50" r="20" fill="none" class="path" style='stroke-dasharray:1,200;'></circle>
            </svg>
          <!-- </div> -->
        </div>
        <slot name='title'/>
        <not-data v-if='!dataLength'>{{notDataText}}</not-data>
        <slot name='body'/>
        <div class="load-more">
          <loading v-show='!isRefresh&&loading&&dataLength' />
          <div class="load-end" v-if='eof&&dataLength'>--END--</div>
        </div>
        <slot name='footer'/>
      </div>
    </div>
    <transition name='fade'>
      <div class="btn to-top" @click='toTop' v-show='toTopFlag'></div>
    </transition>
    <transition name='fade'>
      <loading class='loading' v-show='loading&&!isRefresh&&!dataLength'/>
    </transition>
  </div> 
</template>

<script>
import loading from './loading'
// require('../js/iscroll.js');
export default {
  name:'el-list',
  props:{
    loading:{
      type:Boolean,
      default:false,
      required:true
    },
    eof:{
      type:Boolean,
      default:false
    },
    unPullUp:{
      type:Boolean,
      default:false
    },
    dataLength:{
      type:Number,
      default:0
    },
    notDataText:{
      type:String,
      default:'-暂无数据-'
    },
  },
  data() {
    return {
      y:0,
      toTopFlag:false,
      //fullLoading:true,
      isRefresh:false,
      zoomIn:false,
      successFlag:false,
      topId:null
    }
  },
  components: {
    loading
  },
  methods: {
    start(e){
      this.y=e.touches[0].pageY;
    },
    move(e){
      //e.preventDefault();
      if(this.loading){
        return;
      }
      var list=this.$refs.list;
      var ST = list.scrollTop;
      var pd=this.$refs.pullDown;
      var circle=this.$refs.circle;
      var h=e.changedTouches[0].pageY;
      switch (true) {
        case ST>0&&ST<100&&h>this.y:
          this.y=e.changedTouches[0].pageY;
          break;
        case ST==0&&h>this.y:
          e.preventDefault();
          this.zoomIn=false;
          var h=e.changedTouches[0].pageY;
          var H=h-this.y;
          pd.style.top=H-H/2 + 'px'; 
          var sd=+circle.style.strokeDasharray.split(',')[0];
          if(H>50&&H<140){
            circle.style.strokeDasharray=H-50+', 200'; 
          }else if(H>=140){
            circle.style.strokeDasharray='90, 200'; 
            this.$refs.clipper.style.transform='rotateZ('+ (H-140) + 'deg)'; 
          }
          break;
      }
    },
    end(e){
      var pd=this.$refs.pullDown;
      var top=+pd.style.top.replace(/[^0-9\-\.]/ig,'');
      switch (true) {
        case top<=0:
          return;
        case top>=60:
          if(this.loading)
            return;
          this.isRefresh=true;
          this.$emit('refresh',true);
          setTimeout(this.moveBack,0,60)
          break;
        default:
          this.moveBack();
          break;
      }
    },
    throttle(callback) {
      clearTimeout(callback.id);
      callback.id = setTimeout(() => {
        callback();
      }, 50)
    },
    scrollHandle(){
      var list=this.$refs.list;
      var ST = list.scrollTop;
      if(ST>300){
        this.toTopFlag=true;
        clearTimeout(this.topId);
        this.topId=setTimeout(()=>{
          this.toTopFlag=false;
        },3000)
      }else{
        this.toTopFlag=false;
      }
      if(this.eof||this.loading){
        return;
      }
      var OH = list.offsetHeight;
      var SH = list.scrollHeight;
      if(SH - ST < OH + 20){
        this.$emit('loadMore',true);
      }
    },
    circle(){
      var clipper=this.$refs.clipper;
      // var circle=this.$refs.circle;
      var rotate=clipper.style.transform.replace(/[^0-9\-\.]/ig,'');
      clipper.style.transform='rotateZ('+ (rotate - 5) + 'deg)';
      // circle.style.transform='rotateZ('+ (rotate - 10) + 'deg)';
      if(!this.loading){
        this.zoomIn=true;
        return;
      }
      requestAnimationFrame(()=>this.circle());
    },
    moveBack(h){
      var pd=this.$refs.pullDown;
      var clipper=this.$refs.clipper;
      var circle=this.$refs.circle;
      var top=pd.style.top.replace(/[^0-9\-\.]/ig,'');
      if(top-10<=(h||0)){
        pd.style.top= (h||0) + 'px'; 
        if(h){
          return this.circle();
        }else{
          clipper.style.transform='rotateZ(0deg)';
          circle.style.strokeDasharray='1,200';
          return;
        }
      } 
      pd.style.top= top - 10 + 'px'; 
      var rotate=clipper.style.transform.replace(/[^0-9\-\.]/ig,'');
      clipper.style.transform='rotateZ('+ (rotate - 20) + 'deg)';
      requestAnimationFrame(()=>this.moveBack(h));
    },
    scroll(e){
      if(this.unPullUp){
        return;
      }
      this.throttle(this.scrollHandle);
    },
    toTop(){
      this.$refs.list.scrollTop=0;
    },
  },
  computed: {

  },
  watch:{
    loading(val){
      if(!val){
        //this.fullLoading=false; 
        this.isRefresh=false;   
        var pd=this.$refs.pullDown;
        var top=pd.style.top.replace(/[^0-9\-\.]/ig,'');
        if(+top>0){
          setTimeout(()=>{
            this.successFlag=true;
            this.moveBack();
            setTimeout(()=>{
              this.successFlag=false;
            },1000)
          },400)
        }
      }
    }
  },
  mounted(){
    //console.log(this.$slots)
  }
}
</script>

<style scoped>
.list{
  height: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}
.scroll-box{
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling:touch;
  -webkit-transform: translate3d(0,0,0);
}
.body-box{
  min-height: calc(100% + 1px);
  position: relative;
  overflow: hidden;
}
.pull-down{ 
  width: 40px;
  height: 40px;
  box-shadow: 0 0 5px #aaa;
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -20px;
  margin-top: -45px;
  border-radius: 50%;
  background: #fff;
  font-size: 30px;
  z-index: 2;
}
.circular {
  height: 30px;
  width: 30px;
  margin: 5px;
  /* animation: loading-rotate 2s linear infinite; */
}

.path {
  /* animation: loading-dash 1.5s ease-in-out infinite; */
  stroke-dasharray: 90,150;
  stroke-dashoffset: 0;
  stroke-width: 3;
  stroke: #4888ff;
  stroke-linecap: round;
}
/* @keyframes loading-dash{
  0% {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -120px;
  }
} */

.zoom-in{
  opacity: 0;
  transform: scale3d(0, 0, 0) rotateZ(-360deg);
  transition: all 0.4s;
}
.load-more{
  text-align: center;
}
.load-more div{
  padding: 15px;
}
.load-end{
  color: #999;
}
.to-top {
  position: fixed;
  color: white;
  font-size: 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  line-height: 40px;
  background: #fff;
  text-align: center;
  bottom: 55px;
  right: 5px;
  cursor: pointer;
  opacity: 0.9;
  box-shadow: 0 0 4px #999;
}

.to-top::before {
  content: '';
  width: 0;
  height: 0;
  border-bottom: 10px solid #4888ff;
  border-left: 8px solid rgba(0, 0, 0, 0);
  border-right: 8px solid rgba(0, 0, 0, 0);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.loading{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  /* font-size: 25px !important; */
}
.success-text{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.3rem;
  line-height: 0.3rem;
  background: #fff;
  text-align: center;
  z-index: 2;
  color: #4888ff;
  /* border: 1px solid #4888ff; */
  box-shadow: 0 1px 2px #ccc;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}

</style>