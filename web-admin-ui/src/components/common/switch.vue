/** 
 * @author: zhazhjie 
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-05-10 11:45:39 
 * @version: 1.0 
 */

<template>
  <label class="switch">
    <input class="input" type="checkbox" :checked="value" @change='change' :disabled='isDisable'>
    <i class="icon"></i>
    <slot></slot>
  </label>
</template>

<script>
export default {
  name:'el-switch',
	props:{
    value:{
      
    },
    isDisable:{
      type:Boolean,
      default:false
    },
  },
  data() {
    return {

    }
  },
  components: {

  },
  methods: {
    change(e){
      this.$emit('input',e.target.checked)
      //console.log(e.target.checked)
    }
  },
  computed: {

  }
}
</script>

<style scoped>
.switch{
  display: inline-block;
  height: 20px;
  position: relative;
  line-height: 20px;
  user-select: none;
}
.switch .input{
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
.switch .input + .icon{
  display: inline-block;
  width: 36px;
  height: 20px;
  position: relative;
  border: 1px solid #ccc;
  background-color: #fdfdfd;
  box-shadow: #ddd 0 0 0 0 inset;
  border-radius: 20px;
  box-sizing: border-box;
  transition: all 0.2s;
  float: left;
}
.switch .input + .icon::before{
  content: '';
  width: 18px;
  height: 18px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 0px 2px 1px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  transition: all 0.2s;
}
.switch .input:checked + .icon{
  border-color: rgb(55, 173, 255);
  box-shadow: rgb(55, 173, 255) 0 0 0 15px inset;
  transition: all 0.2s;
}
.switch .input:checked + .icon::before{
  left: 16px;
  transition: all 0.2s;
}
.switch .input:disabled + .icon{
  border-color: #ddd;
  background: #eee;
  cursor: not-allowed;
}
.switch .input:disabled + .icon::before{
  background: #f5f5f5;
}
.switch .input:checked:disabled + .icon{
  border-color: rgb(175, 222, 255);
  box-shadow: #ddd 0 0 0 0 inset;
  background: rgb(175, 222, 255);
  cursor: not-allowed;
}
.switch .slot{
  display: inline-block;
  float: left;
  margin-left: 5px;
}

</style>