<template>
  <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="720px">
    <el-form ref="editorForm" :model="editorForm" :rules="rules" class="editor-form" label-width="100px">

      <div class="global__title">
        <h3>基本信息</h3>
      </div>

      <el-form-item label="名称" prop="name">
        <el-input v-model="editorForm.name"></el-input>
      </el-form-item>
      <el-form-item label="区域" prop="region">
        <el-select v-model="editorForm.region" placeholder="请选择活动区域">
          <el-option :value="1" label="区域一"></el-option>
          <el-option v-for="(item, index) in areaOption" :key="index"
                     :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker v-model="editorForm.date" placeholder="选择日期" type="date"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="text-align: center">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker v-model="editorForm.time" placeholder="选择时间"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="editorForm.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="editorForm.type">
          <el-checkbox label="美食/餐厅线上活动" name="type" value="1"></el-checkbox>
          <el-checkbox label="地推活动" name="type" value="2"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type" value="3"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type" value="4"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="editorForm.resource">
          <el-radio label="线上品牌商赞助" value="1"></el-radio>
          <el-radio label="线下场地免费" value="2"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动地址" prop="address">
        <el-input v-model="editorForm.address" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('editorForm')">立即创建</el-button>
        <el-button @click="resetForm('editorForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: "TableEditor",
  data() {
    return {
      title: '',
      dialogVisible: false,

      editorForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },

      areaOption: [
        {label: '区域二', value: 2},
        {label: '区域三', value: 3}
      ],

      rules: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        region: [
          {required: true, message: '请选择活动区域', trigger: 'change'}
        ],
        date1: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        date2: [
          {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
        ],
        type: [
          {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
        ],
        resource: [
          {required: true, message: '请选择活动资源', trigger: 'change'}
        ],
        desc: [
          {required: true, message: '请填写活动形式', trigger: 'blur'}
        ]
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
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>

</style>
