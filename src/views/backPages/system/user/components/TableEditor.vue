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
          <el-form-item label="账号" prop="account">
            <el-input v-model="editorForm.account" placeholder="请输入账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码" prop="password">
            <el-input v-model="editorForm.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editorForm.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="editorForm.phone" placeholder="请输入联系方式"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门" prop="deptId">
            <el-select v-model="editorForm.deptId" clearable filterable placeholder="请选择部门">
              <el-option v-for="(item, index) in deptOption" :key="index"
                         :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色" prop="roleId">
            <el-select v-model="editorForm.roleId" clearable filterable placeholder="请选择角色">
              <el-option v-for="(item, index) in roleOption" :key="index"
                         :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="editorForm.sex" clearable filterable placeholder="请选择性别">
              <el-option v-for="(item, index) in sexOption" :key="index"
                         :label="item.name" :value="item.state"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-select v-model="editorForm.status" clearable filterable placeholder="请选择状态">
              <el-option v-for="(item, index) in statusOption" :key="index"
                         :label="item.name" :value="item.state"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="头像" prop="headSculpture">
            <image-upload v-model="editorForm.headSculpture" :limit="1"></image-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('editorForm')">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import {dictionary} from "@/api";
import {postActionJson} from "@/api/requestor.js";

export default {
  name: "TableEditor",
  props: ['deptOption', 'roleOption', 'statusOption'],
  data() {
    return {
      url: {
        add: '/user/insert',
        edit: '/user/update',
      },

      title: '',
      dialogVisible: false,
      editorForm: {
        status: 1, //默认启用
      },
      sexOption: [],
      rules: {
        account: [
          {required: true, message: '请输入账号', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 20, message: '密码长度在6到20个字符之间', trigger: 'blur'},
        ],
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
        ],
        phone: [
          {required: true, message: '请输入联系方式', trigger: 'blur'},
        ],
        deptId: [
          {required: true, message: '请选择部门', trigger: 'change'},
        ],
        roleId: [
          {required: true, message: '请选择角色', trigger: 'change'},
        ],
      },
    }
  },

  mounted() {
    dictionary('sex').then(res => {
      if (res.data.code === 200) {
        this.sexOption = res.data.data
      }
    })
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

<style lang="scss" scoped>
::v-deep .hidden-upload {
  .el-upload--picture-card {
    display: none;
  }
}
</style>
