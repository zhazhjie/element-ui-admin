/**
 * @author: zzj
 * @date: 2020-01-02 13:29:53
 * @version: 1.0
 */	
export let demoCode =
  `
  <template>
  <section>
    <table-template
      ref="table"
      :data="userList"
      :config="config"
      :tableLoading="tableLoading"
      @submitAdd="submitAdd"
      @submitEdit="submitUpdate"
      @submitSearch="handleSearch"
      @pageChange="fetchList"
      :page='params'>
    </table-template>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        tableLoading: false,
        userList: [{id:"1",username:"xxx",phone:"13555555555",state:1}],
        config: {
          dialogProps: {width: '500px'},
          handlerProps: {width: '200px'},
          columns: [
            {
              label: 'ID',
              field: 'id',
              hideInDialog: true,
              hideInSearch: true,
            },
            {
              label: '登录账号',
              field: 'username',
            },
            {
              label: '手机',
              field: 'phone',
              hideInSearch: true,
            },
            {
              label: '状态',
              field: 'state',
              type: 'tag',
              value: 1,
              options: [{value: 1, text: "正常"}, {value: 0, text: "禁用"}],
              stateMapping:{
                0:"danger",
                1:"success"
              },
              // render: (row) => {
              //   return row.state ? <el-tag type="success">正常</el-tag> : <el-tag type="danger">禁用</el-tag>
              // },
              formEl: {
                type: "radio",
              },
              searchEl: {
                type: "select",
                props: {
                  clearable: true
                }
              }
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
            username: [
              {required: true, message: '请输入登录账号', trigger: 'blur'}
            ],
          },
        },
        params: {
          current: 1,
          size: 10,
          total: 10
        }
      }
    },
    methods: {
      handleDelete(row) {
        
      },
      handleSearch(params) {
        
      },
      submitAdd(row, hideLoading, done) {
        
      },
      submitUpdate(row, hideLoading, done) {
        
      },
      fetchList(){
        
      }
    }
  }
</script>
  `;
