<template>
  <div class="profile-container">
    <el-card class="profile-card">
      <div class="profile-info">
        <el-avatar :size="100" src="https://i.gtimg.cn/club/item/face/img/2/16022_100.gif"/>
        <p class="nickname">{{ userForm.nickname }}</p>
        <p class="signature">{{ userForm.signature }}</p>
        <div class="tags">
          <el-tag v-for="(item,index) in tagList" :key="index" size="medium">{{ item }}</el-tag>
        </div>
      </div>
      <ul class="additional-info">
        <li>
          <i class="icon el-icon-user"></i>
          <span>{{ userForm.name }}</span>
        </li>
        <li>
          <i class="icon el-icon-male"></i>
          <span>{{ sexDict }}</span>
        </li>
        <li>
          <i class="icon el-icon-date"></i>
          <span>{{ userForm.birthday }}</span>
        </li>
        <li>
          <i class="icon el-icon-mobile-phone"></i>
          <span>{{ userForm.phone }}</span>
        </li>
        <li>
          <i class="icon el-icon-office-building"></i>
          <span>{{ userForm.dept }}</span>
        </li>
        <li>
          <i class="icon el-icon-place"></i>
          <span>{{ userForm.address }}</span>
        </li>
        <li>
          <i class="icon el-icon-paperclip"></i>
          <span>{{ userForm.tag }}</span>
        </li>
      </ul>
    </el-card>
    <el-card class="form-card">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="user">

          <el-form ref="userFormRef" :model="userForm" class="editor-form" label-width="80px">
            <el-form-item label="昵称">
              <el-input v-model="userForm.nickname"/>
            </el-form-item>
            <!--            <el-form-item label="性别">
                          <el-select v-model="userForm.sex">
                            <el-option v-for="item in sexOption" :key="item.value" :label="item.label" :value="item.value"/>
                          </el-select>
                        </el-form-item>-->
            <el-form-item label="生日">
              <el-date-picker v-model="userForm.birthday" type="date" value-format="yyyy-MM-dd"/>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="userForm.phone"/>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="userForm.address"/>
            </el-form-item>
            <el-form-item label="个人简介">
              <el-input v-model="userForm.signature" type="textarea"/>
            </el-form-item>
            <el-form-item label="标签">
              <el-tag v-for="(item,index) in tagList" :key="index" closable
                      @close="handleClose(item)">{{ item }}
              </el-tag>
              <el-input
                  v-if="inputVisible"
                  ref="saveTagInput"
                  v-model="inputValue"
                  class="input-new-tag"
                  size="small"
                  @blur="handleInputConfirm"
                  @keyup.enter.native="handleInputConfirm"
              />
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="submitForm('userFormRef')">提交</el-button>
              <el-button size="small" type="danger" @click="closeProfile">关闭</el-button>
            </el-form-item>
          </el-form>

        </el-tab-pane>
        <el-tab-pane label="修改密码" lazy name="pwd">

          <el-form ref="pwdFormRef" :model="pwdForm" :rules="pwdRules" label-width="80px">
            <el-form-item label="原密码" prop="oldPassword">
              <el-input v-model="pwdForm.oldPassword" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="pwdForm.newPassword" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input v-model="pwdForm.confirmPassword" autocomplete="off"/>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="submitForm('pwdFormRef')">提交</el-button>
              <el-button size="small" type="danger" @click="closeProfile">关闭</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import {getAction} from "@/api/requestor.js";

export default {
  name: "profile",
  data() {
    return {
      activeName: 'user',

      userForm: {
        name: '楚芝馨',
        nickname: '昵称昵称',
        dept: '部门-部门-部门',
        birthday: '1998-06-20',
        phone: '13895495382',
        address: '中国-广东-深圳',
        sex: 2,
        signature: '富在术数，不在劳身；利在势居，不在力耕。',
        tag: 'JavaScript、Html、Vue、Node'
      },
      sexOption: [
        {value: 1, label: '男'},
        {value: 2, label: '女'}
      ],
      inputVisible: false,
      inputValue: '',

      pwdForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      pwdRules: {
        oldPassword: [
          {required: true, message: '请输入原密码', trigger: 'blur'},
          {min: 6, max: 20, message: '密码长度在6到20个字符之间', trigger: 'blur'},
        ],
        newPassword: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          {min: 6, max: 20, message: '密码长度在6到20个字符之间', trigger: 'blur'},
          {
            validator: (rule, value, callback) => {
              if (value === this.pwdForm.oldPassword) {
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
              if (value !== this.pwdForm.newPassword) {
                callback(new Error('两次输入的密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          },
        ],
      },

      url: {
        user: '',
      }
    }
  },
  computed: {
    tagList() {
      try {
        return this.userForm.tag ? this.userForm.tag.split('、') : [];
      } catch (error) {
        return [];
      }
    },

    sexDict() {
      try {
        return this.sexOption.find(item => item.value === this.userForm.sex).label
      } catch (e) {
        return 'Unknown';
      }
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      getAction(this.url.user, {}).then(res => {
        if (res.code === 200) {
          this.userForm = res.data.data
        } else {
          this.$message.error(res.message)
        }
      })
    },

    handleClick(tab, event) {
      console.log(tab, event)
      switch (tab.name) {
        case 'pwd':
          this.$refs.pwdFormRef?.resetFields();
          break
      }
    },

    handleClose(tag) {
      this.userForm.tag = this.tagList.filter(item => item !== tag).join('、');
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      if (this.inputValue) {
        this.userForm.tag += `、${this.inputValue}`;
      }
      this.inputVisible = false;
      this.inputValue = '';
    },

    submitForm() {
      this.$message.success('提交成功')
      setTimeout(() => {
        this.$message.warning('haha，骗你的')
      }, 1000)
    },

    closeProfile() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  .profile-card {
    flex: 0 1 400px;
    max-width: 100%;
    color: #626B7D;
    font-size: 14px;
    padding: 20px;
    box-sizing: border-box;


    .profile-info {
      text-align: center;
      margin-bottom: 30px;

      .nickname {
        font-size: 20px;
        font-weight: 500;
        color: #262626;
        line-height: 1.2;
        margin-top: 20px;
      }

      .signature {
        line-height: 1.4;
        margin: 12px 0;
      }

      .tags {

      }
    }

    .additional-info {
      color: #626B7D;
      font-size: 14px;
      line-height: 30px;

      .icon {
        margin-right: 10px;
      }
    }
  }

  .form-card {
    flex: 1;
    max-width: 100%;

    .button-new-tag {
      margin-left: 5px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }

    .input-new-tag {
      width: 90px;
      margin-left: 5px;
      vertical-align: bottom;
    }
  }

  @media (max-width: 992px) {
    .profile-card {
      flex-basis: 100%;
    }
  }

  :deep(.el-tag) {
    margin: 5px;
  }
}

</style>
