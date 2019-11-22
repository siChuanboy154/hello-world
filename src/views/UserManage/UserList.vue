<template>
  <div class="user-list">
    <el-card>
      <!-- 标题 -->
      <div slot="header" class="clearfix login-header">
        <span>账号列表</span>
      </div>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        ref="accountTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="日期" width="240">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.ctime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.username }}</p>
              <p>用户组: {{ scope.row.userGroup }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.username }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="用户组" width="180">
          <template slot-scope="scope">
            <i class="el-icon-user"></i>
            <span style="margin-left: 10px">{{ scope.row.userGroup }}</span>
          </template>
        </el-table-column>
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
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page-sizes="[3, 5, 7, 10]"
        :page-size="pageSizes"
        :current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
      <!-- 批量删除 & 取消选择 -->
      <div style="margin-top: 20px;">
        <el-button @click="batchRemove" size="small" type="danger">批量删除</el-button>
        <el-button @click="cancelSelect" size="small" type="primary">取消选择</el-button>
      </div>
    </el-card>
    <!-- 模态框 -->
    <el-dialog width="420px" title="编辑账户" :visible.sync="dialogFormVisible">
      <el-form style="width: 320px" :model="editRowsAccount">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="editRowsAccount.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户组" label-width="100px">
          <el-select v-model="editRowsAccount.userGroup" placeholder="请选择用户组">
            <el-option label="普通用户组" value="普通用户组"></el-option>
            <el-option label="超级用户组" value="超级用户组"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  accountList,
  deleteAccount,
  batchDelete,
  editAccount
} from "@/api/userManage"; // 账户列表
import moment from "moment";
import { async } from "q";
export default {
  data() {
    return {
      currentPage: 1, // 当前页
      pageSizes: 3, // 每页条数
      total: 0, // 账户总条数
      tableData: [], // 账户表格
      ids: [], // 批量选择
      dialogFormVisible: false, // 模态框开启/关闭
      editRowsAccount: {} // 编辑的本条账户数据
    };
  },
  methods: {
    // 取消选择
    cancelSelect() {
      this.$refs.accountTable.clearSelection();
    },
    // 获取用户列表
    async getList() {
      let { total, data } = await accountList({
        currentPage: this.currentPage,
        pageSizes: this.pageSizes
      });
      this.total = total;
      data.forEach(v => {
        v.ctime = moment(v.ctime).format("YYYY-MM-DD HH:mm");
      });
      this.tableData = data;
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    // 页码改变
    handleSizeChange(val) {
      this.pageSizes = val;
      this.getList();
    },
    // 删除账户
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(async () => {
          let { code, msg } = await deleteAccount({ id: row.id }); // 键值相等
          //  刷新页面
          if (code === 0) this.getList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 当选中状态改变
    handleSelectionChange(rows) {
      this.ids = rows.map(v => v.id);
    },
    // 批量删除
    batchRemove() {
      if (this.ids.length !== 0) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(async () => {
            let { code, msg } = await batchDelete({
              ids: JSON.stringify(this.ids)
            });
            //  刷新页面
            if (code === 0) this.getList();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.$message.error("选都没选就想删？呵呵");
      }
    },
    // 编辑账户
    handleEdit(index, row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.editRowsAccount = { ...row };
    },
    // 确认修改
    async confirmEdit() {
      this.dialogFormVisible = false;
      let { code, msg } = await editAccount(this.editRowsAccount);
      // 如果修改成功 刷新页面
      if (code === 0) this.getList();
    }
  },
  // 获取列表数据
  created() {
    this.getList();
  }
};
</script>
<style lang="less" scoped>

</style>