// 此处放置公用方法
import axios from './axios'
import CONST from './const'
import ieVersion from './ieVersion'
import qs from 'qs'
// get请求
function httpGet(url, args = {}) {
  args.params = args.params || {}
  args.params._stamp = new Date().getTime()
  if (ieVersion < 10) {
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
    if (ieVersion < 10) {
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
function clearCookie(name) {
  setCookie(name, "", -1);
}

function getElementByAttr(tag, attr, value) {
  let aElements = document.getElementsByTagName(tag)
  let aEle = []
  for (let i = 0; i < aElements.length; i++) {
    if (aElements[i].getAttribute(attr) === value) {
      aEle.push(aElements[i]);
    }
  }
  return aEle
}

function hasClass(obj, cls) {
  return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(obj, cls) {
  if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}

function removeClass(obj, cls) {
  if (hasClass(obj, cls)) {
    let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    obj.className = obj.className.replace(reg, ' ');
  }
}

function toggleClass(obj, cls) {
  if (hasClass(obj, cls)) {
    removeClass(obj, cls);
  } else {
    addClass(obj, cls);
  }
}

function toggleClassTest() {
  let obj = document.getElementById('test');
  toggleClass(obj, "testClass");
}

/*
*   将中文转化为拼音
*   参数l1:需要转化的英文(传入的拼音不会被转换)
*   例如：参数为‘他们xiao’  输出‘TaMenxiao’
*/
function chineseToPinYin(l1) {
  let l2 = l1.length
  let I1 = ""
  let reg = new RegExp('[a-zA-Z0-9-]')
  for (let i = 0; i < l2; i++) {
    let val = l1.substr(i, 1)
    let name = arraySearch(val, CONST.PinYin);
    if (reg.test(val)) {
      I1 += val
    } else if (name !== false) {
      I1 += name
    }
  }
  I1 = I1.replace(/ /g, '-');
  while (I1.indexOf('--') > 0) {
    I1 = I1.replace('--', '-')
  }
  return I1
}

function arraySearch(l1, l2) {
  for (let name in CONST.PinYin) {
    if (CONST.PinYin[name].indexOf(l1) !== -1) {
      return ucfirst(name)
    }
  }
  return false
}

/*
*   将英文的首字母大写，其余的不变
*   参数l1:需要转首字母大写的英文
*   例如：参数为‘xiao他们’  输出‘Xiao他们’
*/
function ucfirst(l1) {
  if (l1.length > 0) {
    let first = l1.substr(0, 1).toUpperCase()
    let spare = l1.substr(1, l1.length)
    return first + spare
  }
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

export default {
  httpGet,
  httpPost,
  httpAll,
  setCookie,
  getCookie,
  clearCookie,
  getElementByAttr,
  hasClass,
  addClass,
  removeClass,
  toggleClass,
  toggleClassTest,
  chineseToPinYin,
  isChinese,
  isEn,
  deepCopy,
  isArray
}
