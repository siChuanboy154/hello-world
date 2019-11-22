<template>
  <div class="order-info">
    <el-card>
      <!-- 标题 -->
      <div slot="header" class="clearfix login-header">
        <span>订单详情</span>
      </div>
      <!-- 内容 -->
      <div class="order-form">
        <el-form ref="orderDetail" :model="orderDetail" label-width="80px" inline>
          <!-- 订单号 -->
          <el-form-item label="订单号">
            <el-input v-model="orderDetail.orderNo"></el-input>
          </el-form-item>
          <!-- 手机号 -->
          <el-form-item label="手机号">
            <el-input v-model="orderDetail.phone"></el-input>
          </el-form-item>
          <!-- 收货人 -->
          <el-form-item label="收货人">
            <el-input v-model="orderDetail.consignee"></el-input>
          </el-form-item>
          <!-- 配送地址 -->
          <el-form-item label="配送地址">
            <el-input v-model="orderDetail.deliverAddress"></el-input>
          </el-form-item>
          <!-- 下单时间 -->
          <el-form-item label="下单时间">
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm"
              v-model="orderDetail.orderTime"
              type="datetime"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <!-- 送达时间 -->
          <el-form-item label="送达时间">
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm"
              v-model="orderDetail.deliveryTime"
              type="datetime"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <!-- 用户备注 -->
          <el-form-item label="用户备注">
            <el-input v-model="orderDetail.remarks"></el-input>
          </el-form-item>
          <!-- 订单金额 -->
          <el-form-item label="订单金额">
            <el-input v-model="orderDetail.orderAmount"></el-input>
          </el-form-item>
          <!-- 订单状态 -->
          <el-form-item label="订单状态">
            <el-select v-model="orderDetail.orderState" placeholder="请选择订单状态">
              <el-option label="已受理" value="已受理"></el-option>
              <el-option label="配送中" value="配送中"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存修改</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { orderEdit } from "@/api/orderManage";
export default {
  data() {
    return {
      orderDetail: JSON.parse(sessionStorage.getItem("orderinfo"))
    };
  },
  methods: {
    async onSubmit() {
      await orderEdit(this.orderDetail);
      this.$router.push("/home/ordermanage");
    },
    reset() {
      this.orderDetail = JSON.parse(sessionStorage.getItem("orderinfo"));
    }
  }
};
</script>

<style lang="less" scoped>
.order-info {
  .order-form {
    .el-form {
      min-width: 1000px;
      .el-input {
        width: 500px;
      }
    }
  }
}
</style>