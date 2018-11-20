import Cookies from 'js-cookie' // expiers 单位：天

const TokenKey = 'token'
const sessionIdKey = 'session'
// token
export function getToken() {
  return Cookies.getJSON(TokenKey)
}

export function setToken(token, date) {
  return Cookies.set(TokenKey, token, { expires: date })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// sessionId
export function getCookieSession() {
  return Cookies.getJSON(sessionIdKey)
}

export function setCookieSession(sessionId, date) {
  return Cookies.set(sessionIdKey, sessionId, { expires: date })
}

export function removeCookieSession() {
  return Cookies.remove(sessionIdKey)
}

export function getCookie(key) {
  return Cookies.getJSON(key)
}

export function setCookie(key, sessionId, date) {
  if (date) {
    return Cookies.set(key, sessionId, { expires: date })
  } else {
    return Cookies.set(key, sessionId)
  }
}

export function removeCookie(key) {
  return Cookies.remove(key)
}
