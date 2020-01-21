/**
 * @author: zzj
 * @date: 2019-12-30 16:05:26
 * @version: 1.0
 * 表格模版
 * 生成表格+分页+弹出层表单+搜索栏
 * 详见文档
 */
import "./tableTemplate.css";

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
        mode: "dialog",
        columns: [],
        handlerList: [],
        rules: {},
        tableProps: {},
        handlerProps: {},
        dialogProps: {},
        formProps: {},
        group: [],
        pageable: true,
        withoutDialog: false,
        withoutTable: false,
        selectable: false,
        searchable: true,
        showAddBtn: true,
        addBtnPermission: ""
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
      handleType: 0,  //0新增，1编辑，2查看
      curRow: {},
      searchForm: {},
      showAll: false,
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
      this.$emit("pageChange");
      this.$emit("page-change");
    },
    handleCurrentChange(curPage) {
      this.page.current = curPage;
      this.$emit("pageChange");
      this.$emit("page-change");
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // console.log(this.curRow);
          this.handleLoading = true;
          this.$emit(this.handleType ? "submitEdit" : "submitAdd", this.curRow, this.hideLoading, this.done);
          this.$emit(this.handleType ? "submit-edit" : "submit-add", this.curRow, this.hideLoading, this.done);
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
      this.$emit("closeDialog");
      this.$emit("close-dialog");
      this.dialogVisible = false;
      this.resetForm();
    },
    done() {
      this.hideLoading();
      this.closeDialog();
    },
    showAdd(dialogTitle = "新增") {
      this.$emit("showAdd");
      this.$emit("show-add");
      this.handleType = 0;
      this.dialogTitle = dialogTitle;
      this.dialogVisible = true;
      let curRow = {};
      this.config.columns.forEach(column => {
        curRow[column.field] = column.value;
      });
      this.curRow = curRow;
    },
    showEdit(row, dialogTitle = "编辑") {
      this.$emit("showEdit", row);
      this.$emit("show-edit", row);
      this.handleType = 1;
      this.dialogTitle = dialogTitle;
      this.curRow = this.copy(row);
      this.dialogVisible = true;
    },
    showView(row, dialogTitle = "查看") {
      this.$emit("showView", row);
      this.$emit("show-view", row);
      this.handleType = 2;
      this.dialogTitle = dialogTitle;
      this.curRow = this.copy(row);
      this.dialogVisible = true;
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    handleClick(event, row) {
      let events = ["showAdd", "showView", "showEdit"];
      if (events.indexOf(event) > -1) {
        this[event](row);
      } else {
        this.showEdit(row);
      }
    },
    handleSearch() {
      this.$emit("submitSearch", this.searchForm);
      this.$emit("submit-search", this.searchForm);
    },
    handleAdd() {
      this.showAdd();
    },
    handleSelectionChange(rows) {
      this.$emit("selectionChange", rows);
      this.$emit("selection-change", rows);
    },
    handleRowClick(row) {
      this.$emit("rowClick", row);
      this.$emit("row-click", row);
    },
    formElChange(field, suffix, row, val) {
      this.$emit(field + "Change" + (suffix ? "In" + suffix : ""), row, val);
      this.$emit(field + "-change" + (suffix ? "-in-" + suffix.toLowerCase() : ""), row, val);
    },
    handleSlide() {
      this.showAll = !this.showAll;
    },
    toCapitalize(val) {
      if (!val) return "";
      return val.substring(0, 1).toUpperCase() + val.substring(1);
    },
    createEl(column = {}, scope = {}, row = {}, disabled = false, suffix) {
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
          if (options.length <= 1) {
            return (
              <el-checkbox
                on-change={this.formElChange.bind(this, column.field, suffix, row)}
                {...data}
                disabled={disabled}
                vModel={row[column.field]}>
                {this.getEl(column, scope[type] || {}, options[0], suffix + this.toCapitalize(type), () => getItemVal(options[0], defaultProp.text))}
              </el-checkbox>
            );
          } else {
            return (
              <el-checkbox-group
                on-change={this.formElChange.bind(this, column.field, suffix, row)}
                {...data}
                disabled={disabled}
                vModel={row[column.field]}>
                {options.map(item => {
                  return (
                    <el-checkbox
                      label={getItemVal(item, defaultProp.value)}>
                      {this.getEl(column, scope[type] || {}, item, suffix + this.toCapitalize(type), () => getItemVal(item, defaultProp.text))}
                    </el-checkbox>
                  )
                })}
              </el-checkbox-group>
            );
          }
        case "radio":
          return (
            <el-radio-group
              on-change={this.formElChange.bind(this, column.field, suffix, row)}
              {...data}
              disabled={disabled}
              vModel={row[column.field]}>
              {options.map(item => {
                return (
                  <el-radio
                    label={getItemVal(item, defaultProp.value)}>
                    {this.getEl(column, scope[type] || {}, item, suffix + this.toCapitalize(type), () => getItemVal(item, defaultProp.text))}
                  </el-radio>
                )
              })}
            </el-radio-group>
          );
        case "select":
          return (
            <el-select
              on-change={this.formElChange.bind(this, column.field, suffix, row)}
              placeholder={"请选择" + column.label}
              {...data}
              disabled={disabled}
              vModel={row[column.field]}>
              {options.map(item => {
                return (
                  <el-option
                    key={getItemVal(item, defaultProp.value)}
                    value={getItemVal(item, defaultProp.value)}>
                    {this.getEl(column, scope[type] || {}, item, suffix + this.toCapitalize(type), () => getItemVal(item, defaultProp.text))}
                  </el-option>
                )
              })}
            </el-select>
          );
        case "switch":
          return (
            <el-switch
              on-change={this.formElChange.bind(this, column.field, suffix, row)}
              {...data}
              disabled={disabled}
              vModel={row[column.field]}>
            </el-switch>
          );
        case "tag":
          let field = row[column.field];
          let option = (column.options || []).find(item => getItemVal(item, defaultProp.value) === field) || {};
          return (
            <el-tag
              type={column.stateMapping && column.stateMapping[field]}>{getItemVal(option, defaultProp.text)}</el-tag>
          );
        case "date-picker":
          return (
            <el-date-picker
              on-change={this.formElChange.bind(this, column.field, suffix, row)}
              placeholder={"请选择" + column.label}
              {...data}
              disabled={disabled}
              vModel={row[column.field]}>
            </el-date-picker>
          );
        case "time-picker":
          return (
            <el-time-picker
              on-change={this.formElChange.bind(this, column.field, suffix, row)}
              placeholder={"请选择" + column.label}
              {...data}
              disabled={disabled}
              vModel={row[column.field]}>
            </el-time-picker>
          );
        case "time-select":
          return (
            <el-time-select
              on-change={this.formElChange.bind(this, column.field, suffix, row)}
              placeholder={"请选择" + column.label}
              {...data}
              disabled={disabled}
              vModel={row[column.field]}>
            </el-time-select>
          );
        case "input-number":
          return (
            <el-input-number
              {...data}
              disabled={disabled}
              vModel={row[column.field]}>
            </el-input-number>
          );
        case "slider":
          return (
            <el-slider
              on-change={this.formElChange.bind(this, column.field, suffix, row)}
              {...data}
              disabled={disabled}
              vModel={row[column.field]}>
            </el-slider>
          );
        case "rate":
          return (
            <el-rate
              on-change={this.formElChange.bind(this, column.field, suffix, row)}
              {...data}
              disabled={disabled}
              vModel={row[column.field]}>
            </el-rate>
          );
        case "color-picker":
          return (
            <el-color-picker
              on-change={this.formElChange.bind(this, column.field, suffix, row)}
              {...data}
              disabled={disabled}
              vModel={row[column.field]}>
            </el-color-picker>
          );
        case "cascader":
          return (
            <el-cascader
              on-change={this.formElChange.bind(this, column.field, suffix, row)}
              placeholder={"请选择" + column.label}
              {...data}
              options={options}
              disabled={disabled}
              vModel={row[column.field]}>
            </el-cascader>
          );
        case "upload":
          return (
            <el-upload
              {...data}
              disabled={disabled}>
              {this.getEl(column, scope.upload || {}, row, suffix + this.toCapitalize(type), () => <el-button
                type="primary">上传</el-button>)}
              {this.getEl(column, scope.uploadTip || {}, row, suffix + this.toCapitalize(type) + "Tip", () => null)}
            </el-upload>
          );
        default:
          return (
            <el-input
              placeholder={"请输入" + column.label}
              {...data}
              disabled={disabled}
              vModel={row[column.field]}/>
          );
      }
    },
    createFormItem(column) {
      let {props = {}, append, span} = column.formItem || {};
      if (!column || column.hideInDialog) {
        return null;
      } else {
        return (
          <el-col span={span}>
            <el-form-item
              label={column.label}
              {...{props}}
              prop={column.field}>
              {this.getEl(column, column.formEl || {}, this.curRow, "Form", null, this.handleType === 2)}
            </el-form-item>
            {append && append(this.curRow)}
          </el-col>
        )
      }
    },
    getEl(column, scope, row, suffix, customRender, disabled) {
      let {render} = scope;
      if (render) {
        return render(row);
      } else if (this.$scopedSlots[column.field + suffix]) {
        return this.$scopedSlots[column.field + suffix](row);
      } else if (customRender) {
        return customRender(row);
      } else {
        return this.createEl(column, scope || {}, row, disabled, suffix);
      }
    },
    createDrawer(dialogColumns) {
      let {dialogProps = {}} = this.config;
      return (
        <el-drawer
          title={this.dialogTitle}
          visible={this.dialogVisible}
          before-close={this.closeDialog.bind(this)}
          close-on-click-modal={false}
          {...{props: dialogProps}}
          size="800px">
          {this.createForm(dialogColumns)}
          <div class="el-drawer-footer">
            <el-button on-click={this.closeDialog.bind(this)}>取 消</el-button>
            {this.handleType !== 2 &&
            <el-button type="primary" loading={this.handleLoading} on-click={this.handleSubmit.bind(this)}>确 定
            </el-button>}
          </div>
        </el-drawer>
      )
    },
    createDialog(dialogColumns) {
      let {dialogProps = {}} = this.config;
      return (
        <el-dialog
          title={this.dialogTitle}
          visible={this.dialogVisible}
          before-close={this.closeDialog.bind(this)}
          close-on-click-modal={false}
          {...{props: dialogProps}}
          width="800px">
          {this.createForm(dialogColumns)}
          <div slot="footer">
            <el-button on-click={this.closeDialog.bind(this)}>取 消</el-button>
            {this.handleType !== 2 &&
            <el-button type="primary" loading={this.handleLoading} on-click={this.handleSubmit.bind(this)}>确 定
            </el-button>}
          </div>
        </el-dialog>
      )
    },
    createForm(dialogColumns) {
      let {formProps = {}, rules = {}} = this.config;
      return (
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
                  <div class="group-item">
                    {column.title && <div class="item-title">{column.title}</div>}
                    {column.columnIndex.map(c => {
                      return this.createFormItem(c);
                    })}
                  </div>
                )
              } else {
                return this.createFormItem(column);
              }
            })
          }
        </el-form>
      )
    }
  },
  render() {
    let dialogColumns = [];
    let {
      mode = "dialog",
      columns = [],
      handlerList = [],
      rules = {},
      tableProps = {},
      handlerProps = {},
      dialogProps = {},
      formProps = {},
      searchFormProps = {},
      group = [],
      pageable = true,
      withoutDialog = false,
      withoutTable = false,
      selectable = false,
      searchable = true,
      showAddBtn = true,
      showIndex = false,
      addBtnPermission = ""
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
      <section class="table-template">
        {searchable &&
        <div class="search-bar-wrapper">
          <el-form
            class="search-bar-form"
            inline={true}
            label-width="80px"
            {...{props: searchFormProps}}>
            {
              columns.map(column => {
                if (column.hideInSearch) {
                  return null;
                } else {
                  let {props = {}, append} = column.searchFormItem || {};
                  return (
                    <el-form-item label={column.label} style="width:250px" {...{props: props}}>
                      {this.getEl(column, column.searchEl || column.formEl || {}, this.searchForm, "Search")}
                      {append && append(this.searchForm)}
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
          {/*<i class={"el-icon-d-arrow-right slide-btn "+(this.showAll?"down":"")} on-click={this.handleSlide.bind(this)}></i>*/}
        </div>
        }
        <el-form>
          <el-form-item>
            {showAddBtn &&
            <permission-btn permission={addBtnPermission} type='primary'
                            on-click={this.handleAdd.bind(this)}>新增</permission-btn>}
            {this.$scopedSlots.add && this.$scopedSlots.add()}
          </el-form-item>
        </el-form>
        <div class="table-template-content">
          {this.$scopedSlots.tableLeft && this.$scopedSlots.tableLeft()}
          {!withoutTable &&
          <el-table
            class="table-template-table"
            highlight-current-row
            v-loading={this.tableLoading}
            data={this.data}
            {...{props: tableProps}}
            border
            on-selection-change={this.handleSelectionChange.bind(this)}
            on-row-click={this.handleRowClick.bind(this)}
          >
            {selectable && <el-table-column type="selection" align="center" width="50"/>}
            {showIndex && <el-table-column type="index" align="center" width="50"/>}
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
                        },
                        header: scope => {
                          let {header = {}} = column;
                          return this.getEl(column, header, scope.row, "Header", () => {
                            return column.label;
                          });
                        }
                      }}/>
                  )
                }
              })
            }
            {
              (handlerList.length || this.$scopedSlots["handlerList"]) &&
              <el-table-column
                label="操作"
                fixed="right"
                header-align="center"
                {...{props: handlerProps}}
                scopedSlots={{
                  default: scope => {
                    if (handlerList.length) {
                      return handlerList.map(item => {
                        if (item.render) {
                          return item.render(scope.row);
                        } else {
                          return (
                            <permission-btn
                              permission={item.permission}
                              type="text"
                              icon={item.icon}
                              {...{props: item.props}}
                              on-click={item.click ? item.click.bind(this, scope.row) : this.handleClick.bind(this, item.event, scope.row)}>
                              {item.label}
                            </permission-btn>
                          )
                        }
                      });
                    } else {
                      let handler = this.$scopedSlots["handlerList"];
                      return handler && handler(scope.row);
                    }
                  }
                }}/>
            }
          </el-table>}
          {this.$scopedSlots.tableRight && this.$scopedSlots.tableRight()}
        </div>
        {pageable &&
        <el-pagination
          style='margin-top: 20px;text-align:right'
          on-size-change={this.handleSizeChange}
          on-current-change={this.handleCurrentChange}
          current-page={+this.page.current}
          page-sizes={this.page.sizes}
          page-size={+this.page.size}
          total={+this.page.total}
          layout="total, sizes, prev, pager, next, jumper"/>
        }
        {!withoutDialog &&
        (mode === "dialog" ? this.createDialog(dialogColumns) : this.createDrawer(dialogColumns))
        }
      </section>
    )
  }
}
