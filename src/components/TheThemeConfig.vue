<script setup lang="ts">
import { computed, type Ref } from 'vue';
import { Theme, useSettingsStore } from '@/stores/user-settings-store';
import {
  NConfigProvider,
  type GlobalThemeOverrides,
  useOsTheme,
  darkTheme,
  useThemeVars,
  enUS,
  dateEnUS,
} from 'naive-ui';

const modifiedEnUS = enUS;
enUS.DatePicker.firstDayOfWeek = 0;

const themeVars = useThemeVars();

const themeOverrides: Ref<GlobalThemeOverrides> = computed(() => {
  const overrides = {
    common: {},
    Button: {},
    Alert: {},
    List: {
      color: themeVars.value.bodyColor,
    },
  };
  return overrides;
});

const osThemeRef = useOsTheme();
const theme = computed(() => {
  const settingsStore = useSettingsStore();
  if (settingsStore.theme === Theme.system) {
    return osThemeRef.value === 'dark' ? darkTheme : null;
  }
  if (settingsStore.theme === Theme.light) {
    return null;
  }
  if (settingsStore.theme === Theme.dark) {
    return darkTheme;
  }
  // fallback to system theme
  return osThemeRef.value === 'dark' ? darkTheme : null;
});
</script>

<template>
  <n-config-provider
    :theme-overrides="themeOverrides"
    :theme="theme"
    :date-locale="dateEnUS"
    :locale="modifiedEnUS"
  >
    <slot></slot>
  </n-config-provider>
</template>
