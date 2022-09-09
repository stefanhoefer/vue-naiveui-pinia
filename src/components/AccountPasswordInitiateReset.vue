<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import {
  NH2,
  NForm,
  NFormItemRow,
  NInput,
  NButton,
  type FormRules,
  type FormItemRule,
} from 'naive-ui';
import { useGlobalStore } from '@/stores/global';
import { useUserStore } from '@/stores/user-store';
import { validators } from '@/composables/validators';
import AlertNotification from '@/components/AlertNotification.vue';
import BaseForm from '@/components/BaseForm.vue';

const globalStore = useGlobalStore();
const userStore = useUserStore();

const userEmail = ref({
  email: '',
});
const loading = ref(false);

const rules: FormRules = {
  email: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        return validators.email(value);
      },
      trigger: 'blur',
    },
  ],
};

const disabled = computed<boolean>(() => validators.email(userEmail.value.email) instanceof Error);

async function handleGetPasswordReset(e: Event) {
  e.preventDefault();
  loading.value = true;
  await userStore.getPasswordResetMail(userEmail.value.email);
  loading.value = false;
}
onMounted(() => (globalStore.alerts = []));
</script>

<template>
  <BaseForm>
    <n-h2 class="my-0 py-2">Enter your Email</n-h2>
    <AlertNotification />
    <n-form size="large" :rules="rules" :model="userEmail">
      <n-form-item-row label="E-Mail" path="email" class="pt-4">
        <n-input
          @focus="globalStore.alerts = []"
          v-model:value="userEmail.email"
          placeholder="Enter your E-Mail"
        />
      </n-form-item-row>
      <n-button
        type="primary"
        size="large"
        block
        :loading="loading"
        :disabled="disabled"
        @click="handleGetPasswordReset"
      >
        Reset</n-button
      >
    </n-form>
    <br />
    <p class="mt-4">
      Don't have an account?
      <span class="cursor-pointer underline">
        <router-link to="/signup"> Sign Up </router-link>
      </span>
    </p>
  </BaseForm>
</template>
