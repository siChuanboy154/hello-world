<template>
  <div class="personal">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>管理员信息</span>
      </div>
      <div>
        <div>
          <span>管理员ID: {{accountInfo.id }}</span>
          <el-divider></el-divider>
          <span>账号： {{accountInfo.username }}</span>
          <el-divider></el-divider>
          <span>用户组： {{accountInfo.userGroup }}</span>
          <el-divider></el-divider>
          <span>创建时间： {{accountInfo.ctime | filterTime }}</span>
          <el-divider></el-divider>
          <div class="avatar-wrap">
            <span>管理员头像：</span>
            <div style="margin-top: 20px;" class="avatar">
              <!-- 管理员头像 -->
              <el-upload
                class="avatar-uploader"
                action="http://172.16.11.55:5000/users/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <div v-if="accountInfo.imgUrl" style="width: 200px; height: 200px;">
                  <img
                    style="width: 100%; height: 100%;"
                    v-show="accountInfo.imgUrl"
                    :src="serveApi + accountInfo.imgUrl"
                    class="avatar"
                  />
                </div>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
          <el-button
            @click="editAvatar"
            style="margin-left: 30px; margin-top: 15px;"
            size="small"
            type="primary"
          >确认修改头像</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import moment from "moment";
import { getAccountInfo, avatarEdit } from "@/api/userManage";
export default {
  data() {
    return {
      serveApi: "http://172.16.11.55:5000/upload/account/", // 为啥跟action的地址不一样？？
      accountInfo: {
        id: "",
        username: "",
        userGroup: "",
        ctime: "",
        imgUrl: ""
      }
    };
  },
  methods: {
    // 上传图片成功的回调
    handleAvatarSuccess(res, file) {
      let { code, imgUrl } = res;
      if (code === 0) {
        this.accountInfo.imgUrl = imgUrl;
      }
    },
    // 图片上传之前的处理函数
    beforeAvatarUpload(file) {
      const isPNG = file.type === "image/png";
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!(isPNG || isJPG)) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return (isPNG || isJPG) && isLt2M;
    },
    // 上传头像
    async editAvatar() {
      let { code } = await avatarEdit({ imgUrl: this.accountInfo.imgUrl });
      if (code === 0) {
        this.bus.$emit("updateImgUrl");
      }
    },
    // 获取账户信息
    async getAccountInfo() {
      let { accountInfo } = await getAccountInfo();
      this.accountInfo = accountInfo;
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
  }
};
</script>

<style lang="scss" scoped>
</style>