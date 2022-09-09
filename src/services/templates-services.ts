import { getCookie } from '@/composables/getCookie';
import type { Template } from '../stores/templates-store';

const API_URL = 'http://localhost:8000/api/templates';

export async function fetchTemplates() {
  let response;
  const csrfToken = getCookie('XSRF-TOKEN');
  response = await fetch(API_URL + '/templates', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'XSRF-Token': csrfToken,
    },
    credentials: 'include',
  });
  if (!response.ok) {
    const error: Error = new Error('The templates could not be fetched');
    throw error;
  }
  response = response.json();
  return response;
}
export async function postTemplateRanks(templates: Template[]) {
  const data = { templates: templates };
  let response;
  const csrfToken = getCookie('XSRF-TOKEN');
  response = await fetch(API_URL + '/template-ranks', {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'XSRF-Token': csrfToken,
    },
    credentials: 'include',
  });
  if (!response.ok) {
    const error: Error = new Error('The template order could not be updated');
    throw error;
  }
  response = response.json();
  return response;
}
