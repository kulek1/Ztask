import Vue from 'vue'
import VueRouter from 'vue-router'
import MainRouterView from '@/views/main/MainRouterView'
import LoginView from '@/views/auth/LoginView'
import Settings from '@/views/SettingsView'
import TaskListView from '@/views/TaskListView'
import TaskView from '@/views/TaskView'

Vue.use(VueRouter)

export const bus = new Vue()

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: MainRouterView,
      children: [
        {
          path: '/',
          name: 'TaskListView',
          component: TaskListView,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'settings',
          name: 'Settings',
          component: Settings,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'task/:uuid',
          name: 'TaskView',
          component: TaskView,
          meta: {
            requiresAuth: true
          }
        }
      ],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    }
  ],
  redirect: [
    {
      '*': '/'
    }
  ]
})
