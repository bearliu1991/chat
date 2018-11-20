import Common from '@/utils/public'
import Path from '@/api/chatPath'
import Service from '@/api/service'

const state = {
  files: {},
  models: [],
  randomID: [],
  temporaryArr: []
}

const getters = {
  getFiles: state => state.files,
  getModels: state => state.models,
  getRandomID: state => state.randomID,
  temporaryArr: state => state.temporaryArr
}

const mutations = {
  RANDOM_ID(state, id) {
    state.randomID.push(id)
  },
  MODELS(state, data) {
    state.models = data
  },
  FILES(state, {res, idx}) {
    let obj = Common.deepCopy(state.files)
    obj[idx] = res
    state.files = obj
  },
  CHANGE_COLOR(state, {color, id}) {
    let obj = Common.deepCopy(state.models)
    obj[id].color = color
    state.models = obj
  },
  TEMPORARY_ARR(state, {data, id}) {
    if (!state.temporaryArr[id]) {
      state.temporaryArr.push(data)
    }
  }
}
const actions = {
  ajaxFiles({commit, state}, idx) {
      if (!state.files[idx]) {
        Service.httpPost(Path.files, {id: idx}).then((res) => {
              let data = res
              if (data.code === 1) {
                commit('FILES', {res: data.data, idx})
              }
          })
      }
  },
  ajaxModels({commit, state}, idx) {
    if (!state.models.length || idx) {
      Service.httpPost(Path.models).then((res) => {
          let data = res
          if (data.code === 1) {
            let arr = []
            for (let val of data.data) {
              arr.push(val.template_list[0])
            }
            commit('MODELS', arr)
          }
      })
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
