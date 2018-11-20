// 此处放置公用方法
import axios from '../api/axios'
import qs from 'qs'
// get请求
function httpGet(url, args = {}) {
  args.params = args.params || {}
  args.params._stamp = new Date().getTime()
  if (ieV() < 10) {
    args.sessionId = getCookie('sessionId');
  }
  return new Promise(function (resolve, reject) {
    axios.get(url, {params: args})
      .then(function (r) {
        resolve(r)
      }).catch(function (err) {
      reject(err)
    })
  })
}
function ieV () {
  let ie = navigator.appVersion.match(/MSIE\s(.+?);/i) || [0, 100000];
  return parseInt(ie[1])
}

// 对象深copy
function deepCopy (data) {
  return JSON.parse(JSON.stringify(data));
}
function isArray (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

// post请求
function httpPost(url, args) {
  return new Promise(function (resolve, reject) {
    if (ieV() < 10) {
      let _url = '';
      let _args = '';
      if (typeof args !== 'string') {
        args.sessionId = getCookie('sessionId');
        // args.isIE9 = true;
        _args = qs.stringify(args)
      } else {
        _args = args + '&sessionId=' + getCookie('sessionId')
      }
      url.includes('?') ? (_url = url + _args) : (_url = url + "?" + _args);
      axios.get(_url, {
        params: { _stamp: new Date().getTime() }
      }).then(function (r) {
        resolve(r)
      }).catch(function (err) {
        reject(err)
      })
    } else {
      axios.post(url, args)
      .then(function (r) {
        resolve(r)
      }).catch(function (err) {
        reject(err)
      })
    }
  })
}

// 多重请求
function httpAll(reqFun1, reqFun2) {
  return new Promise(function (resolve, reject) {
    axios.all([reqFun1, reqFun2])
      .then(axios.spread(function (acct, perms) {
        resolve(acct, perms)
      }))
      .catch(function (error) {
        throw error
      })
  })
}

// 设置cookie
function setCookie(cname, cvalue, exdays) {
  let d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires + ';';
}

// 获取cookie
function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
  }
  return "";
}

// 清除cookie
function removeCookie(name) {
  setCookie(name, "", -1);
}

// 是否为中文
function isChinese(temp) {
  let re = /[^\u4E00-\u9FA5]/
  if (re.test(temp)) {
    return false
  }
  return true
}
// 是否为英文字母
function isEn (char) {
  let reg = /[A-Za-z]/
  if (!reg.test(char)) {
    return false
  }
  return true
}
function strPro() {
  let str = String
  str.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "")
  }
  str.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "")
  }
  str.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "")
  }
}
strPro()

export default {
  httpGet,
  httpPost,
  httpAll,
  setCookie,
  getCookie,
  removeCookie,
  isChinese,
  isEn,
  deepCopy,
  isArray,
  ieV
}
