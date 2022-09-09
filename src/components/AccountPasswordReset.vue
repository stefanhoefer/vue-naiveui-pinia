<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
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
import AlertNotification from '@/components/AlertNotification.vue';
import { validators } from '@/composables/validators';
import BaseForm from '@/components/BaseForm.vue';

const router = useRouter();
const route = useRoute();
const globalStore = useGlobalStore();
const userStore = useUserStore();

const resetInput = ref({
  password: '',
  passwordConfirm: '',
});
const loading = ref(false);

const rules: FormRules = {
  password: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      return validators.password(value);
    },
    trigger: 'blur',
  },
  passwordConfirm: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      return validators.passwordConfirm(value, resetInput.value.password);
    },
    trigger: 'blur',
  },
};

const disabled = computed<boolean>(
  () =>
    validators.password(resetInput.value.password) instanceof Error ||
    validators.passwordConfirm(
      resetInput.value.passwordConfirm,
      resetInput.value.password,
    ) instanceof Error,
);

async function handlePasswordReset(e: Event) {
  e.preventDefault();
  loading.value = true;
  const token: string | undefined = route.query.token?.toString();
  if (token) {
    await userStore.resetPassword(resetInput.value.password, token);
    loading.value = false;
    if (userStore.user?.userId) {
      globalStore.alerts = [];
      router.push({ name: 'Dashboard' });
    }
  }
}

onMounted(() => (globalStore.alerts = []));
</script>

<template>
  <BaseForm>
    <n-h2 class="my-0 py-2">Reset your Password</n-h2>
    <AlertNotification />
    <n-form size="large" :rules="rules" :model="resetInput">
      <n-form-item-row label="Password" path="password">
        <n-input
          @focus="globalStore.alerts = []"
          v-model:value="resetInput.password"
          type="password"
          placeholder="Enter your password"
        />
      </n-form-item-row>
      <n-form-item-row label="Confirm password" path="passwordConfirm">
        <n-input
          @focus="globalStore.alerts = []"
          v-model:value="resetInput.passwordConfirm"
          type="password"
          placeholder="Confirm your password"
        />
      </n-form-item-row>
      <n-button
        type="primary"
        size="large"
        block
        :loading="loading"
        :disabled="disabled"
        @click="handlePasswordReset"
      >
        Reset</n-button
      >
    </n-form>
    <br />
  </BaseForm>
</template>
