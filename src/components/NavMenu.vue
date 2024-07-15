<template>
  <div class="menu">
    <template v-for="item in menuTree">
      <el-submenu v-if="item.children&&item.children.length>0" :key="item.id" :index="item.url" class="parent">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </template>
        <nav-menu :menuTree="item.children"></nav-menu>
      </el-submenu>
      <el-menu-item v-else :key="item.id" :index="item.url">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  props: {
    menuTree: {
      type: Array,
      require: true
    }
  }
}
</script>

<style>
.el-menu--collapse .el-submenu__title span {
  display: none;
}

.el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
</style>
