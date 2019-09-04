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
        <el-input placeholder="名称" v-model='params.roleName' :clearable="true"></el-input>
      </el-form-item>
      <el-form-item>
        <permission-btn type='primary' plain @click='handleSearch'>查询</permission-btn>
      </el-form-item>
    </el-form>
    <div style="margin-bottom: 15px;">
      <permission-btn type='primary' @click='handleAdd'>新增</permission-btn>
    </div>
    <table-template
      border
      :loading='tableLoading'
      :data='roleList'
      :columns='columns'
      :handleList='handleList'
      @handleChange='handleChange'
      @handleDelete='handleDelete'
      handlePageFunction='getRoleList'
      :page='params'>
      <!-- <el-table-column label='操作' >
        <template slot-scope="scope">
          <permission-btn>编辑</permission-btn>
        </template>
      </el-table-column> -->
    </table-template>
    <el-dialog
      :title="handleType?'编辑':'新增'"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      width="500px">
      <el-form :model="curRole" label-width="80px" :rules="rules" ref="ruleForm">
        <el-form-item label='名称' prop="roleName">
          <el-input v-model='curRole.roleName' placeholder='请输入角色名称'></el-input>
        </el-form-item>
        <el-form-item label='备注' prop="remark">
          <el-input type="textarea" v-model='curRole.remark' placeholder='请输入备注'></el-input>
        </el-form-item>
        <el-form-item size="mini" label="授权">
          <el-tree
            :data="menuList"
            :props="defaultProps"
            node-key="id"
            ref="menuTree"
            :default-expand-all="false"
            :check-on-click-node="true"
            show-checkbox>
          </el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer">
          <el-button @click="handleClose('')">取 消</el-button>
          <el-button type="primary" @click="handleSubmit('ruleForm')" :loading='handleLoading'>确 定</el-button>
        </span>
    </el-dialog>
  </section>
</template>

<script>
  import {fetchList, getObj, updObj, delObj, addObj} from '@/api/sys/role'
  import {getSimpleTree} from '@/api/sys/menu'
  import {formatTreeData, treeDataTranslate} from '@/js/util'
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        dialogVisible: false,
        tableLoading: false,
        handleLoading: false,
        handleType: 0,
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        roleList: [],
        curRole: {
          roleName: '',
          remark: '',
          menuIdList: []
        },
        menuList: [],
        columns: [{
            name: 'ID',
            field: 'id',
            width: 160
          },
          {
            name: '角色名',
            field: 'roleName',
          },
          {
            name: '备注',
            field: 'remark',
          },
          {
            name: '创建时间',
            field: 'createTime',
          },
        ],
        handleList: [
          {
            name: '编辑',
            type: '',
            handleName: 'handleChange'
          }, {
            name: '删除',
            type: 'danger',
            handleName: 'handleDelete'
          }
        ],
        rules: {
          roleName: [
            {required: true, message: '请输入角色名', trigger: 'blur'},
          ]
        },
        params: {
          roleName: '',
          curPage: 1,
          pageSize: 10,
          totalCount: 0
        },
        refTree: null
      }
    },
    components: {},
    methods: {
      getRoleList() {
        this.tableLoading = true;
        fetchList(this.params).then(res => {
          this.tableLoading = false;
          this.roleList = res.data.list;
          this.params.totalCount = res.data.totalCount;
        })
      },
      handleAdd() {
        this.handleType = 0;
        this.dialogVisible = true;
        this.getSimpleTree();
      },
      handleChange(row, index) {
        this.handleType = 1;
        this.dialogVisible = true;
        getObj(this.roleList[index].id).then(res => {
          this.curRole = res.data;
          this.getSimpleTree();
        });
      },
      handleDelete(row, index) {
        this.$confirm('确定要删除[' + row.roleName + ']吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delObj([row.id]).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getRoleList();
          });
        }).catch(() => {

        });
      },
      handleSearch(curPage) {
        this.params.curPage = curPage;
        this.getRoleList();
      },
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.handleLoading = true;
            if (this.handleType) {
              this.submitUpdate();
            } else {
              this.submitAdd();
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitAdd() {
        if(this.$refs.menuTree){
          let menuList = this.$refs.menuTree.getCheckedNodes().concat(this.$refs.menuTree.getHalfCheckedNodes());
          this.curRole.menuIdList = menuList.map(el => el.id);
        }
        addObj(this.curRole).then(() => {
          this.$message({
            type: 'success',
            message: '新增成功!'
          });
          this.getRoleList();
          this.dialogVisible = false;
          this.handleLoading = false;
        }).catch(() => {
          this.handleLoading = false;
        });
      },
      submitUpdate() {
        if(this.$refs.menuTree){
          let menuList = this.$refs.menuTree.getCheckedNodes().concat(this.$refs.menuTree.getHalfCheckedNodes());
          this.curRole.menuIdList = menuList.map(el => el.id);
        }
        updObj(this.curRole).then(() => {
          this.$message({
            type: 'success',
            message: '更新成功!'
          });
          this.getRoleList();
          this.dialogVisible = false;
          this.handleLoading = false;
        }).catch(() => {
          this.handleLoading = false;
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getSimpleTree() {
        getSimpleTree().then((res) => {
          this.menuList = res.data;
          if(this.handleType == 1){
            let _this = this;
            this.$nextTick(() => {
              for(let i = 0;i < _this.curRole.menuIdList.length;i++){
                let key = _this.curRole.menuIdList[i];
                let node = _this.$refs.menuTree.getNode(key);
                if(node.childNodes.length > 0){
                  continue;
                }
                _this.$refs.menuTree.setChecked(key, true, false);
              }
            })
          }
        })
      },
      handleClose(done) {
        this.dialogVisible = false;
        this.$nextTick(() => {
          this.resetForm('ruleForm');
          this.$refs.menuTree.setCheckedKeys([]);
        })
        if (done) {
          done();
        }
      }
    },
    computed: {
      ...mapState(['userInfo']),
    },
    mounted() {
      this.getRoleList();
    }
  }
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
  }

  .permissions {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    padding: 4px;
  }

  .permissions .el-tag {
    margin: 4px;
  }
  .clear-value{
    position: absolute;
    right: 5px;
    top: 7px;
    cursor: pointer;
  }
</style>
