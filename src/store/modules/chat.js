import Common from '@/js/public'
import Path from '@/api/httpPath'
// import { Message } from 'iview'

const state = {
  allChator: {}, // 所有会话人员集合
  allMsg: {}, // 所有聊天内容集合
  contactRecord : [], // 聊天人员列表
  newWinRecord: [], // 新窗口打开的聊天窗口
  processId:[], // 正在操作的聊天窗口的Id
  chaterInfo: {}, // 聊天者头像hover展示的个人信息
  chatId : -1, // 被点击处于聊天状态的会话的id
  chatActiveId: {}, // 被点击处于聊天状态的会话
  showSearchRes: false, // 是否展示搜索结果
  searchRes: {}, // 会话搜索结果,
  searchTypes : '', // 固定搜索条件种类列表,
  searchActive: {}, // 处于展示状态的搜索种类
  popMsgs: [], // 弹出的聊天记录
  fileUrls: [], // 选中文件的路径集合
  audios: [], // 音频集合
  videos: [], // 视频集合
  contextmenuInfo: {} // 右键点击的时候获取的内容
}

const getters = {
  reorder (state, index) {
    let item = state.contactRecord.slice(index, 1)
    return state.contactRecord.unshift(item)
  },
  getChatId(state, index) {
    return state.chatId
  }
}

