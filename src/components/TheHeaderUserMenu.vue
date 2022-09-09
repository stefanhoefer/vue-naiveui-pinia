<script lang="ts" setup>
import { useUserStore } from '@/stores/user-store';
import { useRouter } from 'vue-router';
import { NIcon, NDropdown } from 'naive-ui';

import { PersonCircleOutline } from '@vicons/ionicons5';

const userStore = useUserStore();
const router = useRouter();

async function handleLogout() {
  await userStore.logout();
  if (!userStore.user) {
    router.push({ name: 'login' });
  }
}

function handleSelect(key: string | number) {
  switch (key) {
    case 'account': {
      router.push({ name: 'Account' });
      break;
    }
    case 'settings': {
      router.push({ name: 'Settings' });
      break;
    }
    case 'imprint': {
      // todo
      break;
    }
    case 'privacy-policy': {
      // todo
      break;
    }
    case 'logout':
      {
        handleLogout();
      }
      break;
  }
}
</script>

<template>
  <n-dropdown
    trigger="click"
    placement="bottom-end"
    show-arrow
    :options="[
      {
        label: 'Account',
        key: 'account',
      },
      {
        label: 'Settings',
        key: 'settings',
      },
      {
        label: 'Imprint',
        key: 'imprint',
      },
      {
        label: 'Privacy Policy',
        key: 'privacy-policy',
      },
      {
        label: 'Log out',
        key: 'logout',
      },
    ]"
    @select="handleSelect"
  >
    <n-icon size="18" trigger="click" class="cursor-pointer"><PersonCircleOutline /></n-icon>
  </n-dropdown>
</template>
