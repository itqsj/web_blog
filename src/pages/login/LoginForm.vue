<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    class="form mtop-15"
    size="default"
    status-icon
  >
    <el-form-item prop="username">
      <el-input v-model="ruleForm.username" size="large" clearable />
    </el-form-item>

    <el-form-item prop="password" class="mtop-15">
      <el-input
        v-model="ruleForm.password"
        size="large"
        clearable
        :suffix-icon="Search"
      />
    </el-form-item>

    <el-form-item>
      <div class="form_operat">
        <el-checkbox v-model="remember" label="Remember Me" size="large" />
        <span class="flex_center form_operat_forget">Forgot Password?</span>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button class="form_submit font-15" size="large" @click="submitForm"
        >LOGIN</el-button
      >
    </el-form-item>
    <el-form-item>
      <p class="form_creat mtop-15">
        New on our platform?
        <span class="form_creat_jump">Create an account</span>
      </p>
    </el-form-item>
    <div class="div-line"></div>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, h } from 'vue';

import type { FormInstance, FormRules } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';

import { login } from '@/api/api_login';
import { ResLoginInt } from '@/types/login';
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';

const ruleFormRef = ref<FormInstance>();
const remember = ref<boolean>(false);
const userStore = useUserStore();
const router = useRouter();
const ruleForm = reactive({
  username: 'admin',
  password: '123465',
});

const rules: FormRules = {
  username: [
    { required: true, message: 'Please input', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please input', trigger: 'blur' },
    { min: 3, max: 12, message: 'Length should be 3 to 12', trigger: 'blur' },
  ],
};

const handleLogin = async () => {
  const params = {
    ...ruleForm,
  };
  const res: ResLoginInt = (await login(params)) as ResLoginInt;
  if (res.status === 200) {
    window.sessionStorage.setItem('token', res.token);
    userStore.updateToken(res.token);
    router.push('/home');
  }
};

const submitForm = async () => {
  if (!ruleFormRef.value) return;
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      handleLogin();
    } else {
      ElNotification({
        title: '提示',
        message: h('i', { style: 'color: teal' }, '请输入正确的账号密码'),
      });
    }
  });
};
</script>

<style scoped lang="less">
.el-input {
  height: 56px;
  //   /deep/.is-focus {
  //     box-shadow: 0 0 0 2px;
  //   }
}

.form_operat {
  display: flex;
  justify-content: space-between;
  width: 100%;
  /deep/.is-checked {
    span {
      color: rgb(145, 85, 253);
    }
    .el-checkbox__inner {
      background-color: rgb(145, 85, 253);
    }
  }
  &_forget {
    color: rgb(145, 85, 253);
    cursor: pointer;
  }
}

.form_submit {
  width: 100%;
  height: 42px;
  color: rgb(255, 255, 255);
  font-weight: 500;
  letter-spacing: 0.3px;
  background-color: rgb(145, 85, 253);
  box-shadow: rgb(58 53 65 / 42%) 0px 4px 8px -4px;
  border-radius: 5px;
}

.form_creat {
  width: 100%;
  text-align: center;
  &_jump {
    color: rgb(145, 85, 253);
    cursor: pointer;
  }
}
</style>
