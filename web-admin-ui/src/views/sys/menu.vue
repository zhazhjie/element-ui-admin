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
      :need-page="false"
      :tableProps="{rowKey:'id'}"
      :dialogProps="{width:'500px'}"
      :handleProps="{width:'150px'}"
      :rules="rules"
      :loading='tableLoading'
      :tableData='menuList'
      :columns='columns'
      :handleList='handleList'
      :handlePageChange='listMenu'
      :page='params'>
    </table-template>
    <!--    <el-table :data="menuList" border v-loading="tableLoading" element-loading-text="给我一点时间" row-key="id" style="width: 100%;">-->
    <!--      <el-table-column  prop="id" header-align="left" align="left" width="220" label="ID">-->
    <!--      </el-table-column>-->
    <!--      <el-table-column prop="name" header-align="center" align="center" width="160" label="名称">-->
    <!--      </el-table-column>-->
    <!--      <el-table-column prop="parentName" header-align="center" align="center" width="120" label="上级菜单">-->
    <!--      </el-table-column>-->
    <!--      <el-table-column prop="icon" header-align="center" align="center" label="图标">-->
    <!--        <template slot-scope="scope">-->
    <!--          <i :class="scope.row.icon || ''"></i>-->
    <!--          &lt;!&ndash;<icon-svg :name="scope.row.icon || ''"></icon-svg>&ndash;&gt;-->
    <!--        </template>-->
    <!--      </el-table-column>-->
    <!--      <el-table-column prop="type" header-align="center" align="center" label="类型">-->
    <!--        <template slot-scope="scope">-->
    <!--          <el-tag v-if="scope.row.type === 0" size="small">目录</el-tag>-->
    <!--          <el-tag v-else-if="scope.row.type === 1" size="small" type="success">菜单</el-tag>-->
    <!--          <el-tag v-else-if="scope.row.type === 2" size="small" type="info">按钮</el-tag>-->
    <!--        </template>-->
    <!--      </el-table-column>-->
    <!--      <el-table-column prop="sort" header-align="center" align="center" label="排序号">-->
    <!--      </el-table-column>-->
    <!--      <el-table-column prop="url" header-align="center" align="center" width="150" :show-overflow-tooltip="true" label="菜单URL">-->
    <!--      </el-table-column>-->
    <!--      <el-table-column prop="perms" header-align="center" align="center" width="150" :show-overflow-tooltip="true" label="授权标识">-->
    <!--      </el-table-column>-->
    <!--      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">-->
    <!--        <template slot-scope="scope">-->
    <!--          <permission-btn permission='sys:menu:update' type='' @click='handleChange(scope.row)'>编辑</permission-btn>-->
    <!--          <permission-btn permission='sys:menu:delete' type='danger' @click='handleDelete(scope.row.id,scope.row.name)'>-->
    <!--            删除-->
    <!--          </permission-btn>-->
    <!--        </template>-->
    <!--      </el-table-column>-->
    <!--    </el-table>-->

    <!--    <el-dialog-->
    <!--      :title="handleType?'编辑':'新增'"-->
    <!--      :visible.sync="dialogVisible"-->
    <!--      :before-close="handleClose"-->
    <!--      :close-on-click-modal="false"-->
    <!--      width="500px">-->
    <!--      <el-form :model="curMenu" label-width="80px" :rules="rules" ref="ruleForm">-->
    <!--        <el-form-item label="菜单类型" prop="type">-->
    <!--          <el-radio-group v-model="curMenu.type" @change='handleMenuTypeChange'>-->
    <!--            <el-radio :label='0'>目录</el-radio>-->
    <!--            <el-radio :label='1'>菜单</el-radio>-->
    <!--            <el-radio :label='2'>按钮</el-radio>-->
    <!--          </el-radio-group>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label='名称' prop="name">-->
    <!--          <el-input v-model='curMenu.name' placeholder='请输入名称'></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label='上级目录' prop="parentName">-->
    <!--          <el-popover-->
    <!--            placement="right"-->
    <!--            width="250"-->
    <!--            trigger="click"-->
    <!--            v-model="deptVisible">-->
    <!--            <el-tree-->
    <!--              :data="selectMenuList"-->
    <!--              :props="defaultProps"-->
    <!--              v-model="deptVisible"-->
    <!--              @node-click="handleNodeClick">-->
    <!--            </el-tree>-->
    <!--            <el-input :value='curMenu.parentName' readonly slot="reference" @click="deptVisible = !deptVisible"-->
    <!--                      placeholder='请选择上级目录'></el-input>-->
    <!--          </el-popover>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label='菜单路由' prop="url" v-show='curMenu.type==1'>-->
    <!--          <el-input v-model='curMenu.url' placeholder='菜单路由(如:/sys/menu)'></el-input>-->
    <!--        </el-form-item>-->
    <!--        &lt;!&ndash; <el-form-item label='菜单路径' :prop='curMenu.type<2?"url":""' v-show='curMenu.type<2'>-->
    <!--          <el-input v-model='curMenu.url' placeholder='菜单路径(如:views/sys/menu)'></el-input>-->
    <!--        </el-form-item> &ndash;&gt;-->
    <!--        <el-form-item label='授权标识' prop="perms" v-show='curMenu.type==2'>-->
    <!--          <el-input v-model='curMenu.perms' placeholder='授权标识(如:sys_menu_add)'></el-input>-->
    <!--        </el-form-item>-->
    <!--        &lt;!&ndash; <el-form-item label='排序编号'>-->
    <!--          <el-input v-model='curMenu.orderNo' placeholder='请输入排序编号'></el-input>-->
    <!--        </el-form-item> &ndash;&gt;-->
    <!--        <el-form-item label='菜单图标' prop="icon" v-if='curMenu.type<2'>-->
    <!--          <el-input :prefix-icon="curMenu.icon || ''" v-model='curMenu.icon'-->
    <!--                    placeholder='菜单图标class(如:icon-setting)'></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label='排序' prop="sort">-->
    <!--          <el-input v-model='curMenu.sort' placeholder='排序(值越小越靠前)'></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label='是否隐藏' prop="hidden">-->
    <!--          <el-select v-model="curMenu.hidden">-->
    <!--            <el-option-->
    <!--              v-for="item in [{label:'显示',value:0},{label:'隐藏',value:1}]"-->
    <!--              :key="item.value"-->
    <!--              :label="item.label"-->
    <!--              :value="item.value">-->
    <!--            </el-option>-->
    <!--          </el-select>-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--      <span slot="footer">-->
    <!--          <el-button @click="handleClose('')">取 消</el-button>-->
    <!--          <el-button type="primary" @click="handleSubmit('ruleForm')" :loading='handleLoading'>确 定</el-button>-->
    <!--        </span>-->
    <!--    </el-dialog>-->
  </section>
