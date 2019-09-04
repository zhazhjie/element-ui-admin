/** 
 * @author: zhazhjie 
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-06-12 17:52:54 
 * @version: 1.0 
 */

<template>
  <transition name='zoomIn'>
    <div class="pop-wrap" v-show='popFlag' data-close='1' @click='emitClose'>
      <div class="pop" :class='[position]'>
        <div class="pop-tit"><slot name='title'>提示</slot></div>
        <div class="pop-content scroll-box">
          <div>
            <slot/>
          </div>
        </div>
        <div class="operate" v-if='type=="normal"&&position=="middle"'>
          <el-button v-if='!$slots.submit2' type='cancel' size='small' @click='hidePop' style='margin-right:0.1rem;'><slot name='cancel'>取消</slot></el-button>
          <el-button v-else type='cancel' size='small' @click='submitPop2' style='margin-right:0.1rem;'><slot name='submit2'>确定</slot></el-button>
          <el-button size='small' @click='submitPop' :loading="loading"><slot name='submit'>确认</slot></el-button>
        </div>
        <div class="close-pop" @click='hidePop' v-else>×</div>
      </div>
    </div>
    </transition>
</template>

<script>
export default {
  name:'el-popup',
  props:{
    popFlag:{
      type: Boolean,
      default:false
    },
    loading:{
      type: Boolean,
      default:false
    },
    type:{
      type: String,
      default:'normal'
    },
    position:{
      type: String,
      default:'middle'
    },
  },
  data() {
    return {

    }
  },
  components: {

  },
  methods: {
    emitClose(e){
      if(e.target.dataset.close)
        this.hidePop();
    },
    hidePop(){
      this.$emit('update:popFlag',false)
    },
    submitPop(){
      //this.hidePop();
      this.$emit('submitPop')
    },
    submitPop2(){
      //this.hidePop();
      this.$emit('submitPop2')
    }
  },
  computed: {

  }
}
</script>

<style scoped>
@import '../../css/var.css';
.pop-wrap{
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pop{
  @apply --box;
  overflow: hidden;
  background: #f9f9f9;
  box-shadow: 1px 1px 10px 0px #666;
}
.middle{
  position: relative;
  width: 5rem;
}
.bottom{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 0;
}
.close-pop{
  position: absolute;
  top: 0;
  right: 0;
  height: 0.35rem;
  width: 0.35rem;
  line-height: 0.35rem;
  font-size: 0.3rem;
  cursor: pointer;
  text-align: center;
  color: #999;
}
.close-pop:hover{
  opacity: 0.8;
}
.pop-tit{
  font-size: 0.18rem;
  margin-bottom: 0.15rem;
}
.pop-content{
  max-height: calc(100vh - 200px);
  overflow: auto;
}
.operate{
  display: flex;
  justify-content: flex-end;
  margin: 0.2rem 0 0;
}
.zoomIn-enter-active,
.zoomIn-leave-active{
  transition: all 0.25s;
}
.zoomIn-enter-active .middle,
.zoomIn-leave-active .middle{
  transition: all 0.25s;
}
.zoomIn-enter .middle,
.zoomIn-leave-to .middle{
  transform: scale3d(.1, .1, .1);
}
.zoomIn-enter-active .bottom,
.zoomIn-leave-active .bottom{
  transition: all 0.25s;
}
.zoomIn-enter .bottom,
.zoomIn-leave-to .bottom{
  transform: translateY(100%);
}
.zoomIn-enter,
.zoomIn-leave-to{
  opacity: 0;
}
@media screen and (max-width: 600px) {
  .middle{
    width: 90%;
  }
}
</style>