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
        <el-input placeholder="名称" v-model='params.keyword'></el-input>
      </el-form-item>
      <el-form-item>
        <permission-btn type='primary' plain @click='handleSearch'>查询</permission-btn>
      </el-form-item>
    </el-form>
    <div style="margin-bottom: 15px;">
      <permission-btn permission='' type='primary' @click='handleAdd'>新增</permission-btn>
    </div>
    <table-template
      ref="table"
      @submit="handleSubmit"
      @showDialog="findParentId"
      :need-page="false"
      :tableProps="{rowKey:'id'}"
      :dialogProps="{width:'500px'}"
      :handleProps="{width:'150px'}"
      :rules="rules"
      :loading='tableLoading'
      :tableData='permissionTree'
      :columns='columns'
      :handleList='handleList'
      :handlePageChange='listPermission'
      :page='params'/>
  </section>
</template>

<script>
  import {listPermission, udpObj, addObj, delObj} from '../../api/sys/permission'
  import {getIconList, listToMap, treeDataTranslate} from "../../utils/util";

  export default {
    data() {
      return {
        iconList:[],
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
        selectedPerms:[],
        columns: [
          {
            label: 'ID',
            field: 'id',
            hiddenInDialog: true,
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
            hiddenInTable:true,
            label: '父节点',
            field: 'parentName',
            formEl: {
              render: row => {
                return (
                  <el-cascader
                    ref="perms"
                    style="width:100%"
                    placeholder="请选择父节点"
                    value={this.selectedPerms}
                    on-input={e=>this.handleSelectNode(e,row)}
                    props={{
                      label: "name",
                      value: "id",
                      checkStrictly: true,
                      expandTrigger: "hover"
                    }}
                    options={this.permissionTree}
                    collapse-tags/>
                )
              }
            }
          },
          {
            label: '图标',
            field: 'icon',
            render: row => <i class={row.icon}></i>,
            hiddenInDialog: false,
            formEl: {
              render: (row) => {
                return (<el-select
                  value={row.icon}
                  on-input={e=>row.icon=e}
                  filterable
                  placeholder="请选择图标"
                  style='width:100%'>
                  {this.iconList.map(icon => {
                    return (
                      <el-option
                        key={icon}
                        label={icon}
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
            render: row => {
              if (row.type === 0) {
                return <el-tag size="small">菜单</el-tag>
              } else {
                return <el-tag size="small" type="info">接口</el-tag>
              }
            },
            formEl: {
              render: row => {
                return (
                  <div>
                    <el-radio label={0} {...this.vModel(row,'type')} on-change={this.handleChangeType.bind(this,row)}>菜单</el-radio>
                    <el-radio label={1} {...this.vModel(row,'type')} on-change={this.handleChangeType.bind(this,row)}>接口</el-radio>
                  </div>
                )
              }
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
            formEl:{
              placeholder:'授权标识（如：sys:user:add）',
            }
          },
          {
            label: '导航隐藏',
            field: 'hidden',
            hiddenInTable:true,
            formEl: {
              render: row => {
                return (
                  <div>
                    <el-radio label={1} {...this.vModel(row,'hidden')}>是</el-radio>
                    <el-radio label={0} {...this.vModel(row,'hidden')}>否</el-radio>
                  </div>
                )
              }
            },
            hiddenInDialog: false,
          },
        ],
        handleList: [
          {
            label: '编辑',
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
          name: [
            {required: true, message: '请输入权限名称', trigger: 'blur'},
          ],
          parentName: [
            {message: '请选择上级目录', trigger: 'change'},
          ],
          url: [],
          perms: [],
        },
        params: {
          keyword: '',
          current: 1,
          size: 10,
          total:10
        }
      }
    },
    components: {},
    methods: {
      vModel(row,key) {
        return {
          props: {value: row[key]},
          on: {input: e => row[key] = e}
        }
      },
      listPermission: function () {
        this.tableLoading = true;
        listPermission(this.params).then((res) => {
          this.tableLoading = false;
         this.permissionTree = treeDataTranslate(res.data);
          this.permissionMap=listToMap(res.data);
        })
      },
      handleSelectNode(e,row){
        for(let i=0;i<e.length;i++){
          let perms=this.permissionMap[e[i]];
          if(perms&&(perms.id===row.id)){
            this.selectedPerms=[];
            return this.$message.warning("不能选自己及子节点作为父节点");
          }
        }
        this.selectedPerms=e;
      },
      handleAdd() {
        let table = this.$refs.table;
        table.curRow = this.curMenu;
        table.handleShowDialog();
      },
      handleDelete(id, name) {
        this.confirm('确定要删除[' + name + ']吗?', '提示').then(() => {
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
      handleSubmit(row) {
        row.parentId=this.selectedPerms[this.selectedPerms.length-1];
        if (this.$refs.table.handleType) {
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
          this.listPermission();
          this.handleLoading = false;
          this.$refs.table.handleCloseDialog();
        }).catch(() => {
          this.handleLoading = false;
        });
      },
      submitUpdate(row) {
        udpObj(row).then(() => {
          this.$message({
            type: 'success',
            message: '更新成功!'
          });
          this.listPermission();
          this.handleLoading = false;
          this.$refs.table.handleCloseDialog();
        }).catch(() => {
          this.handleLoading = false;
        });
      },
      findParentId(row){
        let result=[];
        let parent=this.permissionMap[row.parentId];
        while (parent){
          result.unshift(parent.id);
          parent=this.permissionMap[parent.parentId];
        }
        this.selectedPerms=result;
      },
      getIconList() {
        getIconList().then(data=>{
          this.iconList=data;
        })
          .catch(err=>err)
      },
      handleChangeType(row){
        if(row.type===0){

        }else{

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