<!-- 树状选择器 -->
<template>
  <g :transform="rootTransform">
    <rect :width="nodeWidth" :height="nodeHeight" :fill="nodeFill"></rect>
    <text :fill="nodeTextColor" text-anchor="middle" dominant-baseline="middle"
          :y="nodeHeight / 2" :x="nodeWidth / 2">{{node.data.name}}</text>
  </g>
</template>

<script>
  export default {
    name: 'link-node',
    props: {
      node: {
        type: Object
      },
      nodeWidth: {
        type: Number
      },
      nodeHeight: {
        type: Number
      },
      nodeFill: {
        type: String
      },
      nodeTextColor: {
        type: String
      }
    },
    computed: {
      rootTransform() {
        return `translate(${this.node.x}, ${this.node.y})`
      }
    }
  };
</script>

<style>
  .el-input.el-input--suffix {
    cursor: pointer;
    overflow: hidden;
  }
  .el-input.el-input--suffix.rotate .el-input__suffix {
    transform: rotate(180deg);
  }
  .select-tree {
    max-height: 350px;
    overflow-y: scroll;
  }
  /* 菜单滚动条 */
  .select-tree::-webkit-scrollbar {
    z-index: 11;
    width: 6px;
  }
  .select-tree::-webkit-scrollbar-track,
  .select-tree::-webkit-scrollbar-corner {
    background: #fff;
  }
  .select-tree::-webkit-scrollbar-thumb {
    border-radius: 5px;
    width: 6px;
    background: #b4bccc;
  }
  .select-tree::-webkit-scrollbar-track-piece {
    background: #fff;
    width: 6px;
  }
</style>
