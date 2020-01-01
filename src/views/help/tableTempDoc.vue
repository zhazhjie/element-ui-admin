<template>
  <section class="table-temp-doc">
    <p class="tips">tips:</p>
    <p class="tips">理论上各个props支持对应的element组件的全部属性</p>
    <p class="tips">显示值的优先级：render > slot > default</p>
    <h3>Attribute</h3>
    <table-template
      ref="table"
      :data="dataList"
      :config="config">
    </table-template>
    <h3>Config Attribute</h3>
    <table-template
      ref="table"
      :data="configList"
      :config="config">
    </table-template>
    <p>完善中...</p>
  </section>
</template>

<script>
  export default {
    name: "tableTempDoc",
    data() {
      return {
        config: {
          withoutDialog: true,
          searchable: false,
          pageable: false,
          addBtn: false,
          tableProps: {
            border: false,
          },
          columns: [
            {
              label: '参数',
              field: 'param',
              props: {
                width: '120px',
                align: 'left'
              }
            },
            {
              label: '说明',
              field: 'explain',
              props: {
                align: 'left'
              }
            },
            {
              label: '类型',
              field: 'type',
              props: {
                width: '120px',
                align: 'left'
              }
            },
            {
              label: '可选值',
              field: 'optionalValue',
              props: {
                width: '180px',
                align: 'left'
              }
            },
            {
              label: '默认值',
              field: 'defaultValue',
              props: {
                width: '120px',
                align: 'left'
              }
            },
          ],
        },
        dataList: [
          {
            param: "data",
            explain: "必选，显示的数据",
            type: "array",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "config",
            explain: "必选，配置项",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "page",
            explain: "分页",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "table-loading",
            explain: "表格loading",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
        ],
        configList: [
          {
            param: "mode",
            explain: "弹出层类型",
            type: "string",
            optionalValue: "dialog/drawer",
            defaultValue: "dialog"
          },
          {
            param: "columns",
            explain: "列表选项",
            type: "array",
            optionalValue: "-",
            defaultValue: "-"
          },
        ]
      }
    }
  }
</script>

<style scoped>
  .table-temp-doc {
    & .tips {
      color: #999;
      line-height: 25px;
    }
    & h3 {
      font-size: 25px;
      font-weight: 400;
      margin-top: 20px;
    }
  }
</style>
