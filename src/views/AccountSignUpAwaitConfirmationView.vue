<script setup lang="ts">
import AccountSignUpAwaitConfirmation from '@/components/AccountSignUpAwaitConfirmation.vue';
import router from '@/router/index';
import { useUserStore } from '@/stores/user-store';

const userStore = useUserStore();

if (userStore.user?.userId) {
  router.push({ path: '/', replace: true });
}
</script>

<template>
  <AccountSignUpAwaitConfirmation />
</template>
