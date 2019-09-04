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
        <el-input placeholder="登录账号" v-model='params.username'></el-input>
      </el-form-item>
      <el-form-item>
        <permission-btn type='primary' plain @click='handleSearch'>查询</permission-btn>
      </el-form-item>
    </el-form>
    <div style="margin-bottom: 15px;">
      <permission-btn permission='sys:user:add' type='primary' @click='handleAdd'>新增</permission-btn>
    </div>
    <table-template
      border
      :loading='tableLoading'
      :data='userList'
      :columns='columns'
      :handleList='handleList'
      @handleResetPwd='handleResetPwd'
      @handleChange='handleChange'
      @handleDelete='handleDelete'
      handlePageFunction='fetchList'
      :page='params'>
    </table-template>
    <el-dialog
      :title="handleType?'编辑':'新增'"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      width="500px">
      <el-form :model="curUser" label-width="80px" :rules="rules" ref="ruleForm">
        <el-form-item label='登录账号' prop="username">
          <el-input v-model='curUser.username' placeholder='请输入登录账号'></el-input>
        </el-form-item>
        <el-form-item v-if="!handleType" label='密码' prop="password">
          <el-input type='password' v-model='curUser.password' placeholder='请输入密码'></el-input>
        </el-form-item>
        <el-form-item label='手机号' prop="phone">
          <el-input v-model='curUser.phone' placeholder='请输入手机号'></el-input>
        </el-form-item>
        <el-form-item label='邮箱' prop="email">
          <el-input v-model='curUser.email' placeholder='请输入邮箱号码'></el-input>
        </el-form-item>
        <el-form-item label='角色' prop="roleIdList">
          <el-select
            v-model="curUser.roleIdList"
            multiple
            default-first-option
            placeholder="请选择角色"
            style='width:100%'>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="curUser.state" style='width:100%'>
            <el-option
              v-for="item in [{label:'正常',value:0},{label:'禁用',value:1}]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
  import {fetchList, getObj, updObj, addObj, resetPwd, delObj} from '@/api/sys/user'
  import {roleList} from '@/api/sys/role'

  export default {
    data() {
      let validateStringIsIncludeBlank = function(rule, value, callback) {
        if(value == ""){
          return false;
        }
        if (value.indexOf(" ") > -1) {
          callback(new Error('密码不能包含空格!'));
        } else {
          callback();
        }
      };
      return {
        dialogVisible: false,
        tableLoading: false,
        handleLoading: false,
        handleType: 0,
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        userList: [],
        curUser: {
          name: '',
          type: '',
          mobile: '',
          email: '',
          roleIdList: [],
          state: 0
        },
        roleList: [],
        columns: [{
          name: 'ID',
          field: 'id',
          width: 160
        },
          {
            name: '登录账号',
            field: 'username',
          },
          {
            name: '手机',
            field: 'phone',
          },
          {
            name: '状态',
            field: 'state',
            showText: {
              0: {name: '正常', type: 'success'},
              1: {name: '禁用', type: 'danger'},
            },
          },
          {
            name: '创建时间',
            field: 'createTime'
          }
        ],
        handleList: [
          {
            name: '重置密码',
            type: '',
            handleName: 'handleResetPwd',
          },
          {
            name: '编辑',
            type: '',
            handleName: 'handleChange',
          }, {
            name: '删除',
            type: 'danger',
            handleName: 'handleDelete'
          }
        ],
        rules: {
          username: [
            {required: true, message: '请输入登录账号', trigger: 'blur'},
            {validator: validateStringIsIncludeBlank, trigger: 'blur', message: "登录账号不能包含空格"}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, message: '密码长度必须6位或者6位以上', trigger: 'blur'},
            {validator: validateStringIsIncludeBlank, trigger: 'blur'}
          ],
        },
        params: {
          username: '',
          curPage: 1,
          pageSize: 10,
          totalCount: 0
        }
      }
    },
    components: {},
    methods: {
      fetchList() {
        this.tableLoading = true;
        fetchList(this.params).then(res => {
          this.tableLoading = false;
          this.userList = res.data.list;
          this.params.totalCount = res.data.totalCount || 0;
        })
      },
      getRoleList() {
        roleList().then(res => {
          this.roleList = res.data;
        });
      },
      handleAdd() {
        this.handleType = 0;
        this.dialogVisible = true;
        for (let key in this.curUser) {
          this.curUser[key] = '';
        }
        this.curUser.roleIdList=[]
        this.curUser.state = 0;
      },
      handleResetPwd(row, index) {
        this.$confirm('确定要重置[' + row.username + ']的密码吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resetPwd(row.id).then(() => {
            this.$message({
              type: 'success',
              message: '密码重置成功!'
            });
          });
        }).catch(() => {

        });
      },
      handleChange(row, index) {
        this.handleType = 1;
        this.dialogVisible = true;
        getObj(this.userList[index].id).then(res => {
          this.curUser = res.data;
        });
        // this.curUser.roles = this.curUser.roles.map(el => el.roleId);
      },
      handleDelete(row, index) {
        //this.curUser=Object.assign({},this.userList[index]);
        this.$confirm('确定要删除[' + row.username + ']吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delObj([row.id]).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.fetchList();
          });
        }).catch(() => {

        });
      },
      handleSearch(curPage) {
        this.params.curPage = curPage;
        this.fetchList();
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
        addObj(this.curUser).then(() => {
          this.$message({
            type: 'success',
            message: '新增成功!'
          });
          this.fetchList();
          this.dialogVisible = false;
          this.handleLoading = false;
        }).catch(() => {
          this.handleLoading = false;
        });
      },
      submitUpdate() {
        updObj(this.curUser).then(() => {
          this.$message({
            type: 'success',
            message: '更新成功!'
          });
          this.fetchList();
          this.dialogVisible = false;
          this.handleLoading = false;
        }).catch(() => {
          this.handleLoading = false;
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleClose(done) {
        this.dialogVisible = false;
        this.resetForm('ruleForm');
        if (done) {
          done();
        }
      }
    },
    computed: {},
    mounted() {
      this.fetchList();
      this.getRoleList();
    }
  }
</script>

<style scoped>

</style>
