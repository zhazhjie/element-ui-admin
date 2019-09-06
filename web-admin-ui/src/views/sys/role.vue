/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-11-05 15:33:58
* @version: 1.0
*/

<template>
  <section>
    <el-form :inline="true">
      <el-form-item>
        <el-input placeholder="角色名称" v-model='params.keyword' :clearable="true"></el-input>
      </el-form-item>
      <el-form-item>
        <permission-btn type='primary' plain @click='handleSearch'>查询</permission-btn>
      </el-form-item>
    </el-form>
    <div style="margin-bottom: 15px;">
      <permission-btn type='primary' @click='handleAdd'>新增</permission-btn>
    </div>
    <table-template
      ref="table"
      :dialogProps="{width:'500px'}"
      :loading='tableLoading'
      :tableData='roleList'
      :columns='columns'
      :handleList='handleList'
      :handlePageChange='getRoleList'
      @submit="handleSubmit"
      :page='params'/>
    <!--<el-dialog-->
      <!--:title="handleType?'编辑':'新增'"-->
      <!--:visible.sync="dialogVisible"-->
      <!--:before-close="handleClose"-->
      <!--:close-on-click-modal="false"-->
      <!--width="500px">-->
      <!--<el-form :model="curRole" label-width="80px" :rules="rules" ref="ruleForm">-->
        <!--<el-form-item label='名称' prop="roleName">-->
          <!--<el-input v-model='curRole.roleName' placeholder='请输入角色名称'></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label='备注' prop="remark">-->
          <!--<el-input type="textarea" v-model='curRole.remark' placeholder='请输入备注'></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item size="mini" label="授权">-->
          <!--<el-tree-->
            <!--:data="permissionList"-->
            <!--:props="defaultProps"-->
            <!--node-key="id"-->
            <!--ref="permissionTree"-->
            <!--:default-expand-all="false"-->
            <!--:check-on-click-node="true"-->
            <!--show-checkbox>-->
          <!--</el-tree>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<span slot="footer">-->
          <!--<el-button @click="handleClose('')">取 消</el-button>-->
          <!--<el-button type="primary" @click="handleSubmit('ruleForm')" :loading='handleLoading'>确 定</el-button>-->
        <!--</span>-->
    <!--</el-dialog>-->
  </section>
</template>

<script>
  import {listPage, getObj, updObj, delObj, addObj} from '../../api/sys/role'
  import {formatTreeData, treeDataTranslate} from '../../js/util'
  import {mapState} from 'vuex'
  import {listMenu} from "../../api/sys/menu";

  export default {
    data() {
      return {
        dialogVisible: false,
        tableLoading: false,
        handleLoading: false,
        permsVisible: false,
        handleType: 0,
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        roleList: [],
        curRole: {
          roleName: '',
          remark: '',
          permissionIdList: []
        },
        permissionList: [],
        columns: [
          {
            label: 'ID',
            field: 'id',
            hiddenInDialog: true
          },
          {
            label: '角色名',
            field: 'roleName',
          },
          {
            label: '备注',
            field: 'remark',
          },
          {
            label: '创建时间',
            field: 'createTime',
            hiddenInDialog: true
          },
          {
            label: '选择权限',
            field: 'permissionIdList',
            hiddenInTable: true,
            formItem: {
              render: row => {
                return (
                  <el-cascader
                    ref="perms"
                    style="width:100%"
                    placeholder="请选择权限"
                    value={row.permissionIdList}
                    on-input={e=>this.handleInput(e,row)}
                    // on-change={this.handleSelectNode.bind(this,row)}
                    props={{
                      label: "name",
                      value: "id",
                      multiple: true,
                      expandTrigger: "hover"
                    }}
                    options={this.permissionList}
                    collapse-tags/>
                )
              }
            }
          }
        ],
        handleList: [
          {
            label: '编辑'
          },
          {
            label: '删除',
            props: {
              type: 'danger'
            },
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
        params: {
          keyword: '',
          current: 1,
          size: 10,
          total: 10
        },
        refTree: null
      }
    },
    components: {},
    methods: {
      handleInput(e,row){
        console.log(e)
        row.permissionIdList=e;
      },
      listPermission () {
        this.tableLoading = true;
        listMenu(this.params).then((res) => {
          this.tableLoading = false;
          this.permissionList = treeDataTranslate(res.data);
        })
      },
      getRoleList() {
        this.tableLoading = true;
        listPage(this.params).then(res => {
          this.tableLoading = false;
          this.roleList = res.data.records;
          this.params.total = res.data.total;
        })
      },
      handleAdd() {
        this.handleType = 0;
        this.dialogVisible = true;
        this.getSimpleTree();
      },
      handleDelete(row, index) {
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
      handleSearch() {
        this.params.current = 1;
        this.getRoleList();
      },
      handleSubmit(row) {
        let table=this.$refs.table;
            if (table.handleType) {
              this.submitUpdate(row);
            } else {
              this.submitAdd(row);
            }
      },
      submitAdd(row) {
        addObj(row).then(() => {
          this.$message({
            type: 'success',
            message: '新增成功!'
          });
          this.getRoleList();
          this.$refs.table.handleClose();
          this.handleLoading = false;
        }).catch(() => {
          this.handleLoading = false;
        });
      },
      submitUpdate(row) {
        updObj(row).then(() => {
          this.$message({
            type: 'success',
            message: '更新成功!'
          });
          this.getRoleList();
          this.$refs.table.handleClose();
          this.handleLoading = false;
        }).catch(() => {
          this.handleLoading = false;
        });
      },
      handleSelectNode(row){
        let permissionList=this.$refs.perms.getCheckedNodes(false);
        row.permissionIdList=permissionList.map(v=>v.value);
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
