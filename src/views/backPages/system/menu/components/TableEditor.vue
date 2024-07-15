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
          <el-form-item label="所属系统" prop="model">
            <el-select v-model="editorForm.model" placeholder="请选择">
              <el-option :value="1" label="门户"></el-option>
              <el-option :value="2" label="小程序"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="启用状态" prop="status">
            <el-select v-model="editorForm.status" placeholder="请选择">
              <el-option
                  v-for="item in statusOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="系统类型" prop="type">
            <el-select v-model="editorForm.type" filterable placeholder="请选择">
              <el-option
                  v-for="item in typeOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="父级菜单" prop="parentId">
            <el-select v-model="editorForm.parentId" filterable placeholder="请选择">
              <el-option
                  v-for="item in menuList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="名称" prop="name">
            <el-input v-model.trim="editorForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col v-if="editorForm.type === 1" :span="12">
          <el-form-item label="路由地址" prop="path">
            <el-input v-model.trim="editorForm.path"></el-input>
          </el-form-item>
        </el-col>
        <el-col v-if="editorForm.type === 2" :span="12">
          <el-form-item label="权限字符" prop="perms">
            <el-input v-model.trim="editorForm.perms"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序" prop="sort">
            <el-input v-model.trim="editorForm.sort"></el-input>
          </el-form-item>
        </el-col>
        <el-col v-if="editorForm.type === 1" :span="12">
          <el-form-item label="菜单图标" prop="icon">
            <el-input v-model.trim="editorForm.icon">
              <template slot="append">
                <el-upload
                    :action="url.upload"
                    :limit="1"
                    :on-success="handleSuccess"
                    :show-file-list="false">
                  <el-button>上传</el-button>
                </el-upload>
              </template>
            </el-input>
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
import {FILE_UPLOAD_URL} from "@/api";
import {getAction, postActionJson} from "@/api/requestor.js";

export default {
  name: "TableEditor",
  data() {
    return {
      title: '',
      dialogVisible: false,

      editorForm: {},

      statusOption: [
        {label: '启用', value: 1},
        {label: '停用', value: 2}
      ],
      typeOption: [
        {label: '菜单', value: 1},
        {label: '按钮', value: 2}
      ],
      menuList: [],

      url: {
        list: '/menu/list',
        add: '/menu/insert',
        edit: '/menu/update',
        find: '/menu/findById',
        upload: FILE_UPLOAD_URL
      },

      rules: {}
    }
  },
  mounted() {
    this.getMenuList()
  },
  methods: {
    openDialog(title, record) {
      if (this.$refs['editorForm'] !== undefined) {
        this.$refs['editorForm'].resetFields();
      }
      this.title = title
      if (record) {
        getAction(this.url.find, {id: record.id}).then(res => {
          if (res.data.code === 200) {
            this.editorForm = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
      console.log(this.editorForm)
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

    getMenuList() {
      getAction(this.url.list).then((res) => {
        if (res.data.code === 200) {
          this.menuList = res.data.data;
        }
      });
    },

    handleSuccess(res) {
      if (res.code === 200) {
        this.editorForm.icon = res.data
      }
    }
  }
}
</script>

<style scoped>

</style>
