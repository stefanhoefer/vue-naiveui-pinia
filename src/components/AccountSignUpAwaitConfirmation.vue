<script setup lang="ts">
import { ref } from 'vue';
import { NH1, NP, NA, NIcon, useThemeVars } from 'naive-ui';

import { CheckmarkSharp } from '@vicons/ionicons5';

import AlertNotification from '@/components/AlertNotification.vue';
import BaseForm from '@/components/BaseForm.vue';

import { useUserStore } from '@/stores/user-store';

const userStore = useUserStore();
const newEmailSent = ref(false);

async function handleSendNewMail() {
  const emailSent = await userStore.getNewVerifyEmail();
  if (emailSent) {
    newEmailSent.value = true;
  }
}

const themeVars = useThemeVars();

const textColorSuccess = 'color: ' + themeVars.value.primaryColor;
</script>

<template>
  <BaseForm>
    <n-h1 class="my-0 py-2">Please verify your email</n-h1>
    <AlertNotification />
    <n-p> Once you verify your email address, you can get started tracking your workouts. </n-p>
    <br />
    <p class="mt-4 flex whitespace-pre align-middle">
      Didn't receive an email?
      <n-a v-if="!newEmailSent" @click="handleSendNewMail">Resend email.</n-a>
      <span v-else class="flex align-middle" :style="textColorSuccess">
        <n-icon size="18" class="self-center" :color="themeVars.primaryColor">
          <CheckmarkSharp />
        </n-icon>
        Email sent!
      </span>
    </p>
  </BaseForm>
</template>
