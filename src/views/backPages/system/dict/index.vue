<template>
  <div>
    <el-form :inline="true" :model="form">
      <el-form-item>
        <el-input v-model="form.dictName" clearable placeholder="请输入字典名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.dictType" clearable placeholder="请输入字典类型"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.region" clearable placeholder="请选择字典状态">
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
        :expand-row-keys="expandedRowKeys"
        row-key="id"
        style="width: 100%"
        tooltip-effect="dark" @expand-change="handleExpandChange">
      <el-table-column type="expand">
        <template>
          <el-table :data="expandedRowData" border size="small">
            <el-table-column type="index" width="55"></el-table-column>
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="状态码" prop="state"></el-table-column>
            <el-table-column label="排序" prop="sort"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="字典名称" prop="dictName"></el-table-column>
      <el-table-column label="字典类型" prop="dictType"></el-table-column>
      <el-table-column label="状态" prop="statusDict"></el-table-column>
      <el-table-column label="备注" prop="remark" show-overflow-tooltip></el-table-column>
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

    <TableEditor ref="editor" :statusOption="statusOption" @load="loadData"></TableEditor>
  </div>
</template>
<script>
import {crudMixin} from "@/mixins/crudMixin";
import TableEditor from "./components/TableEditor.vue";

export default {
  name: "index",
  components: {TableEditor},
  mixins: [crudMixin],
  data() {
    return {
      url: {
        list: '/dict/selectPageList',
        delete: '/dict/deleteById',
      },

      statusOption: [],

      expandedRowKeys: [], // 当前展开的行的id
      expandedRowData: {}, // 当前展开的行的数据
      tableData: [
        {
          dictName: '字典名称',
          dictType: '字典类型',
          statusDict: '启用',
          remark: '备注',
          createTime: '',
          dictList: [
            {
              name: '测试1',
              state: 1,
              sort: 0
            },
            {
              name: '测试2',
              state: 2,
              sort: 1
            },
            {
              name: '测试3',
              state: 3,
              sort: 2
            }
          ]
        }
      ]
    }
  },
  mounted() {
  },
  methods: {
    // table展开行事件（手风琴模式）
    handleExpandChange(row) {
      // 如果当前展开行keys中包含当前行id
      if (this.expandedRowKeys.includes(row.id)) {
        // 将当前展开行keys设置为空数组，关闭当前展开行
        this.expandedRowKeys = []
        this.expandedRowData = {}
      } else {
        this.expandedRowData = row.dictList
        this.expandedRowKeys = [row.id]
      }
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
