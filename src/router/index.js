import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import Settings from '@/components/partials/Settings'

Vue.use(VueResource)
Vue.use(VueRouter)

export const bus = new Vue()

export default new VueRouter({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [{
        path: 'settings',
        name: 'Settings',
        component: Settings,
        meta: {
          requiresAuth: true
        }
      }],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ],
  redirect: [{
    '*': '/'
  }]
})
