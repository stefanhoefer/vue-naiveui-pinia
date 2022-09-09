<script setup lang="ts">
import { ref, computed, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  NH1,
  NButton,
  NList,
  NP,
  NListItem,
  NSpace,
  NH3,
  NH4,
  NInput,
  NInputNumber,
  NSelect,
  NSwitch,
  NForm,
  NFormItem,
  NFormItemRow,
  NModal,
  useThemeVars,
  type ListProps,
  type FormRules,
  type FormItemRule,
  type ButtonProps,
} from 'naive-ui';
import { validators } from '@/composables/validators';
import { useUserStore } from '@/stores/user-store';

const userStore = useUserStore();

const email = ref({
  newEmail: userStore.user?.email || '',
});
const emailChangeDisabled = ref(true);
const loadingEmailChange = ref(false);
const showEmailModal = ref(false);
const emailSubmitDisabled = computed<boolean>(
  () => validators.email(email.value.newEmail) instanceof Error,
);
const emailRules: FormRules = {
  newEmail: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        return validators.email(value);
      },
      trigger: 'input',
    },
  ],
};
const emailChangeSubmitDisabled = computed<boolean>(
  () => validators.email(email.value.newEmail) instanceof Error,
);
async function initiateEmailChange(e: Event) {
  e.preventDefault();
  if (emailSubmitDisabled.value) return;
  loadingEmailChange.value = true;
  await userStore.getVerifyEmailNewEmail(email.value.newEmail);
  loadingEmailChange.value = false;
  showEmailModal.value = true;
  email.value.newEmail = userStore.user?.email || '';
  emailChangeDisabled.value = true;
}
function handleCancelEmailChange() {
  email.value.newEmail = userStore.user?.email || '';
  emailChangeDisabled.value = true;
}

const password = ref({
  oldPassword: '',
  newPassword: '',
  newPasswordConfirmed: '',
});

const passwordAuthenticationEnabled = ref(userStore.user?.pwSignInEnabled);
const showPasswordAuthMethodModal = ref(false);
const passwordAuthMethodLoading = ref(false);

const passwordRules: FormRules = {
  oldPassword: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      return validators.password(value);
    },
    trigger: 'blur',
  },
  newPassword: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      return validators.password(value);
    },
    trigger: 'blur',
  },
  newPasswordConfirmed: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      return validators.passwordConfirm(value, password.value.newPassword);
    },
    trigger: 'blur',
  },
};

async function handlePwSignInToggle() {
  showPasswordAuthMethodModal.value = true;
}

async function handleDisablePasswordAuth() {
  passwordAuthMethodLoading.value = true;
  await userStore.disablePasswordAuth();
  passwordAuthenticationEnabled.value = userStore.user?.pwSignInEnabled;
  passwordAuthMethodLoading.value = false;
}

async function cancelPasswordAuthChange() {
  passwordAuthenticationEnabled.value = userStore.user?.pwSignInEnabled;
  password.value.newPassword = '';
  password.value.newPasswordConfirmed = '';
}

async function handleEnablePasswordAuth() {
  passwordAuthMethodLoading.value = true;
  await userStore.enablePasswordAuth(
    password.value.newPassword,
    password.value.newPasswordConfirmed,
  );
  passwordAuthenticationEnabled.value = userStore.user?.pwSignInEnabled;
  passwordAuthMethodLoading.value = false;
}

const passwordChangeLoading = ref(false);
const passwordChangeDisabled = ref(true);
const passwordChangeSubmitDisabled = computed<boolean>(
  () =>
    validators.password(password.value.oldPassword) instanceof Error ||
    validators.password(password.value.newPassword) instanceof Error ||
    validators.passwordConfirm(
      password.value.newPasswordConfirmed,
      password.value.newPassword,
    ) instanceof Error,
);
async function initiatePasswordChange() {
  passwordChangeLoading.value = true;
  const success = await userStore.changePassword(
    password.value.oldPassword,
    password.value.newPassword,
    password.value.newPasswordConfirmed,
  );
  if (success) {
    passwordChangeDisabled.value = true;
    password.value.oldPassword = '';
    password.value.newPassword = '';
    password.value.newPasswordConfirmed = '';
  }
  passwordChangeLoading.value = false;
}
function handleCancelPasswordChange() {
  password.value.oldPassword = '';
  password.value.newPassword = '';
  password.value.newPasswordConfirmed = '';
  passwordChangeDisabled.value = true;
}

const profile = ref({
  firstName: userStore.user?.firstName,
  lastName: userStore.user?.lastName,
  yearOfBirth: userStore.user?.yearOfBirth,
  gender: userStore.user?.gender,
});
const genderOptions = [
  {
    label: 'Female',
    value: 'female',
  },
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Nonbinary',
    value: 'nonbinary',
  },
];
const profileChangeDisabled = ref(true);

