<template>
  <div class="append-user">
    <el-card>
      <!-- 标题 -->
      <div slot="header" class="clearfix login-header">
        <span>添加用户</span>
      </div>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        hide-required-asterisk
      >
        <el-form-item label="用户名" prop="username">
          <el-input auto-complete="off" type="text" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            auto-complete="off"
            show-password
            @click.native="changeType"
            v-model="ruleForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户组" prop="userGroup">
          <el-select v-model="ruleForm.userGroup" placeholder="请选择用户组">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 提交 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">添加</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { validatepwd } from "@/utils/validatepwd"; // 表单-密码验证
import { addAccount } from "@/api/userManage"; // 发送axios-添加账户
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      // rule: 验证规则对象  value: 用户输入的值， callback: 回调函数
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!rule.validatePwd.test(value)) {
        callback(new Error("密码包含数字和英文，长度 3 ~ 12 位"));
        // 这个new Error是多余的 还格式化一下信息？
      } else {
        // 每次运行完就callback()？？
        callback();
      }
    };

    return {
      // 表单信息
      ruleForm: {
        username: "",
        password: "",
        userGroup: "普通管理员" // 用户组
      },
      // 验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }, // 非空
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur",
            validatePwd: validatepwd()
          }
        ],
        userGroup: [
          { required: true, message: "请选择用户组", trigger: "change" }
        ]
      },

      // 下拉框
      options: [
        {
          value: "超级管理员",
          label: "超级管理员"
        },
        {
          value: "普通管理员",
          label: "普通管理员"
        }
      ]
    };
  },
  methods: {
    // 提交表单
    submitForm() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          let { code, msg } = await addAccount(this.ruleForm); // 发送axios
          if (code === 0) {
            this.$router.push("/home/usermanage/userlist")
          }else if(code === 101){
            this.$message.error(msg);
          }
        } else {
          this.$message.error("请输入正确的信息");
          return false;
        }
      });
    },
    // 重置表单
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    changeType(e) {
      if (e.target.className.includes("yanjing")) {
        this.isOpen = !this.isOpen; // 事件对象.target是事件源啊  //切换眼睛睁闭
        this.isPassword = !this.isPassword; //切换密码可见
      }
    }
  }
};
</script>

<style lang="less" scoped>
.append-user {
  .el-card {
    .el-select,
    .el-input {
      width: 230px;
    }
  }
}
</style>