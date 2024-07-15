<template>
  <div>
    <el-form :inline="true" :model="form">
      <el-form-item>
        <el-input v-model="form.name" clearable placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="primary" @click="handleQuery">查询</el-button>
        <el-button size="medium" type="info" @click="handleReset">重置</el-button>
        <el-button size="medium" type="success" @click="handleAdd('新增')">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table
        ref="multipleTable"
        :data="tableData"
        row-key="id"
        style="width: 100%"
        tooltip-effect="dark">
      <el-table-column label="菜单名称" prop="name"></el-table-column>
      <el-table-column label="路由地址" prop="path"></el-table-column>
      <el-table-column label="系统类型" prop="typeDict"></el-table-column>
      <el-table-column label="排序" prop="sort"></el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit('编辑',scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <TableEditor ref="editor" @load="loadData"></TableEditor>
  </div>
</template>
<script>
import {crudMixin} from "@/mixins/crudMixin";
import TableEditor from "./components/TableEditor.vue";
import {getAction} from "@/api/requestor.js";

export default {
  name: "index",
  components: {TableEditor},
  mixins: [crudMixin],
  data() {
    return {
      url: {
        list: '/menu/selectMenuTree',
        delete: '/menu/deleteById',
      },

    }
  },
  mounted() {
  },
  methods: {
    loadData() {
      const params = {
        ...this.form
      };
      getAction(this.url.list, params).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data;
          this.total = res.data.data.total
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

  }
}
</script>

<style lang="scss" scoped>

</style>
