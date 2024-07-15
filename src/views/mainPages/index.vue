<template>
  <div class="global__container">
    <header class="header">
      <div class="left-wrap"> {{ date }} 丨 {{ time }}</div>
      <h1 class="platform-title"> 某某某统计分析平台 </h1>
      <div class="right-wrap">
        <el-dropdown @command="handleCommand">
          <span class="dropdown-trigger">{{ nickname }}<i class="el-icon-s-tools"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="back">后台管理</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
    <main class="main">
      <router-view></router-view>
    </main>
    <footer class="footer"></footer>
  </div>
</template>

<script>

import {formatDate} from "@/utils/func.js";

export default {
  name: "index",
  data() {
    return {
      timer: null,
      date: "0000-00-00",
      time: "00:00:00",
      nickname: '超级管理员',
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      const now = new Date()
      this.date = formatDate(now, 'yyyy-MM-dd')
      this.time = formatDate(now, 'HH:mm:ss')
    }, 1000)
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'back':
          this.$router.push('/back/template')
          break
        case 'logout':
          this.loginOut()
          break
      }
    },

    loginOut() {
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('userInfo')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });
      });
    }

  },
  destroyed() {
    clearInterval(this.timer);
  }
}
</script>
<style lang="scss" scoped>
.global__container {
  position: relative;

  .header {
    background: url("../../assets/images/main/header_bg.png") no-repeat center;
    width: 100%;
    height: 122px;
    position: fixed;
    top: 0;
    z-index: 10;
    color: #D3F1FF;
    font-size: 16px;
    letter-spacing: 1px;

    .left-wrap {
      position: absolute;
      left: 10px;
      top: 30px;
    }

    .platform-title {
      color: #FFFFFF;
      font-size: 32px;
      text-align: center;
      line-height: 66px;
      white-space: nowrap;
      overflow: hidden;
    }

    .right-wrap {
      position: absolute;
      right: 10px;
      top: 30px;

      .dropdown-trigger {
        color: #D3F1FF;
        font-size: 16px;
        letter-spacing: 1px;

        .el-icon-s-tools {
          font-size: 20px;
          vertical-align: middle;
          margin-left: 10px;
        }
      }
    }
  }

  .main {
    width: 100%;
    height: 100%;
  }

  .footer {
    background: url("../../assets/images/main/footer_bg.png") no-repeat center;
    width: 100%;
    height: 43px;
    position: fixed;
    bottom: 0;
    z-index: 10;
  }

}


</style>
