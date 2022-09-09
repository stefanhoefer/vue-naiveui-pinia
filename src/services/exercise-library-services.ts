import { getCookie } from '@/composables/getCookie';
import type { Exercise } from '@/stores/exercise-library-store';

const API_URL = 'http://localhost:8000/api/exercise-library';

export async function fetchExercises() {
  let response;
  const csrfToken = getCookie('XSRF-TOKEN');
  response = await fetch(API_URL + '/exercises', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'XSRF-Token': csrfToken,
    },
    credentials: 'include',
  });
  if (!response.ok) {
    const error: Error = new Error('The exercises could not be fetched');
    throw error;
  }
  response = response.json();
  return response;
}

// TODO
export async function postNewExercise(data: Exercise) {
  let response;
  const csrfToken = getCookie('XSRF-TOKEN');
  response = await fetch(API_URL + '/exercise', {
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
    const error: Error = new Error('The exercise could not be created');
    throw error;
  }
  response = response.json();
  return response;
}

export async function deleteExercise(exerciseId: string) {
  let response;
  const data = { exerciseId: exerciseId };
  const csrfToken = getCookie('XSRF-TOKEN');
  response = await fetch(API_URL + '/exercise', {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'XSRF-Token': csrfToken,
    },
    credentials: 'include',
  });
  if (!response.ok) {
    const error: Error = new Error('The exercise could not be deleted');
    throw error;
  }
  response = response.json();
  return response;
}

export async function postDuplicateExercise(exerciseId: string) {
  let response;
  const data = { exerciseId: exerciseId };
  const csrfToken = getCookie('XSRF-TOKEN');
  response = await fetch(API_URL + '/exercise-duplicate', {
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
    const error: Error = new Error('The exercise could not be duplicated');
    throw error;
  }
  response = response.json();
  return response;
}
