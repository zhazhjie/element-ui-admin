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
      :data="permissionTree"
      :config="config"
      :tableLoading="tableLoading"
      @submitAdd="submitAdd"
      @submitEdit="submitUpdate"
      @showEdit="findParentId"
      @selectedPermsChangeInForm='handleSelectNode'
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
        permissionMap: {},
        permissionTree: [],
        // selectedPerms: [],
        config: {
          pageable: false,
          searchable: false,
          tableProps: {rowKey: 'id'},
          dialogProps: {width: '500px'},
          handlerProps: {width: '125px'},
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
              field: 'selectedPerms',
              options: () => this.permissionTree,
              formEl: {
                type: 'cascader',
                props: {
                  collapseTags: true,
                  props: {
                    label: "name",
                    value: "id",
                    checkStrictly: true,
                    expandTrigger: "hover"
                  },
                },
                attrs: {
                  style: "width:100%"
                },
              }
            },
            {
              label: '图标',
              field: 'icon',
              render: row => <i class={row.icon}></i>,
              options: () => this.iconList,
              hideInDialog: false,
              formEl: {
                type: 'select',
                props: {
                  filterable: true,
                },
                attrs: {
                  style: "width:100%"
                },
                select: {
                  render: (row) => {
                    return (
                      <span>
                        <i style="margin-right: 5px" class={row}></i>
                        <span>{row}</span>
                      </span>
                    )
                  }
                }
              },
            },
            {
              label: '类型',
              field: 'type',
              value: 0,
              options: [{value: 0, text: "菜单"}, {value: 1, text: "接口"}],
              type: 'tag',
              stateMapping: {
                0: "primary",
                1: "info"
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
              value: 0,
              options: [{value: 1, text: "是"}, {value: 0, text: "否"}],
              formEl: {
                type: "radio",
              },
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
        },
        params: {
          current: 1,
          size: 10,
          total: 10
        }
      }
    },
    components: {},
    methods: {
      listPermission() {
        this.tableLoading = true;
        listPermission(this.params).then((res) => {
          res.data.forEach(v => v.selectedPerms = []);
          this.tableLoading = false;
          this.permissionTree = treeDataTranslate(res.data);
          this.permissionMap = listToMap(res.data);
        }).catch(() => this.tableLoading = false);
      },
      handleSelectNode(row, val) {
        for (let i = 0; i < val.length; i++) {
          let perms = this.permissionMap[val[i]];
          if (perms && (perms.id === row.id)) {
            row.selectedPerms = [];
            return this.$message.warning("不能选自己及子节点作为父节点");
          }
        }
        row.selectedPerms = val;
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
      submitAdd(row, hideLoading, done) {
        row.parentId = row.selectedPerms[row.selectedPerms.length - 1];
        addObj(row).then(() => {
          this.$message({
            type: 'success',
            message: '新增成功!'
          });
          this.listPermission();
          done();
        }).catch(() => hideLoading());
      },
      submitUpdate(row, hideLoading, done) {
        row.parentId = row.selectedPerms[row.selectedPerms.length - 1];
        udpObj(row).then(() => {
          this.$message({
            type: 'success',
            message: '更新成功!'
          });
          this.listPermission();
          done();
        }).catch(() => hideLoading());
      },
      findParentId(row) {
        let result = [];
        let parent = this.permissionMap[row.parentId];
        while (parent) {
          result.unshift(parent.id);
          parent = this.permissionMap[parent.parentId];
        }
        row.selectedPerms = result;
      },
      getIconList() {
        getIconList().then(data => {
          this.iconList = data;
        })
          .catch(err => err)
      },
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
