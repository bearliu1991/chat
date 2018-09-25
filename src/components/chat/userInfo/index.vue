<template>
    <div id="user_info" >
      <div class='wrap'>
        <div class="portrait"></div>
        <div class="name">
          <span>{{info.name}}</span>
          <i class="icon">&#xe6b4;</i>
        </div>
        <ul class="info_detail">
          <li>
            <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>
            <editor type="name" :propInfo="info.name"></editor>
          </li>
          <li>
            <span>电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话</span>
            <editor type="mobile" :propInfo="info.mobile"></editor>
          </li>
          <li>
            <span>公&nbsp;&nbsp;众&nbsp;&nbsp;号</span>
            <i>{{info.publicCode}}</i>
          </li>
          <li>
            <span>关注状态</span>
            <i>{{info.focusState}}</i>
          </li>
          <li>
            <span>来访次数</span>
            <i>{{info.times}}</i>
          </li>
          <li>
            <span>首次关注</span>
            <i>{{info.firstFocus}}</i>
          </li>
          <li>
            <span>所属客服</span>
            <PopChoose type="service" :id="info.serviceId"></PopChoose>
          </li>
          <li>
            <span>所属分组</span>
            <PopChoose type="group" :id="info.groupId"></PopChoose>
          </li>
          <li class="tips">
            <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</span>
            <editor type="tips" :propInfo="info.tips"></editor>
          </li>
        </ul>
        <ul class="label">
          <li v-for="(item, idx) in choosedMarks" :key="idx">{{item.name}}</li>
          <li class="define">
            <custom-modal></custom-modal>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import customModal from "./customModal"
import PopChoose from "../popChoose"
import editor from "../../public/editorInfo/editor"
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  name: "user_info",
  data() {
    return {}
  },
  watch: {
    chatId() {
      this.ajaxChoosedMarks(this.chatId)
    }
  },
  computed: {
    ...mapGetters({
      allChoosedMarks: 'mark/getAllChoosedMarks',
      name: 'addInfo/getName',
      phone: 'addInfo/getPhone',
      remake: 'addInfo/getRemake'
    }),
    ...mapState({
      allChator: state => state.chat.allChator,
      chatId: state => state.chat.chatId
    }),
    info() {
      if (this.chatId < 0) {
        return {}
      } else {
        return this.allChator[this.chatId]
      }
    },
    choosedMarks() {
      return this.allChoosedMarks[this.chatId]
    }
  },
  created() {
    this.ajaxChoosedMarks(this.chatId)
  },
  methods: {
    ...mapActions({
      ajaxChoosedMarks: 'mark/ajaxChoosedMarks'
    })
  },
  components: {
    customModal,
    PopChoose,
    editor
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/index.styl'
#user_info
  .portrait
    square(126px)
    margin 0 auto
    bgColor black
    radius(50%)
    // bgAll('./portrait.png')
  .name
    setMiddle()
    margin 5px 0
    .icon
      color(#46b6ef)
  .info_detail
    border-top 1px solid #dddddd
    padding-right 10px
    li
      margin 6px 0
      line-height 28px
      text-align: left
      setStart()
      & > span
        display: inline-block
        float: left
        padding: 0 10px
        width: 75px
      input
        border 1px solid #46b6ef
        width 100px
      input[disabled]
        border none
      i
        text-align left
  .label
    padt(15px)
    border-top 1px solid #dddddd
    clear()
    li
      float left
      vertical(21px)
      padding 0 6px
      radius(2px)
      margin 5px
      color()
    li:nth-of-type(4n+1)
      bgColor(skyblue)
    li:nth-of-type(4n+2)
      bgColor(black)
    li:nth-of-type(4n+3)
      bgColor(red)
    li:nth-of-type(4n+4)
      bgColor(green)
    .define
      background #fff !important
      >div
        width 70px
        border 1px solid #ff3b30
        color(#ff3b30)
</style>