async function handleProfileChange() {
  const { firstName, lastName, yearOfBirth, gender } = profile.value;

  const result = await userStore.updateProfile(firstName, lastName, yearOfBirth, gender);

  // applying new or old profile from store depending on success of API call
  profile.value = {
    firstName: userStore.user?.firstName,
    lastName: userStore.user?.lastName,
    yearOfBirth: userStore.user?.yearOfBirth,
    gender: userStore.user?.gender,
  };
  if (result) {
    profileChangeDisabled.value = true;
  }
}

function resetProfileData() {
  profile.value = {
    firstName: userStore.user?.firstName,
    lastName: userStore.user?.lastName,
    yearOfBirth: userStore.user?.yearOfBirth,
    gender: userStore.user?.gender,
  };
  profileChangeDisabled.value = true;
}

const showDeleteAccountModal = ref(false);
const confirmDeletionEmail = ref('');
const accountDeletionLoading = ref(false);

type ListThemeOverrides = NonNullable<ListProps['themeOverrides']>;
const themeVars = useThemeVars();
const modalColor = themeVars.value.modalColor;
const listThemeOverrides: ListThemeOverrides = {
  color: modalColor,
};

const confirmDeletionButtonProps: Ref<ButtonProps> = computed(() => {
  const disableConfirmDeletionButton =
    confirmDeletionEmail.value === userStore.user?.email ? false : true;
  const props: ButtonProps = {
    disabled: disableConfirmDeletionButton,
  };
  return props;
});

function cancelDeleteAccount() {
  confirmDeletionEmail.value = '';
}

const router = useRouter();
async function handleDeleteAccount() {
  accountDeletionLoading.value = true;
  const success = await userStore.initiateAccountDeletion(confirmDeletionEmail.value);
  accountDeletionLoading.value = false;
  if (success) {
    router.push({ name: 'login' });
    return;
  }
}
</script>

