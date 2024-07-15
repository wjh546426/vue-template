<template>
  <div>
    <el-form :inline="true" :model="form">
      <el-form-item>
        <el-input v-model="form.name" clearable placeholder="请输入部门名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.status" clearable placeholder="请选择部门状态">
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
        tooltip-effect="dark"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column label="部门名称" prop="deptName"></el-table-column>
      <el-table-column label="部门主管" prop="leaderName"></el-table-column>
      <el-table-column label="状态" prop="status"></el-table-column>
      <el-table-column label="排序" prop="sort"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
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

    <TableEditor ref="editor" :statusOption="statusOption" :deptTree="tableData" @load="loadData"></TableEditor>
  </div>
</template>
<script>
import {getAction} from "@/api/requestor.js";
import {crudMixin} from "@/mixins/crudMixin";
import TableEditor from "./components/TableEditor.vue";

export default {
  name: "index",
  components: {TableEditor},
  mixins: [crudMixin],
  data() {
    return {
      url: {
        list: '',
        delete: '',
      },

      statusOption: [],
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      const {dateRange = [], ...otherData} = this.form;
      const params = {
        startTime: dateRange[0],
        endTime: dateRange[1],
        // 将其他表单数据项合并到params中
        ...otherData
      };
      getAction(this.url.list, params).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data
        }
      })
    },

  }
}
</script>

<style lang="scss" scoped>

</style>
