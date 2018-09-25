import Common from '@/assets/util/public'
import Path from '@/assets/util/httpPath'

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
    Common.httpPost(Path.allMarks).then((res) => {
      let obj = res.data
      if (obj.code === 1) {
        commit('ALL_MARKS', obj.data)
      }
    })
  },
  ajaxChoosedMarks({ commit }, id) {
    let temp = Common.deepCopy(state.allChoosedMarks)
    if (!temp[id]) {
      Common.httpPost(Path.choosedMarks, {id: id}).then((res) => {
        let obj = res.data
        if (obj.code === 1) {
          temp[id] = obj.data
          commit('ALL_CHOOSED_MARKS', temp)
        }
      })
    }
  },
  setMarks({ commit }, data) {
    Common.httpPost(Path.setMarks, {idArr: data.idArr}).then((res) => {
      let obj = res.data
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
