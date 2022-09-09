<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  NH2,
  NForm,
  NFormItemRow,
  NInput,
  NButton,
  NDivider,
  type FormRules,
  type FormItemRule,
} from 'naive-ui';
import { useGlobalStore } from '@/stores/global';
import { useUserStore } from '@/stores/user-store';
import AlertNotification from '@/components/AlertNotification.vue';
import { validators } from '@/composables/validators';
import BaseForm from '@/components/BaseForm.vue';

const router = useRouter();
const globalStore = useGlobalStore();
const userStore = useUserStore();

const login = ref({
  email: '',
  password: '',
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
  password: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      return validators.password(value);
    },
    trigger: 'blur',
  },
};

const disabled = computed<boolean>(
  () =>
    validators.email(login.value.email) instanceof Error ||
    validators.password(login.value.password) instanceof Error,
);

function handleGetEmailLoginForm(e: Event) {
  e.preventDefault();
  loading.value = true;
  router.push({ name: 'login-with-link' });
  loading.value = false;
}

async function handleLogin(e: Event) {
  e.preventDefault();
  if (disabled.value) return;
  loading.value = true;
  await userStore.signInWithEmailAndPassword(login.value.email, login.value.password);
  loading.value = false;
  if (userStore.user?.userId) {
    globalStore.alerts = [];
    router.push({ name: 'Dashboard' });
  }
}
onMounted(() => (globalStore.alerts = []));
</script>

<template>
  <BaseForm>
    <n-h2 class="my-0 py-2">Login</n-h2>
    <AlertNotification />
    <n-form size="large" :rules="rules" :model="login">
      <n-form-item-row label="E-Mail" path="email" class="pt-4">
        <n-input
          v-model:value="login.email"
          placeholder="Enter your E-Mail"
          @focus="globalStore.alerts = []"
        />
      </n-form-item-row>
      <n-form-item-row label="Password" path="password">
        <n-input
          v-model:value="login.password"
          type="password"
          placeholder="Enter your password"
          @focus="globalStore.alerts = []"
          @keyup.enter="handleLogin"
        />
      </n-form-item-row>
      <n-button
        type="primary"
        size="large"
        block
        :loading="loading"
        :disabled="disabled"
        @click="handleLogin"
      >
        Sign In
      </n-button>
    </n-form>
    <br />
    <p class="mt-4">
      Don't have an account?
      <span class="cursor-pointer underline">
        <router-link to="/signup"> Register </router-link>
      </span>
    </p>
    <p>
      Forgot your password?
      <span class="cursor-pointer underline">
        <router-link to="/get-password-reset"> Click here to reset it </router-link>
      </span>
    </p>
    <n-divider> or </n-divider>
    <n-button tertiary type="primary" size="large" block @click="handleGetEmailLoginForm">
      Sign in With Magic Link</n-button
    >
  </BaseForm>
</template>