const mutations = {
  SET_TOP(state, data) {
    state.allChator = data
  },
  CUSTOMER_SERVICE(state, data) {
    if (data.key !== undefined) {
      let obj = Common.deepCopy(state.allChator)
      obj[data.id].serviceId = data.key
      state.allChator = obj
    }
  },
  GROUP_CHANGE(state, data) {
    if (data.key !== undefined) {
      let obj = Common.deepCopy(state.allChator)
      obj[data.id].groupId = data.key
      state.allChator = obj
    }
  },
  TIPS_CHANGE(state, tips) {
    if (tips !== undefined) {
      let obj = Common.deepCopy(state.allChator)
      obj.tips = tips
      state.allChator = obj
    }
  },
  USER_DETAIL(state, data) {
    let obj = Common.deepCopy(state.allChator)
    for (let key of Object.keys(data)) {
      obj[data.id][key] = data[key]
    }
    state.allChator = obj
  },
  LATEST_MSGS(state, data) {
    if (state.allChator[data.hostId]) {
      let obj = Common.deepCopy(state.allChator)
      switch (data.msgType) {
        case 0:
          obj[data.hostId].info = data.info
          break
        case 1:
          obj[data.hostId].info = "[图片]"
          break
        case 2:
          obj[data.hostId].info = "[图文]"
          break
        case 3:
          obj[data.hostId].info = "[音频]"
          break
        case 4:
          obj[data.hostId].info = "[视频]"
          break
        case 5:
          obj[data.hostId].info = "[链接]"
          break
        default:
          break
      }
      state.allChator = obj
      let msgObj = Common.deepCopy(state.allMsg)
      if (msgObj[data.hostId]) {
        msgObj[data.hostId].msgs[data.id] = data
      }
      state.allMsg = msgObj
    } else {
      
    }
  },
  CONTEXTMENU_INFO(state, data) {
    state.contextmenuInfo = data
  },
  SET_MSG_TYPE(state, data) {
    if (data.id !== undefined) {
      let obj = Common.deepCopy(state.allChator)
      if (!obj[data.id].msgTypes) {
        obj[data.id].msgTypes = ['0', '1', '2', '3']
      }
      let idx = obj[data.id].msgTypes.findIndex(item => item === data.key)
      if (idx > -1) {
        obj[data.id].msgTypes.splice(idx, 1)
      } else {
        obj[data.id].msgTypes.push(data.key)
      }
      
      state.allChator = obj
    }
  },
  INSERT_MSGS(state, data) {
    let obj = Common.deepCopy(state.allMsg)
    obj[data.id].msgs.push(data.item)
    state.allMsg = obj
  },
  FIFLE_MSG(state, id) {
    let obj = Common.deepCopy(state.allMsg)
    for (let val of state.fileUrls) {
      obj[id].msgs.push(val)
    }
    state.allMsg = obj
  },
  MODEL_MSG(state, {id, data}) {
    let obj = Common.deepCopy(state.allMsg)
    obj[id].msgs.push(data)
    state.allMsg = obj
  },
  ADD_MSG(state, data) {
    let obj = Common.deepCopy(state.allMsg)
    let ID = data.id + ''
    if (!obj[ID]) {
      obj[ID] = {}
      obj[ID].msgs = data.msgs
    }
    
    if (data.pageId) {
      obj[ID].pageId = data.pageId
      for (let key of data.msgs) {
        obj[ID].msgs.unshift(key)
      }
      // obj[ID].msgs = [...obj[ID].msgs, ...data.msgs]
    }
    data.msgs.length < 7 && (obj[ID].noresult = true)
    state.allMsg = obj
  },
  SEND_PASTE_IMG(state, data) {
    let obj = Common.deepCopy(state.allMsg)
    obj[data.chatId].msgs.push(data)
    state.allMsg = obj
  },
  FILE_URLS(state, item) {
    if (item) {
      let idx = state.fileUrls.findIndex(n => n.id === item.id)
      idx > -1 ? state.fileUrls.splice(idx, 1) : state.fileUrls.push(item)
    } else {
      state.fileUrls = []
    }
  },
  SEARCH_ACTIVE(state, data) {
    state.searchActive = data || {}
  },
  NO_MSG_TYPES(state, id) {
    let obj = Common.deepCopy(state.allChator)
    obj[id].msgTypes = ['0', '1', '2', '3']
    state.allChator = obj
  },
  // 聊天列表总表
  CONTACT_RECORD (state, data) {
    let obj = {}
    for (let item of data) {
      obj[item.id + ''] = item
    }
    state.allChator = obj
  },
  // 粉丝聊天列表
  FANS_CHAT_LIST (state, data) {
    state.contactRecord = data
  },
  SCROLL_MORE (state, data) {
    data.length && data.forEach(function (item) {
      // state.msgDetail.unshift(item)
    })
  },
  CHATER_INFO(state, data) {
    state.chaterInfo = data
  },
  CHAT_ACTIVE_ID(state, data) {
    state.chatActiveId.id = data
  },
  CHAT_ID(state, data) {
    state.chatId = data
  },
  SHOW_SEARCH_RES(state, data) {
    state.showSearchRes = data
  },
  CHAT_RES(state, data) {
    let obj = {}
    // for (let item of data) {
    //   obj[item.id + ''] = item
    // }
    state.searchRes = obj
  },
  NEW_Win(state, data) {
    state.allChator[data].isPop = true
    state.newWinRecord.push(state.allChator[data])
  },
  CLOSE_MODAL(state, data) {
    if (state.newWinRecord.length) {
      let idx = state.newWinRecord.findIndex(function(item) {
        return item.id === data
      })
      state.allChator[data].isPop = false
      state.newWinRecord.splice(idx, 1)
    }
  },
  SEARCH_TYPE (state, data) {
    state.searchTypes = data
  },
  AUDIOS(state, data) {
    state.audios = data
  },
  VIDEOS(state, data) {
    state.videos = data
  },
  TRANSLATE(state, data) {
    let obj = Common.deepCopy(state.allMsg)
    obj[data.id].msgs[data.index].translate = 'Nice to meet you'
    state.allMsg = obj
  },
  DELETE_MSG(state, {id, msgId}) {
    let obj = Common.deepCopy(state.allMsg)
    if (obj[id]) {
      let index = obj[id].msgs.findIndex((item) => {
        return item.id - 0 === msgId
      })
      obj[id].msgs.splice(index, 1)
      state.allMsg = obj
    }
  },
  DELETE_CONTACT(state, idx) {
    let obj = Common.deepCopy(state.allChator)
    let allMsg = Common.deepCopy(state.allMsg)
    delete obj[idx]
    if (state.chatId === idx) {
      state.chatId = -1
    }
    delete allMsg[idx]
    state.allMsg = allMsg
    state.allChator = obj
  },
  TRANS_TEXT(state, data) {
    let obj = Common.deepCopy(state.allMsg)
    obj[data.id].msgs[data.index].transText = '我是被转化过来的'
    state.allMsg = obj
  },
  ADD_NAME(state, data) {
    let obj = Common.deepCopy(state.allChator)
    if (obj[data.id]) {
      obj[data.id].name = data.info
      state.allChator = obj
    }
  },
  ADD_PHONE(state, data) {
    let obj = Common.deepCopy(state.allChator)
    if (obj[data.id]) {
      obj[data.id].mobile = data.info
      state.allChator = obj
    }
  },
  ADD_TIPS(state, data) {
    let obj = Common.deepCopy(state.allChator)
    if (obj[data.id]) {
      obj[data.id].tips = data.info
      state.allChator = obj
    }
  }
}

