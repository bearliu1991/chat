import publicPath from './publicPath'
import chatPath from './chatPath'
import Vue from 'vue'
import Service from '@/api/service'

export default function () {
  Vue.prototype.publicPath = publicPath
  Vue.prototype.chatPath = chatPath
  Vue.prototype.$get = Service.httpGet
  Vue.prototype.$post = Service.httpPost
  Vue.prototype.intercept = function (url, args) {
    return Service.httpPost(url, args)
  }
  Vue.prototype.login = function (args) {
    return Service.httpPost(publicPath.login, args)
  }
  Vue.prototype.register = function (args) {
    return Service.httpPost(publicPath.register, args)
  }
  Vue.prototype.logout = function (args) {
    return Service.httpPost(publicPath.logout)
  }
  Vue.prototype.upload = function (args) {
    return Service.httpPost(publicPath.upload, args, { 'Content-Type': 'multipart/form-data' })
  }
  Vue.prototype.getRoutes = function (args) {
    return Service.httpPost(publicPath.routeMap)
  }
  Vue.prototype.auth = function (args) {
    return Service.httpPost(publicPath.auth, args)
  }
  Vue.prototype.searchUser = function (args) {
    return Service.httpPost(chatPath.searchUser)
  }
  Vue.prototype.chatDetail = function (args) {
    return Service.httpPost(chatPath.msgRecord, args)
  }
  Vue.prototype.scrollMore = function (args) {
    return Service.httpPost(chatPath.scrollMore, args)
  }
  Vue.prototype.submitModelData = function (args) {
    return Service.httpPost(chatPath.modelData, args)
  }
}
