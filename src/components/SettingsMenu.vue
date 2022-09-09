<script setup lang="ts">
import { ref } from 'vue';
import { NH1, NList, NListItem, NRadioGroup, NRadio, NSelect, NH3 } from 'naive-ui';
import { useSettingsStore, type SettingsProxy } from '../stores/user-settings-store';

const settingsStore = useSettingsStore();

const languageOptions = [
  {
    label: 'English',
    value: 'en',
  },
  // {
  //   label: 'Deutsch',
  //   value: 'de',
  // },
  {
    label: 'Stay tuned for more languages',
    value: '',
    disabled: true,
  },
];
const themes = [
  {
    value: 'system',
    label: 'system',
  },
  {
    value: 'light',
    label: 'light',
  },
  {
    value: 'dark',
    label: 'dark',
  },
];

const settingsProxy = ref<SettingsProxy>({
  theme: settingsStore.theme,
  language: settingsStore.language,
});

async function handleChange() {
  await settingsStore.updateSettings(settingsProxy);
  //   // applying settings from store
  settingsProxy.value = {
    theme: settingsStore.theme,
    language: settingsStore.language,
  };
}
</script>

<template>
  <n-h1>This is the settings page</n-h1>
  <n-list class="md:w-px500 my-4 flex w-5/6 max-w-xl flex-col">
    <n-list-item class="w-3/4">
      <n-h3> Language </n-h3>
      <n-select
        v-model:value="settingsProxy.language"
        filterable
        :clearable="false"
        :options="languageOptions"
        @update:value="handleChange"
      />
    </n-list-item>
    <n-list-item>
      <n-h3> Theme </n-h3>
      <n-radio-group
        v-model:value="settingsProxy.theme"
        name="theme-radio"
        @update:value="handleChange"
      >
        <n-radio v-for="item in themes" :key="item.value" :value="item.value">
          {{ item.value }}
        </n-radio>
      </n-radio-group>
    </n-list-item>
  </n-list>
</template>