</template>

<script>
  import {listMenu, udpObj, addObj, delObj, selectMenu} from '@/api/sys/menu'
  import {treeDataTranslate} from "../../js/util";

  export default {
    data() {
      return {
        dialogVisible: false,
        deptVisible: false,
        tableLoading: false,
        handleLoading: false,
        handleType: 0,
        defaultProps: {
          children: 'children',
          label: 'name'
        },
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
        menuList: [],
        selectMenuList: [],
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
            label: '上级菜单',
            field: 'parentName',
            formItem: {
              render: row => {
                return (
                  <div>
                    <el-input
                      value={row.parentName}
                      readonly
                      nativeOnClick={() => this.deptVisible = !this.deptVisible}
                      placeholder='请选择上级目录'/>
                    <el-popover
                      placement="right"
                      width="250"
                      trigger="click"
                      value={this.deptVisible}>
                      <el-tree
                        data={this.menuList}
                        props={this.defaultProps}
                        on-node-click={(data) => this.handleNodeClick(row, data)}>
                      </el-tree>
                    </el-popover>
                  </div>
                )
              }
            }
          },
          {
            label: '图标',
            field: 'icon',
            render: row => <i class={row.icon}></i>
          },
          {
            label: '类型',
            field: 'type',
            render: row => {
              if (row.type === 0) {
                return <el-tag size="small">菜单</el-tag>
              } else if (row.type === 1) {
                return <el-tag size="small" type="success">按钮</el-tag>
              } else {
                return <el-tag size="small" type="info">接口</el-tag>
              }
            },
            formItem: {
              render: row => {
                return (
                  <div>
                    <el-radio label={0} {...this.vModel(row)}>菜单</el-radio>
                    <el-radio label={1} {...this.vModel(row)}>按钮</el-radio>
                    <el-radio label={2} {...this.vModel(row)}>接口</el-radio>
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
            }
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
            {required: true, message: '请输入菜单名称', trigger: 'blur'},
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
          size: 10
        }
      }
    },
    components: {},
    methods: {
      vModel(row) {
        return {
          props: {value: row.type},
          on: {input: e => row.type = e}
        }
      },
      listMenu: function () {
        this.tableLoading = true;
        listMenu(this.params).then((res) => {
          this.tableLoading = false;
          this.menuList = treeDataTranslate(res.data);
        })
      },
      handleAdd() {
        let table = this.$refs.table;
        table.curRow = this.curMenu;
        table.showDialog();
      },
      handleDelete(id, name) {
        this.confirm('确定要删除[' + name + ']吗?', '提示').then(() => {
          delObj(id).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.listMenu();
            this.selectMenu();
          });
        });
      },
      handleSearch() {
        this.params.current = 1;
        this.listMenu();
      },
      handleSubmit(row) {
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
          this.listMenu();
          this.handleLoading = false;
          this.$refs.table.handleClose();
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
          this.listMenu();
          this.handleLoading = false;
          this.$refs.table.handleClose();
        }).catch(() => {
          this.handleLoading = false;
        });
      },
      handleNodeClick(row, data) {
        this.deptVisible = false;
        row.parentId = data.id;
        row.parentName = data.name;
      },
      selectMenu() {
        selectMenu().then(res => {
          this.selectMenuList = [];
          this.selectMenuList.push(res.data);
        });
      },
      handleMenuTypeChange() {
        this.rules.url = [];
        this.rules.perms = [];
        if (this.curMenu.type == 0) {
          this.curMenu.url = "";
          this.curMenu.perms = "";
        } else if (this.curMenu.type == 1) {
          this.curMenu.perms = "";
          this.rules.url.push({required: true, message: '请输入菜单路由', trigger: 'blur'});
        } else if (this.curMenu.type == 2) {
          this.curMenu.url = "";
          this.curMenu.icon = "";
          this.rules.perms.push({required: true, message: '请输入授权标识', trigger: 'blur'});
        }
      }
    },
    computed: {},
    mounted() {
      //this.fetchList();
      this.listMenu();
    }
  }
</script>

<style scoped>

</style>
