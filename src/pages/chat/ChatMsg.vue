<template>
  <div id="chatCont" :style="styles.lay">
    <div class="portrait"></div>
    <div class="content" :style="styles.cont">
      <div class="nickname" :style="styles.text">
        <span class="name">{{data.name}}</span>
        <span class="time" :style="styles.split">{{data.time}}</span>
      </div>
      <div class="msg_cont" :style="styles.text">
        <div class="con_ret" :style="styles.icon"></div>
        <div class="con" :style="styles.con" @contextmenu.prevent.stop="showMenu($event, data)">
          <img class="img cursor" width="100px" :src='data.info' v-if="data.msgType === 1" @click="showDetailPop(data)">
          <div v-if="data.msgType === 4" @click.prevent="showDetailPop(data)">
            <VideoContainer :data="data"></VideoContainer>
            <!-- <video class="video" width="200px" :src='data.info'></video> -->
          </div>
          <div class="audio">
            <AudioPlayer :url='data.info' v-if="data.msgType === 3">{{data.info}}</AudioPlayer>
            <div v-if='data.transText || data.transText' class="split_line"></div>
            <span v-if='data.transText' v-html='data.transText'></span>
          </div>
          <a :href='data.info' v-if="data.msgType === 5" target='_blank'>{{data.info}}</a>
          <div v-if="data.msgType === 2" class="img_text cursor">
            <TextPic :data="data"></TextPic>
          </div>
          <div v-if="data.msgType === 6" class="">
            <PicText :data="data"></PicText>
          </div>
          <div class="text_wrap" v-if="data.msgType === 0">
            <span v-html='data.info'></span>
            <div v-if='data.translate || data.transText' class="split_line"></div>
            <span v-if='data.translate' v-html='data.translate'></span>
          </div>
          <div class="sendState" :style="styles.errDir">
            <span class="icon fail" v-if="!data.fail">&#xe6b3;</span>
            <span class="icon loading" v-if="data.sending">&#xe620;</span>
          </div>
        </div>
      </div>
      <SelfDefinePop v-model="showPop" v-if='showPop'>
        <DetailPop :sourceObj="sourceObj" :msgDatas="msgDatas"></DetailPop>
      </SelfDefinePop>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "chatCont",
  data() {
    return {
      isShow: false,
      showPop: false,
      sourceObj: {}
    }
  },
  props: ["direct", "data", 'idx'],
  methods: {
    showDetailPop(data) {
      this.sourceObj = Object.assign(data)
      this.sourceObj.hostId = this.idx
      this.showPop = true
    },
    showMenu(e, item) {
      let menuPosition = { x: e.clientX, y: e.clientY };
      let isShow = true
      let menuItem = item
      this.$store.commit('chat/CONTEXTMENU_INFO', item)
      this.$emit("showMenu", menuPosition, isShow, menuItem, this.idx)
    }
  },
  computed: {
    ...mapState({
      allMsg: state => state.chat.allMsg
    }),
    msgDatas() {
      return this.allMsg[this.idx] && this.allMsg[this.idx].msgs
    },
    styles() {
      let obj = {};
      if (this.direct === "left") {
        obj.lay = { float: "left", justifyContent: "flex-start" };
        obj.cont = { justifyContent: "flex-start", marginLeft: "3px" };
        obj.text = { textAlign: "left" };
        obj.icon = { borderRightColor: "#fff" };
        obj.con = { background: "#fff" };
        obj.split = { marginLeft: "14px" };
        obj.errDir = { right: "-40px" };
      } else {
        obj.lay = {
          float: "right",
          justifyContent: "flex-end",
          flexDirection: "row-reverse"
        };
        obj.cont = {
          justifyContent: "flex-end",
          flexDirection: "row-reverse",
          marginRight: "3px"
        };
        obj.text = { textAlign: "right", flexDirection: "row-reverse" };
        obj.icon = { borderLeftColor: "#9eea6a" };
        obj.con = { background: "#9eea6a" };
        obj.split = { marginRight: "14px" };
        obj.errDir = { left: "-40px" };
      }
      return obj;
    }
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/index.styl'
.split_line
  margin:2px 5px
  border-top:1px solid #aaa

#chatCont
  display flex
  align-items flex-start
  margin 5px 0
  padding 0 10px
  width 60%
  .portrait
    width 34px
    height 34px
    mt(2px)
    // bgAll('./portrait.png')
  .content
    flex 1
    fn(12px)
    .nickname
      display flex
      mb(5px)
      .time
        margin 0 4px
    .msg_cont
      setStart()
      margin 0 -4px
      align-items flex-start
      .con
        relative()
        word-break break-all
        padding 10px
        text-align left
        border-radius 3px
        min-height 16px
        line-height 16px
        letter-spacing 1px
        .sendState
          absolute()
          top:50%
          mt(-5px)
          .icon
            fn(30px)
            &.fail
              color(red)
      .con_ret
        mt(4px)
        border 4px solid transparent
</style>
