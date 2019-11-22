<template>
  <div class="manage-list">
    <el-row class="tac">
      <el-menu
        router
        unique-opened
        :default-active="path"
        class="el-menu-vertical-demo"
        background-color="#2D3A4B"
        text-color="#fff"
      >
        <!-- 渲染菜单 -->
        <template v-for="(item, index) in menus">
          <!-- 无子页面 -->
          <el-menu-item v-if="!item.children" :index="item.path" :key="index">
            <i :class="item.iconUrl"></i>
            <span slot="title">{{item.menuContent}}</span>
          </el-menu-item>

          <!-- 有子页面 -->
          <el-submenu v-else :index="item.path" :key="index">
            <template slot="title">
              <i :class="item.iconUrl"></i>
              <span>{{item.menuContent}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(v, index) in item.children"
                :key="index"
                :index="v.path"
              >{{v.menuContent}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        // 后台首页
        {
          iconUrl: "el-icon-s-home",
          menuContent: "后台首页",
          path: "/home/backgroundindex"
        },
        // 订单管理
        {
          iconUrl: "el-icon-document",
          menuContent: "订单管理",
          path: "/home/ordermanage"
        },
        // 商品管理
        {
          iconUrl: "el-icon-shopping-bag-2",
          menuContent: "商品管理",
          path: "/home/shopmanage",
          children: [
            { path: "/home/shopmanage/shoplist", menuContent: "商品列表" },
            { path: "/home/shopmanage/appendshop", menuContent: "添加商品" }
          ]
        },
        // 店铺管理
        {
          iconUrl: "el-icon-present",
          menuContent: "店铺管理",
          path: "/home/storemanage"
        },
        // 账号管理
        {
          iconUrl: "el-icon-user",
          menuContent: "账号管理",
          path: "/home/usermanage",
          children: [
            { path: "/home/usermanage/userlist", menuContent: "账号列表" },
            { path: "/home/usermanage/appenduser", menuContent: "添加账号" },
            {
              path: "/home/usermanage/replacepassword",
              menuContent: "修改密码"
            }
          ]
        },
        // 销售统计
        {
          iconUrl: "el-icon-pie-chart",
          menuContent: "销售统计",
          path: "/home/selltotal",
          children: [
            { path: "/home/selltotal/shoptotal", menuContent: "商品统计" },
            { path: "/home/selltotal/ordertotal", menuContent: "订单统计" }
          ]
        }
      ]
    };
  },
  methods: {
  },
  mounted() {
    // 发送路由
  },
  computed: {
    path() {
      let nowPath = this.$route.path;
      if (nowPath.includes("order")) return "/home/ordermanage";
      if (nowPath === "/home/shopmanage/shopedit")
        return "/home/shopmanage/shoplist";
      return nowPath;
    }
  }
};
</script>

<style lang="less" scoped>
.manage-list {
  width: 200px;
  .el-menu {
    width: 200px;
    border: none;
    .el-menu-item.is-active {
      background-color: #202f3f !important;
    }
  }
}
</style>