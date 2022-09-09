<script setup lang="ts">
import { NThemeEditor } from 'naive-ui'; // dev: theme editor

import { RouterView } from 'vue-router';
import TheThemeConfig from './components/TheThemeConfig.vue';
</script>

<template>
  <TheThemeConfig>
    <n-theme-editor class="z-20">
      <RouterView />
    </n-theme-editor>
  </TheThemeConfig>
</template>
