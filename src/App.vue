<template>
    <div id="app" v-cloak>
        <transition name="fade">
            <router-view/>
        </transition>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'App',
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            chatId: state => state.chat.chatId,
            allChator: state => state.chat.allChator,
            allMsg: state => state.chat.allMsg
        })
    },
    watch: {
        '$route' (to, from) {
            let self = this
            if (to.matched.some(record => record.meta.requiresAuth)) {
                self.intercept('http://localhost:8091/csws' + to.path).then(function(res) {
                    let obj = res.data || {}
                    // 如果sessionId不存在
                    if (obj.noExist || !obj.valid) {
                        console.error('失效或不存在')
                        self.$router.push({ path: '/login' })
                        self.$store.commit('public/USER_INFO', null)
                    }
                    if (obj.valid) {
                        console.info('有效')
                        self.$store.commit('public/USER_INFO', obj.data)
                        let url = to.path !== '/login' ? to.path : '/index'
                        self.$router.push({ path: url })
                    }
                })
            } else {
                self.$router.push({ path: to.path })
            }
        }
    },
    created() {
        // let self = this
        // let arr = [
        //     {
        //         "info": "我是谁呀？", 
        //         "id": 233, 
        //         "type": 0,
        //         "msgType": 0, 
        //         "infoType": 0
        //     }, 
        //     {
        //         "info": "/static/imgs/3.jpg", 
        //         "id": 234,
        //         "type": 0, 
        //         "msgType": 1, 
        //         "infoType": 0
        //     },
        //     {
        //         "info": {
        //             "title": "业务提醒", 
        //             "content": "<p>时间里附件是东方惊悚的平均分</p>"
        //         }, 
        //         "id": 235, 
        //         "type": 0,
        //         "msgType": 2, 
        //         "infoType": 0
        //     }, 
        //     {
        //         "info": "/static/audio/1.mp3", 
        //         "id": 236, 
        //         "msgType": 3, 
        //         "type": 0,
        //         "infoType": 0
        //     }, 
        //     {
        //         "info": "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4", 
        //         "id": 237, 
        //         "msgType": 4, 
        //         "infoType": 0, 
        //         "type": 0
        //     },
        //     {
        //         "info": "https://www.baidu.com", 
        //         "id": 238, 
        //         "msgType": 5, 
        //         "type": 0,
        //         "infoType": 0
        //     },
        //     {
        //         "info": "/static/audio/1.mp3", 
        //         "id": 239, 
        //         "msgType": 3, 
        //         "type": 0,
        //         "infoType": 0
        //     }, 
        //     {
        //         "info": "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4", 
        //         "id": 241, 
        //         "msgType": 4, 
        //         "infoType": 0,
        //         "type": 0
        //     }, 
        //     {
        //         "info": "https://www.baidu.com", 
        //         "id": 242, 
        //         "msgType": 5, 
        //         "type": 0,
        //         "infoType": 0
        //     }
        // ]
        // let count = 0
        // setInterval(function() {
        //     if (count >= arr.length) {
        //         return false
        //     } else {
        //         self.$socket.emit("chat_msg", JSON.stringify(arr[count]))
        //         count++
        //     }
        // }, 5000)

        // this.$socket.on("chat_msg", data => {
        //     let res = JSON.parse(data)
        //     res.hostId = 0
        //     self.$store.commit('chat/LATEST_MSGS', res, 0)
        // })
    },
    mounted() {
        let self = this;
        this.$socket.on("send_msg", data => {
            let res = JSON.parse(data);
            if (res.id === self.chatId) {
                let datas = {}
                datas.id = self.chatId
                datas.item = {
                    name: "张三",
                    infoType: 0,
                    msgType:  0,
                    id: res.msgId,
                    chatTime: 1533260010,
                    info: res.msg,
                    type: 0
                }
                self.$store.commit('chat/INSERT_MSGS', datas)
            }
        })
    },
    methods: {}
}
</script>

<style lang="stylus">
  @import '~@/assets/css/index.styl'

  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
    height:100%
    [v-cloak]
      display none
</style>
