/** 
 * @author: zhazhjie 
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-09-20 10:40:40 
 * @version: 1.0 
 */

<template>
  <button class="button ripple" :class='[loading?"loading":"",type,size,color]' :disabled="loading"
  @click='emitClick'>
    <slot/>
  </button>
</template>

<script>
export default {
  name:'el-button',
	props:{
    type:{
      type:String,
      default:'submit'
    },
    size:{
      type:String,
      default:'normal'
    },
    loading:{
      type:Boolean,
      default:false,
    },
    color:{
      type:String,
      default:'green'
    }
  },
  data() {
    return {

    }
  },
  components: {

  },
  methods: {
    emitClick(){
      this.$emit('click');
    }
  },
  computed: {

  },
  mounted(){
    
  }
}
</script>

<style scoped>
@import '../../css/var.css';
.button{
  font-size: 0.14rem;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  outline: 0;
  color: #fff;
  transition: all 0.2s;
}
.cancel{
  background: transparent;
}
.submit.green{
  border: 1px solid var(--green);
  background-color: var(--green);
}
.cancel.green{
  border: 1px solid var(--green);
  color: var(--green);
}
.submit.blue{
  border: 1px solid var(--blue);
  background-color: var(--blue);
}
.cancel.blue{
  border: 1px solid var(--blue);
  color: var(--blue);
}
.submit.orange{
  border: 1px solid var(--orange);
  background-color: var(--orange);
}
.cancel.orange{
  border: 1px solid var(--orange);
  color: var(--orange);
}
.submit.red{
  border: 1px solid var(--red);
  background-color: var(--red);
}
.cancel.red{
  border: 1px solid var(--red);
  color: var(--red);
}
.submit.gray{
  border: 1px solid var(--gray);
  background-color: var(--gray);
}
.cancel.gray{
  border: 1px solid var(--gray);
  color: var(--gray);
}
.submit:disabled{
  opacity: 0.5;
  cursor: not-allowed;
}
.normal{
  width: 100%;
  height: 0.4rem;
  line-height: 0.4rem;
  border-radius: 0.4rem;
}
.small{
  width: 0.7rem;
  height: 0.35rem;
  line-height: 0.35rem;
  border-radius: 0.35rem;
}
.ripple {
  position: relative;
  overflow: hidden;
}
.ripple::after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: radial-gradient(circle, #B7CBE6 10%, transparent 10.01%);
  background-position: 50%;
  pointer-events: none;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform .3s, opacity .5s;
}
.ripple:active::after {
  transform: scale(0, 0);
  opacity: .3;
  transition: 0s;
}
.loading{
  position: relative;
}
.loading::before{
  font-family: 'element-icons';
  content: '\e61e';
  display: inline-block;
  width: 0.18rem;
  height: 0.18rem;
  line-height: 0.18rem;
  text-align: center;
  margin-right: 0.02rem;
  animation: rotate 3s linear infinite;
}
@keyframes rotate{
  0%{transform: rotate(0)}
  100%{transform: rotate(360deg)}
}
</style>