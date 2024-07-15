<template>
  <el-drawer
      :visible.sync="visible"
      size="25%"
      title="角色权限配置"
  >
    <div>
      <el-checkbox v-model="expand" @change="handleCheckedTreeExpand">展开/折叠</el-checkbox>
      <el-checkbox v-model="selectAll" @change="handleCheckedTreeNodeAll">全选/全不选</el-checkbox>
      <el-checkbox v-model="checkStrictly" @change="handleCheckedTreeConnect">父子联动</el-checkbox>
    </div>

    <el-tree
        ref="tree"
        :check-strictly="!checkStrictly"
        :data="treeData"
        :default-checked-keys="checked"
        :props="props"
        default-expand-all
        node-key="id"
        show-checkbox
    >
    </el-tree>
    <div class="footer">
      <el-button size="medium" type="primary" @click="submitForm">提交</el-button>
      <el-button size="medium" type="danger" @click="visible = false">关闭</el-button>
    </div>
  </el-drawer>
</template>

<script>
import {getAction, postActionJson} from "@/api/requestor.js";

export default {
  name: "AuthEditor",
  data() {
    return {
      url: {
        menu: '/menu/selectMenuTree',
        find: "/menu/findAuthConfig",
        edit: "/menu/saveAuthConfig",
      },

      visible: false, // drawer是否显示
      roleId: null, // 当前角色id

      treeData: [], // 树形数据
      checked: [], // 默认选中项，当前角色拥有的权限
      expand: true, // 展开/折叠
      selectAll: false, // 全选/全不选
      checkStrictly: false, // 父子联动
      props: {
        label: "name",
        children: "children",
        // disabled: "status",
      },

    }
  },
  mounted() {
    this.getMenuList()
  },
  methods: {
    openDrawer(roleId) {
      if (this.$refs.tree !== undefined) {
        this.$refs.tree.setCheckedKeys([]);
      }
      if (roleId) {
        this.roleId = roleId
        const params = {
          model: 1, // 1.后台 2.小程序
          relationType: 2, //0.用户 1.部门 2.角色
          relationId: -1,
        }
        getAction(this.url.find, params).then(res => {
          const {code, data, msg} = res.data
          if (code === 200) {
            this.checked = data.menuIds
          } else {
            this.$message.error(msg)
          }
        })
      }
      this.visible = true
    },

    getMenuList() {
      // model: 1.后台 2.小程序
      getAction(this.url.menu, {model: 1}).then((res) => {
        const {code, data, msg} = res.data
        if (code === 200) {
          this.treeData = data;
        } else {
          this.$message.error(msg)
        }
      });
    },

    submitForm() {
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      if (checkedKeys.length === 0) return this.$message.warning('请至少选择一项目')

      const params = {
        relationType: 2, //0.用户 1.部门 2.角色
        relationId: this.roleId,
        menuIds: checkedKeys,
      }
      postActionJson(this.url.edit, params).then(res => {
        const {code, msg} = res.data
        if (code === 200) {
          this.$message.success('操作成功')
          this.visible = false
        } else {
          this.$message.error(msg)
        }
      })

    },

    /*---------------------分割线---------------------*/

    // 权限树（展开/折叠）
    handleCheckedTreeExpand(value) {
      for (let i = 0; i < this.data.length; i++) {
        this.$refs.tree.store.nodesMap[this.data[i].id].expanded = value;
      }
    },
    // 权限树（全选/全不选）
    handleCheckedTreeNodeAll(value) {
      this.$refs.tree.setCheckedNodes(value ? this.data : []);
    },
    // 权限树（父子联动）
    handleCheckedTreeConnect(value) {
      this.checkStrictly = value;
    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-drawer__body {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  box-sizing: border-box;

  .el-tree {
    flex: 1;
    margin-top: 10px;
    overflow: auto; /* 如果内容过多需要滚动 */
    @include scrollBar;
  }

  .footer {
    padding: 20px;
    box-sizing: border-box;
    text-align: right;
  }
}

</style>
