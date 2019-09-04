/** 
 * @author: zhazhjie 
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-05-10 11:44:59 
 * @version: 1.0 
 */

<template>
  <label class="checkbox">
    <input class="input" type="checkbox" :value='label' :checked="isChecked" @change='change' :disabled='isDisable'>
    <i class="icon"></i>
    <span class="slot"><slot/></span>
  </label>
</template>

<script>
export default {
  name:'el-checkbox',
	props:{
    value:{
      
    },
    isDisable:{
      type:Boolean,
      default:false
    },
    label:{
      
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
      if(this.label&&Array.isArray(this.value)){
        var index=this.value.indexOf(this.label);
        if(index>-1){
          this.value.splice(index,1)
          //console.log(parent)
        }else{
          this.value.push(this.label)
        }
      }else{
        this.$emit('input',e.target.checked)
        //console.log(e.target.checked)
      }
    }
  },
  computed: {
    isChecked(){
      if(this.label&&Array.isArray(this.value)){
        var index=this.value.indexOf(this.label);
        return index>-1;
      }else{
        return this.value
      }
    }
  }
}
</script>

<style scoped>
.checkbox{
  display: inline-block;
  height: 20px;
  position: relative;
  line-height: 20px;
  user-select: none;
}
.checkbox .input{
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
.checkbox .input + .icon{
  display: inline-block;
  width: 20px;
  height: 20px;
  position: relative;
  border: 1px solid #ccc;
  background-color: #fdfdfd;
  box-shadow: #ddd 0 0 0 0 inset;
  border-radius: 5px;
  box-sizing: border-box;
  transition: all 0.2s;
  float: left;
}
.checkbox .input + .icon::before{
  content: '';
  width: 70%;
  height: 70%;
  color: #fff;
  text-align: center;
  font-style:normal;
  position: absolute;
  top: 15%;
  left: 15%;
  box-sizing: border-box;
  transition: all 0.2s;
}
.checkbox .input:checked + .icon{
  border-color: #25b17b;
  background-color: #25b17b;
  transition: all 0.2s;
}
.checkbox .input:checked + .icon::before{
  content: '';
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABNElEQVQ4T52TvytFcRjGP0+SQfkxmEyKwcZNd5AyUjeL0WgyUAaTsl1FYjHY/A2SWETKIMmkDCw2E2Ui8uir79XXcdQ594zv93k+ve/zvkc0+dnuBGpqxm+7BuwCe6UBtheBLSB4V0sBbM8D20nXy4UBtivABdCaANYLAWx3ATdAbyaz86KAfWAqY34B1n4BbLcDI5LOGuKY+EHGfArMSHr8BthuAWZDqkAb0CfpyXZ4vwaGEsAhMC3pLdRkezKuZTARbUpasj0H7CT1S2Bc0mujFgBjQD08JMJ3oB+4Anpi/QGohM7ScX4ysL0AbMQRguYOGIjiZ6Aq6T57udkQR4EjoCMRfgITko7zzv7PGm2HwE6A7mioS1r575/JvQPbVSCsMrQ8LOmjFCCuNhzObd7cKewLx5tksA6jVCAAAAAASUVORK5CYII=');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  transition: all 0.2s;
}
.checkbox .input:disabled + .icon{
  border-color: #ddd;
  background: #eee;
  cursor: not-allowed;
}
.checkbox .input:checked:disabled + .icon{
  border-color: rgb(175, 222, 255);
  background: rgb(175, 222, 255);
  cursor: not-allowed;
}
.checkbox .slot{
  display: inline-block;
  float: left;
  margin-left: 5px;
}
</style>