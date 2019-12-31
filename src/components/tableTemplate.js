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
    group: {
      type: Array,
      default: () => ([])
    },
    searchable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dialogTitle: "",
      dialogVisible: false,
      handleType: 0,  //0新增，1编辑
      curRow: {},
      searchForm: {}
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
          // console.log(this.curRow);
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
      this.curRow = defaultRow;
      for (let key in this.curRow) {
        this.curRow[key] = "";
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
    handleSearch() {
      this.$emit("submitSearch", this.searchForm);
    },
    handleAdd() {
      this.showAdd(this.tableData[0] || {});
    },
    buildFormEl(column = {}, item = {}, row = {}) {
      let {options = [], defaultProp = {value: "value", text: "text"}} = column;
      let {type, props = {}, attrs = {}} = item;
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
              vModel={row[column.field]}>
              {options.map(item => {
                return (
                  <el-checkbox
                    label={getItemVal(item, defaultProp.value)}>
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
              vModel={row[column.field]}>
              {options.map(item => {
                return (
                  <el-radio
                    label={getItemVal(item, defaultProp.value)}>
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
              vModel={row[column.field]}>
              {options.map(item => {
                return (
                  <el-option
                    key={getItemVal(item, defaultProp.value)}
                    label={getItemVal(item, defaultProp.text)}
                    value={getItemVal(item, defaultProp.value)}>
                  </el-option>
                )
              })}
            </el-select>
          );
        default:
          return <el-input placeholder={placeholder} {...data} vModel={row[column.field]}/>
      }
    }
  },
  render() {
    let dialogColumns = [];
    if (this.group.length) {
      this.group.forEach((item, i) => {
        dialogColumns.push({
          title: item.title,
          columnIndex: item.columnIndex.map(v => this.columns[v])
        })
      });
    } else {
      dialogColumns = this.columns;
    }
    return (
      <div>
        {this.searchable &&
        <el-form inline="true">
          {
            this.columns.map(column => {
              if (column.hideInSearch) {
                return null;
              } else {
                return (
                  <el-form-item label={column.label}>
                    {this.buildFormEl(column, column.searchEl || column.formEl, this.searchForm)}
                  </el-form-item>
                )
              }
            })
          }
          <el-form-item>
            <permission-btn type='primary' plain on-click={this.handleSearch.bind(this)}>查询</permission-btn>
          </el-form-item>
        </el-form>
        }
        <div style="margin-bottom: 15px;">
          <permission-btn permission='' type='primary' on-click={this.handleAdd.bind(this)}>新增</permission-btn>
        </div>
        <el-table
          style="width: 100%"
          v-loading={this.tableLoading}
          data={this.tableData}
          {...{props: this.tableProps}}
          border
          on-selection-change={this.handleSelectionChange}
        >
          {this.selectable && <el-table-column type="selection" align="center" width="50"/>}
          {
            this.columns.map(column => {
              if (column.hideInTable) {
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
              dialogColumns.map((column, i) => {
                let formItem = (item) => {
                  let {props = {}} = item.formItem || {};
                  let {render: renderEl} = item.formEl || {};
                  let {rowNum = 1} = props;
                  if (!item || item.hideInDialog) {
                    return null;
                  } else {
                    return (
                      <el-col span={24 / rowNum}>
                        <el-form-item
                          label={item.label}
                          {...{props}}
                          prop={item.field}>
                          {
                            renderEl ? renderEl(this.curRow) : this.buildFormEl(item, item.formEl || {}, this.curRow)
                          }
                        </el-form-item>
                      </el-col>
                    )
                  }
                };
                if (column.columnIndex) {
                  return (
                    <div>
                      <div class="item-title">{column.title || "默认"}</div>
                      {column.columnIndex.map(c => {
                        return formItem(c);
                      })}
                    </div>
                  )
                } else {
                  return formItem(column);
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
