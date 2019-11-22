<template>
  <div class="order-manage">
    <el-card>
      <!-- 标题 -->
      <div slot="header" class="clearfix login-header">
        <span>订单管理</span>
      </div>
      <!-- 搜索 -->
      <el-form label-width="80px" ref="searchForm" inline>
        <el-form-item label="选择信息">
          <el-input v-model="searchForm.orderNo" size="small" placeholder="订单号" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchForm.consignee" size="small" placeholder="收货人" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchForm.phone" size="small" placeholder="手机号" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchForm.orderState" size="small" placeholder="订单状态" clearable />
        </el-form-item>
        <el-form-item label="选择日期">
          <el-col :span="30">
            <el-date-picker
              v-model="searchForm.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="clearSearchForm">清除</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="orderData" border style="width: 100%" max-height="600">
        <el-table-column fixed prop="date" label="日期" width="100"></el-table-column>
        <el-table-column prop="orderNo" label="订单号" width="150"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="150"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="consignee" label="收货人" width="100"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="250"></el-table-column>
        <el-table-column prop="deliveryTime" label="送达时间" width="150"></el-table-column>
        <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="80"></el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="70">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :total="total"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { orderList } from "@/api/orderManage";
import moment from "moment";
export default {
  data() {
    return {
      // 搜索变量
      searchForm: {
        orderNo: "", // 订单号
        consignee: "", // 收货人
        phone: "", // 手机号
        orderState: "", // 订单状态
        date: [] // 日期
      },
      // 订单列表
      orderData: [
        {
          date: "",
          orderNo: "",
          orderTime: "",
          phone: "",
          consignee: "",
          deliverAddress: "",
          deliveryTime: "",
          remarks: "",
          orderAmount: "",
          orderState: ""
        }
      ],
      currentPage: 1, // 当前页
      pageSize: 5, // 每页条数
      total: 10 // 账户总条数
    };
  },
  methods: {
    handleClick(row) {
      sessionStorage.setItem("orderinfo", JSON.stringify(row)); // 保存到本地临时存储
      this.$router.push("/home/orderinfo");
    },
    onSubmit() {
      this.getorders();
    },
    clearSearchForm() {
      this.searchForm = {
        orderNo: "", // 订单号
        consignee: "", // 收货人
        phone: "", // 手机号
        orderState: "", // 订单状态
        date: [] // 日期
      };
      this.getorders();
    },
    // 获取订单列表
    async getorders() {
      let { total, data } = await orderList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.searchForm.orderNo,
        consignee: this.searchForm.consignee,
        phone: this.searchForm.phone,
        orderState: this.searchForm.orderState,
        date: JSON.stringify(this.searchForm.date)
      });
      this.total = total;
      data.forEach(v => {
        v.orderTime = moment(v.orderTime).format("YYYY-MM-DD HH:mm");
        v.deliveryTime = moment(v.deliveryTime).format("YYYY-MM-DD HH:mm");
        v.date = moment(v.orderTime).format("YYYY-MM-DD");
      });
      this.orderData = data;
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getorders();
    }
  },
  // 获取列表数据
  created() {
    this.getorders();
  }
};
</script>

<style lang="less" scoped>
.order-manage {
  .el-card {
    .el-table {
      width: 1100px !important;
    }
    .el-pagination {
      margin: 18px 0;
    }
  }
}
</style>