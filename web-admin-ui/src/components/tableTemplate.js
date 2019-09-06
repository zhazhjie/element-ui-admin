export default {
  name: "table-template",
  props: {
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
    columns: {
      type: Array
    },
    tableData: {
      type: Array
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
    handleClose() {
      this.dialogVisible = false;
      this.resetForm();
    },
    showDialog() {
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
      this.$emit("showDialog",row);
    },
    formComponents(column = {}) {
      let {formItem = {}} = column;
      let {name} = formItem;
      switch (name) {
        case "checkbox":
          return <el-checkbox {...this.vModel(column)}/>;
        case "radio":
          return <el-radio {...this.vModel(column)}/>;
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
          before-close={this.handleClose.bind(this)}
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
                      {...{props: column.formItem ? column.formItem.props : null}}
                      label={column.label}
                      prop={column.field}>
                      {
                        column.formItem && column.formItem.render
                          ?
                          column.formItem.render(this.curRow)
                          :
                          <el-input
                            placeholder={"请输入" + column.label}
                            value={this.curRow[column.field]}
                            on-input={e => this.curRow[column.field] = e}/>
                      }
                      {/*{this.formComponents(column)}*/}
                    </el-form-item>
                  )
                }
              })
            }
          </el-form>
          <div slot="footer">
            <el-button on-click={this.handleClose.bind(this)}>取 消</el-button>
            <el-button type="primary" loading={this.handleLoading} on-click={this.handleSubmit.bind(this)}>确 定
            </el-button>
          </div>
        </el-dialog>}
      </div>
    )
  }
}
