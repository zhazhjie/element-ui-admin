<template>
  <section class="table-temp-doc">
    <p class="tips">tips:</p>
    <p class="tips">理论上各个props支持对应的element组件的全部属性</p>
    <p class="tips">显示值的优先级：render > slot > default</p>
    <el-collapse>
      <el-collapse-item title="示例代码" name="1">
        <table-template
          ref="table"
          :data="userList"
          :config="userConfig"
          :tableLoading="tableLoading"
          :page='params'>
        </table-template>
        <pre class="pre">
          <code>
            {{demoCode}}
          </code>
        </pre>
      </el-collapse-item>
    </el-collapse>
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
    <h3>Columns Item Attribute</h3>
    <table-template
      ref="table"
      :data="columnsItemList"
      :config="config">
    </table-template>
    <h3>FormEl Attribute</h3>
    <table-template
      ref="table"
      :data="formElList"
      :config="config">
    </table-template>
    <h3>HandlerList Item Attribute</h3>
    <table-template
      ref="table"
      :data="handlerList"
      :config="config">
    </table-template>
    <h3>Group Attribute</h3>
    <table-template
      ref="table"
      :data="groupList"
      :config="config">
    </table-template>
    <h3>Page Attribute</h3>
    <table-template
      ref="table"
      :data="pageList"
      :config="config">
    </table-template>
    <h3>Events</h3>
    <table-template
      ref="table"
      :data="eventList"
      :config="eventConfig">
    </table-template>
    <h3>Slots</h3>
    <table-template
      ref="table"
      :data="slotList"
      :config="slotConfig">
    </table-template>
  </section>
</template>

