<template>
  <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="720px">
    <el-form ref="editorForm" :model="editorForm" :rules="rules" class="editor-form" label-width="100px">

      <div class="global__title">
        <h3>基本信息</h3>
      </div>

      <el-form-item label="字典名称" prop="dictName">
        <el-input v-model="editorForm.dictName"></el-input>
      </el-form-item>
      <el-form-item label="字典类型" prop="dictType">
        <el-input v-model="editorForm.dictType"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="editorForm.status" clearable>
          <el-option v-for="(item, index) in statusOption" :key="index"
                     :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="属性" prop="dictList">
        <div class="table-action-buttons">
          <el-button plain size="mini" type="primary" @click="handleAddRow()">添加行</el-button>
          <el-button plain size="mini" type="danger" @click="handleRemoveRow()">批量删除</el-button>
        </div>
        <el-table :data="editorForm.dictList" class="dynamic-table" size="mini"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="名称" prop="name">
            <template v-slot="scope">
              <el-form-item :prop="`dictList.${scope.$index}.name`" :rules="rules.name">
                <el-input v-model="scope.row.name" placeholder="请输入名称" size="mini"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="状态码" prop="state">
            <template v-slot="scope">
              <el-form-item :prop="`dictList.${scope.$index}.state`" :rules="rules.state">
                <el-input v-model="scope.row.state" placeholder="请输入状态码" size="mini"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="排序" prop="sort">
            <template v-slot="scope">
              <el-form-item :prop="`dictList.${scope.$index}.sort`" :rules="rules.sort">
                <el-input v-model="scope.row.sort" placeholder="请输入排序" size="mini"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="editorForm.remark" type="textarea"></el-input>
      </el-form-item>


    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: "TableEditor",
  props: ['statusOption'],
  data() {
    return {
      title: '',
      dialogVisible: false,

      editorForm: {
        dictList: [
          {
            name: '',
            state: null,
            sort: null
          }
        ]
      },
      multipleSelection: [],

      rules: {
        name: [
          {required: true, message: '请输入名称', trigger: ['blur', 'change']},
        ],
        state: [
          {required: true, message: '请输入状态码', trigger: ['blur', 'change']},
        ],
        sort: [
          {required: true, message: '请输入排序', trigger: ['blur', 'change']},
        ],
      },
    }
  },
  methods: {
    openDialog(title, record) {
      if (this.$refs['editorForm'] !== undefined) {
        this.$refs['editorForm'].resetFields();
      }
      if (record) {
        this.editorForm = Object.assign({}, record)
      }
      this.title = title
      this.dialogVisible = true;
    },

    handleAddRow() {
      this.editorForm.dictList.push({
        name: '',
        state: null,
        sort: null
      })
    },

    handleRemoveRow() {
      this.editorForm.dictList = this.editorForm.dictList.filter(item => !this.multipleSelection.includes(item));
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    submitForm() {
      this.$refs.editorForm.validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

  }
}
</script>

<style lang="scss" scoped>
::v-deep .dynamic-table .el-form-item {
  margin-bottom: 15px;
  margin-top: 15px;

  .el-form-item__content {
    line-height: 1;
  }
}
</style>
