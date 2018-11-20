import request from '../api/request'
import components from './components'
import socket from '../api/socket'
import * as common from './public'
import Config from '@/config'

export default {
  install(Vue, options) {
    // 引入请求内容
    request()
    Vue.prototype.$socket = socket
    Vue.prototype.deepCopy = function (data) {
      return JSON.parse(JSON.stringify(data));
    }
    // 全局监听click事件，用于全局点击的时候隐藏内容
    Vue.prototype.globalClick = function (callback) {
      document.getElementById('app').onclick = function () {
        callback()
      }
    }

    Vue.prototype.Config = Config

    // 将public下面所有的公共方法注册为公用方法
    for (let key in common.default) {
      Vue.prototype.key = common.default[key]
    }

    // 将plugins下面所有的vue组件注册为全局组件
    for (let key in components) {
      Vue.component(key, components[key])
    }
  }
}
