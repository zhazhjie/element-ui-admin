export default {
  props: {
    columns: {
      type: Array
    },
    tableData: {
      type: Array
    },
    handleList: {
      type: Array
    },
  },
  data() {
    return {
      row22() {
        return <el-button>666</el-button>
      }
    }
  },
  methods: {
    show(text) {
      console.log('text', text)
    }
  },
  render(h) {
    return (
      <el-table
        data={this.tableData}
        style="width: 100%">
        {
          this.columns.map(column => {
            return (
              <el-table-column
                label={column.name}
                {...{props: column.props}}
                scopedSlots={{
                  default: scope => {
                    if (column.render) {
                      return column.render(scope.row);
                    } else {
                      return <span>{scope.row[column.field]}</span>
                    }
                  }
                }}/>
            )
          })
        }
        {
          <el-table-column
            label="操作"
            scopedSlots={{
              default: scope => {
                return this.handleList.map(el => {
                  if (el.render) {
                    return el.render(scope.row);
                  } else {
                    return <el-button {...{props: el.props}} on-click={el.click?el.click.bind(this,scope.row):()=>({})}>{el.name}</el-button>
                  }
                })
              }

            }}/>

        }
      </el-table>
    )
  }
}
