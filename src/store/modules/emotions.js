import Path from '@/api/chatPath'
import Service from '@/api/service'

const state = {
  emotions: [],
  currEmotion: ''
}

const getters = {
  getEmots: state => state.emotions
}

const mutations = {
  EMOTIONS(state, {res, idx}) {
    state.emotions.push(res)
  },
  CURR_EMOTION(state, data) {
    state.currEmotion = data
  }
}
const actions = {
    ajaxEmotions({commit}, idx) {
      Service.httpPost(Path.emotions, {id: idx}).then((res) => {
        let data = res
        if (data.code === 1) {
          commit('EMOTIONS', {res: data.data, idx})
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
