import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
let Chat = () => import('@/pages/chat') /* webpackChunkName: "group-foo" */
let Login = () => import('@/pages/login')
let Reg = () => import('@/pages/register')
let Manager = () => import('@/pages/manager/manager')
let second = () => import('@/pages/second')
let third = () => import('@/pages/third')

export default new Router({
  mode: 'history',
  base: 'csws',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Reg
    },
    {
      path: '/manager',
      component: Manager,
      meta: { requiresAuth: true },
      children : [
        {
          path: '',
          name: 'chat',
          component: Chat
        },
        {
          path: 'second',
          name: 'second',
          component: second
        },
        {
          path: 'third',
          name: 'third',
          component: third
        }
      ]
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
