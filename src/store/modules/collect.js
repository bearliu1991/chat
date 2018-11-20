import Common from '@/utils/public'
import Path from '@/api/chatPath'
import Service from '@/api/service'

const state = {
  collectList: []
}

const getters = {
  getCollectList: state => state.collectList
}

const mutations = {
  STORE(state, data) {
    state.collectList = data
  }
}

const actions = {
  getStore({commit}, id) {
    Service.httpPost(Path.getStore, {id: id}).then((res) => {
      let data = res
      if (data.code === 1) {
        commit('STORE', data.data)
      }
    })
  },
  selectCollect({commit, state}, {index, item}) {
    let collcetList = Common.deepCopy(state.collectList)
    Service.httpPost(Path.addStoreMsg, item).then((res) => {
      if (res.code === 1) {
        collcetList[index].msgs.push(item)
        commit('STORE', collcetList)
      }
    })
  },
  addStoreGroup({commit, state}, item) {
    let collcetList = state.collectList.slice()
    let obj = {name:item, msgs:{}}
    Service.httpPost(Path.addStoreGroup, item).then((res) => {
      if (res.code === 1) {
        collcetList.push(obj)
        commit('STORE', collcetList)
      } else {
        
      }
    })
  },
  delStoreGroup({commit, state}, idx) {
    let collcetList = state.collectList.slice()
    Service.httpPost(Path.addStoreGroup, idx).then((res) => {
      if (res.data.code === 1) {
        collcetList.splice(idx, 1)
        commit('STORE', collcetList)
      }
    })
  },
  delStoreMsg({commit, state}, data) {
    let collcetList = Common.deepCopy(state.collectList)
    Service.httpPost(Path.delStoreMsg, data.id).then((res) => {
      if (res.data.code === 1) {
        collcetList[data.arrId].msgs.splice(data.idx, 1)
        commit('STORE', collcetList)
      }
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
