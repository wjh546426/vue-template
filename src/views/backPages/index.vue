<template>
  <el-container>
    <el-aside :width="isCollapse ? '64px' : '240px'">
      <div class="sidebar-logo--container">
        <img alt="logo.png" src="../../assets/images/logo.png">
        <h3 v-if="!isCollapse">后台管理模板</h3>
      </div>
      <div class="sidebar-menu--container">
        <el-menu
            :collapse="isCollapse"
            :collapse-transition="false"
            active-text-color="#409EFF"
            background-color="#304156"
            default-active="$route.path"
            router
            text-color="#bfcbd9"
            unique-opened
        >
          <nav-menu :menuTree="menuTree"></nav-menu>
        </el-menu>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <i :class="{'collapse':isCollapse}" class="el-icon-s-fold" @click="toggleCollapse"></i>
        <div class="header-action">
          <div class="header-action-item user-info">
            <el-avatar size="small"
                       src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
            <span class="user-name">Admin</span>
          </div>
          <el-dropdown trigger="click" @command="handleCommand">
            <div class="header-action-item dropdown">
              <i class="el-icon-setting"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="home">首页</el-dropdown-item>
              <el-dropdown-item command="profile">个人中心</el-dropdown-item>
              <el-dropdown-item command="password">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

    <ChangePassword ref="password"></ChangePassword>
  </el-container>
</template>

<script>

import NavMenu from "@/components/NavMenu";
import {getAction} from "@/api/requestor.js";
import ChangePassword from "@/views/backPages/system/user/components/ChangePassword.vue";

export default {
  name: "index",
  components: {
    ChangePassword,
    NavMenu
  },
  data() {
    return {
      menuTree: [
        {
          icon: "el-icon-setting",
          id: 14,
          name: "系统设置",
          parent: null,
          sort: 170,
          url: "/13",
          children: [
            {
              "id": 10,
              "name": "用户管理",
              "url": "/back/user",
              "icon": null,
              "parent": 14,
              "sort": 1,
            },
            {
              "id": 11,
              "name": "角色管理",
              "url": "/back/role",
              "icon": null,
              "parent": 14,
              "sort": 2,
            },
            {
              "id": 12,
              "name": "组织管理",
              "url": "/back/dept",
              "icon": null,
              "parent": 14,
              "sort": 3,
            },
            {
              "id": 13,
              "name": "菜单管理",
              "url": "/back/menu",
              "icon": null,
              "parent": 14,
              "sort": 4,
            },
            {
              "id": 14,
              "name": "系统字典",
              "url": "/back/dict",
              "icon": "",
              "parent": 14,
              "sort": 5,
              "children": []
            },
          ]
        }
      ],
      isCollapse: false,
      url: {
        menu: '/menu/selectMenuTree'
      }
    }
  },
  mounted() {
    this.getMenuTree()
    this.handleResize()
    window.addEventListener('resize', this.handleResize);
  },
  methods: {
    getMenuTree() {
      getAction(this.url.menu).then(res => {
        if (res.data.code === 200) {
          this.menuTree = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },

    handleResize() {
      this.windowWidth = window.innerWidth;
      this.isCollapse = this.windowWidth < 1200;
    },

    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },

    handleCommand(command) {
      switch (command) {
        case 'home':
          // 导航到首页
          this.$router.push('/')
          break;
        case 'profile':
          // 打开个人中心
          this.$router.push('/back/profile')
          break;
        case 'password':
          // 弹出修改密码对话框
          this.$refs.password.openDialog()
          break;
        case 'logout':
          // 处理退出登录
          this.loginOut()
          break;
        default:
          console.log(`Unhandled command: ${command}`);
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
    window.removeEventListener('resize', this.handleResize);
  },
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;

  .el-aside {
    background-color: #304156;
    transition: width .28s;

    .sidebar-logo--container {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        height: 45px;
        margin-right: 10px;
      }

      h3 {
        color: #FFF;
        font-weight: 600;
        white-space: nowrap;
      }
    }

    .sidebar-menu--container {
      height: calc(100% - 60px);
      overflow-x: hidden;
      overflow-y: auto;
      @include scrollBar;

      .el-menu {
        border-right: none;
      }
    }

  }

  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-icon-s-fold {
      font-size: 20px;
      cursor: pointer;
    }

    .collapse {
      transform: rotate(180deg);
    }

    .header-action {
      display: flex;
      align-items: center;

      .header-action-item {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        cursor: pointer;
        min-width: 30px;

        &:hover {
          background-color: #f6f6f6;
        }
      }

      .user-info {
        .el-avatar {
          margin-right: 10px;
        }

        span {
          color: #000000d9;
          font-size: 14px;
        }
      }

      .dropdown {
        .el-icon-setting {
          font-size: 20px;
        }
      }
    }
  }

  .el-main {
    background-color: #f6f8fb;
  }
}
</style>
