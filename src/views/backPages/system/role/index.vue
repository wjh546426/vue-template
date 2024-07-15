<template>
  <div>
    <el-form :inline="true" :model="form">
      <el-form-item>
        <el-input v-model="form.name" clearable placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.status" clearable placeholder="请选择角色状态">
          <el-option v-for="(item, index) in statusOption" :key="index"
                     :label="item.label" :value="item.value"></el-option>
        </el-select>
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
        style="width: 100%"
        tooltip-effect="dark">
      <el-table-column label="角色名称" prop="name"></el-table-column>
      <el-table-column label="角色描述" prop="remarks" show-overflow-tooltip></el-table-column>
      <el-table-column label="状态" prop="status">
        <template v-slot="scope">
          <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="2"
                     @change="handleSwitchChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit('编辑',scope.row)">编辑</el-button>
          <el-button type="text" @click="handleAuth(scope.row.id)">权限</el-button>
          <el-button type="text" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        :current-page="current"
        :page-size="size"
        :total="total"
        layout="total, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
    </el-pagination>

    <TableEditor ref="editor" :statusOption="statusOption" @load="loadData"></TableEditor>
    <AuthEditor ref="auth"></AuthEditor>
  </div>
</template>
<script>
import {crudMixin} from "@/mixins/crudMixin";
import TableEditor from "./components/TableEditor.vue";
import {postActionJson} from "@/api/requestor.js";
import AuthEditor from "@/views/backPages/system/role/components/AuthEditor.vue";

export default {
  name: "index",
  components: {AuthEditor, TableEditor},
  mixins: [crudMixin],
  data() {
    return {
      url: {
        list: '/role/pageList',
        delete: '/role/deleteById',
        update: '/role/update',
      },

      statusOption: [
        {label: '正常', value: 1,},
        {label: '停用', value: 2,},
      ],
    }
  },
  mounted() {
  },
  methods: {
    handleSwitchChange(row) {
      postActionJson(this.url.update, row).then(res => {
        if (res.data.code !== 200) {
          row.status ^= 3; // 位运算符 XOR（异或）,1 XOR 3 = 2， 2 XOR 3 = 1
          this.$message.error(res.data.msg)
        }
      })
    },

    handleAuth(id) {
      this.$refs.auth.openDrawer(id)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
