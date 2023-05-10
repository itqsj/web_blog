<template>
  <div>
    <div class="sort t-color">
      <el-form
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        label-position="top"
      >
        <el-form-item prop="oldPwd" label="Current Password">
          <PlaInput
            v-model="form.oldPwd"
            size="large"
            type="password"
            placeholder="Current Password"
          />
        </el-form-item>
        <el-form-item prop="newPwd" label="New Password">
          <PlaInput
            v-model="form.newPwd"
            size="large"
            type="password"
            placeholder="New Password"
          />
        </el-form-item>
        <el-form-item prop="comfirmPwd" label="Comfirm New Password">
          <PlaInput
            v-model="form.comfirmPwd"
            size="large"
            type="password"
            placeholder="Comfirm New Password"
          />
        </el-form-item>
      </el-form>
      <h3 class="font-20 t-color mtop-20 mbottom-10">Password requirements</h3>
      <p class="font-16 mtop-15">
        Please follow this guide for a strong password
      </p>
      <div class="sort_footer">
        <ul class="font-14 mtop-10">
          <li><span /> One special characters</li>
          <li><span /> Min 6 characters</li>
          <!-- <li><span /> One number (2 are recommended)</li> -->
          <li><span /> Change it often</li>
        </ul>
        <delConfirm
          v-model="showConfirm"
          persistent
          width="360"
          :loading="resetLoading"
          title="UPDATE PASSWORD"
          text="The current operation will change your password. Do you want to continue?"
        >
          <template #activator="{ props }">
            <v-btn v-bind="props">update password</v-btn>
          </template>
          <template #actions>
            <v-btn
              variant="text"
              color="teal-accent-4"
              @click="showConfirm = false"
              >CANCEL</v-btn
            >
            <v-btn
              variant="text"
              color="teal-accent-4"
              :loading="resetLoading"
              @click="hanldeSubmit"
              >COMFIRM</v-btn
            >
          </template>
        </delConfirm>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ChangePwd',
};
</script>
<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';

import PlaInput from '@/components/input/PlaInput.vue';
import delConfirm from '@/components/delConfirm/delConfirm.vue';

import { ElNotification } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import type { ResetPwdInt } from '@/types/user';
import { resetPwd } from '@/api/api_user';
import { useUserStore } from '@/store/user';

const { userInfo, loginOut } = toRefs(useUserStore());
const router = useRouter();
const form = reactive<ResetPwdInt>({
  oldPwd: '',
  newPwd: '',
  comfirmPwd: '',
});
const rules: FormRules = {
  oldPwd: [{ required: true, message: 'Please input oldPwd', trigger: 'blur' }],
  newPwd: [
    { required: true, message: 'Please input newPwd', trigger: 'blur' },
    { min: 6, max: 12, message: 'Length should be 6 to 12', trigger: 'blur' },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      message:
        'The password must contain letters and numbers of at least 6 digits in length',
    },
    {
      validator: (rule, value, callback) => {
        if (value === form.oldPwd) {
          callback(
            new Error("The new password can't be the same as the old one"),
          );
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
  comfirmPwd: [
    { required: true, message: 'Please input comfirmPwd', trigger: 'blur' },
    { min: 6, max: 12, message: 'Length should be 6 to 12', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.newPwd) {
          callback(new Error('The passwords entered are not the same'));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
};
const ruleFormRef = ref<FormInstance>();
const resetLoading = ref(false);
const showConfirm = ref(false);

const hanldeSubmit = async () => {
  console.log(userInfo.value?.email);
  if (!ruleFormRef.value) return;
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      submit();
    }
  });
};

const submit = async () => {
  resetLoading.value = true;

  const params = {
    ...form,
    email: userInfo.value?.email,
  };
  const { code } = await resetPwd(params);
  if (code === 200) {
    ElNotification({
      type: 'success',
      message: '操作成功！',
    });
    loginOut.value();
  }
  resetLoading.value = false;
  showConfirm.value = false;
};
</script>

<style scoped lang="less">
.sort {
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  margin-top: 1.2rem;
  .el-form {
    width: 100%;
  }

  &_row {
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
    .el-form-item {
      flex: 1;
    }
  }
  p {
    color: rgb(123, 128, 154);
  }
  ul {
    color: rgb(123, 128, 154);
    li {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      margin-bottom: 0.5rem;
      span {
        display: inline-block;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: rgb(123, 128, 154);
      }
    }
  }
  &_footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    .v-btn {
      font-family: Roboto, Helvetica, Arial, sans-serif;
      font-size: 0.75rem;
      background-image: linear-gradient(
        195deg,
        rgb(66, 66, 74),
        rgb(25, 25, 25)
      );
      color: rgb(255, 255, 255);
      box-shadow: rgb(52 71 103 / 15%) 0rem 0.1875rem 0.1875rem 0rem,
        rgb(52 71 103 / 20%) 0rem 0.1875rem 0.0625rem -0.125rem,
        rgb(52 71 103 / 15%) 0rem 0.0625rem 0.3125rem 0rem;
      background-size: 150% !important;
      background-position-x: 25% !important;
      font-size: 0.75rem;
      border-radius: 0.5rem;
    }
  }
}

@media screen and (max-width: 900px) {
  .sort_footer {
    flex-direction: column;
    align-items: flex-start;
    .v-btn {
      width: 100%;
    }
  }
}
</style>
