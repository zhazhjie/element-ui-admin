/** 
 * @author: zhazhjie 
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-06-15 10:30:20 
 * @version: 1.0 
 */

<template>
  <!-- <transition name='msg-fade'>  -->
    <div class="msg" :class='typeClass'>
      <i></i>
      <span>{{msgText}}</span>
    </div>  
  <!-- </transition> -->
</template>

<script>
import {mapState} from 'vuex' 
export default {
  data() {
    return {
      isMobile:false
    }
  },
  computed:{
    ...mapState(['msgText','msgType']),
    typeClass(){
      switch (true) {
        case this.msgType==1:
          return 'success';
        case this.msgType==2:
          return 'warning';
        case this.msgType==3:
          return 'error';   
        default:
          return 'normal'; 
      }
    }
  },
  components: {

  },
  methods: {

  },
  mounted(){
    
  }
}
</script>

<style scoped>
@import '../../css/var.css';
.msg{
  position: fixed;
  left: 50%;
  top: 50%;
  border-radius: 0.05rem;
  padding: 0.05rem 0.1rem;
  z-index: 999;
  align-items: center;
  box-shadow: 0 0 0.05rem rgba(26,26,26,.3);
  background-color: #fff;
  transform: translate(-50%,-50%); 
  display: flex;
}
.msg i{
  font-family: 'iconfont';
  font-size: 0.2rem;
  margin-right: 0.05rem;
}
.normal{
  /* background-color: #fff; */
  color: #909399;
  /* border: 1px solid #D4D6DB; */
  animation: slide-in 0.3s;
}
.normal i::before{
  content: '\e8ea';
}
.success{
	/* background-color: #f0f9eb; */
  color: #67c23a;
  /* border: 1px solid #BFE3AD; */
  animation: slide-in 0.3s;
}
.success i::before{
  content: '\e8e4';
}
.warning{
	/* background-color: #fdf6ec; */
  color: #e6a23c;
  /* border: 1px solid #ECD0A6; */
  animation: shaking 0.3s;
}
.warning i::before{
  content: '\e8ec';
}
.error{
	/* background-color: #fef0f0; */
  color: #f56c6c;
  /* border: 1px solid #F2B5B5; */
  animation: shaking 0.3s;
}
.error i::before{
  content: '\e8e7';
}
@keyframes slide-in {
  0% {
    transform: translate(-50%,-65%); 
  }
  100% {
    transform: translate(-50%,-50%); 
  }
}
@keyframes shaking {
  10%,  50%,  90% {
    transform: translate(-53%,-50%); 
  }
  30%, 70% {
    transform: translate(-47%,-50%); 
  }
  100%{
    transform: translate(-50%,-50%); 
  }
}
</style>