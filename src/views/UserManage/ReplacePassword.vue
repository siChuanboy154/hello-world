<template>
  <div class="replace-password">
    <el-card>
      <!-- 标题 -->
      <div slot="header" class="clearfix login-header">
        <span>修改密码</span>
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
        <el-form-item label="原密码" prop="oldPass">
          <el-input show-password type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input show-password type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input show-password type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { validatepwd } from "../../utils/validatepwd"; // 密码验证
import { replacePassword, checkOldpwd } from "@/api/userManage";
export default {
  data() {
    var validateOldPass = async (rule, value, callback) => {
      // rule: 验证规则对象  value: 用户输入的值， callback: 回调函数
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!rule.validatePwd.test(value)) {
        callback(new Error("密码包含数字和英文，长度 3 ~ 12 位"));
        // 这个new Error是多余的 还格式化一下信息？
      } else {
        // 每次运行完就callback()？？
        let { code, msg } = await checkOldpwd({
          oldPwd: this.ruleForm.oldPass
        });
        if (code === "11") {
          callback(new Error(msg));
        } else {
          callback();
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      // rule: 验证规则对象  value: 用户输入的值， callback: 回调函数
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!rule.validatePwd.test(value)) {
        callback(new Error("密码包含数字和英文，长度 3 ~ 12 位"));
        // 这个new Error是多余的 还格式化一下信息？
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass"); // 反向判断密码是否一致
        }
        // 每次运行完就callback()？？
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldPass: "",
        pass: "",
        checkPass: "",
        age: ""
      },
      rules: {
        oldPass: [
          {
            validator: validateOldPass,
            trigger: "blur",
            validatePwd: validatepwd()
          }
        ],
        pass: [
          {
            validator: validatePass,
            trigger: "blur",
            validatePwd: validatepwd()
          }
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let { code } = await replacePassword({
            newPwd: this.ruleForm.pass
          });
          if (code === 0) this.$router.push("/login");
        } else {
          // 发送ajax时判断原密码是否正确
          this.$message.error("请重新输入信息");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less" scoped>
.replace-password {
  .el-card {
    .el-select,
    .el-input {
      width: 230px;
    }
  }
}
</style>