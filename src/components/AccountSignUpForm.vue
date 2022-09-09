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
  // type SelectOption,
} from 'naive-ui';
import { useGlobalStore } from '@/stores/global';
import { useUserStore } from '@/stores/user-store';
import AlertNotification from '@/components/AlertNotification.vue';
import { validators } from '@/composables/validators';
import BaseForm from '@/components/BaseForm.vue';

const router = useRouter();
const globalStore = useGlobalStore();
const userStore = useUserStore();

interface RegisterType {
  email: string;
  password: string;
  passwordConfirm: string;
}
const Register = ref({} as RegisterType);

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
  passwordConfirm: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      return validators.passwordConfirm(value, Register.value.password);
    },
    trigger: 'blur',
  },
};

const disabled = computed<boolean>(
  () =>
    validators.email(Register.value.email) instanceof Error ||
    validators.password(Register.value.password) instanceof Error ||
    validators.passwordConfirm(Register.value.passwordConfirm, Register.value.password) instanceof
      Error,
);

async function handleSignUp(e: Event) {
  e.preventDefault();
  loading.value = true;
  const existsAlready = await userStore.register(Register.value.email, Register.value.password);

  loading.value = false;
  if (existsAlready === false) {
    router.push({ name: 'verify-email' });
  }
}
function handleGetEmailLoginForm(e: Event) {
  e.preventDefault();
  loading.value = true;
  router.push({ name: 'login-with-link' });
  loading.value = false;
}

onMounted(() => (globalStore.alerts = []));
</script>

<template>
  <BaseForm>
    <n-h2 class="my-0 py-4">Register</n-h2>
    <AlertNotification />
    <n-form size="large" :rules="rules" :model="Register">
      <n-form-item-row label="E-Mail" path="email">
        <n-input
          @focus="globalStore.alerts = []"
          v-model:value="Register.email"
          placeholder="Enter your E-Mail"
        />
      </n-form-item-row>
      <n-form-item-row label="Password" path="password">
        <n-input
          @focus="globalStore.alerts = []"
          v-model:value="Register.password"
          type="password"
          placeholder="Enter your password"
        />
      </n-form-item-row>
      <n-form-item-row label="Confirm password" path="passwordConfirm">
        <n-input
          @focus="globalStore.alerts = []"
          v-model:value="Register.passwordConfirm"
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
        @click="handleSignUp"
      >
        Register</n-button
      >
    </n-form>
    <br />
    <p class="mt-4">
      Already have an account?
      <span class="cursor-pointer underline">
        <router-link to="/login"> Sign In </router-link>
      </span>
    </p>
    <n-divider> or </n-divider>
    <n-button
      tertiary
      type="primary"
      size="large"
      block
      :loading="loading"
      @click="handleGetEmailLoginForm"
    >
      Sign in With Magic Link</n-button
    >
  </BaseForm>
</template>
