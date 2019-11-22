<template>
  <div class="append-shop">
    <el-card>
      <!-- 标题 -->
      <div slot="header" class="clearfix login-header">
        <span>添加商品</span>
      </div>
      <!-- 表单 -->
      <el-form
        :model="addGoodsForm"
        :rules="rules"
        ref="addGoodsForm"
        label-width="100px"
        class="demo-addGoodsForm"
      >
        <!-- 商品名称 -->
        <el-form-item label="商品名称" prop="goodsname">
          <el-input v-model="addGoodsForm.goodsname"></el-input>
        </el-form-item>
        <!-- 商品分类 -->
        <el-form-item label="商品分类" prop="goodscategory">
          <el-select v-model="addGoodsForm.goodscategory" placeholder="请选择商品分类">
            <el-option label="辣" value="辣"></el-option>
            <el-option label="超辣" value="超辣"></el-option>
          </el-select>
        </el-form-item>
        <!-- 商品特色 -->
        <el-form-item label="商品特色" prop="goodsfeature">
          <el-checkbox-group v-model="addGoodsForm.goodsfeature">
            <el-checkbox label="美食/餐厅线上活动" name="goodsfeature"></el-checkbox>
            <el-checkbox label="地推活动" name="goodsfeature"></el-checkbox>
            <el-checkbox label="线下主题活动" name="goodsfeature"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="goodsfeature"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 是否促销 -->
        <el-form-item label="是否促销">
          <el-radio v-model="addGoodsForm.isPromotion" label="促销">促销</el-radio>
          <el-radio v-model="addGoodsForm.isPromotion" label="不促销">不促销</el-radio>
        </el-form-item>
        <!-- 食品规格 -->
        <el-form-item label="食品规格">
          <el-radio v-model="addGoodsForm.standard" label="单规格">单规格</el-radio>
          <el-radio v-model="addGoodsForm.standard" label="多规格">多规格</el-radio>
        </el-form-item>
        <!-- 多规格 -->
        <div class="multiple-shop" v-if="isShow">
          <!-- 添加 -->
          <el-button size="small" type="primary" @click="dialogFormVisible = true">添加</el-button>
          <!-- 弹出框 -->
          <el-dialog title="规格" :visible.sync="dialogFormVisible" width="40%">
            <el-form :model="selectShopForm" label-width="100px">
              <el-form-item label="描述">
                <el-input v-model="selectShopForm.standard" autocomplete="off" :maxlength="200"></el-input>
              </el-form-item>
              <el-form-item label="配送费">
                <el-input-number
                  size="medium"
                  v-model="selectShopForm.shoppingFee"
                  @change="handleChange"
                  :min="0"
                  :max="99"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="价格">
                <el-input-number
                  size="medium"
                  v-model="selectShopForm.price"
                  @change="handleChange"
                  :min="0"
                  :max="99999"
                ></el-input-number>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addMultipleShop">确 定</el-button>
            </div>
          </el-dialog>
          <!-- 表格 -->
          <el-table :data="multipleShop" style="width: 100%">
            <el-table-column prop="standard" label="描述" width="100"></el-table-column>
            <el-table-column prop="shoppingFee" label="配送价" width="100"></el-table-column>
            <el-table-column prop="price" label="单价" width="100"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteStandrad(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 单规格 -->
        <div v-else>
          <el-form-item label="配送费">
            <el-input-number
              size="medium"
              v-model="addGoodsForm.shoppingFee"
              @change="handleChange"
              :min="0"
              :max="99"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="价格">
            <el-input-number
              size="medium"
              v-model="addGoodsForm.price"
              @change="handleChange"
              :min="0"
              :max="99999"
            ></el-input-number>
          </el-form-item>
        </div>
        <!-- 商品简介 -->
        <el-form-item label="商品简介" prop="goodsdesc">
          <el-input type="textarea" v-model="addGoodsForm.goodsdesc"></el-input>
        </el-form-item>
        <!-- 上传图片 -->
        <el-form-item label="商品图片" prop="imgUrl">
          <el-upload
            class="avatar-uploader"
            action="http://172.16.11.55:5000/goods/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="addGoodsForm.imgUrl" :src="serverApi + addGoodsForm.imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 提交 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('addGoodsForm')">立即创建</el-button>
          <el-button @click="resetForm('addGoodsForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { goodsAdd } from "@/api/shopManage";
export default {
  data() {
    return {
      serverApi: "http://172.16.11.55:5000/upload/goods/", // 商品图片服务器地址
      // 验证信息
      addGoodsForm: {
        goodsname: "", // 商品名称
        goodscategory: "", // 商品分类
        goodsfeature: [], // 商品特色
        isPromotion: "不促销", // 是否促销
        standard: "单规格",
        shoppingFee: 1, //配送费
        price: 20, // 价格
        goodsdesc: "", // 商品简介
        imgUrl: "" // 上传图片
      },
      //   上传图片
      imageUrl: "",
      //   验证规则
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        goodscategory: [
          { required: true, message: "请选择商品分类", trigger: "change" }
        ],
        goodsfeature: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个商品特色",
            trigger: "change"
          }
        ],
        goodsdesc: [
          { required: true, message: "请填写商品简介", trigger: "blur" }
        ],
        imgUrl: [
          { required: true, message: "请选择商品图片", trigger: "change" }
        ]
      },
      // 多规格商品数据
      multipleShop: [
        {
          standard: "微辣",
          shoppingFee: "4",
          price: "20"
        }
      ],
      // 多规格单条数据
      selectShopForm: {
        standard: "微辣",
        shoppingFee: "0",
        price: "20"
      },
      // 弹出框是否显示
      dialogFormVisible: false
    };
  },
  methods: {
    // 表单提交
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let {
            goodsname,
            goodscategory,
            goodsfeature,
            isPromotion,
            standard,
            shoppingFee,
            price,
            goodsdesc,
            imgUrl
          } = this.addGoodsForm;
          // 多规格
          let multipleShop = JSON.stringify(this.multipleShop);
          let params = {
            goodsname,
            goodscategory,
            goodsfeature: JSON.stringify(goodsfeature),
            isPromotion,
            standard:
              standard === "单规格"
                ? JSON.stringify([{ shoppingFee, price, standard }])
                : multipleShop,
            goodsdesc,
            imgUrl
          };
          let { code } = await goodsAdd(params);
          if (code === 0) this.$router.push("/home/shopmanage/shoplist");
        } else {
          this.$message.error("请输入正确的信息");
          return false;
        }
      });
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 上传图片成功的回调
    handleAvatarSuccess(res, file) {
      let { code, imgUrl } = res;
      if (code === 0) {
        this.addGoodsForm.imgUrl = imgUrl;
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
    // 计数器/配送费
    handleChange(value) {
      console.log(this.addGoodsForm.shoppingFee);
    },
    // 确认添加到多规模
    addMultipleShop() {
      let nowShop = JSON.stringify(this.selectShopForm);
      this.multipleShop.push(JSON.parse(nowShop));
      this.dialogFormVisible = false;
    },
    // 删除本条规格
    deleteStandrad(index, row) {
      this.multipleShop.splice(index, 1);
    }
  },
  computed: {
    // 多规格是否展示
    isShow() {
      if (this.addGoodsForm.standard === "多规格") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.append-shop {
  .el-card {
    .el-select,
    .el-input {
      width: 530px;
    }
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
    .multiple-shop {
      margin: 0 0 40px 40px;
      .el-table {
        width: 400px !important;
      }
      .el-form {
        margin-left: 40px;
        .el-input {
          width: 200px;
        }
      }
    }
  }
}
</style>