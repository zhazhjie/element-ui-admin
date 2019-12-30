/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-11-05 15:33:58
* @version: 1.0
*/

<template>
  <section>
    <table-template
      ref="table"
      @submitAdd="submitAdd"
      @submitEdit="submitUpdate"
      @showEdit="findParentId"
      :needPage="false"
      :tableProps="{rowKey:'id'}"
      :dialogProps="{width:'500px'}"
      :rules="rules"
      :loading='tableLoading'
      :handleLoading="handleLoading"
      :tableData='permissionTree'
      :columns='columns'
      :handleList='handleList'
      :searchable="false"
      :handlePageChange='listPermission'
      :group="group"
      :page='params'/>
  </section>
</template>

<script>
  import {listPermission, udpObj, addObj, delObj} from '../../api/sys/permission'
  import {getIconList, listToMap, treeDataTranslate} from "../../utils/util";

  export default {
    data() {
      return {
        iconList: [],
        tableLoading: false,
        handleLoading: false,
        curMenu: {
          id: '',
          name: '',
          type: 0,
          permissionFlag: '',
          url: '',
          sort: '',
          hidden: 0,
          icon: '',
          parentId: '',
          parentName: ''
        },
        permissionTree: [],
        selectedPerms: [],
        group: [{title: "默认属性", columnIndex: [4, 1, 2, 7, 6, 5]}, {title: "菜单专用", columnIndex: [3, 8]}],
        columns: [
          {
            label: 'ID',
            field: 'id',
            hideInDialog: true,
            props: {
              width: 220,
              align: 'left'
            }
          },
          {
            label: '名称',
            field: 'name',
          },
          {
            hideInTable: true,
            label: '父节点',
            field: 'parentName',
            formEl: {
              render: row => {
                return (
                  <el-cascader
                    ref="perms"
                    style="width:100%"
                    placeholder="请选择父节点"
                    vModel={this.selectedPerms}
                    on-input={e => this.handleSelectNode(e, row)}
                    props={{
                      props: {
                        label: "name",
                        value: "id",
                        checkStrictly: true,
                        expandTrigger: "hover"
                      }
                    }}
                    options={this.permissionTree}
                    collapse-tags={true}
                  />
                )
              }
            }
          },
          {
            label: '图标',
            field: 'icon',
            render: row => <i class={row.icon}></i>,
            hideInDialog: false,
            formEl: {
              render: (row) => {
                return (<el-select
                  vModel={row.icon}
                  filterable={true}
                  placeholder="请选择图标"
                  style='width:100%'>
                  {this.iconList.map(icon => {
                    return (
                      <el-option
                        key={icon}
                        value={icon}>
                        <i class={icon}></i>
                        <span>{icon}</span>
                      </el-option>
                    )
                  })}
                </el-select>)
              }
            },
          },
          {
            label: '类型',
            field: 'type',
            options: [{value: 0, text: "菜单"}, {value: 1, text: "接口"}],
            render: row => {
              if (row.type === 0) {
                return <el-tag size="small">菜单</el-tag>
              } else {
                return <el-tag size="small" type="info">接口</el-tag>
              }
            },
            formEl: {
              type: "radio",
            }
          },
          {
            label: '排序',
            field: 'sort',
          },
          {
            label: 'URL',
            field: 'url',
            props: {
              showOverflowTooltip: true,
            }
          },
          {
            label: '授权标识',
            field: 'permissionFlag',
            props: {
              showOverflowTooltip: true
            },
            formEl: {
              attrs: {
                placeholder: '授权标识（如：sys:user:add）',
              }
            }
          },
          {
            label: '导航隐藏',
            field: 'hidden',
            hideInTable: true,
            options: [{value: 1, text: "是"}, {value: 0, text: "否"}],
            formEl: {
              type: "radio",
            },
          },
        ],
        handleList: [
          {
            label: '编辑',
            icon: 'el-icon-edit'
          },
          {
            label: '删除',
            icon: 'el-icon-delete',
            click: row => {
              this.handleDelete(row);
            }
          }
        ],
        rules: {
          name: [
            {required: true, message: '请输入权限名称', trigger: 'blur'},
          ],
          permissionFlag: [
            {required: true, message: '请输入授权标识', trigger: 'blur'},
          ]
        },
        params: {
          keyword: '',
          current: 1,
          size: 10,
          total: 10
        }
      }
    },
    components: {},
    methods: {
      listPermission: function () {
        this.tableLoading = true;
        listPermission(this.params).then((res) => {
          this.tableLoading = false;
          this.permissionTree = treeDataTranslate(res.data);
          this.permissionMap = listToMap(res.data);
        })
      },
      handleSelectNode(e, row) {
        for (let i = 0; i < e.length; i++) {
          let perms = this.permissionMap[e[i]];
          if (perms && (perms.id === row.id)) {
            this.selectedPerms = [];
            return this.$message.warning("不能选自己及子节点作为父节点");
          }
        }
        this.selectedPerms = e;
      },
      handleAdd() {
        this.$refs.table.showAdd(this.curMenu);
      },
      handleDelete(row) {
        this.confirm(`确定删除[${row.name}]吗?`).then(() => {
          delObj(id).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.listPermission();
          });
        });
      },
      handleSearch() {
        this.params.current = 1;
        this.listPermission();
      },
      submitAdd(row) {
        this.handleLoading = true;
        row.parentId = this.selectedPerms[this.selectedPerms.length - 1];
        addObj(row).then(() => {
          this.$message({
            type: 'success',
            message: '新增成功!'
          });
          this.listPermission();
          this.handleLoading = false;
          this.$refs.table.closeDialog();
        }).catch(() => {
          this.handleLoading = false;
        });
      },
      submitUpdate(row) {
        this.handleLoading = true;
        row.parentId = this.selectedPerms[this.selectedPerms.length - 1];
        udpObj(row).then(() => {
          this.$message({
            type: 'success',
            message: '更新成功!'
          });
          this.listPermission();
          this.handleLoading = false;
          this.$refs.table.closeDialog();
        }).catch(() => {
          this.handleLoading = false;
        });
      },
      findParentId(row) {
        let result = [];
        let parent = this.permissionMap[row.parentId];
        while (parent) {
          result.unshift(parent.id);
          parent = this.permissionMap[parent.parentId];
        }
        this.selectedPerms = result;
      },
      getIconList() {
        getIconList().then(data => {
          this.iconList = data;
        })
          .catch(err => err)
      },
      handleChangeType(row) {
        if (row.type === 0) {

        } else {

        }
      }
    },
    computed: {},
    mounted() {
      this.listPermission();
      this.getIconList();
    }
  }
</script>

<style scoped>

</style>
