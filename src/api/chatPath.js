// import Const from '@/config'
// const url = Const.url + '/chat'
const url = '/api/chat'

export default {
  contactRecord: url + '/contactRecord', // 常用联系人会话列表
  userDetails: url + '/userDetails', // 常用联系人会话列表
  searchTypes: url + '/searchTypes', // 固定搜索选项列表
  memberList: url + '/memberList', // 成员列表
  setMark: url + '/setMark', // 设置标签
  msgPortrait: url + '/msgPortrait', // 获取聊天者信息
  userPortrait: url + '/userPortrait', // 用户个人信息hover头像
  userInfo: url + '/userInfo', // 获取用户信息
  msgRecord: url + '/msgRecord', // 获取聊天记录
  searchUser: url + '/searchUser', // 搜索用户列表
  reorder: url + '/reorder', // 置顶
  cancelReorder: url + '/cancelReorder', // 取消置顶
  videos: url + '/videos', // 视频列表
  audios: url + '/audios', // 音频列表
  translate: url + '/translate', // 翻译`
  deleteMsg: url + '/deleteMsg', // 删除
  transText: url + '/transText', // 转化成文字
  allMarks: url + '/allMarks', // 所有标签
  setMarks: url + '/setMarks', // 设置标签
  choosedMarks: url + '/choosedMarks', // 已选标签
  cancelMarks: url + '/cancelMarks', // 取消标签
  getStore: url + '/getStore', // 获取收藏内容
  upload: url + '/upload',
  delStoreGroup: url + '/delStoreGroup', // 获取收藏内容
  delStoreMsg: url + '/delStoreMsg', // 删除收藏消息
  addStoreGroup: url + '/addStoreGroup', // 添加收藏分组
  addStoreMsg: url + '/addStoreMsg', // 添加收藏分组
  services: url + '/services', // 获取客服列表
  groups: url + '/groups', // 获取分组列表
  emotions: url + '/emotions', // 获取表情
  files: url + '/files', // 获取资源
  models: url + '/models', // 获取资源
  modelData: url + '/modelData', // 提交模板数据
  delContact: url + '/delContact' // 删除会话联系人
}
