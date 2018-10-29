import Http from '@/js/public'
import Path from '@/api/httpPath'

const state = {
  loginInfo: null,
  userInfo: {},
  nickName: '',
  isLogin: true,
  portraitData: {}
}

const getters = {
  // user (state) {
  //   return state.userInfo && state.userInfo.user
  // }
}

const mutations = {
  NICKNAME(state, data) {
    state.nickName = data
  },
  LOGIN_SHOW(state, data) {
    state.isLogin = data
  },
  LOGIN_INFO(state, data) {
    state.loginInfo = data
  },
  USER_INFO(state, data) {
    state.userInfo = data
  },
  PORTRAIT_DATA(state, data) {
    state.portraitData = data
  }
}

const actions = {
  getRouteMap({commit}) {
    Http.httpGet(Path.routeMap).then((res) => {
      // let data = res.data.data
      // commit('ROUTE_MAP', data)
    })
  },
  getUserInfo({commit}) {
    Http.httpGet(Path.userInfo).then((res) => {
      let data = res.data.data
      commit('USER_INFO', data)
    })
  },
  getUserPortrait({commit}) {
    Http.httpGet(Path.userInfo).then((res) => {
      let data = res.data.data
      commit('PORTRAIT_DATA', data)
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
