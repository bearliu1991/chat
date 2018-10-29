// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/utils/polyfill'
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import filters from '@/assets/filters'
import install from '@/js'
import VueClipboard from 'vue-clipboard2'
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import strPro from '@/js/common'

Vue.config.productionTip = false
Vue.use(VideoPlayer)
Vue.use(iView)
Vue.use(install)
Vue.use(strPro)
Vue.use(VueClipboard)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  // 非父子组件的通信，空的实例放到根组件下，所有的子组件都能调用
  data: {
    Bus: new Vue()
  }
})
