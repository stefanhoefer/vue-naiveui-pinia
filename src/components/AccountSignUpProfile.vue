<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import {
  NH2,
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NText,
  NSelect,
  NButton,
  type FormRules,
  type FormItemRule,
  // type SelectOption,
} from 'naive-ui';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
import { useUserStore, type ProfileData } from '@/stores/user-store';
import AlertNotification from '@/components/AlertNotification.vue';
import { validators } from '@/composables/validators';
import BaseForm from '@/components/BaseForm.vue';

const router = useRouter();
const globalStore = useGlobalStore();
const userStore = useUserStore();

const Profile = ref({} as ProfileData);

const loading = ref(false);

const rules: FormRules = {
  firstName: {
    required: false,
    validator(rule: FormItemRule, value: string) {
      if (value) {
        return validators.name(value);
      }
    },
    trigger: 'blur',
  },
  lastName: {
    required: false,
    validator(rule: FormItemRule, value: string) {
      if (value) {
        return validators.name(value);
      }
    },
    trigger: 'blur',
  },
  yearOfBirth: {
    required: false,
    validator(rule: FormItemRule, value: number) {
      if (value) {
        return validators.yearOfBirth(value);
      }
    },
    trigger: 'blur',
  },
};

const disabled = computed<boolean>(
  () =>
    // validators.name(Profile.value.firstName) instanceof Error ||
    // validators.name(Profile.value.lastName) instanceof Error
    false,
);

async function handleProfileCompletion(e: Event) {
  e.preventDefault();
  loading.value = true;
  await userStore.updateProfile(
    Profile.value.firstName,
    Profile.value.lastName,
    Profile.value.yearOfBirth,
    Profile.value.gender,
  );
  loading.value = false;
  router.push({ name: 'Dashboard' });
}

const genderOptions = [
  {
    label: 'Female',
    value: 'female',
  },
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Nonbinary',
    value: 'nonbinary',
  },
];

onMounted(() => (globalStore.alerts = []));
</script>

<template>
  <BaseForm>
    <n-h2 class="my-0 py-4">Complete your Profile</n-h2>
    <AlertNotification />
    <n-form size="large" :rules="rules" :model="Profile">
      <div class="flex flex-row gap-x-2">
        <n-form-item label="First Name" path="firstName" class="grow">
          <n-input v-model:value="Profile.firstName" placeholder="Enter your first name" />
        </n-form-item>
        <n-form-item label="Last Name" path="lastName" class="grow">
          <n-input v-model:value="Profile.lastName" placeholder="Enter your last name" />
        </n-form-item>
      </div>
      <n-text depth="3">
        If you feel comfortable sharing your year of birth and gender, you can do so below.
      </n-text>
      <div class="flex flex-row gap-x-2">
        <n-form-item label="Year of Birth" path="yearOfBirth" class="flex-1">
          <n-input-number
            v-model:value="Profile.yearOfBirth"
            placeholder="YYYY"
            clearable
            :show-button="false"
          />
        </n-form-item>
        <n-form-item label="Gender" path="gender" class="flex-1">
          <n-select
            v-model:value="Profile.gender"
            :options="genderOptions"
            placeholder="Gender"
            filterable
            clearable
          />
        </n-form-item>
      </div>
      <n-button
        type="primary"
        size="large"
        block
        :loading="loading"
        :disabled="disabled"
        @click="handleProfileCompletion"
      >
        Submit</n-button
      >
    </n-form>
    <p class="mt-4">
      Not interested?
      <span class="cursor-pointer underline">
        <router-link to="/"> Click here to get to the dashboard </router-link>
      </span>
    </p>
  </BaseForm>
</template>
