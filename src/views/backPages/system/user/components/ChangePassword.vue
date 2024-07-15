<template>
  <el-dialog :visible.sync="dialogVisible" title="修改密码" width="560px">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input v-model="form.oldPassword" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="form.newPassword" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm">确认</el-button>
            </span>
    </template>
  </el-dialog>
</template>

<script>
import {postActionJson} from "@/api/requestor.js";

export default {
  name: "ChangePassword",
  data() {
    return {
      url: {
        change: '/user/changePassword'
      },

      dialogVisible: false,
      form: {},
      rules: {
        oldPassword: [
          {required: true, message: '请输入原密码', trigger: 'blur'},
          {min: 6, max: 20, message: '密码长度在6到20个字符之间', trigger: 'blur'},
        ],
        newPassword: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          {min: 6, max: 20, message: '密码长度在6到20个字符之间', trigger: 'blur'},
          {
            validator: (rule, value, callback) => {
              if (value === this.form.oldPassword) {
                callback(new Error('新密码和原密码不能一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          },
        ],
        confirmPassword: [
          {required: true, message: '请输入确认密码', trigger: 'blur'},
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.newPassword) {
                callback(new Error('两次输入的密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          },
        ],
      },
    }
  },
  methods: {
    openDialog() {
      this.$refs["formRef"]?.resetFields()
      this.dialogVisible = true
    },

    submitForm() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          postActionJson(this.url.change, this.form).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg)
              this.dialogVisible = false
              localStorage.removeItem('userInfo')
              this.$router.push('/login')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
