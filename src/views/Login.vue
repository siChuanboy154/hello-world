<template>
  <div class="login">
    <!-- <div class="date"><date /></div> -->
    <el-card class="login-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix login-header">
        <i class="el-icon-eleme"></i>
        <span>外卖管理系统</span>
      </div>
      <!-- 表单 -->

      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="auto"
        class="demo-ruleForm"
        label-position
        hide-required-asterisk
      >
        <el-form-item label="用户名" prop="username" class="login-username">
          <el-input type="text" v-model.number="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="login-password">
          <el-input
            @click.native="changeType"
            :suffix-icon="isOpen?'iconfont icon-yanjing-zheng':'iconfont icon-yanjing_bi'"
            :type="isPassword?'password':'text'"
            v-model.number="ruleForm.password"
            autocomplete="off"    
          ></el-input>
        </el-form-item>
        <!-- 提交 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm()">登录</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { validatepwd } from "../utils/validatepwd";
import { login } from "@/api/userManage";
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
        password: ""
      },
      // 验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }, // 非空
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          {
            validator: validatePass,
            trigger: "blur",
            validatePwd: validatepwd()
          }
        ]
      },
      // 眼睛状态
      isOpen: false,
      isPassword: true
    };
  },
  methods: {
    // 提交表单
    submitForm() {
      this.$refs.ruleForm.validate(async valid => {
        // 什么意思啊？
        // 意思是先去验证validate？
        // 也就是validatePass，如果回调函数不返回值就验证通过 valid为真？
        if (valid) {
          let { code, token } = await login(this.ruleForm);
          if (code === 0) {
            localStorage.setItem("token", token)
            this.$router.push("/home/backgroundindex");
          }
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
.login {
  background-image: url("../assets/311211.jpg");
  height: 780px;
  background-color: #2d3a4b;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .login-card {
    width: 400px;
    height: 250px;
    background-color: #141c23;
    color: #fff;
    border: none;
    .login-header {
      text-align: center;
    }
  }
  .date {
    margin-bottom: 100px;
  }
}
</style>