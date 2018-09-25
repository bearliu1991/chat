<template>
    <div id="chat_detail" ref="chat_detail">
      <ScrollBar @pullLoading="pullLoading" @hideContextMenue="isShow = false" :pulling="isPulling" :isBottom='isBottom' :isContextMenu="isShow" ref="scrollCont">
        <div class="more" v-if='msgDetail.length > pageLen'>
          <i class="icon">&#xe63b;</i>
          <span v-show="isMore">查看更多消息</span>
          <span v-show="!isMore">没有更多消息</span>
          <!-- <span>返回底部</span> -->
        </div>
        <div class="msg_wrap" v-for="(item, index) in msgDetail" :key="index">
          <ChatMsg :direct="item.type === 0 ? 'left' : 'right'" v-show = "filter('0') && (!item.infoType)"
                     :data="item" :idx="dataId" @showMenu="showMenu"></ChatMsg>
          <Notice :infoType="item.infoType" :msgType="msgType" v-show = "filter('1') && (item.infoType === 1)">{{item.info}}</Notice>
          <Notice :infoType="item.infoType" :msgType="msgType" v-show = "filter('2') && (item.infoType === 2)">{{item.info}}</Notice>
          <Notice :infoType="item.infoType" :msgType="msgType" v-show = "filter('3') && (item.infoType === 3)">{{item.info}}</Notice>
        </div>
        <contextmenu v-model="isShow" :position="menuPosition" :idx="index" :menuList="menuList" :msgData="msgData"></contextmenu>
      </ScrollBar>
    </div>
</template>

<script>
import ChatMsg from "./ChatMsg";
import Notice from "./notice";
import { mapState } from "vuex";
export default {
  name: "chat_detail",
  data() {
    return {
      activeId: -1,
      isMore: true, // 更多消息
      menuList: [],
      msgData: {},
      isShow: false,
      isBottom: true,
      // 自定义右键菜单点击目标的索引值
      index: -1,
      menuPosition: { x: 0, y: 0 },
      pageLen: 7,
      isPulling: false
    };
  },
  props: ["dataId"],
  computed: {
    ...mapState({
      allMsg: state => state.chat.allMsg,
      allChator: state => state.chat.allChator
    }),
    msgDetail() {
      let obj = this.allMsg[this.dataId]
      return obj ? obj.msgs : []
    },
    msgType() {
      return this.allChator[this.dataId] ? (this.allChator[this.dataId].msgType - 0) : 0
    }
  },
  watch: {
    dataId() {
      this.getData()
    },
    allMsg() {
      // this.isBottom = true
    }
  },
  created() {
    let self = this
    this.getData()
    this.$root.Bus.$on("delChat", (value, idx) => {
      self.isBottom = false
      this.msgDetail.splice(idx, 1);
    })
    this.$socket.on("send_msg", data => {
      self.isBottom = true
    })
  },
  components: { ChatMsg, Notice },
  methods: {
    filter(key) {
      if (this.allChator[this.dataId].msgTypes) {
        return this.allChator[this.dataId].msgTypes.findIndex(item => item === key) > -1
      }
      return true
    },
    // 获取当前ID对应的msgList
    getData(pageId) {
      let self = this;
      if (this.dataId < 0) {
        return false;
      }
      if (pageId) {
        this.chatDetail({ id: this.dataId, pageId: pageId }).then(function(res) {
          let data = res.data
          if (data.code === 1) {
            let noresult = data.length < 7
            self.$store.commit("chat/ADD_MSG", {
                id: self.dataId,
                msgs: data.data,
                pageId: pageId,
                noresult: noresult
              });
          }
        });
      } else {
        if (!this.allMsg[this.dataId]) {
          this.chatDetail({ id: this.dataId }).then(function(res) {
            let data = res.data
            if (data.code === 1) {
              self.$store.commit("chat/ADD_MSG", {
                id: self.dataId,
                msgs: data.data
              });
            }
          });
        }
      }
    },
    pullLoading(contHeight) {
      let self = this
      this.isBottom = false
      this.isPulling = true
      let timer = setTimeout(() => {
        self.isPulling = false
        clearTimeout(timer)
      }, 1000)
      
      if (this.msgDetail.length > this.pageLen) {
        let obj = this.allMsg[this.dataId]
        if (obj.noresult) {
          this.isMore = false
        } else {
          obj.pageId ? self.getData(obj.pageId - 0 + 1) : self.getData(1)
        }
      } else {
        return false
      }
    },
    showMenu(menuPosition, isShow, msgData, idx) {
      this.isBottom = false
      // 对于不同的消息类型，右键内容
      switch (msgData.msgType) {
        case 0:
          if (/^[1][3,4,5,7,8][0-9]{9}$/.test(msgData.info)) {
            this.menuList = ["copy", "translate", "collect", "remark", "addName", "addPhone", "delChat"]
          } else {
            this.menuList = ["copy", "translate", "collect", "remark", "addName", "delChat"]
          }
          break
        case 1:
          this.menuList = ["copy", "collect", "delChat"]
          break
        case 2:
          this.menuList = ["copy", "collect", "delChat"]
          break
        case 3:
          this.menuList = ["copy", "collect", "toText", "delChat"]
          break
        case 4:
          this.menuList = ["copy", "collect", "delChat"]
          break
        case 5:
          this.menuList = ["copy", "collect", "remark", "delChat"]
          break
        case 6:
          this.menuList = ["copy", "collect", "delChat"]
          break
        default:
          break
      }
      this.menuPosition = menuPosition
      this.isShow = isShow
      this.msgData = msgData
      this.index = idx
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/index.styl';

#chat_detail
  position:absolute
  top:60px
  right:0
  left:0
  bottom:200px
  overflow-y: auto
  .more
    margin: 2px 0
    setMiddle()
    center()
    color(#46b6ef)
    cursor()
    span
      display: inline-block
      margin-left: 5px
</style>
