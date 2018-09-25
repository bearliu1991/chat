import axios from 'axios'
import { Message } from 'iview'

let reqTimer = null
let resTimer = null
let reqCount = false
let resCount = false
const service = axios.create({
  withCredentials: true, // 允许携带cookie
  baseURL: process.env.API_ROOT
});
service.interceptors.request.use(
  config => {
    if (!reqCount) {
      Message.info('数据正在加载中...')
      reqCount = true
      reqTimer = setTimeout(() => {
        Message.destroy()
        clearTimeout(reqTimer)
        reqCount = false
      }, 1000)
    }
    return config;
  },
  err => {
    Message.destroy()
    return Promise.reject(err);
  });

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // Message.destroy()
    if (!resCount) {
      Message.destroy()
      Message.error({
        content: '响应出错',
        duration: 5000
      })
      resCount = true
      resTimer = setTimeout(() => {
        resCount = false
        Message.destroy()
        clearTimeout(resTimer)
      }, 5000)
    }
    return Promise.reject(error.response)
  });
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default service
