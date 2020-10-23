<template>
  <div>
    <van-nav-bar title="登陆" left-arrow @click-left="$touter.back()" />
    <van-form @submit="handleLogin" @failed='onFailed ' validate-first :show-error='false' :show-error-message='false'>
      <van-field
        v-model="user.mobile"
        icon-prefix="micon"
        left-icon="shouji"
        placeholder="请输入手机号"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        icon-prefix="micon"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        :rules="formRules.code"
      >
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>
      <van-button type="primary" block>登陆</van-button>
    </van-form>
  </div>
</template>

<script>
import { login } from "@/api/user.js";
import { Toast } from "vant";

export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810",
      },
      formRules: {
        mobile: [
          { required: true, message: "请输入手机号" },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: "请输入正确手机号" },
        ],
        code: [{ required: true, message: "请输入验证码" }],
      },
    };
  },
  methods: {
    // 登陆功能
    async handleLogin() {
      Toast.loading({
        message: "登陆中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const res = await login(this.user);
        Toast.success("登陆成功");
        console.log(res);
      } catch (error) {
        Toast.fail("手机或者验证码输入错误");
      }
    },
    // 表单验证失败的提示
    onFailed (error){
      if(error.errors[0]){
        this.$toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    }
  },
};
</script>

<style>
</style>