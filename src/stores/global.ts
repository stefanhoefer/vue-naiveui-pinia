import { ref } from 'vue';
import { defineStore } from 'pinia';

export enum AlertTypes {
  default = 'default',
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
}

export interface AlertItem {
  id: Date;
  title: string;
  type: AlertTypes;
  message: string;
}

export interface ErrorClientResponse {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}

export const useGlobalStore = defineStore('global', () => {
  const siderIsCollapsed = ref(false);
  const alerts = ref<AlertItem[]>([]);

  function addAlert(title: string, type: AlertTypes, message: string) {
    const newAlert: AlertItem = {
      id: new Date(),
      title: title,
      type: type,
      message: message,
    };
    alerts.value.unshift(newAlert);
    if (newAlert.type !== AlertTypes.error && newAlert.type !== AlertTypes.warning) {
      setTimeout(() => resetError(newAlert.id), 3000);
    }
  }
  function resetError(alertId: Date) {
    const newAlertList = alerts.value.filter(alert => {
      return alert.id !== alertId;
    });
    alerts.value = newAlertList;
  }

  const getters = {};

  return { siderIsCollapsed, alerts, addAlert, resetError, getters };
});
