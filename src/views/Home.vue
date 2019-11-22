<template>
  <div class="home">
    <!-- 使用elementui的flex容器 -->
    <el-container>
      <!-- 头部 -->
      <el-header class="header">
        <h1 class="user-header">
          <i class="el-icon-menu"></i>
          <span>外卖管理系统</span>
        </h1>
        <div class="user-info">
          <img v-if="imgUrl" class="user-img" :src="serveApi+imgUrl" alt />
          <el-popover placement="bottom" width="60" trigger="hover">
            <el-button slot="reference">{{ username }}</el-button>
            <el-form :inline="true" class="demo-form-inline">
              <el-button style="width='100px'" @click="userIndex">个人主页</el-button>
              <el-button style="width='100px'" @click="logout">注销</el-button>
            </el-form>
          </el-popover>
        </div>
      </el-header>
      <!-- 内容 -->
      <el-main class="main">
        <!-- 左侧 -->
        <managelist></managelist>
        <!-- 内容 -->
        <div class="shop-content">
          <div class="main-breadcrumb">
            <breadcrumb :nowRouter="nowRouter"></breadcrumb>
          </div>
          <div class="main-content">
            <router-view></router-view>
          </div>
        </div>
      </el-main>
      <!-- 尾部 -->
      <el-footer class="footer">
        <p>@COPYRIGHT 2016-2020 永汇超市</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import managelist from "../components/Layout/ManageList.vue"; // 左侧导航
import breadcrumb from "../components/Breadcrumb.vue"; // 面包屑
import { getAccountInfo } from "@/api/userManage";
export default {
  components: {
    managelist,
    breadcrumb
  },
  data() {
    return {
      serveApi: "http://172.16.11.55:5000/upload/account/", 
      imgUrl: "", // 服务器发过来的的图片地址
      username: "",
      nowRouter: ""
    };
  },
  methods: {
    // 个人主页
    userIndex() {
      this.$router.push("/home/usermanage/userindex");
    },
    // 注销
    logout() {
      // 干掉token
      localStorage.removeItem("token");
      // 跳到login
      this.$router.push("/login");
      // 给些提示
      this.$message({
        type: "success",
        message: "注销成功"
      });
    },
    // 获取账户信息
    async getAccountInfo() {
      let { accountInfo } = await getAccountInfo();
      this.username = accountInfo.username;
      this.imgUrl = accountInfo.imgUrl;
    }
  },
  filters: {
    filterTime(t) {
      return moment(t).format("YYYY-MM-DD HH:mm");
    }
  },
  created() {
    // 获取用户信息
    this.getAccountInfo();
    this.bus.$on("updateImgUrl", () =>{
      this.getAccountInfo()
    })
  }
};
</script>
<style lang="less">
.home {
  background-color: #2d3a4b;
  border: 5px solid #545c64;
  border-radius: 5px;
  color: #fff;
  // 头部
  .header {
    background-color: #141c23;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    .user-header {
      margin-left: 10px;
    }
    // 用户信息
    .user-info {
      margin-right: 10px;
      height: 40px;
      .user-img {
        height: 100%;
        vertical-align: middle;
      }
    }
    .el-popover__reference {
      border: none;
      margin: 0 10px;
      border-radius: none;
      width: 60px;
      height: 30px;
      background-color: #141c23;
      color: #fff;
    }
  }
}

// 身体
.main {
  background-color: #2d3a4b;
  display: flex;
  overflow: hidden;
  .shop-content {
    color: black;
    flex: 1;
    min-height: 1000px;
    height: 100%;
    background-color: #f0f2f5;
    border: 5px solid #2d3a4b;
    border-radius: 5px;
    padding-bottom: 30px;
    .main-breadcrumb {
      margin-left: 10px;
      height: 60px;
      display: flex;
      align-items: center;
    }
    .main-content {
      margin: 0 25px;
      background-color: #fff;
      box-shadow: 0 0 15px #bbb;
    }
  }
}
.footer {
  background-color: #141c23;
  height: 40px !important;
  line-height: 40px;
  text-align: center;
}
.el-popover {
  .el-form {
    width: 150px;
    height: 80px;
    .el-button {
      margin: 0;
      width: 150px;
      border: none;
    }
  }
}
</style>