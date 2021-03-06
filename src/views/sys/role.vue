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
      :data="roleList"
      :config="config"
      :tableLoading="tableLoading"
      :beforeOpen="findParentId"
      @submitAdd="submitAdd"
      @submitEdit="submitUpdate"
      @submitSearch="handleSearch"
      @pageChange='getRoleList'
      :page='params'/>
  </section>
</template>

<script>
  import {listPage, updObj, delObj, addObj} from '../../api/sys/role'
  import {formatTreeData, listToMap, treeDataTranslate} from '../../utils/util'
  import {mapState} from 'vuex'
  import {listPermission} from "../../api/sys/permission";

  export default {
    data() {
      return {
        tableLoading: false,
        roleList: [],
        permissionMap: {},
        permissionTree: [],
        // selectedPerms: [],
        config: {
          dialogProps: {width: '500px'},
          handlerProps: {width: '125px'},
          columns: [
            {
              label: 'ID',
              field: 'id',
              hideInDialog: true,
              hideInSearch: true
            },
            {
              label: '角色名',
              field: 'roleName',
            },
            {
              label: '备注',
              field: 'remark',
              hideInSearch: true
            },
            {
              label: '创建时间',
              field: 'createTime',
              hideInDialog: true,
              hideInSearch: true
            },
            {
              label: '选择权限',
              field: 'selectedPerms',
              hideInTable: true,
              hideInSearch: true,
              options: () => this.permissionTree,
              formEl: {
                type: 'cascader',
                props: {
                  collapseTags: true,
                  props: {
                    label: "name",
                    value: "id",
                    multiple: true,
                    expandTrigger: "hover"
                  },
                },
                attrs: {
                  style: "width:100%"
                }
              }
            }
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
            roleName: [
              {required: true, message: '请输入角色名', trigger: 'blur'},
            ]
          },
        },
        params: {
          keyword: '',
          current: 1,
          size: 10,
          total: 10
        },
      }
    },
    components: {},
    methods: {
      listPermission() {
        this.tableLoading = true;
        listPermission(this.params).then((res) => {
          this.tableLoading = false;
          this.permissionTree = treeDataTranslate(res.data);
          this.permissionMap = listToMap(res.data);
        }).catch(() => this.tableLoading = false);
      },
      getRoleList() {
        this.tableLoading = true;
        listPage(this.params).then(res => {
          this.tableLoading = false;
          res.data.records.forEach(v => v.selectedPerms = []);
          this.roleList = res.data.records;
          this.params.total = res.data.total;
        }).catch(() => this.tableLoading = false);
      },
      handleDelete(row) {
        this.confirm('确定要删除[' + row.roleName + ']吗?').then(() => {
          delObj([row.id]).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getRoleList();
          });
        });
      },
      handleSearch(params) {
        this.params.current = 1;
        this.params = {...this.params, ...params};
        this.getRoleList();
      },
      setPerms(row) {
        let permissionIdList = [];
        row.selectedPerms.forEach(item => {
          permissionIdList.push(...item);
        });
        row.permissionIdList = [...new Set(permissionIdList)];
      },
      submitAdd(row, hideLoading, done) {
        this.setPerms(row);
        addObj(row).then(() => {
          this.$message({
            type: 'success',
            message: '新增成功!'
          });
          this.getRoleList();
          done();
        }).catch(() => hideLoading());
      },
      submitUpdate(row, hideLoading, done) {
        this.setPerms(row);
        updObj(row).then(() => {
          this.$message({
            type: 'success',
            message: '更新成功!'
          });
          this.getRoleList();
          done();
        }).catch(() => hideLoading());
      },
      findParentId(row, done) {
        if (row) {
          let result = [];
          let index = 0;
          let permissionIdList = row.permissionIdList || [];
          permissionIdList.forEach((permissionId, i) => {
            if (!result[index]) {
              result[index] = [];
            }
            let permission = this.permissionMap[permissionId];
            if (!permission) return;
            result[index].push(permission.id);
            let parent = this.permissionMap[permission.parentId];
            while (parent) {
              result[index].unshift(parent.id);
              parent = this.permissionMap[parent.parentId];
            }
            index++;
          });
          row.selectedPerms = result;
        }
        done();
      },
    },
    computed: {
      ...mapState(['userInfo']),
    },
    mounted() {
      this.listPermission();
      this.getRoleList();
    }
  }
</script>

<style scoped>

</style>
