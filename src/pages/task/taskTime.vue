<template>
  <div class="sort">
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      size="large"
      status-icon
    >
      <el-form-item label="startTime" prop="startTime">
        <el-date-picker
          v-model="form.startTime"
          type="datetime"
          disabled
          placeholder="Select date and time"
        />
      </el-form-item>
      <el-form-item label="planTime" prop="needTime">
        <el-date-picker
          v-model="form.needTime"
          type="datetime"
          placeholder="Select date and time"
        />
      </el-form-item>
    </el-form>
    <span class="sort_footer">
      <el-button @click="emit('close')">Cancel</el-button>
      <el-button type="primary" :loading="submitLoad" @click="handleSumit">
        Confirm
      </el-button>
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TaskTime',
};
</script>
<script lang="ts" setup>
import { reactive, ref, defineExpose } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

const emit = defineEmits(['close', 'submit']);
const formRef = ref<FormInstance>();
const form = reactive({
  startTime: Date.now(),
  needTime: Date.now(),
});
const rules: FormRules = {
  startTime: [
    { required: true, message: 'Please input startTime', trigger: 'blur' },
  ],
  needTime: [
    {
      required: true,
      message: 'Please input needTime',
      trigger: 'blur',
    },
  ],
};
const submitLoad = ref(false);

const handleSumit = async () => {
  if (!formRef.value) {
    return;
  }
  await formRef.value.validate((valid) => {
    if (valid) {
      submitLoad.value = true;
      emit('submit', form);
    } else {
      console.log('error submit!');
    }
  });
};

defineExpose({
  submitLoad,
});
</script>

<style lang="less" scoped>
.sort {
  &_footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
