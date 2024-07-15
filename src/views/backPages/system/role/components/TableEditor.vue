<template>
  <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="720px">
    <el-form ref="editorForm" :model="editorForm" :rules="rules" class="editor-form" label-width="100px">

      <div class="global__title">
        <h3>基本信息</h3>
      </div>

      <el-form-item label="角色名称" prop="name">
        <el-input v-model="editorForm.name" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="角色状态" prop="status">
        <el-select v-model="editorForm.status" clearable filterable placeholder="请选择状态">
          <el-option v-for="(item, index) in statusOption" :key="index"
                     :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色描述" prop="remarks">
        <el-input v-model="editorForm.remarks" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('editorForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {postActionJson} from "@/api/requestor.js";

export default {
  name: "TableEditor",
  props: ['statusOption'],
  data() {
    return {
      url: {
        add: '/role/insert',
        edit: '/role/update',
      },

      title: '',
      dialogVisible: false,
      editorForm: {
        status: 1, //默认启用
      },
      rules: {
        name: [
          {required: true, message: '请输入角色名称', trigger: 'blur'},
        ],
        status: [
          {required: true, message: '请选择角色状态', trigger: 'change'},
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
