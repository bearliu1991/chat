/**
 * 添加用户信息
 */

const state = {
  name: '王五',
  phone: '18888888888',
  remake: '优质潜力客户资金充足'
}

const getters = {
  getName: state => state.name,
  getPhone: state => state.phone,
  getRemake: state => state.remake
}

const mutations = {
  NUTANAME(state, val) {
    state.name = val.trim()
  },
  MUTAPHONE(state, val) {
    state.phone = val.trim()
  },
  MUTAREMAKE(state, val) {
    state.remake = val.trim()
  }
}
const actions = {
  setInfo({ commit }, {type, val}) { // 设置客服人员
    if (type === 'name') {
      commit('NUTANAME', val)
    } else if (type === 'phone') {
      commit('MUTAPHONE', val)
    } else {
      console.log(val)
      commit('MUTAREMAKE', val)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
