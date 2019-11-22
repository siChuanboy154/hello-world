<template>
  <div class="store-manage">
    <el-card>
      <!-- 标题 -->
      <div slot="header" class="clearfix login-header">
        <span>店铺管理</span>
      </div>
      <!-- 表单 -->
      <el-form
        :disabled="isDisabled"
        :model="storeManageForm"
        :rules="rules"
        ref="storeManageForm"
        label-width="100px"
        class="demo-storeManageForm"
      >
        <el-form-item label="店铺名称" prop="shopname">
          <el-input v-model="storeManageForm.shopname"></el-input>
        </el-form-item>
        <el-form-item label="店铺标语">
          <el-input v-model="storeManageForm.slogan"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="storeManageForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="storeManageForm.address"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类" prop="category">
          <el-select v-model="storeManageForm.category" placeholder="请选择店铺分类">
            <el-option label="铁头娃" value="铁头娃"></el-option>
            <el-option label="回首掏" value="回首掏"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="配送费">
          <el-input-number v-model="storeManageForm.packingexpense" :min="0" :max="10" label="包装费"></el-input-number>
        </el-form-item>
        <el-form-item label="起送价">
          <el-input-number v-model="storeManageForm.minprice" :min="20" label="价格"></el-input-number>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-time-picker
            is-range
            v-model="storeManageForm.date"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            value-format="HH:mm:ss"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="店铺特点" prop="feature">
          <el-checkbox-group v-model="storeManageForm.feature">
            <el-checkbox label="美食/餐厅线上活动" name="feature"></el-checkbox>
            <el-checkbox label="地推活动" name="feature"></el-checkbox>
            <el-checkbox label="线下主题活动" name="feature"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="feature"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="商铺简介" prop="shopdesc">
          <el-input type="textarea" v-model="storeManageForm.shopdesc"></el-input>
        </el-form-item>
        <el-form-item label="店铺头像" prop="uploader">
          <el-upload
            class="avatar-uploader"
            action="http://172.16.11.55:5000/store/upload"
            :show-file-list="false"
            :on-success="handleShopAvatar"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="storeManageForm.shopAvatar"
              :src="serveApi+storeManageForm.shopAvatar"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="营业执照" prop="uploader">
          <el-upload
            class="avatar-uploader"
            action="http://172.16.11.55:5000/store/upload"
            :show-file-list="false"
            :on-success="handleBusinessLicenseImg"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="storeManageForm.businessLicenseImg"
              :src="serveApi+storeManageForm.businessLicenseImg"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="餐饮服务许可证" prop="uploader">
          <el-upload
            class="avatar-uploader"
            action="http://172.16.11.55:5000/store/upload"
            :show-file-list="false"
            :on-success="handleCateringServiceLicenseImg"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="storeManageForm.cateringServiceLicenseImg"
              :src="serveApi+storeManageForm.cateringServiceLicenseImg"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="优惠活动">
          <el-select
            @change="handleActiveChange"
            v-model="storeManageForm.specialOffer "
            placeholder="请选择活动分类"
          >
            <el-option label="满减优惠" value="满减优惠"></el-option>
            <el-option label="特惠大酬宾" value="特惠大酬宾"></el-option>
            <el-option label="新用户立减" value="新用户立减"></el-option>
            <el-option label="进店领券" value="进店领券"></el-option>
          </el-select>
        </el-form-item>
        <!-- 优惠活动表格 -->
        <div style="margin-bottom: 30px;">
          <el-table :data="storeManageForm.tableData" style="width: 100%">
            <el-table-column prop="title" label="活动标题" width="120"></el-table-column>
            <el-table-column prop="name" label="活动名称" width="120"></el-table-column>
            <el-table-column prop="detail" label="活动详情"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
      <!-- 提交 -->
      <div style="padding-left: 100px">
        <el-button type="primary" @click="submitForm('storeManageForm')">{{submitName}}</el-button>
        <el-button @click="resetForm('storeManageForm')">重置</el-button>
      </div>
      <!-- 模态框 -->
      <el-dialog width="400px" title="提示" :visible.sync="dialogFormVisible">
        <el-form :model="activityForm">
          <el-form-item label="请输入活动详情">
            <el-input size="small" width="300px" v-model="activityForm.detail" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <!-- 确定方法还没写 -->
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { storeInfo, storeEdit } from "@/api/storeManage";
export default {
  data() {
    return {
      serveApi: "http://172.16.11.55:5000/upload/shop/",
      isDisabled: true, // 是否禁止表单
      // 验证信息
      storeManageForm: {
        shopname: "", // 名称 1
        address: "", // 地址 1
        phone: "", // 电话 1
        shopdesc: "", // 描述 1
        slogan: "", // 标语 1
        category: "", // 分类 1
        feature: [], // 特色 1
        packingexpense: 0, // 配送费 1
        minprice: 20, // 起送价 1
        date: [], // 营业时间 1
        shopAvatar: "", // 店铺头像 1
        businessLicenseImg: "", // 营业执照 1
        cateringServiceLicenseImg: "", // 餐饮服务许可证 1
        specialOffer: "", // 优惠活动 1
        // 优惠活动表格 1
        tableData: []
      },
      // 验证规则
      rules: {
        shopname: [
          { required: true, message: "请输入店铺名称", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        category: [
          { required: true, message: "请选择店铺分类", trigger: "change" }
        ],
        feature: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个店铺特色",
            trigger: "change"
          }
        ],
        shopdesc: [
          { required: false, message: "请填写店铺简介", trigger: "blur" }
        ],
        uploader: [
          { required: false, message: "请选择您的头像", trigger: "change" }
        ]
      },
      submitName: "立即修改", // 提交按钮名称
      dialogFormVisible: false,
      // 优惠活动表单
      activityForm: {
        detail: ""
      }
    };
  },
  methods: {
    // 表单提交
    submitForm() {
      if (this.isDisabled) {
        this.submitName = "保存修改";
        this.isDisabled = false;
      } else {
        this.submitName = "立即修改";
        this.isDisabled = true;
        this.$refs.storeManageForm.validate(async valid => {
          if (valid) {
            let {
              shopname,
              address,
              phone,
              shopdesc,
              slogan,
              category,
              feature,
              packingexpense,
              minprice,
              date,
              shopAvatar,
              businessLicenseImg,
              cateringServiceLicenseImg,
              tableData
            } = this.storeManageForm;
            let sendStoreManageForm = {
              shopname,
              address,
              phone,
              shopdesc,
              slogan,
              category,
              feature: JSON.stringify(feature),
              packingexpense,
              minprice,
              date: JSON.stringify(date),
              shopAvatar,
              businessLicenseImg,
              cateringServiceLicenseImg,
              tableData: JSON.stringify(tableData)
            };
            await storeEdit(sendStoreManageForm);
          } else {
            this.$message.error("请输入正确的信息");
            return false;
          }
        });
      }
    },
    // 表单重置
    resetForm() {
      this.getStoreInfo();
    },
    // 上传店铺头像
    handleShopAvatar(res, file) {
      let { code, imgUrl } = res;
      if (code === 0) {
        this.storeManageForm.shopAvatar = imgUrl;
      }
    },
    // 上传营业执照
    handleBusinessLicenseImg(res, file) {
      let { code, imgUrl } = res;
      if (code === 0) {
        this.storeManageForm.businessLicenseImg = imgUrl;
      }
    },
    // 上传餐饮服务许可证
    handleCateringServiceLicenseImg(res, file) {
      let { code, imgUrl } = res;
      if (code === 0) {
        this.storeManageForm.cateringServiceLicenseImg = imgUrl;
      }
    },
    // 上传图片前的处理函数
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!(isJPG || isPNG)) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return (isPNG || isJPG) && isLt2M;
    },
    handleActiveChange() {
      // 弹出模态框
      this.dialogFormVisible = true;
    },
    // 确认活动详情
    confirm() {
      this.dialogFormVisible = false;
      let title;
      switch (this.storeManageForm.specialOffer) {
        case "满减优惠":
          title = "减";
          break;
        case "特惠大酬宾":
          title = "特";
          break;
        case "新用户立减":
          title = "新";
          break;
        case "进店领券":
          title = "领";
          break;
      }

      // 获取用户输入的值
      let newObj = {
        title,
        name: this.storeManageForm.specialOffer,
        detail: this.activityForm.detail
      };

      // 加入表格
      this.storeManageForm.tableData.unshift(newObj);
    },
    // 获取商品信息
    async getStoreInfo() {
      let data = await storeInfo();
      let {
        shopname,
        address,
        phone,
        shopdesc,
        slogan,
        category,
        feature,
        packingexpense,
        minprice,
        date,
        shopAvatar,
        businessLicenseImg,
        cateringServiceLicenseImg,
        tableData
      } = data.data;
      this.storeManageForm = {
        shopname,
        address,
        phone,
        shopdesc,
        slogan,
        category,
        feature: JSON.parse(feature),
        packingexpense,
        minprice,
        date: JSON.parse(date),
        shopAvatar,
        businessLicenseImg,
        cateringServiceLicenseImg,
        tableData: JSON.parse(tableData)
      };
    }
  },
  created() {
    this.getStoreInfo();
  }
};
</script>

<style lang="less" scoped>
.store-manage {
  .el-card {
    .demo-storeManageForm {
      width: 600px;
      .el-form-item {
        .el-upload {
          .el-icon-plus.avatar-uploader-icon {
            border: 1px dashed #000;
            border-radius: 10px;
          }
          .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .avatar-uploader .el-upload:hover {
            border-color: #409eff;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
          }
          .avatar {
            width: 178px;
            height: 178px;
            display: block;
          }
        }
      }
      .el-form-item {
        .line {
          text-align: center;
        }
      }
    }
  }
}
</style>