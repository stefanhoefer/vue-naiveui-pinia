<script lang="ts" setup>
import { NDrawer, NDrawerContent } from 'naive-ui';
import TheMenuMain from './TheMenuMain.vue';
</script>

<template>
  <n-drawer :width="230" placement="left" :auto-focus="false">
    <n-drawer-content title="Menu" closable placement="left">
      <TheMenuMain />
    </n-drawer-content>
  </n-drawer>
</template>
