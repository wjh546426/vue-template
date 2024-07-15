<template>
  <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="960px">
    <el-form ref="editorForm" :model="editorForm" :rules="rules" class="editor-form" label-width="100px">

      <div class="global__title">
        <h3>基本信息</h3>
      </div>

      <el-row>
        <el-col :span="12">
          <el-form-item label="部门名称" prop="deptName">
            <el-input v-model="editorForm.deptName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上级部门" prop="parentId">
            <el-select-tree v-model="editorForm.parentId" :data="deptTree" :props="defaultProps" check-strictly
                            filterable></el-select-tree>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="负责人" prop="leader">
            <el-input v-model="editorForm.leader"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="editorForm.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门状态" prop="status">
            <el-select v-model="editorForm.status">
              <el-option v-for="(item, index) in statusOption" :key="index"
                         :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="显示排序" prop="orderNum">
            <el-input-number v-model="editorForm.orderNum" :min="0" controls-position="right"/>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import {postActionJson} from "@/api/requestor.js";

export default {
  name: "TableEditor",
  props: ['statusOption', 'deptTree'],
  data() {
    return {
      url: {
        add: '/dept/insert',
        edit: '/dept/update',
      },

      title: '',
      dialogVisible: false,

      editorForm: {
        status: 1, //默认启用
      },

      defaultProps: {
        id: 'id',
        label: 'name',
        children: 'children'
      },

      rules: {
        deptName: [
          {required: true, message: '请输入部门名称', trigger: 'blur'},
        ],
      }
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

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const api = this.editorForm.id ? this.url.edit : this.url.add
          postActionJson(api, this.editorForm).then(res => {
            const {code, msg} = res.data
            if (code === 200) {
              this.$message.success('操作成功')
              this.dialogVisible = false
              this.$emit('load')
            } else {
              this.$message.error(msg)
            }
          })
        }
      });
    },

  }
}
</script>

<style scoped>

</style>
