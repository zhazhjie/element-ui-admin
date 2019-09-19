<template>
  <section id="excel">
    <el-button type="primary" @click="exportExcel">导出用户数据</el-button>
    <el-button type="primary" @click="emitImport">导入excel</el-button>
    <input ref="file" style="display: none" type="file" @change="importExcel"/>
  </section>
</template>

<script>
  import {fetchList} from "../../api/sys/user";

  require('../../utils/exportExcel');
  require('../../utils/importExcel');
  export default {
    name: "excel",
    components: {},
    data() {
      return {}
    },
    methods: {
      exportExcel() {
        fetchList({current: 1, size: 9999}).then(res => {
          let data = res.data.records.map(v => ({
            id: v.id,
            username: v.username,
            email: v.email,
            phone: v.phone,
            state: v.state ? "正常" : "禁用",
            createTime: v.createTime
          }));
          exportExcel(data, {
            id: "ID",
            username: "用户名",
            email: "邮箱",
            phone: "手机号",
            state: "状态",
            createTime: "创建时间"
          });
        }, "用户表");
      },
      emitImport() {
        this.$refs.file.click();
      },
      importExcel(e) {
        importExcel(e.target, (data) => {
          this.$alert(data)
        });
      },
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
