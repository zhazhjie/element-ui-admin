/** 
 * @author: zhazhjie 
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-05-10 11:39:46 
 * @version: 1.0 
 */

<template>
  <label class="radio">
    <input class="input" type="radio" :name="value" :value='label' :checked="value==label" @change='change' :disabled='isDisable'>
    <i class="icon"></i>
    <span class="slot"><slot/></span>
  </label>
</template>

<script>
export default {
  name:'el-radio',
	props:{
    value:{
      
    },
    isDisable:{
      type:Boolean,
      default:false
    },
    label:{
      //type:String,
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
      this.$emit('input',e.target.value)
      //console.log(e.target.value)
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
.radio{
  display: inline-block;
  height: 20px;
  position: relative;
  line-height: 20px;
  user-select: none;
}
.radio .input{
  position: absolute;
  opacity: 0;
}
.radio .input + .icon{
  display: inline-block;
  width: 20px;
  height: 20px;
  position: relative;
  border: 1px solid #ccc;
  background-color: #fdfdfd;
  box-shadow: #ddd 0 0 0 0 inset;
  border-radius: 50%;
  box-sizing: border-box;
  transition: all 0.2s;
  float: left;
}
.radio .input:checked + .icon{
  border: 5px solid rgb(55, 173, 255);
  transition: all 0.2s;
}
.radio .slot{
  display: inline-block;
  float: left;
  margin-left: 5px;
}
.radio .input:disabled + .icon{
  background: #eee;
  transition: all 0.2s;
  cursor: not-allowed;
}
.radio .input:checked:disabled + .icon{
  border: 5px solid rgb(175, 222, 255);
  background: #eee;
  transition: all 0.2s;
  cursor: not-allowed;
}
</style>