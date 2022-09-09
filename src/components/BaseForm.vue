<script setup lang="ts">
import { NH1, NCard } from 'naive-ui';
</script>

<template>
  <section class="flex min-h-screen w-full flex-col items-center justify-center dark:bg-black">
    <n-card
      size="large"
      class="md:w-px500 my-4 flex w-5/6 max-w-lg flex-col drop-shadow-lg"
      content-style="padding: 1.5rem"
    >
      <n-h1 class="text-center"> PAGE NAME + LOGO</n-h1>
      <slot></slot>
    </n-card>
  </section>
</template>
