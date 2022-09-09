<script lang="ts" setup>
import { NLayoutSider } from 'naive-ui';
import { useGlobalStore } from '@/stores/global';
import TheMenuMobileButton from './TheMenuMobileButton.vue';
import TheMenuMain from './TheMenuMain.vue';

const globalStore = useGlobalStore();

function handleClick() {
  if (globalStore.siderIsCollapsed === true) {
    globalStore.siderIsCollapsed = false;
  } else {
    globalStore.siderIsCollapsed = true;
  }
}
</script>

<template>
  <n-layout-sider
    class="hidden md:block"
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="globalStore.siderIsCollapsed"
    @collapse="globalStore.siderIsCollapsed = true"
    @expand="globalStore.siderIsCollapsed = false"
  >
    <aside class="flex h-screen flex-col justify-end">
      <section
        :class="globalStore.siderIsCollapsed ? 'justify-around' : 'justify-end'"
        class="inline-flex h-10 items-center px-2"
      >
        <TheMenuMobileButton @click="handleClick" />
      </section>
      <TheMenuMain :menu-collapsed="globalStore.siderIsCollapsed" />
    </aside>
  </n-layout-sider>
</template>
