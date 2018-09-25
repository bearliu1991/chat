import request from './request'
import components from './components'
import socket from './socket'
import ieVersion from './ieVersion'

export default {
  install(Vue, options) {
    // 引入请求内容
    request()
    Vue.prototype.$socket = socket
    Vue.prototype.ieVersion = ieVersion
    Vue.prototype.deepCopy = function (data) {
      return JSON.parse(JSON.stringify(data));
    }
    // 设置cookie
    Vue.prototype.setCookie = function (cname, cvalue, exdays) {
      let d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires + ';';
    };
    Vue.prototype.getCookie = function (cname) {
      let name = cname + "=";
      let ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
      }
      return "";
    };
    Vue.prototype.removeCookie = function (name) {
      this.$cookies.remove(name)
    };
    Vue.prototype.openMessage = (arg, fn) => {
      let html = '';
      if (!arg.bool) {
        html = '<span style="color: #C44DDC">' + arg.str + '</span>';
      } else {
        html = '<i style="color: red">' + arg.str + '</i>';
      }
      arg.ele.$alert(html, arg.title, {
        dangerouslyUseHTMLString: true,
        showClose: false,
        callback: () => {
          if (fn) fn();
        }
      });
    };
    Vue.prototype.addUploadUrl = (url, arr) => {
      let _arr = [];
      arr.forEach((item, index) => {
        _arr.push(url + item)
      })
      return _arr
    };
    Vue.prototype.isArray = function(obj) {
      return Object.prototype.toString.call(obj) === '[object Array]'
    }
    // 全局监听click事件，用于全局点击的时候隐藏内容
    Vue.prototype.globalClick = function (callback) {
      document.getElementById('app').onclick = function () {
        callback();
      };
    };
    Vue.directive('focus', {
      // 当绑定元素插入到 DOM 中。
      inserted: function (el) {
        // 聚焦元素
        el.focus()
      }
      // 也可以用update,update就是当页面有操作的时候就触发，比如点击按钮，输入框输入都算。
      // 有一个要注意的就是，就是你页面有几个input,比如一个input绑定了v-focus,一个没有绑定。你在没绑定v-focus的input输入时，绑定了v-focus的input就是自动获取焦点，这是个bug.
      // update: function (el) {
      // el.focus()
      // }
    });
    // 将plugins下面所有的vue组件注册为全局组件
    for (let key in components) {
      Vue.component(key, components[key])
    }
  }
}
