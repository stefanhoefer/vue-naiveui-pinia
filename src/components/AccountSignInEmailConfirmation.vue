<script setup lang="ts">
import { onMounted } from 'vue';
import { NH1, NSpin, NP, NA } from 'naive-ui';
import { useRouter, useRoute, RouterLink } from 'vue-router';
import BaseForm from '@/components/BaseForm.vue';

import { useGlobalStore } from '@/stores/global';
import { useUserStore } from '@/stores/user-store';

const globalStore = useGlobalStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

async function initialLogin() {
  const token: string | undefined = route.query.token?.toString();
  if (token) {
    await userStore.signInWithEmail(token);
    if (userStore.user?.userId) {
      globalStore.alerts = [];
    }
  }
  return;
}

onMounted(() => {
  initialLogin().then(() => {
    setTimeout(() => {
      if (userStore.user?.userId) {
        router.replace({ name: 'Dashboard' });
      } else {
        router.replace({ name: 'login' });
      }
    }, 2500);
  });
});
</script>

<template>
  <BaseForm class="text-center">
    <n-h1 class="my-0 py-2">Thanks and welcome!</n-h1>
    <n-p> Hold on you are being redirected. </n-p>
    <router-link v-if="userStore.user" to="/" #="{ navigate, href }" custom replace>
      <n-a :href="href" @click="navigate"> If not click here </n-a>
    </router-link>
    <router-link v-else to="/login" #="{ navigate, href }" custom replace>
      <n-a :href="href" @click="navigate"> If not click here </n-a>
    </router-link>
    <br />
    <br />
    <n-spin size="medium" />
  </BaseForm>
</template>
