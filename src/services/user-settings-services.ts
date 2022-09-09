import { getCookie } from '@/composables/getCookie';
import type { Settings } from '../stores/user-settings-store';

const API_URL = 'http://localhost:8000/api/settings';

export async function postSettings(settings: Settings) {
  const data = { settings: settings };
  let response;
  const csrfToken = getCookie('XSRF-TOKEN');
  response = await fetch(API_URL + '/update-settings', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'XSRF-Token': csrfToken,
    },
    credentials: 'include',
  });
  if (!response.ok) {
    const error: Error = new Error('the settings change could not be handled');
    throw error;
  }
  response = response.json();
  return response;
}

// export async function resetAllSettings (data:any) {
//     let response;
//     const csrfToken = getCookie('XSRF-TOKEN');
//     response = await fetch(API_URL + '/update-one', {
//       method: 'POST',
//       body: JSON.stringify(data),
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         'XSRF-Token': csrfToken,
//       },
//       credentials: 'include',
//     });
//     if (!response.ok) {
//       const error: Error = new Error('oh my error occurred');
//       throw error;
//     }
//     response = response.json();
//     return response;
// };
