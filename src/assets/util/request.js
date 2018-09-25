import Path from './httpPath'
import qs from 'qs'
import Vue from 'vue'
import Http from '@/assets/util/public'

export default function () {
  Vue.prototype.Path = Path;
  Vue.prototype.intercept = function (url, args) {
    return Http.httpPost(url, args)
  }
  Vue.prototype.login = function (args) {
    return Http.httpPost(Path.login, qs.stringify(args))
  }
  Vue.prototype.register = function (args) {
    return Http.httpPost(Path.register, qs.stringify(args))
  }
  Vue.prototype.logout = function (args) {
    return Http.httpPost(Path.logout)
  }
  Vue.prototype.getRoutes = function (args) {
    return Http.httpPost(Path.routeMap)
  }
  Vue.prototype.searchUser = function (args) {
    return Http.httpPost(Path.searchUser)
  }
  Vue.prototype.auth = function (args) {
    return Http.httpPost(Path.auth, qs.stringify(args))
  }
  Vue.prototype.chatDetail = function (args) {
    return Http.httpPost(Path.msgRecord, qs.stringify(args))
  }
  Vue.prototype.scrollMore = function (args) {
    return Http.httpPost(Path.scrollMore, qs.stringify(args))
  }
  Vue.prototype.submitModelData = function (args) {
    return Http.httpPost(Path.modelData, qs.stringify(args))
  }
  Vue.prototype.upload = function (args) {
    return Http.httpPost(Path.upload, args, { 'Content-Type': 'multipart/form-data' })
  }
}