const actions = {
  // 直接输入改变个人信息
  changeInfo({ commit }, data) {
    if (data.type === 'name') {
      commit('ADD_NAME', data)
    } else if (data.type === 'mobile') {
      commit('ADD_PHONE', data)
    } else if (data.type === 'tips') {
      commit('ADD_TIPS', data)
    }
  },
  // 添加聊天信息到个人信息
  setInfo({ commit }, data) {
    if (data.type === 'name') {
      commit('ADD_NAME', data)
    } else if (data.type === 'phone') {
      commit('ADD_PHONE', data)
    } else {
      commit('ADD_TIPS', data)
    }
  },
  // 改变客服
  ajaxCustomerService({commit}, id) {
    commit('CUSTOMER_SERVICE', id)
  },
  // 改变分组
  ajaxGroup({commit}, id) {
    commit('GROUP_CHANGE', id)
  },
  // 改变备注
  ajaxTips({commit}, id) {
    commit('TIPS_CHANGE', id)
  },
  ajaxUserPortrait({commit}, id) {
    if (id !== undefined) {
      if (!state.allChator[id].publicCode) {
        Common.httpPost(Path.userDetail, {id: id}).then((res) => {
          let data = res.data
          if (data.code === 1) {
            commit('USER_DETAIL', data.data)
          }
        })
      }
    }
  },
  ajaxUserDetail({commit}, id) {
    if (id !== undefined) {
      if (!state.allChator[id].publicCode) {
        Common.httpPost(Path.userDetail, {id: id}).then((res) => {
          let data = res.data
          if (data.code === 1) {
            commit('USER_DETAIL', data.data)
          }
        })
      }
    }
  },
  deleteMsg({commit}, {id, msgId}) {
    if (id !== undefined) {
      Common.httpPost(Path.deleteMsg, {id: msgId}).then((res) => {
        let data = res.data
        if (data.code === 1) {
          commit('DELETE_MSG', {id, msgId})
        }
      })
    }
  },
  delContact({commit}, {idx}) {
    if (idx !== undefined) {
      Common.httpPost(Path.delContact, {idx}).then((res) => {
        let data = res.data
        if (data.code === 1) {
          commit('DELETE_CONTACT', idx)
        }
      })
    }
  },
  transText({commit}, param) {
    Common.httpPost(Path.transText).then((res) => {
      let data = res.data
      if (data.code === 1) {
        commit('TRANS_TEXT', param)
      }
    })
  },
  translate({commit}, param) {
    Common.httpPost(Path.translate).then((res) => {
      let data = res.data
      if (data.code === 1) {
        commit('TRANSLATE', param)
      }
    })
  },
  getAudios({ commit }) {
    Common.httpGet(Path.audios).then((res) => {
      commit('AUDIOS', res.data)
    })
  },
  getVideos({ commit }) {
    Common.httpGet(Path.videos).then((res) => {
      commit('VIDEOS', res.data)
    })
  },
  getRecords ({ commit }) {
    Common.httpGet(Path.contactRecord).then((res) => {
      commit('CONTACT_RECORD', res.data.data)
    })
  },
  reorder ({commit, state}, id) {
    let copy = Common.deepCopy(state.allChator)
    let time = Date.now()
    if (copy[id].isTop) {
      Common.httpPost(Path.cancelReorder).then((res) => {
        let obj = res.data
        if (obj.code === 1) {
          copy[id].isTop = null
          commit('SET_TOP', copy)
        }
      })
    } else {
      Common.httpPost(Path.reorder).then((res) => {
        let obj = res.data
        if (obj.code === 1) {
          copy[id].isTop = true
          copy[id].setTopTime = time
          commit('SET_TOP', copy)
        }
      })
    }
  },
  chaterInfo({commit}) {
    Common.httpPost(Path.msgPortrait).then((res) => {
      commit('CHATER_INFO', res.data)
    })
  },
  getSearchTypes({commit}) {
    Common.httpGet(Path.searchTypes).then((res) => {
      let data = res.data
      data.code === 1 && commit('SEARCH_TYPE', data.data)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