<script>
  import {demoCode} from "./demoCode";

  export default {
    name: "tableTempDoc",
    data() {
      return {
        demoCode: demoCode,
        tableLoading: false,
        userList: [{id: "1", username: "xxx", phone: "13555555555", state: 1}],
        userConfig: {
          dialogProps: {width: '500px'},
          handlerProps: {width: '120px'},
          columns: [
            {
              label: 'ID',
              field: 'id',
              hideInDialog: true,
              hideInSearch: true,
            },
            {
              label: '登录账号',
              field: 'username',
            },
            {
              label: '手机',
              field: 'phone',
              hideInSearch: true,
            },
            {
              label: '状态',
              field: 'state',
              type: 'tag',
              value: 1,
              options: [{value: 1, text: "正常"}, {value: 0, text: "禁用"}],
              stateMapping: {
                0: "danger",
                1: "success"
              },
              // render: (row) => {
              //   return row.state ? <el-tag type="success">正常</el-tag> : <el-tag type="danger">禁用</el-tag>
              // },
              formEl: {
                type: "radio",
              },
              searchEl: {
                type: "select",
                props: {
                  clearable: true
                }
              }
            },
          ],
          handlerList: [
            {
              label: '编辑',
              icon: 'el-icon-edit'
            },
            {
              label: '删除',
              icon: 'el-icon-delete',
              click: row => {

              }
            }
          ],
          rules: {
            username: [
              {required: true, message: '请输入登录账号', trigger: 'blur'}
            ],
          },
        },
        params: {
          current: 1,
          size: 10,
          total: 10
        },
        config: {
          withoutDialog: true,
          searchable: false,
          pageable: false,
          showAddBtn: false,
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
        eventConfig: {
          withoutDialog: true,
          searchable: false,
          pageable: false,
          showAddBtn: false,
          tableProps: {
            border: false,
          },
          columns: [
            {
              label: '事件名称',
              field: 'event',
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
              label: '回调参数',
              field: 'cb',
              props: {
                align: 'left'
              }
            },
          ],
        },
        slotConfig: {
          withoutDialog: true,
          searchable: false,
          pageable: false,
          showAddBtn: false,
          tableProps: {
            border: false,
          },
          columns: [
            {
              label: '名称',
              field: 'name',
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
            explain: "必选，配置项，详见Config Attribute",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "page",
            explain: "分页，详见Page Attribute",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "tableLoading",
            explain: "表格loading",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "beforeOpen",
            explain: "打开弹出层前触发，接收两个参数：Function(row,done)，操作完成后调用done打开弹出层",
            type: "function",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "beforeClose",
            explain: "关闭弹出层前触发，接收两个参数：Function(row,done)，操作完成后调用done关闭弹出层",
            type: "function",
            optionalValue: "-",
            defaultValue: "-"
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
            explain: "列表选项，详见Columns Item Attribute",
            type: "array",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "handlerList",
            explain: "操作列表，详见HandlerList Item Attribute",
            type: "array",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "rules",
            explain: "表单验证规则，同el-table rules",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "tableProps",
            explain: "表格属性，支持el-table所有属性",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "tableAttrs",
            explain: "表格原生属性，如style",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "handlerProps",
            explain: "操作列属性，支持el-table-column所有属性",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "handlerAttrs",
            explain: "表格原生属性，如style",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "dialogProps",
            explain: "弹出层属性，支持el-dialog或el-drawer所有属性",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "dialogAttrs",
            explain: "表格原生属性，如style",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "formProps",
            explain: "弹出层的表单属性，支持el-form所有属性",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "formAttrs",
            explain: "弹出层表单原生属性，如style",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "searchFormProps",
            explain: "搜索栏表单属性，支持el-form所有属性",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "searchFormAttrs",
            explain: "搜索栏表单原生属性，如style",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "group",
            explain: "表单分组，详情Group Attribute",
            type: "array",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "pageable",
            explain: "是否分页",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "true"
          },
          {
            param: "withoutDialog",
            explain: "是否渲染弹出层",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "selectable",
            explain: "表格是否可勾选",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "searchable",
            explain: "是否显示探索栏",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "true"
          },
          {
            param: "showAddBtn",
            explain: "是否显示新增按钮",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "true"
          },
          {
            param: "showAddBtnPermission",
            explain: "新增按钮权限，如sys:user:add",
            type: "string",
            optionalValue: "-",
            defaultValue: "-"
          },
        ],
        columnsItemList: [
          {
            param: "label",
            explain: "必选，字段描述，用于表头、表单标签文本",
            type: "string",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "field",
            explain: "必选，字段名",
            type: "string",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "type",
            explain: "表格列字段的组件类型，如select，支持所有表单组件及tag",
            type: "string",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "render",
            explain: "自定义渲染表格列，接收当前行row作为参数，优先级最高，必须使用箭头函数，支持jsx语法",
            type: "function",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "format",
            explain: "格式化表格列，接收当前字段值作为参数",
            type: "function",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "value",
            explain: "表单字段的默认值",
            type: "any",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "options",
            explain: "选项列表，type为select/checkbox/radio/cascader/tag时可用，同步代码可以使用array，异步的必须用function返回array",
            type: "array/function",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "defaultProp",
            explain: "options列表的默认字段",
            type: "object",
            optionalValue: "-",
            defaultValue: "{value: \"value\", text: \"text\"}"
          },
          {
            param: "stateMapping",
            explain: "tag字段值和类型映射，如{0:'danger',1:'success'}",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "props",
            explain: "表格列属性，支持el-table-column所有属性",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "attrs",
            explain: "表格列原生属性，如style",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "formEl",
            explain: "弹出层表单组件属性，详情FormEl Attribute",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "searchEl",
            explain: "搜索栏表单组件属性，同formEl",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "formItem",
            explain: "弹出层表单项属性，其props(object)属性支持el-form-item所有属性（特殊属性span，行占比，默认值24占一行）",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "hideInTable",
            explain: "是否在表格中隐藏",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "hideInDialog",
            explain: "是否在弹出层表单中隐藏",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "hideInSearch",
            explain: "是否在搜索栏隐藏",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
        ],
        formElList: [
          {
            param: "type",
            explain: "弹出层表单组件类型",
            type: "string",
            optionalValue: "-",
            defaultValue: "input"
          },
          {
            param: "render",
            explain: "自定义渲染弹出层表单项，接收当前行row作为参数，优先级最高，必须使用箭头函数，支持jsx语法",
            type: "function",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "props",
            explain: "表单组件属性，支持对应组件的所有属性",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "attrs",
            explain: "原生元素属性，如style",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
        ],
        handlerList: [
          {
            param: "label",
            explain: "显示值",
            type: "string",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "icon",
            explain: "按钮小图标class",
            type: "string",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "props",
            explain: "支持el-button的所有属性",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "attrs",
            explain: "原生属性，如style",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "event",
            explain: "触发默认事件",
            type: "string",
            optionalValue: "showAdd/showEdit/showView",
            defaultValue: "showEdit"
          },
          {
            param: "render",
            explain: "当操作项不是按钮时可自定义，接收当前行row作为参数，优先级最高，必须使用箭头函数，支持jsx语法",
            type: "function",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "click",
            explain: "自定义按钮点击回调事件，接收(row,index)作为参数",
            type: "function",
            optionalValue: "-",
            defaultValue: "-"
          },
        ],
        groupList: [
          {
            param: "title",
            explain: "分组标题",
            type: "sting",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "columnIndex",
            explain: "分组索引列表，对应columns下标",
            type: "array",
            optionalValue: "-",
            defaultValue: "-"
          },
        ],
        pageList: [
          {
            param: "current",
            explain: "当前页",
            type: "number",
            optionalValue: "-",
            defaultValue: "1"
          },
          {
            param: "size",
            explain: "每页显示多少条数据",
            type: "number",
            optionalValue: "-",
            defaultValue: "10"
          },
          {
            param: "total",
            explain: "总共多少条数据",
            type: "number",
            optionalValue: "-",
            defaultValue: "10"
          },
          {
            param: "sizes",
            explain: "可选的分页数据条数",
            type: "array",
            optionalValue: "-",
            defaultValue: "[10,20,50,100]"
          },
        ],
        eventList: [
          {
            event: "submitAdd",
            explain: "新增提交时触发",
            cb: "Function(row,hideLoading,done)，参数说明：当前行，隐藏loading函数，隐藏loading并关闭窗口",
          },
          {
            event: "submitEdit",
            explain: "编辑提交时触发",
            cb: "Function(row,hideLoading,done)",
          },
          {
            event: "submitSearch",
            explain: "点击搜索时触发",
            cb: "Function(params)",
          },
          {
            event: "pageChange",
            explain: "点击分页时触发",
            cb: "Function(page)",
          },
          {
            event: "selectionChange",
            explain: "勾选表格时触发",
            cb: "Function(rows)",
          },
          {
            event: "rowClick",
            explain: "点击表格某行时触发",
            cb: "Function(row)",
          },
          {
            event: "字段名+Change+?InXxx",
            explain: "表单组件值改变时触发，包括xxxChange(表格)、xxxChangeInForm(弹出层表单)和xxxChangeInSearch(搜索栏)，如state字段在搜索栏改变，触发stateChangeInSearch事件",
            cb: "Function(row)",
          },
        ],
        slotList: [
          {
            name: "add",
            explain: "插入到新增按钮后面"
          },
          {
            name: "search",
            explain: "插入到搜索按钮后面"
          },
          {
            name: "tableLeft",
            explain: "插入到表格左侧"
          },
          {
            name: "tableRight",
            explain: "插入到表格右侧"
          },
          {
            name: "字段名",
            explain: "自定义表格列"
          },
          {
            name: "字段名+Form",
            explain: "自定义弹出层表单项"
          },
          {
            name: "字段名+Search",
            explain: "自定义搜索项"
          },
        ]
      }
    }
  }
</script>

<style scoped>
  .table-temp-doc {
    /*padding: 20px;*/

    & .tips {
      color: #999;
      line-height: 25px;
    }

    & h3 {
      font-size: 25px;
      font-weight: 400;
      margin-top: 20px;
    }

    & .pre {
      background: #f1f1f1;
    }
  }
</style>
