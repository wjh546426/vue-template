<template>
  <div class="global__container">
    <div class="login-wrap">
      <el-form ref="loginForm"
               :model="loginForm"
               :rules="formRules"
               class="login-form"
               status-icon>
        <el-form-item prop="account">
          <el-input v-model="loginForm.account"
                    placeholder="请输入账号">
            <template slot="prepend"><i class="el-icon-user-solid"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password"
                    placeholder="请输入密码"
                    show-password>
            <template slot="prepend"><i class="el-icon-lock"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input v-model="loginForm.captcha"
                    class="login-captcha"
                    placeholder="请输入验证码"
                    @keyup.enter.native="doLogin">
            <template slot="append"><img :src="captcha" alt="验证码" @click="getCaptcha"></template>
          </el-input>
        </el-form-item>
        <el-button
            class="login-btn"
            type="primary"
            @click="doLogin"
        >登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>
<script>

export default {
  name: "login",
  data() {
    return {
      loginForm: {},
      uuid: '',
      captcha: '',
      formRules: {
        account: [{required: true, message: "用户名不能为空", trigger: "blur"}],
        password: [
          {required: true, message: "密码不能为空", trigger: "blur"},
          {type: "string", min: 6, message: "密码不能小于6位", trigger: "blur"}
        ],
        captcha: [{required: true, message: "验证码不能为空", trigger: "blur"}]
      },
    };
  },

  mounted() {
    this.getCaptcha()
  },
  methods: {
    getCaptcha() {
      /*      this.uuid = randomUUID()
            captcha({uuid: this.uuid}).then(res => {
              this.captcha = URL.createObjectURL(res.data)
            })*/
    },
    doLogin() {
      /*this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          const params = {
            account: this.loginForm.account,
            password: this.loginForm.password,
            captcha: this.loginForm.captcha,
            uuid: this.uuid,
          }
          login({
            loginFrom: crypto.encrypt(JSON.stringify(params))
          }).then(res => {
            if (res.data.code === 200) {
              localStorage.setItem('userInfo', res.data.data)
              this.$router.push({path: '/main'})
            } else {
              this.getCaptcha()
              this.$message.error(res.data.msg)
            }
          })
        }
      })*/
    }
  },
};
</script>
<style lang="scss" scoped>
.global__container {
  display: grid;
  text-align: center;
  white-space: nowrap;

  .login-wrap {
    align-self: center;
    justify-self: center;
    z-index: 2;

    .login-form {

      .login-captcha {

        img {
        }
      }

      .login-btn {
        width: 100%;
      }

      .login-btn:active {
        transform: scale(0.95);
      }
    }
  }

}
</style>
