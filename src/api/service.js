import axios from './axios'
import {
  getCookieSession,
  setCookieSession,
  getToken,
  setToken
} from '@/utils/cookies'
function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
function apiGetSessionId() {
  return new Promise((resolve, reject) => {
    axios.get('/api/getSessionId').then((res) => {
      res.data.sessionId = res.data.sessionId + 'F'
      resolve(res.data)
    }).catch((err) => {
      let res = err.response
      if (res) {
        reject(err)
      }
    })
  })
}
function getData(url, paramsData) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: paramsData
    }).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      let res = err.response
      if (res) {
        reject(err)
      }
    })
  })
}
function getPostData(url, paramsData) {
  return new Promise((resolve, reject) => {
    axios.post(url, paramsData, {emulateJSON : true}).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      console.log(err)
      let res = err.response
      if (res) {
        reject(err)
      }
    })
  })
}

// get 请求
function getApiAxios(url, params, isSaveToken) {
  if (params) {
    params = filterNull(params)
  } else {
    params = {}
  }
  let obj = {}
  let sessionId = getCookieSession()
  let timestamp = new Date()
  obj.timestamp = timestamp.getTime()
  if (!isSaveToken) {
    let token = getToken()
    if (token) {
      setToken(token, 0.5)
    }
  }
  if (sessionId) {
    obj.sessionId = sessionId
    setCookieSession(sessionId, 0.5)
    let paramsData = Object.assign({}, params, obj)
    return getData(url, paramsData)
  } else {
    return apiGetSessionId().then(data => {
      if (data.sessionId) {
        setCookieSession(data.sessionId, 0.5)
        obj.sessionId = data.sessionId
        let paramsData = Object.assign({}, params, obj)
        return getData(url, paramsData)
      }
    })
  }
}
// post 请求
function postApiAxios(url, params) {
  if (params) {
    params = filterNull(params)
  } else {
    params = {}
  }
  let obj = {}
  let sessionId = getCookieSession()
  let token = getToken()
  if (token) {
    setToken(token, 0.5)
  }
  if (sessionId) {
    obj.sessionId = sessionId
    setCookieSession(sessionId, 0.5)
    let paramsData = Object.assign({}, params, obj)
    return getPostData(url, paramsData)
  } else {
    return apiGetSessionId().then(data => {
      setCookieSession(data.sessionId, 0.5)
      obj.sessionId = data.sessionId
      let paramsData = Object.assign({}, params, obj)
      return getPostData(url, paramsData)
    })
  }
}

export default {
  httpGet: function(url, params, isSaveToken) {
    return getApiAxios(url, params, isSaveToken)
  },
  httpPost: function(url, params) {
    return postApiAxios(url, params)
  },
  $get: function(url, params, isSaveToken) {
    return getApiAxios(url, params, isSaveToken)
  },
  $post: function (url, params) {
    return postApiAxios(url, params)
  }
}
