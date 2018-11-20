import Const from '@/config'
const url = Const.url + '/chat'
const uploadUrl = "http://192.168.0.244:8888/"

export default {
  loadImgUrl: uploadUrl,
  checkUpdate: url + '/checkUpdate',
  intercept: url + "/csws/intercept",
  login: url + "/login",
  register: url + "/register",
  logout: url + "/logout",
  auth: url + '/auth'
}