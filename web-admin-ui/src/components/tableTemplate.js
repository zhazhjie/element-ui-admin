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
    }
  },
  data() {
    return {
      dialogVisible: false,
      handleType: 0,  //0新增，1编辑
      curRow: {}
    }
  },
  methods: {
    copy(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    vModel(column) {
      return {
        props: {value: this.curRow[column.field]},
        on: {input: e => this.curRow[column.field] = e}
      }
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
          this.$emit("submit", this.curRow);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleCloseDialog() {
      this.dialogVisible = false;
      this.resetForm();
    },
    handleShowDialog() {
      this.handleType = 0;
      this.dialogVisible = true;
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    handleClick(row) {
      this.curRow = this.copy(row);
      this.handleType = 1;
      this.dialogVisible = true;
      this.$emit("showDialog", row);
    },
    buildFormEl(column = {}) {
      let {formItem = {}} = column;
      let {name} = formEl;
      switch (name) {
        case "checkbox":
          return <el-checkbox {...this.vModel(column)}/>;
        case "radio":
          return <el-radio {...this.vModel(column)}/>;
        case "select":
          return <el-select {...this.vModel(column)}/>;
        default:
          return <el-input {...this.vModel(column)}/>
      }
    }
  },
  render() {
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
                          return scope.row[column.field]
                        }
                      }
                    }}/>
                )
              }
            })
          }
          {
            this.handleList.length && <el-table-column
              label="操作"
              fixed="right"
              header-align="center"
              {...{props: this.handleProps}}
              width="145"
              scopedSlots={{
                default: scope => {
                  return this.handleList.map(el => {
                    if (el.render) {
                      return el.render(scope.row);
                    } else {
                      return (
                        <el-button
                          {...{props: el.props}}
                          on-click={el.click ? el.click.bind(this, scope.row) : this.handleClick.bind(this, scope.row)}>
                          {el.label}
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
        {!this.withoutDialog && <el-dialog
          title={this.handleType ? '编辑' : '新增'}
          visible={this.dialogVisible}
          before-close={this.handleCloseDialog.bind(this)}
          close-on-click-modal={false}
          {...{props: this.dialogProps}}
          width="800px">
          <el-form model={this.curRow} label-width="80px" {...{props: this.formProps}} rules={this.rules} ref="form">
            {
              this.columns.map(column => {
                if (column.hiddenInDialog) {
                  return null;
                } else {
                  return (
                    <el-form-item
                      label={column.label}
                      {...{props: column.formItem ? column.formItem.props : null}}
                      prop={column.field}>
                      {
                        column.formEl && column.formEl.render
                          ?
                          column.formEl.render(this.curRow)
                          :
                          <el-input
                            placeholder={column.formEl&&column.formEl.placeholder?column.formEl.placeholder:"请输入" + column.label}
                            {...{props: column.formEl ? column.formEl.props : null}}
                            value={this.curRow[column.field]}
                            on-input={e => this.curRow[column.field] = e}/>
                      }
                      {/*{this.buildFormEl(column)}*/}
                    </el-form-item>
                  )
                }
              })
            }
          </el-form>
          <div slot="footer">
            <el-button on-click={this.handleCloseDialog.bind(this)}>取 消</el-button>
            <el-button type="primary" loading={this.handleLoading} on-click={this.handleSubmit.bind(this)}>确 定
            </el-button>
          </div>
        </el-dialog>}
      </div>
    )
  }
}
