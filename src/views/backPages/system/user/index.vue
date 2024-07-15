<template>
  <div>
    <el-form :inline="true" :model="form">
      <el-form-item>
        <el-input v-model="form.account" clearable placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.name" clearable placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.deptId" clearable filterable placeholder="请选择部门">
          <el-option v-for="(item, index) in deptOption" :key="index"
                     :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.roleId" clearable filterable placeholder="请选择角色">
          <el-option v-for="(item, index) in roleOption" :key="index"
                     :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.status" clearable filterable placeholder="请选择状态">
          <el-option v-for="(item, index) in statusOption" :key="index"
                     :label="item.name" :value="item.state"></el-option>
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
      <el-table-column label="账号" prop="account"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="联系方式" prop="phone"></el-table-column>
      <el-table-column label="部门" prop="deptName"></el-table-column>
      <el-table-column label="角色" prop="roleName"></el-table-column>
      <el-table-column label="状态" prop="status">
        <template v-slot="scope">
          <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="2"
                     @change="handleSwitchChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit('编辑',scope.row)">编辑</el-button>
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

    <TableEditor ref="editor" :deptOption="deptOption" :roleOption="roleOption" :statusOption="statusOption"
                 @load="loadData"></TableEditor>
  </div>
</template>
<script>
import {crudMixin} from "@/mixins/crudMixin";
import TableEditor from "./components/TableEditor.vue";
import {dictionary} from "@/api";
import {getAction, postActionJson} from "@/api/requestor.js";

export default {
  name: "index",
  components: {TableEditor},
  mixins: [crudMixin],
  data() {
    return {
      url: {
        list: '/user/pageList',
        delete: '/user/deleteById',
        update: '/user/update'
      },

      deptOption: [],
      roleOption: [],
      statusOption: [],
    }
  },
  mounted() {
    getAction('/dept/list').then(res => {
      if (res.data.code === 200) {
        this.deptOption = res.data.data
      }
    })
    getAction('/role/list').then(res => {
      if (res.data.code === 200) {
        this.roleOption = res.data.data
      }
    })
    dictionary('listing_status').then(res => {
      if (res.data.code === 200) {
        this.statusOption = res.data.data
      }
    })
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
  }
}
</script>

<style lang="scss" scoped>

</style>
