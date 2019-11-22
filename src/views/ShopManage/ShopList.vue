<template>
  <div class="shop-list">
    <el-card>
      <!-- 标题 -->
      <div slot="header" class="clearfix login-header">
        <span>商品列表</span>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.goodsname }}</span>
              </el-form-item>
              <el-form-item label="促销">
                <span>{{ props.row.isPromotion }}</span>
              </el-form-item>
              <el-form-item label="规格">
                <span>{{ props.row.standard |filterStandard}}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <span>
                  <img
                    width="100"
                    height="100"
                    style="border-radius: 4px"
                    :src="serverApi + props.row.imgUrl"
                  />
                </span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.goodscategory }}</span>
              </el-form-item>
              <el-form-item label="商品特色">
                <span>{{ props.row.goodsfeature | filterFeature}}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsdesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="goodsname"></el-table-column>
        <el-table-column label="商品分类" prop="goodscategory"></el-table-column>
        <el-table-column label="描述" prop="goodsdesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { goodsList, goodsDel } from "@/api/shopManage";
export default {
  data() {
    return {
      serverApi: "http://172.16.11.55:5000/upload/goods/", // 商品图片服务器地址
      tableData: [],
      currentPage: 1, // 当前页
      pageSize: 5, // 每页条数
      total: 0 // 总条数
    };
  },
  methods: {
    // 获取商品列表
    async getgoods() {
      let { total, data } = await goodsList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
      this.total = total;
      this.tableData = data;
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getgoods();
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(async () => {
          let { code, msg } = await goodsDel({ id: row.id }); // 键值相等
          //  刷新页面
          if (code === 0) this.getgoods();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑
    handleEdit(index, row) {
      sessionStorage.setItem("goods", JSON.stringify(row))
      this.$router.push("/home/shopmanage/shopedit");
    }
  },
  // 获取列表数据
  created() {
    this.getgoods();
  },
  filters: {
    filterFeature(f) {
      return JSON.parse(f).join("/");
    },
    filterStandard(s) {
      return JSON.parse(s)
        .map(v => `${v.standard} - ${v.price} - ${v.shoppingFee}`)
        .join(" / ");
    }
  }
};
</script>

<style lang="less" scoped>
.shop-list {
  box-shadow: none;
  .el-card {
    padding-bottom: 30px;
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
}
</style>