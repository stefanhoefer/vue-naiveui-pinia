<script lang="ts" setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { NLayoutHeader, NIcon, NSpace, NTooltip } from 'naive-ui';

import { OpenOutline, HelpCircleOutline } from '@vicons/ionicons5';

import TheMenuMobileButton from './TheMenuMobileButton.vue';
import TheSiderMobile from './TheSiderMobile.vue';
import TheHeaderNotifications from './TheHeaderNotifications.vue';
import TheHeaderUserMenu from './TheHeaderUserMenu.vue';

const router = useRouter();

const currentPath = router.currentRoute.value.name;

const active = ref(false);
const activate = () => {
  active.value = true;
};
</script>

<template>
  <aside>
    <TheSiderMobile v-model:show="active" />
  </aside>
  <n-layout-header bordered class="sticky top-0 z-50 flex h-10 items-center px-4">
    <TheMenuMobileButton class="md:hidden" @click="activate" />
    <p class="text-gray-500">{{ currentPath }}</p>
    <n-space :size="20" style="line-height: 1" class="ml-auto">
      <n-tooltip>
        <template #trigger>
          <a href="https://google.com" target="_blank" rel="noopener noreferrer">
            <n-icon size="18">
              <OpenOutline />
            </n-icon>
          </a>
        </template>
        View the app's portfolio
      </n-tooltip>
      <n-tooltip>
        <template #trigger>
          <router-link :to="{ name: 'FAQ' }">
            <n-icon size="18">
              <HelpCircleOutline />
            </n-icon>
          </router-link>
        </template>
        Get help and answers to questions
      </n-tooltip>

      <TheHeaderNotifications />
      <TheHeaderUserMenu />
    </n-space>
  </n-layout-header>
</template>
