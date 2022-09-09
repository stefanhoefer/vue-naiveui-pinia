<script lang="ts" setup>
import { NIcon, NPopover, NBadge, NList, NListItem } from 'naive-ui';
import { NotificationsOutline } from '@vicons/ionicons5';
</script>

<template>
  <n-popover trigger="click" placement="bottom-end" :width="300">
    <template #trigger>
      <n-badge dot processing class="cursor-pointer">
        <n-icon size="18"><NotificationsOutline /></n-icon>
      </n-badge>
    </template>
    <n-list style="margin: 0">
      <n-list-item v-for="i in 5" :key="i"> Notification {{ i }} </n-list-item>
    </n-list>
  </n-popover>
</template>
