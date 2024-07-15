<template>
  <div>
    <el-form :inline="true" :model="form">
      <el-form-item>
        <el-input v-model="form.name" clearable placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.region" clearable placeholder="请选择区域">
          <el-option label="区域一" value="1"></el-option>
          <el-option v-for="(item, index) in areaOption" :key="index"
                     :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
            v-model="form.dateRange"
            end-placeholder="结束日期"
            start-placeholder="开始日期"
            type="daterange"
            value-format="yyyy-MM-dd">
        </el-date-picker>
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
        @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"></el-table-column>
      <el-table-column label="日期" prop="date"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="地址" prop="address" show-overflow-tooltip></el-table-column>
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

    <TableEditor ref="editor" @load="loadData"></TableEditor>
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
      form: {},
      areaOption: [
        {label: '区域二', value: 2},
        {label: '区域三', value: 3}
      ],

      tableData: [
        {
          id: 1,
          name: '沈飞宇',
          region: 1,
          date: '2023-11-11',
          time: '08:00:00',
          delivery: true,
          type: [2, 3],
          resource: 1,
          address: '上海市普陀区金沙江路 1111 弄'
        }, {
          id: 2,
          date: '2023-11-10',
          name: '刘建强',
          address: '上海市普陀区金沙江路 1110 弄'
        }, {
          id: 3,
          date: '2023-11-09',
          name: '马玉请',
          address: '上海市普陀区金沙江路 1109 弄'
        }, {
          id: 4,
          date: '2023-11-08',
          name: '杨金龙',
          address: '上海市普陀区金沙江路 1108 弄'
        }, {
          id: 5,
          date: '2023-11-07',
          name: '马俊',
          address: '上海市普陀区金沙江路 1107 弄'
        }
      ],
      multipleSelection: [],

      total: 0,
      current: 1,
      size: 14,

      url: {
        list: '/pageList',
        delete: '',
      },

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
          this.tableData = res.data.data.record
        }
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

  }
}
</script>

<style lang="scss" scoped>

</style>
