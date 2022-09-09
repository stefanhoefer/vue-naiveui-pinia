import type {
  RegisterData,
  SignInEmailData,
  SignInWithLinkData,
  ProfileData,
} from '@/stores/user-store';
import { getCookie } from '@/composables/getCookie';

const API_URL = 'http://localhost:8000/api/auth';

export const auth = {
  register: async (data: RegisterData) => {
    let response;
    const csrfToken = getCookie('XSRF-TOKEN');
    response = await fetch(API_URL + '/signup', {
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
      const error: Error = new Error('oh my error occurred');
      throw error;
    }
    response = response.json();
    return response;
  },
  resendVerifyEmail: async (token: string) => {
    let response;
    const csrfToken = getCookie('XSRF-TOKEN');
    const data = {
      resendToken: token,
    };
    try {
      response = await fetch(API_URL + '/resend', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'XSRF-Token': csrfToken,
        },
        credentials: 'include',
      });
    } catch (error) {
      return error;
    }
    if (!response.ok) {
      const error: Error = new Error();
      throw error;
    }
  },
  getFirstSession: async (token: string) => {
    const data = { token: token };
    let response;
    const csrfToken = getCookie('XSRF-TOKEN');
    try {
      response = await fetch(API_URL + '/confirm', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'XSRF-Token': csrfToken,
        },
        credentials: 'include',
      });
    } catch (error) {
      return error;
    }
    if (!response) {
      const error: Error = new Error();
      throw error;
    }
    const responseData = await response.json();
    return responseData;
  },
  signIn: async (data: SignInEmailData) => {
    let response;
    const csrfToken = getCookie('XSRF-TOKEN');
    try {
      response = await fetch(API_URL + '/sign-in', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'XSRF-Token': csrfToken,
        },
        credentials: 'include', // include, *same-origin, omit
      });
    } catch (error) {
      return error;
    }
    if (!response.ok) {
      const error: Error = new Error();
      return error;
    }
    const responseData = await response.json();
    return responseData;
  },
  getSignInLink: async (data: SignInWithLinkData) => {
    let response;
    const csrfToken = getCookie('XSRF-TOKEN');
    try {
      response = await fetch(API_URL + '/get-sign-in-link', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'XSRF-Token': csrfToken,
        },
        credentials: 'include', // include, *same-origin, omit
      });
    } catch (error) {
      return error;
    }
    if (!response.ok) {
      const error: Error = new Error();
      return error;
    }
    const responseData = await response.json();
    return responseData;
  },
  signInWithEmail: async (token: string) => {
    const data = { token: token };
    let response;
    const csrfToken = getCookie('XSRF-TOKEN');
    try {
      response = await fetch(API_URL + '/sign-in-with-link', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'XSRF-Token': csrfToken,
        },
        credentials: 'include',
      });
    } catch (error) {
      return error;
    }
    if (!response) {
      const error: Error = new Error();
      throw error;
    }
    const responseData = await response.json();
    return responseData;
  },
  fetchSession: async () => {
    let response;
    try {
      response = await fetch(API_URL + '/get-session', {
        method: 'GET',
        credentials: 'include',
      });
    } catch (error) {
      return error;
    }
    if (!response.ok) {
      return new Error();
    }
    const responseData = await response.json();
    return responseData;
  },
  signOut: async () => {
    let response;
    const csrfToken = getCookie('XSRF-TOKEN');
    try {
      response = await fetch(API_URL + '/sign-out', {
        method: 'POST',
        headers: {
          'XSRF-Token': csrfToken,
        },
        credentials: 'include',
      });
    } catch (error) {
      return error;
    }
    if (!response.ok) {
      return new Error();
    }
  },
  initiatePasswordReset: async (email: string) => {
    let response;
    const csrfToken = getCookie('XSRF-TOKEN');
    const data = { email: email };
    try {
      response = await fetch(API_URL + '/initiate-password-reset', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'XSRF-Token': csrfToken,
        },
        credentials: 'include',
      });
    } catch (error) {
      return error;
    }
    if (!response.ok) {
      const error: Error = new Error();
      return error;
    }
    return true;
  },
  resetPassword: async (password: string, token: string) => {
    let response;
    const csrfToken = getCookie('XSRF-TOKEN');
    const data = { password: password, token: token };
    try {
      response = await fetch(API_URL + '/reset-password', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'XSRF-Token': csrfToken,
        },
        credentials: 'include', // include, *same-origin, omit
      });
    } catch (error) {
      return error;
    }
    if (!response.ok) {
      const error: Error = new Error();
      return error;
    }
    const responseData = await response.json();
    return responseData;
  },
  disablePasswordSignIn: async () => {
    let response;
    const csrfToken = getCookie('XSRF-TOKEN');
    const data = { passwordSignInEnabled: false };
    try {
      response = await fetch(API_URL + '/disable-password-sign-in', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'XSRF-Token': csrfToken,
        },
        credentials: 'include', // include, *same-origin, omit
      });
    } catch (error) {
      return error;
    }
    if (!response.ok) {
      const error: Error = new Error();
      return error;
    }
    const responseData = await response.json();
    return responseData;
  },
  enablePasswordSignIn: async (password: string) => {
    let response;
    const csrfToken = getCookie('XSRF-TOKEN');
    const data = { password: password };
    try {
      response = await fetch(API_URL + '/enable-password-sign-in', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'XSRF-Token': csrfToken,
        },
        credentials: 'include', // include, *same-origin, omit
      });
    } catch (error) {
      return error;
    }
    if (!response.ok) {
      const error: Error = new Error();
      return error;
    }
    const responseData = await response.json();
    return responseData;
  },

  changePassword: async (oldPassword: string, newPassword: string) => {
    let response;
    const csrfToken = getCookie('XSRF-TOKEN');
    const data = { oldPassword: oldPassword, newPassword: newPassword };
    try {
      response = await fetch(API_URL + '/change-password', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'XSRF-Token': csrfToken,
        },
        credentials: 'include', // include, *same-origin, omit
      });
    } catch (error) {
      return error;
    }
    if (!response.ok) {
      const error: Error = new Error();
      return error;
    }
    const responseData = await response.json();
    return responseData;
  },
  changeProfile: async (data: ProfileData) => {
    let response;
    const csrfToken = getCookie('XSRF-TOKEN');
    response = await fetch(API_URL + '/update-profile', {
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
      const error: Error = new Error('oh my error occurred');
      throw error;
    }
    response = response.json();
    return response;
  },
  getVerifyLinkNewEmail: async (email: string) => {
    let response;
    const csrfToken = getCookie('XSRF-TOKEN');
    const data = {
      newEmail: email,
    };
    try {
      response = await fetch(API_URL + '/initiate-update-email', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'XSRF-Token': csrfToken,
        },
        credentials: 'include',
      });
    } catch (error) {
      return error;
    }
    if (!response.ok) {
      const error: Error = new Error();
      throw error;
    }
  },
  getNewEmailConfirmation: async (token: string) => {
    const data = { token: token };
    let response;
    const csrfToken = getCookie('XSRF-TOKEN');
    try {
      response = await fetch(API_URL + '/update-email', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'XSRF-Token': csrfToken,
        },
        credentials: 'include',
      });
    } catch (error) {
      return error;
    }
    if (!response) {
      const error: Error = new Error();
      throw error;
    }
    const responseData = await response.json();
    return responseData;
  },
  deleteUser: async (email: string) => {
    const data = { enteredEmail: email };
    let response;
    const csrfToken = getCookie('XSRF-TOKEN');
    try {
      response = await fetch(API_URL + '/delete-user', {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'XSRF-Token': csrfToken,
        },
        credentials: 'include',
      });
    } catch (error) {
      return error;
    }
    if (!response) {
      const error: Error = new Error();
      throw error;
    }
    const responseData = await response.json();
    return responseData;
  },
};
