import Common from '@/assets/util/public'
import Path from '@/assets/util/httpPath'

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
    Common.httpPost(Path.getStore, {id: id}).then((res) => {
      let data = res.data
      if (data.code === 1) {
        commit('STORE', data.data)
      }
    })
  },
  selectCollect({commit, state}, {index, item}) {
    let collcetList = Common.deepCopy(state.collectList)
    Common.httpPost(Path.addStoreMsg, item).then((res) => {
      if (res.data.code === 1) {
        collcetList[index].msgs.push(item)
        commit('STORE', collcetList)
      }
    })
  },
  addStoreGroup({commit, state}, item) {
    let collcetList = state.collectList.slice()
    let obj = {name:item, msgs:{}}
    Common.httpPost(Path.addStoreGroup, item).then((res) => {
      if (res.data.code === 1) {
        collcetList.push(obj)
        commit('STORE', collcetList)
      } else {
        
      }
    })
  },
  delStoreGroup({commit, state}, idx) {
    let collcetList = state.collectList.slice()
    Common.httpPost(Path.addStoreGroup, idx).then((res) => {
      if (res.data.code === 1) {
        collcetList.splice(idx, 1)
        commit('STORE', collcetList)
      }
    })
  },
  delStoreMsg({commit, state}, data) {
    let collcetList = Common.deepCopy(state.collectList)
    Common.httpPost(Path.delStoreMsg, data.id).then((res) => {
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
