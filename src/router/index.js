import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let Chat = () => import('@/components/chat') /* webpackChunkName: "group-foo" */
let Login = () => import('@/components/login')
let Reg = () => import('@/components/register')
let Manager = () => import('@/components/manager/manager')
let second = () => import('@/components/second')
let third = () => import('@/components/third')

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
