<template>
  <div>
    <div class="sort t-color">
      <el-form
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        label-position="top"
      >
        <div class="sort_row">
          <el-form-item label="ID">
            <ComInput v-model="form._id" disabled placeholder="ID" />
          </el-form-item>
          <el-form-item label="createdAt">
            <ComInput
              :value="formatDate(form.createdAt)"
              disabled
              placeholder="createdAt"
            />
          </el-form-item>
        </div>
        <div class="sort_row">
          <el-form-item label="Email" prop="email">
            <ComInput v-model="form.email" placeholder="example@email.com" />
          </el-form-item>
          <el-form-item label="UserName" prop="username">
            <ComInput v-model="form.username" placeholder="UserName" />
          </el-form-item>
        </div>

        <!-- <el-form-item label="Phone Number">
          <ComInput v-model="form.user" placeholder="+40 735 631 620" />
        </el-form-item> -->
        <el-form-item label="introduce" prop="introduction">
          <ComInput
            v-model="form.introduction"
            maxlength="512"
            placeholder="Please input introduce"
            show-word-limit
            type="textarea"
            :autosize="{
              minRows: 4,
            }"
          />
        </el-form-item>
        <div class="sort_footer">
          <delConfirm
            v-model="showConfirm"
            persistent
            width="360"
            :loading="updateLoading"
            title="UPDATE INFO"
            text="The current operation will change personal information. Do you want to continue?"
          >
            <template #activator="{ props }">
              <v-btn v-bind="props">update info</v-btn>
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
                :loading="updateLoading"
                @click="hanldeSubmit"
                >COMFIRM</v-btn
              >
            </template>
          </delConfirm>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BasicInfo',
};
</script>
<script lang="ts" setup>
import { reactive, watchEffect, ref } from 'vue';
import { toRefs } from 'vue';

import CommonImg from '@/components/img/CommonImg.vue';
import ComInput from '@/components/input/BorInput.vue';
import delConfirm from '@/components/delConfirm/delConfirm.vue';

import { ElNotification } from 'element-plus';
import type { UserInfoInt, User } from '@/types/user';
import formatDate from '@/util/formatDate';
import type { FormInstance, FormRules } from 'element-plus';
import { updateInfo } from '@/api/api_user';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
const props = defineProps({
  userInfo: {
    type: Object as () => UserInfoInt,
    default: null,
  },
});
const rules: FormRules = {
  username: [
    {
      required: true,
      message: 'Please input username',
      trigger: 'blur',
    },
    { min: 5, max: 20, message: 'Length should be 5 to 20', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'Please input email', trigger: 'blur' },
    {
      type: 'email',
      message: 'Please input correct email address',
      trigger: ['blur', 'change'],
    },
  ],
  introduction: [
    { required: true, message: 'Please input introduct', trigger: 'blur' },
  ],
};
const { userInfo } = toRefs(props);
const form = reactive<User>({
  background: '',
  createdAt: '',
  email: '',
  introduction: '',
  user_pic: '',
  username: '',
  _id: '',
});
const ruleFormRef = ref<FormInstance>();
const updateLoading = ref(false);
const showConfirm = ref(false);

watchEffect(() => {
  form._id = userInfo.value._id;
  form.username = userInfo.value.username;
  form.email = userInfo.value.email;
  form.introduction = userInfo.value.introduction;
  form.createdAt = userInfo.value.createdAt;
  form.background = userInfo.value.background;
});

const hanldeSubmit = async () => {
  if (!ruleFormRef.value) return;
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      submit();
    }
  });
};

const submit = async () => {
  updateLoading.value = true;
  const params = {
    email: form.email,
    introduction: form.introduction,
    username: form.username,
  };
  // if (form.background) {
  //   params.background = form.background;
  // }
  // if (form.user_pic) {
  //   params.user_pic = form.user_pic;
  // }
  const { code } = await updateInfo(params);
  if (code === 200) {
    ElNotification({
      type: 'success',
      message: '操作成功！',
    });
    userStore.updatePartUserInfo(params);
  }
  updateLoading.value = false;
  showConfirm.value = false;
};
</script>

<style scoped lang="less">
.sort {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  &_footer {
    text-align: right;
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
</style>
