<script lang="ts" setup>
import { NButton, NIcon, type ButtonProps } from 'naive-ui';
import { MenuOutline } from '@vicons/ionicons5';

type ButtonThemeOverrides = NonNullable<ButtonProps['themeOverrides']>;

const buttonThemeOverrides: ButtonThemeOverrides = {};
</script>

<template>
  <n-button
    quaternary
    circle
    type="primary"
    :theme-overrides="buttonThemeOverrides"
    :focusable="false"
  >
    <template #icon>
      <n-icon><MenuOutline /></n-icon>
    </template>
  </n-button>
</template>
