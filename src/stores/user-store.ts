import { defineStore } from 'pinia';

import { auth } from '@/services/user-services';

import { useGlobalStore } from '@/stores/global';

import { useSettingsStore, initialSettings, Languages, Settings } from './user-settings-store';
import { AlertTypes } from '@/stores/global';

export interface RegisterData {
  email: string;
  password: string;
  settings: Settings;
}

export interface ProfileData {
  firstName: string | undefined;
  lastName: string | undefined;
  yearOfBirth: number | undefined;
  gender: string | undefined;
}

export interface SignInEmailData {
  email: string;
  password: string;
}

export interface SignInWithLinkData {
  email: string;
  settings: Settings;
}

export interface SessionData {
  userId: string;
  email: string;
  pwSignInEnabled: boolean;
  firstName: string | undefined;
  lastName: string | undefined;
  yearOfBirth: number | undefined;
  gender: string | undefined;
}

interface State {
  user: SessionData | null;
  resendToken: string | null;
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    user: null,
    resendToken: null,
  }),
  actions: {
    async register(email: string, password: string) {
      let response;
      const globalStore = useGlobalStore();
      const settings = initialSettings(Languages.en);
      const signupData: RegisterData = {
        email: email,
        password: password,
        settings: settings,
      };
      let existsAlready = null;
      try {
        response = await auth.register(signupData);
      } catch (error) {
        globalStore.addAlert('some alert title', AlertTypes.error, 'some error message');
        return;
      }
      existsAlready = response.existsAlready;

      if (existsAlready) {
        globalStore.addAlert(
          'User already exists',
          AlertTypes.error,
          'A user associated with this mail exists already. We just resend a confirmation email so that you can get started',
        );
      }
      this.resendToken = response.resendToken;
      return existsAlready;
    },
    async getNewVerifyEmail() {
      const token = this.resendToken;
      try {
        if (token) {
          await auth.resendVerifyEmail(token);
        }
      } catch (error) {
        return false;
      }
      return true;
    },
    async firstLogin(token: string) {
      const globalStore = useGlobalStore();
      const settingsStore = useSettingsStore();
      const response = await auth.getFirstSession(token);
      if (response instanceof Error) {
        this.user = null;
        globalStore.addAlert(
          'Client sign in error',
          AlertTypes.error,
          'something went wrong signing on the client',
        );
        return;
      }
      this.user = response.sessionData;
      settingsStore.$state = response.settings;
      return response.profileExistsAlready;
    },
    async updateProfile(
      firstName?: string,
      lastName?: string,
      yearOfBirth?: number,
      gender?: string,
    ) {
      const globalStore = useGlobalStore();
      const profileData: ProfileData = {
        firstName: firstName,
        lastName: lastName,
        yearOfBirth: yearOfBirth,
        gender: gender,
      };
      let response;

      try {
        response = await auth.changeProfile(profileData);
      } catch (error) {
        globalStore.addAlert(
          'Error while updating the profile',
          AlertTypes.error,
          'Something went wrong while updating the profile',
        );
        return false;
      }
      if (!response) {
        globalStore.addAlert(
          'Error while updating the profile',
          AlertTypes.error,
          'Something went wrong while updating the profile',
        );
        return false;
      }
      if (this.user) {
        this.user.firstName = response.sessionData.firstName;
        this.user.lastName = response.sessionData.lastName;
        this.user.yearOfBirth = response.sessionData.yearOfBirth;
        this.user.gender = response.sessionData.gender;
      }
      globalStore.addAlert(
        'Profile updated!',
        AlertTypes.success,
        'Your profile data has been updated successfully',
      );
      return true;
    },
    async signInWithEmailAndPassword(email: string, password: string) {
      const globalStore = useGlobalStore();
      const settingsStore = useSettingsStore();
      const signInData: SignInEmailData = {
        email: email,
        password: password,
      };
      const response = await auth.signIn(signInData);

      if (response instanceof Error || !response.userId) {
        this.user = null;

        globalStore.addAlert('Sign In Error', AlertTypes.error, 'Something went wrong signing in');
      }
      this.user = response.sessionData;
      settingsStore.$state = response.settings;
    },
    async initiateSignInWithEmail(email: string) {
      const globalStore = useGlobalStore();
      const settings = initialSettings(Languages.en);

      const signInData: SignInWithLinkData = {
        email: email,
        settings: settings,
      };

      const response = await auth.getSignInLink(signInData);

      if (response instanceof Error) {
        this.user = null;
        globalStore.addAlert(
          'Client sign in error',
          AlertTypes.error,
          'something went wrong signing on the client',
        );
        return;
      }
      globalStore.addAlert('Email sent!', AlertTypes.success, 'Check your inbox to login.');
      return response;
    },
    async signInWithEmail(token: string) {
      const globalStore = useGlobalStore();
      const settingsStore = useSettingsStore();
      const response = await auth.signInWithEmail(token);
      if (response instanceof Error) {
        this.user = null;
        globalStore.addAlert(
          'Client sign in error',
          AlertTypes.error,
          'something went wrong signing on the client',
        );
        return;
      }
      this.user = response.sessionData;
      settingsStore.$state = response.settings;
    },
    async logout() {
      const globalStore = useGlobalStore();
      const response = await auth.signOut();
      if (response instanceof Error) {
        globalStore.addAlert('some alert title', AlertTypes.error, 'some logout error message');
        return;
      }
      this.user = null;
    },
    async fetchUser() {
      const settingsStore = useSettingsStore();
      const response = await auth.fetchSession();
      if (response instanceof Error) {
        this.user = null;
        return;
      }
      this.user = response.sessionData;
      settingsStore.$state = response.settings;
    },
    async getPasswordResetMail(email: string) {
      const globalStore = useGlobalStore();
      const response = await auth.initiatePasswordReset(email);
      if (response instanceof Error) {
        this.user = null;
        return;
      }
      globalStore.addAlert(
        'Password reset initiated!',
        AlertTypes.success,
        'If you have an account, we have just sent you a mail',
      );

      return response;
    },
    async resetPassword(password: string, token: string) {
      const settingsStore = useSettingsStore();
      const response = await auth.resetPassword(password, token);
      if (response instanceof Error) {
        this.user = null;
        return;
      }
      this.user = response.sessionData;
      settingsStore.$state = response.settings;
    },
    async disablePasswordAuth() {
      const globalStore = useGlobalStore();
      const response = await auth.disablePasswordSignIn();
      if (response instanceof Error) {
        globalStore.addAlert(
          'Password authentication could not be disabled',
          AlertTypes.error,
          'Something went wrong while disabling password sign in.',
        );
        return;
      }
      this.user = response.sessionData;
      globalStore.addAlert(
        'Password authentication disabled',
        AlertTypes.success,
        'Sign in with password was successfully disabled',
      );
    },
    async enablePasswordAuth(newPassword: string, newPasswordConfirmed: string) {
      const globalStore = useGlobalStore();
      if (newPassword !== newPasswordConfirmed) {
        globalStore.addAlert(
          'Password authentication could not be enabled',
          AlertTypes.error,
          'The values in the password fields must match.',
        );
        return;
      }
      const response = await auth.enablePasswordSignIn(newPassword);
      if (response instanceof Error) {
        globalStore.addAlert(
          'Password authentication could not be enabled',
          AlertTypes.error,
          'Something went wrong while enabling password sign in.',
        );
        return;
      }
      if (this.user) {
        this.user.pwSignInEnabled = response.pwSignInEnabled;
      }
      globalStore.addAlert(
        'Password authentication enabled',
        AlertTypes.success,
        'Sign in with password was successfully enabled. You can now sign in with your set password.',
      );
    },
    async changePassword(oldPassword: string, newPassword: string, newPasswordConfirmed: string) {
      const globalStore = useGlobalStore();
      if (newPassword !== newPasswordConfirmed) {
        globalStore.addAlert(
          'Password could not be changed',
          AlertTypes.error,
          'The values in the new password fields must match.',
        );
        return false;
      }
      const response = await auth.changePassword(oldPassword, newPassword);
      if (response instanceof Error) {
        globalStore.addAlert(
          'Password could not be changed',
          AlertTypes.error,
          'Something went wrong while changing the password.',
        );
        return false;
      }
      this.user = response.sessionData;
      globalStore.addAlert(
        'Password changed',
        AlertTypes.success,
        'Your password was successfully changed.',
      );
      return true;
    },
    async getVerifyEmailNewEmail(email: string) {
      // add if email not changed, disable sending
      try {
        await auth.getVerifyLinkNewEmail(email);
      } catch (error) {
        return false;
      }
      return true;
    },
    async verifyNewEmail(token: string) {
      const globalStore = useGlobalStore();
      const settingsStore = useSettingsStore();
      const response = await auth.getNewEmailConfirmation(token);
      if (response instanceof Error) {
        this.user = null;
        globalStore.addAlert(
          'Email verification error',
          AlertTypes.error,
          'Something went wrong verifying the new email',
        );
        return false;
      }
      this.user = response.sessionData;
      settingsStore.$state = response.settings;
      return true;
    },
    async initiateAccountDeletion(submittedUserEmail: string) {
      const globalStore = useGlobalStore();
      const response = await auth.deleteUser(submittedUserEmail);
      if (response instanceof Error) {
        globalStore.addAlert(
          'Email verification error',
          AlertTypes.error,
          'Something went wrong verifying the new email',
        );
        return false;
      }
      this.user = null;
      return true;
    },
  },
  getters: {
    getUser: state => state.user,
  },
});
