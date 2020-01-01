export default {
  name: "table-template",
  props: {
    data: {
      type: Array,
      required: true
    },
    config: {
      type: Object,
      required: true,
      default: () => ({
        columns: [],
        handleList: [],
        rules: {},
        tableProps: {},
        handleProps: {},
        dialogProps: {},
        formProps: {},
        group: [],
        pageable: true,
        withoutDialog: false,
        selectable: false,
        searchable: true,
        showAdd: true,
      })
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
    tableLoading: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      dialogTitle: "",
      dialogVisible: false,
      handleLoading: false,
      // tableLoading: false,
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
      this.tableLoading = true;
      this.page.size = pageSize;
      // this.handlePageChange();
      this.$emit("pageChange");
    },
    handleCurrentChange(curPage) {
      this.tableLoading = true;
      this.page.current = curPage;
      // this.handlePageChange();
      this.$emit("pageChange");
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // console.log(this.curRow);
          this.handleLoading = true;
          this.$emit(this.handleType ? "submitEdit" : "submitAdd", this.curRow, this.hideLoading, this.done);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    hideLoading() {
      this.handleLoading = false;
    },
    closeDialog() {
      this.dialogVisible = false;
      this.resetForm();
    },
    done() {
      this.hideLoading();
      this.closeDialog();
    },
    showAdd(defaultRow, dialogTitle = "新增") {
      this.handleType = 0;
      this.dialogTitle = dialogTitle;
      this.dialogVisible = true;
      let curRow = {};
      this.config.columns.forEach(column => {
        curRow[column.field] = column.value
      });
      this.curRow = curRow;
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
      this.showAdd(this.data[0] || {});
    },
    handleSelectionChange(rows) {
      this.$emit("selectionChange", rows);
    },
    createEl(column = {}, scope = {}, row = {}) {
      let {options = [], defaultProp = {value: "value", text: "text"}} = column;
      let {type, props = {}, attrs = {}} = scope;
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
        case "tag":
          let field = row[column.field];
          let option = column.options ? column.options.find(v => v[defaultProp.value] === field) : {};
          return (
            <el-tag type={column.stateMapping && column.stateMapping[field]}>{option[defaultProp.text]}</el-tag>
          );
        default:
          let placeholder = "请输入" + column.label;
          return <el-input placeholder={placeholder} {...data} vModel={row[column.field]}/>
      }
    },
    getFormItem(column) {
      let {props = {}} = column.formItem || {};
      let {rowNum = 1} = props;
      if (!column || column.hideInDialog) {
        return null;
      } else {
        return (
          <el-col span={24 / rowNum}>
            <el-form-item
              label={column.label}
              {...{props}}
              prop={column.field}>
              {
                this.getEl(column, column.formEl || {}, this.curRow, "Form")
              }
            </el-form-item>
          </el-col>
        )
      }
    },
    getEl(column, scope, row, suffix, custom) {
      let {render} = scope;
      if (render) {
        return render(row);
      } else if (this.$scopedSlots[column.field + suffix]) {
        return this.$scopedSlots[column.field + suffix](row);
      } else if (custom) {
        return custom(row);
      } else {
        return this.createEl(column, scope || {}, row);
      }
    }
  },
  render() {
    let dialogColumns = [];
    let {
      columns = [],
      handleList = [],
      rules = {},
      tableProps = {},
      handleProps = {},
      dialogProps = {},
      formProps = {},
      group = [],
      pageable = true,
      withoutDialog = false,
      selectable = false,
      searchable = true,
      showAdd = true,
      addPermission = ""
    } = this.config;
    if (group.length) {
      group.forEach((item, i) => {
        dialogColumns.push({
          title: item.title,
          columnIndex: item.columnIndex.map(v => columns[v])
        })
      });
    } else {
      dialogColumns = columns;
    }
    return (
      <section>
        {searchable &&
        <el-form inline="true">
          {
            columns.map(column => {
              if (column.hideInSearch) {
                return null;
              } else {
                return (
                  <el-form-item label={column.label}>
                    {this.getEl(column, column.searchEl || column.formEl || {}, this.searchForm, "Search")}
                  </el-form-item>
                )
              }
            })
          }
          <el-form-item>
            <permission-btn type='primary' plain on-click={this.handleSearch.bind(this)}>查询</permission-btn>
            {this.$scopedSlots.search && this.$scopedSlots.search()}
          </el-form-item>
        </el-form>
        }
        <el-form>
          <el-form-item>
            {showAdd &&
            <permission-btn permission={addPermission} type='primary'
                            on-click={this.handleAdd.bind(this)}>新增</permission-btn>}
            {this.$scopedSlots.add && this.$scopedSlots.add()}
          </el-form-item>
        </el-form>
        <el-table
          style="width: 100%"
          v-loading={this.tableLoading}
          data={this.data}
          {...{props: tableProps}}
          border
          on-selection-change={this.handleSelectionChange.bind(this)}
        >
          {selectable && <el-table-column type="selection" align="center" width="50"/>}
          {
            columns.map(column => {
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
                        let {type} = column;
                        return this.getEl(column, column, scope.row, "", !type ? () => {
                          let field = scope.row[column.field];
                          return (
                            <span attrs={column.attrs}>
                              {column.format ? column.format(field) : field}
                            </span>
                          )
                        } : null);
                      }
                    }}/>
                )
              }
            })
          }
          {
            (handleList.length || this.$scopedSlots["handler"]) &&
            <el-table-column
              label="操作"
              fixed="right"
              header-align="center"
              {...{props: handleProps}}
              width={handleList.length * 60}
              scopedSlots={{
                default: scope => {
                  if (handleList.length) {
                    return handleList.map(item => {
                      if (item.render) {
                        return item.render(scope.row);
                      } else {
                        return (
                          <permission-btn
                            permission={item.permission}
                            type="text"
                            icon={item.icon}
                            {...{props: item.props}}
                            on-click={item.click ? item.click.bind(this, scope.row) : this.handleClick.bind(this, scope.row)}>
                            {item.label}
                          </permission-btn>
                        )
                      }
                    });
                  } else {
                    let handler = this.$scopedSlots["handler"];
                    return handler && handler(scope.row);
                  }
                }
              }}/>
          }
        </el-table>
        {pageable &&
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
        {!withoutDialog &&
        <el-dialog
          title={this.dialogTitle}
          visible={this.dialogVisible}
          before-close={this.closeDialog.bind(this)}
          close-on-click-modal={false}
          {...{props: dialogProps}}
          width="800px">
          <el-form
            label-width="80px"
            props={{
              model: this.curRow,
              ...formProps
            }}
            rules={rules}
            ref="form">
            {
              dialogColumns.map((column, i) => {
                if (column.columnIndex) {
                  return (
                    <div>
                      {column.title && <div class="item-title">{column.title}</div>}
                      {column.columnIndex.map(c => {
                        return this.getFormItem(c);
                      })}
                    </div>
                  )
                } else {
                  return this.getFormItem(column);
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
      </section>
    )
  }
}
