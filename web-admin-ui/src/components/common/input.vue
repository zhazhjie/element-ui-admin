/** 
 * @author: zhazhjie 
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-06-12 16:26:43 
 * @version: 1.0 
 */

<template>
  <label class="input">
    <span class="for-text" :class='(isFocus||value.length)?"to-top":""'>{{placeholder}}</span>
    <input :type="type" class="text" :value='value' @input='change' :disabled='isDisable' @focus='focus' @blur='blur'>
    <span class="line" :class='(isFocus||value.length)?"unfold":""'></span>
  </label>
</template>

<script>
export default {
  name:'el-input',
	props:{
    value:{
      type:String,
      default:''
    },
    isDisable:{
      type:Boolean,
      default:false
    },
    type:{
      type:String,
      default:'text'
    },
    placeholder:{
      type:String,
    }
  },
  data() {
    return {
      isFocus:false,
    }
  },
  components: {

  },
  methods: {
    change(e){
      this.$emit('input',e.target.value)
      //console.log(e.target.value)
    },
    focus(e){
      this.isFocus=true;
    },
    blur(e){
    	this.isFocus=false;
    }
  },
  computed: {

  },
  mounted(){
    //console.log(this.value)
  }
}
</script>

<style scoped>
.input{
    height: 0.45rem;
    display: flex;
    flex-direction: column;
    padding: 0 0.1rem;
    position: relative;
    border-bottom: 1px solid #ccc;
  }
  .for-text{
    height: 0.16rem;
    line-height: 0.16rem;
    position: relative;
    top: 50%;
    margin-top: -0.08rem;
    color: #aaa;
    transition: all 0.2s linear;
  }
  .text{
    width: 100%;
    height: 0.29rem;
    border: 0;
    outline: 0;
    background: none;
    position: relative;
    z-index: 1;
  }
  .line{
    position: absolute;
    width: 100%;
    height: 2px;
    background: #25b17b;
    bottom: -1px;
    left: 0;
    transform: scale(0, 1);
    transition: all 0.2s linear;
  }
  .to-top{
    top: 0;
    margin-top: 0;
    font-size: 0.14rem;
    color: #25b17b;
    transition: all 0.2s linear;
  }
  .unfold{
    transform: scale(1, 1);
    transition: all 0.2s linear;
  }
</style>