/** 
 * @author: zhazhjie 
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-06-16 11:51:37 
 * @version: 1.0 
 */

<template>
  <div class="select">
    <div class="more" :class='showFlag?"rotate180":""'>&#xe65e;</div>
    <input class="input" type="text" @click='showMore' @blur='hideMore' :value='showText' :readonly='isReadonly' ref='input' :placeholder="placeholder">
    <transition name='slide'>
      <div class="select-list" v-show='showFlag'>
        <ul class="scroll-box">
          <li :class='showText==(item.text||item)?"active":""' v-for='(item,index) in list' @click='selectItem(item)'>{{item.text||item}}</li>
          <li class='gray' v-if='!list.length'>-无数据-</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name:'el-select',
  props:{
    value:{
      
    },
    isDisable:{
      type:Boolean,
      default:false
    },
    isReadonly:{
      type:Boolean,
      default:true
    },
    list:{
      type:Array,
      required:true
    },
    placeholder:{
      type:String,
      default:'请选择'
    }
  },
  data() {
    return {
      showFlag:false,
    }
  },
  components: {

  },
  methods: {
    showMore(){
      this.showFlag=!this.showFlag;
    },
    hideMore(e){
      this.showFlag=false
    },
    selectItem(item){
      var val=item.value||item;
      if(!val){
        return;
      }
      this.$emit('input',val);
    }
  },
  computed: {
    showText(){
      var list=this.list;
      if(Object.prototype.toString.call(list[0])=='[object Object]'){
        var len=list.length;
        for(var i=0;i<len;i++){
          if(this.value==list[i].value){
            return list[i].text;
          }
        };
      }else{
        return this.value;
      }
    }
  },
  mounted(){
    
  }
}
</script>

<style scoped>
.select{
  position: relative;
  display: flex;
  border-radius: 0.05rem;
  border: 1px solid #ccc;
  height: 0.35rem;
  text-align: left;
}
.input{
  padding: 0 0.3rem 0 0.1rem; 
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
}
.more{
  font-family: 'iconfont';
  width: 0.3rem;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  cursor: pointer;
  transition: all 0.2s;
}
div.rotate180{
  transform: rotate(180deg);
  transition: all 0.2s;
}
.select-list{
  position: absolute;
  top: 120%;
  top: calc(100% + 10px);
  left: 0;
  width: 100%;
  border: 1px solid #ddd;
  padding: 0.05rem 0;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.2);
  background: #fff;
  border-radius: 0.05rem;
  z-index: 2;
  max-height: 2.65rem;
}
.select-list>ul{
  max-height: 2.5rem;
  overflow-y: auto;
}
.select-list::after{
  content: '';
  width: 0;
  height: 0;
  position: absolute;
  top: -5px;
  left: 0.25rem;
  border-bottom: 5px solid #fff;
  border-left: 5px solid rgba(0, 0, 0, 0);
  border-right: 5px solid rgba(0, 0, 0, 0);
}
.select-list::before{
  content: '';
  width: 0;
  height: 0;
  position: absolute;
  top: -6px;
  left: 0.25rem;
  border-bottom: 5px solid #ccc;
  border-left: 5px solid rgba(0, 0, 0, 0);
  border-right: 5px solid rgba(0, 0, 0, 0);
}
.select-list li{
  height: 0.35rem;
  line-height: 0.35rem;
  padding-left: 0.1rem;
  cursor: pointer;
  white-space: nowrap;
}
.select-list li:hover{
  background: #F4F5FF;
}
.active{
  color: #25b17b;
}
.slide-enter-active,
.slide-leave-active{
  transition: all .3s;
}
.slide-enter,
.slide-leave-to{
  max-height: 0;
  opacity: 0;
  transform: translate3d(0, -10%, 0);
}
</style>