<template>
  <n-h1>This is the account/profile page</n-h1>
  <n-list class="flex w-full max-w-xl flex-col md:w-5/6">
    <n-list-item>
      <n-h3> Profile </n-h3>
      <div class="mb-8 flex flex-row gap-x-2">
        <n-space vertical class="w-full">
          <n-p>First Name</n-p>
          <n-input
            v-model:value="profile.firstName"
            placeholder="Enter your first name"
            :disabled="profileChangeDisabled"
          />
        </n-space>
        <n-space vertical class="w-full">
          <n-p>Last Name</n-p>
          <n-input
            v-model:value="profile.lastName"
            placeholder="Enter your last name"
            :disabled="profileChangeDisabled"
          />
        </n-space>
      </div>
      <n-p>SOME EXPLAINER ON WHY BIRTHDAY AND GENDER</n-p>
      <div class="mt-4 flex flex-row gap-x-2">
        <n-space vertical class="w-full">
          <n-p>Year of Birth</n-p>
          <n-input-number
            v-model:value="profile.yearOfBirth"
            placeholder="YYYY"
            clearable
            :show-button="false"
            :disabled="profileChangeDisabled"
          />
        </n-space>
        <n-space vertical class="w-full">
          <n-p>Gender</n-p>
          <n-select
            v-model:value="profile.gender"
            :options="genderOptions"
            placeholder="Gender"
            filterable
            clearable
            :disabled="profileChangeDisabled"
          />
        </n-space>
      </div>
      <n-space>
        <n-button
          v-if="profileChangeDisabled"
          @click="
            profileChangeDisabled ? (profileChangeDisabled = false) : (profileChangeDisabled = true)
          "
          class="mt-4"
          >Change Profile Data</n-button
        >
        <n-button class="mt-4" v-if="!profileChangeDisabled" @click="handleProfileChange"
          >Submit</n-button
        >
        <n-button class="mt-4" v-if="!profileChangeDisabled" @click="resetProfileData"
          >Cancel</n-button
        >
      </n-space>
    </n-list-item>
    <n-list-item>
      <n-h3> Email </n-h3>
      <n-form :rules="emailRules" :model="email" inline>
        <n-form-item label="E-Mail" path="newEmail" :show-label="false" class="grow">
          <n-input
            v-model:value="email.newEmail"
            placeholder="Enter your E-Mail"
            :disabled="emailChangeDisabled"
          />
        </n-form-item>
        <div class="flex flex-row gap-x-2">
          <n-button
            v-if="!emailChangeDisabled"
            @click="initiateEmailChange"
            :disabled="emailChangeSubmitDisabled"
            >Submit</n-button
          >
          <n-button v-if="!emailChangeDisabled" @click="handleCancelEmailChange">Cancel</n-button>
        </div>
        <n-button
          v-if="emailChangeDisabled"
          @click="
            emailChangeDisabled ? (emailChangeDisabled = false) : (emailChangeDisabled = true)
          "
          >Change Email</n-button
        >
      </n-form>
      <n-modal
        v-model:show="showEmailModal"
        close-on-esc
        preset="card"
        title="Confirm Your New Email"
        :bordered="false"
        :style="{
          width: '32em',
        }"
      >
        Please confirm your new email address by following the link in the email you just received.
      </n-modal>
    </n-list-item>
    <n-list-item>
      <n-h3>Password</n-h3>
      <n-p>Password authentication enabled</n-p>
      <n-switch
        v-model:value="passwordAuthenticationEnabled"
        @update-value="handlePwSignInToggle"
      />
      <n-modal
        v-if="!passwordAuthenticationEnabled"
        v-model:show="showPasswordAuthMethodModal"
        close-on-esc
        preset="dialog"
        title="Are you sure?"
        :bordered="false"
        :style="{
          width: '32em',
        }"
        positive-text="Confirm"
        negative-text="Cancel"
        @positive-click="handleDisablePasswordAuth"
        @before-leave="cancelPasswordAuthChange"
      >
        Are you sure you want to disable password authentication? If you confirm this you will only
        be able to sign in with an email link.
      </n-modal>
      <n-modal
        v-if="passwordAuthenticationEnabled"
        v-model:show="showPasswordAuthMethodModal"
        close-on-esc
        preset="dialog"
        title="Enable Password Authentication"
        :bordered="false"
        :style="{
          width: '32em',
        }"
        positive-text="Confirm"
        negative-text="Cancel"
        @positive-click="handleEnablePasswordAuth"
        @before-leave="cancelPasswordAuthChange"
      >
        To enable password authentication set a password below and confirm it.
        <n-space vertical class="mt-4 w-full max-w-md">
          <n-form :rules="passwordRules" :model="password">
            <n-form-item-row label="Password" path="newPassword">
              <n-input
                v-model:value="password.newPassword"
                type="password"
                placeholder="Enter your password"
              />
            </n-form-item-row>
            <n-form-item-row label="Confirm password" path="newPasswordConfirmed">
              <n-input
                v-model:value="password.newPasswordConfirmed"
                type="password"
                placeholder="Confirm your password"
              />
            </n-form-item-row>
          </n-form>
        </n-space>
      </n-modal>
      <n-button
        v-if="passwordChangeDisabled && passwordAuthenticationEnabled"
        @click="
          passwordChangeDisabled
            ? (passwordChangeDisabled = false)
            : (passwordChangeDisabled = true)
        "
        class="mt-4 block"
        >Change Password</n-button
      >
      <div v-if="!passwordChangeDisabled">
        <n-form :rules="passwordRules" :model="password" class="mt-6 max-w-md">
          <n-h4>Password change</n-h4>
          <n-form-item-row label="Old Password" path="oldPassword">
            <n-input
              v-model:value="password.oldPassword"
              type="password"
              placeholder="Enter your old password"
            />
          </n-form-item-row>
          <n-form-item-row label="New Password" path="newPassword">
            <n-input
              v-model:value="password.newPassword"
              type="password"
              placeholder="Enter your new password"
            />
          </n-form-item-row>
          <n-form-item-row label="Confirm New Password" path="newPasswordConfirmed">
            <n-input
              v-model:value="password.newPasswordConfirmed"
              type="password"
              placeholder="Confirm your new password"
            />
          </n-form-item-row>
        </n-form>
        <n-space>
          <n-button @click="initiatePasswordChange" :disabled="passwordChangeSubmitDisabled"
            >Submit</n-button
          >
          <n-button @click="handleCancelPasswordChange">Cancel</n-button>
        </n-space>
      </div>
    </n-list-item>
    <n-list-item>
      <n-p>Support</n-p>
    </n-list-item>
    <n-list-item>
      <n-button type="error" ghost @click="showDeleteAccountModal = true">
        Delete Account
      </n-button>
      <n-modal
        v-model:show="showDeleteAccountModal"
        close-on-esc
        preset="dialog"
        title="Are you sure?"
        :bordered="false"
        :style="{
          width: '32rem',
        }"
        positive-text="Delete Account"
        negative-text="Cancel"
        @positive-click="handleDeleteAccount"
        @before-leave="cancelDeleteAccount"
        type="error"
        :positive-button-props="confirmDeletionButtonProps"
        :loading="accountDeletionLoading"
      >
        <n-list
          class="mx-auto flex w-full max-w-xl flex-col md:w-5/6"
          :theme-overrides="listThemeOverrides"
        >
          <n-list-item>
            Are you sure you want to delete your account? This cannot be undone and all your data
            will be lost and no longer stored on our servers.
          </n-list-item>
          <n-list-item>
            You can export and download your data by clicking the button below. When you decide to
            return you can import it.
            <n-button :block="true" class="mt-2">Export and download data</n-button>
          </n-list-item>
          <n-list-item>
            To delete your account enter your email address below and click "Delete Account".
            <n-input
              v-model:value="confirmDeletionEmail"
              placeholder="Enter your E-Mail"
              class="mt-2"
            />
          </n-list-item>
        </n-list>

        <n-space> </n-space>
      </n-modal>
    </n-list-item>
  </n-list>
  <!-- <li>Privacy Policy</li>
    <li>Terms of Use</li>
    <li>Third Party Software</li>
    <li>Rate the app</li>
    <li>Buy a coffee</li> -->
</template>
