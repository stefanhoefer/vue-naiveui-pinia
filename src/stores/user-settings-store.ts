import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import { useGlobalStore, AlertTypes } from '@/stores/global';

import { postSettings } from '../services/user-settings-services';

export enum Theme {
  system = 'system',
  light = 'light',
  dark = 'dark',
}

export enum Languages {
  en = 'en',
  de = 'de',
}

export class Settings {
  theme: Theme;
  language: string;

  constructor(theme: Theme, language: string) {
    this.theme = theme;
    this.language = language;
  }
}

export const initialSettings = (language: string) => new Settings(Theme.system, language);

export interface SettingsProxy {
  theme: Theme;
  language: string;
}

export const useSettingsStore = defineStore('settings', {
  state: (): Settings => ({
    theme: Theme.system,
    language: Languages.en,
  }),
  actions: {
    async updateSettings(settingsProxy: Ref<SettingsProxy>) {
      const newSettings: Settings = {
        theme: settingsProxy.value.theme,
        language: settingsProxy.value.language,
      };

      const globalStore = useGlobalStore();
      let response;
      try {
        response = await postSettings(newSettings);
      } catch (error) {
        globalStore.addAlert(
          "Settings couldn't be saved",
          AlertTypes.error,
          'Something went wrong while saving the settings',
        );
        return false;
      }
      this.$state = response.settings;
      globalStore.addAlert('Settings saved!', AlertTypes.success, 'ADD WHAT WAS SAVED');
      return true;
    },
  },
  getters: {},
});
