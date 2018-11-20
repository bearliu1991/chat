import Common from '@/utils/public'
import Path from '@/api/chatPath'
import Service from '@/api/service'

const state = {
  allChoosedMarks: {}, // 所有聊天者已选标签集合
  allMarks: [] // 所有标签
}

const getters = {
  getAllMarks: (state) => {
    return state.allMarks
  },
  getAllChoosedMarks: state => state.allChoosedMarks
}

const mutations = {
  ALL_CHOOSED_MARKS(state, data) {
    state.allChoosedMarks = data
  },
  ALL_MARKS(state, data) {
    state.allMarks = data
  },
  MARKLIST (state, data) {
    state.markList = data
  }
}

const actions = {
  ajaxAllMarks({ commit }) {
    Service.httpPost(Path.allMarks).then((res) => {
      let obj = res
      if (obj.code === 1) {
        commit('ALL_MARKS', obj.data)
      }
    })
  },
  ajaxChoosedMarks({ commit }, id) {
    let temp = Common.deepCopy(state.allChoosedMarks)
    if (!temp[id]) {
      Service.httpPost(Path.choosedMarks, {id: id}).then((res) => {
        let obj = res
        if (obj.code === 1) {
          temp[id] = obj.data
          commit('ALL_CHOOSED_MARKS', temp)
        }
      })
    }
  },
  setMarks({ commit }, data) {
    Service.httpPost(Path.setMarks, {idArr: data.idArr}).then((res) => {
      let obj = res
      if (obj.code === 1) {
        let temp = Common.deepCopy(state.allChoosedMarks)
        temp[data.id] = data.activeArr
        commit('ALL_CHOOSED_MARKS', temp)
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
