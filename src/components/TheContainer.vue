<script setup lang="ts">
import {
  NSpace,
  NLayout,
  NLayoutContent,
  NDialogProvider,
  NThemeEditor, // dev: theme editor
} from 'naive-ui';

import TheSider from '@/components/TheSider.vue';
import TheHeader from '@/components/TheHeader.vue';
import TheThemeConfig from '@/components/TheThemeConfig.vue';
import AlertNotification from './AlertNotification.vue';
</script>

<template>
  <TheThemeConfig>
    <n-dialog-provider>
      <n-theme-editor>
        <n-space vertical size="large">
          <n-layout position="absolute" has-sider>
            <TheSider />
            <n-layout>
              <TheHeader />
              <n-layout-content class="px-4 pt-2 lg:max-w-6xl">
                <AlertNotification
                  class="z-[3000] hidden max-h-full min-h-0 overflow-y-auto sm:fixed sm:right-4 sm:block sm:w-72"
                />
                <AlertNotification
                  class="absolute inset-x-4 z-[3000] max-h-52 overflow-y-auto sm:hidden"
                />
                <slot></slot>
              </n-layout-content>
            </n-layout>
          </n-layout>
        </n-space>
      </n-theme-editor>
    </n-dialog-provider>
  </TheThemeConfig>
</template>
