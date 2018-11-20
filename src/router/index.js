import Vue from 'vue'
import Router from 'vue-router'
import Config from "../config";

Vue.use(Router)
let Chat = () => import('@/pages/chat') /* webpackChunkName: "group-foo" */
let Login = () => import('@/pages/login')
let Reg = () => import('@/pages/register')
let Manager = () => import('@/pages/manager/manager')
let second = () => import('@/pages/second')
let third = () => import('@/pages/third')
let Update = () => import('@/update')
let baseUrl = !Config.isDesktop ? 'csws' : process.env.NODE_ENV === "development" ? '' : Config.absUrl
let mode = Config.isDesktop ? 'hash' : 'history'
export default new Router({
  mode: mode,
  base: baseUrl,
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
      path: '*',
      redirect: '/login'
    },
    {
      path: '/', 
      name: 'indexPage', 
      component: Update
    }
  ]
})
