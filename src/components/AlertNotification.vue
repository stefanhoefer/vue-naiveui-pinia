<script setup lang="ts">
import { NAlert, type AlertProps, NCollapseTransition } from 'naive-ui';
import { useGlobalStore } from '@/stores/global';

type AlertThemeOverrides = NonNullable<AlertProps['themeOverrides']>;

const alertThemeOverrides: AlertThemeOverrides = {
  // closeMargin: '8px 8px 0 0',
  // padding: '0.5rem 2rem 0.5rem 0.5rem',
  // lineHeight: '1.25',
  // borderRadius: '6px',
};

const globalStore = useGlobalStore();
</script>

<template>
  <div>
    <!-- Fix transition -->
    <n-collapse-transition appear>
      <n-alert
        v-for="alert of globalStore.alerts"
        closable
        :show-icon="false"
        :title="alert.title"
        :type="alert.type"
        :key="alert.id.toISOString()"
        :on-after-leave="() => globalStore.resetError(alert.id)"
        :theme-overrides="alertThemeOverrides"
        class="mb-2"
      >
        {{ alert.message }}
      </n-alert>
    </n-collapse-transition>
  </div>
</template>
