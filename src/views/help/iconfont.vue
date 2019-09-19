/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-11-07 20:52:30
* @version: 1.0
*/

<template>
  <div class="main markdown">
    <p>使用步骤如下：</p>
    <h3>挑选相应图标并获取类名，应用于页面：</h3>
    <code>{{example}}</code>
    <ul class="icon_lists clear">
      <li v-for="item in iconList">
        <i class="icon" :class="item"></i>
        <div class="fontclass">.{{item}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {getIconList} from "../../utils/util";

  export default {
    data() {
      return {
        example:`<i class="icon-xxx"></i>`,
        iconList: []
      }
    },
    components: {},
    methods: {
      getIconList() {
        getIconList().then(data=>{
          this.iconList=data;
        })
          .catch(err=>err)
      },
    },
    computed: {},
    mounted() {
      this.getIconList();
    }
  }
</script>

<style scoped>
  .icon_lists {
    display: flex;
    flex-wrap: wrap;
  }

  .icon_lists li {
    width: 100px;
    height: 180px;
    text-align: center;
  }

  .icon_lists .icon {
    font-size: 42px;
    line-height: 100px;
    margin: 10px 0;
    color: #333;
    -webkit-transition: font-size 0.25s ease-out 0s;
    -moz-transition: font-size 0.25s ease-out 0s;
    transition: font-size 0.25s ease-out 0s;

  }

  .icon_lists .icon:hover {
    font-size: 100px;
  }

  .markdown {
    color: #666;
    font-size: 14px;
    line-height: 1.8;
  }
</style>
