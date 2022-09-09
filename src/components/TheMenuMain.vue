<script lang="ts" setup>
import { h, ref, type Component } from 'vue';
import { RouterLink } from 'vue-router';
import { NMenu, type MenuOption, NIcon } from 'naive-ui';
import { HomeOutline, CalendarOutline, SettingsOutline } from '@vicons/ionicons5';

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Dashboard',
            params: {
              lang: 'en-US',
            },
          },
        },
        { default: () => 'Dashboard' },
      ),
    key: 'to-dashboard',
    icon: renderIcon(HomeOutline),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Calendar',
            params: {
              lang: 'en-US',
            },
          },
        },
        { default: () => 'Calendar' },
      ),
    key: 'to-calendar',
    icon: renderIcon(CalendarOutline),
  },
  {
    key: 'divider-1',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px',
      },
    },
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Settings',
            params: {
              lang: 'en-US',
            },
          },
        },
        { default: () => 'Settings' },
      ),
    key: 'settings',
    icon: renderIcon(SettingsOutline),
  },
];

const props = defineProps({
  menuCollapsed: Boolean,
});

const activeKey = ref<string | null>(null);
</script>

<template>
  <nav class="flex-1">
    <n-menu
      v-model:value="activeKey"
      :collapsed="props.menuCollapsed"
      :collapsed-width="64"
      :collapsed-icon-size="18"
      :options="menuOptions"
    />
  </nav>
</template>
