const url = process.env.API_ROOT + '/api'
const temp = 'https://www.easy-mock.com/mock/'
const uploadUrl = "http://192.168.0.244:8888/"
const BASE = process.env.API_ROOT + '/api'

export default {
  url: url,
  loadImgUrl: uploadUrl,
  intercept: url + "/csws/intercept",
  login: url + "/login",
  register: url + "/register",
  logout: url + "/logout",
  auth: url + '/auth',
  routeMap: temp + '5b2afb2dcabcb138f69e8c07/example/rights', // 权限列表
  contactRecord: BASE + '/contactRecord', // 常用联系人会话列表
  userDetail: BASE + '/userDetail', // 常用联系人会话列表
  searchTypes: BASE + '/searchTypes', // 固定搜索选项列表
  memberList: BASE + '/memberList', // 成员列表
  setMark: BASE + '/setMark', // 设置标签
  msgPortrait: BASE + '/msgPortrait', // 获取聊天者信息
  userPortrait: BASE + '/userPortrait', // 用户个人信息hover头像
  userInfo: BASE + '/userInfo', // 获取用户信息
  msgRecord: BASE + '/msgRecord', // 获取聊天记录
  searchUser: BASE + '/searchUser', // 搜索用户列表
  reorder: BASE + '/reorder', // 置顶
  cancelReorder: BASE + '/cancelReorder', // 取消置顶
  videos: BASE + '/videos', // 视频列表
  audios: BASE + '/audios', // 音频列表
  translate: BASE + '/translate', // 翻译`
  deleteMsg: BASE + '/deleteMsg', // 删除
  transText: BASE + '/transText', // 转化成文字
  allMarks: BASE + '/allMarks', // 所有标签
  setMarks: BASE + '/setMarks', // 设置标签
  choosedMarks: BASE + '/choosedMarks', // 已选标签
  cancelMarks: BASE + '/cancelMarks', // 取消标签
  getStore: BASE + '/getStore', // 获取收藏内容
  upload: BASE + '/upload',
  delStoreGroup: BASE + '/delStoreGroup', // 获取收藏内容
  delStoreMsg: BASE + '/delStoreMsg', // 删除收藏消息
  addStoreGroup: BASE + '/addStoreGroup', // 添加收藏分组
  addStoreMsg: BASE + '/addStoreMsg', // 添加收藏分组
  services: BASE + '/services', // 获取客服列表
  groups: BASE + '/groups', // 获取分组列表
  emotions: BASE + '/emotions', // 获取表情
  files: BASE + '/files', // 获取资源
  models: BASE + '/models', // 获取资源
  modelData: BASE + '/modelData', // 提交模板数据
  delContact: BASE + '/delContact' // 删除会话联系人
}
