import { useUserStore } from '@/stores/user-store';
import { createRouter, createWebHistory } from 'vue-router';

import DashboardView from '@/views/DashboardView.vue';
import CalendarView from '@/views/CalendarView.vue';

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean;
    needsScrolling?: boolean;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: CalendarView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('@/views/SettingsView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/account',
      name: 'Account',
      component: () => import('@/views/ProfileView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/faq',
      name: 'FAQ',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/FaqView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/AccountSignUpView.vue'),
      meta: {
        requiresAuth: false,
        needsScrolling: true,
      },
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/AccountSignInView.vue'),
      meta: {
        requiresAuth: false,
        needsScrolling: true,
      },
    },
    {
      path: '/login-with-link',
      name: 'login-with-link',
      component: () => import('@/views/AccountSignInEmailView.vue'),
      meta: {
        requiresAuth: false,
        needsScrolling: true,
      },
    },
    {
      path: '/email-sign-in',
      name: 'email-sign-in',
      component: () => import('@/views/AccountSignInEmailConfirmationView.vue'),
      meta: {
        requiresAuth: false,
        needsScrolling: true,
      },
      beforeEnter: from => {
        if (!from.query.token) {
          return { name: 'login' };
        }
      },
    },
    {
      path: '/verify',
      name: 'verify-email',
      component: () => import('@/views/AccountSignUpAwaitConfirmationView.vue'),
      meta: {
        requiresAuth: false,
        needsScrolling: true,
      },
      beforeEnter: (to, from) => {
        if (from.name !== 'signup') {
          return { name: 'login' };
        }
      },
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: () => import('@/views/AccountEmailConfirmedView.vue'),
      meta: {
        requiresAuth: false,
        needsScrolling: true,
      },
      beforeEnter: from => {
        if (!from.query.token) {
          return { name: 'login' };
        }
      },
    },
    {
      path: '/confirm-new-email',
      name: 'confirm-new-email',
      component: () => import('@/views/AccountEmailNewConfirmedView.vue'),
      meta: {
        requiresAuth: false,
        needsScrolling: true,
      },
      beforeEnter: from => {
        if (!from.query.token) {
          return { name: 'login' };
        }
      },
    },
    {
      path: '/complete-profile',
      name: 'complete-profile',
      component: () => import('@/views/AccountSignUpProfileView.vue'),
      meta: {
        requiresAuth: true,
        needsScrolling: true,
      },
      beforeEnter: (to, from) => {
        if (from.name !== 'confirm') {
          return { name: 'login' };
        }
      },
    },
    {
      path: '/get-password-reset',
      name: 'get-password-reset',
      component: () => import('@/views/AccountPasswordInitiateResetView.vue'),
      meta: {
        requiresAuth: false,
        needsScrolling: true,
      },
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@/views/AccountPasswordResetView.vue'),
      meta: {
        requiresAuth: false,
        needsScrolling: true,
      },
      beforeEnter: from => {
        if (!from.query.token) {
          return { name: 'login' };
        }
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/ErrorNotFoundView.vue'),
      meta: {
        requiresAuth: false,
        needsScrolling: true,
      },
    },
  ],
});

router.beforeEach(async to => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.user?.userId) {
    await userStore.fetchUser();
    if (!userStore.user?.userId) {
      return { name: 'login' };
    }
  } else if ((to.name === 'login' || to.name === 'signup') && !userStore.user?.userId) {
    await userStore.fetchUser();
    if (userStore.user?.userId) {
      return { name: 'Dashboard' };
    }
  }
});

router.beforeEach(async to => {
  const body = document.body;
  if (!to.meta.needsScrolling) {
    body.classList.remove('overflow-visible');
    body.classList.add('overflow-hidden');
  } else {
    body.classList.remove('overflow-hidden');
    body.classList.add('overflow-visible');
  }
});

export default router;
