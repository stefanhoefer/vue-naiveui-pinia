<script setup lang="ts">
import { NH1, NP, NA } from 'naive-ui';
import AccountForm from '@/components/BaseForm.vue';
</script>

<template>
  <AccountForm class="text-center">
    <n-h1 class="my-0 py-2">This site does not seem to exist</n-h1>
    <n-p> The resource you are looking for could not be found </n-p>
    <router-link to="/" #="{ navigate, href }" custom replace>
      <n-a :href="href" @click="navigate"> If not click here </n-a>
    </router-link>
    <br />
  </AccountForm>
</template>
