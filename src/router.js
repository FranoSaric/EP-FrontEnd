import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    /* {
      path: '/home',
      component: Login
    }, */
    {
      path: '/login',
      component: Login
    },
    {
      path: '/profesor/register',
      component: Register
    },/*
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    }, */
    {
      path: '/student',
      name: 'student',
      // lazy-loaded
      component: () => import('./views/BoardAdmin.vue')
    },
    {
      path: '/asistent',
      name: 'asistent',
      // lazy-loaded
      component: () => import('./views/BoardModerator.vue')
    },
    {
      path: '/profesor',
      name: 'profesor',
      // lazy-loaded
      component: () => import('./views/BoardSuperAdmin.vue')
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/BoardUser.vue')
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });
