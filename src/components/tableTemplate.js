let promise = null;
export default {
  name: "table-template",
  props: {
    columns: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    },
    handleList: {
      type: Array
    },
    page: {
      type: Object,
      default: () => ({
        current: 1,
        size: 10,
        total: 10,
        sizes: [5, 10, 20, 50, 100]
      })
    },
    handlePageChange: {
      type: Function
    },
    needPage: {
      type: Boolean,
      default: true
    },
    withoutDialog: {
      type: Boolean,
      default: false
    },
    tableLoading: {
      type: Boolean,
      default: false
    },
    handleLoading: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Object
    },
    tableProps: {
      type: Object
    },
    handleProps: {
      type: Object
    },
    dialogProps: {
      type: Object
    },
    formProps: {
      type: Object
    },
    handleSelectionChange: {
      type: Function,
      default: () => {
      }
    },
    sortable: {
      type: Boolean,
      default: false
    },
    groupable: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      dialogTitle: "",
      dialogVisible: false,
      handleType: 0,  //0新增，1编辑
      curRow: {}
    }
  },
  methods: {
    toString(value) {
      let result = Object.prototype.toString.call(value);
      return result.replace(/\[object ([a-z]+)]/ig, "$1");
    },
    copy(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    handleSizeChange(pageSize) {
      this.page.size = pageSize;
      this.handlePageChange();
    },
    handleCurrentChange(curPage) {
      this.page.current = curPage;
      this.handlePageChange();
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // this.dialogVisible = false;
          console.log(this.curRow);
          this.$emit(this.handleType ? "submitEdit" : "submitAdd", this.curRow);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    closeDialog() {
      this.dialogVisible = false;
      this.resetForm();
    },
    showAdd(defaultRow, dialogTitle = "新增") {
      this.handleType = 0;
      this.dialogTitle = dialogTitle;
      this.dialogVisible = true;
      if (defaultRow) {
        this.curRow = defaultRow;
      } else {
        for (let key in this.curRow) {
          this.curRow[key] = "";
        }
      }
      this.$emit("showAdd");
    },
    showEdit(row, dialogTitle = "编辑") {
      this.handleType = 1;
      this.dialogTitle = dialogTitle;
      this.curRow = this.copy(row);
      this.dialogVisible = true;
      this.$emit("showEdit", row);
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    handleClick(row) {
      this.showEdit(row);
    },
    buildFormEl(column = {}) {
      let {formEl = {}} = column;
      let {
        type, props = {}, attrs = {}, options = [], defaultProp = {
          value: 'value',
          label: 'label',
          text: 'text'
        }
      } = formEl;
      let placeholder = "请输入" + column.label;
      let data = {props, attrs};
      if (this.toString(options) === "Function") options = options();
      let getItemVal = (item, key) => {
        if (this.toString(item) === "Object") {
          return item[key];
        } else {
          return item;
        }
      };
      switch (type) {
        case "checkbox":
          return (
            <el-checkbox-group
              {...data}
              vModel={this.curRow[column.field]}>
              {options.map(item => {
                return (
                  <el-checkbox
                    label={getItemVal(item, defaultProp.label)}>
                    {getItemVal(item, defaultProp.text)}
                  </el-checkbox>
                )
              })}
            </el-checkbox-group>
          );
        case "radio":
          return (
            <el-radio-group
              {...data}
              vModel={this.curRow[column.field]}>
              {options.map(item => {
                return (
                  <el-radio
                    label={getItemVal(item, defaultProp.label)}>
                    {getItemVal(item, defaultProp.text)}
                  </el-radio>
                )
              })}
            </el-radio-group>
          );
        case "select":
          return (
            <el-select
              {...data}
              vModel={this.curRow[column.field]}>
              {options.map(item => {
                return (
                  <el-option
                    key={getItemVal(item, defaultProp.value)}
                    label={getItemVal(item, defaultProp.label)}
                    value={getItemVal(item, defaultProp.value)}>
                  </el-option>
                )
              })}
            </el-select>
          );
        default:
          return <el-input placeholder={placeholder} {...data} vModel={this.curRow[column.field]}/>
      }
    }
  },
  render() {
    if (this.sortable) {
    }
    return (
      <div>
        <el-table
          v-loading={this.tableLoading}
          data={this.tableData}
          {...{props: this.tableProps}}
          border
          on-selection-change={this.handleSelectionChange}
          style="width: 100%">
          {this.selectable && <el-table-column type="selection" align="center" width="50"/>}
          {
            this.columns.map(column => {
              if (column.hiddenInTable) {
                return null;
              } else {
                return (
                  <el-table-column
                    label={column.label}
                    align="center"
                    {...{props: column.props}}
                    scopedSlots={{
                      default: scope => {
                        if (column.render) {
                          return column.render(scope.row);
                        } else {
                          return (
                            <span attrs={column.attrs}>
                              {column.format ? column.format(scope.row[column.field]) : scope.row[column.field]}
                            </span>
                          )
                        }
                      }
                    }}/>
                )
              }
            })
          }
          {
            this.handleList.length &&
            <el-table-column
              label="操作"
              fixed="right"
              header-align="center"
              {...{props: this.handleProps}}
              width={this.handleList.length * 60}
              scopedSlots={{
                default: scope => {
                  return this.handleList.map(item => {
                    if (item.render) {
                      return item.render(scope.row);
                    } else {
                      return (
                        <el-button
                          type="text"
                          icon={item.icon}
                          {...{props: item.props}}
                          on-click={item.click ? item.click.bind(this, scope.row) : this.handleClick.bind(this, scope.row)}>
                          {item.label}
                        </el-button>
                      )
                    }
                  })
                }
              }}/>
          }
        </el-table>
        {this.needPage &&
        <el-pagination
          style='margin-top: 20px'
          on-size-change={this.handleSizeChange}
          on-current-change={this.handleCurrentChange}
          current-page={+this.page.current}
          page-sizes={this.page.sizes}
          page-size={+this.page.size}
          total={+this.page.total}
          layout="total, sizes, prev, pager, next, jumper"/>
        }
        {!this.withoutDialog &&
        <el-dialog
          title={this.dialogTitle}
          visible={this.dialogVisible}
          before-close={this.closeDialog.bind(this)}
          close-on-click-modal={false}
          {...{props: this.dialogProps}}
          width="800px">
          <el-form
            label-width="80px"
            props={{
              model: this.curRow,
              ...this.formProps
            }}
            rules={this.rules}
            ref="form">
            {
              this.columns.map(column => {
                if (column.hiddenInDialog) {
                  return null;
                } else {
                  let {props} = column.formItem || {};
                  let {render: renderEl} = column.formEl || {};
                  let {rowNum = 1} = this.formProps || {};
                  return (
                    <el-col span={24 / rowNum}>
                      {/*<div class="item-title">666</div>*/}
                      <el-form-item
                        label={column.label}
                        {...{props}}
                        prop={column.field}>
                        {
                          renderEl ? renderEl(this.curRow) : this.buildFormEl(column)
                        }
                      </el-form-item>
                    </el-col>
                  )
                }
            })
            }
          </el-form>
          <div slot="footer">
            <el-button on-click={this.closeDialog.bind(this)}>取 消</el-button>
            <el-button type="primary" loading={this.handleLoading} on-click={this.handleSubmit.bind(this)}>确 定
            </el-button>
          </div>
        </el-dialog>}
      </div>
    )
  }
}
